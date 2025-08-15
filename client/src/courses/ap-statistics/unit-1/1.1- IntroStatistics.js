import React, { useMemo, useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../..components/ui/card";
import { Button } from "../..components/ui/button";
import { Input } from "../..components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../..components/ui/tabs";
import { motion } from "framer-motion";
import { Check, X, RotateCcw, Info } from "lucide-react";

export default function Unit1_1Lesson() {
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <Header />
      <Overview />
      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="activities">Interactive Activities</TabsTrigger>
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
          <TabsTrigger value="checks">Concept Checks</TabsTrigger>
        </TabsList>
        <TabsContent value="activities" className="space-y-6">
          <VarTypesDragDrop />
          <FrequencyBuilder />
          <DotPlotPlayground />
        </TabsContent>
        <TabsContent value="simulations" className="space-y-6">
          <CoinTossSimulation />
          <SamplingBiasExplorer />
        </TabsContent>
        <TabsContent value="checks">
          <ConceptChecks />
        </TabsContent>
      </Tabs>
      <TeacherNotes />
    </div>
  );
}

function Header() {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unit 1.1 — Introducing Statistics</h1>
          <p className="text-muted-foreground">What can we learn from data? Variables, data types, and basic displays.</p>
        </div>
        <div className="text-right">
          <span className="inline-block rounded-2xl bg-primary/10 px-3 py-1 text-sm font-medium text-primary">AP Statistics</span>
        </div>
      </div>
    </motion.div>
  );
}

function Overview() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Big Ideas & Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6">
        <ul className="list-disc pl-6">
          <li><strong>Vocabulary:</strong> population, sample, parameter, statistic, variable, categorical vs. quantitative data, frequency, relative frequency.</li>
          <li><strong>Skills (Unit 1 focus):</strong> describe data, construct tables/graphs, compare distributions, interpret statistics in context.</li>
          <li><strong>Enduring understanding:</strong> Variation is everywhere; describing it clearly is the first step toward honest inference.</li>
        </ul>
        <div className="grid md:grid-cols-2 gap-4">
          <MiniDiagramVariables />
          <MiniDiagramDisplays />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniDiagramVariables() {
  return (
    <Card className="bg-muted/40">
      <CardHeader className="pb-2"><CardTitle className="text-base">Variables</CardTitle></CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center gap-4">
          <div className="grow">
            <p><strong>Categorical</strong>: places individuals into groups (e.g., blood type, favorite genre). Arithmetic doesn’t make sense.</p>
            <p className="mt-2"><strong>Quantitative</strong>: numerical measurement (e.g., height, hours slept). Arithmetic is meaningful.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniDiagramDisplays() {
  return (
    <Card className="bg-muted/40">
      <CardHeader className="pb-2"><CardTitle className="text-base">Basic Displays</CardTitle></CardHeader>
      <CardContent className="text-sm space-y-2">
        <p><strong>Categorical →</strong> tables, bar charts (counts/percents). Avoid pie charts when categories don’t sum to 100%.</p>
        <p><strong>Quantitative →</strong> dot plots, histograms, box plots. Describe shape, center, variability, unusual features.</p>
      </CardContent>
    </Card>
  );
}

/* ------------------------ ACTIVITY 1: Drag & Drop Types ------------------------ */
function VarTypesDragDrop() {
  const items = useMemo(
    () => [
      { id: "i1", label: "Blood type", type: "categorical" },
      { id: "i2", label: "Resting heart rate (bpm)", type: "quantitative" },
      { id: "i3", label: "Favorite streaming platform", type: "categorical" },
      { id: "i4", label: "Commute time (minutes)", type: "quantitative" },
      { id: "i5", label: "Class year (Fr/So/Jr/Sr)", type: "categorical" },
      { id: "i6", label: "Number of pets", type: "quantitative" },
    ],
    []
  );
  const [pool, setPool] = useState(items);
  const [cats, setCats] = useState([]); // categorical bin
  const [quants, setQuants] = useState([]); // quantitative bin
  const [checked, setChecked] = useState(false);

  function onDrop(target, id) {
    const src = pool.find((x) => x.id === id) || cats.find((x) => x.id === id) || quants.find((x) => x.id === id);
    if (!src) return;
    // remove from all
    setPool((p) => p.filter((x) => x.id !== id));
    setCats((p) => p.filter((x) => x.id !== id));
    setQuants((p) => p.filter((x) => x.id !== id));
    // add to target
    if (target === "pool") setPool((p) => [...p, src]);
    if (target === "categorical") setCats((p) => [...p, src]);
    if (target === "quantitative") setQuants((p) => [...p, src]);
    setChecked(false);
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">Activity: Sort Variables by Type <Info className="w-4 h-4 text-muted-foreground" /></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Drag each item into the correct bin. Then click <em>Check</em>.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <DropZone title="Item Pool" items={pool} onDrop={(id) => onDrop("pool", id)}>
            {pool.map((it) => (
              <Draggable key={it.id} id={it.id} label={it.label} />
            ))}
          </DropZone>
          <DropZone title="Categorical" items={cats} onDrop={(id) => onDrop("categorical", id)}>
            {cats.map((it) => (
              <Draggable key={it.id} id={it.id} label={it.label} />
            ))}
          </DropZone>
          <DropZone title="Quantitative" items={quants} onDrop={(id) => onDrop("quantitative", id)}>
            {quants.map((it) => (
              <Draggable key={it.id} id={it.id} label={it.label} />
            ))}
          </DropZone>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setChecked(true)}>Check</Button>
          <Button variant="secondary" onClick={() => { setPool(items); setCats([]); setQuants([]); setChecked(false); }}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
        {checked && (
          <FeedbackBin cats={cats} quants={quants} />
        )}
      </CardContent>
    </Card>
  );
}

function Draggable({ id, label }) {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
      className="cursor-grab active:cursor-grabbing rounded-xl border bg-background px-3 py-2 shadow-sm hover:shadow transition"
    >
      {label}
    </div>
  );
}

function DropZone({ title, items, onDrop, children }) {
  const [isOver, setIsOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => { const id = e.dataTransfer.getData("text/plain"); onDrop(id); setIsOver(false); }}
      className={`rounded-2xl border p-4 min-h-[160px] ${isOver ? "bg-primary/5" : "bg-muted/20"}`}
    >
      <div className="font-medium mb-2">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
      {items.length === 0 && <p className="text-xs text-muted-foreground">Drop here</p>}
    </div>
  );
}

function FeedbackBin({ cats, quants }) {
  const catWrong = cats.filter((x) => x.type !== "categorical");
  const qWrong = quants.filter((x) => x.type !== "quantitative");
  const correct = catWrong.length === 0 && qWrong.length === 0 && (cats.length + quants.length) > 0;
  return (
    <div className={`rounded-2xl p-4 ${correct ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
      <div className="flex items-center gap-2 font-medium">
        {correct ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-amber-600" />}
        {correct ? "Great sorting!" : "Not quite—check these:"}
      </div>
      {!correct && (
        <ul className="list-disc pl-6 mt-2 text-sm">
          {catWrong.map((x) => (
            <li key={x.id}><strong>{x.label}</strong> is <em>quantitative</em>.</li>
          ))}
          {qWrong.map((x) => (
            <li key={x.id}><strong>{x.label}</strong> is <em>categorical</em> or needs context.</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------ ACTIVITY 2: Frequency Table Builder ------------------------ */
function FrequencyBuilder() {
  const [values, setValues] = useState("5,6,3,3,2,4,7,5,2,3,5,6,5,4,4,3,5,2,5,3");
  const nums = useMemo(() => parseNumbers(values), [values]);
  const freq = useMemo(() => countFreq(nums), [nums]);
  const rel = useMemo(() => total(nums) ? Object.fromEntries(Object.entries(freq).map(([k,v]) => [k, v/nums.length])) : {}, [freq, nums]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Activity: Build a Frequency & Relative Frequency Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Enter a list of numbers (e.g., hours worked per day). We’ll compute counts and proportions and draw a bar chart.</p>
        <div className="flex gap-2">
          <Input value={values} onChange={(e) => setValues(e.target.value)} placeholder="e.g., 2,3,3,4,5,5,6" />
          <Button onClick={() => setValues("")}>Clear</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">Frequency</th>
                <th className="p-2 text-left">Relative Freq.</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(freq).sort((a,b)=>Number(a)-Number(b)).map((k) => (
                <tr key={k} className="odd:bg-muted/20">
                  <td className="p-2">{k}</td>
                  <td className="p-2">{freq[k]}</td>
                  <td className="p-2">{rel[k]?.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-medium">
                <td className="p-2">Total</td>
                <td className="p-2">{nums.length}</td>
                <td className="p-2">{nums.length ? "1.00" : "—"}</td>
              </tr>
            </tbody>
          </table>
          <BarChart data={freq} />
        </div>
      </CardContent>
    </Card>
  );
}

function parseNumbers(s) {
  return s
    .split(/[ ,\n\t]+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number)
    .filter((x) => !Number.isNaN(x));
}
function countFreq(arr) {
  const m = {};
  arr.forEach((v) => { m[v] = (m[v]||0) + 1; });
  return m;
}
function total(arr){return arr?.length ?? 0}

function BarChart({ data }) {
  const keys = Object.keys(data).sort((a,b)=>Number(a)-Number(b));
  const max = Math.max(1, ...Object.values(data));
  return (
    <div className="rounded-2xl border p-4 bg-muted/20">
      <div className="text-sm font-medium mb-2">Bar Chart (Counts)</div>
      <svg viewBox="0 0 300 180" className="w-full h-44">
        {keys.map((k, i) => {
          const x = 20 + i * (240 / keys.length);
          const h = (data[k] / max) * 120;
          return (
            <g key={k}>
              <rect x={x} y={150 - h} width={20} height={h} rx={4} className="fill-current text-primary/60" />
              <text x={x + 10} y={165} fontSize="10" textAnchor="middle">{k}</text>
              <text x={x + 10} y={145 - h} fontSize="10" textAnchor="middle">{data[k]}</text>
            </g>
          );
        })}
        <line x1="10" y1="150" x2="290" y2="150" stroke="#999" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ------------------------ ACTIVITY 3: Dot Plot Playground ------------------------ */
function DotPlotPlayground(){
  const [values, setValues] = useState([5,6,3,3,2,4,7,5,2,3,5,6,5,4,4,3,5,2,5,3]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const counts = useMemo(()=>countFreq(values),[values]);

  function randomize(){
    // generate a small dataset (20) around a mean ~5 with noise
    const arr = Array.from({length:20}, () => Math.max(0, Math.round(5 + normal(0,1.2))));
    setValues(arr);
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Activity: Draw & Read a Dot Plot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Dot plots display each observation. Look for <em>shape</em>, <em>center</em>, <em>variability</em>, and <em>unusual features</em> (gaps/outliers).</p>
        <div className="flex gap-2 flex-wrap items-center">
          <Button onClick={randomize}>Randomize Data</Button>
          <Button variant="secondary" onClick={()=>setValues([2,3,3,3,4,4,4,5,5,5,5,5,6,6,7])}>Load Example</Button>
        </div>
        <DotPlot values={values} />
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <Stat label="Count" value={values.length} />
          <Stat label="Mean" value={mean(values).toFixed(2)} />
          <Stat label="Median" value={median(values)} />
        </div>
      </CardContent>
    </Card>
  );
}

function DotPlot({ values }){
  const min = Math.min(...values);
  const max = Math.max(...values);
  const keys = Array.from(new Set(values)).sort((a,b)=>a-b);
  const counts = countFreq(values);
  const scale = (x) => 20 + (x - min) * (260 / Math.max(1, max - min));
  return (
    <div className="rounded-2xl border p-4 bg-muted/20">
      <svg viewBox="0 0 320 160" className="w-full h-44">
        {/* axis */}
        <line x1="20" y1="140" x2="300" y2="140" stroke="#999" strokeWidth="1" />
        {keys.map((k) => (
          <g key={k}>
            <line x1={scale(k)} y1={140} x2={scale(k)} y2={145} stroke="#999" />
            <text x={scale(k)} y={155} fontSize="10" textAnchor="middle">{k}</text>
          </g>
        ))}
        {/* dots */}
        {keys.flatMap((k) => {
          const n = counts[k];
          return Array.from({ length: n }).map((_, i) => (
            <circle key={`${k}-${i}`} cx={scale(Number(k))} cy={130 - i * 12} r={5} className="fill-current text-primary/70" />
          ));
        })}
      </svg>
    </div>
  );
}

function Stat({ label, value }){
  return (
    <div className="rounded-xl border bg-background p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function mean(arr){return arr.reduce((a,b)=>a+b,0)/arr.length}
function median(arr){
  const s = [...arr].sort((a,b)=>a-b);
  const n = s.length; const mid = Math.floor(n/2);
  return n%2 ? s[mid] : ((s[mid-1]+s[mid])/2).toFixed(2);
}
// Box–Muller transform for normal noise
function normal(mu=0, sigma=1){ const u=Math.random(), v=Math.random(); return mu + sigma*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }

/* ------------------------ SIM 1: Coin Toss & Long-Run Relative Frequency ------------------------ */
function CoinTossSimulation(){
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.5);
  const [path, setPath] = useState([]); // cumulative proportion of heads

  function run(){
    let heads = 0; const out = [];
    for(let i=1;i<=n;i++){
      if(Math.random() < p) heads++;
      out.push(heads/i);
    }
    setPath(out);
  }

  useEffect(()=>{ run(); },[]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Simulation: Coin Toss (Law of Large Numbers)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Watch the sample proportion of heads wander and settle near the true probability as trials increase.</p>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm">Trials</label>
            <Input type="number" className="w-24" value={n} min={5} max={2000} onChange={(e)=>setN(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">P(Heads)</label>
            <Input type="number" className="w-24" value={p} step={0.05} min={0} max={1} onChange={(e)=>setP(Number(e.target.value))} />
          </div>
          <Button onClick={run}>Run</Button>
        </div>
        <LineChart data={path} target={p} />
      </CardContent>
    </Card>
  );
}

function LineChart({ data, target }){
  const n = data.length;
  const points = data.map((y,i)=>({x: 30 + (i*(260/Math.max(1,n-1))), y: 140 - (y*100)}));
  const d = points.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  return (
    <div className="rounded-2xl border p-4 bg-muted/20">
      <svg viewBox="0 0 320 160" className="w-full h-44">
        <line x1="30" y1="140" x2="300" y2="140" stroke="#999" />
        <line x1="30" y1="40" x2="30" y2="140" stroke="#999" />
        {/* target line */}
        <line x1="30" y1={140 - target*100} x2="300" y2={140 - target*100} stroke="#0ea5e9" strokeDasharray="4 4" />
        {/* path */}
        <path d={d} fill="none" stroke="#6366f1" strokeWidth="2" />
        <text x="35" y="35" fontSize="10" fill="#0ea5e9">Target p = {target}</text>
      </svg>
    </div>
  );
}

/* ------------------------ SIM 2: Sampling Bias Explorer ------------------------ */
function SamplingBiasExplorer(){
  const [mode, setMode] = useState("random");
  const [sampleSize, setSampleSize] = useState(50);
  const population = useMemo(()=>
    // synthetic campus: majors with different book costs
    Array.from({length: 1200}, (_,i)=>{
      const groups = [
        { major: "STEM", mu: 220, sigma: 35, weight: 0.3 },
        { major: "Humanities", mu: 140, sigma: 25, weight: 0.35 },
        { major: "Business", mu: 180, sigma: 30, weight: 0.2 },
        { major: "Arts/PE", mu: 90, sigma: 20, weight: 0.15 },
      ];
      const r = Math.random();
      let acc = 0, g = groups[0];
      for(const gg of groups){ acc += gg.weight; if(r <= acc){ g = gg; break; } }
      return { major: g.major, cost: Math.max(0, Math.round(normal(g.mu, g.sigma))) };
    })
  ,[]);

  const sample = useMemo(()=>{
    if(mode === "random"){
      return sampleSimple(population, sampleSize);
    } else if(mode === "stem-only"){
      return sampleStrata(population, sampleSize, (x)=>x.major === "STEM");
    } else if(mode === "arts-only"){
      return sampleStrata(population, sampleSize, (x)=>x.major.includes("Arts"));
    } else if(mode === "systematic-10"){
      return sampleSystematic(population, sampleSize, 10);
    }
    return [];
  },[population, mode, sampleSize]);

  const popMean = useMemo(()=>mean(population.map(x=>x.cost)).toFixed(1),[population]);
  const sampMean = useMemo(()=> sample.length? mean(sample.map(x=>x.cost)).toFixed(1) : "—", [sample]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Explorer: Sampling Methods & Bias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Population = 1,200 students with different majors and typical textbook costs. Try different sampling strategies and compare means.</p>
        <div className="flex gap-2 items-center flex-wrap">
          <select className="border rounded-md px-3 py-2 bg-background" value={mode} onChange={(e)=>setMode(e.target.value)}>
            <option value="random">Simple random</option>
            <option value="systematic-10">Systematic (every 10th)</option>
            <option value="stem-only">Biased: STEM only</option>
            <option value="arts-only">Biased: Arts/PE only</option>
          </select>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sample size</label>
            <Input type="number" className="w-24" min={10} max={300} value={sampleSize} onChange={(e)=>setSampleSize(Number(e.target.value))} />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <Stat label="Population mean ($)" value={popMean} />
          <Stat label="Sample mean ($)" value={sampMean} />
          <Stat label="Sample size" value={sample.length} />
          <div className="rounded-xl border bg-background p-3">
            <div className="text-xs text-muted-foreground">Interpretation</div>
            <div className="text-sm">Biased strategies can overshoot/undershoot the population mean. Random/systematic sampling tends to be closer in the long run.</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function sampleSimple(arr, n){
  const out = []; const used = new Set();
  while(out.length < n){ const i = Math.floor(Math.random()*arr.length); if(!used.has(i)){ used.add(i); out.push(arr[i]); } }
  return out;
}
function sampleStrata(arr, n, predicate){
  const pool = arr.filter(predicate);
  return sampleSimple(pool, Math.min(n, pool.length));
}
function sampleSystematic(arr, n, k){
  const start = Math.floor(Math.random()*k);
  const out=[]; for(let i=start; i<arr.length && out.length<n; i+=k){ out.push(arr[i]); }
  if(out.length < n){
    // wrap
    for(let i=(start%k); i<arr.length && out.length<n; i+=k){ out.push(arr[i]); }
  }
  return out;
}

/* ------------------------ CONCEPT CHECKS ------------------------ */
function ConceptChecks(){
  const questions = [
    {
      q: "Which statement best distinguishes a parameter from a statistic?",
      choices: [
        "A parameter describes a sample; a statistic describes a population.",
        "A parameter describes a population; a statistic describes a sample.",
        "Both parameter and statistic describe samples.",
        "Both parameter and statistic describe populations."
      ],
      a: 1,
      explain: "A parameter is a numerical summary of the entire population. A statistic summarizes a sample used to estimate that parameter."
    },
    {
      q: "Which variable is categorical?",
      choices: ["Daily screen time (hours)", "Resting heart rate (bpm)", "Country of birth", "Number of playlists"],
      a: 2,
      explain: "Country of birth groups individuals into categories; arithmetic isn’t meaningful."
    },
    {
      q: "A bar chart is most appropriate for which situation?",
      choices: ["Distribution of commute times for 200 students", "Counts of pets owned by type (dog/cat/bird/etc.)", "Heights of 50 plants (cm)", "Test scores 0–100"],
      a: 1,
      explain: "Bar charts (or Pareto charts) visualize categorical counts/percents."
    },
    {
      q: "In a frequency table, the relative frequencies should…",
      choices: ["sum to 0", "sum to 1 (or 100%) aside from rounding", "be equal for all rows", "always be decimals with two places"],
      a: 1,
      explain: "Relative frequencies represent proportions and should sum to 1 (allowing small rounding error)."
    },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [graded, setGraded] = useState(false);
  const score = useMemo(()=> answers.reduce((acc,ans,i)=> acc + (ans===questions[i].a ? 1 : 0), 0), [answers, graded]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Concept Checks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((item, idx) => (
          <div key={idx} className="rounded-2xl border p-4 bg-muted/20">
            <div className="font-medium">{idx+1}. {item.q}</div>
            <div className="mt-2 grid md:grid-cols-2 gap-2">
              {item.choices.map((c, j)=>{
                const selected = answers[idx] === j;
                const correct = graded && j === item.a;
                const wrong = graded && selected && j !== item.a;
                return (
                  <button key={j} onClick={()=>!graded && setAnswers((a)=>{ const b=[...a]; b[idx]=j; return b; })}
                    className={`text-left rounded-xl border px-3 py-2 ${selected?"border-primary":"border-muted"} ${correct?"bg-emerald-50 border-emerald-300":""} ${wrong?"bg-rose-50 border-rose-300":""}`}
                  >{c}</button>
                );
              })}
            </div>
            {graded && (
              <div className="mt-2 text-sm text-muted-foreground">{item.explain}</div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <Button onClick={()=>setGraded(true)}>Check Answers</Button>
          <Button variant="secondary" onClick={()=>{ setAnswers(Array(questions.length).fill(null)); setGraded(false); }}>Reset</Button>
          {graded && (
            <div className="ml-auto font-semibold">Score: {score} / {questions.length}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------ TEACHER NOTES ------------------------ */
function TeacherNotes(){
  return (
    <Card className="shadow-none border-0">
      <CardContent className="text-xs text-muted-foreground space-y-2">
        <div className="flex items-center gap-2"><Info className="w-3 h-3" /><span><strong>Teacher tips:</strong> Have students narrate SOCS (shape, outliers, center, spread) aloud when describing the dot plot. Push for context every time.</span></div>
        <div className="flex items-center gap-2"><Info className="w-3 h-3" /><span><strong>Accessibility:</strong> All interactive controls are keyboard-focusable. Provide alt routes (e.g., typed answers) for drag-and-drop if needed.</span></div>
      </CardContent>
    </Card>
  );
}