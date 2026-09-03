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

`POST /api/quote` validates the submission, then emails it — including any
uploaded photos as attachments — via [Resend](https://resend.com).

**Setup is one environment variable.** In Vercel → Project → Settings →
Environment Variables (or `.env.local` for local dev):

```
RESEND_API_KEY=re_...
```

1. Sign up at Resend using the inbox that should receive quotes
   (e.g. `cushmovingcompany1@gmail.com`).
2. Create an API key and paste it in.

That's it. `QUOTE_INBOX` defaults to the site email and `QUOTE_FROM` defaults to
Resend's shared `onboarding@resend.dev` sender, so no domain setup is required.
For the best inbox placement later, verify your domain in Resend and set
`QUOTE_FROM` to an address on it.

**Uploads:** photos/videos are attached to the notification email, capped at
10 MB total (email providers reject large messages). The form tells users to
text bigger videos to the business number.

Without `RESEND_API_KEY`, the form still works — submissions are accepted and
logged server-side (`delivered: false`), not emailed.

## Source material

Raw photos, invoices, and the Figma export live in this folder for reference and
are git-ignored (see `.gitignore`). The site only uses the optimized copies in
`public/images/`.
