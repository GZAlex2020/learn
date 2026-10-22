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

  var WORDS_G12 = [
    { en: 'apple', zh: '苹果', speak: 'apple' },
    { en: 'banana', zh: '香蕉', speak: 'banana' },
    { en: 'cat', zh: '猫', speak: 'cat' },
    { en: 'dog', zh: '狗', speak: 'dog' },
    { en: 'book', zh: '书', speak: 'book' },
    { en: 'pen', zh: '钢笔', speak: 'pen' },
    { en: 'bag', zh: '包', speak: 'bag' },
    { en: 'school', zh: '学校', speak: 'school' },
    { en: 'teacher', zh: '老师', speak: 'teacher' },
    { en: 'friend', zh: '朋友', speak: 'friend' },
    { en: 'mother', zh: '妈妈', speak: 'mother' },
    { en: 'father', zh: '爸爸', speak: 'father' },
    { en: 'water', zh: '水', speak: 'water' },
    { en: 'milk', zh: '牛奶', speak: 'milk' },
    { en: 'fish', zh: '鱼', speak: 'fish' },
    { en: 'bird', zh: '鸟', speak: 'bird' },
    { en: 'sun', zh: '太阳', speak: 'sun' },
    { en: 'moon', zh: '月亮', speak: 'moon' },
    { en: 'star', zh: '星星', speak: 'star' },
    { en: 'tree', zh: '树', speak: 'tree' },
    { en: 'flower', zh: '花', speak: 'flower' },
    { en: 'ball', zh: '球', speak: 'ball' },
    { en: 'car', zh: '汽车', speak: 'car' },
    { en: 'bus', zh: '公共汽车', speak: 'bus' }
  ];

  var WORDS_G3 = [
    { en: 'happy', zh: '高兴的', speak: 'happy' },
    { en: 'hungry', zh: '饿的', speak: 'hungry' },
    { en: 'thirsty', zh: '渴的', speak: 'thirsty' },
    { en: 'tired', zh: '累的', speak: 'tired' },
    { en: 'breakfast', zh: '早餐', speak: 'breakfast' },
    { en: 'lunch', zh: '午餐', speak: 'lunch' },
    { en: 'dinner', zh: '晚餐', speak: 'dinner' },
    { en: 'hospital', zh: '医院', speak: 'hospital' },
    { en: 'library', zh: '图书馆', speak: 'library' },
    { en: 'cinema', zh: '电影院', speak: 'cinema' },
    { en: 'supermarket', zh: '超市', speak: 'supermarket' },
    { en: 'weekend', zh: '周末', speak: 'weekend' },
    { en: 'Monday', zh: '星期一', speak: 'Monday' },
    { en: 'Tuesday', zh: '星期二', speak: 'Tuesday' },
    { en: 'Wednesday', zh: '星期三', speak: 'Wednesday' },
    { en: 'Thursday', zh: '星期四', speak: 'Thursday' },
    { en: 'Friday', zh: '星期五', speak: 'Friday' },
    { en: 'Saturday', zh: '星期六', speak: 'Saturday' },
    { en: 'Sunday', zh: '星期日', speak: 'Sunday' },
    { en: 'weather', zh: '天气', speak: 'weather' },
    { en: 'sunny', zh: '晴朗的', speak: 'sunny' },
    { en: 'rainy', zh: '下雨的', speak: 'rainy' },
    { en: 'cloudy', zh: '多云的', speak: 'cloudy' },
    { en: 'windy', zh: '有风的', speak: 'windy' }
  ];

  var PHRASES_G12 = [
    { en: 'Hello!', zh: '你好！', speak: 'Hello!' },
    { en: 'Hi!', zh: '嗨！', speak: 'Hi!' },
    { en: 'Good morning!', zh: '早上好！', speak: 'Good morning!' },
    { en: 'Good afternoon!', zh: '下午好！', speak: 'Good afternoon!' },
    { en: 'Good night!', zh: '晚安！', speak: 'Good night!' },
    { en: 'Thank you!', zh: '谢谢你！', speak: 'Thank you!' },
    { en: 'You are welcome.', zh: '不客气。', speak: 'You are welcome.' },
    { en: 'Sorry.', zh: '对不起。', speak: 'Sorry.' },
    { en: 'Excuse me.', zh: '打扰一下。', speak: 'Excuse me.' },
    { en: 'How are you?', zh: '你好吗？', speak: 'How are you?' },
    { en: 'I am fine.', zh: '我很好。', speak: 'I am fine.' },
    { en: 'Nice to meet you.', zh: '很高兴见到你。', speak: 'Nice to meet you.' },
    { en: 'See you!', zh: '再见！', speak: 'See you!' },
    { en: 'Bye-bye!', zh: '拜拜！', speak: 'Bye-bye!' },
    { en: 'What is your name?', zh: '你叫什么名字？', speak: 'What is your name?' },
    { en: 'My name is Tom.', zh: '我叫汤姆。', speak: 'My name is Tom.' }
  ];

  var PHRASES_G3 = [
    { en: 'How old are you?', zh: '你几岁了？', speak: 'How old are you?' },
    { en: 'I am nine years old.', zh: '我九岁了。', speak: 'I am nine years old.' },
    { en: 'Where are you from?', zh: '你来自哪里？', speak: 'Where are you from?' },
    { en: 'I am from China.', zh: '我来自中国。', speak: 'I am from China.' },
    { en: 'What do you like?', zh: '你喜欢什么？', speak: 'What do you like?' },
    { en: 'I like apples.', zh: '我喜欢苹果。', speak: 'I like apples.' },
    { en: 'Can I help you?', zh: '我能帮你吗？', speak: 'Can I help you?' },
    { en: 'Yes, please.', zh: '好的，麻烦了。', speak: 'Yes, please.' },
    { en: 'No, thank you.', zh: '不用了，谢谢。', speak: 'No, thank you.' },
    { en: 'What time is it?', zh: '现在几点了？', speak: 'What time is it?' },
    { en: 'It is sunny today.', zh: '今天天气晴朗。', speak: 'It is sunny today.' },
    { en: 'Let us go to school.', zh: '我们去学校吧。', speak: 'Let us go to school.' },
    { en: 'I have a new book.', zh: '我有一本新书。', speak: 'I have a new book.' },
    { en: 'This is my friend.', zh: '这是我的朋友。', speak: 'This is my friend.' },
    { en: 'Have a nice day!', zh: '祝你有美好的一天！', speak: 'Have a nice day!' }
  ];

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
