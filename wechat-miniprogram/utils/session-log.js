var log = require('../../utils/learning-log.js');

var currentSession = null;

function start(opts) {
  if (currentSession) currentSession = null;
  currentSession = {
    subject: opts.subject || '',
    moduleName: opts.moduleName || '',
    subName: opts.subName || '',
    startTime: Date.now(),
    progress: opts.progress || 0,
    total: opts.total || 0,
    score: opts.score || 0
  };
}

function finish(opts) {
  if (!currentSession) return;
  opts = opts || {};
  var durationSec = Math.max(1, Math.round((Date.now() - currentSession.startTime) / 1000));
  if (durationSec <= log.MIN_DURATION_SEC) {
    currentSession = null;
    return;
  }
  var records = log.getRecords();
  records.unshift({
    subject: currentSession.subject,
    moduleName: currentSession.moduleName,
    subName: currentSession.subName,
    startTime: currentSession.startTime,
    durationSec: durationSec,
    progress: opts.progress != null ? opts.progress : currentSession.progress,
    total: opts.total != null ? opts.total : currentSession.total,
    score: opts.score != null ? opts.score : currentSession.score,
    status: '完成',
    result: opts.result || '',
    percent: opts.percent || 100
  });
  try {
    wx.setStorageSync('summer_review_learning_log_v1', records.slice(0, 500));
  } catch (e) { /* ignore */ }
  currentSession = null;
}

function abort() {
  currentSession = null;
}

module.exports = { start: start, finish: finish, abort: abort };
