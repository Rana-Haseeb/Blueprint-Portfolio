import type { ElementType, ReactNode } from "react";

/**
 * Four L-shaped registration / crop marks, one per corner. The parent must be
 * `relative`; marks are pinned to the panel's own 1px border edges.
 */
export function CropMarks({
  className = "border-accent-cyan/60",
}: {
  className?: string;
}) {
  const base = `pointer-events-none absolute z-10 h-2.5 w-2.5 ${className}`;
  return (
    <>
      <span aria-hidden className={`${base} -left-px -top-px border-l border-t`} />
      <span aria-hidden className={`${base} -right-px -top-px border-r border-t`} />
      <span aria-hidden className={`${base} -bottom-px -left-px border-b border-l`} />
      <span
        aria-hidden
        className={`${base} -bottom-px -right-px border-b border-r`}
      />
    </>
  );
}

type PanelProps = {
  /** Semantic tag to render (section/article/div). */
  as?: ElementType;
  id?: string;
  /** Bracketed marker, e.g. "SEC_01 // ABOUT" → rendered as [SEC_01 // ABOUT]. */
  label?: string;
  /** Structural metadata chips, e.g. ["SCALE: 1:1", "STATUS: STABLE"]. */
  meta?: string[];
  className?: string;
  children: ReactNode;
};

/**
 * A wireframe panel: ultra-thin 1px frame, corner crop marks, and an optional
 * metadata sub-header. The shared building block for every blueprint section.
 */
export default function Panel({
  as: Tag = "div",
  id,
  label,
  meta = [],
  className = "",
  children,
}: PanelProps) {
  const hasHeader = Boolean(label) || meta.length > 0;
  return (
    <Tag
      id={id}
      className={`relative border border-blueprint-light/15 bg-blueprint-light/[0.015] ${className}`}
    >
      <CropMarks />

      {hasHeader && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-blueprint-light/15 px-4 py-2.5 sm:px-5">
          {label && (
            <span className="text-[11px] tracking-[0.25em] text-accent-cyan/80">
              [{label}]
            </span>
          )}
          {meta.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-[0.2em] text-blueprint-light/40">
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-5 sm:px-6 sm:py-6">{children}</div>
    </Tag>
  );
}
