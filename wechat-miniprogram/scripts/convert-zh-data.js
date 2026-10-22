const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '../../语文/网页互动/js/data');
const out = path.join(__dirname, '../packageZh/utils');

if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

function convert(srcName, outName, transform) {
  let s = fs.readFileSync(path.join(base, srcName), 'utf8');
  s = s.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
  if (transform) s = transform(s);
  else s = s.replace(/window\.\w+\s*=\s*/, 'module.exports = ');
  fs.writeFileSync(path.join(out, outName), s.trim() + '\n');
  console.log('OK', outName);
}

convert('pinyin.js', 'pinyin-data.js');
convert('characters.js', 'char-data.js');
convert('questions.js', 'question-data.js');
convert('sentence.js', 'sentence-data.js');
convert('grade3-preview.js', 'grade3-preview.js', function (s) {
  s = s.replace(/window\.GRADE3_PREVIEW\s*=\s*/, 'module.exports = ');
  s = s.replace(
    "return JSON.parse(localStorage.getItem(RECITE_STORAGE_KEY) || '{}');",
    "var raw = wx.getStorageSync(RECITE_STORAGE_KEY);\n      if (raw && typeof raw === 'object') return raw;\n      try { return JSON.parse(raw || '{}'); } catch (e) { return {}; }"
  );
  s = s.replace(
    'localStorage.setItem(RECITE_STORAGE_KEY, JSON.stringify(data));',
    'wx.setStorageSync(RECITE_STORAGE_KEY, data);'
  );
  s = s.replace(/grade3_recite_v1/g, 'grade3_recite_v2');
  return s;
});

let lessons = fs.readFileSync(path.join(base, 'lessons.js'), 'utf8');
lessons = lessons.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
lessons = lessons.replace('window.LESSON_DATA = (function () {', 'var LESSON_DATA = (function () {');
lessons = lessons.replace(
  /if \(window\.CHAR_DATA && window\.CHAR_DATA\.CHARACTERS\) \{\s*window\.CHAR_DATA\.CHARACTERS\.forEach\(addToPool\);\s*\}/,
  "var charData = require('./char-data.js');\n  if (charData && charData.CHARACTERS) {\n    charData.CHARACTERS.forEach(addToPool);\n  }"
);
lessons = lessons.replace(
  "return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');",
  "var raw = wx.getStorageSync(STORAGE_KEY);\n      if (raw && typeof raw === 'object') return raw;\n      try { return JSON.parse(raw || '{}'); } catch (e) { return {}; }"
);
lessons = lessons.replace(
  'localStorage.setItem(STORAGE_KEY, JSON.stringify(data));',
  'wx.setStorageSync(STORAGE_KEY, data);'
);
lessons = lessons.replace(/\}\)\(\);$/, '})();\n\nmodule.exports = LESSON_DATA;');
fs.writeFileSync(path.join(out, 'lesson-data.js'), lessons.trim() + '\n');
console.log('OK lesson-data.js');
