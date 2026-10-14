// Skill explorer: tiles on the left, every project on the right, wires between them.
// Relationships come from each project's `skills` map in data.js.

import { SKILLS, CATEGORIES, PROJECTS, usesOf, skillById } from "./data.js";
import { iconSVG } from "./icons.js";
import { esc, finePointer, prefersReducedMotion } from "./util.js";

const KIND = { experience: "Internship", startup: "Startup", research: "Research", project: "Project" };

export function initSkills({ openProject }) {
  const root = document.querySelector("[data-sx]");
  if (!root) return { select() {} };
  const tilesEl = root.querySelector("[data-sx-tiles]");
  const rail = root.querySelector("[data-sx-rail]");
  const wires = root.querySelector("[data-sx-wires]");
  const filtersEl = document.querySelector("[data-sx-filters]");

  const skills = SKILLS.filter((s) => usesOf(s.id).length);
  const projects = PROJECTS.filter((p) => p.skills && Object.keys(p.skills).length);
  let selected = null;
  let filter = "all";

  // ---- render
  filtersEl.innerHTML = CATEGORIES.map((c) => {
    const n = c.id === "all" ? skills.length : skills.filter((s) => s.cat === c.id).length;
    return `<button type="button" data-filter="${c.id}" aria-pressed="${c.id === "all"}">${esc(c.label)}<small>${n}</small></button>`;
  }).join("");

  tilesEl.innerHTML = skills
    .map((s) => {
      const n = usesOf(s.id).length;
      const glyph = s.icon ? iconSVG(s.icon) : `<span class="sx-mono">${esc(s.mono || s.name[0])}</span>`;
      return `<li data-cat="${s.cat}"><button type="button" class="sx-tile" data-skill="${s.id}" style="--c:${s.color}" aria-pressed="false" aria-controls="sx-rail" aria-label="${esc(
        s.name
      )}, used in ${n} ${n === 1 ? "project" : "projects"}">
        <span class="sx-icon" aria-hidden="true">${glyph}</span>
        <span class="sx-name">${esc(s.name)}</span>
        <span class="sx-count" aria-hidden="true">${String(n).padStart(2, "0")}</span>
      </button></li>`;
    })
    .join("");

  rail.innerHTML = `<div class="sx-sheet-bar" aria-hidden="true"></div>
    <div class="sx-rail-head" data-rail-head></div>
    <ul class="sx-list" data-rail-list>
      ${projects
        .map(
          (p) => `<li class="sx-row" data-row="${p.id}" style="--c:${p.color}">
          <button type="button" class="sx-row-btn" data-open="${p.id}">
            <span class="dot" aria-hidden="true">${esc(p.mark)}</span>
            <span><strong>${esc(p.title)}</strong><small>${esc(KIND[p.kind])} · ${esc(p.role)}</small></span>
            <span class="go" aria-hidden="true">↗</span>
          </button>
          <div class="sx-how"><div><p data-how></p></div></div>
        </li>`
        )
        .join("")}
    </ul>`;
  const head = rail.querySelector("[data-rail-head]");
  const list = rail.querySelector("[data-rail-list]");
  const rows = Object.fromEntries([...list.querySelectorAll("[data-row]")].map((r) => [r.dataset.row, r]));
  const tiles = Object.fromEntries([...tilesEl.querySelectorAll("[data-skill]")].map((t) => [t.dataset.skill, t]));

  function renderHead() {
    if (!selected) {
      head.style.removeProperty("--c");
      head.innerHTML = `<span class="sx-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><circle cx="5" cy="12" r="2.2" fill="currentColor"/><circle cx="19" cy="6" r="2.2" fill="currentColor"/><circle cx="19" cy="18" r="2.2" fill="currentColor"/><path d="M7 12c5 0 6-6 10-6M7 12c5 0 6 6 10 6" stroke="currentColor" fill="none" stroke-width="1.2"/></svg></span>
        <div><h3>${projects.length} projects</h3><p>Select a skill to trace where it was used.</p></div><span></span>`;
      return;
    }
    const s = skillById[selected];
    const n = usesOf(selected).length;
    head.style.setProperty("--c", s.color);
    head.innerHTML = `<span class="sx-icon" aria-hidden="true">${s.icon ? iconSVG(s.icon) : `<span class="sx-mono">${esc(s.mono)}</span>`}</span>
      <div><h3>${esc(s.name)}</h3><p>Used in ${n} ${n === 1 ? "project" : "projects"} · ${esc(
      CATEGORIES.find((c) => c.id === s.cat).label
    )}</p></div>
      <button type="button" class="sx-close" data-sx-close aria-label="Close ${esc(s.name)}">×</button>`;
  }

  // ---- state
  function apply() {
    root.classList.toggle("has-focus", !!selected);
    Object.values(tiles).forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.skill === selected)));
    const uses = selected ? usesOf(selected) : [];
    const on = new Set(uses.map((u) => u.project.id));
    Object.entries(rows).forEach(([id, row]) => {
      row.classList.toggle("is-on", on.has(id));
      row.classList.toggle("is-dim", !!selected && !on.has(id));
      const how = uses.find((u) => u.project.id === id);
      row.querySelector("[data-how]").textContent = how ? how.how : "";
    });
    reorder(on);
    renderHead();
    animateWires();
  }

  // Related projects float to the top of the rail (FLIP so the move is visible).
  function reorder(on) {
    const items = [...list.children];
    const first = new Map(items.map((el) => [el, el.getBoundingClientRect().top]));
    const ordered = projects.map((p) => rows[p.id]).sort((a, b) => on.has(b.dataset.row) - on.has(a.dataset.row));
    ordered.forEach((el) => list.appendChild(el));
    if (prefersReducedMotion()) return;
    ordered.forEach((el) => {
      const dy = first.get(el) - el.getBoundingClientRect().top;
      if (!dy) return;
      el.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }], { duration: 450, easing: "cubic-bezier(.16,1,.3,1)" });
    });
    list.scrollTop = 0;
  }

  function select(id, { scroll = false } = {}) {
    if (id && skillById[id] && filter !== "all" && skillById[id].cat !== filter) setFilter("all");
    selected = id && selected !== id ? id : null;
    apply();
    if (scroll && selected) {
      document.getElementById("skills").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      setTimeout(() => tiles[selected]?.focus({ preventScroll: true }), 500);
    }
  }

  function setFilter(id) {
    filter = id;
    filtersEl.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === id)));
    tilesEl.querySelectorAll("li").forEach((li) => (li.hidden = id !== "all" && li.dataset.cat !== id));
    if (selected && id !== "all" && skillById[selected].cat !== id) {
      selected = null;
      apply();
    } else animateWires();
    if (!prefersReducedMotion())
      tilesEl.querySelectorAll("li:not([hidden])").forEach((li, i) =>
        li.animate([{ opacity: 0, transform: "translateY(8px) scale(.97)" }, { opacity: 1, transform: "none" }], {
          duration: 380,
          delay: i * 18,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "backwards",
        })
      );
  }

  // ---- wires
  let hoverRow = null;
  let hoverTile = null;
  function drawWires(fresh = false) {
    if (getComputedStyle(wires).display === "none") return;
    const box = root.getBoundingClientRect();
    const listBox = list.getBoundingClientRect();
    const paths = [];
    const visible = (r) => r.bottom > listBox.top + 4 && r.top < listBox.bottom - 4;
    const link = (tile, row, color, i, cls) => {
      if (!tile || tile.closest("li").hidden) return;
      const t = tile.getBoundingClientRect();
      const r = row.querySelector(".dot").getBoundingClientRect();
      if (!visible(r)) return;
      const x1 = t.right - box.left;
      const y1 = t.top + t.height / 2 - box.top;
      const x2 = r.left - box.left - 4;
      const y2 = r.top + r.height / 2 - box.top;
      const k = Math.max(40, (x2 - x1) * 0.5);
      const d = `M${x1} ${y1} C${x1 + k} ${y1} ${x2 - k} ${y2} ${x2} ${y2}`;
      const len = Math.hypot(x2 - x1, y2 - y1) * 1.25;
      paths.push(
        `<path class="${fresh ? "wire" : ""} ${cls || ""}" d="${d}" stroke="${color}" stroke-opacity=".55" style="--len:${len};--d:${i * 70}ms"/>`,
        `<path class="wire-flow" d="${d}" stroke="${color}"/>`,
        `<circle cx="${x2}" cy="${y2}" r="2.5" fill="${color}"/>`,
        `<circle cx="${x1}" cy="${y1}" r="2.5" fill="${color}"/>`
      );
    };
    const sid = selected || hoverTile;
    if (sid) {
      usesOf(sid).forEach((u, i) => link(tiles[sid], rows[u.project.id], skillById[sid].color, i));
    } else if (hoverRow) {
      Object.keys(hoverRow.skills).forEach((s, i) => link(tiles[s], rows[hoverRow.id], hoverRow.color, i));
    }
    wires.innerHTML = paths.join("");
  }
  let raf = 0;
  function animateWires() {
    cancelAnimationFrame(raf);
    drawWires(true);
    const t0 = performance.now();
    const loop = (t) => {
      if (t - t0 > 520) return drawWires(false), void 0;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }

  // ---- events
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (b) setFilter(b.dataset.filter);
  });
  tilesEl.addEventListener("click", (e) => {
    const t = e.target.closest("[data-skill]");
    if (t) select(t.dataset.skill);
  });
  rail.addEventListener("click", (e) => {
    if (e.target.closest("[data-sx-close]")) {
      const prev = selected;
      select(null);
      tiles[prev]?.focus({ preventScroll: true });
      return;
    }
    const o = e.target.closest("[data-open]");
    if (o) openProject(o.dataset.open);
  });
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && selected) {
      const prev = selected;
      select(null);
      tiles[prev]?.focus({ preventScroll: true });
    }
  });
  document.addEventListener("click", (e) => {
    if (!selected || !matchMedia("(max-width: 899px)").matches) return;
    if (!root.contains(e.target)) select(null);
  });
  list.addEventListener("scroll", () => drawWires(false), { passive: true });
  // the rail is sticky, so wires need redrawing as the page scrolls
  let scrollRaf = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (!(selected || hoverTile || hoverRow) || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        drawWires(false);
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", () => drawWires(false));

  if (finePointer()) {
    tilesEl.addEventListener("pointermove", (e) => {
      const t = e.target.closest(".sx-tile");
      if (!t) return;
      const r = t.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      t.style.setProperty("--mx", `${px * 100}%`);
      t.style.setProperty("--my", `${py * 100}%`);
      if (!prefersReducedMotion()) {
        t.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
        t.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
      }
      if (!selected && hoverTile !== t.dataset.skill) {
        hoverTile = t.dataset.skill;
        markRelatedRows(hoverTile);
        drawWires(false);
      }
    });
    tilesEl.addEventListener("pointerout", (e) => {
      const t = e.target.closest(".sx-tile");
      if (!t || t.contains(e.relatedTarget)) return;
      t.style.setProperty("--rx", "0deg");
      t.style.setProperty("--ry", "0deg");
      if (hoverTile) {
        hoverTile = null;
        if (!selected) markRelatedRows(null);
        drawWires(false);
      }
    });
    list.addEventListener("pointerover", (e) => {
      const row = e.target.closest("[data-row]");
      if (!row) return;
      const p = PROJECTS.find((x) => x.id === row.dataset.row);
      Object.values(tiles).forEach((t) => t.classList.toggle("is-related", !!p.skills[t.dataset.skill] && t.dataset.skill !== selected));
      if (!selected) {
        hoverRow = p;
        drawWires(false);
      }
    });
    list.addEventListener("pointerleave", () => {
      Object.values(tiles).forEach((t) => t.classList.remove("is-related"));
      hoverRow = null;
      drawWires(false);
    });
  }
  function markRelatedRows(id) {
    const on = new Set(id ? usesOf(id).map((u) => u.project.id) : []);
    Object.entries(rows).forEach(([rid, row]) => row.classList.toggle("is-dim", !!id && !on.has(rid)));
  }

  apply();
  return {
    select(id) {
      selected = null;
      select(id, { scroll: true });
    },
  };
}
