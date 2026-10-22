# -*- coding: utf-8 -*-
"""使用 Edge 神经网络语音生成标准普通话 MP3"""
import asyncio
import os
import sys

try:
    import edge_tts
except ImportError:
    os.system(f'{sys.executable} -m pip install edge-tts -q')
    import edge_tts

BASE = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'audio')
VOICE = 'zh-CN-XiaoxiaoNeural'  # 标准普通话，适合儿童学习
RATE = '-5%'  # 稍慢，更清晰


def text_key(text):
    return '_'.join(format(ord(c), 'x') for c in text)


def collect_texts():
    chars = set()
    words = set()

    # 从 pinyin.js 提取（简单解析）
    pinyin_js = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'js', 'data', 'pinyin.js')
    with open(pinyin_js, 'r', encoding='utf-8') as f:
        content = f.read()

    import re
    for m in re.finditer(r"char:\s*'([^']+)'", content):
        chars.add(m.group(1))
    for m in re.finditer(r"word:\s*'([^']+)'", content):
        words.add(m.group(1))
    for m in re.finditer(r"example:\s*'([^']+)'", content):
        chars.add(m.group(1))

    chars_js = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'js', 'data', 'characters.js')
    with open(chars_js, 'r', encoding='utf-8') as f:
        content = f.read()
    for m in re.finditer(r"char:\s*'([^']+)'", content):
        chars.add(m.group(1))
    for m in re.finditer(r"word:\s*'([^']+)'", content):
        words.add(m.group(1))

    chart_js = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'js', 'data', 'pinyin-chart.js')
    with open(chart_js, 'r', encoding='utf-8') as f:
        content = f.read()
    for m in re.finditer(r"example:\s*'([^']+)'", content):
        chars.add(m.group(1))
    for m in re.finditer(r"word:\s*'([^']+)'", content):
        words.add(m.group(1))

    lessons_js = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'js', 'data', 'lessons.js')
    if os.path.isfile(lessons_js):
        with open(lessons_js, 'r', encoding='utf-8') as f:
            content = f.read()
        for m in re.finditer(r"char:\s*'([^']+)'", content):
            chars.add(m.group(1))
        for m in re.finditer(r"word:\s*'([^']+)'", content):
            words.add(m.group(1))

    questions_js = os.path.join(os.path.dirname(__file__), '语文', '网页互动', 'js', 'data', 'questions.js')
    if os.path.isfile(questions_js):
        with open(questions_js, 'r', encoding='utf-8') as f:
            qcontent = f.read()
        m_read = re.search(r'READ_QUESTIONS:\s*\[(.*?)\]\s*,', qcontent, re.S)
        if m_read:
            for obj in re.finditer(r'\{([^{}]+)\}', m_read.group(1)):
                chunk = obj.group(1)
                for field in ('text', 'task', 'keyword'):
                    hit = re.search(rf"{field}:\s*'([^']+)'", chunk)
                    if hit:
                        words.add(hit.group(1))

    if os.path.isfile(chars_js):
        with open(chars_js, 'r', encoding='utf-8') as f:
            ccontent = f.read()
        m_kw = re.search(r'QUESTION_WORDS:\s*\[(.*)\]\s*\n\s*\};', ccontent, re.S)
        if m_kw:
            for obj in re.finditer(r'\{([^{}]+)\}', m_kw.group(1)):
                chunk = obj.group(1)
                word = re.search(r"word:\s*'([^']+)'", chunk)
                meaning = re.search(r"meaning:\s*'([^']+)'", chunk)
                if word:
                    words.add(word.group(1))
                if meaning:
                    words.add(meaning.group(1))
                if word and meaning:
                    words.add(word.group(1) + '的意思是：' + meaning.group(1))

    words.update(chars)
    return sorted(chars), sorted(words)


async def generate_one(text, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return 'skip'
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(out_path)
    return 'ok'


async def main():
    chars, words = collect_texts()
    char_dir = os.path.join(BASE, 'chars')
    word_dir = os.path.join(BASE, 'words')
    os.makedirs(char_dir, exist_ok=True)
    os.makedirs(word_dir, exist_ok=True)

    tasks = []
    for c in chars:
        path = os.path.join(char_dir, text_key(c) + '.mp3')
        tasks.append((c, path, 'char'))

    for w in words:
        if len(w) <= 1:
            continue
        path = os.path.join(word_dir, text_key(w) + '.mp3')
        tasks.append((w, path, 'word'))

    print(f'共需生成：{len(tasks)} 个音频文件')
    sem = asyncio.Semaphore(8)
    ok = skip = 0
    lock = asyncio.Lock()

    async def worker(i, text, path, kind):
        nonlocal ok, skip
        async with sem:
            result = await generate_one(text, path)
            async with lock:
                if result == 'ok':
                    ok += 1
                    if ok % 20 == 0 or ok <= 5:
                        print(f'[{i + 1}/{len(tasks)}] {kind} {text} -> OK')
                else:
                    skip += 1

    await asyncio.gather(*[
        worker(i, text, path, kind)
        for i, (text, path, kind) in enumerate(tasks)
    ])
    print(f'完成：新生成 {ok} 个，已存在跳过 {skip} 个')


if __name__ == '__main__':
    asyncio.run(main())
