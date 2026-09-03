export default function Intro() {
  return (
    <section id="about" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-olive">
          What we do
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight text-ink">
          South Florida Transport Services
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted">
          Specializing in small moves and deliveries, ensuring that every item is
          handled with the utmost care. Our team is dedicated to providing
          reliable and personalized service, making your move stress-free and
          efficient.
        </p>
      </div>
    </section>
  );
}
