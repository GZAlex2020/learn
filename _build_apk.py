# -*- coding: utf-8 -*-
"""打包 Android APK（Capacitor · 离线可用 · 一键含音频）"""
import argparse
import os
import re
import shutil
import subprocess
import sys
import urllib.request
import zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
APK_DIR = os.path.join(ROOT, 'android-apk')
OUT_DIR = os.path.join(ROOT, '输出')
TOOLS = os.path.join(ROOT, 'tools')
JDK_DIR = os.path.join(TOOLS, 'jdk-21')
JDK_ZIP = os.path.join(TOOLS, 'jdk-21.zip')
PINYIN_DIR = os.path.join(ROOT, '语文', '网页互动', 'audio', 'pinyin')
CHARS_DIR = os.path.join(ROOT, '语文', '网页互动', 'audio', 'chars')
WORDS_DIR = os.path.join(ROOT, '语文', '网页互动', 'audio', 'words')
MATH_PHRASES_DIR = os.path.join(ROOT, '数学', '网页互动', 'audio', 'phrases')
JDK_URL = (
    'https://github.com/adoptium/temurin21-binaries/releases/download/'
    'jdk-21.0.5%2B11/OpenJDK21U-jdk_x64_windows_hotspot_21.0.5_11.zip'
)

ANDROID_SDK = os.environ.get('ANDROID_HOME') or os.environ.get('ANDROID_SDK_ROOT') or r'F:\Android\Sdk'


def run(cmd, cwd=None, env=None):
    if sys.platform == 'win32' and cmd and not cmd[0].endswith('.exe') and not cmd[0].endswith('.bat'):
        if cmd[0] in ('npm', 'npx', 'node'):
            cmd = [cmd[0] + ('.cmd' if cmd[0] != 'node' else '.exe')] + cmd[1:]
    print('>', ' '.join(cmd))
    subprocess.check_call(cmd, cwd=cwd or ROOT, env=env)


def java_version(java_home):
    java = os.path.join(java_home, 'bin', 'java.exe')
    try:
        out = subprocess.check_output([java, '-version'], stderr=subprocess.STDOUT, env=build_env(java_home))
        text = out.decode('utf-8', errors='ignore')
        m = re.search(r'version\s+"?(\d+)(?:\.\d+)?', text)
        if m:
            return int(m.group(1))
    except (subprocess.CalledProcessError, OSError, ValueError):
        pass
    return 0


def java_works(java_home, min_version=21):
    java = os.path.join(java_home, 'bin', 'java.exe')
    if not os.path.isfile(java):
        return False
    try:
        subprocess.check_output([java, '-version'], stderr=subprocess.STDOUT, env=build_env(java_home))
        return java_version(java_home) >= min_version
    except (subprocess.CalledProcessError, OSError):
        return False


def find_java():
    candidates = []
    if os.path.isdir(JDK_DIR):
        for name in os.listdir(JDK_DIR):
            candidates.append(os.path.join(JDK_DIR, name))
    if os.environ.get('JAVA_HOME'):
        candidates.append(os.environ['JAVA_HOME'])
    for home in candidates:
        if java_works(home):
            return home
    return None


def ensure_jdk():
    home = find_java()
    if home:
        print('JDK:', home)
        return home

    print('未检测到 Java 21，正在下载 JDK 21（约 190MB，仅首次需要）…')
    os.makedirs(TOOLS, exist_ok=True)
    if os.path.isdir(JDK_DIR):
        shutil.rmtree(JDK_DIR)

    def progress(block, block_size, total):
        if total <= 0:
            return
        pct = min(100, block * block_size * 100 // total)
        sys.stdout.write('\r下载进度: %d%%' % pct)
        sys.stdout.flush()

    urllib.request.urlretrieve(JDK_URL, JDK_ZIP, progress)
    print('\n解压 JDK …')
    with zipfile.ZipFile(JDK_ZIP, 'r') as zf:
        zf.extractall(JDK_DIR)
    try:
        os.remove(JDK_ZIP)
    except OSError:
        pass

    home = find_java()
    if not home:
        raise SystemExit('JDK 安装失败，请手动安装 Java 21 后重试')
    print('JDK 就绪:', home)
    return home


def build_env(java_home):
    env = os.environ.copy()
    env['JAVA_HOME'] = java_home
    env['ANDROID_HOME'] = ANDROID_SDK
    env['ANDROID_SDK_ROOT'] = ANDROID_SDK
    env['PATH'] = os.path.join(java_home, 'bin') + os.pathsep + env.get('PATH', '')
    pt = os.path.join(ANDROID_SDK, 'platform-tools')
    if os.path.isdir(pt):
        env['PATH'] = pt + os.pathsep + env['PATH']
    return env


def count_mp3(folder):
    if not os.path.isdir(folder):
        return 0
    return sum(1 for name in os.listdir(folder) if name.lower().endswith('.mp3'))


def ensure_assets(skip_audio=False):
    icons = os.path.join(ROOT, 'app', 'icons', 'icon-192.png')
    if not os.path.isfile(icons):
        print('[1/5] 生成 App 图标 …')
        run([sys.executable, os.path.join(ROOT, '_gen_app_icons.py')])
    else:
        print('[1/5] App 图标已就绪')

    if skip_audio:
        print('[2/5] 跳过音频（--skip-audio）')
        print('[3/5] 跳过音频（--skip-audio）')
        print('[4/5] 跳过音频（--skip-audio）')
        return

    print('[2/5] 拼音读音 MP3 …')
    run([sys.executable, os.path.join(ROOT, '_gen_pinyin_audio.py')])

    print('[3/5] 识字 / 词语 MP3 …')
    run([sys.executable, os.path.join(ROOT, '_gen_audio.py')])

    print('[4/5] 数学朗读 MP3 …')
    run([sys.executable, os.path.join(ROOT, '_gen_math_audio.py')])

    print('[5/5] 古诗词朗读 MP3 …')
    run([sys.executable, os.path.join(ROOT, '_gen_poem_audio.py')])

    pc = count_mp3(PINYIN_DIR)
    cc = count_mp3(CHARS_DIR)
    wc = count_mp3(WORDS_DIR)
    mc = count_mp3(MATH_PHRASES_DIR)
    poc = count_mp3(os.path.join(ROOT, '语文', '网页互动', 'audio', 'poems'))
    print('  音频就绪：拼音 %d · 识字 %d · 词语 %d · 数学 %d · 诗词 %d' % (pc, cc, wc, mc, poc))


def main():
    parser = argparse.ArgumentParser(description='一键打包 Android APK')
    parser.add_argument('--skip-audio', action='store_true', help='跳过音频生成（包更小，读音需联网）')
    args = parser.parse_args()

    print('=' * 52)
    print('  暑假复习 · 自动打包 APK')
    print('=' * 52)

    if not os.path.isdir(ANDROID_SDK):
        raise SystemExit('未找到 Android SDK，请设置 ANDROID_HOME（当前: %s）' % ANDROID_SDK)

    ensure_assets(skip_audio=args.skip_audio)

    print('[5/5] 编译 Android APK …')

    java_home = ensure_jdk()
    env = build_env(java_home)

    if not os.path.isdir(os.path.join(APK_DIR, 'node_modules')):
        print('安装 npm 依赖 …')
        run(['npm', 'install'], cwd=APK_DIR, env=env)

    run(['node', os.path.join(ROOT, '_sync_www.js')], env=env)

    android_proj = os.path.join(APK_DIR, 'android')
    if not os.path.isdir(android_proj):
        print('初始化 Android 工程 …')
        run(['npx', 'cap', 'add', 'android'], cwd=APK_DIR, env=env)

    run(['npx', 'cap', 'sync', 'android'], cwd=APK_DIR, env=env)

    gradle_props = os.path.join(android_proj, 'gradle.properties')
    if os.path.isfile(gradle_props):
        with open(gradle_props, 'r', encoding='utf-8') as f:
            props = f.read()
        if 'android.overridePathCheck=true' not in props:
            with open(gradle_props, 'a', encoding='utf-8') as f:
                f.write('\nandroid.overridePathCheck=true\n')

    gradlew = os.path.join(android_proj, 'gradlew.bat')
    if not os.path.isfile(gradlew):
        raise SystemExit('未找到 gradlew.bat')

    print('编译 APK（首次较慢，请耐心等待）…')
    run([gradlew, 'assembleDebug'], cwd=android_proj, env=env)

    src_apk = os.path.join(
        android_proj, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'
    )
    if not os.path.isfile(src_apk):
        raise SystemExit('编译完成但未找到 APK: %s' % src_apk)

    os.makedirs(OUT_DIR, exist_ok=True)
    dst_apk = os.path.join(OUT_DIR, '暑假复习.apk')
    shutil.copy2(src_apk, dst_apk)

    print('')
    print('=' * 52)
    print('  APK 已生成')
    print('=' * 52)
    print('  文件: %s' % dst_apk)
    print('  大小: %.1f MB' % (os.path.getsize(dst_apk) / 1048576))
    print('-' * 52)
    print('  传到安卓手机安装即可（需允许「未知来源」）')
    print('  安装后无需电脑服务器，可离线练习')
    if not args.skip_audio:
        print('  已含拼音 + 识字读音，可完全离线')
    print('=' * 52)


if __name__ == '__main__':
    main()
