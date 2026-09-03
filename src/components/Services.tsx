import Image from "next/image";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="bg-paper pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid auto-rows-[13rem] grid-cols-1 gap-4 sm:auto-rows-[15rem] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className={`group relative isolate overflow-hidden rounded-3xl shadow-card ${service.className}`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-sage-dark/55 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/5" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3
                  className={`font-display font-semibold leading-tight text-white drop-shadow-[0_1px_10px_rgba(12,12,12,0.55)] ${
                    service.featured ? "text-3xl sm:text-4xl" : "text-2xl"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="mt-1.5 max-w-xs translate-y-1 text-sm font-medium text-white/85 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
