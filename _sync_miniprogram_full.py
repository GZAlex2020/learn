# -*- coding: utf-8 -*-
"""同步完整资源到微信小程序分包（音频、笔顺、数据脚本）"""
import os
import re
import shutil

ROOT = os.path.dirname(__file__)
MP = os.path.join(ROOT, 'wechat-miniprogram')

ZH_SRC = os.path.join(ROOT, '语文', '网页互动')
MATH_SRC = os.path.join(ROOT, '数学', '网页互动')

PAIRS = [
    (os.path.join(ZH_SRC, 'audio', 'pinyin'), os.path.join(MP, 'packageZh', 'audio', 'pinyin')),
    (os.path.join(ZH_SRC, 'audio', 'chars'), os.path.join(MP, 'packageZh', 'audio', 'chars')),
    (os.path.join(ZH_SRC, 'audio', 'words'), os.path.join(MP, 'packageZh', 'audio', 'words')),
    (os.path.join(MATH_SRC, 'audio', 'phrases'), os.path.join(MP, 'packageMath', 'audio', 'phrases')),
    (os.path.join(ZH_SRC, 'data', 'strokes'), os.path.join(MP, 'packageZh', 'data', 'strokes')),
]

JS_CONVERT = [
    (os.path.join(ZH_SRC, 'js', 'hanzi-writer.min.js'), os.path.join(MP, 'packageZh', 'lib', 'hanzi-writer.min.js'), None),
]


def copy_tree(src, dst):
    if not os.path.isdir(src):
        print('  跳过（不存在）:', src)
        return 0, 0
    if os.path.isdir(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    n = sum(len(files) for _, _, files in os.walk(dst))
    size = sum(
        os.path.getsize(os.path.join(dp, f))
        for dp, _, files in os.walk(dst) for f in files
    )
    return n, size


def convert_window_export(src, dst, export_name=None):
    if not os.path.isfile(src):
        return
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    text = open(src, 'r', encoding='utf-8').read()
    if export_name:
        text = re.sub(r'window\.' + re.escape(export_name) + r'\s*=', 'module.exports =', text, count=1)
    else:
        text = re.sub(r'window\.(\w+)\s*=', r'module.exports =', text, count=1)
    # lessons.js IIFE tail
    text = text.replace('window.LESSON_DATA = (function', 'module.exports = (function')
    text = text.replace('window.QUESTION_DATA = {', 'module.exports = {')
    text = text.replace('MATH_DATA.MULT_TABLE = window.MATH_DATA.buildMultTable();', '')
    text = re.sub(
        r"if \(window\.CHAR_DATA && window\.CHAR_DATA\.CHARACTERS\) \{\s*window\.CHAR_DATA\.CHARACTERS\.forEach\(addToPool\);\s*\}",
        "var charData = require('./char-data.js');\n  if (charData && charData.CHARACTERS) {\n    charData.CHARACTERS.forEach(addToPool);\n  }",
        text
    )
    text = text.replace(
        "return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');",
        "return wx.getStorageSync(STORAGE_KEY) || {};"
    )
    text = text.replace(
        "localStorage.setItem(STORAGE_KEY, JSON.stringify(data));",
        "wx.setStorageSync(STORAGE_KEY, data);"
    )
    open(dst, 'w', encoding='utf-8').write(text)


def main():
    total_size = 0
    print('同步音频与笔顺…')
    for src, dst in PAIRS:
        n, size = copy_tree(src, dst)
        total_size += size
        print(f'  {os.path.basename(dst)}: {n} 文件, {size / 1024 / 1024:.2f} MB')

    print('同步 JS 库…')
    for src, dst, _ in JS_CONVERT:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        print('  ', os.path.basename(dst))

    print('转换数据脚本…')
    convert_window_export(
        os.path.join(ZH_SRC, 'js', 'data', 'pinyin.js'),
        os.path.join(MP, 'packageZh', 'utils', 'pinyin-data.js'),
        'PINYIN_DATA'
    )
    convert_window_export(
        os.path.join(ZH_SRC, 'js', 'data', 'characters.js'),
        os.path.join(MP, 'packageZh', 'utils', 'char-data.js'),
        'CHAR_DATA'
    )
    convert_window_export(
        os.path.join(ZH_SRC, 'js', 'data', 'lessons.js'),
        os.path.join(MP, 'packageZh', 'utils', 'lesson-data.js'),
    )
    convert_window_export(
        os.path.join(ZH_SRC, 'js', 'data', 'questions.js'),
        os.path.join(MP, 'packageZh', 'utils', 'question-data.js'),
        'QUESTION_DATA'
    )
    convert_window_export(
        os.path.join(ZH_SRC, 'js', 'data', 'pinyin-chart.js'),
        os.path.join(MP, 'packageZh', 'utils', 'pinyin-chart-data.js'),
        'PINYIN_CHART_DATA'
    )

    print(f'资源合计约 {total_size / 1024 / 1024:.2f} MB（不含代码）')
    print('OK → wechat-miniprogram/')


if __name__ == '__main__':
    main()
