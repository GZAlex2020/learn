(function () {
  'use strict';

  var Speech = window.SpeechHelper;
  var MATH_DATA = window.MATH_DATA;
  var TEN_METHODS = window.TEN_METHODS_DATA.METHODS;
  var TEN_METHODS_DATA = window.TEN_METHODS_DATA;
  var TEN_PRACTICE_TOTAL = window.TEN_METHODS_DATA.TEN_PRACTICE_TOTAL;
  var CALC_MODES = MATH_DATA.CALC_MODES;
  var CONCEPTS = MATH_DATA.CONCEPTS;
  var KEYWORDS = window.MATH_DATA.KEYWORDS;
  var ENCOURAGEMENTS = window.MATH_DATA.ENCOURAGEMENTS;
  var READ_QUESTIONS = window.QUESTION_DATA.READ_QUESTIONS;
  var CALC_TOTAL = window.QUESTION_DATA.CALC_TOTAL;
  var CONCEPT_TOTAL = window.QUESTION_DATA.CONCEPT_TOTAL;
  var READ_TOTAL = window.QUESTION_DATA.READ_TOTAL;
  var GRADE3_PREVIEW = window.GRADE3_PREVIEW;
  var CLOCK_MONEY_DATA = window.CLOCK_MONEY_DATA;
  var CM_PRACTICE_TOTAL = window.CLOCK_MONEY_DATA.PRACTICE_TOTAL;

  var state = {
    module: null,
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    selectedLeft: null,
    matched: {},
    leftItems: [],
    rightItems: [],
    flashList: [],
    flashIndex: 0,
    kwIndex: 0,
    calcMode: 'add10',
    multRow: 1,
    multSelected: null,
    multViewed: 0,
    tenMethodId: 'make10',
    tenExampleIndex: 0,
    preview3Cat: 'calc',
    preview3Index: 0,
    cmTopic: 'clock',
    cmKnowledgeIndex: 0
  };

  var Session = window.createSessionLogger ? window.createSessionLogger('数学') : null;
  var MODULE_NAMES = {
    calc: '口算练习',
    match: '概念配对',
    flashcard: '概念卡片',
    read: '读题训练',
    keywords: '题目常用词',
    mult: '乘法口诀',
    ten: '凑十破十',
    preview3: '三年级预习',
    clockmoney: '时钟与钱币'
  };

  function sessionExtras() {
    var ex = {};
    if (state.module === 'calc') {
      var mode = CALC_MODES.find(function (m) { return m.id === state.calcMode; });
      ex.subName = mode ? mode.label : '';
      ex.total = CALC_TOTAL;
      ex.progress = state.index + (state.answered ? 1 : 0);
    } else if (state.module === 'match') {
      ex.progress = Object.keys(state.matched).length;
      ex.total = CONCEPT_TOTAL;
    } else if (state.module === 'flashcard') {
      ex.progress = state.flashIndex + 1;
      ex.total = state.flashList.length;
    } else if (state.module === 'keywords') {
      ex.progress = state.kwIndex + 1;
      ex.total = KEYWORDS.length;
    } else if (state.module === 'read') {
      ex.total = READ_TOTAL;
      ex.progress = Math.min(READ_TOTAL, state.index + 1);
    } else if (state.module === 'mult') {
      ex.subName = state.multRow + '的口诀';
      ex.total = 9;
      ex.progress = state.multViewed || 0;
    } else if (state.module === 'ten') {
      var tm = TEN_METHODS_DATA.getMethod(state.tenMethodId);
      ex.subName = tm ? tm.name : '凑十破十';
      ex.total = TEN_METHODS.length;
      ex.progress = state.tenExampleIndex + 1;
    } else if (state.module === 'preview3') {
      var cat = GRADE3_PREVIEW.getCategory(state.preview3Cat);
      ex.subName = cat ? cat.name : '';
      ex.total = GRADE3_PREVIEW.getItems(state.preview3Cat).length;
      ex.progress = state.preview3Index + 1;
    } else if (state.module === 'clockmoney') {
      var cmItems = CLOCK_MONEY_DATA.getKnowledge(state.cmTopic);
      ex.subName = CLOCK_MONEY_DATA.getTopic(state.cmTopic).name;
      ex.total = cmItems.length;
      ex.progress = state.cmKnowledgeIndex + 1;
    } else if (state.module === 'cmPractice') {
      ex.subName = CLOCK_MONEY_DATA.getTopic(state.cmTopic).name + '练习';
      ex.total = CM_PRACTICE_TOTAL;
      ex.progress = state.index + (state.answered ? 1 : 0);
    }
    return ex;
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
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }

  function randomEncouragement() {
    return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  }

  document.querySelectorAll('.module-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var mod = card.dataset.module;
      if (mod === 'calc') startCalcFromHome();
      else if (mod === 'match') startMatch();
      else if (mod === 'flashcard') startFlashcard();
      else if (mod === 'read') startRead();
      else if (mod === 'keywords') startKeywords();
      else if (mod === 'mult') startMultTable();
      else if (mod === 'ten') startTenMethods();
      else if (mod === 'preview3') startPreview3();
      else if (mod === 'clockmoney') startClockMoney();
    });
  });

  document.querySelectorAll('#ten-screen .ten-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#ten-screen .ten-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.tenMethodId = tab.dataset.ten;
      state.tenExampleIndex = 0;
      renderTenMethod();
    });
  });

  document.querySelectorAll('.back-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { showScreen('home'); });
  });

  Speech.ensureReady(function () {});

  // ========== 口算练习 ==========
  document.querySelectorAll('#calc-screen .calc-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#calc-screen .calc-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.calcMode = tab.dataset.calc;
      startCalc(false);
    });
  });

  function startCalc(resetTab) {
    if (resetTab !== false) {
      state.calcMode = 'add10';
      document.querySelectorAll('#calc-screen .calc-tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.calc === 'add10');
      });
    }
    state.module = 'calc';
    state.questions = MATH_DATA.generateCalcQuestions(state.calcMode, CALC_TOTAL);
    state.index = 0;
    state.score = 0;
    var mode = CALC_MODES.find(function (m) { return m.id === state.calcMode; });
    logStart('calc', { subName: mode ? mode.label : '', total: CALC_TOTAL });
    showScreen('calc-screen');
    updateCalcModeLabel();
    renderCalcQuestion();
  }

  function updateCalcModeLabel() {
    var mode = CALC_MODES.find(function (m) { return m.id === state.calcMode; });
    var text = mode ? mode.label + ' · ' + mode.hint : '';
    document.getElementById('calc-mode-label').textContent = text + ' · 选出正确答案';
  }

  function startCalcFromHome() {
    startCalc(true);
  }

  function renderCalcQuestion() {
    var q = state.questions[state.index];
    state.answered = false;
    document.getElementById('calc-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + CALC_TOTAL + ' 题';
    document.getElementById('calc-score').textContent = '得分：' + state.score;
    document.getElementById('calc-expr').textContent = q.expr + ' = ?';
    document.getElementById('calc-feedback').className = 'feedback';
    document.getElementById('calc-next').classList.remove('show');

    var optsEl = document.getElementById('calc-options');
    optsEl.innerHTML = '';
    shuffle(q.options).forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        if (state.answered) return;
        state.answered = true;
        if (opt === q.answer) {
          state.score++;
          btn.classList.add('correct');
          document.getElementById('calc-feedback').textContent = randomEncouragement();
          document.getElementById('calc-feedback').className = 'feedback show success';
        } else {
          btn.classList.add('wrong');
          document.querySelectorAll('#calc-options .option-btn').forEach(function (b) {
            if (Number(b.textContent) === q.answer) b.classList.add('correct');
          });
          document.getElementById('calc-feedback').textContent = '正确答案是：' + q.answer;
          document.getElementById('calc-feedback').className = 'feedback show error';
        }
        document.getElementById('calc-score').textContent = '得分：' + state.score;
        document.getElementById('calc-next').classList.add('show');
      });
      optsEl.appendChild(btn);
    });
  }

  document.getElementById('calc-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= CALC_TOTAL) {
      showResult('calc', state.score, CALC_TOTAL);
    } else {
      renderCalcQuestion();
    }
  });

  // ========== 概念配对 ==========
  function startMatch() {
    state.module = 'match';
    state.matched = {};
    state.selectedLeft = null;
    var items = pickRandom(CONCEPTS, CONCEPT_TOTAL);
    state.leftItems = items.slice();
    state.rightItems = shuffle(items.map(function (c) {
      return { id: c.symbol, text: c.name, concept: c };
    }));
    logStart('match', { total: CONCEPT_TOTAL });
    showScreen('match-screen');
    renderMatch();
  }

  function renderMatch() {
    document.getElementById('match-count').textContent =
      Object.keys(state.matched).length;
    var leftEl = document.getElementById('match-left');
    var rightEl = document.getElementById('match-right');
    leftEl.innerHTML = '';
    rightEl.innerHTML = '';

    state.leftItems.forEach(function (item, idx) {
      if (state.matched[idx]) return;
      var div = document.createElement('div');
      div.className = 'match-item' + (state.selectedLeft === idx ? ' selected' : '');
      div.textContent = item.emoji + ' ' + item.symbol;
      div.addEventListener('click', function () {
        state.selectedLeft = idx;
        renderMatch();
      });
      leftEl.appendChild(div);
    });

    state.rightItems.forEach(function (item, idx) {
      if (item.matched) return;
      var div = document.createElement('div');
      div.className = 'match-item';
      div.textContent = item.text;
      div.addEventListener('click', function () {
        if (state.selectedLeft === null) return;
        var left = state.leftItems[state.selectedLeft];
        if (left.symbol === item.concept.symbol) {
          state.matched[state.selectedLeft] = true;
          item.matched = true;
          state.selectedLeft = null;
          if (Object.keys(state.matched).length >= CONCEPT_TOTAL) {
            setTimeout(function () {
              if (Session) {
                Session.finish({
                  status: '完成',
                  score: CONCEPT_TOTAL,
                  total: CONCEPT_TOTAL,
                  progress: CONCEPT_TOTAL,
                  result: '全部配对成功'
                });
              }
              alert('全部配对成功！' + randomEncouragement());
              state.module = null;
              showScreen('home');
            }, 300);
          }
        } else {
          div.classList.add('wrong-flash');
          setTimeout(function () { div.classList.remove('wrong-flash'); }, 500);
        }
        renderMatch();
      });
      rightEl.appendChild(div);
    });
  }

  // ========== 概念卡片 ==========
  function startFlashcard() {
    state.module = 'flashcard';
    state.flashList = shuffle(CONCEPTS.slice());
    state.flashIndex = 0;
    logStart('flashcard', { total: state.flashList.length });
    showScreen('flashcard-screen');
    renderFlashcard();
  }

  function renderFlashcard() {
    var c = state.flashList[state.flashIndex];
    document.getElementById('flash-progress').textContent =
      '第 ' + (state.flashIndex + 1) + ' / ' + state.flashList.length + ' 张';
    document.getElementById('flash-emoji').textContent = c.emoji;
    document.getElementById('flash-symbol').textContent = c.symbol;
    document.getElementById('flash-name').textContent = c.name;
    document.getElementById('flash-example').textContent = '例：' + c.example;
    var symEl = document.getElementById('flash-symbol');
    if (c.symbol.length > 6) {
      symEl.style.fontSize = '2.2rem';
    } else {
      symEl.style.fontSize = '';
    }
    document.getElementById('flash-speak').onclick = function () {
      Speech.speakQuestion(c.name + '，' + c.example);
    };
  }

  document.getElementById('flash-prev').addEventListener('click', function () {
    state.flashIndex = (state.flashIndex - 1 + state.flashList.length) % state.flashList.length;
    renderFlashcard();
  });

  document.getElementById('flash-next').addEventListener('click', function () {
    state.flashIndex = (state.flashIndex + 1) % state.flashList.length;
    renderFlashcard();
  });

  // ========== 读题训练 ==========
  function startRead() {
    state.module = 'read';
    state.questions = pickRandom(READ_QUESTIONS, READ_TOTAL);
    state.index = 0;
    logStart('read', { total: READ_TOTAL });
    showScreen('read-screen');
    renderReadQuestion();
  }

  function renderReadQuestion() {
    var q = state.questions[state.index];
    document.getElementById('read-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + READ_TOTAL + ' 题';
    document.getElementById('read-text').textContent = q.text;
    document.getElementById('read-keyword').textContent = q.keyword;
    document.getElementById('read-task').textContent = q.task;
    document.getElementById('read-example').textContent = q.example;
    document.getElementById('read-answer').classList.add('hidden');
    document.getElementById('read-done').style.display = 'inline-block';
    document.getElementById('read-next').classList.remove('show');

    document.getElementById('read-speak').onclick = function () {
      Speech.speakQuestion(q.text);
    };
  }

  document.getElementById('read-done').addEventListener('click', function () {
    document.getElementById('read-answer').classList.remove('hidden');
    document.getElementById('read-done').style.display = 'none';
    document.getElementById('read-next').classList.add('show');
  });

  document.getElementById('read-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= READ_TOTAL) {
      showResult('read', READ_TOTAL, READ_TOTAL);
    } else {
      renderReadQuestion();
    }
  });

  // ========== 题目常用词 ==========
  function startKeywords() {
    state.module = 'keywords';
    state.kwIndex = 0;
    logStart('keywords', { total: KEYWORDS.length });
    showScreen('keywords-screen');
    renderKeyword();
  }

  function renderKeyword() {
    var k = KEYWORDS[state.kwIndex];
    document.getElementById('kw-word').textContent = k.word;
    document.getElementById('kw-meaning').textContent = k.meaning;
    document.getElementById('kw-formula').textContent = '列式提示：' + k.formula;
    document.getElementById('kw-progress').textContent =
      (state.kwIndex + 1) + ' / ' + KEYWORDS.length;
    document.getElementById('kw-speak').onclick = function () {
      Speech.speakQuestion(k.word + '，' + k.meaning);
    };
  }

  document.getElementById('kw-prev').addEventListener('click', function () {
    state.kwIndex = (state.kwIndex - 1 + KEYWORDS.length) % KEYWORDS.length;
    renderKeyword();
  });

  document.getElementById('kw-next').addEventListener('click', function () {
    state.kwIndex = (state.kwIndex + 1) % KEYWORDS.length;
    renderKeyword();
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
        subName: GRADE3_PREVIEW.CATEGORIES[0].name,
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
    var items = getPreview3Items();
    if (!items.length) return;
    if (state.preview3Index >= items.length) state.preview3Index = 0;
    var item = items[state.preview3Index];
    var cat = GRADE3_PREVIEW.getCategory(state.preview3Cat);
    var card = document.querySelector('#preview3-screen .preview3-card');
    document.getElementById('preview3-progress').textContent =
      (state.preview3Index + 1) + ' / ' + items.length + ' · ' + (cat ? cat.name : '');
    document.getElementById('preview3-icon').textContent = cat ? cat.icon : '📗';
    document.getElementById('preview3-point-title').textContent = item.title;
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
    if (card) card.classList.toggle('preview3-poem', false);
    document.getElementById('preview3-point-content').textContent = item.content;
    document.getElementById('preview3-point-example').textContent = item.example || '';
    document.getElementById('preview3-speak').onclick = function () {
      Speech.speakQuestion(item.speak || item.title + '。' + item.content);
    };
  }

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

  // ========== 时钟与钱币 ==========
  document.querySelectorAll('#clockmoney-screen .cm-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#clockmoney-screen .cm-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      state.cmTopic = tab.dataset.cm;
      state.cmKnowledgeIndex = 0;
      renderClockMoney();
    });
  });

  function startClockMoney() {
    state.module = 'clockmoney';
    state.cmTopic = 'clock';
    state.cmKnowledgeIndex = 0;
    logStart('clockmoney', {
      subName: CLOCK_MONEY_DATA.getTopic('clock').name,
      total: CLOCK_MONEY_DATA.getKnowledge('clock').length
    });
    showScreen('clockmoney-screen');
    document.querySelectorAll('#clockmoney-screen .cm-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.cm === state.cmTopic);
    });
    renderClockMoney();
  }

  function renderClockMoney() {
    var items = CLOCK_MONEY_DATA.getKnowledge(state.cmTopic);
    if (!items.length) return;
    if (state.cmKnowledgeIndex >= items.length) state.cmKnowledgeIndex = 0;
    var item = items[state.cmKnowledgeIndex];
    var topic = CLOCK_MONEY_DATA.getTopic(state.cmTopic);
    document.getElementById('cm-knowledge-progress').textContent =
      (state.cmKnowledgeIndex + 1) + ' / ' + items.length + ' · ' + topic.name;
    document.getElementById('cm-icon').textContent = topic.icon;
    document.getElementById('cm-title').textContent = item.title;
    document.getElementById('cm-content').textContent = item.content;
    document.getElementById('cm-example').textContent = item.example;
    document.getElementById('cm-speak').onclick = function () {
      Speech.speakQuestion(item.speak || item.title + '。' + item.content);
    };
  }

  document.getElementById('cm-prev').addEventListener('click', function () {
    var items = CLOCK_MONEY_DATA.getKnowledge(state.cmTopic);
    state.cmKnowledgeIndex = (state.cmKnowledgeIndex - 1 + items.length) % items.length;
    renderClockMoney();
  });

  document.getElementById('cm-next').addEventListener('click', function () {
    var items = CLOCK_MONEY_DATA.getKnowledge(state.cmTopic);
    state.cmKnowledgeIndex = (state.cmKnowledgeIndex + 1) % items.length;
    renderClockMoney();
    var item = items[state.cmKnowledgeIndex];
    Speech.speakQuestion(item.speak || item.title + '。' + item.content);
  });

  function startCmPractice() {
    var topic = CLOCK_MONEY_DATA.getTopic(state.cmTopic);
    state.module = 'cmPractice';
    state.questions = CLOCK_MONEY_DATA.generateQuestions(state.cmTopic, CM_PRACTICE_TOTAL);
    state.index = 0;
    state.score = 0;
    logStart('cmPractice', { subName: topic.name + '练习', total: CM_PRACTICE_TOTAL });
    showScreen('cm-practice-screen');
    renderCmPracticeQuestion();
  }

  function renderCmPracticeQuestion() {
    var topic = CLOCK_MONEY_DATA.getTopic(state.cmTopic);
    var q = state.questions[state.index];
    state.answered = false;
    document.getElementById('cm-practice-label').textContent =
      topic.name + ' · 选出正确答案';
    document.getElementById('cm-practice-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + CM_PRACTICE_TOTAL + ' 题';
    document.getElementById('cm-practice-score').textContent = '得分：' + state.score;
    document.getElementById('cm-practice-prompt').textContent = q.prompt;
    var clockEl = document.getElementById('cm-practice-clock');
    if (q.clock && window.ClockVisual) {
      clockEl.innerHTML = window.ClockVisual.renderHtml(q.clock);
      clockEl.classList.remove('hidden');
    } else {
      clockEl.innerHTML = '';
      clockEl.classList.add('hidden');
    }
    document.getElementById('cm-practice-feedback').className = 'feedback';
    document.getElementById('cm-practice-next').classList.remove('show');

    var optsEl = document.getElementById('cm-practice-options');
    optsEl.innerHTML = '';
    shuffle(q.options).forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        if (state.answered) return;
        state.answered = true;
        var buttons = document.querySelectorAll('#cm-practice-options .option-btn');
        buttons.forEach(function (b) { b.disabled = true; });
        var feedback = document.getElementById('cm-practice-feedback');
        if (opt === q.answer) {
          state.score++;
          btn.classList.add('correct');
          feedback.textContent = randomEncouragement();
          feedback.className = 'feedback show success';
        } else {
          btn.classList.add('wrong');
          buttons.forEach(function (b) {
            if (b.textContent === q.answer) b.classList.add('correct');
          });
          feedback.textContent = '正确答案是：' + q.answer;
          feedback.className = 'feedback show error';
        }
        document.getElementById('cm-practice-score').textContent = '得分：' + state.score;
        document.getElementById('cm-practice-next').classList.add('show');
      });
      optsEl.appendChild(btn);
    });
  }

  document.getElementById('cm-practice-start').addEventListener('click', startCmPractice);

  document.getElementById('cm-practice-back').addEventListener('click', function () {
    state.module = 'clockmoney';
    showScreen('clockmoney-screen');
  });

  document.getElementById('cm-practice-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= CM_PRACTICE_TOTAL) {
      showResult('cmPractice', state.score, CM_PRACTICE_TOTAL);
    } else {
      renderCmPracticeQuestion();
    }
  });

  // ========== 凑十破十 · 知识教学 ==========
  function startTenMethods() {
    state.module = 'ten';
    state.tenMethodId = state.tenMethodId || 'make10';
    state.tenExampleIndex = 0;
    logStart('ten', { subName: '凑十破十', total: TEN_METHODS.length });
    showScreen('ten-screen');
    document.querySelectorAll('#ten-screen .ten-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.ten === state.tenMethodId);
    });
    renderTenMethod();
  }

  function renderTenMethod() {
    var method = TEN_METHODS_DATA.getMethod(state.tenMethodId);
    if (!method) return;
    var ex = method.examples[state.tenExampleIndex] || method.examples[0];

    document.getElementById('ten-icon').textContent = method.icon;
    document.getElementById('ten-name').textContent = method.name;
    document.getElementById('ten-tag').textContent = method.tag;
    document.getElementById('ten-summary').textContent = method.summary;
    document.getElementById('ten-rhyme').innerHTML =
      method.rhyme.split(' · ').join('<br>');

    var stepsEl = document.getElementById('ten-steps');
    stepsEl.innerHTML = '';
    method.steps.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      stepsEl.appendChild(li);
    });

    document.getElementById('ten-expr').style.display = 'none';
    document.getElementById('ten-answer').textContent = '答案：' + ex.answer;

    var visual = window.TenVisual.buildFromExample(ex, method.id);
    document.getElementById('ten-visual').innerHTML =
      window.TenVisual.renderHtml(visual);

    document.getElementById('ten-ex-progress').textContent =
      (state.tenExampleIndex + 1) + ' / ' + method.examples.length;

    document.getElementById('ten-speak').onclick = function () {
      var rhyme = method.rhyme.replace(/ · /g, '，');
      Speech.speakQuestion(method.name + '。' + rhyme + '。' + ex.speak);
    };
  }

  function startTenPractice() {
    var method = TEN_METHODS_DATA.getMethod(state.tenMethodId);
    state.module = 'tenPractice';
    state.questions = TEN_METHODS_DATA.generateQuestions(state.tenMethodId, TEN_PRACTICE_TOTAL);
    state.index = 0;
    state.score = 0;
    logStart('tenPractice', { subName: method.name + '练习', total: TEN_PRACTICE_TOTAL });
    showScreen('ten-practice-screen');
    renderTenPracticeQuestion();
  }

  function renderTenPracticeQuestion() {
    var method = TEN_METHODS_DATA.getMethod(state.tenMethodId);
    var q = state.questions[state.index];
    state.answered = false;
    document.getElementById('ten-practice-label').textContent =
      method.name + '练习 · 选出正确答案';
    document.getElementById('ten-practice-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + TEN_PRACTICE_TOTAL + ' 题';
    document.getElementById('ten-practice-score').textContent = '得分：' + state.score;
    document.getElementById('ten-practice-expr').textContent = q.expr + ' = ?';
    document.getElementById('ten-practice-feedback').className = 'feedback';
    document.getElementById('ten-practice-next').classList.remove('show');

    var optsEl = document.getElementById('ten-practice-options');
    optsEl.innerHTML = '';
    shuffle(q.options).forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        if (state.answered) return;
        state.answered = true;
        if (opt === q.answer) {
          state.score++;
          btn.classList.add('correct');
          document.getElementById('ten-practice-feedback').textContent = randomEncouragement();
          document.getElementById('ten-practice-feedback').className = 'feedback show success';
        } else {
          btn.classList.add('wrong');
          document.querySelectorAll('#ten-practice-options .option-btn').forEach(function (b) {
            if (Number(b.textContent) === q.answer) b.classList.add('correct');
          });
          document.getElementById('ten-practice-feedback').textContent = '正确答案是：' + q.answer;
          document.getElementById('ten-practice-feedback').className = 'feedback show error';
        }
        document.getElementById('ten-practice-score').textContent = '得分：' + state.score;
        document.getElementById('ten-practice-next').classList.add('show');
      });
      optsEl.appendChild(btn);
    });
  }

  document.getElementById('ten-practice-start').addEventListener('click', startTenPractice);

  document.getElementById('ten-practice-back').addEventListener('click', function () {
    showScreen('ten-screen');
  });

  document.getElementById('ten-practice-next').addEventListener('click', function () {
    state.index++;
    if (state.index >= TEN_PRACTICE_TOTAL) {
      showResult('ten', state.score, TEN_PRACTICE_TOTAL);
    } else {
      renderTenPracticeQuestion();
    }
  });

  document.getElementById('ten-ex-prev').addEventListener('click', function () {
    var method = TEN_METHODS_DATA.getMethod(state.tenMethodId);
    state.tenExampleIndex =
      (state.tenExampleIndex - 1 + method.examples.length) % method.examples.length;
    renderTenMethod();
  });

  document.getElementById('ten-ex-next').addEventListener('click', function () {
    var method = TEN_METHODS_DATA.getMethod(state.tenMethodId);
    state.tenExampleIndex = (state.tenExampleIndex + 1) % method.examples.length;
    renderTenMethod();
  });

  // ========== 乘法口诀 ==========
  var MULT_TABLE = MATH_DATA.MULT_TABLE;
  var MULT_ROW_CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var multSpeaking = false;
  var multSequenceTimer = null;
  var multLastSpeak = '';

  function stopMultSequence() {
    if (multSequenceTimer) {
      clearTimeout(multSequenceTimer);
      multSequenceTimer = null;
    }
    multSpeaking = false;
    Speech.stop();
  }

  function speakMultSequence(items, onItem, onDone) {
    if (multSpeaking) {
      stopMultSequence();
      return;
    }
    if (!items.length) return;
    multSpeaking = true;
    var idx = 0;
    function next() {
      if (!multSpeaking) return;
      if (idx >= items.length) {
        multSpeaking = false;
        multSequenceTimer = null;
        if (onDone) onDone();
        return;
      }
      onItem(items[idx], idx);
      idx++;
      multSequenceTimer = setTimeout(next, 1200);
    }
    next();
  }

  function findMultCell(a, b) {
    return document.querySelector('#mult-chart .mult-cell[data-a="' + a + '"][data-b="' + b + '"]');
  }

  function startMultTable() {
    state.module = 'mult';
    state.multRow = 1;
    state.multSelected = null;
    state.multViewed = 0;
    logStart('mult', { subName: '九九口诀表', total: 45 });
    showScreen('mult-screen');
    renderMultTable();
  }

  function selectMultItem(item, cellEl, opts) {
    opts = opts || {};
    state.multSelected = item;
    if (!state.multViewed) state.multViewed = 0;
    state.multViewed++;
    if (Session) Session.tick(state, sessionExtras());

    document.querySelectorAll('#mult-chart .mult-cell').forEach(function (c) {
      c.classList.remove('active');
    });
    if (cellEl) cellEl.classList.add('active');

    document.getElementById('mult-formula').textContent =
      item.b + ' × ' + item.a + ' = ' + item.product;
    document.getElementById('mult-rhyme').textContent = item.rhyme;

    if (!opts.fromSequence && multSpeaking) {
      stopMultSequence();
      return;
    }
    if (!opts.fromSequence && Speech.isPlaying() && multLastSpeak === item.speak) {
      multLastSpeak = '';
      Speech.stop();
      return;
    }
    multLastSpeak = item.speak;
    Speech.speakQuestion(item.speak);
  }

  function multCellFormulaHtml(item) {
    return '<div class="mult-cell-formula mult-cell-formula-stack">' +
      '<div class="m-line m-line-eq">' +
      '<span class="m-b">' + item.b + '</span>' +
      '<span class="m-op">×</span>' +
      '<span class="m-a">' + item.a + '</span>' +
      '<span class="m-op">=</span>' +
      '</div>' +
      '<div class="m-line m-line-p"><span class="m-p">' + item.product + '</span></div>' +
      '</div>';
  }

  function renderMultTable() {
    var chart = document.getElementById('mult-chart');
    chart.innerHTML = '';
    var firstItem = null;

    for (var row = 1; row <= 9; row++) {
      var rowEl = document.createElement('div');
      rowEl.className = 'mult-chart-row mult-row-' + row;
      var items = MATH_DATA.getMultRow(row);
      items.forEach(function (item) {
        if (!firstItem) firstItem = item;
        var cell = document.createElement('div');
        cell.className = 'mult-cell';
        cell.dataset.a = item.a;
        cell.dataset.b = item.b;
        cell.innerHTML = multCellFormulaHtml(item);
        cell.addEventListener('click', function () {
          state.multRow = item.a;
          selectMultItem(item, cell);
        });
        rowEl.appendChild(cell);
      });
      chart.appendChild(rowEl);
    }

    var sel = state.multSelected;
    if (sel) {
      var cellEl = findMultCell(sel.a, sel.b);
      if (cellEl) cellEl.classList.add('active');
      document.getElementById('mult-formula').textContent =
        sel.b + ' × ' + sel.a + ' = ' + sel.product;
      document.getElementById('mult-rhyme').textContent = sel.rhyme;
    } else if (firstItem) {
      state.multSelected = firstItem;
      state.multRow = firstItem.a;
      var firstCell = findMultCell(firstItem.a, firstItem.b);
      if (firstCell) firstCell.classList.add('active');
      document.getElementById('mult-formula').textContent =
        firstItem.b + ' × ' + firstItem.a + ' = ' + firstItem.product;
      document.getElementById('mult-rhyme').textContent = firstItem.rhyme;
    }
  }

  document.getElementById('mult-speak').addEventListener('click', function () {
    var item = state.multSelected;
    if (!item) {
      var rowItems = MATH_DATA.getMultRow(state.multRow || 1);
      item = rowItems[0];
    }
    if (!item) return;
    if (multSpeaking) {
      stopMultSequence();
      return;
    }
    if (Speech.isPlaying() && multLastSpeak === item.speak) {
      multLastSpeak = '';
      Speech.stop();
      return;
    }
    multLastSpeak = item.speak;
    Speech.speakQuestion(item.speak);
  });

  document.getElementById('mult-speak-row').addEventListener('click', function () {
    var row = state.multSelected ? state.multSelected.a : (state.multRow || 1);
    var items = MATH_DATA.getMultRow(row);
    speakMultSequence(items, function (item) {
      selectMultItem(item, findMultCell(item.a, item.b), { fromSequence: true });
    });
  });

  document.getElementById('mult-speak-all').addEventListener('click', function () {
    speakMultSequence(MATH_DATA.getMultTriangleList(), function (item) {
      state.multRow = item.a;
      selectMultItem(item, findMultCell(item.a, item.b), { fromSequence: true });
    });
  });

  // ========== 结果 ==========
  function showResult(module, score, total) {
    if (Session) {
      var resultText = module === 'read'
        ? '完成 ' + total + ' 道读题训练'
        : score + ' / ' + total;
      Session.finish({
        status: '完成',
        score: score,
        total: total,
        progress: total,
        result: resultText
      });
    }
    showScreen('result-screen');
    document.getElementById('result-title').textContent = '练习完成！';
    if (module === 'read') {
      document.getElementById('result-score').textContent = '完成了 ' + total + ' 道读题训练';
    } else {
      document.getElementById('result-score').textContent = '得分：' + score + ' / ' + total;
    }
    document.getElementById('result-msg').textContent = randomEncouragement();
    document.getElementById('result-retry').onclick = function () {
      if (module === 'calc') startCalc(false);
      else if (module === 'read') startRead();
      else if (module === 'ten') startTenPractice();
      else if (module === 'cmPractice') startCmPractice();
      else showScreen('home');
    };
  }

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
    if (id === 'ten-practice-screen') {
      showScreen('ten-screen');
      return true;
    }
    if (id === 'cm-practice-screen') {
      state.module = 'clockmoney';
      showScreen('clockmoney-screen');
      return true;
    }
    showScreen('home');
    return true;
  }

  if (window.AppBackNav) {
    window.AppBackNav.onBack(handleHardwareBack);
  }

  function bootFromUrl() {
    try {
      var params = new URLSearchParams(location.search || '');
      var hash = (location.hash || '').replace(/^#/, '');
      var mod = params.get('module') || hash;
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
