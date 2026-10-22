/**
 * 小程序语音 · 播放分包内 MP3
 */
var current = null;
var playing = false;

function textKey(text) {
  var parts = [];
  for (var i = 0; i < text.length; i++) {
    parts.push(text.charCodeAt(i).toString(16));
  }
  return parts.join('_');
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

function speakPhrase(text, audioRoot) {
  if (!text) return;
  stop();
  audioRoot = audioRoot || '/packageMath/audio/phrases/';
  current = wx.createInnerAudioContext();
  playing = true;
  current.src = audioRoot + textKey(text) + '.mp3';
  current.onEnded(function () {
    playing = false;
    if (current) {
      current.destroy();
      current = null;
    }
  });
  current.onStop(function () {
    playing = false;
  });
  current.onError(function () {
    playing = false;
    wx.showToast({ title: '暂无读音', icon: 'none' });
  });
  current.play();
}

module.exports = { speakPhrase: speakPhrase, stop: stop, isPlaying: isPlaying, textKey: textKey };
