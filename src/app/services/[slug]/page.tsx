import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Cush Moving Company`,
      description: service.description,
      images: [{ url: service.gallery[0] }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);
  const [heroImage, ...restGallery] = service.gallery;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-ink pb-16 pt-28 sm:pb-24 sm:pt-36">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
            <div>
              <nav className="text-sm font-medium text-white/60">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/#services" className="hover:text-white">
                  Services
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">{service.title}</span>
              </nav>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-[0.98] tracking-tight text-white">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg font-medium text-white/80">
                {service.blurb}
              </p>
              <div className="mt-8">
                <Link
                  href="/#quote"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-display text-lg font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
                >
                  Get a quote
                </Link>
              </div>
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-card">
              <Image
                src={heroImage}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-olive">
                {service.title}
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">
                What&apos;s included
              </h2>
              <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-muted">
                {service.description}
              </p>
            </div>

            <ul className="space-y-4 self-start rounded-3xl bg-sage/25 p-6 sm:p-8">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-5 w-5 shrink-0 text-sage-dark"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="font-medium text-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {restGallery.length > 0 && (
          <section className="bg-paper pb-20 sm:pb-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {restGallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card"
                  >
                    <Image
                      src={src}
                      alt={`${service.title} — Cush Moving Company`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-sage py-16 sm:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
              Ready to get {service.title.toLowerCase()} handled?
            </h2>
            <p className="max-w-xl text-lg font-medium text-white/90">
              Tell us what you need moved. Prefer to talk it through? Call{" "}
              <a href={site.phoneHref} className="font-semibold underline underline-offset-4">
                {site.phone}
              </a>
              .
            </p>
            <Link
              href="/#quote"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-9 py-4 font-display text-lg font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
            >
              Get a quote
            </Link>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              Other services
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative isolate aspect-square overflow-hidden rounded-2xl shadow-card"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/45 transition-colors group-hover:bg-ink/30" />
                  <span className="absolute inset-x-0 bottom-0 p-3 font-display text-sm font-semibold leading-tight text-white">
                    {s.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
