"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  LoaderCircle,
  CheckCheck,
  TriangleAlert,
  Download,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { submitContact, type ContactState } from "../actions/contact";
import { CropMarks } from "./Panel";

const INITIAL: ContactState = {
  status: "idle",
  code: "AWAIT_INPUT",
  message: "Console idle — awaiting client transmission.",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_BODY = 12;

/** Real-time per-field marker derived from the current input value. */
type FieldStatus = "AWAIT" | "VAL_PENDING" | "VAL_OK";

function emailStatus(v: string): FieldStatus {
  if (!v) return "AWAIT";
  return EMAIL_RE.test(v.trim()) ? "VAL_OK" : "VAL_PENDING";
}
function bodyStatus(v: string): FieldStatus {
  if (!v) return "AWAIT";
  return v.trim().length >= MIN_BODY ? "VAL_OK" : "VAL_PENDING";
}

const MARKER: Record<FieldStatus, { dot: string; text: string }> = {
  AWAIT: { dot: "bg-blueprint-light/30", text: "text-blueprint-light/40" },
  VAL_PENDING: { dot: "bg-amber-400", text: "text-amber-400/90" },
  VAL_OK: { dot: "bg-accent-cyan", text: "text-accent-cyan" },
};

/* -------------------------------------------------------------------------- */

export default function ContactConsole() {
  // A key bump remounts ConsoleForm, resetting useActionState for a new send.
  const [sessionKey, setSessionKey] = useState(0);
  const session = (0x1000 + sessionKey).toString(16).toUpperCase();

  return (
    <div className="relative border border-blueprint-light/15 bg-blueprint-dark/50">
      <CropMarks className="border-blueprint-light/25" />

      {/* Console title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-blueprint-light/15 px-4 py-2.5">
        <span className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-accent-cyan/80">
          <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} />
          DATA SUBMISSION CONSOLE
        </span>
        <a
          href="/resume.pdf"
          download="Rana-Haseeb-Resume.pdf"
          className="inline-flex items-center gap-1.5 border border-blueprint-light/20 px-2.5 py-1 text-[9px] tracking-[0.2em] text-blueprint-light/70 transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
        >
          <Download className="h-3 w-3" strokeWidth={1.5} />
          EXPORT_SPEC_SHEET
        </a>
      </div>

      <ConsoleForm
        key={sessionKey}
        session={session}
        onReset={() => setSessionKey((k) => k + 1)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ConsoleForm({
  session,
  onReset,
}: {
  session: string;
  onReset: () => void;
}) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const eStatus = emailStatus(email);
  const bStatus = bodyStatus(body);
  const done = state.status === "ok";

  // Overall system status line.
  const sysCode = pending
    ? "STATUS_PROCESSING"
    : done
      ? state.code
      : state.status === "error"
        ? state.code
        : eStatus === "VAL_OK" && bStatus === "VAL_OK"
          ? "VAL_OK · READY"
          : "AWAIT_INPUT";

  return (
    <div className="p-4 sm:p-5">
      {done ? (
        <SuccessPanel state={state} onReset={onReset} />
      ) : (
        <form action={formAction} className="space-y-4">
          <MatrixField
            id="cf-mail"
            name="email"
            label="CLIENT.MAIL"
            addr="0x00 — 0x2F"
            placeholder="client@domain.tld"
            value={email}
            onChange={setEmail}
            status={eStatus}
            error={state.fieldErrors?.email}
            disabled={pending}
          />
          <MatrixField
            id="cf-body"
            name="body"
            label="MESSAGE.BODY"
            addr="0x30 — 0xFF"
            placeholder="Describe the build, role, or transmission…"
            value={body}
            onChange={setBody}
            status={bStatus}
            error={state.fieldErrors?.body}
            disabled={pending}
            textarea
          />

          {/* Terminal readout */}
          <Readout
            session={session}
            eStatus={eStatus}
            bStatus={bStatus}
            sysCode={sysCode}
            pending={pending}
            error={state.status === "error" ? state.message : null}
          />

          <TransmitButton pending={pending} />
        </form>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MatrixField({
  id,
  name,
  label,
  addr,
  placeholder,
  value,
  onChange,
  status,
  error,
  disabled,
  textarea,
}: {
  id: string;
  name: string;
  label: string;
  addr: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  status: FieldStatus;
  error?: string;
  disabled?: boolean;
  textarea?: boolean;
}) {
  const marker = MARKER[status];
  const shared =
    "w-full border bg-blueprint-dark/60 px-3 py-2 text-sm text-blueprint-light placeholder:text-blueprint-light/30 outline-none transition-colors focus:border-accent-cyan/70";
  const border = error
    ? "border-red-400/60"
    : status === "VAL_OK"
      ? "border-accent-cyan/45"
      : "border-blueprint-light/20";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          htmlFor={id}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-blueprint-light/70"
        >
          <span className="text-accent-cyan/60">[</span>
          {label}
          <span className="text-accent-cyan/60">]</span>
          <span className="text-blueprint-light/30">{addr}</span>
        </label>
        <span
          className={`flex items-center gap-1.5 text-[9px] tracking-[0.2em] ${marker.text}`}
        >
          <motion.span
            className={`h-1.5 w-1.5 ${marker.dot}`}
            animate={status === "VAL_PENDING" ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={
              status === "VAL_PENDING"
                ? { duration: 1, repeat: Infinity }
                : { duration: 0.2 }
            }
          />
          {status}
        </span>
      </div>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type="email"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} ${border}`}
        />
      )}

      {error && (
        <p className="mt-1 flex items-center gap-1 text-[10px] tracking-[0.1em] text-red-400/90">
          <TriangleAlert className="h-3 w-3" strokeWidth={1.5} />
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Readout({
  session,
  eStatus,
  bStatus,
  sysCode,
  pending,
  error,
}: {
  session: string;
  eStatus: FieldStatus;
  bStatus: FieldStatus;
  sysCode: string;
  pending: boolean;
  error: string | null;
}) {
  const line = (label: string, value: string, tone: string) => (
    <div className="flex items-center gap-2">
      <ChevronRight className="h-2.5 w-2.5 shrink-0 text-accent-cyan/50" />
      <span className="text-blueprint-light/40">{label}</span>
      <span className="flex-1 border-b border-dashed border-blueprint-light/10" />
      <span className={tone}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-1.5 border border-blueprint-light/10 bg-blueprint-dark/40 p-3 font-mono text-[10px] leading-none tracking-[0.15em]">
      {line("SESSION", `0x${session}`, "text-blueprint-light/60")}
      {line("CLIENT.MAIL", eStatus, MARKER[eStatus].text)}
      {line("MESSAGE.BODY", bStatus, MARKER[bStatus].text)}
      {line(
        "STATUS",
        pending ? "PROCESSING…" : sysCode,
        error
          ? "text-red-400/90"
          : sysCode.startsWith("VAL_OK") || sysCode.startsWith("STATUS_2")
            ? "text-accent-cyan"
            : "text-blueprint-light/60",
      )}
      {error && (
        <div className="flex items-center gap-2 pt-0.5 text-red-400/80">
          <ChevronRight className="h-2.5 w-2.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function TransmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2.5 text-[11px] tracking-[0.3em] text-accent-cyan transition-colors hover:border-accent-cyan/70 hover:bg-accent-cyan/15 disabled:opacity-70"
    >
      {/* Dynamic action icon — swaps with a keyed remount so it animates in. */}
      <motion.span
        key={pending ? "sending" : "idle"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        {pending ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            <LoaderCircle className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        ) : (
          <Send className="h-4 w-4" strokeWidth={1.5} />
        )}
      </motion.span>
      {pending ? "TRANSMITTING…" : "TRANSMIT_PACKET"}

      {/* Outbound packet sweep while transmitting. */}
      {pending && (
        <motion.span
          className="pointer-events-none absolute top-1/2 h-1 w-1 -translate-y-1/2 bg-accent-cyan"
          initial={{ left: "-5%" }}
          animate={{ left: "105%" }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
        />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */

function SuccessPanel({
  state,
  onReset,
}: {
  state: ContactState;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center py-6 text-center"
    >
      {/* Outbound stream packet arriving at the endpoint */}
      <div className="relative mb-5 flex h-8 w-full max-w-[220px] items-center justify-between">
        <span className="h-2 w-2 border border-accent-cyan/60" />
        <span className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-blueprint-light/15" />
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-accent-cyan"
            initial={{ left: "8%", opacity: 0 }}
            animate={{ left: "88%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.28,
            }}
          />
        ))}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 260 }}
          className="flex h-6 w-6 items-center justify-center border border-accent-cyan/60 bg-accent-cyan/15 text-accent-cyan"
        >
          <CheckCheck className="h-3.5 w-3.5" strokeWidth={2} />
        </motion.span>
      </div>

      <p className="text-sm tracking-[0.3em] text-accent-cyan">{state.code}</p>
      <p className="mt-2 max-w-xs text-xs leading-relaxed text-blueprint-light/60">
        {state.message}
      </p>
      {state.ts && (
        <p className="mt-2 text-[9px] tracking-[0.2em] text-blueprint-light/35">
          TX @ {state.ts}
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-1.5 border border-blueprint-light/20 px-4 py-2 text-[10px] tracking-[0.25em] text-blueprint-light/70 transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
      >
        <Send className="h-3 w-3" strokeWidth={1.5} />
        NEW_TRANSMISSION
      </button>
    </motion.div>
  );
}
