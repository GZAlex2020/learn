# -*- coding: utf-8 -*-
"""下载课文生字笔顺数据（hanzi-writer-data，离线可用）"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(__file__)
LESSONS_JS = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'lessons.js')
OUT_DIR = os.path.join(ROOT, '语文', '网页互动', 'data', 'strokes')
BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/'


def collect_chars():
    with open(LESSONS_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    return sorted(set(re.findall(r"char: '([^']+)'", content)))


def download_char(ch):
    url = BASE_URL + urllib.parse.quote(ch) + '.json'
    local = os.path.join(OUT_DIR, ch + '.json')
    if os.path.exists(local) and os.path.getsize(local) > 200:
        return 'skip'
    os.makedirs(OUT_DIR, exist_ok=True)
    try:
        urllib.request.urlretrieve(url, local)
        if os.path.getsize(local) < 200:
            os.remove(local)
            return 'missing'
        return 'ok'
    except (urllib.error.HTTPError, urllib.error.URLError, OSError):
        if os.path.exists(local):
            try:
                os.remove(local)
            except OSError:
                pass
        return 'missing'


def main():
    chars = collect_chars()
    print(f'课文生字笔顺：共 {len(chars)} 个不同汉字')
    ok = skip = missing = 0
    missing_list = []
    for i, ch in enumerate(chars):
        result = download_char(ch)
        if result == 'ok':
            ok += 1
            print(f'[{i + 1}/{len(chars)}] {ch} OK')
        elif result == 'skip':
            skip += 1
        else:
            missing += 1
            missing_list.append(ch)
            print(f'[{i + 1}/{len(chars)}] {ch} 无笔顺数据')
    print(f'完成：新生成 {ok} 个，已存在 {skip} 个，缺失 {missing} 个')
    if missing_list:
        print('缺失：', ''.join(missing_list[:30]), ('…' if len(missing_list) > 30 else ''))


if __name__ == '__main__':
    main()
