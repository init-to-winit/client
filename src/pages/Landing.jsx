import Hero from "@/components/landing/Hero";
import Man from "@/components/landing/Man";
import Navbar from "@/components/landing/Navbar";
import Options from "@/components/landing/Options";
import Track from "@/components/landing/Track";
import React from "react";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Options />
      <Track />
      <Man />
    </>
  );
}
