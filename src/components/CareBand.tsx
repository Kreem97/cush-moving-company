import Image from "next/image";

export default function CareBand() {
  return (
    <section className="bg-sage py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-5 sm:px-8 md:flex-row md:gap-14">
        <div className="relative aspect-[4/3] w-full max-w-sm shrink-0 overflow-hidden rounded-3xl shadow-card">
          <Image
            src="/images/care.jpg"
            alt="A Cush Moving Company team member carefully carrying panels indoors"
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
          />
        </div>
        <p className="font-display text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-snug text-white">
          We handle your move with the same care and attention as if it were our
          own. With a focus on reliability, personalized service, and a track
          record of satisfied customers, we ensure your belongings are safely
          transported — giving you peace of mind every step of the way.
        </p>
      </div>
    </section>
  );
}
