import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-48">
      <div className="mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-accent/80 uppercase mb-3">05 · Missões</p>
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">
          Trabalhos <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">selecionados</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link || p.repo || "#"}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(600px circle at 50% 50%, rgba(140,120,255,0.18), transparent 60%)" }}
              />
            </div>
            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{p.title}</h3>
                <span className="rounded-full glass p-2 transition-transform duration-500 group-hover:rotate-45">
                  {p.repo ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </span>
              </div>
              <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-xl">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="font-mono text-[11px] tracking-wide rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
