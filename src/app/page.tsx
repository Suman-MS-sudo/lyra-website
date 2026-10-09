import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import FundingBanner from "@/components/FundingBanner";
import Customers from "@/components/Customers";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { HomePopup, DeferredFloatingContact } from "@/components/DeferredWidgets";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <HomePopup />
      <main className="relative">
        <Hero />
        <About />
        <Products />
        <HowItWorks />
        <FundingBanner />
        <Customers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <DeferredFloatingContact />
    </>
  );
}
