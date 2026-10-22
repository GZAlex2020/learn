/**
 * 数学口算与概念数据（与网页版 math.js MATH_DATA 一致）
 */
var CN_NUM = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

var ENCOURAGEMENTS = ['真棒！', '算对了！', '太厉害了！', '继续加油！', '好聪明！'];

var CALC_MODES = [
  { id: 'add10', label: '10以内加减', hint: '得数不超过 10' },
  { id: 'add20', label: '20以内加减', hint: '一年级常用' },
  { id: 'add100', label: '100以内加减', hint: '整十、两位数' },
  { id: 'add1000', label: '三位数加减', hint: '100～999' },
  { id: 'multiply', label: '表内乘法', hint: '九九乘法表' },
  { id: 'divide', label: '表内除法', hint: '能整除' }
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeOptions(answer) {
  var spread = answer > 999 ? 30 : (answer > 99 ? 15 : 4);
  var opts = [answer];
  var tries = 0;
  while (opts.length < 4 && tries < 50) {
    tries++;
    var d = answer + randInt(-spread, spread);
    if (d < 0) d = randInt(0, Math.max(answer + spread, 10));
    if (opts.indexOf(d) === -1) opts.push(d);
  }
  while (opts.length < 4) opts.push(answer + opts.length);
  return opts;
}

function generateCalcQuestion(mode) {
  var r = randInt;
  var expr, answer;

  if (mode === 'add10') {
    if (Math.random() < 0.5) {
      var b = r(1, 9), a = r(1, 10 - b);
      expr = a + ' + ' + b;
      answer = a + b;
    } else {
      var m = r(1, 10), n = r(0, m);
      expr = m + ' - ' + n;
      answer = m - n;
    }
  } else if (mode === 'add20') {
    if (Math.random() < 0.5) {
      var b2 = r(1, 9), a2 = r(1, 20 - b2);
      expr = a2 + ' + ' + b2;
      answer = a2 + b2;
    } else {
      var m2 = r(1, 20), n2 = r(0, m2);
      expr = m2 + ' - ' + n2;
      answer = m2 - n2;
    }
  } else if (mode === 'add100') {
    var kind = r(1, 4);
    if (kind === 1) {
      var t1 = r(1, 9) * 10, t2 = r(1, 9) * 10;
      expr = t1 + ' + ' + t2;
      answer = t1 + t2;
    } else if (kind === 2) {
      var t3 = r(2, 9) * 10;
      var t4 = r(1, t3 / 10 - 1) * 10;
      expr = t3 + ' - ' + t4;
      answer = t3 - t4;
    } else if (kind === 3) {
      var a3 = r(10, 99), b3 = r(1, 9);
      if (Math.random() < 0.5) {
        expr = a3 + ' + ' + b3;
        answer = a3 + b3;
      } else if (a3 > b3) {
        expr = a3 + ' - ' + b3;
        answer = a3 - b3;
      } else {
        expr = b3 + ' - ' + a3;
        answer = b3 - a3;
      }
    } else {
      var a4 = r(1, 50), b4 = r(1, 50);
      expr = a4 + ' + ' + b4;
      answer = a4 + b4;
    }
  } else if (mode === 'add1000') {
    var kind5 = r(1, 3);
    if (kind5 === 1) {
      var a5 = r(100, 899), b5 = r(100, 999 - a5);
      expr = a5 + ' + ' + b5;
      answer = a5 + b5;
    } else if (kind5 === 2) {
      var m5 = r(200, 999), n5 = r(100, m5 - 1);
      expr = m5 + ' - ' + n5;
      answer = m5 - n5;
    } else {
      var a6 = r(100, 999), b6 = r(10, 99);
      if (Math.random() < 0.5) {
        expr = a6 + ' + ' + b6;
        answer = a6 + b6;
      } else if (a6 > b6) {
        expr = a6 + ' - ' + b6;
        answer = a6 - b6;
      } else {
        expr = b6 + ' - ' + a6;
        answer = b6 - a6;
      }
    }
  } else if (mode === 'multiply') {
    var x = r(1, 9), y = r(1, 9);
    expr = x + ' × ' + y;
    answer = x * y;
  } else if (mode === 'divide') {
    var d1 = r(1, 9), d2 = r(1, 9);
    var prod = d1 * d2;
    if (Math.random() < 0.5) {
      expr = prod + ' ÷ ' + d1;
      answer = d2;
    } else {
      expr = prod + ' ÷ ' + d2;
      answer = d1;
    }
  } else {
    return generateCalcQuestion('add10');
  }

  return { expr: expr, answer: answer, options: makeOptions(answer) };
}

function generateCalcQuestions(mode, count) {
  var list = [];
  for (var i = 0; i < count; i++) {
    list.push(generateCalcQuestion(mode));
  }
  return list;
}

function getCalcModeLabel(modeId) {
  var m = CALC_MODES.find(function (x) { return x.id === modeId; });
  return m ? m.label : modeId;
}

var CONCEPTS = [
  { symbol: '>', name: '大于', example: '5 > 3', emoji: '⬆️' },
  { symbol: '<', name: '小于', example: '2 < 7', emoji: '⬇️' },
  { symbol: '=', name: '等于', example: '4 = 4', emoji: '⚖️' },
  { symbol: '+', name: '加法', example: '3 + 2 = 5', emoji: '➕' },
  { symbol: '-', name: '减法', example: '5 - 2 = 3', emoji: '➖' },
  { symbol: '□', name: '正方形', example: '4 条边相等', emoji: '🟦' },
  { symbol: '○', name: '圆形', example: '可以滚动', emoji: '⭕' },
  { symbol: '△', name: '三角形', example: '3 个角', emoji: '🔺' },
  { symbol: '十位', name: '十位', example: '35 的 3 是 3 个十', emoji: '🔟' },
  { symbol: '个位', name: '个位', example: '35 的 5 是 5 个一', emoji: '1️⃣' },
  { symbol: '凑十', name: '凑十法', example: '9+5=9+1+4', emoji: '🧮' },
  { symbol: '破十', name: '破十法', example: '13-5=10-5+3', emoji: '🔨' },
  { symbol: '1元', name: '1 元', example: '1 元 = 10 角', emoji: '💰' },
  { symbol: '整点', name: '整点', example: '3:00 分针指 12', emoji: '🕐' },
  { symbol: '一共', name: '一共', example: '加起来总共', emoji: '📦' },
  { symbol: '还剩', name: '还剩', example: '剩下几个', emoji: '📤' },
  { symbol: '比…多', name: '比…多', example: '大数减小数', emoji: '📊' },
  { symbol: '相差', name: '相差', example: '差多少', emoji: '↔️' },
  { symbol: '列式', name: '列式', example: '写出算式', emoji: '✏️' },
  { symbol: '2 4 6 8 ?', name: '找规律', example: '每次加 2，下一个是 10', emoji: '🔢' }
];

var KEYWORDS = [
  { word: '一共', meaning: '加起来，总共多少', formula: '用加法' },
  { word: '合计', meaning: '全部加在一起', formula: '用加法' },
  { word: '总共', meaning: '全部的数量', formula: '用加法' },
  { word: '还剩', meaning: '去掉后剩下几个', formula: '用减法' },
  { word: '剩余', meaning: '还有几个', formula: '用减法' },
  { word: '找回', meaning: '付钱减价钱', formula: '用减法' },
  { word: '比…多', meaning: '多几个', formula: '大数减小数' },
  { word: '比…少', meaning: '少几个', formula: '大数减小数' },
  { word: '相差', meaning: '两个差多少', formula: '大数减小数' },
  { word: '列式', meaning: '写出算式', formula: '先列式再计算' },
  { word: '计算', meaning: '算出得数', formula: '口算或笔算' },
  { word: '选择', meaning: '选一个对的', formula: '看仔细再选' },
  { word: '填空', meaning: '把空填上', formula: '想括号里缺什么' },
  { word: '看图', meaning: '先看图画', formula: '数清楚再列式' },
  { word: '找规律', meaning: '找下一个数', formula: '看每次变化' }
];

function productToCn(n) {
  if (n < 10) return CN_NUM[n];
  if (n === 10) return '十';
  if (n < 20) return '十' + CN_NUM[n - 10];
  var tens = Math.floor(n / 10);
  var ones = n % 10;
  if (ones === 0) return CN_NUM[tens] + '十';
  return CN_NUM[tens] + '十' + CN_NUM[ones];
}

function buildMultRhyme(a, b) {
  var p = a * b;
  if (p < 10) return CN_NUM[a] + CN_NUM[b] + '得' + CN_NUM[p];
  return CN_NUM[a] + CN_NUM[b] + productToCn(p);
}

function buildMultTable() {
  var list = [];
  for (var a = 1; a <= 9; a++) {
    for (var b = 1; b <= 9; b++) {
      list.push({
        a: a,
        b: b,
        product: a * b,
        rhyme: buildMultRhyme(b, a),
        speak: buildMultRhyme(b, a)
      });
    }
  }
  return list;
}

function getMultRow(row) {
  return MULT_TABLE.filter(function (item) { return item.a === row && item.b <= row; });
}

function getMultTriangleList() {
  return MULT_TABLE.filter(function (item) { return item.b <= item.a; });
}

var MULT_TABLE = buildMultTable();

module.exports = {
  ENCOURAGEMENTS: ENCOURAGEMENTS,
  CALC_MODES: CALC_MODES,
  CONCEPTS: CONCEPTS,
  KEYWORDS: KEYWORDS,
  CN_NUM: CN_NUM,
  MULT_TABLE: MULT_TABLE,
  ROW_CN: CN_NUM,
  randInt: randInt,
  makeOptions: makeOptions,
  generateCalcQuestion: generateCalcQuestion,
  generateCalcQuestions: generateCalcQuestions,
  getCalcModeLabel: getCalcModeLabel,
  productToCn: productToCn,
  buildMultRhyme: buildMultRhyme,
  buildMultTable: buildMultTable,
  getMultRow: getMultRow,
  getMultTriangleList: getMultTriangleList
};
