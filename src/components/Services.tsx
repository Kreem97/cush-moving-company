import Image from "next/image";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="bg-paper pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service) => (
            <article
              key={service.title}
              className={`group relative overflow-hidden rounded-3xl shadow-card ${service.className}`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-sage-dark/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold leading-tight text-white drop-shadow-[0_1px_10px_rgba(12,12,12,0.5)]">
                  {service.title}
                </h3>
                <p className="mt-1 max-w-xs text-sm font-medium text-white/0 transition-colors duration-300 group-hover:text-white/90">
                  {service.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
