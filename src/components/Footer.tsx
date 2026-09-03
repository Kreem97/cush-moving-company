import Image from "next/image";
import { nav, site } from "@/lib/site";

const footerLinks = nav.filter((item) => item.label !== "Home");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr_1.4fr_1fr]">
        <div>
          <Image
            src="/images/logo-mark.png"
            alt={site.name}
            width={96}
            height={96}
            className="h-24 w-24 object-contain"
          />
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Site</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
                </svg>
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.4.6.3 1.2.6 1.7 1.1s.8 1.1 1.1 1.7c.2.6.4 1.3.4 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.4 2.3a4.7 4.7 0 0 1-1.1 1.7c-.5.5-1.1.8-1.7 1.1-.6.2-1.3.4-2.3.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.4a4.7 4.7 0 0 1-1.7-1.1 4.7 4.7 0 0 1-1.1-1.7c-.2-.6-.4-1.3-.4-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.4-2.3A4.7 4.7 0 0 1 3.6 3.6 4.7 4.7 0 0 1 5.3 2.5c.6-.2 1.3-.4 2.3-.4C8.7 2 9 2 12 2zm0 1.8c-2.6 0-2.9 0-4 .1-.8 0-1.3.2-1.6.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.6-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .8.2 1.3.3 1.6.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.6.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.8 0 1.3-.2 1.6-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.6.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.8-.2-1.3-.3-1.6a2.7 2.7 0 0 0-.6-1 2.7 2.7 0 0 0-1-.6c-.3-.1-.8-.3-1.6-.3-1.1-.1-1.4-.1-4-.1zm0 3.1a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.3-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
              </svg>
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.9v8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        Copyright © {year} {site.legalName}. All Rights Reserved.
      </div>
    </footer>
  );
}
