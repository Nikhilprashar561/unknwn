"use client";

import React, { useCallback } from "react";
import Navbar from "@/components/Navbar";
import CurtainOpening from "@/components/CurtainOpening";
import Scene01 from "@/components/Scene01";
import Scene02 from "@/components/Scene02";
import Scene03Curation from "@/components/Scene03Curation";
import Scene04Passes from "@/components/Scene04Passes";
import Scene05Footer from "@/components/Scene05Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const handleCurtainComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, []);

  return (
    <>
      <CurtainOpening onComplete={handleCurtainComplete} />
      <Navbar />
      <main style={{ display: "block", width: "100%", background: "var(--unknkn-bg)" }}>
        <Scene01 />
        <Scene02 />
        <Scene03Curation />
        <Scene04Passes />
        <Scene05Footer />
      </main>
    </>
  );
}
