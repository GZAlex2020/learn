var log = require('../../utils/learning-log.js');

var CLEAR_PASSWORD = '666666';

Page({
  data: {
    subjectLabels: ['全部科目', '语文', '数学'],
    subjectValues: ['全部', '语文', '数学'],
    subjectIndex: 0,
    typeLabels: ['全部类型', '学习', '背诵'],
    typeValues: ['全部', '学习', '背诵'],
    typeIndex: 0,
    keyword: '',
    groups: [],
    summary: { total: 0, subjects: { '语文': 0, '数学': 0 }, activityTypes: { '学习': 0, '背诵': 0 } },
    durationText: '0 秒'
  },

  onShow() {
    this.refresh();
  },

  getFilters() {
    return {
      subject: this.data.subjectValues[this.data.subjectIndex],
      activityType: this.data.typeValues[this.data.typeIndex],
      keyword: this.data.keyword
    };
  },

  refresh() {
    var filters = this.getFilters();
    var records = log.filterRecords(null, filters);
    var summary = log.getSummary(records);
    var groups = log.groupByDate(records).map(function (g) {
      return {
        date: g.date,
        dateLabel: g.dateLabel,
        dateStat: g.total + ' 次 · ' + log.formatDuration(g.durationSec) +
          ' · 语文 ' + g.subjects['语文'] + ' · 数学 ' + g.subjects['数学'],
        records: g.records.map(function (r) {
          return {
            id: r.id,
            subject: r.subject,
            moduleName: r.moduleName,
            subName: r.subName,
            activityType: r.activityType || '学习',
            timeText: log.formatDateTime(r.startTime),
            durationText: r.durationSec ? log.formatDuration(r.durationSec) : '',
            progressText: r.total ? (r.progress + ' / ' + r.total) : '—',
            result: r.result || '—',
            percentText: r.percent ? ('（' + r.percent + '%）') : ''
          };
        })
      };
    });
    this.setData({
      groups: groups,
      summary: summary,
      durationText: log.formatDuration(summary.durationSec)
    });
  },

  onSubjectChange(e) {
    this.setData({ subjectIndex: Number(e.detail.value) });
    this.refresh();
  },

  onTypeChange(e) {
    this.setData({ typeIndex: Number(e.detail.value) });
    this.refresh();
  },

  onKeywordInput(e) {
    this.setData({ keyword: e.detail.value });
    clearTimeout(this._kwTimer);
    this._kwTimer = setTimeout(this.refresh.bind(this), 300);
  },

  exportReport() {
    var text = log.exportReport(null, this.getFilters());
    wx.setClipboardData({
      data: text,
      success: function () {
        wx.showToast({ title: '报告已复制到剪贴板', icon: 'success' });
      }
    });
  },

  deleteOne(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '删除记录',
      content: '确定删除这条学习记录吗？',
      success(res) {
        if (res.confirm) {
          log.deleteRecord(id);
          that.refresh();
        }
      }
    });
  },

  clearAll() {
    var that = this;
    wx.showModal({
      title: '请输入密码',
      editable: true,
      placeholderText: '6 位家长密码',
      success(res) {
        if (!res.confirm) return;
        if (res.content !== CLEAR_PASSWORD) {
          wx.showToast({ title: '密码错误', icon: 'none' });
          return;
        }
        wx.showModal({
          title: '确认清空',
          content: '确定清空全部学习记录吗？此操作不可恢复。',
          success(r2) {
            if (r2.confirm) {
              log.clearAll();
              that.refresh();
            }
          }
        });
      }
    });
  }
});
