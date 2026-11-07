import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/site";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold text-blue-dark">项目</p>
        <h1 className="mt-1 text-3xl font-black text-ink sm:text-4xl">项目介绍</h1>
        <p className="mt-3 max-w-2xl text-muted">
          每个项目都按同样的结构讲述：项目背景与目标、核心理论与方法、通俗易懂说明，并配一段可以播放的动画演示。
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 60}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        项目页只介绍思路与结构；联系我源码可提供（本地可运行）。想继续聊哪一部分，欢迎从
        <Link href="/contact" className="mx-1 font-medium text-blue-dark hover:underline">
          联系方式
        </Link>
        找我。
      </p>
    </div>
  );
}
