import type { ReactNode } from "react";

/** A small monospace readout stamped into the viewport margin. */
function Stamp({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`absolute font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-accent-cyan/60 ${className}`}
    >
      {children}
    </span>
  );
}

/** An L-shaped registration tick anchored to a frame corner. */
function CornerTick({ className }: { className: string }) {
  return <span className={`absolute h-3 w-3 ${className}`} />;
}

/**
 * ViewportFrame
 *
 * Non-interactive chrome overlaid on every route. It draws an inset schematic
 * frame with corner registration ticks and absolute coordinate counters in the
 * outer margins to establish the raw, high-precision CAD interface.
 */
export default function ViewportFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 select-none"
    >
      {/* Inset schematic frame */}
      <div className="absolute inset-4 border border-accent-cyan/20 sm:inset-6" />

      {/* Corner registration ticks (L-shaped) */}
      <CornerTick className="left-4 top-4 border-l border-t border-accent-cyan/50 sm:left-6 sm:top-6" />
      <CornerTick className="right-4 top-4 border-r border-t border-accent-cyan/50 sm:right-6 sm:top-6" />
      <CornerTick className="bottom-4 left-4 border-b border-l border-accent-cyan/50 sm:bottom-6 sm:left-6" />
      <CornerTick className="bottom-4 right-4 border-b border-r border-accent-cyan/50 sm:bottom-6 sm:right-6" />

      {/* Corner coordinate readouts */}
      <Stamp className="left-7 top-7 sm:left-9 sm:top-9">X: 104.2</Stamp>
      <Stamp className="right-7 top-7 text-right sm:right-9 sm:top-9">
        Y: 088.9
      </Stamp>
      <Stamp className="bottom-7 left-7 sm:bottom-9 sm:left-9">X: 012.7</Stamp>
      <Stamp className="bottom-7 right-7 text-right sm:bottom-9 sm:right-9">
        Y: 240.5
      </Stamp>

      {/* Edge labels */}
      <Stamp className="left-1/2 top-5 -translate-x-1/2 sm:top-7">
        VIEWPORT · 01
      </Stamp>
      {/* Hidden on mobile so it clears the docked bottom toolbar. */}
      <Stamp className="bottom-5 left-1/2 hidden -translate-x-1/2 sm:block sm:bottom-7">
        SCALE 1:100 · UNITS px
      </Stamp>
      {/* Hidden on desktop so it clears the left utility rail. */}
      <Stamp className="left-5 top-1/2 -translate-y-1/2 -rotate-90 sm:hidden">
        SECTION A—A
      </Stamp>
      <Stamp className="right-5 top-1/2 -translate-y-1/2 rotate-90 sm:right-7">
        GRID 20 / 05
      </Stamp>
    </div>
  );
}
