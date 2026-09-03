"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 6;
const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, MAX_FILES);
    const total = next.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setError("Attachments must total under 25 MB.");
      return;
    }
    setError(null);
    setFiles(next);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    data.delete("attachments");
    files.forEach((file) => data.append("attachments", file));

    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-sage-dark/30 bg-white p-10 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none">
            <path
              d="m5 13 4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
          Request received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Thanks — we&apos;ll review the details and get back to you shortly,
          usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-ink/15 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-2xl border border-sage-dark/35 bg-white px-4 py-3.5 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-sage-dark focus:ring-2 focus:ring-sage/60";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="sr-only">Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Phone Number"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="sr-only">Description</span>
        <textarea
          name="description"
          required
          rows={6}
          placeholder="Description — what are you moving, from where to where, and when?"
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-sage-dark bg-sage/20"
            : "border-sage-dark/35 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/*,video/*"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <svg
          viewBox="0 0 24 24"
          className="mx-auto h-8 w-8 text-muted"
          fill="none"
        >
          <path
            d="M12 16V4m0 0 4 4m-4-4L8 8M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 font-semibold text-ink underline underline-offset-4"
        >
          Upload Images / Videos
        </button>
        <p className="mt-1 text-sm text-muted">
          or drag and drop — up to {MAX_FILES} files, 25 MB total
        </p>

        {files.length > 0 && (
          <ul className="mx-auto mt-4 flex max-w-md flex-col gap-2 text-left">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-sage/20 px-3 py-2 text-sm"
              >
                <span className="truncate text-ink">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="shrink-0 text-muted hover:text-ink"
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink px-8 py-4 font-display text-lg font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
