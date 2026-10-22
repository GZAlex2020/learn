/**
 * 小学英语 · 一～三年级上 基础词汇与句型
 */
window.ENGLISH_DATA = (function () {
  'use strict';

  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (ch) {
    return { letter: ch, lower: ch.toLowerCase(), speak: ch };
  });

  var NUMBERS = [
    { en: 'one', zh: '一', num: '1' }, { en: 'two', zh: '二', num: '2' },
    { en: 'three', zh: '三', num: '3' }, { en: 'four', zh: '四', num: '4' },
    { en: 'five', zh: '五', num: '5' }, { en: 'six', zh: '六', num: '6' },
    { en: 'seven', zh: '七', num: '7' }, { en: 'eight', zh: '八', num: '8' },
    { en: 'nine', zh: '九', num: '9' }, { en: 'ten', zh: '十', num: '10' },
    { en: 'eleven', zh: '十一', num: '11' }, { en: 'twelve', zh: '十二', num: '12' },
    { en: 'thirteen', zh: '十三', num: '13' }, { en: 'fourteen', zh: '十四', num: '14' },
    { en: 'fifteen', zh: '十五', num: '15' }, { en: 'sixteen', zh: '十六', num: '16' },
    { en: 'seventeen', zh: '十七', num: '17' }, { en: 'eighteen', zh: '十八', num: '18' },
    { en: 'nineteen', zh: '十九', num: '19' }, { en: 'twenty', zh: '二十', num: '20' }
  ];

  var COLORS = [
    { en: 'red', zh: '红色', emoji: '🔴' },
    { en: 'blue', zh: '蓝色', emoji: '🔵' },
    { en: 'green', zh: '绿色', emoji: '🟢' },
    { en: 'yellow', zh: '黄色', emoji: '🟡' },
    { en: 'orange', zh: '橙色', emoji: '🟠' },
    { en: 'purple', zh: '紫色', emoji: '🟣' },
    { en: 'pink', zh: '粉色', emoji: '💗' },
    { en: 'black', zh: '黑色', emoji: '⬛' },
    { en: 'white', zh: '白色', emoji: '⬜' },
    { en: 'brown', zh: '棕色', emoji: '🟤' }
  ];

  // 优先使用课本单元汇总；若 textbook.js 未加载则回退空数组由调用方处理
  var TB = window.ENGLISH_TEXTBOOK;
  var WORDS_G12 = TB ? TB.allWordsG12() : [];
  var WORDS_G3 = TB ? TB.allWordsG3() : [];
  var PHRASES_G12 = TB ? TB.allPhrasesG12() : [];
  var PHRASES_G3 = TB ? TB.allPhrasesG3() : [];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  function makeWordQuiz(list, count) {
    var items = pickRandom(list, count);
    return items.map(function (item) {
      var wrong = pickRandom(list.filter(function (x) { return x.en !== item.en; }), 3)
        .map(function (x) { return x.en; });
      return {
        prompt: item.zh,
        answer: item.en,
        speak: item.speak || item.en,
        options: shuffle([item.en].concat(wrong))
      };
    });
  }

  function makeListenQuiz(list, count) {
    var items = pickRandom(list, count);
    return items.map(function (item) {
      var wrong = pickRandom(list.filter(function (x) { return x.en !== item.en; }), 3)
        .map(function (x) { return x.en; });
      return {
        prompt: '听读音，选出正确单词',
        answer: item.en,
        speak: item.speak || item.en,
        options: shuffle([item.en].concat(wrong))
      };
    });
  }

  function makePhraseQuiz(list, count) {
    var items = pickRandom(list, count);
    return items.map(function (item) {
      var wrong = pickRandom(list.filter(function (x) { return x.en !== item.en; }), 3)
        .map(function (x) { return x.en; });
      return {
        prompt: item.zh,
        answer: item.en,
        speak: item.speak || item.en,
        options: shuffle([item.en].concat(wrong))
      };
    });
  }

  function makeNumberQuiz(count) {
    var items = pickRandom(NUMBERS, count);
    return items.map(function (item) {
      var wrong = pickRandom(NUMBERS.filter(function (x) { return x.en !== item.en; }), 3)
        .map(function (x) { return x.en; });
      return {
        prompt: item.num + ' · ' + item.zh,
        answer: item.en,
        speak: item.en,
        options: shuffle([item.en].concat(wrong))
      };
    });
  }

  function makeColorQuiz(count) {
    var items = pickRandom(COLORS, count);
    return items.map(function (item) {
      var wrong = pickRandom(COLORS.filter(function (x) { return x.en !== item.en; }), 3)
        .map(function (x) { return x.en; });
      return {
        prompt: item.emoji + ' ' + item.zh,
        answer: item.en,
        speak: item.en,
        options: shuffle([item.en].concat(wrong))
      };
    });
  }

  return {
    ALPHABET: ALPHABET,
    NUMBERS: NUMBERS,
    COLORS: COLORS,
    WORDS_G12: WORDS_G12,
    WORDS_G3: WORDS_G3,
    PHRASES_G12: PHRASES_G12,
    PHRASES_G3: PHRASES_G3,
    ENCOURAGEMENTS: ['Great!', 'Wonderful!', 'Good job!', 'Excellent!', 'Nice!', '真棒！'],
    shuffle: shuffle,
    pickRandom: pickRandom,
    makeWordQuiz: makeWordQuiz,
    makeListenQuiz: makeListenQuiz,
    makePhraseQuiz: makePhraseQuiz,
    makeNumberQuiz: makeNumberQuiz,
    makeColorQuiz: makeColorQuiz
  };
})();
