export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs tracking-[0.4em] uppercase text-accent/80 mb-4">06 · Contato</p>
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tight max-w-3xl">
          Vamos construir
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> algo útil</span>.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="mailto:dev.victordavi@gmail.com" className="rounded-full bg-white px-7 py-4 text-sm font-medium text-background hover:shadow-[0_0_40px_rgba(180,160,255,0.6)] transition">
            dev.victordavi@gmail.com
          </a>
          <a href="https://github.com/VictorDavii" className="rounded-full glass px-7 py-4 text-sm font-medium hover:bg-white/5 transition target=blank">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/victor-davi-camacho-pereira-579b4412a/" className="rounded-full glass px-7 py-4 text-sm font-medium hover:bg-white/5 transition target='_blank'">
            LinkedIn
          </a>
        </div>
        <div className="mt-20 flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between font-mono">
          <span>© {new Date().getFullYear()} Victor Davi</span>
        </div>
      </div>
    </footer>
  );
}
