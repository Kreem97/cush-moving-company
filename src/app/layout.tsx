import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://cushmovingcompany.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cush Moving Company | South Florida Moving & Delivery",
    template: "%s | Cush Moving Company",
  },
  description:
    "Cush Moving Company handles small moves, deliveries, freight hauling, junk removal, and furniture assembly across South Florida with reliable, personalized service.",
  keywords: [
    "moving company",
    "South Florida movers",
    "small moves",
    "delivery service",
    "junk removal",
    "freight hauling",
    "furniture assembly",
  ],
  openGraph: {
    title: "Cush Moving Company",
    description:
      "Small moves and deliveries across South Florida, handled with the same care as if they were our own.",
    url: siteUrl,
    siteName: "Cush Moving Company",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 897 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
