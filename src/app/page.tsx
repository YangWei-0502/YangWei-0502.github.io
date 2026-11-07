import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, SKILL_GROUPS, EDUCATION, HONORS, GITHUB_STATUS, GITHUB_URL, GITHUB_HANDLE } from "@/lib/site";
import { withBase } from "@/lib/base";

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-green" aria-hidden="true"></span>
              2026 届 · 软件工程硕士 · 求职中
            </p>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">
              你好，我是 <span className="text-blue">杨威</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              求职方向：<span className="font-semibold text-ink">AI Agent 工程师</span> /{" "}
              <span className="font-semibold text-ink">AI 应用开发工程师</span> /{" "}
              <span className="font-semibold text-ink">LLM 应用开发工程师</span> /{" "}
              <span className="font-semibold text-ink">AI 全栈工程师</span>。
              我关心的是把模型能力放进有边界、有流程、有依据的结构里：能跑通，也能讲清楚每一步为什么这么做。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-xl bg-blue px-5 py-3 font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
              >
                看项目介绍
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border-2 border-ink/15 bg-white px-5 py-3 font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
              >
                联系我
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
              邮箱见
              <Link href="/contact" className="mx-1 font-medium text-blue-dark hover:underline">
                联系方式
              </Link>
              · 简历 PDF 可随时下载 · GitHub
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-medium text-blue-dark hover:underline"
              >
                {GITHUB_HANDLE}
              </a>
              · {GITHUB_STATUS}
            </p>
          </div>

          <Reveal className="hidden justify-center lg:flex" delay={100}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-yellow/30 blur-2xl" aria-hidden="true"></div>
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-ink/10 bg-white shadow-card-hover">
                <Image
                  src={withBase("/images/projects/avatar.png")}
                  alt="杨威证件照"
                  width={240}
                  height={240}
                  className="h-56 w-56 rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 核心技能 ===== */}
      <section className="border-y border-line bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-ink">核心技能</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-4 space-y-4">
              {SKILL_GROUPS.map((g) => (
                <div key={g.name} className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <span className="shrink-0 pt-1.5 text-xs font-bold uppercase tracking-wide text-blue-dark sm:w-28">
                    {g.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue-dark"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 项目 ===== */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-ink">项目介绍</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted">
                每个项目按同样的结构讲述：为什么做、用了什么方法、怎么通俗理解，并配一段可播放的动画演示。
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-blue-dark hover:underline"
            >
              查看全部项目 →
            </Link>
          </div>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 学习轨迹 ===== */}
      <section className="border-t border-line bg-white/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink">学习轨迹</h2>
            <p className="mt-1 text-sm text-muted">从计算机本科到软件工程硕士</p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.period} delay={i * 80}>
                <div className="grid gap-3 rounded-xl2 border border-line bg-white p-5 shadow-card sm:grid-cols-[160px_1fr] sm:items-start sm:gap-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-sm font-semibold text-blue-dark">
                      {e.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      {e.school} · {e.major}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{e.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 荣誉一角 ===== */}
      <section className="border-t border-line bg-white/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-ink">荣誉一角</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HONORS.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <div className="block-card flex h-full flex-col rounded-xl2 border border-line bg-white p-5">
                  <p className="text-sm font-semibold text-muted">{h.title}</p>
                  <p className="mt-1 text-base font-bold text-ink">{h.award}</p>
                  {h.desc ? <p className="mt-2 text-xs leading-5 text-muted">{h.desc}</p> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
