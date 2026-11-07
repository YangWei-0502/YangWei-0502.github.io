import Link from "next/link";
import { withBase } from "@/lib/base";
import type { Project } from "@/lib/site";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="block-card flex h-full flex-col rounded-xl2 border border-line bg-white p-5">
      <h3 className="text-lg font-bold text-ink">
        <Link
          href={"/projects/" + project.id}
          className="hover:underline hover:decoration-yellow hover:decoration-4 underline-offset-4"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <Link
          href={"/projects/" + project.id}
          className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-blue hover:text-blue-dark"
        >
          查看项目介绍
        </Link>
        <a
          href={withBase(`/animations/${project.id}.html`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-coral/40 bg-coral/5 px-3 py-1.5 text-xs font-semibold text-coral transition-colors hover:bg-coral hover:text-white"
        >
          ▶ 动画演示
        </a>
      </div>
    </article>
  );
}
