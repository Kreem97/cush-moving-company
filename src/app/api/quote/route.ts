import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const MAX_TOTAL_BYTES = 25 * 1024 * 1024;

type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  description: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const payload: QuotePayload = {
    name: String(form.get("name") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    description: String(form.get("description") ?? "").trim(),
  };

  // Honeypot — bots fill hidden fields, humans don't.
  if (String(form.get("company") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!payload.name || !payload.phone || !payload.description) {
    return NextResponse.json(
      { error: "Please fill in your name, phone, and a description." },
      { status: 400 },
    );
  }
  if (!isEmail(payload.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const attachments = form
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const totalBytes = attachments.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Attachments must total under 25 MB." },
      { status: 413 },
    );
  }

  const summary = [
    `New quote request — ${site.name}`,
    "",
    `Name:  ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    "",
    "Description:",
    payload.description,
    "",
    attachments.length
      ? `Attachments: ${attachments.map((f) => f.name).join(", ")}`
      : "Attachments: none",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_INBOX ?? site.email;
  const from = process.env.QUOTE_FROM;

  // If email delivery is configured, send it. Otherwise accept the request and
  // log it so a real inbox/webhook can be wired in without touching the client.
  if (resendKey && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: payload.email,
          subject: `Quote request from ${payload.name}`,
          text: summary,
        }),
      });
      if (!res.ok) {
        console.error("Resend error", await res.text());
        return NextResponse.json(
          { error: "We couldn't send your request. Please call us instead." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Quote email failed", err);
      return NextResponse.json(
        { error: "We couldn't send your request. Please call us instead." },
        { status: 502 },
      );
    }
  } else {
    console.info("[quote] delivery not configured — request received:\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
