# 彭筱 · 水与生活之间 | XIAO PENG

彭筱的双语个人网站。阅读文章在 `content/posts/` 下，每篇一个 JSON 文件；GitHub Actions 在提交后自动构建并发布。原 Sites 网站独立保留。

## 首次配置自动发布

1. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
2. 上传本源码包里面的全部文件和文件夹到仓库根目录，包括 `.github`、`package.json`、`package-lock.json`，提交到 `main`。
3. 打开 **Actions → Publish personal website**，等待 build 和 deploy 都出现绿色成功标记。

工作流使用 GitHub 自动提供的 Pages 部署授权，不需要填写个人访问令牌或 API Key。

## 在 GitHub 网页修改文章

打开 **content → posts → to-kill-a-mockingbird.json**，点击铅笔 **Edit this file**。修改 `title.zh`、`summary.zh` 或 `body.zh` 中的 `text`，点击 **Commit changes** 提交到 `main`。Actions 会自动重新发布。

新增文章时，复制 `content/templates/reading-note.json` 的内容，通过 **Add file → Create new file** 新建 `content/posts/my-second-book.json`，改成唯一的 id，填写标题、日期和正文，再将 status 从 draft 改为 published。

图片上传到 `public/reading/`，文章中用不含 public 的路径，例如 `/reading/my-second-book/cover.jpg`。英文暂未准备好时可留空字符串及 `body.en: []`，英文页会回退显示中文并注明暂无译文。

一段正文的格式：

```json
{ "type": "p", "text": "在这里写一段读后感。" }
```

图片块的格式：

```json
{ "type": "img", "src": "/reading/my-second-book/cover.jpg", "alt": "图片说明" }
```

请保留 JSON 的英文双引号、逗号和括号；最后一项后面不加逗号。文章按 date 从新到旧排列。draft 不会出现在公开网页。已有文章的 id 保持不变，避免链接失效。

发布失败时，打开 Actions 最近一次运行的 build 查看报错，修正 JSON、日期、重复 id 或图片路径后再提交。失败不会替换上一次成功发布的网站。

启用工作流后，发布内容来自源码构建出的 dist，日常编辑入口为 content/posts，而不是旧的根目录 HTML 文件。

## Build

Install Node.js 22.13 or newer, then run in this project directory:

```sh
npm install
npm run build
```

自动发布使用 `.github/workflows/deploy-pages.yml`。如果只采用手动发布，则上传 dist 里面的内容，并使用 Deploy from a branch → main → /(root)；两种方式的 Pages Source 设置不同。

For the user website of account `penguinlittle33`, the repository must be named `penguinlittle33.github.io`. Internal URLs and media paths are relative, so the same output also works as a project site under a repository subpath.

## Edit

- `content/site.json`: profile, social links and published or draft entries. Each entry has Chinese and English title, summary and rich-text body. Only entries with `status: "published"` are exported.
- `app/components/About.tsx`: education, internships, awards, tools and languages.
- `app/components/Shell.tsx`: navigation and footer.
- `app/components/Meadow.tsx` and `app/meadow.css`: cloud, rain, flowers and sun interaction.
- `app/components/ArchDamMedia.tsx`: rendering video and one CAD layout image.
- `app/*.css`: styles.
- `public/`: images, video and drawings, copied as ordinary static files.

After every change, rebuild and upload the updated `dist/` contents. There is no server and no online CMS in this edition. React pre-renders the HTML and hydrates the browser interactions. English pages are under `en/`, and Chinese pages are at the root. Reading and journal sections currently show their original empty states.

The public media are the materials supplied by the website owner. The arch-dam page includes one layout drawing and a rendering video; no complete drawing PDF is distributed.
