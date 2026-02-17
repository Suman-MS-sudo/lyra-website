import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WomensDayCampaign from "@/components/WomensDayCampaign";
import Products from "@/components/Products";
import Customers from "@/components/Customers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WomensDayModal from "@/components/WomensDayModal";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <WomensDayModal />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WomensDayCampaign />
        <Products />
        <Customers />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
