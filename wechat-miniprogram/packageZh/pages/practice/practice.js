var pinyinData = require('../../utils/pinyin-data.js');
var charData = require('../../utils/char-data.js');
var questionData = require('../../utils/question-data.js');
var sentenceData = require('../../utils/sentence-data.js');
var grade3Preview = require('../../utils/grade3-preview.js');
var lessonData = require('../../utils/lesson-data.js');
var speech = require('../../utils/speech-zh.js');
var strokeWriter = require('../../utils/stroke-writer.js');
var session = require('../../../utils/session-log.js');

var PINYIN_QUIZ = pinyinData.PINYIN_QUIZ;
var ENCOURAGEMENTS = pinyinData.ENCOURAGEMENTS;
var SHENGMU_EX = pinyinData.SHENGMU_EXAMPLES;
var YUNMU_EX = pinyinData.YUNMU_EXAMPLES;
var ZHENGTI = pinyinData.ZHENGTIRENDU;
var CHARACTERS = charData.CHARACTERS;
var QUESTION_WORDS = charData.QUESTION_WORDS;
var READ_QUESTIONS = questionData.READ_QUESTIONS;
var PINYIN_TOTAL = questionData.PINYIN_TOTAL;
var CHAR_TOTAL = questionData.CHAR_TOTAL;
var READ_TOTAL = questionData.READ_TOTAL;
var SENTENCE_TOTAL = sentenceData.SENTENCE_TOTAL;

var MODULE_NAMES = {
  pinyin: '拼音练习',
  alphabet: '声母韵母',
  char: '识字配对',
  lesson: '课文识字',
  flashcard: '识字卡片',
  read: '读题训练',
  keywords: '题目常用词',
  sentence: '词语与句子',
  preview3: '三年级预习'
};

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

function randomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

Page({
  data: {
    screen: 'home',
    modules: [
      { id: 'chart', icon: '🔊', title: '互动拼音表', desc: '完整拼音表，点读发音', link: true },
      { id: 'pinyin', icon: '🔤', title: '拼音练习', desc: '看字选拼音 / 听音选字' },
      { id: 'alphabet', icon: '🔡', title: '声母韵母', desc: '点读学习，带读音' },
      { id: 'char', icon: '🔗', title: '识字配对', desc: '字和拼音配配对' },
      { id: 'lesson', icon: '📖', title: '课文识字通关', desc: '一～二年级按课练生字' },
      { id: 'flashcard', icon: '📇', title: '识字卡片', desc: '翻卡片，听读音' },
      { id: 'read', icon: '📝', title: '读题训练', desc: '读懂题目要求' },
      { id: 'keywords', icon: '📋', title: '题目常用词', desc: '认读考试关键词' },
      { id: 'sentence', icon: '✍️', title: '词语与句子', desc: '叠词 · 拟人句 · 比喻句' },
      { id: 'preview3', icon: '🎒', title: '三年级上册必背', desc: '古诗 · 日积月累 · 课文 · 背诵打卡' }
    ],
    pinyinMode: 'pick-pinyin',
    pinyinProgress: '',
    pinyinScore: 0,
    pinyinLabel: '',
    pinyinChar: '',
    pinyinIsListen: false,
    pinyinOptions: [],
    pinyinFeedback: '',
    pinyinFeedbackType: '',
    pinyinShowNext: false,
    alphaTab: 'shengmu',
    alphaList: [],
    alphaLetter: '',
    alphaExample: '',
    alphaSpeakChar: '',
    alphaSpeakWord: '',
    charProgress: '',
    charScore: 0,
    charLeft: [],
    charRight: [],
    lessonSemId: 'g1s2',
    lessonSemTabs: [
      { id: 'g1s2', label: '一年级下' },
      { id: 'g1s1', label: '一年级上' },
      { id: 'g2s1', label: '二年级上' },
      { id: 'g2s2', label: '二年级下' }
    ],
    lessonCards: [],
    lessonTitle: '',
    lessonCharProgress: '',
    lessonChar: '',
    lessonWordHint: '',
    lessonOptions: [],
    lessonFeedback: '',
    lessonFeedbackType: '',
    flashProgress: '',
    flashEmoji: '',
    flashChar: '',
    flashPinyin: '',
    flashWord: '',
    readProgress: '',
    readScore: 0,
    readTextBefore: '',
    readKeyword: '',
    readTextAfter: '',
    readPinyin: '',
    readTask: '',
    readExample: '',
    readShowTask: false,
    readShowNext: false,
    readShowDone: true,
    kwProgress: '',
    kwWord: '',
    kwPinyin: '',
    kwMeaning: '',
    sentenceMode: 'all',
    sentenceKnowledge: sentenceData.KNOWLEDGE,
    sentenceProgress: '',
    sentenceScore: 0,
    sentenceCategory: '',
    sentencePrompt: '',
    sentenceShowStem: false,
    sentenceBefore: '',
    sentenceAfter: '',
    sentenceOptions: [],
    sentenceCorrect: '',
    sentenceWrong: '',
    sentenceAnswered: false,
    sentenceFeedback: '',
    sentenceFeedbackType: '',
    sentenceShowNext: false,
    preview3Cat: 'all',
    preview3Tabs: [],
    preview3Progress: '',
    preview3Icon: '✏️',
    preview3Title: '',
    preview3Author: '',
    preview3IsPoem: false,
    preview3ShowRecite: false,
    preview3Lines: [],
    preview3Content: '',
    preview3Notes: '',
    preview3Meta: '',
    preview3ReciteBadge: '',
    preview3ReciteHistory: [],
    preview3Example: '',
    resultEmoji: '',
    resultTitle: '',
    resultMsg: '',
    resultScore: '',
    resultShowRetry: true
  },

  module: null,
  questions: [],
  index: 0,
  score: 0,
  selectedLeft: null,
  matched: {},
  leftItems: [],
  rightItems: [],
  flashList: [],
  flashIndex: 0,
  kwIndex: 0,
  alphaSelected: null,
  answered: false,
  lessonId: null,
  lessonChars: [],
  lessonCharIndex: 0,
  lessonFirstTryOk: 0,
  lessonProgress: {},
  sentenceSpeakText: '',
  preview3Index: 0,
  preview3SpeakText: '',
  resultStars: 0,
  autoSpeakTimer: null,

  onLoad(options) {
    var mod = options && options.module;
    if (mod && mod !== 'chart') {
      var that = this;
      setTimeout(function () { that.onModuleTap({ currentTarget: { dataset: { module: mod } } }); }, 50);
    }
  },

  onUnload() {
    this.clearAutoSpeak();
    strokeWriter.reset();
    speech.stop();
    session.abort();
  },

  clearAutoSpeak() {
    if (this.autoSpeakTimer) {
      clearTimeout(this.autoSpeakTimer);
      this.autoSpeakTimer = null;
    }
  },

  goHome() {
    this.clearAutoSpeak();
    strokeWriter.reset();
    speech.stop();
    session.abort();
    this.module = null;
    this.setData({ screen: 'home' });
  },

  onModuleTap(e) {
    var mod = e.currentTarget.dataset.module;
    if (mod === 'chart') {
      wx.navigateTo({ url: '/packageZh/pages/pinyin-chart/pinyin-chart' });
      return;
    }
    if (mod === 'pinyin') this.startPinyin();
    else if (mod === 'alphabet') this.startAlphabet();
    else if (mod === 'char') this.startChar();
    else if (mod === 'lesson') this.startLessonMap();
    else if (mod === 'flashcard') this.startFlashcard();
    else if (mod === 'read') this.startRead();
    else if (mod === 'keywords') this.startKeywords();
    else if (mod === 'sentence') this.startSentence();
    else if (mod === 'preview3') this.startPreview3();
  },

  logStart(module, opts) {
    opts = opts || {};
    session.start({
      subject: '语文',
      moduleName: MODULE_NAMES[module] || module,
      subName: opts.subName || '',
      total: opts.total || 0,
      progress: opts.progress || 0
    });
  },

  // ========== 拼音练习 ==========
  switchPinyinMode(e) {
    this.setData({ pinyinMode: e.currentTarget.dataset.mode });
    this.startPinyin();
  },

  startPinyin() {
    this.module = 'pinyin';
    this.questions = pickRandom(PINYIN_QUIZ, PINYIN_TOTAL);
    this.index = 0;
    this.score = 0;
    this.logStart('pinyin', {
      subName: this.data.pinyinMode === 'pick-char' ? '听音选字' : '看字选拼音',
      total: PINYIN_TOTAL
    });
    this.setData({ screen: 'pinyin' });
    this.renderPinyinQuestion();
  },

  pickCharOptions(correct, n) {
    var pool = CHARACTERS.map(function (c) { return c.char; });
    var opts = [correct];
    shuffle(pool).forEach(function (c) {
      if (opts.length >= n) return;
      if (c !== correct && opts.indexOf(c) === -1) opts.push(c);
    });
    return opts;
  },

  renderPinyinQuestion() {
    var q = this.questions[this.index];
    this.answered = false;
    var isListen = this.data.pinyinMode === 'pick-char';
    var options = [];

    if (isListen) {
      shuffle(this.pickCharOptions(q.char, 4)).forEach(function (c) {
        options.push({ text: c, status: '' });
      });
    } else {
      shuffle(q.options).forEach(function (opt) {
        options.push({ text: opt, status: '', slug: pinyinData.pinyinToSlug(opt) });
      });
    }

    this.setData({
      pinyinProgress: '第 ' + (this.index + 1) + ' / ' + PINYIN_TOTAL + ' 题',
      pinyinScore: this.score,
      pinyinLabel: isListen ? '听读音，选正确的汉字' : '看字选拼音，可点 🔊 听读音',
      pinyinChar: q.char,
      pinyinIsListen: isListen,
      pinyinOptions: options,
      pinyinFeedback: '',
      pinyinFeedbackType: '',
      pinyinShowNext: false
    });

    var that = this;
    this.clearAutoSpeak();
    if (isListen) {
      this.autoSpeakTimer = setTimeout(function () { speech.speakChar(q.char); }, 400);
    }
    this._pinyinQ = q;
  },

  speakPinyinChar() {
    if (this._pinyinQ) speech.speakChar(this._pinyinQ.char);
  },

  speakPinyinListen() {
    if (this._pinyinQ) speech.speakChar(this._pinyinQ.char);
  },

  speakPinyinOpt(e) {
    var idx = e.currentTarget.dataset.index;
    var opt = this.data.pinyinOptions[idx];
    if (opt && opt.slug) speech.speakPinyinSlug(opt.slug, opt.text);
  },

  onPinyinAnswer(e) {
    if (this.answered) return;
    var idx = e.currentTarget.dataset.index;
    var selected = this.data.pinyinOptions[idx].text;
    var q = this._pinyinQ;
    var answer = this.data.pinyinMode === 'pick-char' ? q.char : q.answer;
    this.answered = true;
    var options = this.data.pinyinOptions.slice();
    var feedback = '';
    var feedbackType = 'error';

    if (selected === answer) {
      options[idx].status = 'correct';
      this.score++;
      feedback = this.data.pinyinMode === 'pick-char'
        ? randomEncouragement() + ' 是「' + answer + '」'
        : randomEncouragement();
      feedbackType = 'success';
      if (this.data.pinyinMode !== 'pick-char') speech.speakWord(randomEncouragement());
    } else {
      options[idx].status = 'wrong';
      options.forEach(function (o, i) {
        if (o.text === answer) options[i].status = 'correct';
      });
      feedback = this.data.pinyinMode === 'pick-char'
        ? '正确答案是：「' + answer + '」'
        : '正确答案是：' + answer + '，再记一记！';
    }

    options.forEach(function (o) { o.disabled = true; });
    this.setData({
      pinyinOptions: options,
      pinyinScore: this.score,
      pinyinFeedback: feedback,
      pinyinFeedbackType: feedbackType,
      pinyinShowNext: true
    });
  },

  onPinyinNext() {
    this.index++;
    if (this.index >= PINYIN_TOTAL) {
      this.showResult('pinyin', this.score, PINYIN_TOTAL);
    } else {
      this.renderPinyinQuestion();
    }
  },

  // ========== 声母韵母 ==========
  startAlphabet() {
    this.module = 'alphabet';
    this.logStart('alphabet', { subName: '声母韵母表' });
    this.setData({ screen: 'alphabet', alphaTab: 'shengmu' });
    this.renderAlphabet();
  },

  switchAlphaTab(e) {
    this.setData({ alphaTab: e.currentTarget.dataset.tab });
    this.renderAlphabet();
  },

  getAlphaList() {
    if (this.data.alphaTab === 'shengmu') return SHENGMU_EX;
    if (this.data.alphaTab === 'yunmu') return YUNMU_EX;
    return ZHENGTI;
  },

  renderAlphabet() {
    var list = this.getAlphaList();
    var alphaList = list.map(function (item, idx) {
      var letter = item.sm || item.ym || item.py;
      return {
        letter: letter,
        sub: item.char + (item.pinyin ? ' ' + item.pinyin : ''),
        active: idx === 0
      };
    });
    this.alphaSelected = list[0];
    this._alphaList = list;
    this.updateAlphaDetail(list[0]);
    this.setData({ alphaList: alphaList });
  },

  onAlphaTap(e) {
    var idx = e.currentTarget.dataset.index;
    var item = this._alphaList[idx];
    this.alphaSelected = item;
    var alphaList = this.data.alphaList.map(function (a, i) {
      a.active = i === idx;
      return a;
    });
    this.setData({ alphaList: alphaList });
    this.updateAlphaDetail(item);
    this.speakAlphaPinyin(item);
  },

  speakAlphaPinyin(item) {
    var text = item.speak || item.pinyin;
    speech.speakPinyinSlug(speech.getPinyinSlug(item, this.data.alphaTab), text);
  },

  updateAlphaDetail(item) {
    var letter = item.sm || item.ym || item.py;
    var example = item.char;
    if (item.pinyin) example += ' ' + item.pinyin;
    if (item.word && item.word !== item.char) example += ' · ' + item.word;
    var speakText = item.speak || item.pinyin;
    this.setData({
      alphaLetter: letter,
      alphaExample: example,
      alphaSpeakChar: '🔊 听「' + speakText + '」',
      alphaSpeakWord: '🔊 听组词「' + item.word + '」'
    });
    this._alphaItem = item;
  },

  onAlphaSpeakChar() {
    if (this._alphaItem) this.speakAlphaPinyin(this._alphaItem);
  },

  onAlphaSpeakWord() {
    if (this._alphaItem) speech.speakWord(this._alphaItem.word);
  },

  // ========== 识字配对 ==========
  startChar() {
    var chars = pickRandom(CHARACTERS, CHAR_TOTAL);
    this.module = 'char';
    this.score = 0;
    this.selectedLeft = null;
    this.matched = {};
    this.leftItems = chars;
    this.rightItems = shuffle(chars.map(function (c) {
      return { char: c.char, pinyin: c.pinyin, word: c.word };
    }));
    this.logStart('char', { total: CHAR_TOTAL });
    this.setData({ screen: 'char' });
    this.renderCharMatch();
  },

  countMatched() {
    var n = 0;
    for (var k in this.matched) {
      if (this.matched[k]) n++;
    }
    return n / 2;
  },

  renderCharMatch() {
    var matchedCount = this.countMatched();
    var that = this;
    var charLeft = this.leftItems.map(function (item, i) {
      return {
        index: i,
        emoji: item.emoji,
        char: item.char,
        matched: !!that.matched['l' + i],
        selected: that.selectedLeft === i
      };
    });
    var charRight = this.rightItems.map(function (item, i) {
      return {
        index: i,
        pinyin: item.pinyin,
        word: item.word,
        matched: !!that.matched['r' + i]
      };
    });
    this.setData({
      charProgress: '已配对：' + matchedCount + ' / ' + CHAR_TOTAL,
      charScore: this.score,
      charLeft: charLeft,
      charRight: charRight
    });
    if (matchedCount >= CHAR_TOTAL) {
      var that2 = this;
      setTimeout(function () { that2.showResult('char', that2.score, CHAR_TOTAL); }, 500);
    }
  },

  onCharLeftTap(e) {
    var i = e.currentTarget.dataset.index;
    if (this.matched['l' + i]) return;
    this.selectedLeft = i;
    speech.speakChar(this.leftItems[i].char);
    this.renderCharMatch();
  },

  onCharRightTap(e) {
    var i = e.currentTarget.dataset.index;
    if (this.selectedLeft === null || this.matched['r' + i]) return;
    var left = this.leftItems[this.selectedLeft];
    var right = this.rightItems[i];
    if (left.char === right.char) {
      this.matched['l' + this.selectedLeft] = true;
      this.matched['r' + i] = true;
      this.score++;
      this.selectedLeft = null;
      speech.speakWord(left.word);
      this.renderCharMatch();
    } else {
      this.selectedLeft = null;
      this.renderCharMatch();
      wx.showToast({ title: '再试一次', icon: 'none' });
    }
  },

  onCharSpeak(e) {
    var side = e.currentTarget.dataset.side;
    var i = e.currentTarget.dataset.index;
    if (side === 'left') speech.speakChar(this.leftItems[i].char);
    else {
      var item = this.rightItems[i];
      speech.speakPinyinSlug(pinyinData.pinyinToSlug(item.pinyin), item.pinyin);
    }
  },

  // ========== 课文识字 ==========
  startLessonMap() {
    this.module = 'lesson';
    this.lessonProgress = lessonData.loadProgress();
    this.logStart('lesson', { subName: '课文列表' });
    this.setData({ screen: 'lesson-map', lessonSemId: this.data.lessonSemId || 'g1s2' });
    this.renderLessonGrid();
  },

  switchLessonSem(e) {
    this.setData({ lessonSemId: e.currentTarget.dataset.sem });
    this.renderLessonGrid();
  },

  getSemester(id) {
    var sem = null;
    lessonData.SEMESTERS.forEach(function (s) {
      if (s.id === id) sem = s;
    });
    return sem;
  },

  renderLessonGrid() {
    var sem = this.getSemester(this.data.lessonSemId);
    if (!sem) return;
    var that = this;
    var cards = sem.lessons.map(function (lesson, idx) {
      var key = String(lesson.id);
      var prog = that.lessonProgress[key] || {};
      var stars = prog.stars || 0;
      return {
        id: lesson.id,
        num: '第 ' + (idx + 1) + ' 课',
        title: lesson.title,
        meta: lesson.chars.length + ' 个生字',
        starsText: stars ? '⭐'.repeat(stars) : '未通关',
        done: !!prog.passed
      };
    });
    this.setData({ lessonCards: cards });
  },

  onLessonCardTap(e) {
    this.startLessonPlay(e.currentTarget.dataset.id);
  },

  startLessonPlay(lessonId) {
    var info = lessonData.findLesson(lessonId);
    if (!info) return;
    this.lessonId = lessonId;
    this.lessonChars = info.lesson.chars.slice();
    this.lessonCharIndex = 0;
    this.lessonFirstTryOk = 0;
    this.answered = false;
    this.logStart('lesson', {
      subName: info.lesson.title,
      total: info.lesson.chars.length
    });
    var lessonNum = info.semester.lessons.indexOf(info.lesson) + 1;
    this.setData({
      screen: 'lesson-play',
      lessonTitle: '第 ' + lessonNum + ' 课 · ' + info.lesson.title
    });
    this.renderLessonCharQuiz();
  },

  backToLessonMap() {
    strokeWriter.reset();
    this.lessonProgress = lessonData.loadProgress();
    this.startLessonMap();
  },

  pickPinyinOptions(correctPinyin, n) {
    var pool = lessonData.getAllPinyinPool();
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
  },

  renderLessonCharQuiz() {
    var total = this.lessonChars.length;
    var item = this.lessonChars[this.lessonCharIndex];
    this.answered = false;
    var options = shuffle(this.pickPinyinOptions(item.pinyin, 4)).map(function (py) {
      return { text: py, status: '', slug: pinyinData.pinyinToSlug(py) };
    });
    var that = this;
    this.setData({
      lessonCharProgress: '第 ' + (this.lessonCharIndex + 1) + ' / ' + total + ' 字',
      lessonChar: item.char,
      lessonWordHint: '组词：' + (item.word || item.char),
      lessonOptions: options,
      lessonFeedback: '',
      lessonFeedbackType: ''
    }, function () {
      strokeWriter.show(that, item.char, true);
    });
    this._lessonItem = item;
    this.clearAutoSpeak();
    this.autoSpeakTimer = setTimeout(function () { speech.speakChar(item.char); }, 350);
  },

  onLessonSpeakChar() {
    if (this._lessonItem) speech.speakChar(this._lessonItem.char);
  },

  onLessonStroke() {
    strokeWriter.replay();
  },

  onLessonOptSpeak(e) {
    var idx = e.currentTarget.dataset.index;
    var opt = this.data.lessonOptions[idx];
    if (opt) speech.speakPinyinSlug(opt.slug, opt.text);
  },

  onLessonAnswer(e) {
    if (this.answered) return;
    var idx = e.currentTarget.dataset.index;
    var selected = this.data.lessonOptions[idx].text;
    var item = this._lessonItem;
    this.answered = true;
    var options = this.data.lessonOptions.slice();
    var total = this.lessonChars.length;
    var that = this;

    if (selected === item.pinyin) {
      options[idx].status = 'correct';
      options.forEach(function (o) { o.disabled = true; });
      this.lessonFirstTryOk++;
      this.setData({
        lessonOptions: options,
        lessonFeedback: randomEncouragement() + ' 「' + item.char + '」读 ' + item.pinyin,
        lessonFeedbackType: 'success'
      });
      setTimeout(function () {
        that.lessonCharIndex++;
        if (that.lessonCharIndex >= total) that.finishLessonStage();
        else that.renderLessonCharQuiz();
      }, 900);
    } else {
      options[idx].status = 'wrong';
      options.forEach(function (o, i) {
        if (o.text === item.pinyin) options[i].status = 'correct';
        o.disabled = true;
      });
      this.setData({
        lessonOptions: options,
        lessonFeedback: '再记一记：「' + item.char + '」读 ' + item.pinyin,
        lessonFeedbackType: 'error'
      });
      setTimeout(function () {
        that.answered = false;
        var opts = that.data.lessonOptions.map(function (o) {
          return { text: o.text, status: '', slug: o.slug, disabled: false };
        });
        that.setData({ lessonOptions: opts, lessonFeedback: '', lessonFeedbackType: '' });
      }, 1200);
    }
  },

  finishLessonStage() {
    var total = this.lessonChars.length;
    var score = this.lessonFirstTryOk;
    var stars = lessonData.starsFromScore(score, total);
    var key = String(this.lessonId);
    var prev = this.lessonProgress[key] || {};
    this.lessonProgress[key] = {
      passed: true,
      stars: Math.max(stars, prev.stars || 0),
      score: score,
      total: total,
      at: Date.now()
    };
    lessonData.saveProgress(this.lessonProgress);
    this.showResult('lesson', score, total, stars);
  },

  // ========== 识字卡片 ==========
  startFlashcard() {
    this.module = 'flashcard';
    this.flashList = shuffle(CHARACTERS.slice());
    this.flashIndex = 0;
    this.logStart('flashcard', { total: this.flashList.length });
    this.setData({ screen: 'flashcard' });
    this.renderFlashcard();
  },

  renderFlashcard() {
    var item = this.flashList[this.flashIndex];
    this.setData({
      flashProgress: '第 ' + (this.flashIndex + 1) + ' / ' + this.flashList.length + ' 张',
      flashEmoji: item.emoji,
      flashChar: item.char,
      flashPinyin: item.pinyin,
      flashWord: item.word
    });
    this._flashItem = item;
  },

  onFlashSpeakChar() {
    if (this._flashItem) speech.speakChar(this._flashItem.char);
  },

  onFlashSpeakWord() {
    if (this._flashItem) speech.speakWord(this._flashItem.word);
  },

  onFlashPrev() {
    this.flashIndex = (this.flashIndex - 1 + this.flashList.length) % this.flashList.length;
    this.renderFlashcard();
  },

  onFlashNext() {
    this.flashIndex = (this.flashIndex + 1) % this.flashList.length;
    this.renderFlashcard();
    speech.speakChar(this.flashList[this.flashIndex].char);
  },

  // ========== 读题训练 ==========
  startRead() {
    this.module = 'read';
    this.questions = pickRandom(READ_QUESTIONS, READ_TOTAL);
    this.index = 0;
    this.score = 0;
    this.logStart('read', { total: READ_TOTAL });
    this.setData({ screen: 'read' });
    this.renderReadQuestion();
  },

  renderReadQuestion() {
    var q = this.questions[this.index];
    var parts = q.text.split(q.keyword);
    this.setData({
      readProgress: '第 ' + (this.index + 1) + ' / ' + READ_TOTAL + ' 题',
      readScore: this.score,
      readTextBefore: parts[0] || '',
      readKeyword: q.keyword,
      readTextAfter: parts[1] || '',
      readPinyin: q.pinyin,
      readTask: q.task,
      readExample: '例子：' + q.example,
      readShowTask: false,
      readShowNext: false,
      readShowDone: true
    });
    this._readQ = q;
  },

  onReadSpeakQuestion() {
    if (this._readQ) speech.speakQuestion(this._readQ.text);
  },

  onReadSpeakKeyword() {
    if (this._readQ) speech.speakWord(this._readQ.keyword);
  },

  onReadSpeakTask() {
    if (this._readQ) speech.speakQuestion(this._readQ.task);
  },

  onReadDone() {
    this.score++;
    this.setData({
      readShowTask: true,
      readShowNext: true,
      readShowDone: false,
      readScore: this.score
    });
  },

  onReadNext() {
    this.index++;
    if (this.index >= READ_TOTAL) {
      this.showResult('read', this.score, READ_TOTAL);
    } else {
      this.renderReadQuestion();
    }
  },

  // ========== 题目常用词 ==========
  startKeywords() {
    this.module = 'keywords';
    this.kwIndex = 0;
    this.logStart('keywords', { total: QUESTION_WORDS.length });
    this.setData({ screen: 'keywords' });
    this.renderKeyword();
  },

  renderKeyword() {
    var item = QUESTION_WORDS[this.kwIndex];
    this.setData({
      kwProgress: '第 ' + (this.kwIndex + 1) + ' / ' + QUESTION_WORDS.length + ' 个',
      kwWord: item.word,
      kwPinyin: item.pinyin,
      kwMeaning: item.meaning
    });
    this._kwItem = item;
  },

  onKwSpeakWord() {
    if (this._kwItem) speech.speakWord(this._kwItem.word);
  },

  onKwSpeakMeaning() {
    if (this._kwItem) speech.speakMeaning(this._kwItem.word, this._kwItem.meaning);
  },

  onKwPrev() {
    this.kwIndex = (this.kwIndex - 1 + QUESTION_WORDS.length) % QUESTION_WORDS.length;
    this.renderKeyword();
  },

  onKwNext() {
    this.kwIndex = (this.kwIndex + 1) % QUESTION_WORDS.length;
    this.renderKeyword();
    speech.speakWord(QUESTION_WORDS[this.kwIndex].word);
  },

  // ========== 词语与句子 ==========
  getSentenceModeLabel(mode) {
    var modes = sentenceData.SENTENCE_MODES;
    for (var i = 0; i < modes.length; i++) {
      if (modes[i].id === mode) return modes[i].label;
    }
    return '综合练习';
  },

  switchSentenceMode(e) {
    this.setData({ sentenceMode: e.currentTarget.dataset.mode });
    this.startSentence(false);
  },

  startSentence(resetMode) {
    if (resetMode !== false) {
      this.setData({ sentenceMode: 'all' });
    }
    this.module = 'sentence';
    this.questions = sentenceData.pickQuestions(this.data.sentenceMode, SENTENCE_TOTAL);
    this.index = 0;
    this.score = 0;
    this.logStart('sentence', {
      subName: this.getSentenceModeLabel(this.data.sentenceMode),
      total: SENTENCE_TOTAL
    });
    this.setData({ sentenceScore: 0 });
    this.setScreen('sentence');
    this.renderSentenceQuestion();
  },

  renderSentenceQuestion() {
    var q = this.questions[this.index];
    this.sentenceSpeakText = sentenceData.buildSpeakText(q);
    this.setData({
      sentenceProgress: '第 ' + (this.index + 1) + ' / ' + SENTENCE_TOTAL + ' 题',
      sentenceCategory: sentenceData.CATEGORY_LABELS[q.category] || '',
      sentencePrompt: q.prompt,
      sentenceShowStem: q.type === 'fill',
      sentenceBefore: q.before || '',
      sentenceAfter: q.after || '',
      sentenceOptions: shuffle(q.options),
      sentenceCorrect: q.answer,
      sentenceWrong: '',
      sentenceAnswered: false,
      sentenceFeedback: '',
      sentenceFeedbackType: '',
      sentenceShowNext: false
    });
  },

  onSentenceSpeak() {
    speech.speakPhrase(this.sentenceSpeakText);
  },

  onSentenceOption(e) {
    if (this.data.sentenceAnswered) return;
    var val = e.currentTarget.dataset.val;
    var q = this.questions[this.index];
    if (val === q.answer) {
      this.score++;
      this.setData({
        sentenceAnswered: true,
        sentenceScore: this.score,
        sentenceFeedback: randomEncouragement(),
        sentenceFeedbackType: 'success',
        sentenceShowNext: true
      });
    } else {
      this.setData({
        sentenceAnswered: true,
        sentenceWrong: val,
        sentenceFeedback: '正确答案是：' + q.answer,
        sentenceFeedbackType: 'error',
        sentenceShowNext: true
      });
    }
  },

  onSentenceNext() {
    this.index++;
    if (this.index >= SENTENCE_TOTAL) {
      this.showResult('sentence', this.score, SENTENCE_TOTAL);
    } else {
      this.renderSentenceQuestion();
    }
  },

  // ========== 三年级预习 ==========
  startPreview3() {
    this.module = 'preview3';
    this.preview3Index = 0;
    var cat = grade3Preview.CATEGORIES[0].id;
    this.setData({
      preview3Cat: cat,
      preview3Tabs: grade3Preview.CATEGORIES
    });
    this.logStart('preview3', {
      subName: grade3Preview.CATEGORIES[0].name,
      total: grade3Preview.getItems(cat).length
    });
    this.setScreen('preview3');
    this.renderPreview3();
  },

  onPreview3Tab(e) {
    var cat = e.currentTarget.dataset.cat;
    this.preview3Index = 0;
    this.setData({ preview3Cat: cat });
    this.renderPreview3();
  },

  renderPreview3() {
    var items = grade3Preview.getItems(this.data.preview3Cat);
    if (!items.length) return;
    if (this.preview3Index >= items.length) this.preview3Index = 0;
    var item = items[this.preview3Index];
    var cat = grade3Preview.getCategory(this.data.preview3Cat);
    this.preview3SpeakText = item.speak || item.example || item.title + '。' + item.content;
    this.preview3Recite = null;
    if (item.poemId && item.recite) {
      var title = item.title.replace(/[《》]/g, '');
      var author = item.author ? item.author.replace(/^【[^】]+】/, '') : '';
      this.preview3Recite = {
        poemId: item.poemId,
        title: title,
        author: author,
        recite: item.recite
      };
    }
    var itemId = grade3Preview.getItemId(item);
    var metaParts = [];
    if (item.semester) metaParts.push(item.semester);
    if (item.unit) metaParts.push(item.unit);
    var rec = item.recite ? grade3Preview.getReciteRecord(itemId) : null;
    var hist = [];
    if (rec && rec.history) {
      rec.history.forEach(function (h) {
        hist.push({
          at: h.at,
          date: grade3Preview.formatReciteDate(h.at),
          score: h.percent + '% · ' + h.grade
        });
      });
    }
    this.setData({
      preview3Progress: (this.preview3Index + 1) + ' / ' + items.length + ' · ' + (cat ? cat.name : ''),
      preview3Icon: cat ? cat.icon : '📗',
      preview3Title: item.title,
      preview3Meta: metaParts.join(' · '),
      preview3Author: item.author || '',
      preview3IsPoem: !!(item.lines && item.lines.length && (item.category === 'poem' || item.category === 'garden')),
      preview3ShowRecite: !!(item.poemId && item.recite),
      preview3Lines: (item.lines && (item.category === 'poem' || item.category === 'garden')) ? item.lines : [],
      preview3Content: item.content,
      preview3Notes: item.notes ? ('注释：' + item.notes) : '',
      preview3ReciteBadge: rec && rec.best > 0 ? ('🏅 最高 ' + rec.best + '% · ' + rec.bestGrade) : '',
      preview3ReciteHistory: hist,
      preview3Example: item.example || ''
    });
  },

  onPreview3Speak() {
    speech.speakPhrase(this.preview3SpeakText);
  },

  onPreview3Recite() {
    var r = this.preview3Recite;
    if (!r) return;
    speech.speakPoemFull(r.poemId, r.title, r.author, r.recite);
  },

  onPreview3Prev() {
    var items = grade3Preview.getItems(this.data.preview3Cat);
    this.preview3Index = (this.preview3Index - 1 + items.length) % items.length;
    this.renderPreview3();
  },

  onPreview3Next() {
    var items = grade3Preview.getItems(this.data.preview3Cat);
    this.preview3Index = (this.preview3Index + 1) % items.length;
    this.renderPreview3();
    speech.speakPhrase(this.preview3SpeakText);
  },

  // ========== 结果页 ==========
  showResult(module, score, total, extraStars) {
    speech.stop();
    var resultText = score + ' / ' + total;
    var stars = extraStars;

    if (module === 'lesson') {
      var info = lessonData.findLesson(this.lessonId);
      var title = info ? info.lesson.title : '';
      stars = stars || lessonData.starsFromScore(score, total);
      resultText = '「' + title + '」' + score + '/' + total + ' · ' + '⭐'.repeat(stars || 1);
    } else if (module === 'read') {
      resultText = '完成 ' + score + ' / ' + total + ' 题';
    }

    session.finish({
      score: score,
      total: total,
      progress: total,
      result: resultText,
      percent: Math.round((score / total) * 100)
    });

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

    var resultMsg = msg;
    if (module === 'lesson') {
      var info2 = lessonData.findLesson(this.lessonId);
      var title2 = info2 ? info2.lesson.title : '';
      resultMsg = '「' + title2 + '」通关！获得 ' + '⭐'.repeat(stars || 1);
    }

    this.resultStars = stars || 0;
    this.setData({
      screen: 'result',
      resultEmoji: emoji,
      resultTitle: (titles[module] || '练习') + ' 完成！',
      resultMsg: resultMsg,
      resultScore: score + ' / ' + total,
      resultShowRetry: module !== 'flashcard' && module !== 'keywords' && module !== 'alphabet'
    });
  },

  onResultHome() {
    this.goHome();
  },

  onResultRetry() {
    if (this.module === 'pinyin') this.startPinyin();
    else if (this.module === 'char') this.startChar();
    else if (this.module === 'read') this.startRead();
    else if (this.module === 'lesson' && this.lessonId) this.startLessonPlay(this.lessonId);
    else if (this.module === 'sentence') this.startSentence(false);
    else this.goHome();
  }
});
