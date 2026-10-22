var pinyinData = require('../../utils/pinyin-data.js');
var chartData = require('../../utils/pinyin-chart-data.js');
var speech = require('../../utils/speech-zh.js');
var session = require('../../../utils/session-log.js');

var SHENGMU_EX = pinyinData.SHENGMU_EXAMPLES;
var YUNMU_EX = pinyinData.YUNMU_EXAMPLES;
var ZHENGTI = pinyinData.ZHENGTIRENDU;

function findShengmu(id) {
  for (var i = 0; i < SHENGMU_EX.length; i++) {
    if (SHENGMU_EX[i].sm === id) return SHENGMU_EX[i];
  }
  return null;
}

function findYunmu(id) {
  for (var i = 0; i < YUNMU_EX.length; i++) {
    if (YUNMU_EX[i].ym === id) return YUNMU_EX[i];
  }
  return null;
}

Page({
  data: {
    tab: 'tones',
    tabs: [
      { id: 'tones', label: '四声' },
      { id: 'shengmu', label: '声母' },
      { id: 'yunmu', label: '韵母' },
      { id: 'zhengti', label: '整体认读' }
    ],
    toneCards: [],
    shengmuGroups: [],
    yunmuGroups: [],
    zhengtiList: [],
    detailLetter: '',
    detailText: '',
    detailEmpty: true,
    speakCharLabel: '🔊 听拼音',
    speakWordLabel: '🔊 听组词'
  },

  current: null,
  viewedCount: 0,

  onLoad() {
    session.start({ subject: '语文', moduleName: '互动拼音表', subName: '浏览学习' });
    this.buildData();
  },

  onUnload() {
    speech.stop();
    if (this.viewedCount > 0) {
      session.finish({
        progress: this.viewedCount,
        total: this.viewedCount,
        result: '浏览 ' + this.viewedCount + ' 个拼音'
      });
    } else {
      session.abort();
    }
  },

  buildData() {
    var toneCards = chartData.SHENGDIAO.map(function (t) {
      return {
        tone: t.tone,
        name: t.name + ' ' + t.symbol,
        example: t.example,
        pinyin: t.pinyin
      };
    });

    var shengmuGroups = chartData.SHENGMU_GROUPS.map(function (group) {
      var cells = [];
      group.ids.forEach(function (id) {
        var item = findShengmu(id);
        if (!item) return;
        cells.push({
          letter: item.sm,
          char: item.char,
          sub: item.pinyin || item.word,
          key: 'sm_' + item.sm
        });
      });
      return { title: group.title, cells: cells };
    });

    var yunmuGroups = chartData.YUNMU_GROUPS.map(function (group) {
      var cells = [];
      group.ids.forEach(function (id) {
        var item = findYunmu(id);
        if (!item) return;
        cells.push({
          letter: item.ym,
          char: item.char,
          sub: item.pinyin || item.word,
          key: 'ym_' + String(item.ym).replace('ü', 'v')
        });
      });
      return { title: group.title, cells: cells };
    });

    var zhengtiList = ZHENGTI.map(function (item) {
      return {
        letter: item.py,
        char: item.char,
        sub: item.pinyin || item.word,
        key: 'zt_' + item.py
      };
    });

    this._toneItems = chartData.SHENGDIAO.map(function (t) {
      return {
        char: t.example,
        word: t.word,
        pinyin: t.pinyin,
        speak: t.pinyin,
        toneId: t.tone
      };
    });
    this._shengmuMap = {};
    SHENGMU_EX.forEach(function (item) { this._shengmuMap[item.sm] = item; }.bind(this));
    this._yunmuMap = {};
    YUNMU_EX.forEach(function (item) { this._yunmuMap[item.ym] = item; }.bind(this));
    this._zhengtiList = ZHENGTI;

    this.setData({
      toneCards: toneCards,
      shengmuGroups: shengmuGroups,
      yunmuGroups: yunmuGroups,
      zhengtiList: zhengtiList
    });
  },

  switchTab(e) {
    this.setData({ tab: e.currentTarget.dataset.tab });
  },

  selectItem(item, letter, label) {
    this.current = item;
    this.viewedCount++;
    var detail = item.char;
    if (item.pinyin) detail += ' ' + item.pinyin;
    if (item.word && item.word !== item.char) detail += ' · ' + item.word;
    if (label) detail += ' · ' + label;
    var speakText = item.speak || item.pinyin;
    this.setData({
      detailEmpty: false,
      detailLetter: letter,
      detailText: detail,
      speakCharLabel: '🔊 听「' + speakText + '」',
      speakWordLabel: '🔊 听组词「' + item.word + '」'
    });
  },

  speakItemPinyin(item, tab) {
    var text = item.speak || item.pinyin;
    speech.speakPinyinSlug(speech.getPinyinSlug(item, tab), text);
  },

  onToneTap(e) {
    var idx = e.currentTarget.dataset.index;
    var t = chartData.SHENGDIAO[idx];
    var item = this._toneItems[idx];
    this.selectItem(item, t.pinyin, t.name);
    this.speakItemPinyin(item);
  },

  onShengmuTap(e) {
    var sm = e.currentTarget.dataset.sm;
    var item = this._shengmuMap[sm];
    if (!item) return;
    this.selectItem(item, item.sm, '声母');
    this.speakItemPinyin(item, 'shengmu');
  },

  onYunmuTap(e) {
    var ym = e.currentTarget.dataset.ym;
    var item = this._yunmuMap[ym];
    if (!item) return;
    this.selectItem(item, item.ym, '韵母');
    this.speakItemPinyin(item, 'yunmu');
  },

  onZhengtiTap(e) {
    var idx = e.currentTarget.dataset.index;
    var item = this._zhengtiList[idx];
    this.selectItem(item, item.py, '整体认读');
    this.speakItemPinyin(item);
  },

  onSpeakChar() {
    if (this.current) this.speakItemPinyin(this.current);
  },

  onSpeakWord() {
    if (this.current) speech.speakWord(this.current.word);
  }
});
