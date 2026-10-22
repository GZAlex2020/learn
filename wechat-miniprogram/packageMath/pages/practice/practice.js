var mathData = require('../../../utils/math-data.js');
var tenMethods = require('../../../utils/ten-methods.js');
var tenVisual = require('../../../utils/ten-visual.js');
var questions = require('../../../utils/math-questions.js');
var speech = require('../../../utils/speech.js');
var session = require('../../../utils/session-log.js');
var grade3Preview = require('../../../utils/grade3-math-preview.js');
var clockMoney = require('../../../utils/clock-money.js');
var clockVisual = require('../../../utils/clock-visual.js');

var CALC_MODES = mathData.CALC_MODES;
var CONCEPTS = mathData.CONCEPTS;
var KEYWORDS = mathData.KEYWORDS;
var ENCOURAGEMENTS = mathData.ENCOURAGEMENTS;
var READ_QUESTIONS = questions.READ_QUESTIONS;
var CALC_TOTAL = questions.CALC_TOTAL;
var CONCEPT_TOTAL = questions.CONCEPT_TOTAL;
var READ_TOTAL = questions.READ_TOTAL;

var MODULE_NAMES = {
  calc: '口算练习',
  match: '概念配对',
  flashcard: '概念卡片',
  read: '读题训练',
  keywords: '题目常用词',
  mult: '乘法口诀',
  ten: '凑十破十',
  preview3: '三年级预习',
  clockmoney: '时钟与钱币',
  cmPractice: '时钟与钱币练习'
};

var CALC_TAB_SHORT = {
  add10: '10以内',
  add20: '20以内',
  add100: '100以内',
  add1000: '三位数',
  multiply: '乘法',
  divide: '除法'
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
    calcModes: CALC_MODES.map(function (m) {
      return { id: m.id, short: CALC_TAB_SHORT[m.id] || m.label };
    }),
    calcMode: 'add10',
    calcModeLabel: '',
    calcIndex: 0,
    calcScore: 0,
    calcTotal: CALC_TOTAL,
    calcExpr: '',
    calcOptions: [],
    calcCorrect: 0,
    calcWrong: -1,
    calcAnswered: false,
    calcFeedback: '',
    calcFeedbackType: '',
    conceptTotal: CONCEPT_TOTAL,
    matchCount: 0,
    matchLeft: [],
    matchRight: [],
    matchSelected: null,
    flashIndex: 0,
    flashTotal: 0,
    flashEmoji: '',
    flashSymbol: '',
    flashSymbolLong: false,
    flashName: '',
    flashExample: '',
    readIndex: 0,
    readTotal: READ_TOTAL,
    readText: '',
    readKeyword: '',
    readTask: '',
    readExample: '',
    readRevealed: false,
    kwIndex: 0,
    kwTotal: KEYWORDS.length,
    kwWord: '',
    kwMeaning: '',
    kwFormula: '',
    multTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    rowCn: mathData.ROW_CN,
    multRows: [],
    multRow: 1,
    multSelected: { a: 1, b: 1, product: 1, rhyme: '一一得一', speak: '一一得一' },
    tenTabs: tenMethods.METHODS.map(function (m) { return { id: m.id, name: m.name }; }),
    tenMethodId: 'make10',
    tenIcon: '➕',
    tenName: '凑十法',
    tenTag: '',
    tenSummary: '',
    tenRhyme: '',
    tenSteps: [],
    tenExpr: '',
    tenStepLines: [],
    tenVisual: { type: 'none' },
    tenAnswer: '',
    tenExProgress: '1 / 3',
    tenPracticeTotal: tenMethods.TEN_PRACTICE_TOTAL,
    tenPracticeIndex: 0,
    tenPracticeScore: 0,
    tenPracticeLabel: '',
    tenPracticeExpr: '',
    tenPracticeOptions: [],
    tenPracticeCorrect: 0,
    tenPracticeWrong: -1,
    tenPracticeAnswered: false,
    tenPracticeFeedback: '',
    tenPracticeFeedbackType: '',
    preview3Cat: 'calc',
    preview3Tabs: [],
    preview3Progress: '',
    preview3Icon: '🔢',
    preview3Title: '',
    preview3Content: '',
    preview3Example: '',
    cmTopic: 'clock',
    cmTabs: clockMoney.TOPICS,
    cmProgress: '',
    cmIcon: '🕐',
    cmTitle: '',
    cmContent: '',
    cmExample: '',
    cmPracticeTotal: clockMoney.PRACTICE_TOTAL,
    cmPracticeIndex: 0,
    cmPracticeScore: 0,
    cmPracticeLabel: '',
    cmPracticePrompt: '',
    cmPracticeOptions: [],
    cmPracticeCorrect: '',
    cmPracticeWrong: '',
    cmPracticeAnswered: false,
    cmPracticeFeedback: '',
    cmPracticeFeedbackType: '',
    cmPracticeShowClock: false,
    cmClockHourDeg: 0,
    cmClockMinuteDeg: 0,
    cmClockNumbers: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    resultModule: '',
    resultScoreText: '',
    resultMsg: ''
  },

  module: null,
  calcQuestions: [],
  tenPracticeQuestions: [],
  cmPracticeQuestions: [],
  cmKnowledgeIndex: 0,
  cmSpeakText: '',
  preview3Index: 0,
  preview3SpeakText: '',
  readQuestions: [],
  flashList: [],
  matchLeftItems: [],
  matchRightItems: [],
  matchMatched: {},
  multSpeaking: false,
  multSequenceTimer: null,
  multLastSpeak: '',
  sessionStart: 0,

  onLoad(options) {
    this.sessionStart = Date.now();
    var mod = options && options.module;
    if (mod && MODULE_NAMES[mod]) {
      this.onModuleTap({ currentTarget: { dataset: { module: mod } } });
    }
  },

  onUnload() {
    if (this.module) session.abort();
    this.stopMultSequence();
    speech.stop();
  },

  setScreen(screen) {
    var titles = {
      home: '数学练习',
      calc: '口算练习',
      match: '概念配对',
      flashcard: '概念卡片',
      read: '读题训练',
      keywords: '题目常用词',
      mult: '乘法口诀',
      ten: '凑十破十',
      result: '练习完成'
    };
    wx.setNavigationBarTitle({ title: titles[screen] || '数学练习' });
    this.setData({ screen: screen });
  },

  goHome() {
    if (this.module) {
      session.abort();
      this.module = null;
    }
    this.stopMultSequence();
    speech.stop();
    this.setScreen('home');
  },

  onModuleTap(e) {
    var mod = e.currentTarget.dataset.module;
    if (mod === 'calc') this.startCalc(true);
    else if (mod === 'match') this.startMatch();
    else if (mod === 'flashcard') this.startFlashcard();
    else if (mod === 'read') this.startRead();
    else if (mod === 'keywords') this.startKeywords();
    else if (mod === 'mult') this.startMult();
    else if (mod === 'ten') this.startTen();
    else if (mod === 'preview3') this.startPreview3();
    else if (mod === 'clockmoney') this.startClockMoney();
  },

  logStart(module, opts) {
    opts = opts || {};
    session.start({
      subject: '数学',
      moduleName: MODULE_NAMES[module] || module,
      subName: opts.subName || '',
      total: opts.total || 0,
      progress: opts.progress || 0
    });
  },

  finishSession(opts) {
    session.finish(opts);
    this.module = null;
  },

  // ========== 口算 ==========
  startCalc(resetTab) {
    if (resetTab) {
      this.setData({ calcMode: 'add10' });
    }
    this.module = 'calc';
    var mode = this.data.calcMode;
    this.calcQuestions = mathData.generateCalcQuestions(mode, CALC_TOTAL);
    var modeInfo = CALC_MODES.find(function (m) { return m.id === mode; });
    this.logStart('calc', {
      subName: modeInfo ? modeInfo.label : '',
      total: CALC_TOTAL
    });
    this.setData({ calcIndex: 0, calcScore: 0 });
    this.setScreen('calc');
    this.renderCalcQuestion();
  },

  onCalcTab(e) {
    var mode = e.currentTarget.dataset.mode;
    this.setData({ calcMode: mode });
    this.startCalc(false);
  },

  renderCalcQuestion() {
    var q = this.calcQuestions[this.data.calcIndex];
    var modeInfo = CALC_MODES.find(function (m) { return m.id === this.data.calcMode; }.bind(this));
    var label = modeInfo ? modeInfo.label + ' · ' + modeInfo.hint + ' · 选出正确答案' : '';
    this.setData({
      calcModeLabel: label,
      calcExpr: q.expr,
      calcOptions: shuffle(q.options),
      calcCorrect: q.answer,
      calcWrong: -1,
      calcAnswered: false,
      calcFeedback: '',
      calcFeedbackType: ''
    });
  },

  onCalcOption(e) {
    if (this.data.calcAnswered) return;
    var val = Number(e.currentTarget.dataset.val);
    var q = this.calcQuestions[this.data.calcIndex];
    if (val === q.answer) {
      this.setData({
        calcAnswered: true,
        calcScore: this.data.calcScore + 1,
        calcFeedback: randomEncouragement(),
        calcFeedbackType: 'success'
      });
    } else {
      this.setData({
        calcAnswered: true,
        calcWrong: val,
        calcFeedback: '正确答案是：' + q.answer,
        calcFeedbackType: 'error'
      });
    }
  },

  onCalcNext() {
    var next = this.data.calcIndex + 1;
    if (next >= CALC_TOTAL) {
      this.showResult('calc', this.data.calcScore, CALC_TOTAL);
    } else {
      this.setData({ calcIndex: next });
      this.renderCalcQuestion();
    }
  },

  // ========== 概念配对 ==========
  startMatch() {
    this.module = 'match';
    this.matchMatched = {};
    var items = pickRandom(CONCEPTS, CONCEPT_TOTAL);
    this.matchLeftItems = items.map(function (c, i) {
      return { emoji: c.emoji, symbol: c.symbol, concept: c, idx: i };
    });
    this.matchRightItems = shuffle(items.map(function (c, i) {
      return { text: c.name, symbol: c.symbol, concept: c, idx: i, matched: false, wrong: false };
    }));
    this.logStart('match', { total: CONCEPT_TOTAL });
    this.setScreen('match');
    this.renderMatch();
  },

  renderMatch() {
    var count = Object.keys(this.matchMatched).length;
    var left = this.matchLeftItems.map(function (item) {
      return {
        emoji: item.emoji,
        symbol: item.symbol,
        idx: item.idx,
        hidden: !!this.matchMatched[item.idx]
      };
    }.bind(this));
    var right = this.matchRightItems.map(function (item) {
      return {
        text: item.text,
        idx: item.idx,
        matched: item.matched,
        wrong: item.wrong
      };
    });
    this.setData({
      matchCount: count,
      matchLeft: left,
      matchRight: right,
      matchSelected: this.data.matchSelected
    });
  },

  onMatchLeft(e) {
    var idx = e.currentTarget.dataset.idx;
    this.setData({ matchSelected: idx });
    this.renderMatch();
  },

  onMatchRight(e) {
    var rindex = e.currentTarget.dataset.rindex;
    if (this.data.matchSelected === null) return;
    var leftIdx = this.data.matchSelected;
    var left = this.matchLeftItems[leftIdx];
    var right = this.matchRightItems[rindex];
    if (!left || !right || right.matched) return;

    if (left.symbol === right.symbol) {
      this.matchMatched[leftIdx] = true;
      right.matched = true;
      this.setData({ matchSelected: null });
      this.renderMatch();
      var count = Object.keys(this.matchMatched).length;
      if (count >= CONCEPT_TOTAL) {
        var that = this;
        setTimeout(function () {
          that.finishSession({
            score: CONCEPT_TOTAL,
            total: CONCEPT_TOTAL,
            progress: CONCEPT_TOTAL,
            result: '全部配对成功'
          });
          wx.showToast({ title: '全部配对成功！', icon: 'success' });
          that.goHome();
        }, 300);
      }
    } else {
      right.wrong = true;
      this.renderMatch();
      var that = this;
      setTimeout(function () {
        right.wrong = false;
        that.renderMatch();
      }, 500);
    }
  },

  // ========== 概念卡片 ==========
  startFlashcard() {
    this.module = 'flashcard';
    this.flashList = shuffle(CONCEPTS.slice());
    this.logStart('flashcard', { total: this.flashList.length });
    this.setData({ flashIndex: 0, flashTotal: this.flashList.length });
    this.setScreen('flashcard');
    this.renderFlashcard();
  },

  renderFlashcard() {
    var c = this.flashList[this.data.flashIndex];
    this.setData({
      flashEmoji: c.emoji,
      flashSymbol: c.symbol,
      flashSymbolLong: c.symbol.length > 6,
      flashName: c.name,
      flashExample: c.example
    });
  },

  onFlashPrev() {
    var n = this.flashList.length;
    this.setData({ flashIndex: (this.data.flashIndex - 1 + n) % n });
    this.renderFlashcard();
  },

  onFlashNext() {
    var n = this.flashList.length;
    this.setData({ flashIndex: (this.data.flashIndex + 1) % n });
    this.renderFlashcard();
  },

  onFlashSpeak() {
    var c = this.flashList[this.data.flashIndex];
    speech.speakPhrase(c.name + '，' + c.example);
  },

  // ========== 读题训练 ==========
  startRead() {
    this.module = 'read';
    this.readQuestions = pickRandom(READ_QUESTIONS, READ_TOTAL);
    this.logStart('read', { total: READ_TOTAL });
    this.setData({ readIndex: 0, readRevealed: false });
    this.setScreen('read');
    this.renderReadQuestion();
  },

  renderReadQuestion() {
    var q = this.readQuestions[this.data.readIndex];
    this.setData({
      readText: q.text,
      readKeyword: q.keyword,
      readTask: q.task,
      readExample: q.example,
      readRevealed: false
    });
  },

  onReadSpeak() {
    speech.speakPhrase(this.data.readText);
  },

  onReadDone() {
    this.setData({ readRevealed: true });
  },

  onReadNext() {
    var next = this.data.readIndex + 1;
    if (next >= READ_TOTAL) {
      this.showResult('read', READ_TOTAL, READ_TOTAL);
    } else {
      this.setData({ readIndex: next });
      this.renderReadQuestion();
    }
  },

  // ========== 题目常用词 ==========
  startKeywords() {
    this.module = 'keywords';
    this.logStart('keywords', { total: KEYWORDS.length });
    this.setData({ kwIndex: 0 });
    this.setScreen('keywords');
    this.renderKeyword();
  },

  renderKeyword() {
    var k = KEYWORDS[this.data.kwIndex];
    this.setData({
      kwWord: k.word,
      kwMeaning: k.meaning,
      kwFormula: k.formula
    });
  },

  onKwPrev() {
    var n = KEYWORDS.length;
    this.setData({ kwIndex: (this.data.kwIndex - 1 + n) % n });
    this.renderKeyword();
  },

  onKwNext() {
    var n = KEYWORDS.length;
    this.setData({ kwIndex: (this.data.kwIndex + 1) % n });
    this.renderKeyword();
  },

  onKwSpeak() {
    var k = KEYWORDS[this.data.kwIndex];
    speech.speakPhrase(k.word + '，' + k.meaning);
  },

  // ========== 凑十破十 ==========
  startTen() {
    this.module = 'ten';
    this.setData({ tenMethodId: 'make10', tenExampleIndex: 0 });
    this.tenExampleIndex = 0;
    this.logStart('ten', { subName: '凑十破十', total: tenMethods.METHODS.length });
    this.setScreen('ten');
    this.renderTenMethod();
  },

  renderTenMethod() {
    var method = tenMethods.getMethod(this.data.tenMethodId);
    var idx = this.tenExampleIndex || 0;
    var ex = method.examples[idx];
    var visual = tenVisual.buildFromExample(ex, method.id);
    var v = tenVisual.flattenForWx(visual);
    var rhymeLines = method.rhyme.split(' · ');
    this.setData({
      tenIcon: method.icon,
      tenName: method.name,
      tenTag: method.tag,
      tenSummary: method.summary,
      tenRhyme: rhymeLines.join('\n'),
      tenSteps: method.steps,
      tenExpr: ex.expr,
      tenVisual: v,
      tenAnswer: '答案：' + ex.answer,
      tenExProgress: (idx + 1) + ' / ' + method.examples.length,
      tenSpeakText: method.name + '。' + method.rhyme.replace(/ · /g, '，') + '。' + ex.speak
    });
  },

  onTenTab(e) {
    this.tenExampleIndex = 0;
    this.setData({ tenMethodId: e.currentTarget.dataset.id });
    this.renderTenMethod();
  },

  onTenExPrev() {
    var method = tenMethods.getMethod(this.data.tenMethodId);
    this.tenExampleIndex = (this.tenExampleIndex - 1 + method.examples.length) % method.examples.length;
    this.renderTenMethod();
  },

  onTenExNext() {
    var method = tenMethods.getMethod(this.data.tenMethodId);
    this.tenExampleIndex = (this.tenExampleIndex + 1) % method.examples.length;
    this.renderTenMethod();
  },

  onTenSpeak() {
    speech.speakPhrase(this.data.tenSpeakText);
  },

  onTenPracticeStart() {
    var method = tenMethods.getMethod(this.data.tenMethodId);
    this.module = 'tenPractice';
    this.tenPracticeQuestions = tenMethods.generateQuestions(this.data.tenMethodId);
    this.logStart('tenPractice', {
      subName: method.name + '练习',
      total: tenMethods.TEN_PRACTICE_TOTAL
    });
    this.setData({ tenPracticeIndex: 0, tenPracticeScore: 0 });
    this.setScreen('tenPractice');
    this.renderTenPracticeQuestion();
  },

  renderTenPracticeQuestion() {
    var method = tenMethods.getMethod(this.data.tenMethodId);
    var q = this.tenPracticeQuestions[this.data.tenPracticeIndex];
    this.setData({
      tenPracticeLabel: method.name + '练习 · 选出正确答案',
      tenPracticeExpr: q.expr,
      tenPracticeOptions: shuffle(q.options),
      tenPracticeCorrect: q.answer,
      tenPracticeWrong: -1,
      tenPracticeAnswered: false,
      tenPracticeFeedback: '',
      tenPracticeFeedbackType: ''
    });
  },

  onTenPracticeOption(e) {
    if (this.data.tenPracticeAnswered) return;
    var val = Number(e.currentTarget.dataset.val);
    var q = this.tenPracticeQuestions[this.data.tenPracticeIndex];
    if (val === q.answer) {
      this.setData({
        tenPracticeAnswered: true,
        tenPracticeScore: this.data.tenPracticeScore + 1,
        tenPracticeFeedback: randomEncouragement(),
        tenPracticeFeedbackType: 'success'
      });
    } else {
      this.setData({
        tenPracticeAnswered: true,
        tenPracticeWrong: val,
        tenPracticeFeedback: '正确答案是：' + q.answer,
        tenPracticeFeedbackType: 'error'
      });
    }
  },

  onTenPracticeNext() {
    var next = this.data.tenPracticeIndex + 1;
    if (next >= tenMethods.TEN_PRACTICE_TOTAL) {
      this.showResult('ten', this.data.tenPracticeScore, tenMethods.TEN_PRACTICE_TOTAL);
    } else {
      this.setData({ tenPracticeIndex: next });
      this.renderTenPracticeQuestion();
    }
  },

  onTenPracticeBack() {
    this.setScreen('ten');
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
    this.preview3Index = 0;
    this.setData({ preview3Cat: e.currentTarget.dataset.cat });
    this.renderPreview3();
  },

  renderPreview3() {
    var items = grade3Preview.getItems(this.data.preview3Cat);
    if (!items.length) return;
    if (this.preview3Index >= items.length) this.preview3Index = 0;
    var item = items[this.preview3Index];
    var cat = grade3Preview.getCategory(this.data.preview3Cat);
    this.preview3SpeakText = item.speak || item.title + '。' + item.content;
    this.setData({
      preview3Progress: (this.preview3Index + 1) + ' / ' + items.length + ' · ' + (cat ? cat.name : ''),
      preview3Icon: cat ? cat.icon : '📗',
      preview3Title: item.title,
      preview3Content: item.content,
      preview3Example: item.example
    });
  },

  onPreview3Speak() {
    speech.speakPhrase(this.preview3SpeakText);
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

  // ========== 时钟与钱币 ==========
  startClockMoney() {
    this.module = 'clockmoney';
    this.cmKnowledgeIndex = 0;
    this.setData({ cmTopic: 'clock' });
    this.logStart('clockmoney', {
      subName: clockMoney.getTopic('clock').name,
      total: clockMoney.getKnowledge('clock').length
    });
    this.setScreen('clockmoney');
    this.renderClockMoney();
  },

  onCmTab(e) {
    this.cmKnowledgeIndex = 0;
    this.setData({ cmTopic: e.currentTarget.dataset.cm });
    this.renderClockMoney();
  },

  renderClockMoney() {
    var items = clockMoney.getKnowledge(this.data.cmTopic);
    if (!items.length) return;
    if (this.cmKnowledgeIndex >= items.length) this.cmKnowledgeIndex = 0;
    var item = items[this.cmKnowledgeIndex];
    var topic = clockMoney.getTopic(this.data.cmTopic);
    this.cmSpeakText = item.speak || item.title + '。' + item.content;
    this.setData({
      cmProgress: (this.cmKnowledgeIndex + 1) + ' / ' + items.length + ' · ' + topic.name,
      cmIcon: topic.icon,
      cmTitle: item.title,
      cmContent: item.content,
      cmExample: item.example
    });
  },

  onCmSpeak() {
    speech.speakPhrase(this.cmSpeakText);
  },

  onCmPrev() {
    var items = clockMoney.getKnowledge(this.data.cmTopic);
    this.cmKnowledgeIndex = (this.cmKnowledgeIndex - 1 + items.length) % items.length;
    this.renderClockMoney();
  },

  onCmNext() {
    var items = clockMoney.getKnowledge(this.data.cmTopic);
    this.cmKnowledgeIndex = (this.cmKnowledgeIndex + 1) % items.length;
    this.renderClockMoney();
    speech.speakPhrase(this.cmSpeakText);
  },

  onCmPracticeStart() {
    this.module = 'cmPractice';
    this.cmPracticeQuestions = clockMoney.generateQuestions(this.data.cmTopic);
    this.cmPracticeIndex = 0;
    this.cmPracticeScore = 0;
    this.logStart('cmPractice', {
      subName: clockMoney.getTopic(this.data.cmTopic).name + '练习',
      total: clockMoney.PRACTICE_TOTAL
    });
    this.setData({ cmPracticeIndex: 0, cmPracticeScore: 0 });
    this.setScreen('cmPractice');
    this.renderCmPractice();
  },

  renderCmPractice() {
    var topic = clockMoney.getTopic(this.data.cmTopic);
    var q = this.cmPracticeQuestions[this.cmPracticeIndex];
    var clockData = q.clock ? clockVisual.flattenForWx(q.clock) : { show: false };
    this.setData({
      cmPracticeLabel: topic.name + ' · 选出正确答案',
      cmPracticePrompt: q.prompt,
      cmPracticeShowClock: clockData.show,
      cmClockHourDeg: clockData.hourDeg || 0,
      cmClockMinuteDeg: clockData.minuteDeg || 0,
      cmPracticeOptions: shuffle(q.options),
      cmPracticeCorrect: q.answer,
      cmPracticeWrong: '',
      cmPracticeAnswered: false,
      cmPracticeFeedback: '',
      cmPracticeFeedbackType: ''
    });
  },

  onCmPracticeOption(e) {
    if (this.data.cmPracticeAnswered) return;
    var val = e.currentTarget.dataset.val;
    var q = this.cmPracticeQuestions[this.cmPracticeIndex];
    if (val === q.answer) {
      this.cmPracticeScore++;
      this.setData({
        cmPracticeAnswered: true,
        cmPracticeScore: this.cmPracticeScore,
        cmPracticeFeedback: randomEncouragement(),
        cmPracticeFeedbackType: 'success'
      });
    } else {
      this.setData({
        cmPracticeAnswered: true,
        cmPracticeWrong: val,
        cmPracticeFeedback: '正确答案是：' + q.answer,
        cmPracticeFeedbackType: 'error'
      });
    }
  },

  onCmPracticeNext() {
    this.cmPracticeIndex++;
    if (this.cmPracticeIndex >= clockMoney.PRACTICE_TOTAL) {
      this.showResult('cmPractice', this.cmPracticeScore, clockMoney.PRACTICE_TOTAL);
    } else {
      this.setData({ cmPracticeIndex: this.cmPracticeIndex });
      this.renderCmPractice();
    }
  },

  onCmPracticeBack() {
    this.module = 'clockmoney';
    this.setScreen('clockmoney');
  },

  // ========== 乘法口诀 ==========
  stopMultSequence() {
    if (this.multSequenceTimer) {
      clearTimeout(this.multSequenceTimer);
      this.multSequenceTimer = null;
    }
    this.multSpeaking = false;
    speech.stop();
  },

  startMult() {
    this.module = 'mult';
    this.multLastSpeak = '';
    this.sessionStart = Date.now();
    this.logStart('mult', { subName: '九九口诀表', total: 45 });
    this.setData({ multRow: 1 });
    this.setScreen('mult');
    this.renderMultTable();
  },

  renderMultTable() {
    var multRows = [];
    for (var r = 1; r <= 9; r++) {
      multRows.push(mathData.getMultRow(r));
    }
    var selected = this.data.multSelected;
    if (!selected || !selected.a) {
      selected = multRows[0][0];
    }
    this.setData({
      multRows: multRows,
      multSelected: selected,
      multRow: selected.a
    });
  },

  onMultCell(e) {
    var ri = Number(e.currentTarget.dataset.row);
    var ci = Number(e.currentTarget.dataset.index);
    var item = this.data.multRows[ri][ci];
    if (!item) return;
    var wasSpeaking = this.multSpeaking;
    var wasPlaying = speech.isPlaying();
    if (wasSpeaking) {
      this.stopMultSequence();
    }
    this.setData({ multSelected: item, multRow: item.a });
    if (wasSpeaking) return;
    if (wasPlaying && this.multLastSpeak === item.speak) {
      speech.stop();
      this.multLastSpeak = '';
      return;
    }
    this.multLastSpeak = item.speak;
    speech.speakPhrase(item.speak);
  },

  onMultSpeakOne() {
    var item = this.data.multSelected;
    if (!item) return;
    if (this.multSpeaking) {
      this.stopMultSequence();
      return;
    }
    if (speech.isPlaying() && this.multLastSpeak === item.speak) {
      speech.stop();
      this.multLastSpeak = '';
      return;
    }
    this.multLastSpeak = item.speak;
    speech.speakPhrase(item.speak);
  },

  onMultSpeakRow() {
    var row = this.data.multSelected ? this.data.multSelected.a : 1;
    this._speakMultSequence(mathData.getMultRow(row), false);
  },

  onMultSpeakAll() {
    this._speakMultSequence(mathData.getMultTriangleList(), true);
  },

  _speakMultSequence(list, isAll) {
    var that = this;
    if (that.multSpeaking) {
      that.stopMultSequence();
      return;
    }
    if (!list.length) return;
    that.multSpeaking = true;
    var i = 0;
    function next() {
      if (!that.multSpeaking) return;
      if (i >= list.length) {
        that.multSpeaking = false;
        that.multSequenceTimer = null;
        if (isAll && (Date.now() - that.sessionStart) > 60000) {
          that.finishSession({
            progress: 45,
            total: 45,
            result: '听完全部口诀',
            percent: 100
          });
        }
        return;
      }
      var item = list[i];
      that.setData({ multSelected: item, multRow: item.a });
      that.multLastSpeak = item.speak;
      speech.speakPhrase(item.speak);
      i++;
      that.multSequenceTimer = setTimeout(next, 1200);
    }
    next();
  },

  // ========== 结果 ==========
  showResult(module, score, total) {
    var resultText = module === 'read'
      ? '完成 ' + total + ' 道读题训练'
      : score + ' / ' + total;
    this.finishSession({
      score: score,
      total: total,
      progress: total,
      result: resultText
    });
    var scoreText = module === 'read'
      ? '完成了 ' + total + ' 道读题训练'
      : '得分：' + score + ' / ' + total;
    this.setData({
      resultModule: module,
      resultScoreText: scoreText,
      resultMsg: randomEncouragement()
    });
    this.setScreen('result');
  },

  onResultRetry() {
    var mod = this.data.resultModule;
    if (mod === 'calc') this.startCalc(false);
    else if (mod === 'read') this.startRead();
    else if (mod === 'ten') this.onTenPracticeStart();
    else if (mod === 'cmPractice') this.onCmPracticeStart();
    else this.goHome();
  }
});
