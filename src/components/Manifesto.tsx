"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Ultra-smooth liquid deceleration curve (eliminates sudden snap)
const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking with generous margins for smooth interpolation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.3, 0.08]);

  // Orchestrated Line Variants with progressive stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.15,
      },
    },
  };

  // Organic typographic reveal: Soft rise + defocus clearing + subtle settlement
  const lineSlideUp = {
    hidden: {
      y: 44,
      opacity: 0,
      scale: 0.96,
      filter: "blur(12px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.35,
        ease: smoothCinemaEase,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[75vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent py-32 text-white select-none"
    >
      {/* 1. Subtle Background Ghost Watermark */}
      <motion.div
        style={{ x: watermarkX }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.035]"
      >
        <span className="font-black text-[22vw] leading-none tracking-tighter uppercase whitespace-nowrap text-white font-[family-name:var(--font-manrope)]">
          EXECUTION
        </span>
      </motion.div>

      {/* 2. Dynamic Volumetric Core Radiance */}
      <motion.div
        style={{ y: glowY, opacity: glowOpacity }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] rounded-full bg-gradient-to-r from-[#9B8AFB]/15 via-[#8B5CF6]/10 to-[#43C6C5]/10 blur-[150px]"
      />

      {/* 3. Floating Terminal Accents */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-6xl px-6">
        <span className="absolute top-1/4 left-8 sm:left-16 font-mono text-xs text-[#9B8AFB]/35 tracking-widest select-none">
          &gt;_ ARCHITECTURE.CORE
        </span>
        <span className="absolute bottom-1/4 right-8 sm:right-16 font-mono text-xs text-[#43C6C5]/35 tracking-widest select-none">
          &lt; RUNTIME: 2026 / &gt;
        </span>
      </div>

      {/* 4. Central Architectural Statement (Soft Focus Glides) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center space-y-1 sm:space-y-2.5 will-change-transform"
        >
          {/* Top Line */}
          <div className="overflow-visible py-0.5">
            <motion.h2
              variants={lineSlideUp}
              className="font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none"
            >
              TO COMMAND THE
            </motion.h2>
          </div>

          {/* Second Line */}
          <div className="overflow-visible py-0.5">
            <motion.h2
              variants={lineSlideUp}
              className="font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none"
            >
              VISION,
            </motion.h2>
          </div>

          {/* Editorial Italic Contrast Line */}
          <div className="overflow-visible py-1 sm:py-2">
            <motion.p
              variants={lineSlideUp}
              className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] via-[#9B8AFB] to-[#43C6C5]"
            >
              one must ruthlessly
            </motion.p>
          </div>

          {/* Fourth Line */}
          <div className="overflow-visible py-0.5">
            <motion.h2
              variants={lineSlideUp}
              className="font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none"
            >
              ENGINEER THE
            </motion.h2>
          </div>

          {/* Final Punch */}
          <div className="overflow-visible py-0.5">
            <motion.h2
              variants={lineSlideUp}
              className="font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none"
            >
              EXECUTION.
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}