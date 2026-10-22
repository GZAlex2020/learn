# -*- coding: utf-8 -*-
"""启动本地服务器，供 iPad / 手机安装 PWA 并访问互动练习"""
import http.server
import os
import socket
import sys
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 8765


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), format % args))


def get_lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'


def main():
    os.chdir(ROOT)
    lan = get_lan_ip()
    url_local = 'http://127.0.0.1:%d/app/' % PORT
    url_lan = 'http://%s:%d/app/' % (lan, PORT)

    print('=' * 50)
    print('  暑假复习 · 互动练习服务器')
    print('=' * 50)
    print('  本机访问:  %s' % url_local)
    print('  手机访问:  %s' % url_lan)
    print('  （安卓 Chrome / iPad Safari 均可安装）')
    print('-' * 50)
    print('  安卓: Chrome 打开 → 安装应用 / 添加到主屏幕')
    print('  iPad: Safari 打开 → 分享 → 添加到主屏幕')
    print('  按 Ctrl+C 停止服务器')
    print('=' * 50)

    try:
        webbrowser.open(url_local)
    except Exception:
        pass

    server = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n已停止')
        server.server_close()


if __name__ == '__main__':
    main()
