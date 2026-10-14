// Hero: three stacked system layers (interface / intelligence / infrastructure)
// with signals travelling up through them. Responds to pointer and scroll.

import * as THREE from "../../vendor/three.js";
import { makeRenderer, dotTexture, rng, fit, project, disposeTree } from "./shared.js";

const LAYERS = [
  { name: "Interface", detail: "React Native · Next.js · SwiftUI", color: 0xff7a45 },
  { name: "Intelligence", detail: "Bedrock agents · RAG · PyTorch", color: 0xc9e49e },
  { name: "Infrastructure", detail: "AWS · FastAPI · PostgreSQL", color: 0x8fb4ff },
];

export function createHeroScene({ canvas, labelsEl, reduced, compact }) {
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0c0f, 11, 22);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(9.6, 7.4, 9.6);
  camera.lookAt(0, -0.3, 0);

  scene.add(new THREE.HemisphereLight(0xe8ecff, 0x0a0c0f, 0.7));
  const key = new THREE.DirectionalLight(0xfff1e6, 1.4);
  key.position.set(5, 9, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb4ff, 0.6);
  rim.position.set(-6, 2, -5);
  scene.add(rim);

  const root = new THREE.Group();
  root.rotation.y = -0.55;
  // nudge the stack toward screen-right so it sits beside the name, not under it
  const RIGHT = new THREE.Vector3(1, 0, -1).normalize();
  const baseOffset = RIGHT.clone().multiplyScalar(compact ? 0 : 1.15);
  scene.add(root);

  const R = rng(11);
  const SIZE = 3.7;
  const GRID = 7;
  const step = SIZE / (GRID + 1);
  const plates = [];
  const nodesByLayer = [];

  LAYERS.forEach((L, i) => {
    const g = new THREE.Group();
    const color = new THREE.Color(L.color);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(SIZE, 0.09, SIZE),
      new THREE.MeshStandardMaterial({ color: 0x12161b, roughness: 0.5, metalness: 0.35, transparent: true, opacity: 0.92 })
    );
    g.add(body);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(body.geometry),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 })
    );
    g.add(edges);

    // dot grid on the surface
    const pts = [];
    for (let x = 1; x <= GRID; x++) for (let z = 1; z <= GRID; z++) pts.push(-SIZE / 2 + x * step, 0.06, -SIZE / 2 + z * step);
    const grid = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)),
      new THREE.PointsMaterial({ color: 0xece8e1, size: 0.035, transparent: true, opacity: 0.28, sizeAttenuation: true })
    );
    g.add(grid);

    // nodes: a few lit cells per layer
    const count = compact ? 5 : 7;
    const nodes = [];
    const used = new Set();
    while (nodes.length < count) {
      const gx = 1 + Math.floor(R() * GRID);
      const gz = 1 + Math.floor(R() * GRID);
      const k = gx + "," + gz;
      if (used.has(k)) continue;
      used.add(k);
      nodes.push(new THREE.Vector3(-SIZE / 2 + gx * step, 0.16, -SIZE / 2 + gz * step));
    }
    const nodeMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.17, 0.17, 0.17),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6, roughness: 0.4 }),
      nodes.length
    );
    const m = new THREE.Object3D();
    nodes.forEach((p, j) => {
      m.position.copy(p);
      m.updateMatrix();
      nodeMesh.setMatrixAt(j, m.matrix);
    });
    g.add(nodeMesh);

    // in-layer wiring
    const seg = [];
    for (let j = 1; j < nodes.length; j++) {
      const a = nodes[j - 1];
      const b = nodes[j];
      seg.push(a.x, 0.07, a.z, b.x, 0.07, a.z, b.x, 0.07, a.z, b.x, 0.07, b.z);
    }
    g.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(seg, 3)),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
      )
    );

    root.add(g);
    plates.push({ g, edges, body, nodes, color, nodeMesh });
    nodesByLayer.push(nodes);
  });

  // vertical links between layers + travelling pulses
  const links = []; // { lower, upper, a(local lower), b(local upper) }
  for (let i = LAYERS.length - 1; i > 0; i--) {
    nodesByLayer[i].forEach((a) => {
      const b = nodesByLayer[i - 1][Math.floor(R() * nodesByLayer[i - 1].length)];
      links.push({ from: i, to: i - 1, a, b });
    });
  }
  const bottomLinks = links.map((l, i) => (l.from === LAYERS.length - 1 ? i : -1)).filter((i) => i >= 0);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(links.length * 6), 3));
  const linkLines = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: 0xece8e1, transparent: true, opacity: 0.16 }));
  root.add(linkLines);

  const PULSES = reduced ? 0 : compact ? 14 : 26;
  const pulses = Array.from({ length: PULSES }, () => ({ link: Math.floor(R() * links.length), t: R() }));
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(Math.max(PULSES, 1) * 3), 3));
  pulseGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(Math.max(PULSES, 1) * 3), 3));
  const pulsePts = new THREE.Points(
    pulseGeo,
    new THREE.PointsMaterial({
      size: 0.22,
      map: dotTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  root.add(pulsePts);

  // ambient dust
  const dust = [];
  for (let i = 0; i < (compact ? 60 : 140); i++) dust.push((R() - 0.5) * 12, (R() - 0.5) * 8, (R() - 0.5) * 12);
  const dustPts = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(dust, 3)),
    new THREE.PointsMaterial({ size: 0.04, color: 0xece8e1, transparent: true, opacity: 0.25, depthWrite: false })
  );
  scene.add(dustPts);

  // HTML labels
  const labels = LAYERS.map((L) => {
    const el = document.createElement("div");
    el.className = "hero-label";
    el.innerHTML = `<b>${L.name}</b><i>${L.detail}</i>`;
    labelsEl?.appendChild(el);
    return el;
  });

  const CORNERS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  // state
  let spread = 1.3;
  let scrollP = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let running = false;
  let raf = 0;
  let t0 = performance.now();
  const tmp = new THREE.Vector3();

  function layout() {
    const s = spread + scrollP * 1.3;
    plates.forEach((p, i) => (p.g.position.y = (1 - i) * s));
    const pos = linkGeo.attributes.position.array;
    links.forEach((l, k) => {
      const ya = plates[l.from].g.position.y;
      const yb = plates[l.to].g.position.y;
      pos.set([l.a.x, ya + 0.16, l.a.z, l.b.x, yb - 0.05, l.b.z], k * 6);
    });
    linkGeo.attributes.position.needsUpdate = true;
  }

  function frame(now) {
    const t = (now - t0) / 1000;
    if (!fit(renderer, camera, canvas)) return;
    const ease = reduced ? 1 : 0.06;
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;
    root.rotation.y = -0.55 + pointer.x * 0.35 + (reduced ? 0 : Math.sin(t * 0.18) * 0.08) + scrollP * 0.9;
    root.rotation.x = pointer.y * 0.08;
    root.position.set(baseOffset.x, scrollP * 0.8, baseOffset.z);
    layout();

    plates.forEach((p, i) => {
      p.g.rotation.y = reduced ? 0 : Math.sin(t * 0.3 + i) * 0.02;
      p.edges.material.opacity = 0.45 + (reduced ? 0 : Math.sin(t * 1.2 + i * 1.7) * 0.12);
    });

    if (PULSES) {
      const pos = pulseGeo.attributes.position.array;
      const col = pulseGeo.attributes.color.array;
      pulses.forEach((pu, k) => {
        pu.t += 0.006 + (k % 5) * 0.0014;
        if (pu.t >= 1) {
          // continue upward from the node we arrived at, else restart at the bottom layer
          const l = links[pu.link];
          const next = links.findIndex((x) => x.from === l.to && x.a === l.b);
          pu.link = next >= 0 ? next : bottomLinks[Math.floor(R() * bottomLinks.length)];
          pu.t = 0;
        }
        const l = links[pu.link];
        const ya = plates[l.from].g.position.y + 0.16;
        const yb = plates[l.to].g.position.y - 0.05;
        tmp.set(l.a.x + (l.b.x - l.a.x) * pu.t, ya + (yb - ya) * pu.t, l.a.z + (l.b.z - l.a.z) * pu.t);
        pos.set([tmp.x, tmp.y, tmp.z], k * 3);
        const c = plates[l.to].color;
        const fade = Math.sin(Math.PI * pu.t);
        col.set([c.r * fade, c.g * fade, c.b * fade], k * 3);
      });
      pulseGeo.attributes.position.needsUpdate = true;
      pulseGeo.attributes.color.needsUpdate = true;
    }
    dustPts.rotation.y = t * 0.01;

    renderer.render(scene, camera);

    // labels follow whichever plate corner is furthest right on screen
    labels.forEach((el, i) => {
      let best = null;
      for (const [cx, cz] of CORNERS) {
        tmp.set(cx * SIZE * 0.5, 0, cz * SIZE * 0.5);
        plates[i].g.localToWorld(tmp);
        const s = project(tmp, camera, canvas);
        if (!best || s.x > best.x) best = s;
      }
      el.style.transform = `translate(${Math.round(Math.min(best.x + 18, canvas.clientWidth - 236))}px, ${Math.round(best.y - 14)}px)`;
      el.classList.add("is-on");
      el.style.opacity = String(Math.max(0, 1 - scrollP * 2.2));
    });
  }

  function loop(now) {
    frame(now);
    if (running) raf = requestAnimationFrame(loop);
  }

  function onPointer(e) {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    if (reduced) frame(performance.now());
  }
  window.addEventListener("pointermove", onPointer, { passive: true });

  layout();
  frame(performance.now());

  return {
    start() {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    setScroll(p) {
      scrollP = p;
      if (!running) frame(performance.now());
    },
    resize() {
      frame(performance.now());
    },
    dispose() {
      this.stop();
      window.removeEventListener("pointermove", onPointer);
      disposeTree(scene);
      renderer.dispose();
      labels.forEach((l) => l.remove());
    },
  };
}
