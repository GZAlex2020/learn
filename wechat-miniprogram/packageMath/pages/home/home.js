Page({
  goPractice(e) {
    var mod = e.currentTarget.dataset.module || '';
    var url = '/packageMath/pages/practice/practice';
    if (mod) url += '?module=' + mod;
    wx.navigateTo({ url: url });
  }
});
