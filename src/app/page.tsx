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
import FloatingContact from "@/components/FloatingContact";
import JsonLd from "@/components/JsonLd";
import ExitPopup from "@/components/ExitPopup";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <ExitPopup
        storageKey="lyra_home_popup_dismissed"
        source="homepage-popup"
        trigger="immediate"
        delayMs={10000}
        eyebrow="Price list + free callback"
        title="Vending machines from ₹12,000 + GST"
        body="Leave your number and we'll call back with prices for UPI, coin, RFID and push-button models. GeM registered, GST invoice on every order, 1-year warranty."
        cta="Get the Price List"
        quickContact
      />
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
      <FloatingContact />
    </>
  );
}
