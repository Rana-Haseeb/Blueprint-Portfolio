import type { Config } from "tailwindcss";

/**
 * Blueprint / CAD schematic design system.
 *
 * Consumed by Tailwind v4 through the `@config` directive in `app/globals.css`.
 * Exposes a custom color palette, a monospace font stack, and a repeating
 * blueprint grid built purely from CSS linear-gradients.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // bg-blueprint-dark / text-blueprint-dark ...
        blueprint: {
          dark: "#0B1D3A",
          light: "#EAEAEA",
        },
        // bg-accent-cyan / text-accent-cyan / border-accent-cyan ...
        accent: {
          cyan: "#00F0FF",
        },
      },
      fontFamily: {
        // Geometric monospace CAD aesthetic (Geist Mono via next/font).
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      // `bg-blueprint-grid` — four stacked linear-gradients form a fine 5px
      // subdivision grid layered under a bolder 20px major layout grid.
      // NOTE: the matching per-layer `background-size` is paired in
      // `app/globals.css`; Tailwind v4 does not merge a same-named
      // `backgroundSize` theme key onto this utility.
      backgroundImage: {
        "blueprint-grid": [
          // 5px minor subdivisions (faint)
          "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
          "linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
          // 20px major layout grid (brighter)
          "linear-gradient(to right, rgba(0, 240, 255, 0.13) 1px, transparent 1px)",
          "linear-gradient(to bottom, rgba(0, 240, 255, 0.13) 1px, transparent 1px)",
        ].join(", "),
      },
    },
  },
  plugins: [],
};

export default config;
