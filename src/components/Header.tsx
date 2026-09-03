"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-paper/95 backdrop-blur border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="block h-11 w-11 overflow-hidden rounded-full bg-black">
            <Image
              src="/images/logo@2x.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
              priority
            />
          </span>
          <span
            className={`hidden font-display text-lg font-semibold leading-tight sm:block ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            Cush Moving
            <span className="block text-[0.7rem] font-medium tracking-[0.22em] uppercase opacity-70">
              Company
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="rounded-full bg-sage-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-olive"
          >
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full border md:hidden ${
            solid ? "border-ink/15 text-ink" : "border-white/40 text-white"
          }`}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/5 py-3 font-display text-lg font-medium text-ink last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.phoneHref}
              className="mt-4 rounded-full bg-sage-dark px-5 py-3 text-center font-semibold text-white"
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
