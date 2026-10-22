(function () {
  'use strict';

  var DATA = window.ENGLISH_DATA;
  var Speech = window.SpeechHelper || window.Speech;
  var QUIZ_TOTAL = 10;
  var Session = window.createSessionLogger ? window.createSessionLogger('英语') : null;

  var MODULE_NAMES = {
    alphabet: '字母表',
    words: '单词认读',
    listen: '听音选词',
    numbers: '数字练习',
    colors: '颜色单词',
    phrases: '日常用语',
    words3: '三年级单词',
    listen3: '三年级听音',
    phrases3: '句型练习'
  };

  var state = {
    module: '',
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    phraseList: DATA.PHRASES_G12,
    retryFn: null
  };

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }

  function logStart(module, opts) {
    opts = opts || {};
    if (window.LearningLog && window.LearningLog.start) {
      window.LearningLog.start({
        subject: '英语',
        module: module,
        moduleName: MODULE_NAMES[module] || module,
        subName: opts.subName || '',
        total: opts.total || 0
      });
    }
    if (Session && Session.start) {
      Session.start(module, opts);
    }
  }

  function logFinish(score, total) {
    if (window.LearningLog && window.LearningLog.finish) {
      window.LearningLog.finish({ score: score, total: total });
    }
    if (Session && Session.finish) Session.finish({ score: score, total: total });
  }

  function encourage() {
    var list = DATA.ENCOURAGEMENTS;
    return list[Math.floor(Math.random() * list.length)];
  }

  function setHomeGrade(grade) {
    var target = grade || 'g12';
    document.querySelectorAll('#grade-tabs .mode-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.grade === target);
    });
    document.querySelectorAll('.grade-panel').forEach(function (panel) {
      panel.classList.toggle('hidden', panel.dataset.gradePanel !== target);
    });
  }

  document.querySelectorAll('#grade-tabs .mode-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      setHomeGrade(tab.dataset.grade);
    });
  });

  document.querySelectorAll('.module-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var mod = card.dataset.module;
      if (mod === 'alphabet') startAlphabet();
      else if (mod === 'words') startQuiz('words', DATA.makeWordQuiz(DATA.WORDS_G12, QUIZ_TOTAL));
      else if (mod === 'listen') startQuiz('listen', DATA.makeListenQuiz(DATA.WORDS_G12, QUIZ_TOTAL), true);
      else if (mod === 'numbers') startQuiz('numbers', DATA.makeNumberQuiz(QUIZ_TOTAL));
      else if (mod === 'colors') startQuiz('colors', DATA.makeColorQuiz(Math.min(QUIZ_TOTAL, DATA.COLORS.length)));
      else if (mod === 'phrases') startPhrases(DATA.PHRASES_G12, 'phrases');
      else if (mod === 'words3') startQuiz('words3', DATA.makeWordQuiz(DATA.WORDS_G3, QUIZ_TOTAL));
      else if (mod === 'listen3') startQuiz('listen3', DATA.makeListenQuiz(DATA.WORDS_G3, QUIZ_TOTAL), true);
      else if (mod === 'phrases3') startPhrases(DATA.PHRASES_G3, 'phrases3');
    });
  });

  document.querySelectorAll('.back-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (Speech) Speech.stop();
      if (state.module && window.LearningLog && window.LearningLog.getCurrent && window.LearningLog.getCurrent()) {
        window.LearningLog.finish({ abandoned: true });
      }
      state.module = '';
      showScreen('home');
    });
  });

  function startAlphabet() {
    state.module = 'alphabet';
    logStart('alphabet', { total: DATA.ALPHABET.length });
    showScreen('alphabet-screen');
    var grid = document.getElementById('alpha-grid');
    grid.innerHTML = '';
    DATA.ALPHABET.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'alpha-card';
      card.innerHTML = '<div class="big">' + item.letter + '</div><div class="small">' + item.lower + '</div>';
      card.addEventListener('click', function () {
        if (Speech) Speech.speak(item.speak, 0.85);
      });
      grid.appendChild(card);
    });
  }

  function startPhrases(list, moduleId) {
    state.module = moduleId;
    state.phraseList = list;
    logStart(moduleId, { subName: '跟读列表', total: list.length });
    showScreen('phrase-screen');
    var el = document.getElementById('phrase-list');
    el.innerHTML = '';
    list.forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'phrase-item';
      row.innerHTML = '<div class="en">' + item.en + '</div><div class="zh">' + item.zh + '</div>';
      row.addEventListener('click', function () {
        if (Speech) Speech.speak(item.speak || item.en, 0.9);
      });
      el.appendChild(row);
    });
  }

  document.getElementById('phrase-quiz-btn').addEventListener('click', function () {
    var list = state.phraseList || DATA.PHRASES_G12;
    var mod = state.module === 'phrases3' ? 'phrases3' : 'phrases';
    startQuiz(mod, DATA.makePhraseQuiz(list, QUIZ_TOTAL));
  });

  function startQuiz(moduleId, questions, autoSpeak) {
    state.module = moduleId;
    state.questions = questions;
    state.index = 0;
    state.score = 0;
    state.answered = false;
    state.retryFn = function () {
      var rebuild;
      if (moduleId === 'words') rebuild = DATA.makeWordQuiz(DATA.WORDS_G12, QUIZ_TOTAL);
      else if (moduleId === 'listen') rebuild = DATA.makeListenQuiz(DATA.WORDS_G12, QUIZ_TOTAL);
      else if (moduleId === 'words3') rebuild = DATA.makeWordQuiz(DATA.WORDS_G3, QUIZ_TOTAL);
      else if (moduleId === 'listen3') rebuild = DATA.makeListenQuiz(DATA.WORDS_G3, QUIZ_TOTAL);
      else if (moduleId === 'numbers') rebuild = DATA.makeNumberQuiz(QUIZ_TOTAL);
      else if (moduleId === 'colors') rebuild = DATA.makeColorQuiz(Math.min(QUIZ_TOTAL, DATA.COLORS.length));
      else if (moduleId === 'phrases') rebuild = DATA.makePhraseQuiz(DATA.PHRASES_G12, QUIZ_TOTAL);
      else if (moduleId === 'phrases3') rebuild = DATA.makePhraseQuiz(DATA.PHRASES_G3, QUIZ_TOTAL);
      else rebuild = questions;
      startQuiz(moduleId, rebuild, autoSpeak);
    };
    logStart(moduleId, { total: questions.length });
    showScreen('quiz-screen');
    document.getElementById('quiz-speak').style.display = 'inline-block';
    renderQuiz(!!autoSpeak);
  }

  function renderQuiz(autoSpeak) {
    var q = state.questions[state.index];
    if (!q) return;
    state.answered = false;
    document.getElementById('quiz-progress').textContent =
      '第 ' + (state.index + 1) + ' / ' + state.questions.length + ' 题';
    document.getElementById('quiz-score').textContent = '得分：' + state.score;
    document.getElementById('quiz-label').textContent =
      state.module.indexOf('listen') === 0 ? '听读音，选出正确单词' : '看中文，选出正确英文';
    document.getElementById('quiz-prompt').textContent =
      state.module.indexOf('listen') === 0 ? '🔊 ?' : q.prompt;
    document.getElementById('quiz-feedback').className = 'feedback';
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-next').classList.remove('show');

    var optsEl = document.getElementById('quiz-options');
    optsEl.innerHTML = '';
    q.options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        if (state.answered) return;
        state.answered = true;
        if (opt === q.answer) {
          state.score++;
          btn.classList.add('correct');
          document.getElementById('quiz-feedback').textContent = encourage();
          document.getElementById('quiz-feedback').className = 'feedback show success';
        } else {
          btn.classList.add('wrong');
          Array.prototype.forEach.call(optsEl.querySelectorAll('.option-btn'), function (b) {
            if (b.textContent === q.answer) b.classList.add('correct');
          });
          document.getElementById('quiz-feedback').textContent = '正确答案：' + q.answer;
          document.getElementById('quiz-feedback').className = 'feedback show error';
        }
        document.getElementById('quiz-score').textContent = '得分：' + state.score;
        document.getElementById('quiz-next').classList.add('show');
      });
      optsEl.appendChild(btn);
    });

    if (autoSpeak && Speech) {
      setTimeout(function () { Speech.speak(q.speak || q.answer, 0.9); }, 200);
    }
  }

  document.getElementById('quiz-speak').addEventListener('click', function () {
    var q = state.questions[state.index];
    if (q && Speech) Speech.speak(q.speak || q.answer, 0.9);
  });

  document.getElementById('quiz-next').addEventListener('click', function () {
    if (state.index + 1 >= state.questions.length) {
      showResult();
      return;
    }
    state.index++;
    renderQuiz(state.module.indexOf('listen') === 0);
  });

  function showResult() {
    logFinish(state.score, state.questions.length);
    showScreen('result-screen');
    var total = state.questions.length;
    var pct = total ? Math.round(state.score / total * 100) : 0;
    document.getElementById('result-title').textContent = pct >= 80 ? '太棒了！' : (pct >= 60 ? '继续加油！' : '再练一遍吧');
    document.getElementById('result-score').textContent = '得分 ' + state.score + ' / ' + total;
    document.getElementById('result-msg').textContent = pct >= 80 ? 'Excellent!' : 'Keep practicing!';
  }

  document.getElementById('result-retry').addEventListener('click', function () {
    if (typeof state.retryFn === 'function') state.retryFn();
    else showScreen('home');
  });

  document.getElementById('result-home').addEventListener('click', function () {
    state.module = '';
    showScreen('home');
  });

  if (window.AppBackNav) {
    window.AppBackNav.onBack(function () {
      var home = document.getElementById('home');
      if (home && home.classList.contains('active')) {
        window.location.href = '../../app/index.html';
        return true;
      }
      showScreen('home');
      return true;
    });
  }

  if (Speech && Speech.ensureReady) Speech.ensureReady(function () {});
  showScreen('home');
})();
