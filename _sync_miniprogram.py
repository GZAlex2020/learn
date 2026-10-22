# -*- coding: utf-8 -*-
"""同步数学口诀音频等资源到微信小程序分包"""
import os
import re
import shutil

ROOT = os.path.dirname(__file__)
MATH_JS = os.path.join(ROOT, '数学', '网页互动', 'js', 'data', 'math.js')
PHRASES_SRC = os.path.join(ROOT, '数学', '网页互动', 'audio', 'phrases')
MP_ROOT = os.path.join(ROOT, 'wechat-miniprogram')
MP_AUDIO = os.path.join(MP_ROOT, 'packageMath', 'audio', 'phrases')


def text_key(text):
    return '_'.join(format(ord(c), 'x') for c in text)


def collect_mult_rhymes():
    cn = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']

    def product_to_cn(n):
        if n < 10:
            return cn[n]
        if n == 10:
            return '十'
        if n < 20:
            return '十' + cn[n - 10]
        tens, ones = divmod(n, 10)
        if ones == 0:
            return cn[tens] + '十'
        return cn[tens] + '十' + cn[ones]

    phrases = set()
    for a in range(1, 10):
        for b in range(1, 10):
            p = a * b
            if p < 10:
                rhyme = cn[a] + cn[b] + '得' + cn[p]
            else:
                rhyme = cn[a] + cn[b] + product_to_cn(p)
            phrases.add(rhyme)
    return sorted(phrases)


def main():
    os.makedirs(MP_AUDIO, exist_ok=True)
    rhymes = collect_mult_rhymes()
    ok = skip = miss = 0
    for rhyme in rhymes:
        src = os.path.join(PHRASES_SRC, text_key(rhyme) + '.mp3')
        dst = os.path.join(MP_AUDIO, text_key(rhyme) + '.mp3')
        if os.path.isfile(src):
            shutil.copy2(src, dst)
            ok += 1
        else:
            miss += 1
            print(f'  缺失: {rhyme}')
    print(f'口诀音频：复制 {ok} 个，缺失 {miss} 个 → {MP_AUDIO}')


if __name__ == '__main__':
    main()
