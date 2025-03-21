import FAQSection from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Man from "@/components/landing/Man";
import Navbar from "@/components/landing/Navbar";
import Options from "@/components/landing/Options";
import StrategicChoice from "@/components/landing/StrategicChoice";
import Testimonials from "@/components/landing/Testimonials";
import Track from "@/components/landing/Track";
import WhyUs from "@/components/landing/WhyUs";
import React from "react";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Options />
      <Track />
      <Man />
      <WhyUs />
      <StrategicChoice />
      <Testimonials />
      <FAQSection />
      <Footer />
    </>
  );
}
