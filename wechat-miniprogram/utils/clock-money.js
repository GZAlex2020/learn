module.exports = (function () {
  'use strict';

  var PRACTICE_TOTAL = 5;

  var TOPICS = [
    { id: 'clock', name: '认识时钟', icon: '🕐' },
    { id: 'money', name: '认识钱币', icon: '💰' }
  ];

  var KNOWLEDGE = {
    clock: [
      {
        title: '钟面上的针',
        content: '短针是时针，长针是分针。时针走得慢，分针走得快。',
        example: '例：短针指 3，长针指 12 → 3 时',
        speak: '短针是时针，长针是分针。时针走得慢，分针走得快。'
      },
      {
        title: '整点',
        content: '分针指向 12，时针指几就是几时。',
        example: '例：分针指 12，时针指 8 → 8 时',
        speak: '整点：分针指向 12，时针指几就是几时。'
      },
      {
        title: '半点',
        content: '分针指向 6，时针在两个数字中间，是几时半。',
        example: '例：时针在 2 和 3 之间，分针指 6 → 2 时半',
        speak: '半点：分针指向 6，是几时半。'
      },
      {
        title: '几时几分',
        content: '分针每走一大格是 5 分钟。分针指 3 是 15 分，指 6 是 30 分。',
        example: '例：时针指 4，分针指 3 → 4 时 15 分',
        speak: '分针每走一大格是 5 分钟。'
      },
      {
        title: '时间单位',
        content: '1 时 = 60 分。1 天 = 24 时。',
        example: '例：从 8 时到 9 时，经过了 1 时',
        speak: '1 时等于 60 分，1 天等于 24 时。'
      }
    ],
    money: [
      {
        title: '人民币单位',
        content: '元、角、分。1 元 = 10 角，1 角 = 10 分。',
        example: '例：1 元 = 10 角',
        speak: '人民币有元、角、分。1 元等于 10 角，1 角等于 10 分。'
      },
      {
        title: '常见面额',
        content: '硬币：1 元、5 角、1 角。纸币：1 元、5 元、10 元、20 元、50 元、100 元。',
        example: '例：买 3 角的东西，可以付 1 个 5 角找回 2 角',
        speak: '常见有 1 元、5 角、1 角硬币，还有各种纸币。'
      },
      {
        title: '元角换算',
        content: '几元几角：2 元 3 角 = 23 角。满 10 角进 1 元。',
        example: '例：3 元 5 角 = 35 角',
        speak: '2 元 3 角等于 23 角。满 10 角就是 1 元。'
      },
      {
        title: '简单购物',
        content: '买东西：付的钱 − 价钱 = 找回的钱。',
        example: '例：付 1 元买 6 角的铅笔，找回 4 角',
        speak: '付的钱减价钱等于找回的钱。'
      },
      {
        title: '比较大小',
        content: '先比元，再比角。1 元 > 9 角，2 元 5 角 > 2 元 3 角。',
        example: '例：1 元 2 角 > 1 元',
        speak: '比钱的大小，先比元再比角。'
      }
    ]
  };

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    var a = arr.slice();
    var i = a.length - 1;
    var j;
    var t;
    for (; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function makeStrOptions(answer, pool) {
    pool = pool || [answer];
    var opts = [answer];
    shuffle(pool).forEach(function (s) {
      if (opts.length >= 4) return;
      if (s !== answer && opts.indexOf(s) === -1) opts.push(s);
    });
    while (opts.length < 4) {
      var extra = answer + opts.length;
      if (opts.indexOf(extra) === -1) opts.push(extra);
    }
    return opts.slice(0, 4);
  }

  function clockHourOptions(correct) {
    var pool = [];
    var h;
    for (h = 1; h <= 12; h++) pool.push(h + '时');
    return makeStrOptions(correct, pool);
  }

  function generateClockQuestion() {
    var kind = randInt(1, 4);
    var h;
    var m;
    var prompt;
    var answer;
    var options;
    var clock;

    if (kind === 1) {
      h = randInt(1, 12);
      prompt = '看钟表，现在是几时？';
      answer = h + '时';
      options = clockHourOptions(answer);
      clock = { hour: h, minute: 0 };
    } else if (kind === 2) {
      h = randInt(1, 11);
      prompt = '看钟表，现在是几时？';
      answer = h + '时半';
      options = makeStrOptions(answer, [h + '时', h + '时半', (h + 1) + '时', (h + 1) + '时半']);
      clock = { hour: h, minute: 30 };
    } else if (kind === 3) {
      h = randInt(1, 12);
      m = randInt(1, 5) * 5;
      if (m === 0) m = 15;
      prompt = '看钟表，现在是几时几分？';
      answer = h + '时' + m + '分';
      options = makeStrOptions(answer, [
        h + '时',
        h + '时半',
        h + '时' + m + '分',
        h + '时' + (m + 5 > 55 ? m - 5 : m + 5) + '分'
      ]);
      clock = { hour: h, minute: m };
    } else {
      var steps = randInt(1, 4);
      var mins = steps * 5;
      prompt = '分针从 12 走到 ' + steps + '，走了多少分钟？';
      answer = mins + '分钟';
      options = makeStrOptions(answer, [
        (mins - 5) + '分钟',
        mins + '分钟',
        (mins + 5) + '分钟',
        (mins + 10) + '分钟'
      ]);
      clock = { hour: 12, minute: mins };
    }

    return { topic: 'clock', prompt: prompt, answer: answer, options: options, clock: clock };
  }

  function generateMoneyQuestion() {
    var kind = randInt(1, 5);
    var prompt;
    var answer;
    var options;

    if (kind === 1) {
      prompt = '1 元等于多少角？';
      answer = '10角';
      options = makeStrOptions(answer, ['5角', '10角', '100角', '1角']);
    } else if (kind === 2) {
      var yuan = randInt(1, 5);
      var jiao = randInt(0, 9);
      prompt = yuan + ' 元 ' + jiao + ' 角 = ？角';
      answer = (yuan * 10 + jiao) + '角';
      options = makeStrOptions(answer, [
        (yuan * 10 + jiao - 1) + '角',
        (yuan * 10 + jiao) + '角',
        (yuan * 10 + jiao + 1) + '角',
        (yuan * 10 + jiao + 2) + '角'
      ]);
    } else if (kind === 3) {
      var a = randInt(1, 8);
      var b = randInt(1, 9 - a);
      prompt = a + ' 角 + ' + b + ' 角 = ？';
      answer = (a + b) + '角';
      options = makeStrOptions(answer, [
        (a + b - 1) + '角',
        (a + b) + '角',
        (a + b + 1) + '角',
        (a + b + 2) + '角'
      ]);
    } else if (kind === 4) {
      var price = randInt(2, 8);
      prompt = '付 1 元买 ' + price + ' 角的东西，找回多少？';
      answer = (10 - price) + '角';
      options = makeStrOptions(answer, [
        (10 - price - 1) + '角',
        (10 - price) + '角',
        (10 - price + 1) + '角',
        price + '角'
      ]);
    } else {
      var y = randInt(1, 3);
      var j = randInt(1, 8);
      var pay = y * 10 + j;
      var cost = randInt(1, pay - 1);
      prompt = '付 ' + y + ' 元 ' + j + ' 角买 ' + cost + ' 角的东西，找回多少？';
      answer = (pay - cost) + '角';
      options = makeStrOptions(answer, [
        (pay - cost - 1) + '角',
        (pay - cost) + '角',
        (pay - cost + 1) + '角',
        cost + '角'
      ]);
    }

    return { topic: 'money', prompt: prompt, answer: answer, options: options };
  }

  function generateQuestion(topicId) {
    if (topicId === 'money') return generateMoneyQuestion();
    return generateClockQuestion();
  }

  function generateQuestions(topicId, count) {
    count = count || PRACTICE_TOTAL;
    var list = [];
    var i;
    for (i = 0; i < count; i++) {
      list.push(generateQuestion(topicId));
    }
    return list;
  }

  function getKnowledge(topicId) {
    return KNOWLEDGE[topicId] || KNOWLEDGE.clock;
  }

  function getTopic(id) {
    for (var i = 0; i < TOPICS.length; i++) {
      if (TOPICS[i].id === id) return TOPICS[i];
    }
    return TOPICS[0];
  }

  return {
    PRACTICE_TOTAL: PRACTICE_TOTAL,
    TOPICS: TOPICS,
    KNOWLEDGE: KNOWLEDGE,
    getKnowledge: getKnowledge,
    getTopic: getTopic,
    generateQuestions: generateQuestions
  };
})();


