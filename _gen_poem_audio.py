# -*- coding: utf-8 -*-
"""为部编版古诗词（含三年级预习）生成标准普通话 MP3"""
import asyncio
import os
import re
import shutil
import sys

ROOT = os.path.dirname(__file__)
POEMS_JS = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'poems.js')
GRADE3_JS = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'grade3-preview.js')
OUT_DIR = os.path.join(ROOT, '语文', '网页互动', 'audio', 'poems')
WX_OUT_DIR = os.path.join(ROOT, 'wechat-miniprogram', 'packageZh', 'audio', 'poems')

try:
    import edge_tts
except ImportError:
    os.system(f'{sys.executable} -m pip install edge-tts -q')
    import edge_tts

SPEAK_OVERRIDES = {
    'yonge': '峨，峨，峨，曲项向天歌。白毛浮绿水，红掌拨清波。',
}
VOICE = 'zh-CN-XiaoxiaoNeural'
RATE = '-8%'


def load_poems():
    with open(POEMS_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    poems = []
    pattern = re.compile(
        r"poem\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*\[(.*?)\]\)",
        re.DOTALL
    )
    for m in pattern.finditer(content):
        pid, title, author, dynasty, lines_block = m.groups()
        lines = re.findall(r"text:\s*'([^']*)'", lines_block)
        full = ''.join(lines)
        meta = title + '，' + author + '。'
        poems.append({
            'id': pid,
            'title': title,
            'author': author,
            'dynasty': dynasty,
            'full': full,
            'meta': meta
        })
    return poems


def load_grade3_poems():
    with open(GRADE3_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    poems = []
    for cat in ('poem', 'garden'):
        blocks = content.split("category: '" + cat + "'")
        seen = set()
        for block in blocks[1:]:
            pid_m = re.search(r"poemId:\s*'([^']+)'", block)
            title_m = re.search(r"title:\s*'《([^》]+)》'", block)
            if not title_m:
                title_m = re.search(r"title:\s*'([^']+)'", block)
            author_m = re.search(r"author:\s*'【[^】]+】([^']+)'", block)
            recite_m = re.search(r"recite:\s*'([^']+)'", block)
            if not (pid_m and title_m and recite_m):
                continue
            pid = pid_m.group(1)
            if pid in seen:
                continue
            seen.add(pid)
            title = title_m.group(1)
            author = author_m.group(1) if author_m else ''
            recite = recite_m.group(1)
            poems.append({
                'id': pid,
                'title': title,
                'author': author,
                'full': recite,
                'meta': title + '，' + author + '。'
            })
    return poems


async def generate_one(text, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return 'skip'
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(out_path)
    return 'ok'


def sync_to_wechat(poem_ids):
    os.makedirs(WX_OUT_DIR, exist_ok=True)
    copied = 0
    for pid in poem_ids:
        for suffix in ('', '_meta'):
            name = pid + suffix + '.mp3'
            src = os.path.join(OUT_DIR, name)
            dst = os.path.join(WX_OUT_DIR, name)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
                copied += 1
    return copied


async def main():
    poems = load_poems()
    g3_poems = load_grade3_poems()
    g3_ids = {p['id'] for p in g3_poems}
    poem_ids = {p['id'] for p in poems}
    # 三年级预习诗：跳过一二年级 poems.js 里已有的 id（如 jueju）
    extra_g3 = [p for p in g3_poems if p['id'] not in poem_ids]

    if not poems and not g3_poems:
        print('未解析到诗词数据')
        sys.exit(1)

    tasks = []
    for p in poems:
        speak_full = SPEAK_OVERRIDES.get(p['id'], p['full'])
        tasks.append((speak_full, os.path.join(OUT_DIR, p['id'] + '.mp3'), p['title']))
        tasks.append((p['meta'], os.path.join(OUT_DIR, p['id'] + '_meta.mp3'), p['title'] + '（诗名）'))

    for p in extra_g3:
        tasks.append((p['full'], os.path.join(OUT_DIR, p['id'] + '.mp3'), '三年级·' + p['title']))
        tasks.append((p['meta'], os.path.join(OUT_DIR, p['id'] + '_meta.mp3'), '三年级·' + p['title'] + '（诗名）'))

    print(f'古诗词音频：一二年级 {len(poems)} 首 + 三年级新增 {len(extra_g3)} 首 → 共 {len(tasks)} 个文件')
    sem = asyncio.Semaphore(6)
    ok = skip = 0
    lock = asyncio.Lock()

    async def worker(text, path, label):
        nonlocal ok, skip
        async with sem:
            result = await generate_one(text, path)
            async with lock:
                if result == 'ok':
                    ok += 1
                    print(f'  OK  {label}')
                else:
                    skip += 1

    await asyncio.gather(*[worker(t, p, l) for t, p, l in tasks])

    sync_ids = g3_ids | poem_ids
    wx_n = sync_to_wechat(sync_ids)
    print(f'完成：新生成 {ok} 个，已存在跳过 {skip} 个 → {OUT_DIR}')
    print(f'已同步 {wx_n} 个 MP3 到小程序 → {WX_OUT_DIR}')


if __name__ == '__main__':
    asyncio.run(main())
