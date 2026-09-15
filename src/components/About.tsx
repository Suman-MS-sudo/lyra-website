"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const values = [
  {
    title: "Our Mission",
    description:
      "To grow beyond our current 200+ installations and make sanitary hygiene infrastructure accessible in every school, office, hospital and public space in India.",
    image: "/images/stock/mission.webp",
  },
  {
    title: "Our Vision",
    description:
      "To champion feminine hygiene infrastructure with ISO 9001:2015-certified quality and give every woman dignity and privacy.",
    image: "/images/stock/vision.jpg",
  },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="lyra-container">
        {/* Section Header */}
        <FadeUp>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="lyra-eyebrow mb-6">
              India&apos;s #1 Vending Machine Manufacturer
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
              We Build for{" "}
              <span className="text-gradient">Women&apos;s Dignity</span>.
              <br />
              200+ Institutions Trust Us.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Lyra Enterprises designs and manufactures feminine hygiene
              infrastructure in India — vending machines and incinerators
              built for institutional scale, not one-off consumer purchases.
              Our manufacturing is ISO 9001:2015 certified for privacy,
              reliability and sustainability.
            </p>
          </div>
        </FadeUp>

        {/* Mission / Vision Cards */}
        <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
          {values.map((val, i) => (
            <FadeUp key={val.title} delay={i * 0.12}>
              <div className="lyra-card lyra-card-hover group h-full overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[5/2] overflow-hidden border-b border-slate-100 bg-slate-50">
                  <Image
                    src={val.image}
                    alt={val.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    quality={70}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {val.description}
                  </p>
                  <div className="mt-4 h-1 w-12 rounded-full bg-primary-600" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
