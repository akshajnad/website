// Experience tower: one floor per role, newest at the top, side projects as annex blocks.
// The camera descends as the page scrolls; hover highlights, click opens the case study.

import * as THREE from "../../vendor/three.js";
import { makeRenderer, dotTexture, rng, fit, project, disposeTree } from "./shared.js";

const SPACING = 1.5;
const SLAB_H = 0.6;

export function createTowerScene({ canvas, labelsEl, floors, reduced, onHover, onSelect }) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0c0f, 12, 26);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);

  scene.add(new THREE.HemisphereLight(0xe6ebff, 0x08090b, 0.75));
  const key = new THREE.DirectionalLight(0xfff0e4, 1.5);
  key.position.set(6, 12, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb4ff, 0.5);
  rim.position.set(-8, 4, -6);
  scene.add(rim);

  const R = rng(5);
  const tower = new THREE.Group();
  scene.add(tower);
  const N = floors.length;
  const pickables = [];
  const W = [3.9, 3.5, 3.7, 3.3, 3.6, 4.1];
  const D = [2.7, 2.9, 2.6, 2.8, 2.5, 3.0];

  const F = floors.map((f, i) => {
    const color = new THREE.Color(f.color);
    const w = W[i % W.length];
    const d = D[i % D.length];
    const g = new THREE.Group();
    g.position.y = -i * SPACING;
    g.rotation.y = i * 0.17;

    const mat = new THREE.MeshStandardMaterial({ color: 0x13171c, roughness: 0.52, metalness: 0.3 });
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, SLAB_H, d), mat);
    slab.userData = { id: f.id, floor: i };
    g.add(slab);
    pickables.push(slab);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(slab.geometry),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })
    );
    g.add(edges);

    const band = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.012, 0.045, d + 0.012),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })
    );
    band.position.y = SLAB_H * 0.22;
    g.add(band);

    // "windows": a lit strip pattern on the two faces toward the camera
    const win = [];
    const cols = Math.floor(w / 0.22);
    for (let c = 0; c < cols; c++) {
      if (R() < 0.35) continue;
      const x = -w / 2 + 0.16 + c * 0.22;
      win.push(x, -0.12, d / 2 + 0.004);
    }
    const rows = Math.floor(d / 0.22);
    for (let c = 0; c < rows; c++) {
      if (R() < 0.35) continue;
      const z = -d / 2 + 0.16 + c * 0.22;
      win.push(w / 2 + 0.004, -0.12, z);
    }
    const winPts = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(win, 3)),
      new THREE.PointsMaterial({ color, size: 0.06, transparent: true, opacity: 0.35, map: dotTexture(), depthWrite: false })
    );
    g.add(winPts);

    // annex blocks for related projects
    const annex = (f.annex || []).map((a, k) => {
      const total = f.annex.length;
      const ang = total === 1 ? -0.9 : -2.4 + (k / Math.max(1, total - 1)) * 2.9;
      const dist = Math.max(w, d) / 2 + 0.75 + (k % 2) * 0.35;
      const s = 0.42 - (total > 3 ? 0.08 : 0);
      const ac = new THREE.Color(a.color);
      const am = new THREE.Mesh(
        new THREE.BoxGeometry(s, s, s),
        new THREE.MeshStandardMaterial({ color: 0x161b21, roughness: 0.45, metalness: 0.3, emissive: ac, emissiveIntensity: 0.08 })
      );
      am.position.set(Math.cos(ang) * dist, (k % 3) * 0.12 - 0.08, Math.sin(ang) * dist);
      am.userData = { id: a.id, floor: i, annex: true };
      g.add(am);
      pickables.push(am);
      const ae = new THREE.LineSegments(
        new THREE.EdgesGeometry(am.geometry),
        new THREE.LineBasicMaterial({ color: ac, transparent: true, opacity: 0.55 })
      );
      ae.position.copy(am.position);
      g.add(ae);
      const bridge = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0).lerp(am.position, 0.42), am.position.clone()]),
        new THREE.LineBasicMaterial({ color: ac, transparent: true, opacity: 0.3 })
      );
      g.add(bridge);
      return { mesh: am, edges: ae, bridge, color: ac, base: am.position.clone() };
    });

    tower.add(g);
    return { g, slab, edges, band, winPts, annex, color, w, d, offset: 0, lift: 0 };
  });

  // spine through every floor
  const spineH = (N - 1) * SPACING + 3;
  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, spineH, 8),
    new THREE.MeshBasicMaterial({ color: 0xece8e1, transparent: true, opacity: 0.18 })
  );
  spine.position.y = -((N - 1) * SPACING) / 2;
  tower.add(spine);

  // foundation rings
  const base = new THREE.Group();
  base.position.y = -(N - 1) * SPACING - SLAB_H;
  [2.6, 3.4, 4.4].forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r, r + 0.012, 96),
      new THREE.MeshBasicMaterial({ color: 0xece8e1, transparent: true, opacity: 0.12 - i * 0.03, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    base.add(ring);
  });
  tower.add(base);

  // slow-drifting motes around the tower
  const motes = [];
  for (let i = 0; i < 220; i++) {
    const a = R() * Math.PI * 2;
    const r = 2.6 + R() * 4;
    motes.push(Math.cos(a) * r, 2 - R() * (spineH + 2), Math.sin(a) * r);
  }
  const motePts = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(motes, 3)),
    new THREE.PointsMaterial({ size: 0.035, color: 0xece8e1, transparent: true, opacity: 0.3, depthWrite: false })
  );
  scene.add(motePts);

  // labels
  const labels = floors.map((f, i) => {
    const el = document.createElement("div");
    el.className = "tower-label";
    el.style.setProperty("--c", f.color);
    el.innerHTML = `<b>${String(N - i).padStart(2, "0")}</b>${f.title}`;
    labelsEl?.appendChild(el);
    return el;
  });

  // state
  let progress = 0; // 0..N-1 float
  let camY = 0;
  let active = 0;
  let hovered = null;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let running = false;
  let raf = 0;
  const t0 = performance.now();
  const tmp = new THREE.Vector3();
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pendingPick = null;

  function frame(now) {
    const t = (now - t0) / 1000;
    if (!fit(renderer, camera, canvas)) return;
    // frame the tower left of centre so floor labels have room on the right
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const ox = cw > 640 ? cw * 0.1 : 0;
    if (camera.view?.offsetX !== ox || camera.view?.fullWidth !== cw || camera.view?.fullHeight !== ch) camera.setViewOffset(cw, ch, ox, 0, cw, ch);
    const k = reduced ? 1 : 0.08;
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;

    const targetY = -progress * SPACING;
    camY += (targetY - camY) * (reduced ? 1 : 0.09);
    const az = 0.78 + pointer.x * 0.22 + (reduced ? 0 : Math.sin(t * 0.15) * 0.05);
    const dist = 15.5;
    camera.position.set(Math.sin(az) * dist, camY + 3.6 - pointer.y * 0.5, Math.cos(az) * dist);
    camera.lookAt(0, camY - 0.25, 0);

    // slide the active floor toward the camera
    const toCam = new THREE.Vector3(camera.position.x, 0, camera.position.z).normalize();
    F.forEach((fl, i) => {
      const isActive = i === active;
      const isHover = hovered && hovered.floor === i && !hovered.annex;
      fl.offset += ((isActive ? 0.55 : 0) - fl.offset) * k;
      fl.lift += ((isHover ? 0.08 : 0) - fl.lift) * k;
      fl.g.position.set(toCam.x * fl.offset, -i * SPACING + fl.lift, toCam.z * fl.offset);
      const near = 1 - Math.min(1, Math.abs(i - progress) / 2.5);
      fl.edges.material.opacity = isActive ? 0.95 : isHover ? 0.75 : 0.14 + near * 0.2;
      fl.band.material.opacity = isActive ? 0.95 : isHover ? 0.7 : 0.18 + near * 0.15;
      fl.winPts.material.opacity = isActive ? 0.9 : 0.25;
      fl.slab.material.color.setHex(isActive ? 0x1b2026 : isHover ? 0x181d23 : 0x12161b);
      fl.annex.forEach((a, j) => {
        const hot = hovered && hovered.id === a.mesh.userData.id;
        a.mesh.material.emissiveIntensity = hot ? 0.55 : isActive ? 0.22 : 0.06;
        a.edges.material.opacity = hot || isActive ? 0.9 : 0.35;
        const bob = reduced ? 0 : Math.sin(t * 0.9 + j * 1.3 + i) * 0.04;
        a.mesh.position.y = a.base.y + bob;
        a.edges.position.y = a.base.y + bob;
        a.mesh.rotation.y = a.edges.rotation.y = reduced ? 0.4 : t * 0.25 + j;
      });
    });
    motePts.rotation.y = t * 0.012;

    if (pendingPick) pick(pendingPick);
    renderer.render(scene, camera);

    const h = canvas.clientHeight;
    labels.forEach((el, i) => {
      const fl = F[i];
      tmp.set(fl.w / 2 + 0.1, 0, -fl.d / 2);
      fl.g.localToWorld(tmp);
      const s = project(tmp, camera, canvas);
      const off = s.y < -20 || s.y > h + 20;
      el.style.opacity = off ? "0" : String(i === active ? 1 : 0.75);
      el.style.transform = `translate(${Math.round(s.x + 8)}px, ${Math.round(s.y - 8)}px)`;
      el.classList.toggle("is-active", i === active);
    });
  }

  function pick({ x, y, client }) {
    pendingPick = null;
    ndc.set((x / canvas.clientWidth) * 2 - 1, -(y / canvas.clientHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickables, false)[0];
    const next = hit ? hit.object.userData : null;
    if ((next && next.id) !== (hovered && hovered.id)) {
      hovered = next;
      canvas.classList.toggle("is-pointer", !!hovered);
    }
    if (hovered) {
      tmp.setFromMatrixPosition(hit.object.matrixWorld);
      onHover?.(hovered, client);
    } else onHover?.(null);
  }

  function loop(now) {
    frame(now);
    if (running) raf = requestAnimationFrame(loop);
  }

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    pendingPick = { x: e.clientX - r.left, y: e.clientY - r.top, client: { x: e.clientX - r.left, y: e.clientY - r.top } };
    if (!running) frame(performance.now());
  }
  function onLeave() {
    pointer.tx = pointer.ty = 0;
    hovered = null;
    canvas.classList.remove("is-pointer");
    onHover?.(null);
  }
  function onClick(e) {
    const r = canvas.getBoundingClientRect();
    pick({ x: e.clientX - r.left, y: e.clientY - r.top, client: { x: e.clientX - r.left, y: e.clientY - r.top } });
    if (hovered) onSelect?.(hovered.id);
  }
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("click", onClick);

  frame(performance.now());

  return {
    start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    setProgress(p, a) {
      progress = p;
      active = a;
      if (!running) frame(performance.now());
    },
    dispose() {
      this.stop();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      disposeTree(scene);
      renderer.dispose();
      labels.forEach((l) => l.remove());
    },
  };
}
