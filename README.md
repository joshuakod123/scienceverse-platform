import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

/** AP Stats — Unit 1.1: Individuals, Variables, Samples
 *  - Concept cards + tiny SVG diagrams
 *  - 3D demo: population grid → highlight a simple random sample
 *  - Classify variables (instant feedback)
 *  - 3 quick-check items
 */
export default function Unit11() {
  const [sampleN, setSampleN] = useState(25);
  const popSize = 100; // 10x10 grid for clarity

  // data table for classification
  const columns = useMemo(
    () => [
      { key: "id", label: "Student ID", ans: "categorical" }, // identifier → categorical
      { key: "name", label: "Name", ans: "categorical" },
      { key: "color", label: "Favorite Color", ans: "categorical" },
      { key: "height", label: "Height (cm)", ans: "quant-cont" },
      { key: "siblings", label: "Siblings", ans: "quant-disc" },
      { key: "commute", label: "Commute (min)", ans: "quant-cont" },
    ],
    []
  );
  const [choice, setChoice] = useState(
    () => Object.fromEntries(columns.map((c) => [c.key, ""]))
  );
  const [fb, setFb] = useState({}); // per-field feedback

  function gradeClassify() {
    const out = {};
    columns.forEach((c) => {
      const v = choice[c.key];
      if (!v) out[c.key] = { ok: false, msg: "Pick a type." };
      else if (v === c.ans) out[c.key] = { ok: true, msg: "✔ Correct" };
      else {
        const hint =
          c.ans === "categorical"
            ? "Think labels/identifiers—averaging makes no sense."
            : c.ans === "quant-disc"
            ? "Counts change in whole steps (0,1,2…)."
            : "Measured on a scale; decimals make sense.";
        out[c.key] = { ok: false, msg: `Not quite. Hint: ${hint}` };
      }
    });
    setFb(out);
  }
  function resetClassify() {
    setChoice(Object.fromEntries(columns.map((c) => [c.key, ""])));
    setFb({});
  }

  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-slate-900 via-[#0b1327] to-black">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-white/10 bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Unit 1.1 — Individuals, Variables, Samples</h1>
          <p className="text-slate-400 text-sm">Who we measure; what we record; how we sample.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Concept cards */}
        <section className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Individuals",
              body:
                "The objects/people we study (students, animals, products…). Each row in a data table is one individual.",
              svg: (
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  <rect x="10" y="20" width="280" height="40" rx="8" className="fill-indigo-500/20 stroke-indigo-400/60" />
                  {[40, 100, 160, 220].map((x, i) => (
                    <circle key={i} cx={x} cy="40" r="8" className="fill-sky-300/80 stroke-white/40" />
                  ))}
                </svg>
              ),
            },
            {
              title: "Variables",
              body:
                "A variable is a characteristic recorded for each individual. Types: categorical (labels) vs quantitative (numbers).",
              svg: (
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  <rect x="20" y="20" width="100" height="40" rx="8" className="fill-emerald-400/30" />
                  <text x="70" y="45" textAnchor="middle" className="fill-white text-[12px]">Color</text>
                  <rect x="150" y="20" width="120" height="40" rx="8" className="fill-fuchsia-400/30" />
                  <text x="210" y="45" textAnchor="middle" className="fill-white text-[12px]">Height (cm)</text>
                </svg>
              ),
            },
            {
              title: "Population vs Sample",
              body:
                "Population is the full group. A sample is a subset used to learn about the population.",
              svg: (
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  <rect x="10" y="10" width="130" height="60" rx="8" className="fill-white/10 stroke-white/30" />
                  <text x="75" y="25" textAnchor="middle" className="fill-slate-300 text-[10px]">Population</text>
                  <rect x="160" y="10" width="130" height="60" rx="8" className="fill-amber-400/20 stroke-amber-200/60" />
                  <text x="225" y="25" textAnchor="middle" className="fill-amber-100 text-[10px]">Sample</text>
                </svg>
              ),
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
            >
              <div className="text-xs uppercase tracking-wide text-slate-300/80">{c.title}</div>
              <p className="text-slate-300 text-sm mt-1">{c.body}</p>
              <div className="mt-2">{c.svg}</div>
            </motion.div>
          ))}
        </section>

        {/* 3D population -> sample */}
        <section className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="font-semibold mb-2">Interactive — Population → Sample (3D)</h2>
          <p className="text-slate-400 text-sm mb-2">
            Drag to rotate. Use the slider to choose a sample size. Yellow spheres are the selected sample out of a 10×10 population.
          </p>
          <PopulationSample3D sampleN={sampleN} setSampleN={setSampleN} popSize={popSize} />
        </section>

        {/* Classify variables */}
        <section className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="font-semibold mb-2">Interactive — Classify Variables</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-2 text-left">Column</th>
                  <th className="p-2 text-left">Your choice</th>
                  <th className="p-2 text-left">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((c) => (
                  <tr key={c.key} className="border-t border-white/10">
                    <td className="p-2">{c.label}</td>
                    <td className="p-2">
                      <select
                        className="bg-slate-800 border border-white/10 rounded-md px-2 py-1"
                        value={choice[c.key]}
                        onChange={(e) => setChoice((p) => ({ ...p, [c.key]: e.target.value }))}
                      >
                        <option value="">— choose —</option>
                        <option value="categorical">Categorical</option>
                        <option value="quant-disc">Quantitative — Discrete</option>
                        <option value="quant-cont">Quantitative — Continuous</option>
                      </select>
                    </td>
                    <td className="p-2">
                      {fb[c.key] && (
                        <span className={fb[c.key].ok ? "text-emerald-400" : "text-rose-400"}>
                          {fb[c.key].msg}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={gradeClassify} className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500">
              Check
            </button>
            <button onClick={resetClassify} className="px-3 py-1.5 rounded-md bg-slate-800 border border-white/10">
              Reset
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-2">
            Tip: Quantitative values are numbers you can add/average. Discrete = whole-step counts; Continuous = measured on a scale.
          </p>
        </section>

        {/* Quick check */}
        <section className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="font-semibold mb-2">Quick Check</h2>
          <QuickCheck11 />
        </section>
      </main>
    </div>
  );
}

/* ---------- 3D: Population grid with sample highlight ---------- */
function PopulationSample3D({ sampleN, setSampleN, popSize }) {
  const mountRef = useRef(null);
  const instanceRef = useRef({ scene: null, camera: null, renderer: null, spheres: [] });

  useEffect(() => {
    const W = mountRef.current.clientWidth;
    const H = 320;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1b);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(8, 10, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(5, 10, 7);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x6677aa, 0.6));

    // grid of spheres
    const spheres = [];
    const geo = new THREE.SphereGeometry(0.18, 16, 16);
    const matPop = new THREE.MeshStandardMaterial({ color: 0x67718a, metalness: 0.2, roughness: 0.6 });
    const matSample = new THREE.MeshStandardMaterial({ color: 0xf2c94c, emissive: 0x443300, metalness: 0.3, roughness: 0.5 });

    const side = Math.round(Math.sqrt(popSize));
    let idx = 0;
    for (let r = 0; r < side; r++) {
      for (let c = 0; c < side; c++) {
        const mesh = new THREE.Mesh(geo, matPop.clone());
        mesh.position.set(c * 0.7 - (side * 0.7) / 2, 0, r * 0.7 - (side * 0.7) / 2);
        mesh.userData.idx = idx++;
        scene.add(mesh);
        spheres.push(mesh);
      }
    }

    // rotate group slowly
    const group = new THREE.Group();
    spheres.forEach((s) => group.add(s));
    scene.add(group);

    let dragging = false;
    let lastX = 0;
    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX || e.touches?.[0]?.clientX || 0;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.clientX || e.touches?.[0]?.clientX || 0;
      group.rotation.y += (x - lastX) * 0.005;
      lastX = x;
    };
    const onUp = () => (dragging = false);

    renderer.domElement.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    renderer.domElement.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    instanceRef.current = { scene, camera, renderer, spheres };

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    function onResize() {
      const W2 = mountRef.current.clientWidth;
      camera.aspect = W2 / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      renderer.domElement.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      renderer.dispose();
      mountRef.current.innerHTML = "";
    };
  }, [popSize]);

  // recolor when sampleN changes
  useEffect(() => {
    const { spheres } = instanceRef.current;
    if (!spheres?.length) return;
    spheres.forEach((s, i) => {
      const col = i < sampleN ? 0xf2c94c : 0x67718a;
      s.material.color.setHex(col);
      s.material.needsUpdate = true;
    });
  }, [sampleN]);

  return (
    <div>
      <div ref={mountRef} className="w-full rounded-lg border border-white/10 overflow-hidden" />
      <div className="flex items-center gap-3 mt-3">
        <label className="text-sm text-slate-300">Sample size:</label>
        <input
          type="range"
          min={1}
          max={popSize}
          value={sampleN}
          onChange={(e) => setSampleN(parseInt(e.target.value, 10))}
          className="w-64"
        />
        <span className="text-sm text-amber-300">{sampleN} / {popSize}</span>
      </div>
    </div>
  );
}

/* ---------- Quick Check (3 items) ---------- */
function QuickCheck11() {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [fb, setFb] = useState("");

  function grade() {
    const ok1 = a1 === "individuals";
    const ok2 = a2 === "categorical";
    const ok3 = a3 === "quant-cont";
    const k = [ok1, ok2, ok3].filter(Boolean).length;
    const msg = k === 3
      ? "3/3 — Nice. Individuals are rows; Student ID is categorical; height in cm is quantitative (continuous)."
      : `${k}/3 correct. Hint: identifiers are labels; 'continuous' means decimals make sense.`;
    setFb(msg);
  }

  return (
    <div>
      <ol className="space-y-3 text-sm">
        <li className="space-x-2">
          <span>1) In a student roster, who are the “individuals”?</span>
          <select value={a1} onChange={(e) => setA1(e.target.value)} className="bg-slate-800 border border-white/10 rounded px-2 py-1">
            <option value="">— choose —</option>
            <option value="variables">Variables (columns)</option>
            <option value="individuals">Students (rows)</option>
            <option value="samples">Samples only</option>
          </select>
        </li>
        <li className="space-x-2">
          <span>2) “Student ID” is best classified as…</span>
          <select value={a2} onChange={(e) => setA2(e.target.value)} className="bg-slate-800 border border-white/10 rounded px-2 py-1">
            <option value="">— choose —</option>
            <option value="categorical">Categorical (identifier)</option>
            <option value="quant-disc">Quantitative — Discrete</option>
            <option value="quant-cont">Quantitative — Continuous</option>
          </select>
        </li>
        <li className="space-x-2">
          <span>3) “Height (cm)” is…</span>
          <select value={a3} onChange={(e) => setA3(e.target.value)} className="bg-slate-800 border border-white/10 rounded px-2 py-1">
            <option value="">— choose —</option>
            <option value="categorical">Categorical</option>
            <option value="quant-disc">Quantitative — Discrete</option>
            <option value="quant-cont">Quantitative — Continuous</option>
          </select>
        </li>
      </ol>
      <div className="mt-3 flex gap-2">
        <button onClick={grade} className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500">Check</button>
        <span className="text-sm text-slate-300">{fb}</span>
      </div>
    </div>
  );
}
