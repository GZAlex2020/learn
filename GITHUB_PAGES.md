# GitHub Pages 网页版部署说明

本仓库提供独立的静态网页版，目录为 **`pages/`**（ASCII 路径：`app` / `zh` / `math`），可直接放到 GitHub Pages。

本地预览或更新网页版资源：

```bash
node _build_pages.js
```

构建后可用任意静态服务器打开，例如：

```bash
npx --yes serve pages
```

浏览器访问提示的地址即可。

---

## 一、推送到 GitHub

若仓库尚未初始化：

```bash
cd "一二年级暑假复习"
git init
git add .
git commit -m "Add GitHub Pages web build"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

> `pages/` 含音频约 30MB，首次推送可能稍慢。单文件均远小于 GitHub 100MB 限制。

---

## 二、开启 GitHub Pages（推荐：Actions）

1. 打开仓库 **Settings → Pages**
2. **Build and deployment → Source** 选择 **GitHub Actions**
3. 推送后会自动运行工作流 `.github/workflows/deploy-pages.yml`
4. 也可在 **Actions** 页手动运行 **Deploy GitHub Pages**

完成后访问：

```text
https://<你的用户名>.github.io/<仓库名>/
```

---

## 三、备选：从分支的 /docs 发布

若不想用 Actions，可把构建结果拷到仓库根的 `docs/`（注意：本仓库 `docs/` 目前放的是 PDF 资料，会冲突，不建议覆盖）。

更稳妥的做法仍是 **Actions + `pages/` 目录**。

---

## 四、更新网页内容后

改完语文/数学互动页面或数据后，重新构建并提交：

```bash
node _build_pages.js
git add pages
git commit -m "Update web pages"
git push
```

Actions 会自动重新部署。

---

## 说明

| 项目 | 说明 |
|------|------|
| 学习记录 | 存在浏览器 `localStorage`，换设备不同步 |
| 离线 | 打开过的页面/音频可被 Service Worker 缓存 |
| 安卓原生 | 仍可用 `python _build_apk.py --skip-audio` 打 APK |
| 小程序 | 独立于网页版，互不影响 |
