/**
 * 数学口算与概念数据
 */
window.MATH_DATA = {
  ENCOURAGEMENTS: ['真棒！', '算对了！', '太厉害了！', '继续加油！', '好聪明！'],

  /** 口算题型 */
  CALC_MODES: [
    { id: 'add10', label: '10以内加减', hint: '得数不超过 10' },
    { id: 'add20', label: '20以内加减', hint: '一年级常用' },
    { id: 'add100', label: '100以内加减', hint: '整十、两位数' },
    { id: 'add1000', label: '三位数加减', hint: '100～999' },
    { id: 'add10000', label: '万以内加减', hint: '三年级上' },
    { id: 'multiply', label: '表内乘法', hint: '九九乘法表' },
    { id: 'multBig', label: '多位数×一位数', hint: '三年级上' },
    { id: 'divide', label: '表内除法', hint: '能整除' },
    { id: 'divideRem', label: '有余数除法', hint: '三年级上' }
  ],

  randInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  makeOptions: function (answer) {
    var spread = answer > 999 ? 30 : (answer > 99 ? 15 : 4);
    var opts = [answer];
    var tries = 0;
    while (opts.length < 4 && tries < 50) {
      tries++;
      var d = answer + this.randInt(-spread, spread);
      if (d < 0) d = this.randInt(0, Math.max(answer + spread, 10));
      if (opts.indexOf(d) === -1) opts.push(d);
    }
    while (opts.length < 4) opts.push(answer + opts.length);
    return opts;
  },

  generateCalcQuestion: function (mode) {
    var r = this.randInt.bind(this);
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
    } else if (mode === 'add10000') {
      if (Math.random() < 0.5) {
        var a7 = r(1000, 8999), b7 = r(100, 9999 - a7);
        expr = a7 + ' + ' + b7;
        answer = a7 + b7;
      } else {
        var m7 = r(2000, 9999), n7 = r(100, m7 - 1);
        expr = m7 + ' - ' + n7;
        answer = m7 - n7;
      }
    } else if (mode === 'multiply') {
      var x = r(1, 9), y = r(1, 9);
      expr = x + ' × ' + y;
      answer = x * y;
    } else if (mode === 'multBig') {
      var mb = r(12, 498), mf = r(2, 9);
      expr = mb + ' × ' + mf;
      answer = mb * mf;
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
    } else if (mode === 'divideRem') {
      var dr = r(2, 9), dq = r(2, 12), rem = r(1, dr - 1);
      var dividend = dr * dq + rem;
      expr = dividend + ' ÷ ' + dr;
      answer = dq;
      return {
        expr: expr,
        answer: answer,
        options: this.makeOptions(answer),
        hint: '商是几？（余数 ' + rem + '）'
      };
    } else {
      return this.generateCalcQuestion('add10');
    }

    return { expr: expr, answer: answer, options: this.makeOptions(answer) };
  },

  generateCalcQuestions: function (mode, count) {
    var list = [];
    for (var i = 0; i < count; i++) {
      list.push(this.generateCalcQuestion(mode));
    }
    return list;
  },

  getCalcModeLabel: function (modeId) {
    var m = this.CALC_MODES.find(function (x) { return x.id === modeId; });
    return m ? m.label : modeId;
  },

  CALC_QUIZ: [
    { expr: '3 + 4', answer: 7, options: [5, 6, 7, 8] },
    { expr: '9 - 2', answer: 7, options: [6, 7, 8, 9] },
    { expr: '5 + 6', answer: 11, options: [10, 11, 12, 13] },
    { expr: '8 + 7', answer: 15, options: [13, 14, 15, 16] },
    { expr: '12 - 5', answer: 7, options: [5, 6, 7, 8] },
    { expr: '15 - 8', answer: 7, options: [6, 7, 8, 9] },
    { expr: '6 + 9', answer: 15, options: [14, 15, 16, 17] },
    { expr: '14 - 6', answer: 8, options: [6, 7, 8, 9] },
    { expr: '7 + 8', answer: 15, options: [13, 14, 15, 16] },
    { expr: '16 - 9', answer: 7, options: [6, 7, 8, 9] },
    { expr: '20 + 30', answer: 50, options: [40, 50, 60, 70] },
    { expr: '60 - 20', answer: 40, options: [30, 40, 50, 60] },
    { expr: '25 + 4', answer: 29, options: [27, 28, 29, 30] },
    { expr: '36 - 5', answer: 31, options: [29, 30, 31, 32] },
    { expr: '9 + 9', answer: 18, options: [16, 17, 18, 19] },
    { expr: '18 - 9', answer: 9, options: [7, 8, 9, 10] },
    { expr: '11 - 5', answer: 6, options: [4, 5, 6, 7] },
    { expr: '8 + 5', answer: 13, options: [11, 12, 13, 14] },
    { expr: '13 - 7', answer: 6, options: [4, 5, 6, 7] },
    { expr: '45 + 3', answer: 48, options: [46, 47, 48, 49] },
    { expr: '72 - 2', answer: 70, options: [68, 69, 70, 71] },
    { expr: '50 + 50', answer: 100, options: [90, 95, 100, 110] },
    { expr: '4 + 5', answer: 9, options: [7, 8, 9, 10] },
    { expr: '10 - 3', answer: 7, options: [5, 6, 7, 8] },
    { expr: '7 + 6', answer: 13, options: [11, 12, 13, 14] },
    { expr: '17 - 9', answer: 8, options: [6, 7, 8, 9] },
    { expr: '2 + 8', answer: 10, options: [8, 9, 10, 11] },
    { expr: '20 - 5', answer: 15, options: [13, 14, 15, 16] },
    { expr: '30 + 40', answer: 70, options: [60, 70, 80, 90] },
    { expr: '100 - 10', answer: 90, options: [80, 85, 90, 95] }
  ],

  CONCEPTS: [
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
  ],

  KEYWORDS: [
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
  ],

  CN_NUM: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'],

  productToCn: function (n) {
    var cn = this.CN_NUM;
    if (n < 10) return cn[n];
    if (n === 10) return '十';
    if (n < 20) return '十' + cn[n - 10];
    var tens = Math.floor(n / 10);
    var ones = n % 10;
    if (ones === 0) return cn[tens] + '十';
    return cn[tens] + '十' + cn[ones];
  },

  buildMultRhyme: function (a, b) {
    var cn = this.CN_NUM;
    var p = a * b;
    if (p < 10) return cn[a] + cn[b] + '得' + cn[p];
    return cn[a] + cn[b] + this.productToCn(p);
  },

  buildMultTable: function () {
    var list = [];
    for (var a = 1; a <= 9; a++) {
      for (var b = 1; b <= 9; b++) {
        list.push({
          a: a,
          b: b,
          product: a * b,
          rhyme: this.buildMultRhyme(b, a),
          speak: this.buildMultRhyme(b, a)
        });
      }
    }
    return list;
  },

  getMultRow: function (row) {
    return this.MULT_TABLE.filter(function (item) { return item.a === row && item.b <= row; });
  },

  getMultTriangleList: function () {
    return this.MULT_TABLE.filter(function (item) { return item.b <= item.a; });
  }
};

window.MATH_DATA.MULT_TABLE = window.MATH_DATA.buildMultTable();

window.QUESTION_DATA = {
  CALC_TOTAL: 10,
  CONCEPT_TOTAL: 8,
  READ_TOTAL: 5,
  READ_QUESTIONS: [
    {
      id: 1,
      text: '小明有 5 个苹果，小红有 4 个苹果，一共有几个苹果？',
      keyword: '一共',
      task: '要把 5 和 4 加起来',
      example: '5 + 4 = 9（个）'
    },
    {
      id: 2,
      text: '树上有 12 只鸟，飞走了 5 只，还剩几只？',
      keyword: '还剩',
      task: '从 12 里去掉 5',
      example: '12 - 5 = 7（只）'
    },
    {
      id: 3,
      text: '小刚有 9 本书，小丽有 6 本书，小刚比小丽多几本？',
      keyword: '比……多',
      task: '用减法，9 减 6',
      example: '9 - 6 = 3（本）'
    },
    {
      id: 4,
      text: '妈妈买了 20 元的水果，付了 50 元，应找回几元？',
      keyword: '找回',
      task: '50 减 20',
      example: '50 - 20 = 30（元）'
    },
    {
      id: 5,
      text: '请选择正确的算式：8 + 7 = ？',
      keyword: '选择',
      task: '我要选一个对的答案',
      example: '8 + 7 = 15'
    },
    {
      id: 6,
      text: '请填空：6 +（  ）= 10',
      keyword: '填空',
      task: '括号里填 4',
      example: '6 + 4 = 10'
    },
    {
      id: 7,
      text: '看图列式：左边 3 个圆，右边 2 个圆，一共几个？',
      keyword: '看图列式',
      task: '3 加 2',
      example: '3 + 2 = 5（个）'
    },
    {
      id: 8,
      text: '2，4，6，8，（  ）',
      keyword: '找规律',
      task: '每次加 2，下一个是 10',
      example: '10'
    }
  ]
};
