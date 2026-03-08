import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Compliance from "@/components/Compliance";
import Customers from "@/components/Customers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingContact from "@/components/FloatingContact";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Compliance />
        <Customers />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
