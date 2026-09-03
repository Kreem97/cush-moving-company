import QuoteForm from "./QuoteForm";
import { site } from "@/lib/site";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink">
            Get a Quote
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-muted">
            Tell us about your move. Prefer to talk it through? Call{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-ink underline underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>
        <div className="mt-10">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
