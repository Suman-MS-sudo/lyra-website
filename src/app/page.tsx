import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import ServiceStrip from "@/components/home/ServiceStrip";
import CategoryRail from "@/components/home/CategoryRail";
import LogoMarquee from "@/components/home/LogoMarquee";
import Spotlight from "@/components/home/Spotlight";
import WordBand from "@/components/home/WordBand";
import RentalShowcase from "@/components/rental/RentalShowcase";
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
import fs from "node:fs";
import path from "node:path";
import { getProductBySlug } from "@/lib/data";

/** Drop a clip at public/videos/hero.mp4 and the homepage hero plays it behind its cinematic grade. */
const HERO_VIDEO = fs.existsSync(path.join(process.cwd(), "public", "videos", "hero.mp4")) ? "/videos/hero.mp4" : undefined;

export default function Home() {
  const star = getProductBySlug("solo-wifi-vending-machine");

  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <HomePopup />
      <main className="relative">
        <HomeHero videoSrc={HERO_VIDEO} />
        <ServiceStrip />
        <RentalShowcase />
        <CategoryRail />
        <LogoMarquee />
        <Products />
        <WordBand />
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
