# -*- coding: utf-8 -*-
import os
import re
import urllib.request

ROOT = os.path.dirname(__file__)
JS = os.path.join(ROOT, '语文', '网页互动', 'js', 'data', 'pinyin.js')
REMOTE = 'https://raw.githubusercontent.com/davinfifield/mp3-chinese-pinyin-sound/master/mp3/'
TONE = {
    'ā': ('a', 1), 'á': ('a', 2), 'ǎ': ('a', 3), 'à': ('a', 4),
    'ē': ('e', 1), 'é': ('e', 2), 'ě': ('e', 3), 'è': ('e', 4),
    'ī': ('i', 1), 'í': ('i', 2), 'ǐ': ('i', 3), 'ì': ('i', 4),
    'ō': ('o', 1), 'ó': ('o', 2), 'ǒ': ('o', 3), 'ò': ('o', 4),
    'ū': ('u', 1), 'ú': ('u', 2), 'ǔ': ('u', 3), 'ù': ('u', 4),
    'ǖ': ('u', 1), 'ǘ': ('u', 2), 'ǚ': ('u', 3), 'ǜ': ('u', 4),
}
MANUAL = {'rī': 'ri1.mp3'}


def speak_to_mp3(speak):
    if speak in MANUAL:
        return MANUAL[speak]
    base, tone = [], 1
    for ch in speak:
        if ch in TONE:
            l, t = TONE[ch]
            base.append(l)
            tone = t
        elif ch.isalpha():
            base.append(ch.lower())
    return ''.join(base) + str(tone) + '.mp3'


def url_exists(name):
    try:
        r = urllib.request.urlopen(REMOTE + name, timeout=10)
        return r.getheader('Content-Length')
    except Exception:
        return None


with open(JS, encoding='utf-8') as f:
    js = f.read()


def parse_block(name, idk, prefix):
    m = re.search(rf'{name}:\s*\[(.*?)\]\s*,', js, re.S)
    items = []
    for obj in re.finditer(r'\{([^{}]+)\}', m.group(1)):
        c = obj.group(1)
        kid = re.search(rf"{idk}:\s*'([^']+)'", c)
        sp = re.search(r"speak:\s*'([^']+)'", c)
        if not kid:
            py2 = re.search(r"py:\s*'([^']+)'", c)
            if py2:
                kid = py2
        if not kid:
            continue
        key = kid.group(1)
        speak = sp.group(1) if sp else key
        slug = prefix + key.replace('ü', 'v')
        mp3 = speak_to_mp3(speak)
        items.append({'slug': slug, 'speak': speak, 'mp3': mp3})
    return items


all_items = (
    parse_block('SHENGMU_EXAMPLES', 'sm', 'sm_')
    + parse_block('YUNMU_EXAMPLES', 'ym', 'ym_')
    + parse_block('ZHENGTIRENDU', 'py', 'zt_')
)

print('slug\tspeak\tmp3\tremote')
missing = []
for x in all_items:
    sz = url_exists(x['mp3'])
    status = 'OK ' + str(sz) if sz else 'MISS'
    print(f"{x['slug']}\t{x['speak']}\t{x['mp3']}\t{status}")
    if not sz:
        missing.append(x)

print('\nMissing count:', len(missing))
