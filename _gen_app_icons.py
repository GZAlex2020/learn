# -*- coding: utf-8 -*-
"""生成 PWA 应用图标"""
import os
import struct
import zlib

ROOT = os.path.dirname(__file__)
OUT = os.path.join(ROOT, 'app', 'icons')
os.makedirs(OUT, exist_ok=True)


def png_chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)


def write_png(path, size, rgb):
    r, g, b = rgb
    raw = b''
    for y in range(size):
        row = b'\x00'
        for x in range(size):
            # 圆角方形背景 + 简单书本色块
            cx, cy = size / 2, size / 2
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            corner = size * 0.42
            if dist > corner:
                row += bytes([237, 242, 247])
            elif size * 0.15 < x < size * 0.55 and size * 0.25 < y < size * 0.75:
                row += bytes([44, 82, 130])
            elif size * 0.52 < x < size * 0.85 and size * 0.25 < y < size * 0.75:
                row += bytes([72, 187, 120])
            else:
                row += bytes([r, g, b])
        raw += row
    compressed = zlib.compress(raw, 9)
    ihdr = struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)
    data = b'\x89PNG\r\n\x1a\n'
    data += png_chunk(b'IHDR', ihdr)
    data += png_chunk(b'IDAT', compressed)
    data += png_chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(data)


for name, sz in [('icon-192.png', 192), ('icon-512.png', 512), ('apple-touch-icon.png', 180)]:
    write_png(os.path.join(OUT, name), sz, (235, 248, 255))
    print('OK', name)
