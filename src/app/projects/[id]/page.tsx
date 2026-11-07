import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { withBase } from "@/lib/base";
import { PROJECTS, SITE_URL, getProject } from "@/lib/site";

// 静态导出：构建时为每个项目生成独立详情页
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const project = getProject(params.id);
  if (!project) return { title: "项目未找到" };
  return {
    title: `${project.name} · 项目介绍`,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: "article",
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    operatingSystem: "Web",
    author: { "@type": "Person", name: "杨威" },
    url: `${SITE_URL}/projects/${project.id}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 项目名称 */}
      <Reveal>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
          <p className="text-sm font-semibold text-blue-dark">项目介绍</p>
          <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">{project.name}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            {project.tagline}
          </p>
          <div className="mt-7">
            <Link
              href="/projects"
              className="inline-flex rounded-xl border-2 border-ink/15 px-5 py-2.5 font-semibold text-ink transition-colors hover:border-blue hover:text-blue-dark"
            >
              ← 返回项目列表
            </Link>
          </div>
        </div>
      </Reveal>

      {/* 项目背景与目标 */}
      <Reveal delay={40}>
        <section className="mt-10 rounded-xl2 border border-line bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">项目背景与目标</h2>
          <p className="mt-3 leading-relaxed text-muted">{project.background}</p>
        </section>
      </Reveal>

      {/* 核心理论与方法 */}
      <Reveal delay={60}>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">核心理论与方法</h2>
          <p className="mt-1 text-sm text-muted">讲思路，不涉及具体实现。</p>
          <div className="mt-5 space-y-4">
            {project.method.map((m) => (
              <div key={m.title} className="rounded-xl2 border border-line bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue" aria-hidden="true"></span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-ink">{m.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink/80">{m.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 通俗易懂说明 */}
      <Reveal delay={60}>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">通俗易懂说明</h2>
          <p className="mt-1 text-sm text-muted">用日常场景打比方，不看术语也能明白。</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.explain.map((e) => (
              <div key={e.title} className="rounded-xl2 border border-line bg-white p-5">
                <h3 className="text-base font-bold text-ink">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 动画演示模块 */}
      <Reveal delay={60}>
        <section className="mt-10 overflow-hidden rounded-xl2 border-2 border-coral/40 bg-coral/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">动画演示模块</h2>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={withBase(`/animations/${project.id}.html`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-3 font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
            >
              ▶ 打开动画演示
            </a>
            <span className="text-sm text-muted">新窗口打开；每幕一个主题，右栏同步给出讲解要点</span>
          </div>

          <h3 className="mt-5 text-sm font-bold text-coral">演示目标</h3>
          <p className="mt-1.5 leading-relaxed text-ink/85">{project.animation.goal}</p>

          <h3 className="mt-6 text-sm font-bold text-coral">分幕讲解</h3>
          <ol className="mt-2 space-y-2.5">
            {project.animation.beats.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" aria-hidden="true"></span>
                <span>{b}</span>
              </li>
            ))}
          </ol>

          <h3 className="mt-6 text-sm font-bold text-coral">讲解要点</h3>
          <ul className="mt-2 space-y-2">
            {project.animation.notes.map((n) => (
              <li key={n} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true"></span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <p className="mt-10 text-center text-sm text-muted">
        本页只介绍项目思路与结构；联系我源码可提供（本地可运行）。
      </p>
    </div>
  );
}
