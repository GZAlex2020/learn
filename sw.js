/**
 * 暑假复习 PWA · 离线缓存（音频按需缓存）
 */
var CACHE_VERSION = 'summer-review-v2';
var SHELL_CACHE = CACHE_VERSION + '-shell';
var RUNTIME_CACHE = CACHE_VERSION + '-runtime';

var PRECACHE_URLS = [
  '/app/index.html',
  '/app/install.html',
  '/app/install.js',
  '/app/manifest.webmanifest',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/语文/网页互动/index.html',
  '/语文/网页互动/拼音表.html',
  '/语文/网页互动/css/style.css',
  '/语文/网页互动/css/pinyin-chart.css',
  '/语文/网页互动/js/speech.js',
  '/语文/网页互动/js/app.js',
  '/语文/网页互动/js/pinyin-chart.js',
  '/语文/网页互动/js/data/pinyin.js',
  '/语文/网页互动/js/data/characters.js',
  '/语文/网页互动/js/data/lessons.js',
  '/语文/网页互动/js/data/questions.js',
  '/语文/网页互动/js/data/sentence.js',
  '/语文/网页互动/js/data/grade3-preview.js',
  '/语文/网页互动/js/data/pinyin-chart.js',
  '/数学/网页互动/index.html',
  '/数学/网页互动/css/style.css',
  '/数学/网页互动/js/speech.js',
  '/数学/网页互动/js/app.js',
  '/数学/网页互动/js/data/math.js',
  '/数学/网页互动/js/data/grade3-preview.js',
  '/数学/网页互动/js/data/clock-money.js',
  '/数学/网页互动/js/clock-visual.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE_URLS).catch(function (err) {
        console.warn('precache partial fail', err);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key.indexOf('summer-review-') === 0 && key !== SHELL_CACHE && key !== RUNTIME_CACHE) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  var path = url.pathname;
  var isAsset = /\.(js|css|png|jpg|mp3|webmanifest|html)$/i.test(path) ||
    path.indexOf('/audio/') !== -1;

  if (!isAsset) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200) return response;
        var clone = response.clone();
        caches.open(RUNTIME_CACHE).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function () {
        if (event.request.destination === 'document') {
          return caches.match('/app/index.html');
        }
      });
    })
  );
});
