/**
 * iOS / 桌面端安装提示（安卓请使用 APK，不在首页展示 PWA 安装说明）
 */
(function () {
  'use strict';

  var isAndroid = /Android/i.test(navigator.userAgent);
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  function $(id) {
    return document.getElementById(id);
  }

  function updatePlatformTip() {
    var tip = $('platform-install-tip');
    if (!tip) return;
    if (isAndroid) {
      tip.innerHTML =
        '<strong>🌐 网页版可直接使用</strong><span class="badge">浏览器</span><br>' +
        'Chrome 菜单 → <strong>添加到主屏幕</strong>，断网也能练已打开过的内容。';
      return;
    }
    if (isIOS) {
      tip.innerHTML =
        '<strong>📲 安装到 iPad / iPhone</strong><span class="badge">像 App 一样</span><br>' +
        'Safari → 分享 → <strong>添加到主屏幕</strong><br>' +
        '<a href="install.html#ios">查看 iOS 详细步骤 →</a>';
    } else {
      tip.innerHTML =
        '<strong>📲 安装到手机 / 平板</strong><span class="badge">像 App 一样</span><br>' +
        'iPad：Safari → 添加到主屏幕<br>' +
        '安卓：请使用 <a href="install.html#apk">APK 安装包</a>（见安装说明）<br>' +
        '<a href="install.html">查看详细步骤 →</a>';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    updatePlatformTip();

    if (window.matchMedia('(display-mode: standalone)').matches) {
      var el = $('offline-status');
      if (el) el.textContent = '✓ 应用模式 · 练过的内容可离线使用';
    }
  });
})();
