"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  ExternalLink,
  Database,
  Workflow,
  LayoutGrid,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { CropMarks } from "./Panel";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

type Project = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  repo: string;
  live: string;
};

const PROJECTS: Project[] = [
  {
    name: "OptiRoute AI",
    tag: "MOD_01",
    blurb:
      "Reinforcement-learning route optimizer that plans multi-stop logistics in real time.",
    stack: ["NEXT.JS", "PYTHON", "POSTGRES"],
    repo: "https://github.com/Rana-Haseeb/optiroute-ai",
    live: "https://optiroute-ai.vercel.app",
  },
  {
    name: "EvilGPT",
    tag: "MOD_02",
    blurb:
      "Red-team prompt-security sandbox that stress-tests LLM guardrails against jailbreaks.",
    stack: ["REACT", "NODE", "OPENAI"],
    repo: "https://github.com/Rana-Haseeb/evilgpt",
    live: "https://evilgpt.vercel.app",
  },
  {
    name: "NimbusForge",
    tag: "MOD_03",
    blurb:
      "Visual schema-to-API builder that forges typed backends and migrations from a diagram.",
    stack: ["NEXT.JS", "EXPRESS", "MONGODB"],
    repo: "https://github.com/Rana-Haseeb/nimbusforge",
    live: "https://nimbusforge.vercel.app",
  },
  {
    name: "Sentinel Grid",
    tag: "MOD_04",
    blurb:
      "Real-time telemetry mesh that detects anomalies across distributed service nodes.",
    stack: ["REACT", "PYTHON", "MYSQL"],
    repo: "https://github.com/Rana-Haseeb/sentinel-grid",
    live: "https://sentinel-grid.vercel.app",
  },
];

/* -------------------------------------------------------------------------- */
/* Layer wireframes                                                           */
/* -------------------------------------------------------------------------- */

function DataSchemaWire() {
  return (
    <div className="flex h-full flex-col gap-1 p-2">
      <div className="mb-0.5 flex items-center gap-1 border-b border-accent-cyan/30 pb-1">
        <Database className="h-2.5 w-2.5 text-accent-cyan/80" strokeWidth={1.5} />
        <span className="text-[7px] tracking-[0.2em] text-blueprint-light/60">
          SCHEMA
        </span>
      </div>
      {["id · uuid", "user · fk", "payload · json", "created · ts"].map((r) => (
        <div key={r} className="flex items-center justify-between">
          <span className="h-1 w-8 bg-blueprint-light/20" />
          <span className="text-[6px] tracking-wide text-blueprint-light/45">
            {r}
          </span>
        </div>
      ))}
    </div>
  );
}

function LogicFlowWire() {
  return (
    <div className="flex h-full items-center justify-center p-2">
      <svg viewBox="0 0 120 44" className="h-full w-full" aria-hidden>
        {[8, 50, 92].map((x) => (
          <rect
            key={x}
            x={x}
            y={14}
            width={20}
            height={16}
            rx={1}
            fill="none"
            stroke="#00F0FF"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        ))}
        <path d="M28 22 H50" stroke="#EAEAEA" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M70 22 H92" stroke="#EAEAEA" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M46 19 L50 22 L46 25 Z" fill="#EAEAEA" fillOpacity="0.4" />
        <path d="M88 19 L92 22 L88 25 Z" fill="#EAEAEA" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

function UIBlueprintWire() {
  return (
    <div className="flex h-full flex-col gap-1 p-2">
      <div className="h-2 w-full border border-blueprint-light/25" />
      <div className="flex flex-1 gap-1">
        <div className="w-1/4 border border-blueprint-light/20" />
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-blueprint-light/15" />
          ))}
        </div>
      </div>
    </div>
  );
}

type Layer = {
  id: string;
  label: string;
  icon: LucideIcon;
  tone: string;
  explode: { y: number; z: number };
  wire: ReactNode;
};

// DOM order = paint order when flat: data (back) → logic → ui (front).
const LAYERS: Layer[] = [
  {
    id: "data",
    label: "DATA SCHEMA",
    icon: Database,
    tone: "border-accent-cyan/40",
    explode: { y: 64, z: -100 },
    wire: <DataSchemaWire />,
  },
  {
    id: "logic",
    label: "LOGIC FLOW",
    icon: Workflow,
    tone: "border-blueprint-light/30",
    explode: { y: 0, z: 0 },
    wire: <LogicFlowWire />,
  },
  {
    id: "ui",
    label: "UI BLUEPRINT",
    icon: LayoutGrid,
    tone: "border-accent-cyan/60",
    explode: { y: -64, z: 100 },
    wire: <UIBlueprintWire />,
  },
];

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

function ProjectCard({ p }: { p: Project }) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const active = hovered || pinned;

  return (
    <article
      role="group"
      aria-label={`${p.name} — hover or tap to explode the stack into layers`}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => setPinned((v) => !v)}
      className="group relative flex flex-col border border-blueprint-light/15 bg-blueprint-dark/40 p-5 outline-none transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
    >
      <CropMarks className="border-blueprint-light/25" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.25em] text-accent-cyan/70">
          {p.tag}
        </span>
        <span className="flex items-center gap-1 text-[9px] tracking-[0.2em] text-blueprint-light/40">
          <Layers className="h-3 w-3" strokeWidth={1.5} />
          {active ? "EXPLODED" : "3 LAYERS"}
        </span>
      </div>
      <h3 className="mt-3 text-lg text-blueprint-light">{p.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-blueprint-light/55">
        {p.blurb}
      </p>

      {/* 3D stage */}
      <div className="relative mt-4 h-56 [perspective:1100px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={active ? { rotateX: -14, rotateY: 20 } : { rotateX: 0, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.id}
                className={`absolute left-[5%] top-[calc(50%-46px)] h-[92px] w-[54%] [transform-style:preserve-3d] border ${layer.tone} bg-blueprint-dark`}
                animate={active ? layer.explode : { y: 0, z: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                {layer.wire}

                {/* Leader line + dynamic label, expanding into the card's right column */}
                <div className="absolute left-full top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap">
                  <motion.span
                    className="block h-px bg-accent-cyan/60"
                    animate={{ width: active ? 30 : 0 }}
                    transition={{ duration: 0.3, delay: active ? 0.15 : 0 }}
                  />
                  <span className="ml-1 h-1 w-1 shrink-0 bg-accent-cyan/70" />
                  <motion.span
                    className="ml-1.5 flex items-center gap-1 text-[8px] tracking-[0.2em] text-accent-cyan/80"
                    animate={{ opacity: active ? 1 : 0, x: active ? 0 : -4 }}
                    transition={{ duration: 0.3, delay: active ? 0.2 : 0 }}
                  >
                    <Icon className="h-2.5 w-2.5" strokeWidth={1.5} />
                    {layer.label}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer: stack + links */}
      <div className="mt-4 flex items-center gap-3 border-t border-blueprint-light/10 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="border border-blueprint-light/15 px-1.5 py-0.5 text-[9px] tracking-[0.15em] text-blueprint-light/50"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[10px] tracking-[0.2em] text-blueprint-light/70 transition-colors hover:text-accent-cyan"
          >
            <GitBranch className="h-3.5 w-3.5" strokeWidth={1.5} />
            REPO
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[10px] tracking-[0.2em] text-accent-cyan/80 transition-colors hover:text-accent-cyan"
          >
            LIVE
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Grid                                                                       */
/* -------------------------------------------------------------------------- */

export default function ProjectStack() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.name} p={p} />
      ))}
    </div>
  );
}
