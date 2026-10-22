# 微信小程序 · 暑假复习（完整版）

与 Android APK **功能对齐**的一升二暑假复习练习，含全部离线音频（约 26MB）。

## 功能清单

### 语文（packageZh）
| 模块 | 说明 |
|------|------|
| 互动拼音表 | 四声、声母、韵母、整体认读 |
| 拼音练习 | 看字选拼音 / 听音选字 |
| 声母韵母 | 点读学习 |
| 识字配对 | 字音配对 |
| 课文识字通关 | 按课练习、笔顺动画、进度保存 |
| 识字卡片 | 翻卡片听读音 |
| 读题训练 | 读懂题目要求 |
| 题目常用词 | 认读关键词 |

### 数学（packageMath）
| 模块 | 说明 |
|------|------|
| 口算练习 | 10/20/100 以内、乘除法 |
| 概念配对 | 符号与含义 |
| 概念卡片 | 翻卡片 |
| 读题训练 | 应用题 |
| 题目常用词 | 列式提示 |
| 乘法口诀 | 听口诀 / 听整行 / 读全部 |

### 通用
- 学习记录：仅 **完成且超过 1 分钟** 才保存
- 课文识字：**笔顺动画**（canvas + 本地 JSON，与网页/APK 一致）
- 课文通关进度：本地 storage 保存

## 快速开始

### 1. 同步资源（首次或更新后必跑）

```bash
python _sync_miniprogram_full.py
```

将拼音/识字/词语/数学朗读 MP3 及笔顺 JSON 复制到分包目录。

### 2. 导入微信开发者工具

- 目录：`wechat-miniprogram`
- AppID：测试号或填入 `project.config.json` 中的 `appid`

### 3. 发布

1. [微信公众平台](https://mp.weixin.qq.com/) 注册小程序
2. 修改 `project.config.json` 的 `appid`
3. 类目建议：教育 → 学习工具
4. **体积说明**：资源合计约 **26MB**，超过默认 20MB 上限时，需在公众平台 **申请提高分包大小**（教育类一般可批 30MB 及以上）
5. 上传代码 → 提交审核 → 发布

## 目录结构

```
wechat-miniprogram/
  pages/index/              总首页
  pages/records/            学习记录
  packageZh/
    pages/home/             语文入口
    pages/practice/         语文全部练习（单页多屏）
    pages/pinyin-chart/     互动拼音表
    audio/                  拼音·识字·词语 MP3
    data/strokes/           笔顺 JSON（课文识字动画）
    utils/                  数据、语音、stroke-writer.js
  packageMath/
    pages/home/             数学入口
    pages/practice/         数学全部练习
    audio/phrases/          数学朗读 MP3
  utils/                    学习记录等公共逻辑
```

## 与 APK 的区别

| | APK | 小程序 |
|---|---|---|
| 学习记录 | 不互通（各自 storage） | 规则相同 |
| 笔顺动画 | ✅ | ✅（课文识字） |
| 体积 | ~30MB 安装包 | ~26MB 分包资源 |
| 离线 | 完全离线 | 下载分包后离线可用 |

## 维护命令

```bash
# 网页内容更新后，同步小程序资源
python _sync_miniprogram_full.py
```

若仅更新了数学口诀音频，也可运行：

```bash
python _sync_miniprogram.py
```
