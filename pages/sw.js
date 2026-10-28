/**
 * GitHub Pages · 小学知识复习 PWA（相对路径，支持子目录）
 */
var CACHE_VERSION = 'summer-review-pages-v16';
var SHELL_CACHE = CACHE_VERSION + '-shell';
var RUNTIME_CACHE = CACHE_VERSION + '-runtime';

var PRECACHE_REL = [
  'index.html',
  'app/index.html',
  'app/records.html',
  'app/install.html',
  'app/install.js',
  'app/manifest.webmanifest',
  'app/icons/icon-192.png',
  'app/icons/icon-512.png',
  'app/js/learning-log.js',
  'app/js/session-log.js',
  'app/js/android-back.js',
  'zh/index.html',
  'zh/pinyin-chart.html',
  'zh/css/style.css',
  'zh/css/pinyin-chart.css',
  'zh/js/speech.js',
  'zh/js/app.js',
  'zh/js/pinyin-chart.js',
  'zh/js/poem-recite.js',
  'zh/js/data/pinyin.js',
  'zh/js/data/characters.js',
  'zh/js/data/lessons.js',
  'zh/js/data/poems.js',
  'zh/js/data/questions.js',
  'zh/js/data/sentence.js',
  'zh/js/data/grade3-preview.js',
  'math/index.html',
  'math/css/style.css',
  'math/js/speech.js',
  'math/js/app.js',
  'math/js/data/math.js',
  'math/js/data/grade3-preview.js',
  'math/js/data/clock-money.js',
  'math/js/clock-visual.js',
  'en/index.html',
  'en/css/style.css',
  'en/js/speech.js',
  'en/js/app.js',
  'en/js/data/english.js',
  'en/js/data/textbook.js',
  'en/js/native-app.js'
];

function baseUrl() {
  return self.registration.scope;
}

function toAbs(rel) {
  return new URL(rel, baseUrl()).href;
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE_REL.map(toAbs)).catch(function (err) {
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
        if (key.indexOf('summer-review-pages-') === 0 && key !== SHELL_CACHE && key !== RUNTIME_CACHE) {
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
  if (url.href.indexOf(baseUrl()) !== 0) return;

  var path = url.pathname;
  var isAsset = /\.(js|css|png|jpg|jpeg|gif|webp|mp3|webmanifest|html)$/i.test(path) ||
    path.indexOf('/audio/') !== -1;

  if (!isAsset) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200) return response;
        var copy = response.clone();
        caches.open(RUNTIME_CACHE).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      }).catch(function () {
        return cached || Response.error();
      });
    })
  );
});
