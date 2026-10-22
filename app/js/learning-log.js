/**
 * 学习记录 · 本地保存（localStorage，离线可用）
 */
window.LearningLog = (function () {
  'use strict';

  var STORAGE_KEY = 'summer_review_learning_log_v1';
  var MAX_RECORDS = 500;
  var MIN_DURATION_SEC = 60;
  var currentSession = null;

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function save(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_RECORDS)));
    } catch (e) { /* ignore */ }
  }

  function now() {
    return Date.now();
  }

  function buildResult(record) {
    if (record.result) return record.result;
    if (record.total && record.score != null && record.module !== 'read') {
      return record.score + ' / ' + record.total;
    }
    if (record.total && record.progress != null) {
      return '进度 ' + record.progress + ' / ' + record.total;
    }
    return record.status || '已学习';
  }

  function start(opts) {
    if (currentSession) {
      abortSession();
    }
    currentSession = {
      id: 's_' + now() + '_' + Math.random().toString(36).slice(2, 7),
      subject: opts.subject || '',
      module: opts.module || '',
      moduleName: opts.moduleName || opts.module || '',
      subName: opts.subName || '',
      startTime: now(),
      endTime: null,
      durationSec: 0,
      progress: opts.progress || 0,
      total: opts.total || 0,
      score: opts.score || 0,
      status: '进行中',
      result: '',
      percent: 0
    };
    return currentSession;
  }

  function updateProgress(opts) {
    if (!currentSession || !opts) return;
    if (opts.progress != null) currentSession.progress = opts.progress;
    if (opts.total != null) currentSession.total = opts.total;
    if (opts.score != null) currentSession.score = opts.score;
  }

  function finish(opts) {
    if (!currentSession) return null;
    opts = opts || {};
    var s = currentSession;
    s.endTime = now();
    s.durationSec = Math.max(1, Math.round((s.endTime - s.startTime) / 1000));
    if (opts.progress != null) s.progress = opts.progress;
    if (opts.total != null) s.total = opts.total;
    if (opts.score != null) s.score = opts.score;
    s.status = opts.status || '完成';
    s.result = opts.result || buildResult(Object.assign({}, s, opts));
    if (opts.percent != null) {
      s.percent = opts.percent;
    } else if (s.total > 0 && s.score != null && s.module !== 'read' && s.module !== 'keywords') {
      s.percent = Math.round((s.score / s.total) * 100);
    } else if (s.total > 0 && s.progress != null) {
      s.percent = Math.round((s.progress / s.total) * 100);
    } else {
      s.percent = s.status === '完成' ? 100 : 0;
    }
    var saved = null;
    if (s.status === '完成' && s.durationSec > MIN_DURATION_SEC) {
      persist(s);
      saved = s;
    }
    currentSession = null;
    return saved;
  }

  function abortSession() {
    if (!currentSession) return null;
    currentSession = null;
    return null;
  }

  function persist(record) {
    var records = load();
    records.unshift({
      id: record.id,
      subject: record.subject,
      module: record.module,
      moduleName: record.moduleName,
      subName: record.subName,
      activityType: record.activityType || '学习',
      startTime: record.startTime,
      endTime: record.endTime,
      durationSec: record.durationSec,
      progress: record.progress,
      total: record.total,
      score: record.score,
      percent: record.percent,
      status: record.status,
      result: record.result
    });
    save(records);
  }

  function shouldIncludeRecord(r, includeAll) {
    if (!r || r.status !== '完成') return false;
    if (includeAll) return true;
    if (r.activityType === '背诵') return true;
    return (r.durationSec || 0) > MIN_DURATION_SEC;
  }

  function getCompletedRecords(records, includeAll) {
    return (records || load()).filter(function (r) {
      return shouldIncludeRecord(r, includeAll);
    });
  }

  function filterRecords(records, opts) {
    opts = opts || {};
    records = getCompletedRecords(records);
    if (opts.subject && opts.subject !== '全部') {
      records = records.filter(function (r) {
        return r.subject === opts.subject;
      });
    }
    if (opts.activityType && opts.activityType !== '全部') {
      records = records.filter(function (r) {
        return (r.activityType || '学习') === opts.activityType;
      });
    }
    if (opts.module && opts.module !== '全部') {
      records = records.filter(function (r) {
        return r.module === opts.module;
      });
    }
    if (opts.keyword) {
      var kw = String(opts.keyword).trim().toLowerCase();
      if (kw) {
        records = records.filter(function (r) {
          var text = [
            r.subject, r.module, r.moduleName, r.subName,
            r.result, r.activityType, r.status
          ].join(' ').toLowerCase();
          return text.indexOf(kw) >= 0;
        });
      }
    }
    if (opts.dateFrom) {
      var fromTs = new Date(opts.dateFrom).setHours(0, 0, 0, 0);
      records = records.filter(function (r) {
        return r.startTime >= fromTs;
      });
    }
    if (opts.dateTo) {
      var toTs = new Date(opts.dateTo).setHours(23, 59, 59, 999);
      records = records.filter(function (r) {
        return r.startTime <= toTs;
      });
    }
    return records;
  }

  function getModuleOptions(records) {
    records = getCompletedRecords(records);
    var map = {};
    records.forEach(function (r) {
      if (r.module) map[r.module] = r.moduleName || r.module;
    });
    return Object.keys(map).sort().map(function (id) {
      return { id: id, name: map[id] };
    });
  }

  function getAnalytics(records) {
    records = getCompletedRecords(records);
    var analytics = {
      total: records.length,
      durationSec: 0,
      subjects: { '语文': 0, '数学': 0 },
      activityTypes: { '学习': 0, '背诵': 0 },
      modules: {},
      daily: {},
      avgPercent: 0,
      percentCount: 0
    };
    records.forEach(function (r) {
      analytics.durationSec += r.durationSec || 0;
      if (analytics.subjects[r.subject] != null) analytics.subjects[r.subject]++;
      var act = r.activityType || '学习';
      if (analytics.activityTypes[act] == null) analytics.activityTypes[act] = 0;
      analytics.activityTypes[act]++;
      var modKey = r.moduleName || r.module || '其他';
      if (!analytics.modules[modKey]) {
        analytics.modules[modKey] = { count: 0, durationSec: 0 };
      }
      analytics.modules[modKey].count++;
      analytics.modules[modKey].durationSec += r.durationSec || 0;
      var dayKey = formatDateKey(r.startTime);
      if (!analytics.daily[dayKey]) analytics.daily[dayKey] = 0;
      analytics.daily[dayKey]++;
      if (r.percent != null && r.percent > 0) {
        analytics.avgPercent += r.percent;
        analytics.percentCount++;
      }
    });
    if (analytics.percentCount) {
      analytics.avgPercent = Math.round(analytics.avgPercent / analytics.percentCount);
    }
    return analytics;
  }

  function exportReport(records, opts) {
    opts = opts || {};
    records = filterRecords(records, opts);
    var analytics = getAnalytics(records);
    var lines = [];
    lines.push('小学知识复习 · 学习报告');
    lines.push('生成时间：' + formatDateTime(now()));
    if (opts.subject && opts.subject !== '全部') lines.push('科目：' + opts.subject);
    if (opts.activityType && opts.activityType !== '全部') lines.push('类型：' + opts.activityType);
    if (opts.keyword) lines.push('关键词：' + opts.keyword);
    if (opts.dateFrom || opts.dateTo) {
      lines.push('日期范围：' + (opts.dateFrom || '—') + ' 至 ' + (opts.dateTo || '—'));
    }
    lines.push('');
    lines.push('【统计摘要】');
    lines.push('学习次数：' + analytics.total);
    lines.push('累计时长：' + formatDuration(analytics.durationSec));
    lines.push('语文：' + analytics.subjects['语文'] + ' 次 · 数学：' + analytics.subjects['数学'] + ' 次');
    lines.push('学习：' + (analytics.activityTypes['学习'] || 0) + ' 次 · 背诵：' + (analytics.activityTypes['背诵'] || 0) + ' 次');
    if (analytics.percentCount) lines.push('平均得分率：' + analytics.avgPercent + '%');
    lines.push('');
    lines.push('【模块分布】');
    Object.keys(analytics.modules).sort(function (a, b) {
      return analytics.modules[b].count - analytics.modules[a].count;
    }).forEach(function (name) {
      var m = analytics.modules[name];
      lines.push('- ' + name + '：' + m.count + ' 次，' + formatDuration(m.durationSec));
    });
    lines.push('');
    lines.push('【明细记录】');
    if (!records.length) {
      lines.push('（无符合条件的记录）');
    } else {
      records.forEach(function (r, i) {
        lines.push('');
        lines.push((i + 1) + '. ' + r.subject + ' · ' + (r.moduleName || r.module) +
          (r.subName ? ' · ' + r.subName : ''));
        lines.push('   类型：' + (r.activityType || '学习'));
        lines.push('   时间：' + formatDateTime(r.startTime) + '（' + formatDuration(r.durationSec) + '）');
        lines.push('   结果：' + (r.result || '—') + (r.percent ? '（' + r.percent + '%）' : ''));
      });
    }
    return lines.join('\n');
  }

  function downloadReport(text, filename) {
    var blob = new Blob(['\ufeff' + text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || ('学习报告_' + formatDateKey(now()) + '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function addReciteLog(opts) {
    opts = opts || {};
    var ts = now();
    persist({
      id: 'recite_' + ts + '_' + Math.random().toString(36).slice(2, 7),
      subject: opts.subject || '语文',
      module: opts.module || 'preview3',
      moduleName: opts.moduleName || '三年级预习',
      subName: opts.subName || '',
      activityType: '背诵',
      startTime: ts,
      endTime: ts,
      durationSec: opts.durationSec || 0,
      progress: 1,
      total: 1,
      score: opts.score != null ? opts.score : 0,
      percent: opts.percent != null ? opts.percent : 0,
      status: '完成',
      result: opts.result || ''
    });
  }

  function formatDuration(sec) {
    if (!sec || sec < 1) return '不足 1 秒';
    if (sec < 60) return sec + ' 秒';
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ' 分' + (s ? ' ' + s + ' 秒' : '');
  }

  function formatDateTime(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function formatDateKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function formatDateLabel(dateKey) {
    var parts = dateKey.split('-');
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);
    var d = new Date(y, m - 1, day);
    var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return y + '年' + m + '月' + day + '日 周' + weekdays[d.getDay()];
  }

  function groupByDate(records) {
    records = getCompletedRecords(records);
    var map = {};
    records.forEach(function (r) {
      var key = formatDateKey(r.startTime);
      if (!map[key]) {
        map[key] = {
          date: key,
          dateLabel: formatDateLabel(key),
          records: [],
          total: 0,
          durationSec: 0,
          subjects: { '语文': 0, '数学': 0 }
        };
      }
      var g = map[key];
      g.records.push(r);
      g.total++;
      g.durationSec += r.durationSec || 0;
      if (g.subjects[r.subject] != null) g.subjects[r.subject]++;
    });
    return Object.keys(map).sort(function (a, b) {
      return b.localeCompare(a);
    }).map(function (key) {
      return map[key];
    });
  }

  function deleteRecord(id) {
    if (!id) return false;
    var all = load();
    var next = all.filter(function (r) {
      return r.id !== id;
    });
    if (next.length === all.length) return false;
    save(next);
    return true;
  }

  function getSummary(records) {
    return getAnalytics(records);
  }

  return {
    start: start,
    updateProgress: updateProgress,
    finish: finish,
    abortSession: abortSession,
    getRecords: function () { return getCompletedRecords(); },
    clearAll: function () { save([]); currentSession = null; },
    deleteRecord: deleteRecord,
    groupByDate: groupByDate,
    formatDateLabel: formatDateLabel,
    getCurrent: function () { return currentSession; },
    formatDuration: formatDuration,
    formatDateTime: formatDateTime,
    getSummary: getSummary,
    filterRecords: filterRecords,
    getModuleOptions: getModuleOptions,
    getAnalytics: getAnalytics,
    exportReport: exportReport,
    downloadReport: downloadReport,
    addReciteLog: addReciteLog
  };
})();
