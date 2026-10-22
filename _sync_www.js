/**
 * 将互动练习资源同步到 android-apk/www（ASCII 路径，兼容 Android WebView）
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WWW = path.join(ROOT, 'android-apk', 'www');

const LINK_REPLACEMENTS = [
  ['../../语文/网页互动/', '../zh/'],
  ['../../数学/网页互动/', '../math/'],
  ['../语文/网页互动/', '../zh/'],
  ['../数学/网页互动/', '../math/'],
  ['../../app/', '../app/'],
  ['/语文/网页互动/', '/zh/'],
  ['/数学/网页互动/', '/math/'],
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
    if (/[\u4e00-\u9fff]/.test(name) && name.endsWith('.html')) {
      continue;
    }
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

console.log('同步 www（ASCII 路径 zh / math）…');
rmDir(WWW);
fs.mkdirSync(WWW, { recursive: true });

copyDir(path.join(ROOT, 'app'), path.join(WWW, 'app'), true);
copyDir(path.join(ROOT, '语文', '网页互动'), path.join(WWW, 'zh'), true);
copyDir(path.join(ROOT, '数学', '网页互动'), path.join(WWW, 'math'), true);

const chartSrc = path.join(ROOT, '语文', '网页互动', 'pinyin-chart.html');
const chartDst = path.join(WWW, 'zh', 'pinyin-chart.html');
if (fs.existsSync(chartSrc)) {
  fs.writeFileSync(chartDst, rewriteText(fs.readFileSync(chartSrc, 'utf8')), 'utf8');
}

const zhAudio = path.join(WWW, 'zh', 'audio');
const mathAudio = path.join(WWW, 'math', 'audio');
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

const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=app/index.html">
  <title>小学知识复习</title>
  <script>location.replace('app/index.html');</script>
</head>
<body><p><a href="app/index.html">进入小学知识复习</a></p></body>
</html>
`;
fs.writeFileSync(path.join(WWW, 'index.html'), indexHtml, 'utf8');

console.log('OK → android-apk/www');
