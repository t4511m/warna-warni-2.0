import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  product?: string;
  city?: string;
  budget?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Name is required";
  if (!body.email?.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(body.email.trim()))
    errors.email = "Email looks invalid";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: persist lead (DB / CRM / email). For now: log so devs see it locally.
  // eslint-disable-next-line no-console
  console.log("[lead]", {
    receivedAt: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
