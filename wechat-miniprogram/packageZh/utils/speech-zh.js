/**
 * 语文分包语音 · 播放 packageZh/audio 内 MP3
 */
var pinyinData = require('./pinyin-data.js');

var current = null;
var playing = false;
var PINYIN_PLAYBACK_RATE = 1.35;

function textKey(text) {
  var parts = [];
  for (var i = 0; i < text.length; i++) {
    parts.push(text.charCodeAt(i).toString(16));
  }
  return parts.join('_');
}

function pinyinToSlug(pinyin) {
  return 'py_' + String(pinyin).replace(/ü/g, 'v');
}

function stop() {
  if (current) {
    try { current.stop(); } catch (e) { /* ignore */ }
    current.destroy();
    current = null;
  }
  playing = false;
}

function isPlaying() {
  return playing;
}

function playMp3(src, rate) {
  stop();
  current = wx.createInnerAudioContext();
  playing = true;
  current.src = src;
  if (rate && rate !== 1) current.playbackRate = rate;
  current.onEnded(function () {
    playing = false;
    if (current) {
      current.destroy();
      current = null;
    }
  });
  current.onStop(function () { playing = false; });
  current.onError(function () {
    playing = false;
    wx.showToast({ title: '暂无读音', icon: 'none' });
  });
  current.play();
}

function playLocal(type, text, rate) {
  if (!text) return;
  playMp3('/packageZh/audio/' + type + '/' + textKey(text) + '.mp3', rate || 1);
}

function speakPinyinSlug(slug, pinyinText) {
  if (!slug && !pinyinText) return;
  if (slug) {
    playMp3('/packageZh/audio/pinyin/' + slug + '.mp3', PINYIN_PLAYBACK_RATE);
    return;
  }
  if (pinyinText) playMp3('/packageZh/audio/pinyin/' + pinyinToSlug(pinyinText) + '.mp3', PINYIN_PLAYBACK_RATE);
}

function speakChar(char) {
  playLocal('chars', char);
}

function speakWord(word) {
  if (!word) return;
  if (word.length === 1) {
    speakChar(word);
    return;
  }
  playLocal('words', word);
}

function speakPinyin(pinyin, char) {
  if (char) {
    speakChar(char);
    return;
  }
  if (pinyin) speakPinyinSlug(pinyinToSlug(pinyin), pinyin);
}

function speakQuestion(text) {
  playLocal('words', text);
}

function speakMeaning(word, meaning) {
  if (!word) return;
  if (!meaning) {
    speakWord(word);
    return;
  }
  var phrase = word + '的意思是：' + meaning;
  playLocal('words', phrase);
}

function getPinyinSlug(item, tab) {
  return pinyinData.getPinyinSlug(item, tab);
}

function speakPoemFull(poemId, title, author, reciteText) {
  if (!poemId || !reciteText) return;
  stop();
  var metaSrc = '/packageZh/audio/poems/' + poemId + '_meta.mp3';
  var bodySrc = '/packageZh/audio/poems/' + poemId + '.mp3';
  var metaText = title + '，' + author + '。';

  function playBody() {
    current = wx.createInnerAudioContext();
    playing = true;
    current.src = bodySrc;
    current.onEnded(function () {
      playing = false;
      if (current) {
        current.destroy();
        current = null;
      }
    });
    current.onStop(function () { playing = false; });
    current.onError(function () {
      playing = false;
      playLocal('words', reciteText);
    });
    current.play();
  }

  current = wx.createInnerAudioContext();
  playing = true;
  current.src = metaSrc;
  current.onEnded(function () {
    if (current) {
      current.destroy();
      current = null;
    }
    playBody();
  });
  current.onStop(function () { playing = false; });
  current.onError(function () {
    playing = false;
    playLocal('words', metaText);
    setTimeout(function () { playLocal('words', reciteText); }, 1400);
  });
  current.play();
}

module.exports = {
  textKey: textKey,
  pinyinToSlug: pinyinToSlug,
  stop: stop,
  isPlaying: isPlaying,
  speakChar: speakChar,
  speakWord: speakWord,
  speakPinyin: speakPinyin,
  speakPinyinSlug: speakPinyinSlug,
  speakQuestion: speakQuestion,
  speakMeaning: speakMeaning,
  speakPoemFull: speakPoemFull,
  getPinyinSlug: getPinyinSlug
};
