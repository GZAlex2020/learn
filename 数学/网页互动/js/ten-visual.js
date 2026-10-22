/**
 * 凑十 / 破十 / 平十 / 借十 · 图解渲染
 */
window.TenVisual = (function () {
  'use strict';

  function parseExpr(expr) {
    var m = String(expr || '').match(/(\d+)\s*([+＋−\-])\s*(\d+)/);
    if (!m) return null;
    var op = m[2];
    if (op === '＋') op = '+';
    if (op === '−') op = '-';
    return { a: parseInt(m[1], 10), b: parseInt(m[3], 10), op: op };
  }

  function buildMake10(parsed, answer) {
    var big = Math.max(parsed.a, parsed.b);
    var small = Math.min(parsed.a, parsed.b);
    var p1 = 10 - big;
    var p2 = small - p1;
    return {
      type: 'make10',
      left: big,
      right: small,
      op: '+',
      answer: parseInt(answer, 10),
      split: [p1, p2],
      step1: { a: big, op: '+', b: p1, result: 10 },
      step2: { a: 10, op: '+', b: p2, result: parseInt(answer, 10) }
    };
  }

  function buildBreak10(parsed, answer) {
    var left = parsed.a;
    var right = parsed.b;
    var ones = left - 10;
    var mid = 10 - right;
    return {
      type: 'break10',
      left: left,
      right: right,
      op: '-',
      answer: parseInt(answer, 10),
      splitWhole: [10, ones],
      step1: { a: 10, op: '-', b: right, result: mid },
      step2: { a: ones, op: '+', b: mid, result: parseInt(answer, 10) }
    };
  }

  function buildFlat10(parsed, answer) {
    var left = parsed.a;
    var right = parsed.b;
    var p1 = left % 10;
    var p2 = right - p1;
    return {
      type: 'flat10',
      left: left,
      right: right,
      op: '-',
      answer: parseInt(answer, 10),
      split: [p1, p2],
      step1: { a: left, op: '-', b: p1, result: 10 },
      step2: { a: 10, op: '-', b: p2, result: parseInt(answer, 10) }
    };
  }

  function buildBorrow10(parsed, answer) {
    var left = parsed.a;
    var right = parsed.b;
    var ans = parseInt(answer, 10);
    if (left < 20) {
      var v = buildBreak10(parsed, answer);
      v.type = 'borrow10';
      v.note = '借十';
      return v;
    }
    var ones = left % 10;
    var tens = Math.floor(left / 10);
    var newOnes = ones + 10;
    var newTens = tens - 1;
    var mid = newOnes - right;
    return {
      type: 'borrow10',
      subtype: 'big',
      left: left,
      right: right,
      op: '-',
      answer: ans,
      ones: ones,
      tens: tens,
      newOnes: newOnes,
      newTens: newTens,
      step1: { a: newOnes, op: '-', b: right, result: mid },
      step2: { a: newTens, op: '×10+', b: mid, result: ans }
    };
  }

  function buildFromExample(example, methodId) {
    if (example.visual) return example.visual;
    var parsed = parseExpr(example.expr);
    if (!parsed) return null;
    if (methodId === 'make10') return buildMake10(parsed, example.answer);
    if (methodId === 'break10') return buildBreak10(parsed, example.answer);
    if (methodId === 'flat10') return buildFlat10(parsed, example.answer);
    if (methodId === 'borrow10') return buildBorrow10(parsed, example.answer);
    return null;
  }

  function opBox(op) {
    return '<span class="ten-d-opbox">' + op + '</span>';
  }

  function splitRow(num, parts) {
    return '<div class="ten-d-split">' +
      '<div class="ten-d-split-num">' + num + '</div>' +
      '<div class="ten-d-caret">∧</div>' +
      '<div class="ten-d-parts">' +
      '<span>' + parts[0] + '</span><span>' + parts[1] + '</span>' +
      '</div></div>';
  }

  function stepRow(a, op, b, result, highlight) {
    return '<div class="ten-d-step' + (highlight ? ' ten-d-step-hi' : '') + '">' +
      '<div class="ten-d-step-nums">' +
      '<span>' + a + '</span>' + opBox(op) + '<span>' + b + '</span>' +
      '</div>' +
      '<div class="ten-d-arrow">↓</div>' +
      '<div class="ten-d-result">' + result + '</div>' +
      '</div>';
  }

  function renderHtml(visual) {
    if (!visual) return '';
    var html = '<div class="ten-diagram ten-diagram-' + visual.type + '">';
    html += '<div class="ten-d-eq">' +
      visual.left + ' ' + (visual.op === '+' ? '+' : '−') + ' ' + visual.right +
      ' = <strong>' + visual.answer + '</strong></div>';

    if (visual.type === 'make10') {
      html += splitRow(visual.right, visual.split);
      html += '<div class="ten-d-flow">';
      html += stepRow(visual.step1.a, visual.step1.op, visual.step1.b, visual.step1.result, true);
      html += stepRow(visual.step2.a, visual.step2.op, visual.step2.b, visual.step2.result, false);
      html += '</div>';
    } else if (visual.type === 'break10' || (visual.type === 'borrow10' && !visual.subtype)) {
      html += '<div class="ten-d-split-whole">' +
        '<span class="ten-d-whole">' + visual.left + '</span>' +
        '<span class="ten-d-eq2">→</span>' +
        '<span class="ten-d-part">' + visual.splitWhole[0] + '</span>' +
        '<span class="ten-d-part">' + visual.splitWhole[1] + '</span>' +
        '</div>';
      html += '<div class="ten-d-flow ten-d-flow-sub">';
      html += stepRow(visual.step1.a, visual.step1.op, visual.step1.b, visual.step1.result, true);
      html += stepRow(visual.step2.a, visual.step2.op, visual.step2.b, visual.step2.result, false);
      html += '</div>';
    } else if (visual.type === 'flat10') {
      html += splitRow(visual.right, visual.split);
      html += '<div class="ten-d-flow">';
      html += stepRow(visual.step1.a, visual.step1.op, visual.step1.b, visual.step1.result, true);
      html += stepRow(visual.step2.a, visual.step2.op, visual.step2.b, visual.step2.result, false);
      html += '</div>';
    } else if (visual.type === 'borrow10' && visual.subtype === 'big') {
      html += '<div class="ten-d-borrow-note">个位 ' + visual.ones + ' 不够减，向十位借 1</div>';
      html += '<div class="ten-d-split-whole">' +
        '<span class="ten-d-whole">' + visual.left + '</span>' +
        '<span class="ten-d-eq2">→</span>' +
        '<span class="ten-d-part">' + visual.newTens + ' 个十</span>' +
        '<span class="ten-d-part">' + visual.newOnes + ' 个一</span>' +
        '</div>';
      html += '<div class="ten-d-flow ten-d-flow-sub">';
      html += stepRow(visual.step1.a, visual.step1.op, visual.step1.b, visual.step1.result, true);
      html += '<div class="ten-d-step ten-d-step-hi">' +
        '<div class="ten-d-step-nums"><span>' + visual.newTens + ' 个十</span>' +
        opBox('+') + '<span>' + visual.step1.result + '</span></div>' +
        '<div class="ten-d-arrow">↓</div>' +
        '<div class="ten-d-result">' + visual.answer + '</div></div>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function flattenForWx(visual) {
    if (!visual) return { type: 'none' };
    var opSign = visual.op === '+' ? '+' : '−';
    var base = {
      type: visual.type,
      subtype: visual.subtype || '',
      eq: visual.left + ' ' + opSign + ' ' + visual.right + ' = ' + visual.answer,
      s1a: visual.step1.a,
      s1op: visual.step1.op,
      s1b: visual.step1.b,
      s1r: visual.step1.result,
      s2a: visual.step2.a,
      s2op: visual.step2.op,
      s2b: visual.step2.b,
      s2r: visual.step2.result
    };
    if (visual.type === 'make10' || visual.type === 'flat10') {
      base.splitNum = visual.right;
      base.splitA = visual.split[0];
      base.splitB = visual.split[1];
      base.showSplit = true;
    }
    if (visual.type === 'break10' || (visual.type === 'borrow10' && !visual.subtype)) {
      base.whole = visual.left;
      base.part10 = visual.splitWhole[0];
      base.partOnes = visual.splitWhole[1];
      base.showWhole = true;
    }
    if (visual.type === 'borrow10' && visual.subtype === 'big') {
      base.borrowNote = '个位 ' + visual.ones + ' 不够减，向十位借 1';
      base.whole = visual.left;
      base.newTens = visual.newTens;
      base.newOnes = visual.newOnes;
      base.showBigBorrow = true;
      base.s2a = visual.newTens + ' 个十';
      base.s2op = '+';
      base.s2b = visual.step1.result;
      base.s2r = visual.answer;
    }
    return base;
  }

  return {
    parseExpr: parseExpr,
    buildFromExample: buildFromExample,
    renderHtml: renderHtml,
    flattenForWx: flattenForWx
  };
})();
