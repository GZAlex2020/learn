/**
 * 各科目练习页共用的学习记录封装
 */
window.createSessionLogger = function (subject) {
  'use strict';
  var Log = window.LearningLog;

  function start(module, moduleName, opts) {
    if (!Log) return;
    opts = opts || {};
    Log.start({
      subject: subject,
      module: module,
      moduleName: moduleName,
      subName: opts.subName || '',
      total: opts.total || 0,
      progress: opts.progress || 0,
      score: opts.score || 0
    });
  }

  function finish(opts) {
    if (!Log) return null;
    return Log.finish(opts || {});
  }

  function progressFromState(state, extras) {
    extras = extras || {};
    var ctx = {
      score: state.score != null ? state.score : 0,
      progress: extras.progress,
      total: extras.total
    };
    if (ctx.progress == null && state.index != null) {
      ctx.progress = state.index + (state.answered ? 1 : 0);
    }
    if (ctx.total == null && state.questions && state.questions.length) {
      ctx.total = state.questions.length;
    }
    if (ctx.progress == null && state.flashIndex != null && state.flashList) {
      ctx.progress = state.flashIndex + 1;
      ctx.total = state.flashList.length;
    }
    if (ctx.progress == null && state.kwIndex != null && extras.kwTotal) {
      ctx.progress = state.kwIndex + 1;
      ctx.total = extras.kwTotal;
    }
    if (ctx.progress == null && state.matched) {
      ctx.progress = Object.keys(state.matched).length;
    }
    if (ctx.total == null && extras.matchTotal) {
      ctx.total = extras.matchTotal;
    }
    if (ctx.progress == null && state.lessonCharIndex != null && state.lessonChars) {
      ctx.progress = state.lessonCharIndex + 1;
      ctx.total = state.lessonChars.length;
    }
    return ctx;
  }

  function abort(state, extras) {
    if (!Log) return null;
    return Log.abortSession(progressFromState(state, extras || {}));
  }

  function tick(state, extras) {
    if (!Log) return;
    var ctx = progressFromState(state, extras || {});
    Log.updateProgress(ctx);
  }

  return { start: start, finish: finish, abort: abort, tick: tick };
};
