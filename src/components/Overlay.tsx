import { motion } from "framer-motion";

type Variant = "hero" | "left" | "right";

export function Overlay({ variant }: { variant: Variant }) {
  if (variant === "hero") {
    return (
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.4em] text-primary/80 uppercase mb-6"
        >
          Portfólio · 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35 }}
          className="text-glow text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-[0.95]"
        >
          Victor
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Solution Developer
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
        >
          Construindo soluções tecnologicas.
        </motion.p>
      </div>
    );
  }

  if (variant === "left") {
    return (
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.4em] text-accent/80 uppercase mb-4">02 · Visão</p>
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
          Automações que<span className="text-glow text-accent"> trazem resultado</span>.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-md text-base md:text-lg">
          Cada tempo é valioso. Cada cliente, uma interação. Cada Processo, um desafio.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl text-right">
      <p className="font-mono text-xs tracking-[0.4em] text-primary/80 uppercase mb-4">03 · Princípios</p>
      <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-glow">
        Design + Automação
        <br />
        <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">+ Performance</span>
      </h2>
      <p className="mt-6 text-muted-foreground max-w-md ml-auto text-base md:text-lg">
        Sistemas robustos e Modernos.
      </p>
    </div>
  );
}
