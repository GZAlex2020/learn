/**
 * 英语模块语音 · 优先英文 TTS
 */
window.SpeechHelper = (function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var enVoice = null;
  var currentAudio = null;

  function pickVoice() {
    if (!synth) return;
    var voices = synth.getVoices();
    if (!voices.length) return;
    var prefer = ['Google US English', 'Microsoft Aria', 'Microsoft Zira', 'Samantha', 'Alex'];
    var i, j, v;
    for (j = 0; j < prefer.length; j++) {
      for (i = 0; i < voices.length; i++) {
        v = voices[i];
        if ((v.lang || '').indexOf('en') === 0 && v.name.indexOf(prefer[j]) !== -1) {
          enVoice = v;
          return;
        }
      }
    }
    for (i = 0; i < voices.length; i++) {
      if ((voices[i].lang || '').indexOf('en') === 0) {
        enVoice = voices[i];
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
  }

  function speak(text, rate) {
    if (!text || !synth) return;
    stop();
    pickVoice();
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'en-US';
    u.rate = rate || 0.9;
    if (enVoice) u.voice = enVoice;
    synth.speak(u);
  }

  return {
    speak: speak,
    speakQuestion: speak,
    stop: stop,
    isPlaying: function () {
      try { return !!(synth && synth.speaking); } catch (e) { return false; }
    },
    isSupported: function () { return !!synth; },
    ensureReady: function (cb) {
      pickVoice();
      setTimeout(function () {
        pickVoice();
        cb(!!synth);
      }, 300);
    }
  };
})();

window.Speech = window.SpeechHelper;
