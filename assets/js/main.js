import { byId, AWARDS, PROFILE } from "./data.js";
import { iconSVG } from "./icons.js";
import { esc, clamp, hasWebGL, prefersReducedMotion, finePointer, whileVisible, countUp } from "./util.js";
import { initCaseStudy, frame } from "./case-study.js";
import { initSkills } from "./skills.js";
import { initTower } from "./tower.js";

window.__siteReady = true;
const reduced = prefersReducedMotion();
const webgl = hasWebGL();
document.documentElement.classList.toggle("has-webgl", webgl);

// ---------------------------------------------------------------------------
// Content rendered from data.js
const NOW = [
  { id: "travelers", line: "Multi-agent ticket triage on Amazon Bedrock" },
  { id: "signifi", line: "Co-founder · one brief → linked specs and prototypes" },
  { id: "graption", line: "Leading 15 people on speaker-aware captions" },
  { id: "aerospace", line: "Eight-spacecraft simulator at 500 Hz" },
];
document.querySelector("[data-now-list]").innerHTML = NOW.map(({ id, line }) => {
  const p = byId[id];
  return `<li><button type="button" class="now-item" data-open="${id}" style="--c:${p.color}"><strong>${esc(p.title)}</strong><span>${esc(line)}</span></button></li>`;
}).join("");

const SHOWCASE = ["signifi", "graption", "echolocate"];
const KIND = { experience: "Internship", startup: "Startup", research: "Research", project: "Project" };
document.querySelector("[data-showcase]").innerHTML = SHOWCASE.map((id, i) => {
  const p = byId[id];
  const m = p.media[0];
  const primary = (p.links || []).find((l) => l.primary);
  const metrics = (p.results || [])
    .slice(0, 3)
    .map((r) => `<div><dt>${esc(r.label)}</dt><dd data-count>${esc(r.value)}</dd></div>`)
    .join("");
  return `<article class="show" id="${id}" style="--c:${p.color}">
    <div class="show-media reveal-up">
      <div class="show-tilt" style="--yaw:${i % 2 ? "10deg" : "-10deg"}">${frame(m)}</div>
      <p class="media-caption">${esc(m.caption)}</p>
    </div>
    <div class="show-copy reveal-up" style="--d:120ms">
      <div class="show-kicker"><span class="mono">${String(i + 1).padStart(2, "0")} / ${esc(KIND[p.kind])} · ${esc(p.role)}</span>${
        p.award ? `<span class="award-chip">✳ ${esc(p.award)}</span>` : ""
      }</div>
      <h3>${esc(p.title)}</h3>
      <p class="show-headline">${esc(p.headline)}</p>
      <p class="show-summary">${esc(p.summary)}</p>
      ${metrics ? `<dl class="show-metrics">${metrics}</dl>` : ""}
      <div class="show-actions">
        <button type="button" class="btn btn-case magnetic" data-open="${id}"><span>Open case study</span><span aria-hidden="true">→</span></button>
        ${primary ? `<a class="btn btn-ghost" href="${esc(primary.href)}" target="_blank" rel="noopener"><span>${esc(primary.label)}</span><span aria-hidden="true">↗</span></a>` : ""}
        ${p.video ? `<a class="btn btn-ghost" href="${esc(p.video.href)}" target="_blank" rel="noopener"><span>▶ Demo video</span><span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </div>
  </article>`;
}).join("");

const BUILDS = ["finmate", "gridly", "talking-fingers", "veritas", "skillswap", "buywise", "ppp-pocket"];
document.querySelector("[data-build-grid]").innerHTML = BUILDS.map((id, i) => {
  const p = byId[id];
  const r = (p.results || [])[0];
  return `<li class="reveal-up" style="--d:${i * 50}ms"><button type="button" class="build-card" style="--c:${p.color}" data-open="${id}">
    <div class="build-top"><span class="build-mark" aria-hidden="true">${esc(p.mark)}</span>${
      p.award ? `<span class="award-chip">✳ ${esc(p.award.split(" · ")[1] || p.award)}</span>` : ""
    }</div>
    <h4>${esc(p.title)}</h4>
    <p>${esc(p.summary)}</p>
    <div class="build-foot"><span>${esc(p.org)}${r ? " · " + esc(r.value) + " " + esc(r.label) : ""}</span><span class="go" aria-hidden="true">Open →</span></div>
  </button></li>`;
}).join("");

document.querySelector("[data-awards]").innerHTML = AWARDS.map((a, i) => {
  const p = byId[a.project];
  return `<li class="reveal-up" style="--d:${i * 60}ms"><button type="button" class="award" data-open="${a.project}">
    <span class="n">${String(i + 1).padStart(2, "0")}</span><strong>${esc(a.event)}</strong><span>${esc(a.prize)}</span><small>${esc(p.title)} · open project →</small>
  </button></li>`;
}).join("");

document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = iconSVG(el.dataset.icon)));
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Interactive systems
let skills;
const caseStudy = initCaseStudy({ onSkill: (id) => skills.select(id) });
const openProject = (id) => caseStudy.open(id);
skills = initSkills({ openProject });
initTower({ openProject });

document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]");
  if (o && !o.closest("[data-case], #experience, [data-sx]")) openProject(o.dataset.open);
  const z = e.target.closest("[data-zoom]");
  if (z && !z.closest("[data-case]")) zoom(z);
});
function zoom(el) {
  caseStudy.lightbox.open(el.dataset.zoom, el.dataset.alt, el.dataset.caption);
}

// ---------------------------------------------------------------------------
// Typography: split headings into characters / words for staggered reveals
function splitChars(el) {
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  let i = 0;
  el.querySelectorAll(".line").forEach((line) => {
    const text = line.textContent;
    line.setAttribute("aria-hidden", "true");
    line.innerHTML = [...text].map((ch) => `<span class="char" style="--i:${i++}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  });
}
function splitWords(el) {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else {
            const s = document.createElement("span");
            s.className = "word";
            s.style.setProperty("--i", i++);
            s.textContent = part;
            frag.appendChild(s);
          }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
}
document.querySelectorAll("[data-split]").forEach(splitChars);
document.querySelectorAll("[data-split-words]").forEach(splitWords);

// ---------------------------------------------------------------------------
// Scroll reveals
const revealTargets = document.querySelectorAll(".reveal-up, [data-split-words], .section");
if ("IntersectionObserver" in window && !reduced) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        e.target.style.setProperty("--rule", 1);
        io.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    if (el.classList.contains("section")) el.style.setProperty("--rule", 0);
    io.observe(el);
  });
} else revealTargets.forEach((el) => el.classList.add("is-in"));

// Hero intro plays immediately.
requestAnimationFrame(() => {
  document.querySelectorAll("[data-split]").forEach((el) => el.classList.add("is-in"));
  document.querySelectorAll(".hero .reveal-up").forEach((el, i) => {
    el.style.setProperty("--d", `${380 + i * 110}ms`);
    el.classList.add("is-in");
  });
});
document.querySelectorAll(".show [data-count]").forEach((el) => countUp(el));

// ---------------------------------------------------------------------------
// Pointer micro-interactions (fine pointers only)
if (finePointer() && !reduced) {
  document.addEventListener("pointermove", (e) => {
    const m = e.target.closest(".magnetic");
    if (m) {
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.style.transition = "transform .15s ease-out";
      m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
    }
    const card = e.target.closest(".build-card");
    if (card) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
      card.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    }
  });
  document.addEventListener("pointerout", (e) => {
    const m = e.target.closest(".magnetic");
    if (m && !m.contains(e.relatedTarget)) {
      m.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
      m.style.transform = "";
    }
    const card = e.target.closest(".build-card");
    if (card && !card.contains(e.relatedTarget)) {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    }
  });
}

// ---------------------------------------------------------------------------
// Scroll-linked: header progress, showcase perspective, hero scene
const progressBar = document.querySelector("[data-progress]");
const tilts = [...document.querySelectorAll(".show-tilt")];
const hero = document.getElementById("top");
let heroScene = null;
let ticking = false;
function onScroll() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar?.style.setProperty("--p", (scrollY / Math.max(1, max)).toFixed(4));
  if (!reduced) {
    const vh = innerHeight;
    tilts.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const d = (r.top + r.height / 2 - vh * 0.5) / vh;
      el.style.setProperty("--tilt", clamp(d * 1.8, -1, 1).toFixed(3));
    });
  }
  heroScene?.setScroll(clamp(scrollY / Math.max(1, hero.offsetHeight)));
}
addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true }
);
addEventListener("resize", onScroll);
onScroll();

function loadHero() {
  if (!webgl) return;
  const canvas = document.querySelector("[data-hero-canvas]");
  import("./scene/hero-scene.js")
    .then(({ createHeroScene }) => {
      heroScene = createHeroScene({
        canvas,
        labelsEl: document.querySelector("[data-hero-labels]"),
        reduced,
        compact: innerWidth < 720,
      });
      canvas.classList.add("is-ready");
      onScroll();
      whileVisible(hero, () => heroScene.start(), () => heroScene.stop(), "0px");
      new ResizeObserver(() => heroScene.resize()).observe(canvas);
    })
    .catch((err) => {
      console.warn("Hero scene unavailable.", err);
      document.documentElement.classList.remove("has-webgl");
    });
}
if ("requestIdleCallback" in window) requestIdleCallback(loadHero, { timeout: 600 });
else setTimeout(loadHero, 200);

// ---------------------------------------------------------------------------
// Copy email
const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
copyButton?.addEventListener("click", async () => {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(PROFILE.email);
    copyButton.textContent = "Email copied ✓";
    copyStatus.textContent = "Email address copied to clipboard.";
  } catch {
    copyButton.textContent = "Select the email to copy";
    copyStatus.textContent = `Copy is unavailable in this browser. The address is ${PROFILE.email}.`;
  }
  setTimeout(() => (copyButton.textContent = "Copy email"), 2600);
});
