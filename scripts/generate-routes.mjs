// 构建后生成 routes.json（托管平台安全扫描输入）。
// 遍历 out 目录下全部 .html，生成不带 base 前缀的路由声明；404 页不进路由。
import { readdirSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, sep, relative } from "node:path";

const outDir = join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.error("[routes] out 目录不存在，跳过");
  process.exit(0);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

const routes = [];
for (const file of walk(outDir)) {
  const rel = relative(outDir, file).split(sep).join("/");
  if (rel === "404.html" || rel.startsWith("404/") || rel.startsWith("_next/")) continue;
  if (rel === "index.html") {
    routes.push({ path: "/", file: "index.html", name: "首页" });
  } else if (rel.endsWith("/index.html")) {
    routes.push({ path: "/" + rel.slice(0, -"index.html".length), file: rel, name: rel.split("/")[0] });
  } else {
    routes.push({ path: "/" + rel, file: rel, name: rel });
  }
}

routes.sort((a, b) => a.path.localeCompare(b.path));
writeFileSync(join(outDir, "routes.json"), JSON.stringify(routes, null, 2), "utf-8");
console.log("[routes] 已生成", routes.length, "条路由");
for (const r of routes) console.log("  ", r.path, "->", r.file);
