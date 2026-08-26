import { useEffect, useRef } from "react";

/**
 * Ambient starfield rendered to a fixed full-viewport canvas.
 * Lightweight (no React state per frame) and DPR-aware.
 */
export function BackgroundEffects() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; z: number; r: number; tw: number; tws: number; hue: number };
    let stars: Star[] = [];

    const seed = () => {
      const count = Math.floor((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1 + 0.2,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random(),
        tws: 0.003 + Math.random() * 0.008,
        hue: Math.random() > 0.92 ? 285 : 230,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.tws;
        const a = 0.35 + Math.abs(Math.sin(s.tw)) * 0.55;
        s.y += s.z * 0.15;
        if (s.y > h) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue === 285
          ? `hsla(285, 90%, 70%, ${a})`
          : `hsla(220, 100%, 92%, ${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #0a1030 0%, #050816 60%, #02030a 100%)" }}
      />
      {/* Nebulae */}
      <div className="pointer-events-none fixed -top-40 -left-40 z-0 h-[60vw] w-[60vw] rounded-full opacity-40 blur-3xl"
           style={{ background: "radial-gradient(circle, rgba(120,90,255,0.35), transparent 60%)" }} />
      <div className="pointer-events-none fixed bottom-[-30vw] right-[-20vw] z-0 h-[60vw] w-[60vw] rounded-full opacity-30 blur-3xl"
           style={{ background: "radial-gradient(circle, rgba(80,140,255,0.30), transparent 60%)" }} />
      <div className="pointer-events-none fixed inset-0 z-0 noise" />
    </>
  );
}
