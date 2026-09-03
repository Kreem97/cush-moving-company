import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="A Cush Moving Company van parked outside a home, ready to load"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/20 to-paper" />

      <div className="relative mx-auto max-w-6xl px-5 pt-24 text-center sm:px-8">
        <h1 className="font-display text-[clamp(2.75rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(12,12,12,0.35)]">
          Cush Moving Company
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-white/90 drop-shadow-[0_1px_12px_rgba(12,12,12,0.45)]">
          Small moves and deliveries across {""}
          <span className="whitespace-nowrap">South Florida</span> — handled with
          the care we&apos;d give our own.
        </p>
        <div className="mt-10">
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-full bg-ink px-9 py-4 font-display text-lg font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
          >
            Get a quote
          </a>
        </div>
      </div>
    </section>
  );
}
