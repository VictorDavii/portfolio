import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react"; 

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${scrolled ? "glass rounded-full px-4 py-2.5" : ""}`}
           style={scrolled ? { maxWidth: "min(64rem, 92vw)" } : {}}>
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-background text-xs font-bold tracking-tight">VD</span>
          <span className="font-mono text-xs tracking-[0.3em] uppercase">Victor Davi</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {[
            ["#skills", "Stack"],
            ["#projects", "Projetos"],
            ["#contact", "Contato"],
          ].map(([h, l]) => (
            <a key={h} href={h} className="relative hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        
        

        <div className="ml-2 flex items-center gap-2">
              {[{ I: Github, h: "https://github.com/VictorDavii" }, { I: Linkedin, h: "https://www.linkedin.com/in/victor-davi-camacho-pereira-579b4412a/" }, { I: Mail, h: "dev.victordavi@gmail.com" }].map(({ I, h }, i) => (
                <a key={i} href={h} className="rounded-full glass p-2.5 text-muted-foreground hover:text-foreground transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
        </div>
      </div>
    </header>
  );
}
