# -*- coding: utf-8 -*-
"""生成语文暑假 56 天每日一练（一年级复习 + 二年级预习）"""
import os
import random
import re

random.seed(42)

ROOT = os.path.dirname(__file__)
OUT = os.path.join(ROOT, '语文', '打印版', '04-每日一练', '暑假56天每日一练.md')
G1_MD = os.path.join(ROOT, '语文', '打印版', '02-识字卡片', '一年级核心识字300字.md')
G2_MD = os.path.join(ROOT, '语文', '打印版', '02-识字卡片', '二年级预习识字100字.md')

READ_G1 = [
    ('请选择正确的拼音', '选择', '我要选一个对的拼音'),
    ('请填空', '填空', '我要把空的地方写上'),
    ('请连线', '连线', '我要把左边和右边连起来'),
    ('请判断对错', '判断', '对的打√，错的打×'),
    ('照样子写词语', '照样子', '我要照着例子写'),
    ('读一读下面的句子', '读一读', '我要大声读出来'),
    ('比一比下面哪个字不同', '比一比', '我要找出不一样的'),
    ('用正确的字填空', '填空', '我要选合适的字填进去'),
]

READ_G2 = [
    ('阅读词语，选出表示「季节」的字', '选择', '春、夏、秋、冬都是季节'),
    ('填空：天气（  ）朗，适合出去玩', '填空', '我要填「晴」'),
    ('判断：「谦虚」和「骄傲」意思相反', '判断', '谦虚是不骄傲，这句话对'),
    ('用「读书」「思考」各说一句话', '写一写', '我要用这两个词造句'),
    ('数一数：「题目」里有几个字', '数一数', '「题」「目」两个字'),
    ('比一比：「暖」和「凉」哪个表示热', '比一比', '暖表示热，凉表示冷'),
    ('选择：下列哪个是课堂用语？「默写/跑步/游泳」', '选择', '默写是在课上写的'),
    ('填空：我们要（  ）实做人', '填空', '我要填「诚」'),
    ('读题：请把错误的字找出来', '判断', '我要找出写错的字'),
    ('连线：把「春-夏-秋-冬」和季节图片连起来', '连线', '我要把字和季节对应'),
    ('填空：小（  ）在（  ）上飞', '填空', '燕在天上飞'),
    ('选择：「查字典」的「查」是什么意思', '选择', '查是查找、查阅'),
    ('写一写：用「勤劳」造句', '写一写', '我要说勤劳的人'),
    ('判断：「懒惰」是不爱劳动', '判断', '懒惰就是偷懒，对'),
]


def parse_chars_from_md(path, grade):
    chars = []
    seen = set()
    with open(path, encoding='utf-8') as f:
        for line in f:
            m = re.match(r'\|\s*([^\|]+?)\s*\|\s*([^\|]+?)\s*\|\s*([^\|]+?)\s*\|', line)
            if not m:
                continue
            char, py, words = m.group(1).strip(), m.group(2).strip(), m.group(3).strip()
            if char in ('字', '---') or '拼音' in char or len(char) != 1:
                continue
            if char in seen:
                continue
            seen.add(char)
            word = words.split('、')[0]
            chars.append({'char': char, 'pinyin': py, 'word': word, 'grade': grade})
    return chars


def pinyin_options(correct, pool):
    opts = {correct}
    candidates = [c['pinyin'] for c in pool if c['pinyin'] != correct]
    random.shuffle(candidates)
    for py in candidates:
        if len(opts) >= 3:
            break
        opts.add(py)
    result = list(opts)[:3]
    random.shuffle(result)
    return ' / '.join(result)


def pick_chars_for_day(day, g1, g2):
    week = (day - 1) // 7 + 1
    g1_start = ((day - 1) * 5) % len(g1)
    g2_start = ((day - 1) * 3) % len(g2)

    if week <= 2:
        chars = [g1[(g1_start + i) % len(g1)] for i in range(5)]
        focus = '一年级复习'
    elif week <= 4:
        chars = [g1[(g1_start + i) % len(g1)] for i in range(4)]
        chars.append(g2[g2_start % len(g2)])
        focus = '一年级为主 · 二年级预习'
    else:
        chars = [g2[(g2_start + i) % len(g2)] for i in range(3)]
        chars += [g1[(g1_start + i) % len(g1)] for i in range(2)]
        focus = '二年级预习为主'
    return chars, focus


def make_fill_blank(item):
    char, word = item['char'], item['word']
    if char in word:
        return word.replace(char, '（  ）', 1), char
    return f'（  ）{word}', char


def main():
    g1 = parse_chars_from_md(G1_MD, 1)
    g2 = parse_chars_from_md(G2_MD, 2)
    pool = g1 + g2

    lines = [
        '# 暑假 56 天每日一练',
        '',
        '> 每天 1 页，约 15～20 分钟。先读题，再做题。',
        '> 第 1～4 周以一年级复习为主；第 5～8 周增加二年级预习字词与读题。',
        '',
        '---',
        '',
    ]

    for day in range(1, 57):
        week = (day - 1) // 7 + 1
        chars, focus = pick_chars_for_day(day, g1, g2)
        pinyin_chars = chars[:3]
        read_pool = READ_G2 if week >= 5 else READ_G1
        read = read_pool[(day - 1) % len(read_pool)]
        extra_char = chars[3] if len(chars) > 3 else chars[0]
        fill_q, fill_a = make_fill_blank(extra_char)

        lines += [
            f'## 第 {day} 天（第 {week} 周）',
            '',
            '**日期：** ____________    **完成：** □    **家长签字：** ____________',
            '',
            '### 一、拼音（3 题）—— 看字选拼音',
            '',
        ]
        for i, ch in enumerate(pinyin_chars, 1):
            opts = pinyin_options(ch['pinyin'], pool)
            lines += [
                f'{i}. 「{ch["char"]}」的正确拼音是？  {opts}',
                f'   **答案：{ch["pinyin"]}**',
                '',
            ]

        lines += [f'### 二、识字（5 字）—— {focus}', '']
        for i, ch in enumerate(chars, 1):
            tag = '（二年级）' if ch['grade'] == 2 else ''
            lines.append(
                f'{i}. **{ch["char"]}**{tag}  {ch["pinyin"]}  →  {ch["word"]}'
            )
        lines.append('')

        lines += [
            '### 三、读题（1 题）—— 读题目 + 说要求',
            '',
            f'**题目：** {read[0]}',
            f'**关键词：** {read[1]}',
            f'**孩子应说：** {read[2]}',
            '',
            '### 四、小练习（2 题）',
            '',
            f'1. 【选择】「{pinyin_chars[0]["char"]}」的正确拼音：'
            f'{pinyin_options(pinyin_chars[0]["pinyin"], pool)}',
            f'   **答案：{pinyin_chars[0]["pinyin"]}**',
            '',
            f'2. 【填空】{fill_q}',
            f'   **答案：{fill_a}**',
            '',
            '---',
            '',
        ]

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'已生成 {OUT}，共 56 天（G1 {len(g1)} 字 + G2 {len(g2)} 字）')


if __name__ == '__main__':
    main()
