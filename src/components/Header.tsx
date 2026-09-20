"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav, services, site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
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
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.label === "Services" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70 ${
                    solid ? "text-ink" : "text-white"
                  }`}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl bg-paper py-2 shadow-card ring-1 ring-ink/10">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sage/25"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                  solid ? "text-ink" : "text-white"
                }`}
              >
                {item.label}
              </a>
            )
          )}
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
          onClick={() => {
            setOpen((v) => !v);
            setServicesOpen(false);
          }}
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
            {nav.map((item) =>
              item.label === "Services" ? (
                <div key={item.href} className="border-b border-ink/5 last:border-0">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-3 font-display text-lg font-medium text-ink"
                    >
                      {item.label}
                    </a>
                    <button
                      type="button"
                      aria-label={servicesOpen ? "Collapse services" : "Expand services"}
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className="grid h-10 w-10 place-items-center text-ink"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  {servicesOpen && (
                    <div className="flex flex-col pb-3">
                      {services.map((s) => (
                        <a
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-4 text-base font-medium text-ink/75"
                        >
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/5 py-3 font-display text-lg font-medium text-ink last:border-0"
                >
                  {item.label}
                </a>
              )
            )}
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
