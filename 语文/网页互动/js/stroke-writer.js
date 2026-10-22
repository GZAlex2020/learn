/**
 * 汉字笔顺动画（Hanzi Writer + 本地笔顺 JSON）
 */
window.StrokeHelper = (function () {
  'use strict';

  var writers = {};

  function hasWriter() {
    return typeof window.HanziWriter !== 'undefined';
  }

  function loadCharData(ch, onComplete, onError) {
    var url = 'data/strokes/' + encodeURIComponent(ch) + '.json';
    fetch(url).then(function (res) {
      if (!res.ok) throw new Error('missing');
      return res.json();
    }).then(onComplete).catch(function () {
      if (onError) onError('无笔顺数据');
    });
  }

  function show(char, containerId, autoplay) {
    if (autoplay === undefined) autoplay = true;
    var el = document.getElementById(containerId);
    if (!el || !char) return false;
    if (!hasWriter()) {
      el.innerHTML = '<p class="stroke-fallback">笔顺加载中…</p>';
      return false;
    }

    el.innerHTML = '';
    if (writers[containerId]) {
      try { writers[containerId].hideCharacter(); } catch (e) { /* ignore */ }
      writers[containerId] = null;
    }

    var size = Math.min(el.clientWidth || 140, 160);
    writers[containerId] = HanziWriter.create(el, char, {
      width: size,
      height: size,
      padding: 8,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 220,
      showOutline: true,
      charDataLoader: loadCharData
    });

    if (autoplay) {
      writers[containerId].animateCharacter();
    } else {
      writers[containerId].showCharacter();
    }
    return true;
  }

  function replay(containerId) {
    var w = writers[containerId];
    if (w) w.animateCharacter();
  }

  function reset(containerId) {
    if (writers[containerId]) {
      try { writers[containerId].hideCharacter(); } catch (e) { /* ignore */ }
      writers[containerId] = null;
    }
    var el = document.getElementById(containerId);
    if (el) el.innerHTML = '';
  }

  return {
    show: show,
    replay: replay,
    reset: reset,
    hasWriter: hasWriter
  };
})();
