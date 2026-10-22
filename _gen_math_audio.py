# -*- coding: utf-8 -*-
"""生成数学模块朗读 MP3（概念 / 读题 / 常用词）"""
import asyncio
import os
import re
import sys

ROOT = os.path.dirname(__file__)
BASE = os.path.join(ROOT, '数学', '网页互动', 'audio', 'phrases')
JS = os.path.join(ROOT, '数学', '网页互动', 'js', 'data', 'math.js')

try:
    import edge_tts
except ImportError:
    os.system(f'{sys.executable} -m pip install edge-tts -q')
    import edge_tts

VOICE = 'zh-CN-XiaoxiaoNeural'
RATE = '-5%'


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


def collect_phrases():
    with open(JS, 'r', encoding='utf-8') as f:
        content = f.read()
    phrases = set()

    for block in re.finditer(r'CONCEPTS:\s*\[(.*?)\]\s*,', content, re.S):
        for obj in re.finditer(r'\{([^{}]+)\}', block.group(1)):
            chunk = obj.group(1)
            name = re.search(r"name:\s*'([^']+)'", chunk)
            example = re.search(r"example:\s*'([^']+)'", chunk)
            if name and example:
                phrases.add(name.group(1) + '，' + example.group(1))

    m_kw = re.search(r'KEYWORDS:\s*\[(.*)\]\s*\n\s*\};', content, re.S)
    if m_kw:
        for obj in re.finditer(r'\{([^{}]+)\}', m_kw.group(1)):
            chunk = obj.group(1)
            word = re.search(r"word:\s*'([^']+)'", chunk)
            meaning = re.search(r"meaning:\s*'([^']+)'", chunk)
            if word and meaning:
                phrases.add(word.group(1) + '，' + meaning.group(1))

    m_read = re.search(r'READ_QUESTIONS:\s*\[(.*)\]\s*\n\s*\};', content, re.S)
    if m_read:
        for obj in re.finditer(r'\{([^{}]+)\}', m_read.group(1)):
            chunk = obj.group(1)
            text = re.search(r"text:\s*'([^']+)'", chunk)
            if text:
                phrases.add(text.group(1))

    phrases.update(collect_mult_rhymes())

    return sorted(phrases)


async def generate_one(text, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return 'skip'
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(out_path)
    return 'ok'


async def main_async():
    phrases = collect_phrases()
    print(f'数学朗读：共 {len(phrases)} 条')
    sem = asyncio.Semaphore(6)
    ok = skip = 0
    lock = asyncio.Lock()

    async def worker(i, text):
        nonlocal ok, skip
        path = os.path.join(BASE, text_key(text) + '.mp3')
        async with sem:
            result = await generate_one(text, path)
            async with lock:
                if result == 'ok':
                    ok += 1
                    print(f'[{i + 1}/{len(phrases)}] {text[:28]}… OK')
                else:
                    skip += 1

    await asyncio.gather(*[worker(i, t) for i, t in enumerate(phrases)])
    print(f'完成：新生成 {ok} 个，已存在 {skip} 个')


def main():
    asyncio.run(main_async())


if __name__ == '__main__':
    main()
