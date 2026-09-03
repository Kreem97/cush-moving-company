import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import CareBand from "@/components/CareBand";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Intro />
        <Services />
        <CareBand />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
