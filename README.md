# Cush Moving Company

Marketing site for Cush Moving Company LLC — small moves, deliveries, freight
hauling, junk removal, and assembly across South Florida.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and
**Tailwind CSS v4**.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | Description                        |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server              |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint                        |

## Project structure

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata
    page.tsx          Landing page (composes the sections below)
    globals.css       Tailwind theme tokens (colors, fonts)
    api/quote/route.ts  Quote-request handler
  components/
    Header.tsx        Sticky nav, transparent over hero
    Hero.tsx
    Intro.tsx         "South Florida Transport Services"
    Services.tsx      Bento grid of service cards
    CareBand.tsx      Sage band with the care statement
    QuoteForm.tsx     Client form with drag-and-drop uploads
    QuoteSection.tsx
    Footer.tsx
  lib/site.ts         Business info, nav, service list — edit copy here
public/images/        Optimized photos + logo used by the site
```

## Quote form delivery

`POST /api/quote` validates the submission. To actually deliver requests by
email, set these environment variables (e.g. in `.env.local` or your host):

```
RESEND_API_KEY=re_...      # https://resend.com
QUOTE_FROM=quotes@yourdomain.com   # a verified Resend sender
QUOTE_INBOX=cushmovingcompany1@gmail.com   # optional; defaults to the site email
```

Without them, submissions are accepted and logged server-side so you can wire in
any inbox or webhook later without changing the front end.

## Source material

Raw photos, invoices, and the Figma export live in this folder for reference and
are git-ignored (see `.gitignore`). The site only uses the optimized copies in
`public/images/`.
