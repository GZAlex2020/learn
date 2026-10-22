# -*- coding: utf-8 -*-
"""核对 63 个拼音 MP3 的来源与大小"""
import os
import re
import sys

ROOT = os.path.dirname(__file__)
sys.path.insert(0, ROOT)
import _gen_pinyin_audio as gen

JS = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'pinyin.js')
BASE = os.path.join(ROOT, '语文', '网页互动', 'audio', 'pinyin')

items = gen.load_items()
print('slug\tspeak\tmp3\tsize\tstatus')
issues = []
for x in items:
    mp3 = gen.speak_to_mp3(x['speak'])
    path = os.path.join(BASE, x['slug'] + '.mp3')
    size = os.path.getsize(path) if os.path.exists(path) else -1
    status = 'OK'
    if size < 8000:
        status = 'SMALL'
        issues.append(x['slug'])
    print(f"{x['slug']}\t{x['speak']}\t{mp3}\t{size}\t{status}")

print('\n疑似过小（可能 TTS 兜底）:', issues or '无')
