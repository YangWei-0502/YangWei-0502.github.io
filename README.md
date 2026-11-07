# 个人作品集网站（改造版）

Next.js 14 静态导出（`output: export`）的个人作品集网站，包含首页、项目列表、关于、联系页，
以及每个项目的**数据驱动详情页**（技术栈 / 亮点 / 模块 / 真实截图 / 动画讲解）。

## 改造内容

| 类别 | 内容 |
|------|------|
| 项目详情页 | 原仅 RepoMind 有独立详情页；新增 `projects/[id]` 动态路由，构建时为每个项目生成静态详情页（getStaticParams），数据源统一为 `src/lib/site.ts` |
| SEO | 构建前脚本 `scripts/generate-seo.mjs` 生成 `public/robots.txt`、`public/sitemap.xml`（prebuild 自动执行）；`metadataBase`、每页 OpenGraph、JSON-LD（Person + SoftwareApplication）。说明：Next 14.2 的 dev 模式对 sitemap 元数据路由 + output:export 有已知 500 缺陷，故采用静态文件方案，dev / 静态导出 / 容器三端一致 |
| 数据一致性 | 扫地机器人 / 电商 RAG 技术栈更新为改造版实际使用的 **DeepSeek（deepseek-flash）+ 本地 Ollama** |
| 缺陷修复 | 修复 `projects/page.tsx` 重复 `"use client"`；移除未使用引用 |
| 部署 | 新增 `Dockerfile`（多阶段构建 → nginx 静态托管）、`nginx.conf`、`.dockerignore`、`.nvmrc`（Node 22） |
| 启动 | 新增 `start.ps1`（dev / build 两种模式）；重写上级目录「一键启动全部项目」脚本（原脚本硬编码旧路径与 RepoMind，已改为启动改造版 5 个 Streamlit 应用） |
| 工程化 | `.gitignore`、构建后 `routes.json` 清单（沿用原 postbuild 脚本） |

## 目录结构

```
repomind-site/
├── src/app/
│   ├── page.tsx                 # 首页
│   ├── projects/page.tsx        # 项目列表（分类筛选）
│   ├── projects/[id]/page.tsx   # 【新增】数据驱动项目详情页（静态生成）
│   ├── projects/repomind/page.tsx # 原 RepoMind 静态详情页（保持原样）
│   ├── about/、contact/
│   └── layout.tsx               # 元数据 + Person JSON-LD
├── scripts/generate-seo.mjs     # 【新增】prebuild 生成 robots/sitemap
├── src/lib/site.ts              # 站点数据（项目/教育/荣誉）
├── public/                      # 截图、动画讲解 HTML、简历 PDF、robots.txt、sitemap.xml
├── Dockerfile / nginx.conf      # 【新增】
└── start.ps1                    # 【新增】
```

## 本地开发

```powershell
cd repomind-site
.\start.ps1            # 或 npm install; npm run dev
# http://localhost:3000
```

## 静态构建与部署

```powershell
.\start.ps1 build      # 产出 out/，构建后生成 routes.json
```

nginx / 任意静态服务器托管 `out/` 目录即可。Docker：

```powershell
docker build -t portfolio-site `
  --build-arg SITE_URL=https://你的域名 .
docker run -p 8080:80 portfolio-site
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 正式域名，用于 sitemap/robots/JSON-LD（默认 http://localhost:3000） |
| `MIAODA_CLIENT_BASE_PATH` | 子路径部署前缀（域名根路径部署留空） |

## 已知说明

- 项目内容、联系方式为个人信息，更新请直接修改 `src/lib/site.ts`，详情页与站点地图自动同步；
- 5 个动画讲解是单文件 HTML（位于 `public/`），不依赖构建，可直接双击打开；
- 仓库未包含任何后端服务与密钥，纯静态站点可放心部署到 Pages / 对象存储。
