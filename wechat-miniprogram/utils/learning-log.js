/**
 * 学习记录（与 app/js/learning-log.js 规则一致）
 */
var STORAGE_KEY = 'summer_review_learning_log_v1';
var MAX_RECORDS = 500;
var MIN_DURATION_SEC = 60;

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function now() {
  return Date.now();
}

function load() {
  try {
    var raw = wx.getStorageSync(STORAGE_KEY);
    return raw || [];
  } catch (e) {
    return [];
  }
}

function save(records) {
  try {
    wx.setStorageSync(STORAGE_KEY, records.slice(0, MAX_RECORDS));
  } catch (e) { /* ignore */ }
}

function shouldIncludeRecord(r) {
  if (!r || r.status !== '完成') return false;
  if (r.activityType === '背诵') return true;
  return (r.durationSec || 0) > MIN_DURATION_SEC;
}

function getCompletedRecords(records) {
  return (records || load()).filter(shouldIncludeRecord);
}

function filterRecords(records, opts) {
  opts = opts || {};
  records = getCompletedRecords(records);
  if (opts.subject && opts.subject !== '全部') {
    records = records.filter(function (r) { return r.subject === opts.subject; });
  }
  if (opts.activityType && opts.activityType !== '全部') {
    records = records.filter(function (r) {
      return (r.activityType || '学习') === opts.activityType;
    });
  }
  if (opts.module && opts.module !== '全部') {
    records = records.filter(function (r) { return r.module === opts.module; });
  }
  if (opts.keyword) {
    var kw = String(opts.keyword).trim().toLowerCase();
    if (kw) {
      records = records.filter(function (r) {
        var text = [r.subject, r.module, r.moduleName, r.subName, r.result, r.activityType].join(' ').toLowerCase();
        return text.indexOf(kw) >= 0;
      });
    }
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

function getAnalytics(records) {
  records = getCompletedRecords(records);
  var analytics = {
    total: records.length,
    durationSec: 0,
    subjects: { '语文': 0, '数学': 0 },
    activityTypes: { '学习': 0, '背诵': 0 },
    modules: {}
  };
  records.forEach(function (r) {
    analytics.durationSec += r.durationSec || 0;
    if (analytics.subjects[r.subject] != null) analytics.subjects[r.subject]++;
    var act = r.activityType || '学习';
    if (analytics.activityTypes[act] == null) analytics.activityTypes[act] = 0;
    analytics.activityTypes[act]++;
    var modKey = r.moduleName || r.module || '其他';
    if (!analytics.modules[modKey]) analytics.modules[modKey] = { count: 0, durationSec: 0 };
    analytics.modules[modKey].count++;
    analytics.modules[modKey].durationSec += r.durationSec || 0;
  });
  return analytics;
}

function getSummary(records) {
  return getAnalytics(records);
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

function exportReport(records, opts) {
  opts = opts || {};
  records = filterRecords(records, opts);
  var analytics = getAnalytics(records);
  var lines = ['小学知识复习 · 学习报告', '生成时间：' + formatDateTime(now()), ''];
  lines.push('学习次数：' + analytics.total);
  lines.push('累计时长：' + formatDuration(analytics.durationSec));
  lines.push('语文 ' + analytics.subjects['语文'] + ' · 数学 ' + analytics.subjects['数学']);
  lines.push('学习 ' + (analytics.activityTypes['学习'] || 0) + ' · 背诵 ' + (analytics.activityTypes['背诵'] || 0));
  records.forEach(function (r, i) {
    lines.push('');
    lines.push((i + 1) + '. ' + r.subject + ' · ' + (r.moduleName || r.module) + (r.subName ? ' · ' + r.subName : ''));
    lines.push('   ' + formatDateTime(r.startTime) + ' · ' + (r.result || ''));
  });
  return lines.join('\n');
}

function deleteRecord(id) {
  if (!id) return false;
  var all = load();
  var next = all.filter(function (r) { return r.id !== id; });
  if (next.length === all.length) return false;
  save(next);
  return true;
}

function clearAll() {
  save([]);
}

module.exports = {
  getRecords: function () { return getCompletedRecords(); },
  getSummary: getSummary,
  getAnalytics: getAnalytics,
  filterRecords: filterRecords,
  getModuleOptions: getModuleOptions,
  exportReport: exportReport,
  groupByDate: groupByDate,
  deleteRecord: deleteRecord,
  formatDuration: formatDuration,
  formatDateTime: formatDateTime,
  formatDateLabel: formatDateLabel,
  clearAll: clearAll,
  MIN_DURATION_SEC: MIN_DURATION_SEC
};
