/**
 * 凑十法 · 破十法 · 平十法 · 借十法
 */
var METHODS = [
  {
    id: 'make10',
    name: '凑十法',
    icon: '➕',
    tag: '20以内加法',
    summary: '看大数，分小数，先凑成 10，再加上剩下的数。',
      rhyme: '拆小数，补大数 · 凑成十，加剩数',
    steps: [
      '找出两个加数里较大的数',
      '把较小的数分成两部分',
      '一部分与较大数凑成 10',
      '10 再加上另一部分'
    ],
    examples: [
      {
        expr: '9 + 5 = ?',
        answer: '14',
        speak: '9加5。把5分成1和4。9加1等于10，凑成十。10加4等于14。',
        steps: ['5 分成 1 和 4', '9 + 1 = 10　凑成十', '10 + 4 = 14']
      },
      {
        expr: '8 + 6 = ?',
        answer: '14',
        speak: '8加6。把6分成2和4。8加2等于10。10加4等于14。',
        steps: ['6 分成 2 和 4', '8 + 2 = 10　凑成十', '10 + 4 = 14']
      },
      {
        expr: '7 + 8 = ?',
        answer: '15',
        speak: '7加8。把7分成2和5。8加2等于10。10加5等于15。',
        steps: ['7 分成 2 和 5', '8 + 2 = 10　凑成十', '10 + 5 = 15']
      }
    ]
  },
  {
    id: 'break10',
    name: '破十法',
    icon: '➖',
    tag: '20以内减法',
    summary: '当被减数个位不够减时，把被减数分成 10 和几，先用 10 减，再加个位。',
    rhyme: '拆大数，分出十 · 小在左，十在右 · 减小数，加剩数',
    steps: [
      '把被减数分成 10 和个位数',
      '用 10 减去减数',
      '再把得数与个位数相加'
    ],
    examples: [
      {
        expr: '13 − 5 = ?',
        answer: '8',
        speak: '13减5。13分成10和3。10减5等于5。5加3等于8。',
        steps: ['13 分成 10 和 3', '10 − 5 = 5', '5 + 3 = 8']
      },
      {
        expr: '15 − 8 = ?',
        answer: '7',
        speak: '15减8。15分成10和5。10减8等于2。2加5等于7。',
        steps: ['15 分成 10 和 5', '10 − 8 = 2', '2 + 5 = 7']
      },
      {
        expr: '12 − 9 = ?',
        answer: '3',
        speak: '12减9。12分成10和2。10减9等于1。1加2等于3。',
        steps: ['12 分成 10 和 2', '10 − 9 = 1', '1 + 2 = 3']
      }
    ]
  },
  {
    id: 'flat10',
    name: '平十法',
    icon: '➖',
    tag: '20以内减法',
    summary: '把减数分成两部分，先减到个位是 0（平成十），再用 10 减剩下的数。',
    rhyme: '看大数，拆小数 · 连续相减，算得数',
    steps: [
      '看被减数个位是几',
      '把减数分成「凑成整十」和「剩下的」',
      '先减第一部分，得到 10',
      '10 再减第二部分'
    ],
    examples: [
      {
        expr: '15 − 7 = ?',
        answer: '8',
        speak: '15减7。7分成5和2。15减5等于10，平成十。10减2等于8。',
        steps: ['7 分成 5 和 2', '15 − 5 = 10　平成十', '10 − 2 = 8']
      },
      {
        expr: '14 − 6 = ?',
        answer: '8',
        speak: '14减6。6分成4和2。14减4等于10。10减2等于8。',
        steps: ['6 分成 4 和 2', '14 − 4 = 10　平成十', '10 − 2 = 8']
      },
      {
        expr: '16 − 9 = ?',
        answer: '7',
        speak: '16减9。9分成6和3。16减6等于10。10减3等于7。',
        steps: ['9 分成 6 和 3', '16 − 6 = 10　平成十', '10 − 3 = 7']
      }
    ]
  },
  {
    id: 'borrow10',
    name: '借十法',
    icon: '🔟',
    tag: '100以内减法',
    summary: '个位不够减时，从十位借 1 当 10，再计算。',
    rhyme: '拆大数，借出十 · 减小数，加剩数',
    steps: [
      '看个位能不能直接减',
      '不够减就从十位借 1',
      '借来的 1 当 10 个一',
      '先算个位，再算十位'
    ],
    examples: [
      {
        expr: '36 − 8 = ?',
        answer: '28',
        speak: '36减8。个位6不够减8，向十位借1。16减8等于8。十位剩2，得28。',
        steps: ['6 不够减 8，向十位借 1', '16 − 8 = 8', '十位 3−1=2，得 28']
      },
      {
        expr: '52 − 7 = ?',
        answer: '45',
        speak: '52减7。2不够减7，借1。12减7等于5。十位4，得45。',
        steps: ['2 不够减 7，向十位借 1', '12 − 7 = 5', '十位 5−1=4，得 45']
      },
      {
        expr: '70 − 6 = ?',
        answer: '64',
        speak: '70减6。0不够减6，借1。10减6等于4。十位6，得64。',
        steps: ['0 不够减 6，向十位借 1', '10 − 6 = 4', '十位 7−1=6，得 64']
      }
    ]
  }
];

var mathData = require('./math-data.js');

var TEN_PRACTICE_TOTAL = 5;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTenQuestion(methodId) {
  var r = randInt;
  var expr, answer, left, ones, sub, a, b, tens;

  if (methodId === 'make10') {
    do {
      a = r(2, 9);
      b = r(2, 9);
      answer = a + b;
    } while (answer < 11 || answer > 18);
    expr = a + ' + ' + b;
  } else if (methodId === 'break10' || methodId === 'flat10') {
    do {
      left = r(11, 18);
      ones = left % 10;
      if (ones === 0) continue;
      sub = r(ones + 1, 9);
      answer = left - sub;
    } while (answer < 0);
    expr = left + ' − ' + sub;
  } else {
    if (Math.random() < 0.45) {
      do {
        left = r(11, 18);
        ones = left % 10;
        if (ones === 0) continue;
        sub = r(ones + 1, 9);
        answer = left - sub;
      } while (answer < 0);
    } else {
      do {
        tens = r(2, 9);
        ones = r(0, 8);
        sub = r(ones + 1, 9);
        left = tens * 10 + ones;
        answer = left - sub;
      } while (answer < 0);
    }
    expr = left + ' − ' + sub;
  }

  return {
    expr: expr,
    answer: answer,
    options: mathData.makeOptions(answer)
  };
}

function generateQuestions(methodId, count) {
  count = count || TEN_PRACTICE_TOTAL;
  var list = [];
  var i;
  for (i = 0; i < count; i++) {
    list.push(generateTenQuestion(methodId));
  }
  return list;
}

function getMethod(id) {
  for (var i = 0; i < METHODS.length; i++) {
    if (METHODS[i].id === id) return METHODS[i];
  }
  return METHODS[0];
}

module.exports = {
  METHODS: METHODS,
  TEN_PRACTICE_TOTAL: TEN_PRACTICE_TOTAL,
  generateQuestions: generateQuestions,
  getMethod: getMethod
};
