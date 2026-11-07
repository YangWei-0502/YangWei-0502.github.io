import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import EmailLink from "@/components/EmailLink";
import { EMAIL_PARTS, GITHUB_STATUS, GITHUB_URL, GITHUB_HANDLE } from "@/lib/site";
import { withBase } from "@/lib/base";

export const metadata: Metadata = {
  title: "联系方式",
          description:
    "联系杨威：邮箱（防爬虫混淆渲染）、微信二维码、源码提供方式。欢迎技术交流与面试邀约。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold text-blue-dark">Contact</p>
        <h1 className="mt-1 text-3xl font-black text-ink sm:text-4xl">联系方式</h1>
        <p className="mt-3 max-w-xl text-muted">
          欢迎技术交流、项目探讨与面试邀约。回复通常在 24 小时内。
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* 邮箱 */}
        <Reveal delay={60}>
          <section className="block-card rounded-xl2 border border-line bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15 text-blue-dark">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">邮箱</h2>
            <p className="mt-1 text-sm text-muted">正式沟通 / 面试邀约首选</p>
            <p className="mt-3 break-all text-base font-semibold text-ink">
              <EmailLink parts={EMAIL_PARTS} />
            </p>
          </section>
        </Reveal>

        {/* 源码获取 */}
        <Reveal delay={120}>
          <section className="block-card rounded-xl2 border border-line bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 18l6-6-6-6" />
                <path d="M8 6l-6 6 6 6" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">源码与演示</h2>
            <p className="mt-1 text-sm text-muted">
              所有项目均为本机可运行工程作品，未做公网部署。
            </p>
            <p className="mt-3 break-all text-base font-semibold text-ink">
              {GITHUB_STATUS}
            </p>
            <p className="mt-2 text-sm text-muted">
              GitHub：
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-dark hover:underline"
              >
                {GITHUB_HANDLE}
              </a>
            </p>
          </section>
        </Reveal>
      </div>

      {/* 微信 */}
      <Reveal delay={100}>
        <section className="mt-6 rounded-xl2 border border-line bg-white p-6">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-lg font-bold text-ink">微信</h2>
              <p className="mt-1 text-sm text-muted">
                扫二维码添加好友，备注「来自个人网站」更快通过。
              </p>
            </div>
            <Image
              src={withBase("/images/projects/wechat-qr.jpg")}
              alt="杨威的微信二维码"
              width={220}
              height={220}
              className="h-44 w-44 rounded-xl border border-line object-contain"
            />
          </div>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-8 text-center text-sm text-muted">
          想先了解我的项目与源码？去
          <a href={withBase("/projects")} className="mx-1 font-semibold text-blue-dark hover:underline">
            项目详解
          </a>
          ，或直接打开
          <a
            href={withBase("/repomind-explained.html")}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 font-semibold text-blue-dark hover:underline"
          >
            RepoMind 动画讲解
          </a>
          。
        </p>
      </Reveal>
    </div>
  );
}
