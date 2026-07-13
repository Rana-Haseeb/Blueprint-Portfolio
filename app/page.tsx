"use client";

import { Fragment, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  Boxes,
  Component,
  Workflow,
  Atom,
  FileCode,
  Server,
  Palette,
  Database,
  GitBranch,
  Container,
  Cloud,
  Inbox,
  Cpu,
  Send,
  Mail,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Panel, { CropMarks } from "./components/Panel";
import Sidebar, { type NavItem } from "./components/Sidebar";

/* -------------------------------------------------------------------------- */
/* Blueprint data                                                             */
/* -------------------------------------------------------------------------- */

const nav: NavItem[] = [
  { id: "sec-01", label: "SEC_01 // ABOUT", icon: LayoutDashboard },
  { id: "sec-02", label: "SEC_02 // SKILLS", icon: Boxes },
  { id: "sec-03", label: "SEC_03 // PROJECTS", icon: Component },
  { id: "sec-04", label: "SEC_04 // CONTACT", icon: Workflow },
];

const vitals = [
  { k: "ROLE", v: "SOFTWARE ENGINEER" },
  { k: "LOCATION", v: "34.05N / 118.24W" },
  { k: "RUNTIME", v: "5+ YEARS" },
  { k: "AVAILABILITY", v: "OPEN TO WORK" },
];

const nodes = [
  { name: "REACT", meta: "N-01 · UI", icon: Atom },
  { name: "TYPESCRIPT", meta: "N-02 · LANG", icon: FileCode },
  { name: "NODE.JS", meta: "N-03 · RUNTIME", icon: Server },
  { name: "TAILWIND", meta: "N-04 · STYLE", icon: Palette },
  { name: "POSTGRESQL", meta: "N-05 · DATA", icon: Database },
  { name: "GIT", meta: "N-06 · VCS", icon: GitBranch },
  { name: "DOCKER", meta: "N-07 · OPS", icon: Container },
  { name: "CLOUD", meta: "N-08 · INFRA", icon: Cloud },
];

const projects = [
  {
    mod: "MOD_01",
    title: "Orbital Dashboard",
    desc: "Real-time telemetry console streaming thousands of events per second into a composable widget grid.",
    tags: ["NEXT.JS", "D3", "WEBSOCKET"],
    status: "DEPLOYED",
  },
  {
    mod: "MOD_02",
    title: "Ledger Engine",
    desc: "Double-entry accounting core with deterministic replay, audit trails, and idempotent settlement.",
    tags: ["NODE", "POSTGRES", "REDIS"],
    status: "STABLE",
  },
  {
    mod: "MOD_03",
    title: "Vector Atlas",
    desc: "Semantic search service mapping documents into a queryable embedding space with sub-100ms recall.",
    tags: ["PYTHON", "FASTAPI", "PGVECTOR"],
    status: "BETA",
  },
];

const pipeline = [
  { stage: "INPUT", label: "Ingest", desc: "Requirements & signals", icon: Inbox },
  { stage: "PROCESS", label: "Build", desc: "Design · code · verify", icon: Cpu },
  { stage: "OUTPUT", label: "Ship", desc: "Deploy & monitor", icon: Send },
];

const channels = [
  {
    label: "EMAIL",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
  {
    label: "GITHUB",
    value: "/your-handle",
    href: "https://github.com",
    icon: GitBranch,
  },
  {
    label: "LINKEDIN",
    value: "/in/your-handle",
    href: "https://linkedin.com",
    icon: Briefcase,
  },
];

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Scroll-triggered fade/slide wrapper. */
function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  children,
  sub,
}: {
  children: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-blueprint-light sm:text-3xl">
        {children}
      </h2>
      {sub && (
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-blueprint-light/40">
          {sub}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Sidebar items={nav} />

      {/* sm:pl-20 reserves the left rail; pb-28 clears the mobile bottom bar */}
      <div className="min-h-screen pb-28 sm:pb-0 sm:pl-20">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          {/* Masthead */}
          <header className="mb-10 sm:mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-accent-cyan/70">
              // System Blueprint — Rev A.01
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-blueprint-light sm:text-6xl">
              YOUR NAME<span className="text-accent-cyan">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-blueprint-light/70 sm:text-base">
              Software engineer drafting resilient interfaces with the precision
              of a schematic — a continuous, layout-driven system rendered on the
              grid.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-blueprint-light/40">
              <span>LAT 34.0522</span>
              <span>LON −118.2437</span>
              <span>GRID 20 / 05</span>
              <span>UNITS px</span>
            </div>
          </header>

          <div className="space-y-6 sm:space-y-8">
            {/* SEC_01 // ABOUT — System Overview */}
            <Reveal>
              <Panel
                as="section"
                id="sec-01"
                label="SEC_01 // ABOUT"
                meta={["SCALE: 1:1", "STATUS: STABLE", "REV: A.01"]}
                className="scroll-mt-24"
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <SectionTitle sub="// continuous system across the modern web stack">
                      System Overview
                    </SectionTitle>
                    <p className="max-w-2xl text-sm leading-relaxed text-blueprint-light/70 sm:text-base">
                      I design and build software the way a draftsman lays out a
                      schematic: measured, legible, and structurally honest. Every
                      layer — from the interface down to the data plane — is drawn
                      to spec and held to tolerance.
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blueprint-light/60">
                      This document is a live blueprint of that practice. Scroll
                      the pipeline to inspect capabilities, deployed modules, and
                      the channels wired for input.
                    </p>
                  </div>

                  {/* Vitals — 1px grid via gap trick */}
                  <div className="grid grid-cols-2 gap-px border border-blueprint-light/10 bg-blueprint-light/10">
                    {vitals.map((v) => (
                      <div key={v.k} className="bg-blueprint-dark p-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-blueprint-light/40">
                          {v.k}
                        </div>
                        <div className="mt-1 text-xs tracking-wide text-accent-cyan/90">
                          {v.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </Reveal>

            {/* SEC_02 // SKILLS — Infrastructure Node Matrix */}
            <Reveal>
              <Panel
                as="section"
                id="sec-02"
                label="SEC_02 // SKILLS"
                meta={["SCALE: 1:2", "NODES: 08", "STATUS: ONLINE"]}
                className="scroll-mt-24"
              >
                <SectionTitle sub="// addressable capability nodes on the grid">
                  Infrastructure Node Matrix
                </SectionTitle>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {nodes.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.name}
                        className="group relative border border-blueprint-light/15 bg-blueprint-dark/30 p-4 transition-colors hover:border-accent-cyan/40"
                      >
                        <CropMarks className="border-blueprint-light/25" />
                        <Icon
                          className="h-5 w-5 text-accent-cyan/80"
                          strokeWidth={1.5}
                        />
                        <div className="mt-4 text-sm tracking-wide text-blueprint-light">
                          {n.name}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-blueprint-light/40">
                          {n.meta}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </Reveal>

            {/* SEC_03 // PROJECTS — Component Deconstruction */}
            <Reveal>
              <Panel
                as="section"
                id="sec-03"
                label="SEC_03 // PROJECTS"
                meta={["SCALE: 1:1", "MODULES: 03", "STATUS: DEPLOYED"]}
                className="scroll-mt-24"
              >
                <SectionTitle sub="// modules exploded for inspection">
                  Component Deconstruction
                </SectionTitle>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <article
                      key={p.mod}
                      className="group relative flex flex-col border border-blueprint-light/15 bg-blueprint-dark/30 p-5 transition-colors hover:border-accent-cyan/40"
                    >
                      <CropMarks className="border-blueprint-light/25" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-accent-cyan/70">
                          {p.mod}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-blueprint-light/40">
                          STATUS: {p.status}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg text-blueprint-light">
                        {p.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-blueprint-light/60">
                        {p.desc}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-blueprint-light/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-blueprint-light/50"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href="#sec-03"
                        className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-accent-cyan/80 transition-colors hover:text-accent-cyan"
                      >
                        Inspect
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </article>
                  ))}
                </div>
              </Panel>
            </Reveal>

            {/* SEC_04 // CONTACT — Data Pipeline Hub */}
            <Reveal>
              <Panel
                as="section"
                id="sec-04"
                label="SEC_04 // CONTACT"
                meta={["SCALE: 1:1", "CHANNELS: 03", "STATUS: OPEN"]}
                className="scroll-mt-24"
              >
                <SectionTitle sub="// route a signal through the delivery pipeline">
                  Data Pipeline Hub
                </SectionTitle>

                {/* Pipeline: horizontal array on desktop, vertical stack on mobile */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                  {pipeline.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <Fragment key={s.stage}>
                        <div className="relative flex flex-1 flex-col border border-blueprint-light/15 bg-blueprint-dark/30 p-5">
                          <CropMarks className="border-blueprint-light/25" />
                          <div className="flex items-center gap-2 text-accent-cyan/80">
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                            <span className="text-[10px] uppercase tracking-[0.25em]">
                              {s.stage}
                            </span>
                          </div>
                          <div className="mt-4 text-base text-blueprint-light">
                            {s.label}
                          </div>
                          <div className="mt-1 text-xs text-blueprint-light/50">
                            {s.desc}
                          </div>
                        </div>
                        {i < pipeline.length - 1 && (
                          <ArrowRight
                            aria-hidden
                            className="mx-auto h-4 w-4 shrink-0 rotate-90 text-accent-cyan/50 sm:mx-0 sm:self-center sm:rotate-0"
                            strokeWidth={1.5}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* Endpoints */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {channels.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.label}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 border border-blueprint-light/15 bg-blueprint-dark/30 px-4 py-3 transition-colors hover:border-accent-cyan/50"
                      >
                        <CropMarks className="border-blueprint-light/25" />
                        <Icon
                          className="h-4 w-4 shrink-0 text-accent-cyan/80"
                          strokeWidth={1.5}
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.25em] text-blueprint-light/40">
                            {c.label}
                          </div>
                          <div className="truncate text-sm text-blueprint-light">
                            {c.value}
                          </div>
                        </div>
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-blueprint-light/30 transition-colors group-hover:text-accent-cyan" />
                      </a>
                    );
                  })}
                </div>
              </Panel>
            </Reveal>
          </div>

          {/* Footer stamp */}
          <footer className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-blueprint-light/10 pt-5 text-[10px] uppercase tracking-[0.25em] text-blueprint-light/35">
            <span>© {new Date().getFullYear()} — YOUR NAME</span>
            <span>DWG 001 · SHEET 01 / 01</span>
          </footer>
        </div>
      </div>
    </>
  );
}
