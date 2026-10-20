import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import ServiceStrip from "@/components/home/ServiceStrip";
import CategoryRail from "@/components/home/CategoryRail";
import LogoMarquee from "@/components/home/LogoMarquee";
import Spotlight from "@/components/home/Spotlight";
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
import { getProductBySlug } from "@/lib/data";

export default function Home() {
  const star = getProductBySlug("solo-wifi-vending-machine");

  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <HomePopup />
      <main className="relative">
        <HomeHero />
        <ServiceStrip />
        <CategoryRail />
        <LogoMarquee />
        <Products />
        {star && <Spotlight slug={star.slug} name={star.name} fullName={star.fullName} image={star.image} price={star.price} />}
        <About />
        <FundingBanner />
        <HowItWorks />
        <Customers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <DeferredFloatingContact />
    </>
  );
}
