import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "杨威 · AI 应用 / Agent / RAG 工程师 | 2026 届硕士",
    template: "%s · 杨威的个人网站",
  },
  description:
    "杨威，2026 届软件工程硕士，求职 AI 应用 / Agent / RAG 方向。站点包含项目介绍（背景、方法、通俗说明与动画演示思路）、学习轨迹与联系方式。",
  keywords: [
    "杨威",
    "AI工程师",
    "Agent",
    "RAG",
    "RepoMind",
    "DevFlow-AI",
    "LangGraph",
    "LangChain",
    "2026届硕士",
    "个人网站",
  ],
  authors: [{ name: "杨威" }],
  openGraph: {
    title: "杨威 · AI 应用 / Agent / RAG 工程师",
    description:
      "把 AI 能力放进有边界、有流程、有依据的结构里——项目介绍、学习轨迹与联系方式。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="paper-noise min-h-screen bg-paper font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "杨威",
              url: SITE_URL,
              jobTitle: "AI Agent / AI 应用 / LLM 应用开发工程师",
              alumniOf: ["青海师范大学", "沧州师范学院"],
            }),
          }}
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
