/**
 * 数学模块语音 - 本地 MP3 朗读，失败时备用 TTS
 */
window.SpeechHelper = (function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var zhVoice = null;
  var currentAudio = null;
  var useLocalAudio = true;

  var VOICE_PRIORITY = [
    'Microsoft Xiaoxiao', 'Microsoft Yaoyao', 'Microsoft Huihui',
    'Xiaoxiao', 'Yaoyao', 'Huihui', 'Ting-Ting', 'Sin-Ji', 'Meijia'
  ];

  function textKey(text) {
    var parts = [];
    for (var i = 0; i < text.length; i++) {
      parts.push(text.charCodeAt(i).toString(16));
    }
    return parts.join('_');
  }

  function pickVoice() {
    if (!synth) return;
    var voices = synth.getVoices();
    if (!voices.length) return;
    var i, j, v;
    for (j = 0; j < VOICE_PRIORITY.length; j++) {
      for (i = 0; i < voices.length; i++) {
        v = voices[i];
        if (v.lang.indexOf('zh') === 0 && v.name.indexOf(VOICE_PRIORITY[j]) !== -1) {
          zhVoice = v;
          return;
        }
      }
    }
    for (i = 0; i < voices.length; i++) {
      if (voices[i].lang.indexOf('zh') === 0) {
        zhVoice = voices[i];
        return;
      }
    }
  }

  if (synth && typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = pickVoice;
  }
  pickVoice();

  function stop() {
    try {
      if (synth && synth.speaking) synth.cancel();
    } catch (e) { /* ignore */ }
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e2) { /* ignore */ }
      currentAudio = null;
    }
    if (typeof window.stopLocalMp3 === 'function') {
      window.stopLocalMp3();
    }
  }

  function isPlaying() {
    try {
      if (synth && synth.speaking) return true;
    } catch (e) { /* ignore */ }
    if (currentAudio && !currentAudio.paused && !currentAudio.ended) return true;
    if (typeof window.isLocalMp3Playing === 'function' && window.isLocalMp3Playing()) {
      return true;
    }
    return false;
  }

  function speakTTS(text, rate) {
    if (!text || !synth) return;
    stop();
    pickVoice();
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'zh-CN';
    u.rate = rate || 0.85;
    if (zhVoice) u.voice = zhVoice;
    synth.speak(u);
  }

  function speakQuestion(text) {
    if (!text) return;
    if (!useLocalAudio) {
      speakTTS(text, 0.85);
      return;
    }
    stop();
    var rel = 'audio/phrases/' + textKey(text) + '.mp3';
    var done = false;
    function fail() {
      if (!done) {
        done = true;
        speakTTS(text, 0.85);
      }
    }
    var player = window.playLocalMp3;
    if (typeof player === 'function') {
      player(rel, {
        onEnd: function () { currentAudio = null; },
        onFail: fail
      });
      return;
    }
    var audio = new Audio(rel);
    audio.addEventListener('ended', function () { currentAudio = null; });
    audio.addEventListener('error', fail);
    currentAudio = audio;
    audio.play().catch(fail);
  }

  return {
    speak: speakTTS,
    speakQuestion: speakQuestion,
    stop: stop,
    isPlaying: isPlaying,
    isSupported: function () { return useLocalAudio || !!synth; },
    hasLocalAudio: function () { return useLocalAudio; },
    ensureReady: function (cb) {
      pickVoice();
      setTimeout(function () {
        pickVoice();
        cb(useLocalAudio || !!synth);
      }, 300);
    }
  };
})();
