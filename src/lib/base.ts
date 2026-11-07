/**
 * 站点根路径前缀。
 * 本地构建时为空；发布托管时由构建环境注入 MIAODA_CLIENT_BASE_PATH（如 /app/app_xxx），
 * next.config 通过 env 把同一值暴露为 NEXT_PUBLIC_BASE_PATH。
 * 原生 <a> 与字符串 URL 必须经 withBase 拼接，避免发布到子路径后 404。
 */
export const BASE: string = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(p: string): string {
  return p.startsWith("/") ? BASE + p : p;
}
