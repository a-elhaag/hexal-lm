import { Nav } from "~/components/nav/Nav";
import { Hero } from "~/components/sections/Hero";
import { Features } from "~/components/sections/Features";
import { HowItWorks } from "~/components/sections/HowItWorks";
import { Cta } from "~/components/sections/Cta";
import { Footer } from "~/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
