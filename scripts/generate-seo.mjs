// 生成静态 public/robots.txt 与 public/sitemap.xml（dev 与静态托管都能直接访问）。
// 说明：Next 14.2 dev 模式对 metadata 路由 sitemap.xml + output:export 存在已知问题（dev 500，生产构建正常），
// 为保证「开发模式 / 静态导出 / 容器托管」三端一致，改为构建前生成静态文件。
// 项目 id 如调整，请同步 src/lib/site.ts。
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const publicDir = join(process.cwd(), "public");
mkdirSync(publicDir, { recursive: true });

const staticPages = [
  { path: "/", freq: "monthly", priority: 1.0 },
  { path: "/projects", freq: "weekly", priority: 0.9 },
  { path: "/about", freq: "monthly", priority: 0.7 },
  { path: "/contact", freq: "yearly", priority: 0.5 },
];

const projectIds = [
  { id: "repomind" },
  { id: "sweeper" },
  { id: "ecom-rag" },
  { id: "companion" },
  { id: "smartcare" },
  { id: "interview" },
];

const urls = [
  ...staticPages,
  ...projectIds.map((p) => ({
    path: `/projects/${p.id}`,
    freq: "monthly",
    priority: 0.7,
  })),
];

const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}${u.path}</loc>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n") +
  "\n</urlset>\n";

const robotsTxt =
  "User-Agent: *\nAllow: /\n\n" + `Sitemap: ${SITE_URL}/sitemap.xml\n`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
writeFileSync(join(publicDir, "robots.txt"), robotsTxt, "utf-8");
console.log(`[seo] 已生成 robots.txt / sitemap.xml（${urls.length} 条，${SITE_URL}）`);
