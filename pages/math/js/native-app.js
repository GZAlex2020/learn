/**
 * Android APK / Capacitor 环境适配
 */
(function () {
  'use strict';

  function isNative() {
    try {
      if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function') {
        return window.Capacitor.isNativePlatform();
      }
    } catch (e) { /* ignore */ }
    return location.protocol === 'https:' && location.hostname === 'localhost';
  }

  window.IS_NATIVE_APP = isNative();

  if ('serviceWorker' in navigator && window.IS_NATIVE_APP) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
  }

  var nativeAudio = null;
  var playGen = 0;

  window.stopLocalMp3 = function () {
    playGen++;
    if (nativeAudio) {
      try {
        nativeAudio.pause();
        nativeAudio.currentTime = 0;
      } catch (e) { /* ignore */ }
      if (nativeAudio._objectUrl) {
        try { URL.revokeObjectURL(nativeAudio._objectUrl); } catch (e2) { /* ignore */ }
      }
      nativeAudio = null;
    }
  };

  window.isLocalMp3Playing = function () {
    return !!(nativeAudio && !nativeAudio.paused && !nativeAudio.ended);
  };

  /** 通过 fetch 加载 MP3 再播放（Android WebView 更可靠） */
  window.playLocalMp3 = function (relativePath, opts) {
    opts = opts || {};
    window.stopLocalMp3();
    var gen = playGen;
    var url;
    try {
      url = new URL(relativePath, window.location.href).href;
    } catch (e) {
      url = relativePath;
    }
    var rate = opts.rate || 1;
    var onEnd = opts.onEnd || function () {};
    var onFail = opts.onFail || function () {};

    function bindAudio(audio, objectUrl) {
      if (gen !== playGen) {
        if (objectUrl) {
          try { URL.revokeObjectURL(objectUrl); } catch (e3) { /* ignore */ }
        }
        return null;
      }
      if (objectUrl) audio._objectUrl = objectUrl;
      nativeAudio = audio;
      audio.playbackRate = rate;
      audio.addEventListener('ended', function () {
        if (nativeAudio === audio) nativeAudio = null;
        if (objectUrl) {
          try { URL.revokeObjectURL(objectUrl); } catch (e4) { /* ignore */ }
        }
        onEnd();
      });
      audio.addEventListener('error', function () {
        if (nativeAudio === audio) nativeAudio = null;
        if (objectUrl) {
          try { URL.revokeObjectURL(objectUrl); } catch (e5) { /* ignore */ }
        }
        onFail();
      });
      return audio.play().catch(onFail);
    }

    function playBlob(blob) {
      if (gen !== playGen) return;
      var objectUrl = URL.createObjectURL(blob);
      var audio = new Audio(objectUrl);
      return bindAudio(audio, objectUrl);
    }

    return fetch(url).then(function (res) {
      if (gen !== playGen) return;
      if (!res.ok) throw new Error('mp3 fetch failed');
      return res.blob();
    }).then(function (blob) {
      if (gen !== playGen) return;
      if (!blob || blob.size < 200) throw new Error('empty mp3');
      return playBlob(blob);
    }).catch(function () {
      if (gen !== playGen) return;
      var audio = new Audio(url);
      return bindAudio(audio, null);
    });
  };
})();
