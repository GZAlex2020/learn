/**
 * 生成 GitHub Pages 静态站点 → pages/
 * 使用 ASCII 路径（zh / math / app），兼容子路径部署
 *
 * 用法: node _build_pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'pages');

const LINK_REPLACEMENTS = [
  ['../../语文/网页互动/', '../zh/'],
  ['../../数学/网页互动/', '../math/'],
  ['../语文/网页互动/', '../zh/'],
  ['../数学/网页互动/', '../math/'],
  ['../../app/', '../app/'],
  ['/语文/网页互动/', './zh/'],
  ['/数学/网页互动/', './math/'],
  ['拼音表.html', 'pinyin-chart.html']
];

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) rmDir(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

function rewriteText(text) {
  let out = text;
  for (const [from, to] of LINK_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

function copyDir(src, dest, rewriteHtml) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (/[\u4e00-\u9fff]/.test(name) && name.endsWith('.html')) continue;
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d, rewriteHtml);
    } else if (rewriteHtml && /\.(html|webmanifest)$/i.test(name)) {
      fs.writeFileSync(d, rewriteText(fs.readFileSync(s, 'utf8')), 'utf8');
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function patchAppIndex(file) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /一二年级 · 语文 \+ 数学互动练习<br>支持 iPad 安装到桌面 · 安卓请用 APK 安装包/,
    '一二年级 · 语文 + 数学互动练习<br>浏览器打开即可练 · 也可添加到主屏幕'
  );
  html = html.replace(
    /navigator\.serviceWorker\.register\('\.\.\/sw\.js', \{ scope: '\/' \}\)/,
    "navigator.serviceWorker.register(new URL('../sw.js', location.href).pathname, { scope: new URL('../', location.href).pathname })"
  );
  fs.writeFileSync(file, html, 'utf8');
}

function writeManifest(file) {
  const manifest = {
    name: '小学知识复习',
    short_name: '小学知识复习',
    description: '语文拼音识字 + 数学口算读题 · 一二年级互动练习',
    start_url: './app/index.html',
    scope: './',
    display: 'standalone',
    orientation: 'any',
    background_color: '#edf2f7',
    theme_color: '#2c5282',
    lang: 'zh-CN',
    categories: ['education'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ],
    shortcuts: [
      { name: '语文练习', short_name: '语文', url: './zh/index.html', icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
      { name: '数学练习', short_name: '数学', url: './math/index.html', icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] }
    ]
  };
  fs.writeFileSync(file, JSON.stringify(manifest, null, 2), 'utf8');
}

function writeServiceWorker(file) {
  const sw = `/**
 * GitHub Pages · 小学知识复习 PWA（相对路径，支持子目录）
 */
var CACHE_VERSION = 'summer-review-pages-v1';
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
  'math/js/clock-visual.js'
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
  var isAsset = /\\.(js|css|png|jpg|jpeg|gif|webp|mp3|webmanifest|html)$/i.test(path) ||
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
`;
  fs.writeFileSync(file, sw, 'utf8');
}

function writeRootIndex(file) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#2c5282">
  <meta name="description" content="小学知识复习 · 语文拼音识字、数学口算读题，浏览器即可练习">
  <title>小学知识复习 · 一二年级</title>
  <link rel="manifest" href="app/manifest.webmanifest">
  <link rel="apple-touch-icon" href="app/icons/apple-touch-icon.png">
  <link rel="icon" href="app/icons/icon-192.png">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      background: linear-gradient(160deg, #ebf8ff 0%, #f0fff4 50%, #fefcbf 100%);
      min-height: 100vh;
      padding: max(24px, env(safe-area-inset-top)) 20px max(24px, env(safe-area-inset-bottom));
    }
    .wrap { max-width: 480px; margin: 0 auto; }
    header { text-align: center; padding: 28px 0 20px; }
    header h1 { font-size: 28px; color: #2c5282; margin-bottom: 8px; }
    header p { color: #4a5568; font-size: 15px; line-height: 1.6; }
    .cards { display: flex; flex-direction: column; gap: 14px; }
    .card {
      display: block;
      background: #fff;
      border-radius: 20px;
      padding: 26px 22px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      border: 3px solid transparent;
      transition: transform 0.15s;
    }
    .card:active { transform: scale(0.98); }
    .card-yu { border-color: #bee3f8; }
    .card-shu { border-color: #c6f6d5; }
    .card-log { border-color: #e9d8fd; }
    .card-icon { font-size: 44px; margin-bottom: 6px; }
    .card h2 { font-size: 22px; color: #2d3748; margin-bottom: 6px; }
    .card p { font-size: 14px; color: #718096; line-height: 1.5; }
    .tip {
      margin-top: 20px;
      padding: 14px 16px;
      background: rgba(255,255,255,0.92);
      border-radius: 14px;
      font-size: 13px;
      color: #4a5568;
      line-height: 1.65;
    }
    .badge {
      display: inline-block;
      background: #48bb78;
      color: #fff;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      margin-left: 6px;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>📚 小学知识复习</h1>
      <p>一二年级 · 语文 + 数学互动练习<br>网页版 · 手机 / 平板 / 电脑都能用</p>
    </header>
    <div class="cards">
      <a class="card card-yu" href="zh/index.html">
        <div class="card-icon">📖</div>
        <h2>语文练习</h2>
        <p>拼音 · 识字 · 课文 · 古诗 · 三年级必背</p>
      </a>
      <a class="card card-shu" href="math/index.html">
        <div class="card-icon">🔢</div>
        <h2>数学练习</h2>
        <p>口算 · 概念 · 读题 · 乘法口诀 · 钟表认识</p>
      </a>
      <a class="card card-log" href="app/records.html">
        <div class="card-icon">📋</div>
        <h2>学习记录</h2>
        <p>筛选 · 统计 · 导出学习报告</p>
      </a>
      <a class="card" href="app/index.html" style="border-color:#cbd5e0;">
        <div class="card-icon">🏠</div>
        <h2>练习首页</h2>
        <p>进入完整导航（含安装到主屏幕说明）</p>
      </a>
    </div>
    <div class="tip">
      <strong>网页版说明</strong><span class="badge">GitHub Pages</span><br>
      数据保存在本机浏览器，换设备不会同步。<br>
      手机可「添加到主屏幕」，像 App 一样打开。
    </div>
  </div>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {});
    }
  </script>
</body>
</html>
`;
  fs.writeFileSync(file, html, 'utf8');
}

function writeInstallTipPatch() {
  const file = path.join(OUT, 'app', 'install.js');
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');
  // 网页版：安卓也显示浏览器使用提示，不再隐藏
  js = js.replace(
    /if \(isAndroid\) \{\s*tip\.style\.display = 'none';\s*return;\s*\}/,
    `if (isAndroid) {
      tip.innerHTML =
        '<strong>🌐 网页版可直接使用</strong><span class="badge">浏览器</span><br>' +
        'Chrome 菜单 → <strong>添加到主屏幕</strong>，断网也能练已打开过的内容。';
      return;
    }`
  );
  fs.writeFileSync(file, js, 'utf8');
}

console.log('构建 GitHub Pages 静态站 → pages/ …');
rmDir(OUT);
fs.mkdirSync(OUT, { recursive: true });

copyDir(path.join(ROOT, 'app'), path.join(OUT, 'app'), true);
copyDir(path.join(ROOT, '语文', '网页互动'), path.join(OUT, 'zh'), true);
copyDir(path.join(ROOT, '数学', '网页互动'), path.join(OUT, 'math'), true);

const chartSrc = path.join(ROOT, '语文', '网页互动', 'pinyin-chart.html');
const chartDst = path.join(OUT, 'zh', 'pinyin-chart.html');
if (fs.existsSync(chartSrc)) {
  fs.writeFileSync(chartDst, rewriteText(fs.readFileSync(chartSrc, 'utf8')), 'utf8');
}

patchAppIndex(path.join(OUT, 'app', 'index.html'));
writeManifest(path.join(OUT, 'app', 'manifest.webmanifest'));
writeServiceWorker(path.join(OUT, 'sw.js'));
writeRootIndex(path.join(OUT, 'index.html'));
writeInstallTipPatch();

// 禁止 Jekyll 处理，避免下划线目录被忽略
fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');

const zhAudio = path.join(OUT, 'zh', 'audio');
const mathAudio = path.join(OUT, 'math', 'audio');
const audioMsg = [];
if (fs.existsSync(path.join(zhAudio, 'pinyin'))) {
  audioMsg.push('拼音 ' + fs.readdirSync(path.join(zhAudio, 'pinyin')).filter((f) => f.endsWith('.mp3')).length);
}
if (fs.existsSync(path.join(zhAudio, 'chars'))) {
  audioMsg.push('识字 ' + fs.readdirSync(path.join(zhAudio, 'chars')).filter((f) => f.endsWith('.mp3')).length);
}
if (fs.existsSync(path.join(mathAudio, 'phrases'))) {
  audioMsg.push('数学朗读 ' + fs.readdirSync(path.join(mathAudio, 'phrases')).filter((f) => f.endsWith('.mp3')).length);
}

console.log('  音频: ' + (audioMsg.length ? audioMsg.join(' · ') : '未找到'));
console.log('OK → pages/');
console.log('部署: 把 pages/ 发布到 GitHub Pages（见 GITHUB_PAGES.md）');
