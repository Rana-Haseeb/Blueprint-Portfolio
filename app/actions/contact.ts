"use server";

/**
 * Contact submission Server Action (Next.js 16).
 *
 * Invoked through `useActionState` from the ContactConsole client component —
 * no API route, one POST roundtrip. Every input is treated as untrusted and
 * validated server-side before the "delivery" is accepted.
 */

export type ContactState = {
  status: "idle" | "ok" | "error";
  /** Terminal-style status code, e.g. AWAIT_INPUT / STATUS_200_OK. */
  code: string;
  message: string;
  fieldErrors?: { email?: string; body?: string };
  /** ISO timestamp stamped on a successful delivery. */
  ts?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_BODY = 12;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  const fieldErrors: { email?: string; body?: string } = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Malformed address vector";
  if (body.length < MIN_BODY)
    fieldErrors.body = `Payload below ${MIN_BODY}-byte minimum`;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      code: "ERR_422_VALIDATION",
      message: "Transmission rejected at ingress — check field markers.",
      fieldErrors,
    };
  }

  // Persist / relay the message. Wire an email provider (e.g. Resend) or a DB
  // write here; the console.info keeps a server-side trace in the meantime.
  await new Promise((r) => setTimeout(r, 650)); // simulated relay latency
  console.info("[contact] inbound packet", { email, bytes: body.length });

  return {
    status: "ok",
    code: "STATUS_200_OK",
    message: "Packet delivered. Expect a response vector within 48h.",
    ts: new Date().toISOString(),
  };
}
