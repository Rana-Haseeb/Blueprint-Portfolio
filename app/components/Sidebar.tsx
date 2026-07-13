"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  /** Full CAD marker used as accessible label + hover tooltip. */
  label: string;
  icon: LucideIcon;
};

/**
 * Floating CAD utility toolbar. Vertical rail on desktop (left edge), a docked
 * horizontal bar on mobile (bottom). Highlights the section currently in view.
 */
export default function Sidebar({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Trip when a section crosses the vertical middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    const observed = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Blueprint sections"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2"
    >
      <ul className="flex flex-row gap-1 border border-blueprint-light/15 bg-blueprint-dark/70 p-1.5 backdrop-blur-sm sm:flex-col">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                title={label}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex h-10 w-10 items-center justify-center border transition-colors duration-200 ${
                  isActive
                    ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                    : "border-transparent text-blueprint-light/45 hover:border-blueprint-light/20 hover:text-blueprint-light"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />

                {/* Tooltip — above on mobile, to the right on desktop. */}
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-blueprint-light/15 bg-blueprint-dark/90 px-2 py-1 text-[10px] tracking-[0.2em] text-blueprint-light/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:bottom-auto sm:left-full sm:top-1/2 sm:mb-0 sm:ml-2 sm:-translate-x-0 sm:-translate-y-1/2">
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
