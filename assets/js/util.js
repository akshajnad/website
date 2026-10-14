export const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

const rm = matchMedia("(prefers-reduced-motion: reduce)");
export const prefersReducedMotion = () => rm.matches;
export const onReducedMotionChange = (fn) => rm.addEventListener("change", fn);

export const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && c.getContext("webgl2")) || !!c.getContext("webgl");
  } catch {
    return false;
  }
}

// Animate the numeric part of strings like "8,000+", "<5 min", "~20%", "$25K".
// Strings without a single clean number ("13 / 15", "Finalist") are left alone.
export function countUp(el, duration = 1100) {
  const text = el.textContent;
  const m = text.match(/^([^\d]*?)(\d[\d,]*\.?\d*)([^\d]*)$/);
  if (!m || prefersReducedMotion()) return;
  const [, pre, num, post] = m;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = (num.split(".")[1] || "").length;
  if (decimals || target < 10) return; // small numbers and scores read better shown as-is
  const comma = num.includes(",");
  const fmt = (v) => {
    const s = v.toFixed(decimals);
    return comma ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
  };
  el.setAttribute("aria-label", text);
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = clamp((t - t0) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = pre + fmt(target * eased) + post;
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = text;
      };
      el.textContent = pre + fmt(0) + post;
      requestAnimationFrame(tick);
    },
    { threshold: 0.4 }
  );
  io.observe(el);
}

// Run fn while el is on screen; returns a cleanup function.
export function whileVisible(el, onEnter, onLeave, margin = "100px") {
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? onEnter() : onLeave()), { rootMargin: margin });
  io.observe(el);
  return () => io.disconnect();
}
