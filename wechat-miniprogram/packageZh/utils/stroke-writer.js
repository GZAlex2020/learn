/**
 * 汉字笔顺动画（Hanzi Writer + 本地笔顺 JSON）· 微信小程序 canvas 2d
 */
var g = typeof global !== 'undefined' ? global : {};
if (!g.performance) g.performance = { now: function () { return Date.now(); } };
if (!g.document) {
  g.document = {
    addEventListener: function () {},
    removeEventListener: function () {}
  };
}

var HanziWriter = require('../lib/hanzi-writer.min.js');

var STROKE_BASE = '/packageZh/data/strokes/';
var CANVAS_ID = '#lessonStrokeCanvas';
var SIZE = 140;
var writer = null;
var fs = wx.getFileSystemManager();

function loadCharData(ch, onComplete, onError) {
  fs.readFile({
    filePath: STROKE_BASE + ch + '.json',
    encoding: 'utf8',
    success: function (res) {
      try {
        onComplete(JSON.parse(res.data));
      } catch (e) {
        if (onError) onError(e);
      }
    },
    fail: function (err) {
      if (onError) onError(err);
    }
  });
}

function patchCanvasNode(canvas, width, height) {
  if (!canvas.getBoundingClientRect) {
    canvas.getBoundingClientRect = function () {
      return { width: width, height: height, left: 0, top: 0, right: width, bottom: height };
    };
  }
  if (!canvas.setAttribute) {
    canvas.setAttribute = function (key, val) {
      if (key === 'width') canvas.width = parseInt(val, 10);
      if (key === 'height') canvas.height = parseInt(val, 10);
    };
  }
}

function destroyWriter() {
  if (!writer) return;
  try {
    writer.cancelQuiz();
    if (writer._hanziWriterRenderer && writer._hanziWriterRenderer.destroy) {
      writer._hanziWriterRenderer.destroy();
    }
  } catch (e) { /* ignore */ }
  writer = null;
}

function createWriter(canvas, char, autoplay) {
  destroyWriter();
  var size = SIZE;
  writer = HanziWriter.create(canvas, char, {
    width: size,
    height: size,
    padding: 8,
    renderer: 'canvas',
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 220,
    showOutline: true,
    charDataLoader: loadCharData,
    onLoadCharDataError: function () {
      wx.showToast({ title: '暂无笔顺数据', icon: 'none' });
    }
  });
  if (autoplay) writer.animateCharacter();
  else writer.showCharacter();
}

function show(page, char, autoplay) {
  if (autoplay === undefined) autoplay = true;
  if (!page || !char) return;
  destroyWriter();
  var query = page.createSelectorQuery();
  query.select(CANVAS_ID)
    .fields({ node: true, size: true })
    .exec(function (res) {
      if (!res || !res[0] || !res[0].node) return;
      var canvas = res[0].node;
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      var dpr = wx.getSystemInfoSync().pixelRatio || 1;
      var width = res[0].width || SIZE;
      var height = res[0].height || SIZE;
      patchCanvasNode(canvas, width, height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      createWriter(canvas, char, autoplay);
    });
}

function replay() {
  if (writer) {
    writer.animateCharacter();
    return;
  }
  wx.showToast({ title: '笔顺加载中', icon: 'none' });
}

function reset() {
  destroyWriter();
}

module.exports = {
  show: show,
  replay: replay,
  reset: reset
};
