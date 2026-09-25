import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Kept in sync with the client. Email providers reject large messages, so
// photos are attached up to this budget and bigger videos are declined.
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

// Sends from our verified Resend domain so delivery isn't limited to the
// sandbox sender's "your own signup email only" restriction.
const DEFAULT_FROM = `${site.name} <quotes@cushmovingcompany.com>`;

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
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 },
    );
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (String(form.get("company") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const payload: QuotePayload = {
    name: String(form.get("name") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    description: String(form.get("description") ?? "").trim(),
  };

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

  const files = form
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_ATTACHMENT_BYTES) {
    return NextResponse.json(
      {
        error:
          "Photos and videos must total under 10 MB. For larger files, text them to " +
          site.phone +
          ".",
      },
      { status: 413 },
    );
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name || "attachment",
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

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
      ? `Attachments (${attachments.length}): ${attachments
          .map((a) => a.filename)
          .join(", ")}`
      : "Attachments: none",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_INBOX || site.email;
  const from = process.env.QUOTE_FROM || DEFAULT_FROM;

  if (!resendKey) {
    // No provider configured (e.g. local dev). Accept the request and log it
    // so it isn't silently lost; set RESEND_API_KEY to enable email delivery.
    console.warn(
      "[quote] RESEND_API_KEY not set — request received but NOT emailed:\n" +
        summary,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

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
        subject: `Quote request from ${payload.name} (${payload.phone})`,
        text: summary,
        attachments: attachments.length ? attachments : undefined,
      }),
    });

    if (!res.ok) {
      console.error("[quote] Resend error", res.status, await res.text());
      return NextResponse.json(
        {
          error:
            "We couldn't send your request. Please call or text " + site.phone + ".",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[quote] delivery failed", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your request. Please call or text " + site.phone + ".",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
