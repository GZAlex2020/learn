/**
 * 语音朗读 - 优先播放本地标准 MP3，备用浏览器语音
 */
window.SpeechHelper = (function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var zhVoice = null;
  var currentAudio = null;
  var useLocalAudio = true;
  var PINYIN_PLAYBACK_RATE = 1.35;
  var PINYIN_TTS_RATE = 1.0;

  var VOICE_PRIORITY = [
    'Microsoft Xiaoxiao', 'Microsoft Yaoyao', 'Microsoft Huihui',
    'Microsoft Kangkang', 'Xiaoxiao', 'Yaoyao', 'Huihui',
    'Ting-Ting', 'Sin-Ji', 'Meijia'
  ];

  function textKey(text) {
    var parts = [];
    for (var i = 0; i < text.length; i++) {
      parts.push(text.charCodeAt(i).toString(16));
    }
    return parts.join('_');
  }

  function audioPath(type, text) {
    return 'audio/' + type + '/' + textKey(text) + '.mp3';
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
      if (voices[i].lang === 'zh-CN') { zhVoice = voices[i]; return; }
    }
    for (i = 0; i < voices.length; i++) {
      if (voices[i].lang.indexOf('zh') === 0) { zhVoice = voices[i]; return; }
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

  function speakTTS(text, rate, onEnd) {
    if (!text || !synth) {
      if (onEnd) onEnd();
      return;
    }
    stop();
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'zh-CN';
    u.rate = rate || 0.75;
    u.pitch = 1;
    if (zhVoice) u.voice = zhVoice;
    if (onEnd) {
      u.onend = function () { onEnd(); };
      u.onerror = function () { onEnd(); };
    }
    synth.speak(u);
  }

  function playMp3(relativePath, fallback, rate, onSuccess) {
    if (!useLocalAudio) {
      fallback(function () {
        if (onSuccess) onSuccess();
      });
      return;
    }
    stop();
    var done = false;
    function finish() {
      if (!done) {
        done = true;
        if (onSuccess) onSuccess();
      }
    }
    function fail() {
      if (!done) {
        done = true;
        fallback(finish);
      }
    }
    var player = window.playLocalMp3;
    if (typeof player === 'function') {
      player(relativePath, {
        rate: rate || 1,
        onEnd: function () {
          currentAudio = null;
          finish();
        },
        onFail: fail
      });
      return;
    }
    var audio = new Audio(relativePath);
    audio.playbackRate = rate || 1;
    audio.addEventListener('ended', function () {
      currentAudio = null;
      finish();
    });
    audio.addEventListener('error', fail);
    currentAudio = audio;
    audio.play().catch(fail);
  }

  function playLocal(type, text, fallback) {
    if (!text) {
      fallback();
      return;
    }
    playMp3(audioPath(type, text), function (done) {
      fallback();
      if (typeof done === 'function') done();
    }, 1);
  }

  function pinyinToSlug(pinyin) {
    return 'py_' + String(pinyin).replace(/ü/g, 'v');
  }

  function speakPinyinSlug(slug, pinyinText) {
    if (!slug && !pinyinText) return;
    if (useLocalAudio && slug) {
      playMp3('audio/pinyin/' + slug + '.mp3', function (done) {
        speakTTS(pinyinText, PINYIN_TTS_RATE, done);
      }, PINYIN_PLAYBACK_RATE);
      return;
    }
    speakTTS(pinyinText, PINYIN_TTS_RATE);
  }

  function speakChar(char) {
    playLocal('chars', char, function () { speakTTS(char, 0.72); });
  }

  function speakWord(word) {
    if (!word) return;
    if (word.length === 1) {
      speakChar(word);
      return;
    }
    playLocal('words', word, function () { speakTTS(word, 0.8); });
  }

  function speakPinyin(pinyin, char) {
    if (char) {
      speakChar(char);
      return;
    }
    if (pinyin) {
      speakPinyinSlug(pinyinToSlug(pinyin), pinyin);
    }
  }

  function speakQuestion(text) {
    playLocal('words', text, function () { speakTTS(text, 0.85); });
  }

  function speakPoem(poemId, fullText) {
    if (!poemId || !fullText) return;
    playMp3('audio/poems/' + poemId + '.mp3', function (done) {
      speakTTS(fullText, 0.82, done);
    }, 1);
  }

  function speakPoemMeta(poemId, metaText) {
    if (!poemId || !metaText) return;
    playMp3('audio/poems/' + poemId + '_meta.mp3', function (done) {
      speakTTS(metaText, 0.85, done);
    }, 1);
  }

  /** 先读诗名、作者，再读全诗 */
  function speakPoemFull(poemId, title, author, fullText) {
    if (!poemId || !fullText) return;
    stop();
    var metaText = title + '，' + author + '。';
    function playBody() {
      playMp3('audio/poems/' + poemId + '.mp3', function (done) {
        speakTTS(fullText, 0.82, done);
      }, 1);
    }
    playMp3('audio/poems/' + poemId + '_meta.mp3', function (done) {
      speakTTS(metaText, 0.85, function () { done(); playBody(); });
    }, 1, playBody);
  }

  function speakMeaning(word, meaning) {
    if (!word) return;
    if (!meaning) {
      speakWord(word);
      return;
    }
    var phrase = word + '的意思是：' + meaning;
    playLocal('words', phrase, function () {
      playLocal('words', word, function () { speakTTS(word, 0.8); });
      setTimeout(function () {
        playLocal('words', meaning, function () { speakTTS(meaning, 0.85); });
      }, 700);
    });
  }

  function speakCharThenWord(char, word) {
    playLocal('chars', char, function () { speakTTS(char, 0.72); });
    if (word && word.length > 1) {
      setTimeout(function () {
        playLocal('words', word, function () { speakTTS(word, 0.8); });
      }, 700);
    }
  }

  function isSupported() {
    return useLocalAudio || !!synth;
  }

  return {
    speak: speakTTS,
    speakChar: speakChar,
    speakWord: speakWord,
    speakPinyin: speakPinyin,
    speakPinyinSlug: speakPinyinSlug,
    speakQuestion: speakQuestion,
    speakPoem: speakPoem,
    speakPoemMeta: speakPoemMeta,
    speakPoemFull: speakPoemFull,
    speakMeaning: speakMeaning,
    speakCharThenWord: speakCharThenWord,
    stop: stop,
    isPlaying: isPlaying,
    isSupported: isSupported,
    hasLocalAudio: function () { return useLocalAudio; },
    ensureReady: function (cb) {
      pickVoice();
      setTimeout(function () {
        pickVoice();
        cb(isSupported());
      }, 300);
    }
  };
})();
