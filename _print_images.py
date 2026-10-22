# -*- coding: utf-8 -*-
"""为「看图列式」等题目生成简单示意图（PNG）"""
import os
import re
import hashlib

try:
    from PIL import Image, ImageDraw
except ImportError:
    Image = None

ROOT = os.path.dirname(__file__)
CACHE = os.path.join(ROOT, '打印版', '_images')

SHAPE_MAP = {
    '圆': 'circle', '○': 'circle', 'circle': 'circle',
    '三角': 'triangle', '△': 'triangle', 'triangle': 'triangle',
}


def _parse_spec(text):
    """从题目文字解析：左 N 个、右 M 个、形状"""
    patterns = [
        (r'图[：:]\s*左(?:边)?\s*(\d+)\s*个(圆|三角|○|△)?[，,]\s*右(?:边)?\s*(\d+)\s*个(圆|三角|○|△)?', 1, 3, 2),
        (r'左(?:边)?\s*(\d+)\s*个(圆|三角|○|△)?[，,]\s*右(?:边)?\s*(\d+)\s*个(圆|三角|○|△)?', 1, 3, 2),
        (r'看图列式[：:]\s*左(?:边)?\s*(\d+)\s*个[，,]\s*右(?:边)?\s*(\d+)\s*个', 1, 2, None),
    ]
    for pat, li, ri, si in patterns:
        m = re.search(pat, text)
        if not m:
            continue
        left = int(m.group(li))
        right = int(m.group(ri))
        shape_raw = m.group(si) if si and m.lastindex >= si else '圆'
        shape = SHAPE_MAP.get(shape_raw or '圆', 'circle')
        return left, right, shape
    return None


def extract_picture_spec(text):
    if '看图' not in text and '左' not in text:
        return None
    return _parse_spec(text)


def _draw_shape(draw, shape, cx, cy, r, fill):
    if shape == 'triangle':
        draw.polygon([(cx, cy - r), (cx - r, cy + r), (cx + r, cy + r)], fill=fill, outline='#333333')
    else:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline='#333333')


def _layout_positions(count, x0, x1, y, max_per_row=5):
    if count <= 0:
        return []
    gap = max(36, (x1 - x0) // max(count, 1))
    start = x0 + gap // 2
    return [(start + i * gap, y) for i in range(count)]


def render_picture(left, right, shape='circle', out_path=None):
    if Image is None:
        return None
    os.makedirs(CACHE, exist_ok=True)
    key = f'{shape}_{left}_{right}'
    if out_path is None:
        out_path = os.path.join(CACHE, key + '.png')
    if os.path.isfile(out_path):
        return out_path

    w, h = 520, 180
    img = Image.new('RGB', (w, h), 'white')
    draw = ImageDraw.Draw(img)
    draw.rectangle([8, 8, w - 8, h - 8], outline='#999999', width=2)

    mid = w // 2
    draw.line([mid, 20, mid, h - 20], fill='#cccccc', width=2)
    draw.text((mid // 2 - 10, 14), '左', fill='#555555')
    draw.text((mid + mid // 2 - 10, 14), '右', fill='#555555')

    colors = ('#4A90D9', '#E85D5D')
    r = 14
    y = h // 2 + 8
    for i, (cnt, x0, x1) in enumerate(((left, 30, mid - 20), (right, mid + 20, w - 30))):
        for cx, cy in _layout_positions(cnt, x0, x1, y):
            _draw_shape(draw, shape, cx, cy, r, colors[i])

    img.save(out_path, 'PNG')
    return out_path


def picture_for_line(text):
    spec = extract_picture_spec(text)
    if not spec:
        return None
    left, right, shape = spec
    return render_picture(left, right, shape)


def demo_picture(shape='circle'):
    """概念题「看图」用的小示意图"""
    return render_picture(3, 2, shape)
