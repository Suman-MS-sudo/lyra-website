import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Customers from "@/components/Customers";
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
        title="Get a free callback"
        body="Leave your number and our team will call you back with product details and a quote — no obligation."
      />
      <main className="relative">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Products />
        <div className="section-divider" />
        <Customers />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
