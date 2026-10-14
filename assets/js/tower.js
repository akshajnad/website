// Experience section: floor index + focus card + 3D tower, with a stacked-slab
// list as the accessible / small-screen / no-WebGL alternative.

import { FLOORS, byId } from "./data.js";
import { esc, clamp, hasWebGL, prefersReducedMotion, whileVisible } from "./util.js";

function floorData() {
  return FLOORS.map((f) => {
    const p = byId[f.id];
    const annex = (f.annex || []).map((id) => byId[id]);
    if (p) return { ...p, annex };
    return { ...f, kind: "group", annex };
  });
}

export function initTower({ openProject }) {
  const section = document.getElementById("experience");
  const track = section.querySelector("[data-tower-track]");
  const indexEl = section.querySelector("[data-floor-index]");
  const focusEl = section.querySelector("[data-floor-focus]");
  const listEl = section.querySelector("[data-floor-list]");
  const stage = section.querySelector("[data-tower-stage]");
  const canvas = section.querySelector("[data-tower-canvas]");
  const labelsEl = section.querySelector("[data-tower-labels]");
  const tip = section.querySelector("[data-tower-tip]");
  const floors = floorData();
  const N = floors.length;
  track.style.setProperty("--floors", N);

  let active = -1;
  let scene = null;
  let loading = null;
  const reduced = prefersReducedMotion();
  const webgl = hasWebGL();
  const wide = matchMedia("(min-width: 900px)");
  let listMode = false;

  // ---- index
  indexEl.innerHTML = floors
    .map(
      (f, i) => `<li><button type="button" class="floor-btn" data-floor="${i}" style="--c:${f.color}" aria-current="false">
        <span class="floor-num">${String(N - i).padStart(2, "0")}</span>
        <strong>${esc(f.title)}</strong>
        <small>${esc(f.role)}${f.dates ? " · " + esc(f.dates) : ""}</small>
      </button></li>`
    )
    .join("");

  // ---- list / fallback view
  listEl.innerHTML = floors
    .map((f, i) => {
      const r = (f.results || [])[0];
      const annex = f.annex.length
        ? `<div class="slab-annex">${f.annex.map((a) => `<button type="button" class="chip" style="--c:${a.color}" data-open="${a.id}">${esc(a.title)}</button>`).join("")}</div>`
        : "";
      return `<article class="slab reveal-up" style="--c:${f.color};--d:${i * 60}ms">
        <span class="slab-mark" aria-hidden="true">${esc(f.mark)}</span>
        <div>
          <p class="mono">${String(N - i).padStart(2, "0")} · ${esc(f.dates || "")}</p>
          <h3>${esc(f.title)}</h3>
          <p class="slab-role">${esc(f.role)}${f.team ? " · " + esc(f.team) : ""}</p>
          <p>${esc(f.summary)}</p>
        </div>
        ${r ? `<div class="slab-meta"><div class="slab-metric"><strong>${esc(r.value)}</strong><span>${esc(r.label)}</span></div></div>` : "<span></span>"}
        <button type="button" class="slab-open link-arrow" data-open="${f.id}">${f.kind === "group" ? "See the builds" : "Open case study"} <span aria-hidden="true">→</span></button>
        ${annex}
      </article>`;
    })
    .join("");

  function renderFocus(i) {
    const f = floors[i];
    focusEl.style.setProperty("--c", f.color);
    const metrics = (f.results || [])
      .slice(0, 4)
      .map((r) => `<div><dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd></div>`)
      .join("");
    focusEl.innerHTML = `<div class="focus-swap">
      <p class="focus-kicker mono"><span>Floor ${String(N - i).padStart(2, "0")} / ${String(N).padStart(2, "0")}</span><span>${esc(f.dates || "")}</span></p>
      <h3>${esc(f.title)}</h3>
      <p class="focus-role">${esc(f.role)}${f.team ? " · " + esc(f.team) : ""}</p>
      <p class="focus-headline">${esc(f.headline || f.summary)}</p>
      ${metrics ? `<dl class="focus-metrics">${metrics}</dl>` : ""}
      ${f.annex.length ? `<ul class="focus-annex" aria-label="Related projects">${f.annex.map((a) => `<li><button type="button" data-open="${a.id}">${esc(a.title)} ↗</button></li>`).join("")}</ul>` : ""}
      <button type="button" class="btn focus-open" data-open="${f.id}"><span>${f.kind === "group" ? "See the builds" : "Open case study"}</span><span aria-hidden="true">→</span></button>
    </div>`;
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    indexEl.querySelectorAll("[data-floor]").forEach((b) => b.setAttribute("aria-current", String(+b.dataset.floor === i)));
    renderFocus(i);
  }

  // ---- scroll -> floor
  let ticking = false;
  function update() {
    ticking = false;
    if (listMode) return;
    const r = track.getBoundingClientRect();
    const span = track.offsetHeight - window.innerHeight;
    const p = clamp(-r.top / Math.max(1, span));
    const f = p * (N - 1);
    const a = clamp(Math.round(f), 0, N - 1);
    setActive(a);
    scene?.setProgress(f, a);
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  function scrollToFloor(i) {
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / (N - 1)) * span + 2, behavior: reduced ? "auto" : "smooth" });
  }

  // ---- events
  indexEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-floor]");
    if (!b) return;
    const i = +b.dataset.floor;
    if (i === active) openProject(floors[i].id);
    else scrollToFloor(i);
  });
  indexEl.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    const btns = [...indexEl.querySelectorAll("[data-floor]")];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const j = clamp(i + (e.key === "ArrowDown" ? 1 : -1), 0, N - 1);
    btns[j].focus({ preventScroll: true });
    scrollToFloor(j);
  });
  section.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) openProject(o.dataset.open);
  });
  section.querySelectorAll("[data-view]").forEach((b) =>
    b.addEventListener("click", () => {
      setListMode(b.dataset.view === "list");
      try {
        localStorage.setItem("tower-view", b.dataset.view);
      } catch {}
    })
  );

  function setListMode(on) {
    listMode = on;
    section.classList.toggle("is-list", on);
    section.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.view === "list") === on)));
    listEl.querySelectorAll(".reveal-up").forEach((el) => el.classList.add("is-in"));
    if (on) scene?.stop();
    else {
      ensureScene();
      onScroll();
    }
  }

  // ---- 3D
  function ensureScene() {
    if (scene || loading || !webgl || !wide.matches || listMode) return;
    loading = import("./scene/tower-scene.js")
      .then(({ createTowerScene }) => {
        scene = createTowerScene({
          canvas,
          labelsEl,
          reduced,
          floors: floors.map((f) => ({ id: f.id, title: f.title, color: f.color, annex: f.annex.map((a) => ({ id: a.id, color: a.color })) })),
          onHover(h, pos) {
            if (!h) return tip.classList.remove("is-on");
            const p = byId[h.id] || floors.find((f) => f.id === h.id);
            tip.style.setProperty("--c", p.color);
            tip.innerHTML = `<b>${esc(p.title)}</b><span>${esc(p.role)}</span><span>${esc(p.dates || p.org || "")}</span><i>${h.annex ? "Related project · click to open" : "Click to open case study"}</i>`;
            tip.style.left = `${pos.x}px`;
            tip.style.top = `${pos.y}px`;
            tip.classList.add("is-on");
          },
          onSelect(id) {
            tip.classList.remove("is-on");
            openProject(id);
          },
        });
        update();
        whileVisible(
          track,
          () => !reduced && !listMode && scene.start(),
          () => scene.stop(),
          "200px"
        );
      })
      .catch((err) => {
        console.warn("Tower scene unavailable, using list view.", err);
        document.documentElement.classList.add("no-tower");
      });
  }

  if (!webgl) document.documentElement.classList.add("no-tower");
  let saved = null;
  try {
    saved = localStorage.getItem("tower-view");
  } catch {}
  if (saved === "list") setListMode(true);

  // Load the 3D scene shortly before the section scrolls into view.
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        ensureScene();
        io.disconnect();
      }
    },
    { rootMargin: "800px 0px" }
  );
  io.observe(section);
  wide.addEventListener("change", () => {
    if (wide.matches) ensureScene();
    onScroll();
  });

  setActive(0);
  update();
  return { scrollToFloor };
}
