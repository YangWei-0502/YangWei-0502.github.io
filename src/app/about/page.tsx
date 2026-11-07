import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { EDUCATION, HONORS, RESUME_URL } from "@/lib/site";
import { withBase } from "@/lib/base";

export const metadata: Metadata = {
  title: "关于我",
  description:
    "杨威：青海师范大学软件工程硕士（2026 届），从数据分析转型 AI 应用/Agent/RAG 开发，MLBDBI 一作，数学竞赛国一、华为杯国三，含教育、论文、竞赛与学习轨迹。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold text-blue-dark">About</p>
        <h1 className="mt-1 text-3xl font-black text-ink sm:text-4xl">关于我</h1>
      </Reveal>

      {/* 简介 */}
      <Reveal delay={60}>
        <section className="mt-8 grid gap-6 rounded-xl2 border border-line bg-white p-6 sm:p-8 lg:grid-cols-[220px_1fr]">
          <div className="flex justify-center lg:block">
            <Image
              src={withBase("/images/projects/avatar.png")}
              alt="杨威证件照"
              width={200}
              height={200}
              className="h-44 w-44 rounded-full border-4 border-yellow/40 object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">杨威 · 2026 届软件工程硕士</h2>
            <p className="mt-3 leading-relaxed text-muted">
              我的技术路线从数据分析出发，经历论文研究与大模型应用，最终聚焦到
              <span className="font-semibold text-ink"> AI 应用 / Agent / RAG </span>
              方向：能独立完成从需求拆解、架构设计、代码实现到部署自测的全栈闭环。
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              我相信"能讲清楚才是真的会"——所以每个项目都按同一套结构来讲：为什么做、
              用了什么方法、怎么用日常场景理解，以及可以怎样做成动画演示。
            </p>
            <a
              href={withBase(RESUME_URL)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-2.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="M7 10l5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              下载简历 PDF
            </a>
          </div>
        </section>
      </Reveal>

      {/* 教育经历 */}
      <Reveal delay={60}>
        <section className="mt-12">
          <h2 className="text-xl font-bold text-ink">教育经历</h2>
          <div className="mt-6 space-y-4">
            {EDUCATION.map((e) => (
              <div
                key={e.period}
                className="grid gap-3 rounded-xl2 border border-line bg-white p-5 shadow-card sm:grid-cols-[160px_1fr] sm:items-start sm:gap-6"
              >
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-sm font-semibold text-blue-dark">
                    {e.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">
                    {e.school} · {e.major}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 论文与软著 */}
      <Reveal delay={60}>
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="block-card rounded-xl2 border border-line bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-dark">论文 · 第一作者</p>
            <h3 className="mt-2 text-lg font-bold text-ink">MLBDBI</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              以多模型集成方式做中文摘要，在公开中文摘要数据集上取得稳定提升，并据此工程化出可用的摘要抽取系统。
            </p>
          </div>
          <div className="block-card rounded-xl2 border border-line bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-dark">软件著作权</p>
            <h3 className="mt-2 text-lg font-bold text-ink">《智能文本摘要抽取系统》</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              将论文方法工程化为可用的摘要抽取系统，独立完成设计、实现与登记。
            </p>
          </div>
        </section>
      </Reveal>

      {/* 竞赛 */}
      <Reveal delay={60}>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">竞赛获奖</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
        </section>
      </Reveal>
    </div>
  );
}
