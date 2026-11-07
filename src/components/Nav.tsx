"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { withBase } from "@/lib/base";
import { GITHUB_URL } from "@/lib/site";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于我" },
  { href: "/contact", label: "联系方式" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-ink"
          aria-label="回到首页"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue text-sm font-black text-paper">
            Y
          </span>
          <span>
            杨威<span className="text-blue"> · </span>AI 工程师
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-yellow/40 text-ink"
                    : "text-muted hover:bg-paper hover:text-ink")
                }
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={withBase("/resume/resume.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-coral px-3 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            简历 PDF
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-4 py-3 md:hidden" aria-label="移动端导航">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-yellow/30"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-yellow/30"
            >
              GitHub
            </a>
            <a
              href={withBase("/resume/resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-coral px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              简历 PDF
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
