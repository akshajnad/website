// Case-study dialog: one renderer for every experience and project in data.js.
// Deep-linkable at #/work/<id>; Esc, the close button and browser Back all close it.

import { PROJECTS, FLOORS, SKILLS, byId, skillById } from "./data.js";
import { iconSVG } from "./icons.js";
import { esc, countUp, prefersReducedMotion } from "./util.js";

const KIND_LABEL = { experience: "Experience", startup: "Startup", research: "Research", project: "Project" };
const NODE_KIND = { ai: "Model / agent", infra: "Infrastructure", data: "Data / state", human: "Human-in-the-loop", ui: "Interface", io: "Input / output" };

// Stack strings that correspond to a skill tile, so chips can jump to the explorer.
const STACK_ALIAS = {
  "amazon bedrock": "bedrock",
  lambda: "lambda",
  "aws lambda": "lambda",
  "ros 2": "ros2",
  dynatrace: "observability",
  graylog: "observability",
  "apple vision": "applevision",
  "core ml": "applevision",
  "vultr vps": "vultr",
  "vultr ai agents": "vultr",
  "bedrock agentcore": "bedrock",
  "bedrock knowledge bases": "bedrock",
  "postgresql (rds)": "postgresql",
  pgvector: "postgresql",
  jira: "atlassian",
  confluence: "atlassian",
  langsmith: "evals",
  mappo: "rl",
  "aws ecs": "aws",
};
function skillForStack(name, project) {
  const key = name.toLowerCase();
  const id = STACK_ALIAS[key] || SKILLS.find((s) => s.name.toLowerCase() === key)?.id;
  return id && project.skills && project.skills[id] ? id : null;
}

export function initCaseStudy({ onSkill } = {}) {
  const dlg = document.querySelector("[data-case]");
  const body = document.querySelector("[data-case-body]");
  const scroller = document.querySelector("[data-case-scroll]");
  const lightbox = initLightbox();
  if (!dlg || !body) return { open() {}, close() {} };

  let current = null;
  let pushed = false;
  let returnFocus = null;
  let cleanup = [];

  const order = PROJECTS.map((p) => p.id);

  function render(id) {
    cleanup.forEach((fn) => fn());
    cleanup = [];
    const floor = FLOORS.find((f) => f.id === id && f.annex && !byId[id]);
    if (floor) return renderGroup(floor);
    const p = byId[id];
    dlg.style.setProperty("--c", p.color);
    const i = order.indexOf(id);
    const prev = byId[order[(i - 1 + order.length) % order.length]];
    const next = byId[order[(i + 1) % order.length]];
    let n = 0;
    const sec = () => String(++n).padStart(2, "0");

    const results = (p.results || [])
      .map((r) => `<div><dt>${esc(r.label)}</dt><dd data-count>${esc(r.value)}</dd></div>`)
      .join("");
    const links = (p.links || [])
      .map(
        (l) =>
          `<a class="btn ${l.primary ? "btn-case" : "btn-ghost"}" href="${esc(l.href)}" ${
            /^https?:/.test(l.href) || l.href.endsWith(".pdf") ? 'target="_blank" rel="noopener"' : ""
          }><span>${esc(l.label)}</span><span aria-hidden="true">↗</span></a>`
      )
      .join("");

    const media = p.media && p.media.length ? mediaBlock(p) : "";
    const problem = p.problem
      ? `<div><h3 class="cs-h" data-n="${sec()}">The problem</h3><p class="cs-problem">${esc(p.problem)}</p></div>`
      : "";
    const built = p.built?.length
      ? `<div><h3 class="cs-h" data-n="${sec()}">What I built</h3><ol class="cs-built">${p.built
          .map((b) => `<li>${esc(b)}</li>`)
          .join("")}</ol></div>`
      : "";

    const decisions = p.decisions?.length
      ? `<section class="cs-section"><h3 class="cs-h" data-n="${sec()}">Engineering decisions</h3><div class="cs-decisions">${p.decisions
          .map((d) => `<article class="cs-decision"><h4>${esc(d.title)}</h4><p>${esc(d.text)}</p></article>`)
          .join("")}</div>${p.status ? `<p class="cs-status"><b>In progress ·</b> ${esc(p.status)}</p>` : ""}</section>`
      : p.status
        ? `<section class="cs-section"><p class="cs-status"><b>In progress ·</b> ${esc(p.status)}</p></section>`
        : "";

    const diagram = p.diagram
      ? `<section class="cs-section"><h3 class="cs-h" data-n="${sec()}">Architecture</h3><div class="dg" data-dg></div></section>`
      : "";

    const stack = p.stack?.length
      ? `<section class="cs-section"><h3 class="cs-h" data-n="${sec()}">Stack</h3><ul class="cs-stack">${p.stack
          .map((s) => {
            const sid = skillForStack(s, p);
            if (!sid) return `<li><span class="chip">${esc(s)}</span></li>`;
            const sk = skillById[sid];
            return `<li><button type="button" class="chip" data-skill-jump="${sid}" title="See every project that used ${esc(
              sk.name
            )}">${sk.icon ? iconSVG(sk.icon) : ""}${esc(s)}<span class="arrow" aria-hidden="true">↗</span></button></li>`;
          })
          .join("")}</ul><p class="media-caption">Highlighted chips open the skill explorer with every other project that used them.</p></section>`
      : "";

    body.innerHTML = `
      <div class="cs-bar">
        <p class="mono">${esc(KIND_LABEL[p.kind] || "Project")} · ${esc(p.title)}</p>
        <div class="cs-nav">
          <button type="button" data-go="${prev.id}" aria-label="Previous: ${esc(prev.title)}">← ${esc(prev.title)}</button>
          <button type="button" data-go="${next.id}" aria-label="Next: ${esc(next.title)}">${esc(next.title)} →</button>
        </div>
        <button type="button" class="cs-close" data-close>Close <span aria-hidden="true">✕</span></button>
      </div>
      <header class="cs-hero">
        <div class="cs-kicker">
          <span class="cs-mark" aria-hidden="true">${esc(p.mark)}</span>
          <p class="mono">${esc(p.role)}${p.team ? " · " + esc(p.team) : ""}</p>
          <p class="mono">${esc(p.org)}${p.dates ? " · " + esc(p.dates) : ""}</p>
          ${p.award ? `<span class="award-chip">✳ ${esc(p.award)}</span>` : ""}
        </div>
        <h2 class="cs-title" id="cs-title">${esc(p.title)}</h2>
        <p class="cs-headline">${esc(p.headline)}</p>
        <p class="cs-summary">${esc(p.summary)}</p>
        ${links ? `<div class="cs-links">${links}</div>` : ""}
      </header>
      ${results ? `<dl class="cs-results">${results}</dl>` : ""}
      ${media}
      ${problem || built ? `<section class="cs-section"><div class="${problem && built ? "cs-two" : ""}">${problem}${built}</div></section>` : ""}
      ${decisions}
      ${diagram}
      ${stack}
      <button type="button" class="cs-next" data-go="${next.id}">
        <span><small class="mono">Next case study</small><strong>${esc(next.title)}</strong></span>
        <span class="arrow" aria-hidden="true">→</span>
      </button>`;

    const dgEl = body.querySelector("[data-dg]");
    if (dgEl) cleanup.push(renderDiagram(dgEl, p.diagram));
    body.querySelectorAll("[data-count]").forEach((el) => countUp(el));
  }

  function mediaBlock(p) {
    const [main, ...rest] = p.media;
    const side = rest.map((m) => `<figure>${frame(m)}<figcaption class="media-caption">${esc(m.caption)}</figcaption></figure>`).join("");
    const video = p.video
      ? `<figure><div class="cs-video" data-video="${esc(p.video.href)}"><button type="button" class="btn btn-primary" style="position:absolute;inset:auto auto 50% 50%;transform:translate(-50%,50%)" data-play><span>▶ ${esc(
          p.video.label
        )}</span></button></div><figcaption class="media-caption">Loads YouTube when you press play. <a class="link-arrow" href="${esc(
          p.video.href
        )}" target="_blank" rel="noopener">Open on YouTube ↗</a></figcaption></figure>`
      : "";
    return `<section class="cs-section cs-media"><h3 class="cs-h" data-n="↳">The real thing</h3>
      <div class="${side || video ? "cs-media-row" : ""}">
        <figure>${frame(main)}<figcaption class="media-caption">${esc(main.caption)}</figcaption></figure>
        ${side || video ? `<div class="cs-media">${side}${video}</div>` : ""}
      </div></section>`;
  }

  function renderGroup(floor) {
    dlg.style.setProperty("--c", floor.color);
    const cards = floor.annex
      .map((id) => byId[id])
      .map(
        (p) => `<li><button type="button" class="build-card" style="--c:${p.color}" data-go="${p.id}">
          <div class="build-top"><span class="build-mark">${esc(p.mark)}</span>${p.award ? `<span class="award-chip">✳ ${esc(p.award.split("·")[1] || p.award)}</span>` : ""}</div>
          <h4>${esc(p.title)}</h4><p>${esc(p.summary)}</p>
          <div class="build-foot"><span>${esc(p.org)}</span><span class="go">Open →</span></div></button></li>`
      )
      .join("");
    body.innerHTML = `
      <div class="cs-bar"><p class="mono">Floor · ${esc(floor.title)}</p>
        <button type="button" class="cs-close" data-close>Close <span aria-hidden="true">✕</span></button></div>
      <header class="cs-hero">
        <div class="cs-kicker"><span class="cs-mark" aria-hidden="true">${esc(floor.mark)}</span><p class="mono">${esc(floor.org)} · ${esc(floor.dates)}</p></div>
        <h2 class="cs-title" id="cs-title">${esc(floor.title)}</h2>
        <p class="cs-headline">${esc(floor.role)}.</p>
        <p class="cs-summary">${esc(floor.summary)}</p>
      </header>
      <section class="cs-section"><ul class="cs-group">${cards}</ul></section>`;
  }

  function show(id, { push = true } = {}) {
    if (!byId[id] && !FLOORS.find((f) => f.id === id)) return;
    const wasOpen = dlg.open;
    current = id;
    render(id);
    if (!wasOpen) {
      returnFocus = document.activeElement;
      dlg.classList.remove("is-closing");
      dlg.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    scroller.scrollTop = 0;
    const hash = `#/work/${id}`;
    if (push && location.hash !== hash) {
      if (wasOpen && pushed) history.replaceState({ cs: id }, "", hash);
      else {
        history.pushState({ cs: id }, "", hash);
        pushed = true;
      }
    }
    requestAnimationFrame(() => body.querySelector("[data-close]")?.focus({ preventScroll: true }));
  }

  function hide() {
    if (!dlg.open) return;
    const finish = () => {
      dlg.close();
      dlg.classList.remove("is-closing");
      document.documentElement.style.overflow = "";
      cleanup.forEach((fn) => fn());
      cleanup = [];
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    };
    if (prefersReducedMotion()) return finish();
    dlg.classList.add("is-closing");
    setTimeout(finish, 260);
  }

  function close() {
    if (pushed) {
      pushed = false;
      history.back();
    } else {
      if (/^#\/work\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
      hide();
    }
  }

  dlg.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target === scroller) return close();
    const go = e.target.closest("[data-go]");
    if (go) return show(go.dataset.go);
    if (e.target.closest("[data-close]")) return close();
    const jump = e.target.closest("[data-skill-jump]");
    if (jump && onSkill) {
      const sid = jump.dataset.skillJump;
      close();
      setTimeout(() => onSkill(sid), 320);
      return;
    }
    const fr = e.target.closest("[data-zoom]");
    if (fr) return lightbox.open(fr.dataset.zoom, fr.dataset.alt, fr.dataset.caption);
    const play = e.target.closest("[data-play]");
    if (play) {
      const box = play.closest("[data-video]");
      const vid = new URL(box.dataset.video).searchParams.get("v");
      box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(
        vid
      )}?autoplay=1&rel=0" title="Graption demo video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    }
  });

  const syncFromHash = () => {
    const m = location.hash.match(/^#\/work\/([\w-]+)/);
    if (m) {
      if (!dlg.open || current !== m[1]) show(m[1], { push: false });
    } else if (dlg.open) {
      pushed = false;
      hide();
    }
  };
  window.addEventListener("popstate", syncFromHash);
  window.addEventListener("hashchange", syncFromHash);

  const m = location.hash.match(/^#\/work\/([\w-]+)/);
  if (m) requestAnimationFrame(() => show(m[1], { push: false }));

  return { open: show, close, lightbox, get current() { return current; } };
}

// ---------------------------------------------------------------------------
// Media frames (also used by the showcase)
export function frame(m) {
  const img = `<picture>${m.webp ? `<source srcset="${esc(m.webp)}" type="image/webp" />` : ""}<img src="${esc(m.src)}" alt="${esc(
    m.alt
  )}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" /></picture>`;
  const attrs = `type="button" data-zoom="${esc(m.src)}" data-alt="${esc(m.alt)}" data-caption="${esc(m.caption || "")}" aria-label="Enlarge: ${esc(m.alt)}"`;
  const zoom = `<span class="frame-zoom" aria-hidden="true">Enlarge ⤢</span>`;
  if (m.frame === "browser")
    return `<button class="frame frame-browser" ${attrs}><span class="frame-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(
      m.url || ""
    )}</span></span>${img}${zoom}</button>`;
  if (m.frame === "phone") return `<button class="frame frame-phone" ${attrs}><span class="screen">${img}</span>${zoom}</button>`;
  return `<button class="frame frame-plain" ${attrs}>${img}${zoom}</button>`;
}

export function initLightbox() {
  const lb = document.querySelector("[data-lightbox]");
  if (!lb) return { open() {} };
  const img = lb.querySelector("[data-lightbox-img]");
  const cap = lb.querySelector("[data-lightbox-cap]");
  let back = null;
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest("[data-lightbox-close]")) lb.close();
  });
  lb.addEventListener("close", () => back && back.isConnected && back.focus({ preventScroll: true }));
  return {
    open(src, alt, caption) {
      back = document.activeElement;
      img.src = src;
      img.alt = alt || "";
      cap.textContent = caption || "";
      lb.showModal();
      lb.querySelector("[data-lightbox-close]").focus();
    },
  };
}

// ---------------------------------------------------------------------------
// Interactive architecture diagram
function renderDiagram(root, d) {
  const nodes = d.nodes;
  const edges = d.edges.map(([from, to, label = "", style = ""]) => ({ from, to, label, style }));
  const name = Object.fromEntries(nodes.map((n) => [n.id, n.label]));
  const kinds = [...new Set(nodes.map((n) => n.kind))];

  root.innerHTML = `
    ${d.caption ? `<p class="dg-caption">${esc(d.caption)}</p>` : ""}
    <div class="dg-wrap">
      <div class="dg-canvas">
        <div class="dg-grid" style="--cols:${d.cols || 4}" role="group" aria-label="Architecture components">
          ${nodes
            .map((n) => {
              const outs = edges.filter((e) => e.from === n.id).map((e) => name[e.to]);
              return `<button type="button" class="dg-node" data-node="${n.id}" data-kind="${n.kind}" aria-pressed="false" style="grid-column:${n.col};grid-row:${n.row}">
                <b>${esc(n.label)}</b><small>${esc(n.sub || "")}</small>${outs.length ? `<span class="dg-to">→ ${esc(outs.join(", "))}</span>` : ""}</button>`;
            })
            .join("")}
        </div>
        <svg class="dg-svg" aria-hidden="true"></svg>
      </div>
      <aside class="dg-info" aria-live="polite"></aside>
    </div>
    <div class="dg-legend" aria-hidden="true">${kinds
      .map((k) => `<span><i></i>${NODE_KIND[k]}</span>`)
      .join("")}</div>`;

  // legend swatches pick up the same colors as nodes
  const swatch = { ai: "#ff9a6b", infra: "#8fb4ff", data: "#d8b4ff", human: "#c9e49e", ui: "#5fd0c4", io: "#e8e4dc" };
  root.querySelectorAll(".dg-legend i").forEach((i, idx) => (i.style.background = swatch[kinds[idx]]));

  const grid = root.querySelector(".dg-grid");
  const canvas = root.querySelector(".dg-canvas");
  const svg = root.querySelector(".dg-svg");
  const info = root.querySelector(".dg-info");
  let selected = null;

  function select(id) {
    selected = id;
    const n = nodes.find((x) => x.id === id);
    root.classList.add("has-sel");
    const linked = new Set();
    edges.forEach((e) => {
      if (e.from === id) linked.add(e.to);
      if (e.to === id) linked.add(e.from);
    });
    grid.querySelectorAll(".dg-node").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.node === id));
      b.classList.toggle("is-linked", linked.has(b.dataset.node));
    });
    svg.querySelectorAll("path[data-e]").forEach((p) => {
      const [a, b] = p.dataset.e.split(">");
      p.classList.toggle("is-on", a === id || b === id);
    });
    const ins = edges.filter((e) => e.to === id).map((e) => name[e.from]);
    const outs = edges.filter((e) => e.from === id).map((e) => name[e.to]);
    info.innerHTML = `<p class="mono">${esc(NODE_KIND[n.kind] || "")}</p><h4>${esc(n.label)}</h4>
      ${n.sub ? `<p class="mono" style="margin-top:4px;text-transform:none;letter-spacing:0">${esc(n.sub)}</p>` : ""}
      <p>${esc(n.text)}</p>
      ${ins.length || outs.length ? `<ul>${ins.length ? `<li>From: ${esc(ins.join(", "))}</li>` : ""}${outs.length ? `<li>To: ${esc(outs.join(", "))}</li>` : ""}</ul>` : ""}`;
  }

  function draw() {
    const box = canvas.getBoundingClientRect();
    if (!box.width || getComputedStyle(svg).display === "none") return;
    const rect = (id) => {
      const r = grid.querySelector(`[data-node="${id}"]`).getBoundingClientRect();
      return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cx: r.left - box.left + r.width / 2, cy: r.top - box.top + r.height / 2 };
    };
    const gap = parseFloat(getComputedStyle(grid).rowGap) || 38;
    let out = `<defs><marker id="dg-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrowhead" d="M0 0 8 4 0 8z" style="fill:rgba(236,232,225,.4);stroke:none"/></marker></defs>`;
    edges.forEach((e) => {
      const A = rect(e.from);
      const B = rect(e.to);
      let dPath;
      let lx;
      let ly;
      if (e.style === "loop") {
        const y = Math.max(A.b, B.b) + gap * 0.5;
        const r = 10;
        const dir = B.cx < A.cx ? -1 : 1;
        dPath = `M${A.cx} ${A.b} L${A.cx} ${y - r} Q${A.cx} ${y} ${A.cx + dir * r} ${y} L${B.cx - dir * r} ${y} Q${B.cx} ${y} ${B.cx} ${y - r} L${B.cx} ${B.b + 2}`;
        lx = (A.cx + B.cx) / 2;
        ly = y - 6;
      } else if (B.l >= A.r - 1 || B.r <= A.l + 1) {
        const right = B.l >= A.r - 1;
        const x1 = right ? A.r : A.l;
        const x2 = right ? B.l - 2 : B.r + 2;
        const k = Math.max(24, Math.abs(x2 - x1) * 0.45) * (right ? 1 : -1);
        dPath = `M${x1} ${A.cy} C${x1 + k} ${A.cy} ${x2 - k} ${B.cy} ${x2} ${B.cy}`;
        lx = (x1 + x2) / 2;
        ly = (A.cy + B.cy) / 2 - 6;
      } else {
        const down = B.t >= A.b - 1;
        const y1 = down ? A.b : A.t;
        const y2 = down ? B.t - 2 : B.b + 2;
        const k = Math.max(16, Math.abs(y2 - y1) * 0.45) * (down ? 1 : -1);
        dPath = `M${A.cx} ${y1} C${A.cx} ${y1 + k} ${B.cx} ${y2 - k} ${B.cx} ${y2}`;
        lx = (A.cx + B.cx) / 2 + 8;
        ly = (y1 + y2) / 2 + 3;
      }
      const cls = e.style === "soft" || e.style === "loop" ? "soft" : "";
      out += `<path class="base ${cls}" data-e="${e.from}>${e.to}" d="${dPath}" marker-end="url(#dg-arrow)"/>`;
      out += `<path class="flow" data-e="${e.from}>${e.to}" d="${dPath}"/>`;
      if (e.label) out += `<text x="${lx}" y="${ly}" text-anchor="${e.style === "loop" ? "middle" : "start"}">${esc(e.label)}</text>`;
    });
    svg.innerHTML = out;
    if (selected) select(selected);
  }

  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-node]");
    if (b) select(b.dataset.node);
  });
  grid.addEventListener("mouseover", (e) => {
    const b = e.target.closest("[data-node]");
    if (b && matchMedia("(hover: hover)").matches) select(b.dataset.node);
  });
  grid.addEventListener("keydown", (e) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    const btns = [...grid.querySelectorAll("[data-node]")];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const j = (i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length;
    btns[j].focus();
    select(btns[j].dataset.node);
  });

  // ResizeObserver fires once layout exists (including the first time the dialog opens)
  const ro = new ResizeObserver(() => draw());
  ro.observe(canvas);
  select(nodes[0].id);
  return () => ro.disconnect();
}
