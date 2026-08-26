import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { Overlay } from "./Overlay";

/**
 * Procedural cinematic scroll experience.
 *
 * Replaces a frame-sequence with a GPU-friendly procedural "hyperspace warp"
 * rendered on canvas. Scroll progress (0..1) drives:
 *   - warp speed (slow drift -> fast streaks)
 *   - camera roll
 *   - color temperature (deep blue -> violet -> warm crimson)
 *
 * Container is 500vh; the canvas is sticky and uses object-fit: cover semantics
 * via manual DPR-aware sizing so it stays crisp on ultrawide/mobile.
 */
export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  // For overlay parallax
  const yA = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const oA = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);

  const xB = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [-80, 0, 80]);
  const oB = useTransform(scrollYProgress, [0.22, 0.32, 0.5, 0.58], [0, 1, 1, 0]);

  const xC = useTransform(scrollYProgress, [0.55, 0.7, 0.9], [120, 0, -60]);
  const oC = useTransform(scrollYProgress, [0.55, 0.65, 0.88, 0.98], [0, 1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, cx = 0, cy = 0;
    let raf = 0;

    type P = { x: number; y: number; z: number; pz: number };
    const COUNT = 520;
    const particles: P[] = Array.from({ length: COUNT }, () => mk());

    function mk(): P {
      return { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(), pz: 0 };
    }

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
    };

    let roll = 0;
    const tick = () => {
      const p = progressRef.current;
      // Speed eases up with scroll
      const speed = 0.0035 + p * 0.045;
      roll += 0.0006 + p * 0.004;

      // Background gradient shifts with progress
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
      // hue interpolation: 230 -> 285 -> 350
      const hue = 230 + p * 120;
      g.addColorStop(0, `hsl(${hue}, 60%, ${6 + p * 8}%)`);
      g.addColorStop(0.6, `hsl(${hue - 10}, 55%, 4%)`);
      g.addColorStop(1, `#02030a`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(roll);

      const reach = Math.max(w, h);
      for (const pt of particles) {
        pt.pz = pt.z;
        pt.z -= speed;
        if (pt.z <= 0.02) {
          pt.x = (Math.random() - 0.5) * 2;
          pt.y = (Math.random() - 0.5) * 2;
          pt.z = 1;
          pt.pz = 1;
        }
        const sx = (pt.x / pt.z) * reach * 0.6;
        const sy = (pt.y / pt.z) * reach * 0.6;
        const px = (pt.x / pt.pz) * reach * 0.6;
        const py = (pt.y / pt.pz) * reach * 0.6;
        const alpha = Math.min(1, (1 - pt.z) * 1.2);
        const streak = 0.6 + p * 2.4;

        ctx.strokeStyle = `hsla(${hue + 20}, 95%, ${75 - p * 10}%, ${alpha * 0.9})`;
        ctx.lineWidth = (1 - pt.z) * 1.6 * streak;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.restore();

      // Soft vignette
      const vg = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.4, cx, cy, Math.max(w, h) * 0.8);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

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
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* Cinematic overlay sections */}
        <div className="absolute inset-0 z-10">
          <motion.div style={{ y: yA, opacity: oA }} className="absolute inset-0 flex items-center justify-center text-center px-6">
            <Overlay variant="hero" />
          </motion.div>

          <motion.div style={{ x: xB, opacity: oB }} className="absolute inset-0 flex items-center justify-start px-8 md:px-24">
            <Overlay variant="left" />
          </motion.div>

          <motion.div style={{ x: xC, opacity: oC }} className="absolute inset-0 flex items-center justify-end px-8 md:px-24">
            <Overlay variant="right" />
          </motion.div>
        </div>
        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050816]" />
      </div>
    </section>
  );
}
