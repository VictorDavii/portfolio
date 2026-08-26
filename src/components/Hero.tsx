import { motion } from "framer-motion";
import perfil from "@/assets/perfil.jpeg";
/**
 * Intro hero — preceeds the ScrollyCanvas.
 * Uses the user's profile photo as the visual anchor with floating orbits.
 */
export function Hero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-20">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-mono text-xs tracking-[0.4em] uppercase text-primary/80"
          >
            01 · About me
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="mt-4 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]"
          >
            Victor <span className="text-glow">Davi</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              FullStack Developer
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}
            className="mt-6 max-w-lg text-base md:text-lg text-muted-foreground"
          >
             Desenvolvendo soluções para sua empresa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-background transition hover:shadow-[0_0_40px_rgba(180,160,255,0.5)]">
              Explorar trabalhos
            </a>
            <a href="#contact" className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-background transition hover:shadow-[0_0_40px_rgba(180,160,255,0.5)]">
              Iniciar contato
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* Orbits */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
          {/* Glow */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-60"
               style={{ background: "radial-gradient(circle at 50% 50%, rgba(180,120,255,0.45), transparent 60%)" }} />
          {/* Image */}
          <div className="absolute inset-6 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_120px_-20px_rgba(140,100,255,0.6)] float-slow">
            <img src={perfil} alt="Victor Davi" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
          {/* Orbiting dots */}
          {[0, 120, 240].map((deg, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: `orbit ${14 + i * 4}s linear infinite`,
                ["--r" as never]: `${48 + i * 2}%`,
                transform: `rotate(${deg}deg) translateX(${48 + i * 2}%)`,
              }}
            >
              <span className="block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_rgba(180,120,255,0.8)]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground"
      >
        Role para iniciar viagem ↓
      </motion.div>
    </section>
  );
}
