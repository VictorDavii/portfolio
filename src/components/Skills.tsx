import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, categories, type SkillCategory } from "@/data/skills";
import { Sparkles } from "lucide-react";

export function Skills() {
  const [active, setActive] = useState<SkillCategory | "All">("All");
  const filtered = useMemo(
    () => (active === "All" ? skills : skills.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-48">
      <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.4em] text-primary/80 uppercase mb-3">04 · Sistemas</p>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Stack <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">orbital</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 ">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all hover:cursor-pointer ${
                active === c
                  ? "bg-white text-background shadow-[0_0_30px_rgba(180,160,255,0.4)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((s) => (
            <motion.div
              key={s.name}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 hover:cursor-pointer"
              style={{
                ["--c" as never]: s.color,
              }}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${s.color}33, transparent 60%)`,
                }}
              />
              <div className="relative flex items-center justify-between h-20 w-20" >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{s.category}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.name}</h3>
                </div>
                <Sparkles
                  className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12"
                  style={{ color: s.color }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
