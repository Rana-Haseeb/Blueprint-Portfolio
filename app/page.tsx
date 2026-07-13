"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  Boxes,
  Component,
  Workflow,
  GitBranch,
  Mail,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import Panel, { CropMarks } from "./components/Panel";
import Sidebar, { type NavItem } from "./components/Sidebar";
import SkillGraph from "./components/SkillGraph";
import ProjectStack from "./components/ProjectStack";
import ContactConsole from "./components/ContactConsole";

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
  { k: "LOCATION", v: "PAKISTAN · UTC+05" },
  { k: "FOCUS", v: "MERN · AI/ML" },
  { k: "AVAILABILITY", v: "OPEN TO WORK" },
];

const channels = [
  {
    label: "EMAIL",
    value: "ranahaseeb92029@gmail.com",
    href: "mailto:ranahaseeb92029@gmail.com",
    icon: Mail,
  },
  {
    label: "GITHUB",
    value: "/Rana-Haseeb",
    href: "https://github.com/Rana-Haseeb",
    icon: GitBranch,
  },
  {
    label: "LINKEDIN",
    value: "/rana-muhammad-haseeb-khan",
    href: "https://www.linkedin.com/in/rana-muhammad-haseeb-khan-039098298/",
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
              RANA HASEEB<span className="text-accent-cyan">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-blueprint-light/70 sm:text-base">
              Software engineer &amp; AI/ML enthusiast. Full-stack developer
              (MERN · Next.js) with C++ &amp; DSA foundations — building and
              shipping real-world products on the grid.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-blueprint-light/40">
              <span>LAT 30.3753</span>
              <span>LON 69.3451</span>
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
                      I&apos;m Rana Muhammad Haseeb Khan — a software engineer and
                      AI/ML enthusiast who builds full-stack products across the
                      MERN and Next.js stacks, grounded in C++ and data
                      structures.
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blueprint-light/60">
                      This document is a live blueprint of that practice. Scroll
                      the pipeline to inspect my capability stack, shipped
                      modules, and the channels wired for input.
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
                <SectionTitle sub="// hover a node to trace its data stream">
                  Infrastructure Node Matrix
                </SectionTitle>
                <SkillGraph />
              </Panel>
            </Reveal>

            {/* SEC_03 // PROJECTS — Component Deconstruction */}
            <Reveal>
              <Panel
                as="section"
                id="sec-03"
                label="SEC_03 // PROJECTS"
                meta={["SCALE: 1:1", "MODULES: 04", "STATUS: DEPLOYED"]}
                className="scroll-mt-24"
              >
                <SectionTitle sub="// hover a build to explode its stack layers">
                  Component Deconstruction
                </SectionTitle>
                <ProjectStack />
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

                {/* Functional submission console (Next.js Server Action) */}
                <ContactConsole />

                {/* Direct channel endpoints */}
                <p className="mt-6 mb-3 text-[10px] uppercase tracking-[0.25em] text-blueprint-light/35">
                  // or route through a direct channel
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
            <span>© {new Date().getFullYear()} — RANA HASEEB</span>
            <span>DWG 001 · SHEET 01 / 01</span>
          </footer>
        </div>
      </div>
    </>
  );
}
