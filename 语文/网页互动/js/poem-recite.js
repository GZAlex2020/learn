/**
 * 古诗词背诵 · 语音识别与评分
 */
window.PoemRecite = (function () {
  'use strict';

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var recognition = null;
  var listening = false;
  var transcript = '';
  var onPartialCb = null;
  var onErrorCb = null;

  function normalize(text) {
    return String(text || '')
      .replace(/[，。、；：？！""''\s,.\-—…·《》【】（）()\[\]：；！？「」『』""''\u3000]/g, '');
  }

  /** 按顺序匹配期望文本，估算背诵正确率 */
  function score(expected, spoken) {
    var exp = normalize(expected);
    var spk = normalize(spoken);
    if (!exp.length) {
      return { percent: 0, matched: 0, total: 0, level: 'none', message: '暂无参考文本' };
    }
    if (!spk.length) {
      return {
        percent: 0,
        matched: 0,
        total: exp.length,
        level: 'none',
        message: '没有听到背诵内容，请靠近麦克风再试'
      };
    }

    var matched = 0;
    var j = 0;
    var i;
    for (i = 0; i < exp.length; i++) {
      var found = spk.indexOf(exp.charAt(i), j);
      if (found === -1) continue;
      if (found - j > 3) continue;
      matched++;
      j = found + 1;
    }

    var percent = Math.round((matched / exp.length) * 100);
    var level = 'low';
    var message = '还需要多练习，先点「听整首」熟悉一下';
    if (percent >= 92) {
      level = 'great';
      message = '太棒了！背得又准又流利！';
    } else if (percent >= 75) {
      level = 'good';
      message = '很不错！再练几遍就能满分啦';
    } else if (percent >= 55) {
      level = 'ok';
      message = '已经有进步，注意漏掉的字句';
    } else if (percent >= 30) {
      level = 'low';
      message = '继续加油，跟着「听整首」多念几遍';
    }

    return {
      percent: percent,
      matched: matched,
      total: exp.length,
      level: level,
      message: message
    };
  }

  function isSupported() {
    return !!SpeechRecognition;
  }

  function ensureRecognition() {
    if (!SpeechRecognition) return null;
    if (recognition) return recognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      var chunk = '';
      var i;
      for (i = event.resultIndex; i < event.results.length; i++) {
        chunk += event.results[i][0].transcript;
      }
      if (chunk) {
        transcript += chunk;
        if (onPartialCb) onPartialCb(transcript, chunk);
      }
    };

    recognition.onerror = function (event) {
      var msg = '语音识别出错';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        msg = '请允许使用麦克风后再背诵';
      } else if (event.error === 'no-speech') {
        msg = '没有听到声音，请大声背诵';
      } else if (event.error === 'network') {
        msg = '网络不可用，语音识别需要联网';
      }
      if (onErrorCb) onErrorCb(msg, event.error);
    };

    recognition.onend = function () {
      if (listening) {
        try { recognition.start(); } catch (e) { listening = false; }
      }
    };

    return recognition;
  }

  function start(callbacks) {
    callbacks = callbacks || {};
    onPartialCb = callbacks.onPartial || null;
    onErrorCb = callbacks.onError || null;
    transcript = '';
    var rec = ensureRecognition();
    if (!rec) {
      if (onErrorCb) {
        onErrorCb('当前设备不支持语音识别，请用 Chrome 浏览器或更新 App', 'unsupported');
      }
      return false;
    }
    listening = true;
    try {
      rec.start();
      return true;
    } catch (e) {
      listening = false;
      if (onErrorCb) onErrorCb('无法启动麦克风，请检查权限', 'start-failed');
      return false;
    }
  }

  function stop() {
    listening = false;
    if (recognition) {
      try { recognition.stop(); } catch (e) { /* ignore */ }
    }
    return transcript;
  }

  function reset() {
    stop();
    transcript = '';
  }

  function isListening() {
    return listening;
  }

  return {
    normalize: normalize,
    score: score,
    isSupported: isSupported,
    start: start,
    stop: stop,
    reset: reset,
    isListening: isListening,
    getTranscript: function () { return transcript; }
  };
})();
