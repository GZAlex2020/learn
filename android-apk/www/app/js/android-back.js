/**
 * Android APK · 物理返回键导航
 */
(function () {
  'use strict';

  var handlers = [];
  var listenerReady = false;
  var initAttempts = 0;

  function isNative() {
    try {
      if (window.IS_NATIVE_APP) return true;
      if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function') {
        return window.Capacitor.isNativePlatform();
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function getAppPlugin() {
    try {
      return window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    } catch (e) {
      return null;
    }
  }

  function handleBack() {
    for (var i = handlers.length - 1; i >= 0; i--) {
      try {
        if (handlers[i]() === true) return true;
      } catch (err) { /* ignore */ }
    }
    if (window.history.length > 1) {
      window.history.back();
      return true;
    }
    return false;
  }

  function exitApp() {
    try {
      var App = getAppPlugin();
      if (App && App.exitApp) {
        App.exitApp();
        return;
      }
    } catch (e) { /* ignore */ }
  }

  function onNativeBack() {
    if (!handleBack()) exitApp();
  }

  function initListener() {
    if (listenerReady || !isNative()) return;
    var App = getAppPlugin();
    if (!App || !App.addListener) {
      initAttempts++;
      if (initAttempts < 80) setTimeout(initListener, 50);
      return;
    }
    listenerReady = true;
    App.addListener('backButton', onNativeBack);
  }

  window.AppBackNav = {
    onBack: function (fn) {
      handlers.push(fn);
      return function () {
        var idx = handlers.indexOf(fn);
        if (idx >= 0) handlers.splice(idx, 1);
      };
    }
  };

  window.__handleNativeBack = handleBack;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListener);
  } else {
    initListener();
  }
  window.addEventListener('load', initListener);
})();
