"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Triangle,
  Atom,
  Wind,
  Hexagon,
  Route,
  Braces,
  Leaf,
  Cylinder,
  type LucideIcon,
} from "lucide-react";
import { CropMarks } from "./Panel";

/* -------------------------------------------------------------------------- */
/* Model                                                                      */
/* -------------------------------------------------------------------------- */

type LayerId = "ui" | "logic" | "data";

type SkillSpec = { k: string; v: string };

type Skill = {
  id: string;
  name: string;
  layer: LayerId;
  icon: LucideIcon;
  level: number; // 0–100 proficiency
  usage: string;
  specs: SkillSpec[];
};

const LAYERS: { id: LayerId; tag: string; name: string }[] = [
  { id: "ui", tag: "L1", name: "UI · CLIENT" },
  { id: "logic", tag: "L2", name: "LOGIC · PROCESS" },
  { id: "data", tag: "L3", name: "DATA · PERSIST" },
];

const SKILLS: Skill[] = [
  {
    id: "nextjs",
    name: "NEXT.JS",
    layer: "ui",
    icon: Triangle,
    level: 92,
    usage:
      "App Router SSR/ISR for content-driven products — inkwell-blog and cine-vault run on file-based routing with server components.",
    specs: [
      { k: "RENDER", v: "SSR · ISR" },
      { k: "ROUTING", v: "APP ROUTER" },
    ],
  },
  {
    id: "react",
    name: "REACT",
    layer: "ui",
    icon: Atom,
    level: 95,
    usage:
      "Hook- and context-driven SPAs with composable component trees powering dashboards and the digital-notebook UI.",
    specs: [
      { k: "STATE", v: "HOOKS · CONTEXT" },
      { k: "PATTERN", v: "COMPOSITION" },
    ],
  },
  {
    id: "tailwind",
    name: "TAILWIND",
    layer: "ui",
    icon: Wind,
    level: 90,
    usage:
      "Utility-first design systems with responsive grids and dark theming applied consistently across every shipped interface.",
    specs: [
      { k: "ENGINE", v: "POSTCSS" },
      { k: "SCALE", v: "RESPONSIVE" },
    ],
  },
  {
    id: "node",
    name: "NODE.JS",
    layer: "logic",
    icon: Hexagon,
    level: 90,
    usage:
      "Async I/O request runtime behind the MERN APIs — the server layer for the notes and blog backends.",
    specs: [
      { k: "RUNTIME", v: "V8 · ASYNC" },
      { k: "API", v: "REST" },
    ],
  },
  {
    id: "express",
    name: "EXPRESS",
    layer: "logic",
    icon: Route,
    level: 88,
    usage:
      "Routing, middleware, and JWT auth layers structured as controllers over Mongo and SQL data access.",
    specs: [
      { k: "MIDDLEWARE", v: "JWT · AUTH" },
      { k: "PATTERN", v: "MVC" },
    ],
  },
  {
    id: "python",
    name: "PYTHON",
    layer: "logic",
    icon: Braces,
    level: 85,
    usage:
      "AI/ML pipelines and data cleaning — pandas with Gemini/OpenAI integrations behind the AI CSV Cleaner & Summarizer.",
    specs: [
      { k: "LIBS", v: "PANDAS · TORCH" },
      { k: "DOMAIN", v: "AI / ML" },
    ],
  },
  {
    id: "mongodb",
    name: "MONGODB",
    layer: "data",
    icon: Leaf,
    level: 88,
    usage:
      "Primary document store for schema-light app data — notes, posts, and user records accessed through Mongoose.",
    specs: [
      { k: "MODEL", v: "DOCUMENT" },
      { k: "ODM", v: "MONGOOSE" },
    ],
  },
  {
    id: "mysql",
    name: "MYSQL",
    layer: "data",
    icon: Cylinder,
    level: 80,
    usage:
      "Relational persistence for structured, transactional domains where joins and constraints carry the schema.",
    specs: [
      { k: "MODEL", v: "RELATIONAL" },
      { k: "QUERY", v: "SQL" },
    ],
  },
];

// Dependency edges — always drawn from an upper layer down to a lower one.
const EDGES: { from: string; to: string }[] = [
  { from: "nextjs", to: "node" },
  { from: "nextjs", to: "python" },
  { from: "react", to: "node" },
  { from: "react", to: "express" },
  { from: "tailwind", to: "node" },
  { from: "node", to: "mongodb" },
  { from: "express", to: "mongodb" },
  { from: "express", to: "mysql" },
  { from: "python", to: "mysql" },
  { from: "python", to: "mongodb" },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

type Point = { cx: number; top: number; bottom: number };

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** A single moving "packet" traced along an active connector path. */
function PacketPath({ d, reduced }: { d: string; reduced: boolean }) {
  if (reduced) {
    return (
      <path
        d={d}
        fill="none"
        stroke="#00F0FF"
        strokeWidth={1.5}
        opacity={0.85}
        filter="url(#skill-glow)"
      />
    );
  }
  const t = { duration: 1.5, repeat: Infinity, ease: "linear" as const };
  return (
    <>
      {/* Soft glowing comet */}
      <motion.path
        d={d}
        fill="none"
        stroke="#00F0FF"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.12 1"
        filter="url(#skill-glow)"
        style={{ opacity: 0.75 }}
        animate={{ strokeDashoffset: [0, -1.12] }}
        transition={t}
      />
      {/* Bright core */}
      <motion.path
        d={d}
        fill="none"
        stroke="#EAFBFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.06 1"
        animate={{ strokeDashoffset: [0, -1.06] }}
        transition={t}
      />
    </>
  );
}

// Explicit per-element entrance props (index-delayed for a stagger feel).
// Decoupled from variant propagation so they reliably re-run on each keyed
// remount — variant-label propagation proved flaky on framer-motion 12 + React 19.
const fadeUp = (i: number) => ({
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, delay: i * 0.06, ease: "easeOut" as const },
});

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function SkillGraph() {
  const reduced = useReducedMotion() ?? false;

  const graphRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const registerNode = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const [points, setPoints] = useState<Record<string, Point>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });

  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hovered ?? pinned;

  // Adjacency for highlight + connection lookups.
  const adjacency = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    for (const e of EDGES) {
      (m[e.from] ??= new Set()).add(e.to);
      (m[e.to] ??= new Set()).add(e.from);
    }
    return m;
  }, []);

  // Measure node anchor points relative to the graph container.
  useIsoLayoutEffect(() => {
    const container = graphRef.current;
    if (!container) return;

    const measure = () => {
      const base = container.getBoundingClientRect();
      const next: Record<string, Point> = {};
      for (const [id, el] of nodeRefs.current) {
        const r = el.getBoundingClientRect();
        next[id] = {
          cx: r.left - base.left + r.width / 2,
          top: r.top - base.top,
          bottom: r.top - base.top + r.height,
        };
      }
      setPoints(next);
      setSize({ w: base.width, h: base.height });
    };

    measure();
    const raf = requestAnimationFrame(measure); // catch late font/layout shifts
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const pathFor = (from: string, to: string) => {
    const a = points[from];
    const b = points[to];
    if (!a || !b) return "";
    const sx = a.cx;
    const sy = a.bottom;
    const tx = b.cx;
    const ty = b.top;
    const my = (sy + ty) / 2;
    return `M ${sx},${sy} C ${sx},${my} ${tx},${my} ${tx},${ty}`;
  };

  const activeSkill = active ? SKILLS.find((s) => s.id === active) ?? null : null;
  const neighbors = active ? adjacency[active] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* ---------------------------------------------------------------- */}
      {/* Graph                                                            */}
      {/* ---------------------------------------------------------------- */}
      <div ref={graphRef} className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox={size.w ? `0 0 ${size.w} ${size.h}` : undefined}
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="skill-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {EDGES.map((e) => {
            const d = pathFor(e.from, e.to);
            if (!d) return null;
            const on = active !== null && (e.from === active || e.to === active);
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={d}
                  fill="none"
                  strokeWidth={1}
                  className={on ? "stroke-accent-cyan/40" : "stroke-blueprint-light/10"}
                />
                {on && <PacketPath d={d} reduced={reduced} />}
              </g>
            );
          })}
        </svg>

        {/* Layer rows */}
        <div className="relative z-10 flex flex-col gap-12 sm:gap-16">
          {LAYERS.map((layer) => {
            const layerSkills = SKILLS.filter((s) => s.layer === layer.id);
            return (
              <div key={layer.id} className="flex items-stretch gap-2 sm:gap-4">
                {/* Layer label */}
                <div className="flex w-12 shrink-0 flex-col justify-center border-l border-blueprint-light/15 pl-2 sm:w-24">
                  <span className="text-[10px] tracking-[0.2em] text-accent-cyan/70">
                    {layer.tag}
                  </span>
                  <span className="mt-1 hidden text-[9px] uppercase leading-tight tracking-[0.15em] text-blueprint-light/40 sm:block">
                    {layer.name}
                  </span>
                </div>

                {/* Nodes */}
                <div className="flex flex-1 flex-nowrap items-stretch gap-2 sm:gap-4">
                  {layerSkills.map((s) => {
                    const Icon = s.icon;
                    const isActive = active === s.id;
                    const isNeighbor = Boolean(neighbors?.has(s.id));
                    const dim = active !== null && !isActive && !isNeighbor;
                    return (
                      <button
                        key={s.id}
                        ref={registerNode(s.id)}
                        type="button"
                        onMouseEnter={() => setHovered(s.id)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(s.id)}
                        onBlur={() => setHovered(null)}
                        onClick={() =>
                          setPinned((p) => (p === s.id ? null : s.id))
                        }
                        aria-pressed={pinned === s.id}
                        aria-label={`${s.name} — ${layer.name} layer`}
                        className={cx(
                          "group relative flex min-w-0 flex-1 flex-col items-center gap-1.5 border bg-blueprint-dark/70 px-2 py-3 backdrop-blur-sm transition-all duration-200 outline-none",
                          isActive &&
                            "border-accent-cyan text-accent-cyan shadow-[0_0_22px_-4px_rgba(0,240,255,0.55)]",
                          !isActive &&
                            isNeighbor &&
                            "border-accent-cyan/50 text-blueprint-light",
                          !isActive &&
                            !isNeighbor &&
                            !dim &&
                            "border-blueprint-light/20 text-blueprint-light/85 hover:border-accent-cyan/50 hover:text-blueprint-light focus-visible:border-accent-cyan/50",
                          dim && "border-blueprint-light/10 text-blueprint-light/40 opacity-50",
                        )}
                      >
                        {/* connection ports */}
                        <span className="pointer-events-none absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-accent-cyan/60" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 bg-accent-cyan/60" />
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                        <span className="text-[10px] tracking-[0.12em] sm:text-[11px]">
                          {s.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Inspector                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative border border-blueprint-light/15 bg-blueprint-dark/40 lg:sticky lg:top-24 lg:self-start">
        <CropMarks className="border-blueprint-light/25" />
        <div className="border-b border-blueprint-light/15 px-4 py-2.5 text-[10px] tracking-[0.25em] text-blueprint-light/40">
          [ INSPECTOR // NODE_DETAIL ]
        </div>

        {/* Keyed plain wrapper forces a remount on selection change so each
            element replays its own explicit entrance animation. */}
        <div key={activeSkill?.id ?? "empty"} className="min-h-[240px] p-4">
          {activeSkill ? (
            <>
              <motion.div
                {...fadeUp(0)}
                className="flex items-center gap-2 text-accent-cyan"
              >
                <activeSkill.icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm tracking-[0.15em]">
                  {activeSkill.name}
                </span>
                <span className="ml-auto text-[9px] tracking-[0.2em] text-blueprint-light/40">
                  {LAYERS.find((l) => l.id === activeSkill.layer)?.tag}
                </span>
              </motion.div>

              <motion.p
                {...fadeUp(1)}
                className="mt-4 text-xs leading-relaxed text-blueprint-light/70"
              >
                {activeSkill.usage}
              </motion.p>

              <motion.div {...fadeUp(2)} className="mt-4 space-y-1.5">
                {activeSkill.specs.map((sp) => (
                  <div
                    key={sp.k}
                    className="flex items-center justify-between border-b border-blueprint-light/10 pb-1.5 text-[10px] tracking-[0.15em]"
                  >
                    <span className="text-blueprint-light/40">{sp.k}</span>
                    <span className="text-blueprint-light/80">{sp.v}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div {...fadeUp(3)} className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[9px] tracking-[0.2em] text-blueprint-light/40">
                  <span>OPERATIONAL EFFICIENCY</span>
                  <span className="text-accent-cyan/80">
                    {activeSkill.level}%
                  </span>
                </div>
                <div className="h-1 w-full bg-blueprint-light/10">
                  <motion.div
                    className="h-full bg-accent-cyan"
                    initial={{ width: "0%" }}
                    animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </>
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
              <div className="h-2 w-2 animate-pulse bg-accent-cyan/60" />
              <p className="mt-4 max-w-[180px] text-[10px] uppercase leading-relaxed tracking-[0.2em] text-blueprint-light/40">
                Hover or tap a node to trace its data stream &amp; inspect usage
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
