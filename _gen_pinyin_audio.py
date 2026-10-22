# -*- coding: utf-8 -*-
"""从标准拼音录音库复制 MP3（davinfifield + zispace 补充韵母）"""
import asyncio
import json
import os
import re
import shutil
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(__file__)
BASE = os.path.join(ROOT, '语文', '网页互动', 'audio', 'pinyin')
SRC_CACHE = os.path.join(BASE, '_src')
REMOTE = 'https://raw.githubusercontent.com/davinfifield/mp3-chinese-pinyin-sound/master/mp3/'
ZISPACE = 'https://raw.githubusercontent.com/zispace/hanyu-pinyin-audio/data/'

try:
    import edge_tts
except ImportError:
    os.system(f'{sys.executable} -m pip install edge-tts -q')
    import edge_tts

VOICE = 'zh-CN-XiaoxiaoNeural'

# speak 与录音库文件名不一致时的手动映射
MANUAL = {
    'rī': 'ri1.mp3',
}

# davinfifield 缺失时，从 zispace 取的独立韵母录音
ZISPACE_ALT = {
    'o1.mp3': 'digmandarin.com/audio/o1.mp3',
    'eng1.mp3': 'digmandarin.com/audio/eng1.mp3',
}

# 个别 slug 强制用独立韵母录音（不走整音节库）
SLUG_ZISPACE = {
    'ym_er': 'sreading.org/pinyin/er.mp3',
    'ym_ong': 'sreading.org/pinyin/ong.mp3',
}

TONE = {
    'ā': ('a', 1), 'á': ('a', 2), 'ǎ': ('a', 3), 'à': ('a', 4),
    'ē': ('e', 1), 'é': ('e', 2), 'ě': ('e', 3), 'è': ('e', 4),
    'ī': ('i', 1), 'í': ('i', 2), 'ǐ': ('i', 3), 'ì': ('i', 4),
    'ō': ('o', 1), 'ó': ('o', 2), 'ǒ': ('o', 3), 'ò': ('o', 4),
    'ū': ('u', 1), 'ú': ('u', 2), 'ǔ': ('u', 3), 'ù': ('u', 4),
    'ǖ': ('u', 1), 'ǘ': ('u', 2), 'ǚ': ('u', 3), 'ǜ': ('u', 4),
}

_zispace_misc_cache = None


def zispace_misc_path(filename):
    """zispace misc/2-韵母表/ 下的独立韵母录音"""
    global _zispace_misc_cache
    if _zispace_misc_cache is None:
        url = 'https://api.github.com/repos/zispace/hanyu-pinyin-audio/git/trees/data?recursive=1'
        data = json.loads(urllib.request.urlopen(url, timeout=30).read())
        _zispace_misc_cache = {}
        for item in data.get('tree', []):
            path = item.get('path', '')
            if path.startswith('misc/') and path.endswith('.mp3'):
                _zispace_misc_cache[os.path.basename(path)] = path
    return _zispace_misc_cache.get(filename)


def speak_to_mp3(speak):
    if speak in MANUAL:
        return MANUAL[speak]
    base = []
    tone = 1
    for ch in speak:
        if ch in TONE:
            letter, t = TONE[ch]
            base.append(letter)
            tone = t
        elif ch.isalpha():
            base.append(ch.lower())
    return ''.join(base) + str(tone) + '.mp3'


def collect_quiz_and_lesson_pinyin(pinyin_js_content):
    """收集拼音练习题选项与课文生字拼音"""
    found = set()

    m_quiz = re.search(r'PINYIN_QUIZ:\s*\[(.*?)\]\s*,', pinyin_js_content, re.S)
    if m_quiz:
        for opt in re.findall(r"'([^']+)'", m_quiz.group(1)):
            if re.search(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]', opt):
                found.add(opt)

    lessons_js = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'lessons.js')
    if os.path.isfile(lessons_js):
        with open(lessons_js, 'r', encoding='utf-8') as f:
            lesson_content = f.read()
        for py in re.findall(r"pinyin:\s*'([^']+)'", lesson_content):
            if re.search(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]', py):
                found.add(py)

    return sorted(found)


def load_items():
    js_path = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'pinyin.js')
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    items = []

    def parse_block(block_name, id_key, prefix):
        pattern = rf"{block_name}:\s*\[(.*?)\]\s*,"
        m = re.search(pattern, content, re.S)
        if not m:
            return
        block = m.group(1)
        for obj in re.finditer(r'\{([^{}]+)\}', block):
            chunk = obj.group(1)
            kid = re.search(rf"{id_key}:\s*'([^']+)'", chunk)
            sp = re.search(r"speak:\s*'([^']+)'", chunk)
            py = re.search(r"pinyin:\s*'([^']+)'", chunk)
            if not kid:
                py2 = re.search(r"py:\s*'([^']+)'", chunk)
                if py2:
                    kid = py2
            if not kid:
                continue
            key = kid.group(1)
            speak = sp.group(1) if sp else (py.group(1) if py else key)
            slug = prefix + key.replace('ü', 'v')
            items.append({'slug': slug, 'speak': speak})

    parse_block('SHENGMU_EXAMPLES', 'sm', 'sm_')
    parse_block('YUNMU_EXAMPLES', 'ym', 'ym_')
    parse_block('ZHENGTIRENDU', 'py', 'zt_')

    # 拼音练习题、课文生字里的带调拼音
    seen = {item['speak'] for item in items}
    for speak in collect_quiz_and_lesson_pinyin(content):
        slug = 'py_' + speak.replace('ü', 'v')
        if speak not in seen:
            items.append({'slug': slug, 'speak': speak})
            seen.add(speak)

    chart_js = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'pinyin-chart.js')
    if os.path.isfile(chart_js):
        with open(chart_js, 'r', encoding='utf-8') as f:
            chart = f.read()
        m_sd = re.search(r'SHENGDIAO:\s*\[(.*?)\]\s*,', chart, re.S)
        if m_sd:
            for obj in re.finditer(r'\{([^{}]+)\}', m_sd.group(1)):
                chunk = obj.group(1)
                tone = re.search(r'tone:\s*(\d+)', chunk)
                py = re.search(r"pinyin:\s*'([^']+)'", chunk)
                if tone and py:
                    items.append({'slug': 'sd_' + tone.group(1), 'speak': py.group(1)})

    return items


def download(url, local):
    os.makedirs(os.path.dirname(local), exist_ok=True)
    urllib.request.urlretrieve(url, local)
    return local


def fetch_zispace_rel(rel_path):
    os.makedirs(SRC_CACHE, exist_ok=True)
    cache_name = rel_path.replace('/', '_')
    local = os.path.join(SRC_CACHE, 'zs_' + cache_name)
    if os.path.exists(local) and os.path.getsize(local) > 1000:
        return local, f'zispace:{rel_path}'
    url = ZISPACE + urllib.parse.quote(rel_path, safe='/')
    print(f'  使用 zispace/{rel_path} ...')
    download(url, local)
    return local, f'zispace:{rel_path}'


def fetch_src(mp3_name):
    os.makedirs(SRC_CACHE, exist_ok=True)
    local = os.path.join(SRC_CACHE, mp3_name.replace('/', '_'))
    if os.path.exists(local) and os.path.getsize(local) > 1000:
        return local, mp3_name

    # 1) davinfifield 主库
    try:
        print(f'  下载 {mp3_name} ...')
        download(REMOTE + mp3_name, local)
        if os.path.getsize(local) > 1000:
            return local, mp3_name
    except (urllib.error.HTTPError, urllib.error.URLError, OSError):
        pass

    # 2) zispace 固定映射（o / eng）
    alt = ZISPACE_ALT.get(mp3_name)
    if alt:
        url = ZISPACE + alt
        print(f'  {mp3_name} 主库缺失，改用 zispace/{alt} ...')
        download(url, local)
        return local, f'zispace:{alt}'

    # 3) zispace misc 韵母表（ing / ong 等）
    misc = zispace_misc_path(mp3_name)
    if misc:
        url = ZISPACE + urllib.parse.quote(misc, safe='/')
        print(f'  {mp3_name} 主库缺失，改用 zispace/{misc} ...')
        download(url, local)
        return local, f'zispace:{misc}'

    raise urllib.error.HTTPError(
        REMOTE + mp3_name, 404, 'not found in any source', None, None
    )


async def fallback_tts(speak, out_path):
    """录音库缺失时，用汉字或拼音 TTS"""
    tts_map = {
        'ō': '喔',
        'ēng': '鞥',
        'īng': '英',
        'ōng': '翁',
    }
    text = tts_map.get(speak, speak)
    await edge_tts.Communicate(text, VOICE, rate='-10%').save(out_path)


async def main_async():
    items = load_items()
    print(f'共 {len(items)} 个拼音读音（标准录音库）')
    ok = 0
    missing = []
    os.makedirs(BASE, exist_ok=True)

    for i, item in enumerate(items):
        dst = os.path.join(BASE, item['slug'] + '.mp3')
        try:
            if item['slug'] in SLUG_ZISPACE:
                src, src_tag = fetch_zispace_rel(SLUG_ZISPACE[item['slug']])
            else:
                mp3_name = speak_to_mp3(item['speak'])
                src, src_tag = fetch_src(mp3_name)
            shutil.copy2(src, dst)
        except (urllib.error.HTTPError, urllib.error.URLError, OSError) as e:
            mp3_name = speak_to_mp3(item['speak'])
            print(f'  {mp3_name} 全部缺失，TTS 生成 {item["speak"]} ...')
            await fallback_tts(item['speak'], dst)
            src_tag = f'TTS:{item["speak"]}'
            if isinstance(e, urllib.error.HTTPError):
                missing.append((item['slug'], item['speak'], mp3_name))

        ok += 1
        print(f"[{i+1}/{len(items)}] {item['slug']} <- {src_tag} OK")

    print(f'完成 {ok} 个')
    if missing:
        print('录音库缺失（已 TTS 补全）:', missing)


def main():
    asyncio.run(main_async())


if __name__ == '__main__':
    main()
