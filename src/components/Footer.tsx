"use client";

import Link from "next/link";
import { GITHUB_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} 杨威 · AI 应用 / Agent / RAG 工程师（2026 届）</p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="transition-colors hover:text-ink">
            项目作品
          </Link>
          <Link href="/about" className="transition-colors hover:text-ink">
            关于我
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
