(function () {
  'use strict';

  var Speech = window.SpeechHelper;
  var PINYIN_QUIZ = window.PINYIN_DATA.PINYIN_QUIZ;
  var ENCOURAGEMENTS = window.PINYIN_DATA.ENCOURAGEMENTS;
  var SHENGMU_EX = window.PINYIN_DATA.SHENGMU_EXAMPLES;
  var YUNMU_EX = window.PINYIN_DATA.YUNMU_EXAMPLES;
  var ZHENGTI = window.PINYIN_DATA.ZHENGTIRENDU;
  var CHARACTERS = window.CHAR_DATA.CHARACTERS;
  var QUESTION_WORDS = window.CHAR_DATA.QUESTION_WORDS;
  var READ_QUESTIONS = window.QUESTION_DATA.READ_QUESTIONS;
  var PINYIN_TOTAL = window.QUESTION_DATA.PINYIN_TOTAL;
  var CHAR_TOTAL = window.QUESTION_DATA.CHAR_TOTAL;
  var READ_TOTAL = window.QUESTION_DATA.READ_TOTAL;
  var LESSON_DATA = window.LESSON_DATA;
  var POEM_DATA = window.POEM_DATA;
  var SENTENCE_DATA = window.SENTENCE_DATA;
  var SENTENCE_TOTAL = window.SENTENCE_DATA.SENTENCE_TOTAL;
  var GRADE3_PREVIEW = window.GRADE3_PREVIEW;

  var state = {
    module: null,
    questions: [],
    index: 0,
    score: 0,
    pinyinMode: 'pick-pinyin',
    selectedLeft: null,
    matched: {},
    leftItems: [],
    rightItems: [],
    flashList: [],
    flashIndex: 0,
    kwIndex: 0,
    alphaTab: 'shengmu',
    alphaSelected: null,
    answered: false,
    lessonSemId: 'g1s2',
    lessonId: null,
    lessonChars: [],
    lessonCharIndex: 0,
    lessonFirstTryOk: 0,
    lessonProgress: {},
    poemSemId: 'g1s1',
    poemList: [],
    poemIndex: 0,
    sentenceMode: 'all',
    preview3Cat: 'all',
    preview3Index: 0
  };

  var Session = window.createSessionLogger ? window.createSessionLogger('语文') : null;
  var MODULE_NAMES = {
    pinyin: '拼音练习',
    alphabet: '声母韵母',
    char: '识字配对',
    lesson: '课文识字',
    poem: '古诗词',
    flashcard: '识字卡片',
    read: '读题训练',
    keywords: '题目常用词',
    sentence: '词语与句子',
    preview3: '三年级预习'
  };

  function sessionExtras() {
    var ex = {};
    if (state.module === 'pinyin') {
      ex.subName = state.pinyinMode === 'pick-char' ? '听音选字' : '看字选拼音';
      ex.total = PINYIN_TOTAL;
      ex.progress = state.index + (state.answered ? 1 : 0);
    } else if (state.module === 'char') {
      ex.progress = countMatched();
      ex.total = CHAR_TOTAL;
    } else if (state.module === 'lesson' && state.lessonChars.length) {
      ex.progress = state.lessonCharIndex + (state.answered ? 1 : 0);
      ex.total = state.lessonChars.length;
      var info = LESSON_DATA.findLesson(state.lessonId);
      ex.subName = info ? info.lesson.title : '';
    } else if (state.module === 'lesson') {
      ex.subName = '课文列表';
    } else if (state.module === 'poem' && state.poemList.length) {
      ex.progress = state.poemIndex + 1;
      ex.total = state.poemList.length;
      var sem = POEM_DATA.getSemester(state.poemSemId);
      ex.subName = sem ? sem.label : '';
    } else if (state.module === 'poem') {
      ex.subName = '诗词列表';
    } else if (state.module === 'flashcard') {
      ex.progress = state.flashIndex + 1;
      ex.total = state.flashList.length;
    } else if (state.module === 'keywords') {
      ex.progress = state.kwIndex + 1;
      ex.total = QUESTION_WORDS.length;
    } else if (state.module === 'read') {
      ex.total = READ_TOTAL;
      ex.progress = Math.min(READ_TOTAL, Math.max(state.score, state.index));
    } else if (state.module === 'sentence') {
      ex.subName = getSentenceModeLabel(state.sentenceMode);
      ex.total = SENTENCE_TOTAL;
      ex.progress = state.index + (state.answered ? 1 : 0);
    } else if (state.module === 'preview3') {
      var cat = GRADE3_PREVIEW.getCategory(state.preview3Cat);
      ex.subName = cat ? cat.name : '';
      ex.total = GRADE3_PREVIEW.getItems(state.preview3Cat).length;
      ex.progress = state.preview3Index + 1;
    }
    return ex;
  }

  function getSentenceModeLabel(mode) {
    var modes = SENTENCE_DATA.SENTENCE_MODES;
    for (var i = 0; i < modes.length; i++) {
      if (modes[i].id === mode) return modes[i].label;
    }
    return '综合练习';
  }

  function logStart(module, opts) {
    if (!Session) return;
    Session.start(module, MODULE_NAMES[module] || module, opts || {});
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  function showScreen(id) {
    if (id === 'home' && state.module && window.LearningLog && window.LearningLog.getCurrent()) {
      Session.abort(state, sessionExtras());
    }
    if (id === 'home') state.module = null;
    Speech.stop();
    if (window.PoemRecite && window.PoemRecite.isListening && window.PoemRecite.isListening()) {
      window.PoemRecite.stop();
    }
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }

  function randomEncouragement() {
    return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  }

  function bindSpeak(btn, fn) {
    if (!btn) return;
    btn.onclick = function (e) {
      e.stopPropagation();
      fn();
    };
  }

  function makeSpeakBtn(label, fn) {
    var b = document.createElement('button');
    b.className = 'match-speak';
    b.textContent = '🔊';
    b.title = label;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      fn();
    });
    return b;
  }

  // ========== 年级切换（一二年级 / 三年级上 / 后续可扩展） ==========
  function setHomeGrade(grade) {
    var target = grade || 'g12';
    document.querySelectorAll('#grade-tabs .grade-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.grade === target);
    });
    document.querySelectorAll('.grade-panel').forEach(function (panel) {
      panel.classList.toggle('hidden', panel.dataset.gradePanel !== target);
    });
  }

  document.querySelectorAll('#grade-tabs .grade-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      setHomeGrade(tab.dataset.grade);
    });
  });

  // ========== 首页 ==========
  document.querySelectorAll('.module-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var mod = card.dataset.module;
      if (!mod) return;
      if (card.tagName === 'A') e.preventDefault();
      if (mod === 'pinyin') startPinyin();
      else if (mod === 'alphabet') startAlphabet();
      else if (mod === 'char') startChar();
      else if (mod === 'lesson') startLessonMap();
      else if (mod === 'poem') startPoemMap();
      else if (mod === 'flashcard') startFlashcard();
      else if (mod === 'read') startRead();
      else if (mod === 'keywords') startKeywords();
      else if (mod === 'sentence') startSentence();
      else if (mod === 'preview3') startPreview3();
    });
  });

  document.querySelectorAll('.back-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.id === 'lesson-back-map' || btn.id === 'poem-back-map') return;
      showScreen('home');
    });
  });

  Speech.ensureReady(function () {});

  // ========== 拼音练习 ==========
  document.querySelectorAll('#pinyin-screen .mode-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#pinyin-screen .mode-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.pinyinMode = tab.dataset.mode;
      startPinyin();
    });
  });

  function startPinyin() {
    state.module = 'pinyin';
    state.questions = pickRandom(PINYIN_QUIZ, PINYIN_TOTAL);
    state.index = 0;
    state.score = 0;
    logStart('pinyin', {
      subName: state.pinyinMode === 'pick-char' ? '听音选字' : '看字选拼音',
      total: PINYIN_TOTAL
    });
    showScreen('pinyin-screen');
    renderPinyinQuestion();
  }

  function renderPinyinQuestion() {
    var q = state.questions[state.index];
    state.answered = false;
    var isListen = state.pinyinMode === 'pick-char';

    document.getElementById('pinyin-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + PINYIN_TOTAL + ' 题';
    document.getElementById('pinyin-score').textContent = '得分：' + state.score;
    document.getElementById('pinyin-feedback').className = 'feedback';
    document.getElementById('pinyin-next').classList.remove('show');

    document.getElementById('pinyin-char-area').classList.toggle('hidden', isListen);
    document.getElementById('pinyin-listen-area').classList.toggle('hidden', !isListen);
    document.getElementById('pinyin-label').textContent =
      isListen ? '听读音，选正确的汉字' : '看字选拼音，可点 🔊 听读音';

    var optsEl = document.getElementById('pinyin-options');
    optsEl.innerHTML = '';
    optsEl.className = isListen ? 'options-grid char-options' : 'options-grid';

    if (isListen) {
      var charOpts = pickCharOptions(q.char, 4);
      shuffle(charOpts).forEach(function (c) {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = c;
        btn.addEventListener('click', function () {
          handlePinyinCharAnswer(btn, c, q.char);
        });
        optsEl.appendChild(btn);
      });
      bindSpeak(document.getElementById('pinyin-speak-listen'), function () {
        Speech.speakChar(q.char);
      });
      setTimeout(function () { Speech.speakChar(q.char); }, 400);
    } else {
      document.getElementById('pinyin-char').textContent = q.char;
      bindSpeak(document.getElementById('pinyin-speak-char'), function () {
        Speech.speakChar(q.char);
      });
      shuffle(q.options).forEach(function (opt) {
        var wrap = document.createElement('div');
        wrap.className = 'option-row';
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.style.flex = '1';
        btn.addEventListener('click', function () {
          handlePinyinAnswer(btn, opt, q.answer);
        });
        var sp = makeSpeakBtn('听拼音', function () {
          Speech.speakPinyinSlug(window.PINYIN_DATA.pinyinToSlug(opt), opt);
        });
        wrap.appendChild(btn);
        wrap.appendChild(sp);
        optsEl.appendChild(wrap);
      });
    }
  }

  function pickCharOptions(correct, n) {
    var pool = CHARACTERS.map(function (c) { return c.char; });
    var opts = [correct];
    shuffle(pool).forEach(function (c) {
      if (opts.length >= n) return;
      if (c !== correct && opts.indexOf(c) === -1) opts.push(c);
    });
    return opts;
  }

  function handlePinyinAnswer(btn, selected, answer) {
    if (state.answered) return;
    state.answered = true;
    var buttons = document.querySelectorAll('#pinyin-options .option-btn');
    buttons.forEach(function (b) { b.disabled = true; });
    var feedback = document.getElementById('pinyin-feedback');
    if (selected === answer) {
      btn.classList.add('correct');
      state.score++;
      feedback.textContent = randomEncouragement();
      feedback.className = 'feedback show success';
      Speech.speakWord(randomEncouragement());
    } else {
      btn.classList.add('wrong');
      buttons.forEach(function (b) {
        if (b.textContent === answer) b.classList.add('correct');
      });
      feedback.textContent = '正确答案是：' + answer + '，再记一记！';
      feedback.className = 'feedback show error';
    }
    document.getElementById('pinyin-next').classList.add('show');
  }

  function handlePinyinCharAnswer(btn, selected, answer) {
    if (state.answered) return;
    state.answered = true;
    var buttons = document.querySelectorAll('#pinyin-options .option-btn');
    buttons.forEach(function (b) { b.disabled = true; });
    var feedback = document.getElementById('pinyin-feedback');
    if (selected === answer) {
      btn.classList.add('correct');
      state.score++;
      feedback.textContent = randomEncouragement() + ' 是「' + answer + '」';
      feedback.className = 'feedback show success';
    } else {
      btn.classList.add('wrong');
      buttons.forEach(function (b) {
        if (b.textContent === answer) b.classList.add('correct');
      });
      feedback.textContent = '正确答案是：「' + answer + '」';
      feedback.className = 'feedback show error';
    }
    document.getElementById('pinyin-next').classList.add('show');
  }

  document.getElementById('pinyin-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= PINYIN_TOTAL) {
      showResult('pinyin', state.score, PINYIN_TOTAL);
    } else {
      renderPinyinQuestion();
    }
  });

  // ========== 声母韵母 ==========
  function startAlphabet() {
    state.module = 'alphabet';
    state.alphaTab = 'shengmu';
    logStart('alphabet', { subName: '声母韵母表' });
    showScreen('alphabet-screen');
    document.querySelectorAll('#alphabet-screen .alpha-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === 'shengmu');
    });
    renderAlphabet();
  }

  document.querySelectorAll('#alphabet-screen .alpha-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#alphabet-screen .alpha-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.alphaTab = tab.dataset.tab;
      renderAlphabet();
    });
  });

  function getAlphaSlug(item) {
    return window.PINYIN_DATA.getPinyinSlug(item, state.alphaTab);
  }

  function speakAlphaPinyin(item) {
    var text = item.speak || item.pinyin;
    Speech.speakPinyinSlug(getAlphaSlug(item), text);
  }

  function renderAlphabet() {
    state.alphaSelected = null;
    var grid = document.getElementById('alphabet-grid');
    grid.innerHTML = '';
    var list = state.alphaTab === 'shengmu' ? SHENGMU_EX :
      state.alphaTab === 'yunmu' ? YUNMU_EX : ZHENGTI;

    list.forEach(function (item, idx) {
      var div = document.createElement('div');
      div.className = 'alpha-item' + (idx === 0 && !state.alphaSelected ? ' active' : '');
      var letter = item.sm || item.ym || item.py;
      div.innerHTML = letter + '<small>' + item.char + (item.pinyin ? ' ' + item.pinyin : '') + '</small>';
      div.addEventListener('click', function () {
        document.querySelectorAll('.alpha-item').forEach(function (d) {
          d.classList.remove('active');
        });
        div.classList.add('active');
        state.alphaSelected = item;
        updateAlphaDetail(item, letter);
        speakAlphaPinyin(item);
      });
      grid.appendChild(div);
      if (idx === 0 && !state.alphaSelected) {
        state.alphaSelected = item;
        updateAlphaDetail(item, letter);
      }
    });
  }

  function updateAlphaDetail(item, letter) {
    document.getElementById('alpha-letter').textContent = letter;
    var example = item.char;
    if (item.pinyin) example += ' ' + item.pinyin;
    if (item.word && item.word !== item.char) example += ' · ' + item.word;
    document.getElementById('alpha-example').textContent = example;

    var speakText = item.speak || item.pinyin;
    var btnChar = document.getElementById('alpha-speak-char');
    var btnWord = document.getElementById('alpha-speak-word');
    btnChar.textContent = '🔊 听「' + speakText + '」';
    btnWord.textContent = '🔊 听组词「' + item.word + '」';

    bindSpeak(btnChar, function () {
      speakAlphaPinyin(item);
    });
    bindSpeak(btnWord, function () {
      Speech.speakWord(item.word);
    });
  }

  // ========== 识字配对 ==========
  function startChar() {
    var chars = pickRandom(CHARACTERS, CHAR_TOTAL);
    state.module = 'char';
    state.score = 0;
    state.selectedLeft = null;
    state.matched = {};
    state.leftItems = chars;
    state.rightItems = shuffle(chars.map(function (c) {
      return { char: c.char, pinyin: c.pinyin, word: c.word };
    }));
    logStart('char', { total: CHAR_TOTAL });
    showScreen('char-screen');
    renderCharMatch();
  }

  function countMatched() {
    var n = 0;
    for (var k in state.matched) {
      if (state.matched[k]) n++;
    }
    return n / 2;
  }

  function renderCharMatch() {
    var matchedCount = countMatched();
    document.getElementById('char-progress').textContent =
      '已配对：' + matchedCount + ' / ' + CHAR_TOTAL;
    document.getElementById('char-score').textContent = '得分：' + state.score;

    var leftEl = document.getElementById('char-left');
    var rightEl = document.getElementById('char-right');
    leftEl.innerHTML = '';
    rightEl.innerHTML = '';

    state.leftItems.forEach(function (item, i) {
      var div = document.createElement('div');
      div.className = 'match-item' + (state.matched['l' + i] ? ' matched' : '');
      var inner = document.createElement('div');
      inner.className = 'match-item-inner';
      inner.innerHTML = '<span class="emoji">' + item.emoji + '</span><span>' + item.char + '</span>';
      inner.appendChild(makeSpeakBtn('听' + item.char, function () {
        Speech.speakChar(item.char);
      }));
      div.appendChild(inner);
      if (!state.matched['l' + i]) {
        div.addEventListener('click', function () { selectLeft(i, div); });
      }
      leftEl.appendChild(div);
    });

    state.rightItems.forEach(function (item, i) {
      var div = document.createElement('div');
      div.className = 'match-item' + (state.matched['r' + i] ? ' matched' : '');
      var inner = document.createElement('div');
      inner.className = 'match-item-inner';
      inner.innerHTML = '<span>' + item.pinyin + '</span>';
      inner.appendChild(makeSpeakBtn('听拼音', function () {
        Speech.speakPinyin(item.pinyin);
      }));
      div.appendChild(inner);
      if (!state.matched['r' + i]) {
        div.addEventListener('click', function () { selectRight(i, div); });
      }
      rightEl.appendChild(div);
    });

    if (matchedCount >= CHAR_TOTAL) {
      setTimeout(function () { showResult('char', state.score, CHAR_TOTAL); }, 500);
    }
  }

  function selectLeft(index, el) {
    document.querySelectorAll('#char-left .match-item').forEach(function (d) {
      d.classList.remove('selected');
    });
    state.selectedLeft = index;
    el.classList.add('selected');
    Speech.speakChar(state.leftItems[index].char);
  }

  function selectRight(index, el) {
    if (state.selectedLeft === null) return;
    var left = state.leftItems[state.selectedLeft];
    var right = state.rightItems[index];
    if (left.char === right.char) {
      state.matched['l' + state.selectedLeft] = true;
      state.matched['r' + index] = true;
      state.score++;
      state.selectedLeft = null;
      Speech.speakWord(left.word);
      renderCharMatch();
    } else {
      el.classList.add('wrong-flash');
      setTimeout(function () { el.classList.remove('wrong-flash'); }, 600);
      state.selectedLeft = null;
      document.querySelectorAll('#char-left .match-item').forEach(function (d) {
        d.classList.remove('selected');
      });
    }
  }

  // ========== 课文识字通关 ==========
  function startLessonMap() {
    state.module = 'lesson';
    state.lessonProgress = LESSON_DATA.loadProgress();
    state.lessonSemId = state.lessonSemId || 'g1s2';
    logStart('lesson', { subName: '课文列表' });
    showScreen('lesson-map-screen');
    document.querySelectorAll('.lesson-sem-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.sem === state.lessonSemId);
    });
    renderLessonGrid();
  }

  document.querySelectorAll('.lesson-sem-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.lesson-sem-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.lessonSemId = tab.dataset.sem;
      renderLessonGrid();
    });
  });

  function getSemester(id) {
    var sem = null;
    LESSON_DATA.SEMESTERS.forEach(function (s) {
      if (s.id === id) sem = s;
    });
    return sem;
  }

  function renderLessonGrid() {
    var sem = getSemester(state.lessonSemId);
    var grid = document.getElementById('lesson-grid');
    grid.innerHTML = '';
    if (!sem) return;

    sem.lessons.forEach(function (lesson, idx) {
      var key = String(lesson.id);
      var prog = state.lessonProgress[key] || {};
      var stars = prog.stars || 0;
      var card = document.createElement('div');
      card.className = 'lesson-card' + (prog.passed ? ' done' : '');
      card.innerHTML =
        '<div class="lesson-card-num">第 ' + (idx + 1) + ' 课</div>' +
        '<div class="lesson-card-title">' + lesson.title + '</div>' +
        '<div class="lesson-card-meta">' + lesson.chars.length + ' 个生字</div>' +
        '<div class="lesson-card-stars">' + (stars ? '⭐'.repeat(stars) : '未通关') + '</div>';
      card.addEventListener('click', function () {
        startLessonPlay(lesson.id);
      });
      grid.appendChild(card);
    });
  }

  function startLessonPlay(lessonId) {
    var info = LESSON_DATA.findLesson(lessonId);
    if (!info) return;
    state.lessonId = lessonId;
    state.lessonChars = info.lesson.chars.slice();
    state.lessonCharIndex = 0;
    state.lessonFirstTryOk = 0;
    state.answered = false;
    logStart('lesson', {
      subName: info.lesson.title,
      total: info.lesson.chars.length
    });
    showScreen('lesson-play-screen');
    var lessonNum = info.semester.lessons.indexOf(info.lesson) + 1;
    document.getElementById('lesson-title').textContent =
      '第 ' + lessonNum + ' 课 · ' + info.lesson.title;
    renderLessonCharQuiz();
  }

  function pickPinyinOptions(correctPinyin, n) {
    var pool = LESSON_DATA.getAllPinyinPool();
    var opts = [correctPinyin];
    shuffle(pool).forEach(function (py) {
      if (opts.length >= n) return;
      if (py !== correctPinyin && opts.indexOf(py) === -1) opts.push(py);
    });
    while (opts.length < n && pool.length >= n) {
      var py = pool[Math.floor(Math.random() * pool.length)];
      if (opts.indexOf(py) === -1) opts.push(py);
    }
    return opts;
  }

  function renderLessonCharQuiz() {
    var total = state.lessonChars.length;
    var item = state.lessonChars[state.lessonCharIndex];
    state.answered = false;

    document.getElementById('lesson-char-progress').textContent =
      '第 ' + (state.lessonCharIndex + 1) + ' / ' + total + ' 字';
    document.getElementById('lesson-char').textContent = item.char;
    document.getElementById('lesson-word-hint').textContent =
      '组词：' + (item.word || item.char);
    document.getElementById('lesson-feedback').className = 'feedback';

    bindSpeak(document.getElementById('lesson-speak-char'), function () {
      Speech.speakChar(item.char);
    });
    document.getElementById('lesson-stroke-btn').onclick = function () {
      if (window.StrokeHelper) StrokeHelper.replay('lesson-stroke-box');
    };
    if (window.StrokeHelper) {
      StrokeHelper.show(item.char, 'lesson-stroke-box', true);
    }
    setTimeout(function () { Speech.speakChar(item.char); }, 350);

    var optsEl = document.getElementById('lesson-options');
    optsEl.innerHTML = '';
    shuffle(pickPinyinOptions(item.pinyin, 4)).forEach(function (py) {
      var wrap = document.createElement('div');
      wrap.className = 'option-row';
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = py;
      btn.style.flex = '1';
      btn.addEventListener('click', function () {
        handleLessonAnswer(btn, py, item);
      });
      wrap.appendChild(btn);
      wrap.appendChild(makeSpeakBtn('听拼音', function () {
        Speech.speakPinyinSlug(window.PINYIN_DATA.pinyinToSlug(py), py);
      }));
      optsEl.appendChild(wrap);
    });
  }

  function handleLessonAnswer(btn, selected, item) {
    if (state.answered) return;
    state.answered = true;
    var buttons = document.querySelectorAll('#lesson-options .option-btn');
    buttons.forEach(function (b) { b.disabled = true; });
    var feedback = document.getElementById('lesson-feedback');
    var total = state.lessonChars.length;

    if (selected === item.pinyin) {
      btn.classList.add('correct');
      state.lessonFirstTryOk++;
      feedback.textContent = randomEncouragement() + ' 「' + item.char + '」读 ' + item.pinyin;
      feedback.className = 'feedback show success';
      setTimeout(function () {
        state.lessonCharIndex++;
        if (state.lessonCharIndex >= total) {
          finishLessonStage();
        } else {
          renderLessonCharQuiz();
        }
      }, 900);
    } else {
      btn.classList.add('wrong');
      buttons.forEach(function (b) {
        if (b.textContent === item.pinyin) b.classList.add('correct');
      });
      feedback.textContent = '再记一记：「' + item.char + '」读 ' + item.pinyin;
      feedback.className = 'feedback show error';
      setTimeout(function () {
        state.answered = false;
        buttons.forEach(function (b) {
          b.disabled = false;
          b.classList.remove('wrong', 'correct');
        });
        feedback.className = 'feedback';
      }, 1200);
    }
  }

  function finishLessonStage() {
    var total = state.lessonChars.length;
    var score = state.lessonFirstTryOk;
    var stars = LESSON_DATA.starsFromScore(score, total);
    var key = String(state.lessonId);
    var prev = state.lessonProgress[key] || {};
    state.lessonProgress[key] = {
      passed: true,
      stars: Math.max(stars, prev.stars || 0),
      score: score,
      total: total,
      at: Date.now()
    };
    LESSON_DATA.saveProgress(state.lessonProgress);
    showResult('lesson', score, total, stars);
  }

  document.getElementById('lesson-back-map').addEventListener('click', function () {
    state.lessonProgress = LESSON_DATA.loadProgress();
    startLessonMap();
  });

  // ========== 古诗词 ==========
  function startPoemMap() {
    state.module = 'poem';
    state.poemSemId = state.poemSemId || 'g1s1';
    logStart('poem', { subName: '诗词列表', total: POEM_DATA.POEM_TOTAL });
    showScreen('poem-map-screen');
    document.querySelectorAll('.poem-sem-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.sem === state.poemSemId);
    });
    renderPoemGrid();
  }

  document.querySelectorAll('.poem-sem-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.poem-sem-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.poemSemId = tab.dataset.sem;
      renderPoemGrid();
    });
  });

  function renderPoemGrid() {
    var sem = POEM_DATA.getSemester(state.poemSemId);
    var grid = document.getElementById('poem-grid');
    grid.innerHTML = '';
    sem.poems.forEach(function (p, idx) {
      var card = document.createElement('div');
      card.className = 'lesson-card poem-card-item';
      card.innerHTML =
        '<div class="lesson-card-num">第 ' + (idx + 1) + ' 首</div>' +
        '<div class="lesson-card-title">' + p.title + '</div>' +
        '<div class="lesson-card-meta">【' + p.dynasty + '】' + p.author + '</div>';
      card.addEventListener('click', function () {
        startPoemView(idx);
      });
      grid.appendChild(card);
    });
  }

  function startPoemView(index) {
    var sem = POEM_DATA.getSemester(state.poemSemId);
    state.poemList = sem.poems.slice();
    state.poemIndex = index;
    logStart('poem', {
      subName: sem.label,
      total: state.poemList.length
    });
    showScreen('poem-view-screen');
    renderPoem();
  }

  function stopPoemRecite() {
    if (!window.PoemRecite) return;
    var wasListening = window.PoemRecite.isListening();
    var heard = wasListening ? window.PoemRecite.stop() : window.PoemRecite.getTranscript();
    if (!wasListening && !heard) return;

    var panel = document.getElementById('poem-recite-panel');
    var p = state.poemList[state.poemIndex];
    var toggleBtn = document.getElementById('poem-recite-toggle');
    var stopBtn = document.getElementById('poem-recite-stop');
    var statusEl = document.getElementById('poem-recite-status');
    var heardEl = document.getElementById('poem-recite-heard');
    var scoreWrap = document.getElementById('poem-recite-score-wrap');
    var percentEl = document.getElementById('poem-recite-percent');
    var msgEl = document.getElementById('poem-recite-msg');

    toggleBtn.classList.remove('reciting');
    toggleBtn.textContent = '🎤 开始背诵';
    stopBtn.classList.add('hidden');
    statusEl.classList.remove('listening');
    statusEl.textContent = '评分完成，可以再背一次或点「听整首」';
    if (panel) panel.classList.remove('hidden');

    if (p && window.PoemRecite) {
      var result = window.PoemRecite.score(p.fullText, heard);
      scoreWrap.classList.remove('hidden');
      percentEl.textContent = result.percent + '%';
      percentEl.className = 'poem-recite-percent ' + result.level;
      msgEl.textContent = result.message +
        '（匹配 ' + result.matched + ' / ' + result.total + ' 字）';
      if (heardEl) {
        heardEl.textContent = heard ? '识别到：' + heard : '未识别到有效内容';
      }
    }
  }

  function resetPoemRecitePanel() {
    if (window.PoemRecite) window.PoemRecite.reset();
    var panel = document.getElementById('poem-recite-panel');
    var toggleBtn = document.getElementById('poem-recite-toggle');
    var stopBtn = document.getElementById('poem-recite-stop');
    var statusEl = document.getElementById('poem-recite-status');
    var heardEl = document.getElementById('poem-recite-heard');
    var scoreWrap = document.getElementById('poem-recite-score-wrap');
    if (!panel) return;
    panel.classList.add('hidden');
    if (toggleBtn) {
      toggleBtn.classList.remove('reciting');
      toggleBtn.textContent = '🎤 开始背诵';
    }
    if (stopBtn) stopBtn.classList.add('hidden');
    if (statusEl) {
      statusEl.classList.remove('listening');
      statusEl.textContent = '大声背出全诗，背完后点「结束评分」';
    }
    if (heardEl) heardEl.textContent = '';
    if (scoreWrap) scoreWrap.classList.add('hidden');
  }

  function renderPoem() {
    var sem = POEM_DATA.getSemester(state.poemSemId);
    var p = state.poemList[state.poemIndex];
    if (!p) return;

    document.getElementById('poem-progress').textContent =
      '第 ' + (state.poemIndex + 1) + ' / ' + state.poemList.length + ' 首';
    document.getElementById('poem-sem-label').textContent = sem.label;
    document.getElementById('poem-title').textContent = p.title;
    document.getElementById('poem-author').textContent =
      '【' + p.dynasty + '】' + p.author;

    var linesEl = document.getElementById('poem-lines');
    linesEl.innerHTML = '';
    p.lines.forEach(function (line) {
      var row = document.createElement('div');
      row.className = 'poem-line';
      row.innerHTML =
        '<div class="poem-line-text">' + line.text + '</div>' +
        '<div class="poem-line-pinyin">' + line.pinyin + '</div>';
      linesEl.appendChild(row);
    });

    bindSpeak(document.getElementById('poem-speak-all'), function () {
      resetPoemRecitePanel();
      Speech.speakPoemFull(p.id, p.title, p.author, p.speakText || p.fullText);
    });

    resetPoemRecitePanel();
  }

  document.getElementById('poem-recite-toggle').addEventListener('click', function () {
    var p = state.poemList[state.poemIndex];
    if (!p || !window.PoemRecite) return;

    if (window.PoemRecite.isListening()) {
      stopPoemRecite();
      return;
    }

    Speech.stop();
    var panel = document.getElementById('poem-recite-panel');
    var toggleBtn = document.getElementById('poem-recite-toggle');
    var stopBtn = document.getElementById('poem-recite-stop');
    var statusEl = document.getElementById('poem-recite-status');
    var heardEl = document.getElementById('poem-recite-heard');
    var scoreWrap = document.getElementById('poem-recite-score-wrap');

    panel.classList.remove('hidden');
    scoreWrap.classList.add('hidden');
    heardEl.textContent = '';
    toggleBtn.classList.add('reciting');
    toggleBtn.textContent = '🎤 背诵中…';
    stopBtn.classList.remove('hidden');
    statusEl.classList.add('listening');
    statusEl.textContent = '🎙 正在听，请大声背诵全诗…';

    if (!window.PoemRecite.isSupported()) {
      statusEl.classList.remove('listening');
      statusEl.textContent = '当前设备不支持语音识别，请用 Chrome 浏览器或更新 App';
      toggleBtn.classList.remove('reciting');
      toggleBtn.textContent = '🎤 开始背诵';
      stopBtn.classList.add('hidden');
      return;
    }

    window.PoemRecite.start({
      onPartial: function (full) {
        heardEl.textContent = '识别到：' + full;
      },
      onError: function (msg) {
        statusEl.classList.remove('listening');
        statusEl.textContent = msg;
        toggleBtn.classList.remove('reciting');
        toggleBtn.textContent = '🎤 开始背诵';
        stopBtn.classList.add('hidden');
      }
    });
  });

  document.getElementById('poem-recite-stop').addEventListener('click', function () {
    stopPoemRecite();
  });

  document.getElementById('poem-back-map').addEventListener('click', function () {
    startPoemMap();
  });

  document.getElementById('poem-prev').addEventListener('click', function () {
    state.poemIndex = (state.poemIndex - 1 + state.poemList.length) % state.poemList.length;
    renderPoem();
  });

  document.getElementById('poem-next').addEventListener('click', function () {
    state.poemIndex = (state.poemIndex + 1) % state.poemList.length;
    renderPoem();
  });

  // ========== 识字卡片 ==========
  function startFlashcard() {
    state.module = 'flashcard';
    state.flashList = shuffle(CHARACTERS.slice());
    state.flashIndex = 0;
    logStart('flashcard', { total: state.flashList.length });
    showScreen('flashcard-screen');
    renderFlashcard();
  }

  function renderFlashcard() {
    var item = state.flashList[state.flashIndex];
    document.getElementById('flash-progress').textContent =
      '第 ' + (state.flashIndex + 1) + ' / ' + state.flashList.length + ' 张';
    document.getElementById('flash-emoji').textContent = item.emoji;
    document.getElementById('flash-char').textContent = item.char;
    document.getElementById('flash-pinyin').textContent = item.pinyin;
    document.getElementById('flash-word').textContent = item.word;
    bindSpeak(document.getElementById('flash-speak-char'), function () {
      Speech.speakChar(item.char);
    });
    bindSpeak(document.getElementById('flash-speak-word'), function () {
      Speech.speakWord(item.word);
    });
  }

  document.getElementById('flash-prev').addEventListener('click', function () {
    state.flashIndex = (state.flashIndex - 1 + state.flashList.length) % state.flashList.length;
    renderFlashcard();
  });

  document.getElementById('flash-next').addEventListener('click', function () {
    state.flashIndex = (state.flashIndex + 1) % state.flashList.length;
    renderFlashcard();
    Speech.speakChar(state.flashList[state.flashIndex].char);
  });

  // ========== 读题训练 ==========
  function startRead() {
    state.module = 'read';
    state.questions = pickRandom(READ_QUESTIONS, READ_TOTAL);
    state.index = 0;
    state.score = 0;
    logStart('read', { total: READ_TOTAL });
    showScreen('read-screen');
    renderReadQuestion();
  }

  function renderReadQuestion() {
    var q = state.questions[state.index];
    document.getElementById('read-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + READ_TOTAL + ' 题';
    document.getElementById('read-score').textContent = '完成：' + state.score;

    var textEl = document.getElementById('read-text');
    textEl.innerHTML = q.text.replace(
      q.keyword,
      '<span class="keyword-highlight">' + q.keyword + '</span>'
    );
    document.getElementById('read-pinyin').textContent = q.pinyin;
    document.getElementById('read-task').classList.remove('show');
    document.getElementById('read-task-text').textContent = q.task;
    document.getElementById('read-example').textContent = '例子：' + q.example;
    document.getElementById('read-done').style.display = 'inline-block';
    document.getElementById('read-next').classList.remove('show');

    bindSpeak(document.getElementById('read-speak-question'), function () {
      Speech.speakQuestion(q.text);
    });
    bindSpeak(document.getElementById('read-speak-keyword'), function () {
      Speech.speakWord(q.keyword);
    });
    bindSpeak(document.getElementById('read-speak-task'), function () {
      Speech.speakQuestion(q.task);
    });
  }

  document.getElementById('read-done').addEventListener('click', function () {
    document.getElementById('read-task').classList.add('show');
    document.getElementById('read-done').style.display = 'none';
    document.getElementById('read-next').classList.add('show');
    state.score++;
    document.getElementById('read-score').textContent = '完成：' + state.score;
  });

  document.getElementById('read-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= READ_TOTAL) {
      showResult('read', state.score, READ_TOTAL);
    } else {
      renderReadQuestion();
    }
  });

  // ========== 题目常用词 ==========
  function startKeywords() {
    state.module = 'keywords';
    state.kwIndex = 0;
    logStart('keywords', { total: QUESTION_WORDS.length });
    showScreen('keywords-screen');
    renderKeyword();
  }

  function renderKeyword() {
    var item = QUESTION_WORDS[state.kwIndex];
    document.getElementById('kw-progress').textContent =
      '第 ' + (state.kwIndex + 1) + ' / ' + QUESTION_WORDS.length + ' 个';
    document.getElementById('kw-word').textContent = item.word;
    document.getElementById('kw-pinyin').textContent = item.pinyin;
    document.getElementById('kw-meaning').textContent = item.meaning;
    bindSpeak(document.getElementById('kw-speak-word'), function () {
      Speech.speakWord(item.word);
    });
    bindSpeak(document.getElementById('kw-speak-meaning'), function () {
      Speech.speakMeaning(item.word, item.meaning);
    });
  }

  document.getElementById('kw-prev').addEventListener('click', function () {
    state.kwIndex = (state.kwIndex - 1 + QUESTION_WORDS.length) % QUESTION_WORDS.length;
    renderKeyword();
  });

  document.getElementById('kw-next').addEventListener('click', function () {
    state.kwIndex = (state.kwIndex + 1) % QUESTION_WORDS.length;
    renderKeyword();
    Speech.speakWord(QUESTION_WORDS[state.kwIndex].word);
  });

  // ========== 词语与句子 ==========
  function renderSentenceKnowledge() {
    var listEl = document.getElementById('sentence-knowledge-list');
    if (!listEl || listEl.childElementCount) return;
    SENTENCE_DATA.KNOWLEDGE.forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = '<strong>' + item.title + '：</strong>' + item.text;
      listEl.appendChild(li);
    });
  }

  document.querySelectorAll('#sentence-screen .sentence-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#sentence-screen .sentence-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.sentenceMode = tab.dataset.smode;
      startSentence(false);
    });
  });

  function startSentence(resetMode) {
    if (resetMode !== false) {
      state.sentenceMode = 'all';
      document.querySelectorAll('#sentence-screen .sentence-tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.smode === 'all');
      });
    }
    state.module = 'sentence';
    state.questions = SENTENCE_DATA.pickQuestions(state.sentenceMode, SENTENCE_TOTAL);
    state.index = 0;
    state.score = 0;
    logStart('sentence', {
      subName: getSentenceModeLabel(state.sentenceMode),
      total: SENTENCE_TOTAL
    });
    renderSentenceKnowledge();
    showScreen('sentence-screen');
    renderSentenceQuestion();
  }

  function renderSentenceQuestion() {
    var q = state.questions[state.index];
    state.answered = false;

    document.getElementById('sentence-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + SENTENCE_TOTAL + ' 题';
    document.getElementById('sentence-score').textContent = '得分：' + state.score;
    document.getElementById('sentence-category').textContent =
      SENTENCE_DATA.CATEGORY_LABELS[q.category] || '';
    document.getElementById('sentence-prompt').textContent = q.prompt;
    document.getElementById('sentence-feedback').className = 'feedback';
    document.getElementById('sentence-next').classList.remove('show');

    var stemEl = document.getElementById('sentence-stem');
    if (q.type === 'fill') {
      stemEl.classList.remove('hidden');
      stemEl.innerHTML =
        q.before + '<span class="sentence-blank">（　　）</span>' + q.after;
    } else {
      stemEl.classList.add('hidden');
      stemEl.innerHTML = '';
    }

    bindSpeak(document.getElementById('sentence-speak'), function () {
      Speech.speakQuestion(SENTENCE_DATA.buildSpeakText(q));
    });

    var optsEl = document.getElementById('sentence-options');
    optsEl.innerHTML = '';
    shuffle(q.options).forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        handleSentenceAnswer(btn, opt, q.answer);
      });
      optsEl.appendChild(btn);
    });
  }

  function handleSentenceAnswer(btn, selected, answer) {
    if (state.answered) return;
    state.answered = true;
    var buttons = document.querySelectorAll('#sentence-options .option-btn');
    buttons.forEach(function (b) { b.disabled = true; });
    var feedback = document.getElementById('sentence-feedback');
    if (selected === answer) {
      btn.classList.add('correct');
      state.score++;
      feedback.textContent = randomEncouragement();
      feedback.className = 'feedback show success';
    } else {
      btn.classList.add('wrong');
      buttons.forEach(function (b) {
        if (b.textContent === answer) b.classList.add('correct');
      });
      feedback.textContent = '正确答案是：' + answer;
      feedback.className = 'feedback show error';
    }
    document.getElementById('sentence-score').textContent = '得分：' + state.score;
    document.getElementById('sentence-next').classList.add('show');
  }

  document.getElementById('sentence-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= SENTENCE_TOTAL) {
      showResult('sentence', state.score, SENTENCE_TOTAL);
    } else {
      renderSentenceQuestion();
    }
  });

  // ========== 三年级预习 ==========
  var preview3TabsBuilt = false;

  function buildPreview3Tabs() {
    if (preview3TabsBuilt) return;
    var tabsEl = document.getElementById('preview3-tabs');
    if (!tabsEl) return;
    tabsEl.innerHTML = '';
    GRADE3_PREVIEW.CATEGORIES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'mode-tab preview3-tab';
      btn.dataset.p3cat = cat.id;
      btn.textContent = cat.name;
      btn.addEventListener('click', function () {
        document.querySelectorAll('#preview3-tabs .preview3-tab').forEach(function (t) {
          t.classList.remove('active');
        });
        btn.classList.add('active');
        state.preview3Cat = cat.id;
        state.preview3Index = 0;
        renderPreview3();
      });
      tabsEl.appendChild(btn);
    });
    preview3TabsBuilt = true;
  }

  function getPreview3Items() {
    return GRADE3_PREVIEW.getItems(state.preview3Cat);
  }

  function getPreview3CurrentItem() {
    var items = getPreview3Items();
    return items[state.preview3Index] || null;
  }

  function resetPreview3RecitePanel() {
    if (window.PoemRecite) window.PoemRecite.reset();
    var panel = document.getElementById('preview3-recite-panel');
    var toggleBtn = document.getElementById('preview3-recite-toggle');
    var stopBtn = document.getElementById('preview3-recite-stop');
    var statusEl = document.getElementById('preview3-recite-status');
    var heardEl = document.getElementById('preview3-recite-heard');
    var scoreWrap = document.getElementById('preview3-recite-score-wrap');
    if (!panel) return;
    panel.classList.add('hidden');
    if (toggleBtn) {
      toggleBtn.classList.remove('reciting');
      toggleBtn.textContent = '🎤 开始背诵';
    }
    if (stopBtn) stopBtn.classList.add('hidden');
    if (statusEl) {
      statusEl.classList.remove('listening');
      statusEl.textContent = '大声背诵，背完后点「结束评分」';
    }
    if (heardEl) heardEl.textContent = '';
    if (scoreWrap) scoreWrap.classList.add('hidden');
  }

  function renderPreview3ReciteHistory(itemId) {
    var histEl = document.getElementById('preview3-recite-history');
    if (!histEl || !itemId) return;
    var rec = GRADE3_PREVIEW.getReciteRecord(itemId);
    if (!rec || !rec.history || !rec.history.length) {
      histEl.classList.add('hidden');
      histEl.innerHTML = '';
      return;
    }
    histEl.classList.remove('hidden');
    var html = '<div class="preview3-recite-history-title">背诵记录</div><ul class="preview3-recite-history-list">';
    rec.history.forEach(function (h) {
      var gradeCls = h.grade === '优' ? 'grade-great' : (h.grade === '良' ? 'grade-good' : 'grade-ok');
      html += '<li><span class="preview3-recite-date">' +
        GRADE3_PREVIEW.formatReciteDate(h.at) +
        '</span><span class="preview3-recite-score ' + gradeCls + '">' +
        h.percent + '% · ' + h.grade + '</span></li>';
    });
    html += '</ul>';
    if (rec.best > 0) {
      html += '<div class="preview3-recite-best">最高 ' + rec.best + '%（' + rec.bestGrade + '）</div>';
    }
    histEl.innerHTML = html;
  }

  function stopPreview3Recite() {
    if (!window.PoemRecite) return;
    var item = getPreview3CurrentItem();
    var wasListening = window.PoemRecite.isListening();
    var heard = wasListening ? window.PoemRecite.stop() : window.PoemRecite.getTranscript();
    if (!wasListening && !heard) return;

    var panel = document.getElementById('preview3-recite-panel');
    var toggleBtn = document.getElementById('preview3-recite-toggle');
    var stopBtn = document.getElementById('preview3-recite-stop');
    var statusEl = document.getElementById('preview3-recite-status');
    var heardEl = document.getElementById('preview3-recite-heard');
    var scoreWrap = document.getElementById('preview3-recite-score-wrap');
    var percentEl = document.getElementById('preview3-recite-percent');
    var msgEl = document.getElementById('preview3-recite-msg');
    var badgeEl = document.getElementById('preview3-recite-badge');

    toggleBtn.classList.remove('reciting');
    toggleBtn.textContent = '🎤 开始背诵';
    stopBtn.classList.add('hidden');
    statusEl.classList.remove('listening');
    statusEl.textContent = '评分完成，可以再背一次';
    if (panel) panel.classList.remove('hidden');

    if (item && item.recite && window.PoemRecite) {
      var result = window.PoemRecite.score(item.recite, heard);
      var itemId = GRADE3_PREVIEW.getItemId(item);
      GRADE3_PREVIEW.saveReciteRecord(itemId, result, heard);
      if (window.LearningLog && window.LearningLog.addReciteLog) {
        window.LearningLog.addReciteLog({
          subject: '语文',
          module: 'preview3',
          moduleName: '三年级必背',
          subName: item.title,
          percent: result.percent,
          score: result.percent,
          result: '背诵 ' + result.percent + '% · ' + GRADE3_PREVIEW.gradeFromPercent(result.percent)
        });
      }
      scoreWrap.classList.remove('hidden');
      percentEl.textContent = result.percent + '%';
      percentEl.className = 'poem-recite-percent ' + result.level;
      var grade = GRADE3_PREVIEW.gradeFromPercent(result.percent);
      msgEl.textContent = result.message + ' · ' + grade +
        '（匹配 ' + result.matched + ' / ' + result.total + ' 字）';
      if (heardEl) {
        heardEl.textContent = heard ? '识别到：' + heard : '未识别到有效内容';
      }
      renderPreview3ReciteHistory(itemId);
      if (badgeEl) {
        var rec = GRADE3_PREVIEW.getReciteRecord(itemId);
        if (rec && rec.best > 0) {
          badgeEl.textContent = '🏅 最高 ' + rec.best + '% · ' + rec.bestGrade;
          badgeEl.classList.remove('hidden');
        }
      }
    }
  }

  function startPreview3() {
    if (!window.GRADE3_PREVIEW) {
      console.warn('GRADE3_PREVIEW missing');
      return;
    }
    state.module = 'preview3';
    state.preview3Cat = GRADE3_PREVIEW.CATEGORIES[0].id;
    state.preview3Index = 0;
    buildPreview3Tabs();
    try {
      logStart('preview3', {
        subName: '必背打卡 · ' + GRADE3_PREVIEW.CATEGORIES[0].name,
        total: getPreview3Items().length
      });
    } catch (eLog) { /* ignore */ }
    showScreen('preview3-screen');
    document.querySelectorAll('#preview3-tabs .preview3-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.p3cat === state.preview3Cat);
    });
    renderPreview3();
  }
  window.startPreview3 = startPreview3;

  function renderPreview3() {
    resetPreview3RecitePanel();
    var items = getPreview3Items();
    if (!items.length) return;
    if (state.preview3Index >= items.length) state.preview3Index = 0;
    var item = items[state.preview3Index];
    var itemId = GRADE3_PREVIEW.getItemId(item);
    var cat = GRADE3_PREVIEW.getCategory(state.preview3Cat);
    var card = document.querySelector('#preview3-screen .preview3-card');
    document.getElementById('preview3-progress').textContent =
      (state.preview3Index + 1) + ' / ' + items.length + ' · ' + (cat ? cat.name : '');
    document.getElementById('preview3-icon').textContent = cat ? cat.icon : '📗';
    document.getElementById('preview3-point-title').textContent = item.title;
    var metaEl = document.getElementById('preview3-point-meta');
    if (metaEl) {
      var metaParts = [];
      if (item.semester) metaParts.push(item.semester);
      if (item.unit) metaParts.push(item.unit);
      if (metaParts.length) {
        metaEl.textContent = metaParts.join(' · ');
        metaEl.classList.remove('hidden');
      } else {
        metaEl.textContent = '';
        metaEl.classList.add('hidden');
      }
    }
    var authorEl = document.getElementById('preview3-point-author');
    if (authorEl) {
      if (item.author) {
        authorEl.textContent = item.author;
        authorEl.classList.remove('hidden');
      } else {
        authorEl.textContent = '';
        authorEl.classList.add('hidden');
      }
    }
    var badgeEl = document.getElementById('preview3-recite-badge');
    if (badgeEl) {
      if (item.recite) {
        var rec = GRADE3_PREVIEW.getReciteRecord(itemId);
        if (rec && rec.best > 0) {
          badgeEl.textContent = '🏅 最高 ' + rec.best + '% · ' + rec.bestGrade;
          badgeEl.classList.remove('hidden');
        } else {
          badgeEl.textContent = '';
          badgeEl.classList.add('hidden');
        }
      } else {
        badgeEl.classList.add('hidden');
      }
    }
    var hasPoemLayout = item.lines && item.lines.length &&
      (item.category === 'poem' || item.category === 'garden');
    if (card) card.classList.toggle('preview3-poem', hasPoemLayout);
    var contentEl = document.getElementById('preview3-point-content');
    var linesEl = document.getElementById('preview3-poem-lines');
    if (hasPoemLayout && linesEl) {
      contentEl.classList.add('hidden');
      linesEl.classList.remove('hidden');
      linesEl.innerHTML = '';
      item.lines.forEach(function (line) {
        var row = document.createElement('div');
        row.className = 'preview3-poem-line';
        row.innerHTML =
          '<div class="preview3-poem-text">' + line.text + '</div>' +
          '<div class="preview3-poem-pinyin">' + line.pinyin + '</div>';
        linesEl.appendChild(row);
      });
    } else {
      if (linesEl) {
        linesEl.classList.add('hidden');
        linesEl.innerHTML = '';
      }
      contentEl.classList.remove('hidden');
      contentEl.textContent = item.content;
    }
    var notesEl = document.getElementById('preview3-point-notes');
    if (notesEl) {
      if (item.notes) {
        notesEl.textContent = '注释：' + item.notes;
        notesEl.classList.remove('hidden');
      } else {
        notesEl.textContent = '';
        notesEl.classList.add('hidden');
      }
    }
    document.getElementById('preview3-point-example').textContent = item.example || '';
    bindSpeak(document.getElementById('preview3-speak'), function () {
      Speech.speakQuestion(item.speak || item.example || item.title + '。' + item.content);
    });
    var reciteBtn = document.getElementById('preview3-recite');
    if (reciteBtn) {
      if (item.poemId && item.recite) {
        reciteBtn.classList.remove('hidden');
        reciteBtn.onclick = function () {
          resetPreview3RecitePanel();
          var title = item.title.replace(/[《》]/g, '');
          var author = item.author ? item.author.replace(/^【[^】]+】/, '') : '';
          Speech.speakPoemFull(item.poemId, title, author, item.recite);
        };
      } else {
        reciteBtn.classList.add('hidden');
        reciteBtn.onclick = null;
      }
    }
    var recitePanel = document.getElementById('preview3-recite-panel');
    if (recitePanel) {
      if (item.recite) {
        recitePanel.classList.remove('hidden');
        renderPreview3ReciteHistory(itemId);
      } else {
        recitePanel.classList.add('hidden');
      }
    }
  }

  document.getElementById('preview3-recite-toggle').addEventListener('click', function () {
    var item = getPreview3CurrentItem();
    if (!item || !item.recite || !window.PoemRecite) return;

    if (window.PoemRecite.isListening()) {
      stopPreview3Recite();
      return;
    }

    Speech.stop();
    var panel = document.getElementById('preview3-recite-panel');
    var toggleBtn = document.getElementById('preview3-recite-toggle');
    var stopBtn = document.getElementById('preview3-recite-stop');
    var statusEl = document.getElementById('preview3-recite-status');
    var heardEl = document.getElementById('preview3-recite-heard');
    var scoreWrap = document.getElementById('preview3-recite-score-wrap');

    panel.classList.remove('hidden');
    scoreWrap.classList.add('hidden');
    heardEl.textContent = '';
    toggleBtn.classList.add('reciting');
    toggleBtn.textContent = '🎤 背诵中…';
    stopBtn.classList.remove('hidden');
    statusEl.classList.add('listening');
    statusEl.textContent = '🎙 正在听，请大声背诵…';

    if (!window.PoemRecite.isSupported()) {
      statusEl.classList.remove('listening');
      statusEl.textContent = '当前设备不支持语音识别，请用 Chrome 浏览器或更新 App';
      toggleBtn.classList.remove('reciting');
      toggleBtn.textContent = '🎤 开始背诵';
      stopBtn.classList.add('hidden');
      return;
    }

    window.PoemRecite.start({
      onPartial: function (full) {
        heardEl.textContent = '识别到：' + full;
      },
      onError: function (msg) {
        statusEl.classList.remove('listening');
        statusEl.textContent = msg;
        toggleBtn.classList.remove('reciting');
        toggleBtn.textContent = '🎤 开始背诵';
        stopBtn.classList.add('hidden');
      }
    });
  });

  document.getElementById('preview3-recite-stop').addEventListener('click', function () {
    stopPreview3Recite();
  });

  document.getElementById('preview3-prev').addEventListener('click', function () {
    var items = getPreview3Items();
    state.preview3Index = (state.preview3Index - 1 + items.length) % items.length;
    renderPreview3();
  });

  document.getElementById('preview3-next').addEventListener('click', function () {
    var items = getPreview3Items();
    state.preview3Index = (state.preview3Index + 1) % items.length;
    renderPreview3();
    var item = items[state.preview3Index];
    Speech.speakQuestion(item.speak || item.title + '。' + item.content);
  });

  // ========== 结果页 ==========
  function showResult(module, score, total, extraStars) {
    if (Session) {
      var resultText = score + ' / ' + total;
      if (module === 'lesson') {
        var info = LESSON_DATA.findLesson(state.lessonId);
        var title = info ? info.lesson.title : '';
        var stars = extraStars || LESSON_DATA.starsFromScore(score, total);
        resultText = '「' + title + '」' + score + '/' + total + ' · ' + '⭐'.repeat(stars || 1);
      } else if (module === 'read') {
        resultText = '完成 ' + score + ' / ' + total + ' 题';
      }
      Session.finish({
        status: '完成',
        score: score,
        total: total,
        progress: total,
        result: resultText
      });
    }
    showScreen('result-screen');
    var pct = Math.round((score / total) * 100);
    var emoji = '🌟';
    var msg = '继续加油！';
    if (pct >= 90) { emoji = '🏆'; msg = '太棒了！你是小达人！'; }
    else if (pct >= 70) { emoji = '👍'; msg = '很不错！继续保持！'; }
    else if (pct >= 50) { emoji = '💪'; msg = '有进步！再练一练！'; }

    var titles = {
      pinyin: '拼音练习',
      char: '识字配对',
      read: '读题训练',
      lesson: '课文识字通关',
      sentence: '词语与句子'
    };
    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = titles[module] + ' 完成！';
    if (module === 'lesson') {
      var info = LESSON_DATA.findLesson(state.lessonId);
      var title = info ? info.lesson.title : '';
      var stars = extraStars || LESSON_DATA.starsFromScore(score, total);
      document.getElementById('result-msg').textContent =
        '「' + title + '」通关！获得 ' + '⭐'.repeat(stars || 1);
    } else {
      document.getElementById('result-msg').textContent = msg;
    }
    document.getElementById('result-score').textContent = score + ' / ' + total;
  }

  document.getElementById('result-home').addEventListener('click', function () {
    showScreen('home');
  });

  document.getElementById('result-retry').addEventListener('click', function () {
    if (state.module === 'pinyin') startPinyin();
    else if (state.module === 'char') startChar();
    else if (state.module === 'read') startRead();
    else if (state.module === 'lesson' && state.lessonId) startLessonPlay(state.lessonId);
    else if (state.module === 'sentence') startSentence(false);
    else showScreen('home');
  });

  function getActiveScreenId() {
    var el = document.querySelector('.screen.active');
    return el ? el.id : 'home';
  }

  function handleHardwareBack() {
    var id = getActiveScreenId();
    if (id === 'home') {
      window.location.href = '../app/index.html';
      return true;
    }
    if (id === 'lesson-play-screen') {
      state.lessonProgress = LESSON_DATA.loadProgress();
      startLessonMap();
      return true;
    }
    if (id === 'poem-view-screen') {
      startPoemMap();
      return true;
    }
    showScreen('home');
    return true;
  }

  if (window.AppBackNav) {
    window.AppBackNav.onBack(handleHardwareBack);
  }

  showScreen('home');

  function bootFromUrl() {
    try {
      var params = new URLSearchParams(location.search || '');
      var hash = (location.hash || '').replace(/^#/, '');
      var mod = params.get('module') || hash;
      var grade = params.get('grade');
      if (mod === 'preview3' || grade === 'g3a') {
        setHomeGrade('g3a');
      }
      if (mod === 'preview3' && typeof startPreview3 === 'function') {
        startPreview3();
      }
    } catch (eBoot) { /* ignore */ }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootFromUrl);
  } else {
    setTimeout(bootFromUrl, 30);
  }
})();
