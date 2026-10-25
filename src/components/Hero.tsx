"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Trophy, Gamepad2, Award, Download } from "lucide-react";

export default function Hero() {
  const cinemaTransit = [0.16, 1, 0.3, 1] as const;
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer parallax depths
  const glyphX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const glyphY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Grand Text Entrance Timings
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.7,
      },
    },
  };

  const grandItemFadeUp = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: cinemaTransit },
    },
  };

  const RECOGNITIONS = [
    {
      year: "2026",
      tag: "STELLARPH NAMED AS",
      title: "PH100 UNDER 30",
      detail: "100 Brightest Minds of the PH",
      icon: Award,
      accent: "#9B8AFB",
      floatDuration: 5.4,
      floatOffset: -8,
      alignOffsetClass: "translate-x-3 xl:translate-x-6",
    },
    {
      year: "2026",
      tag: "OFFICIAL SELECTION",
      title: "PGDX INDIE STARS",
      detail: "Code White Flagship Showcase",
      icon: Gamepad2,
      accent: "#43C6C5",
      floatDuration: 6.2,
      floatOffset: -6,
      alignOffsetClass: "-translate-x-6 xl:-translate-x-10 scale-105",
    },
    {
      year: "2025",
      tag: "NATIONAL FINALIST",
      title: "WORLD HACKER LEAGUE",
      detail: "Top 15 Finalist Across PH",
      icon: Trophy,
      accent: "#FFFFFF",
      floatDuration: 5.8,
      floatOffset: -7,
      alignOffsetClass: "translate-x-1 xl:translate-x-2",
    },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[750px] h-[100dvh] bg-transparent overflow-hidden flex items-end justify-center select-none"
    >
      {/* Ambient Atmospheric Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full bg-gradient-to-tr from-[#9B8AFB]/10 via-[#43C6C5]/5 to-transparent blur-[140px] z-0" />

      {/* Layer 1: Background Wordmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.75, scale: 0.8 }}
        transition={{ duration: 2.2, ease: cinemaTransit, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none"
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          <Image
            src="/BUILDER.svg"
            alt="BUILDER"
            fill
            priority
            className="object-contain object-center opacity-85 scale-110 sm:scale-125 lg:scale-[1.3]"
          />
        </div>
      </motion.div>

      {/* Layer 2: Cyan Architectural Glyph */}
      <motion.div
        style={{ x: glyphX, y: glyphY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: cinemaTransit, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <motion.div
          animate={{
            rotate: [0, 1.5, -1.5, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 14,
            ease: "easeInOut",
          }}
          className="relative w-[550px] sm:w-[750px] lg:w-[900px] xl:w-[980px] aspect-square"
        >
          <Image
            src="/cyan-glyph.svg"
            alt="Glyph"
            fill
            priority
            className="object-contain drop-shadow-[0_0_50px_rgba(67,198,197,0.15)]"
          />
        </motion.div>
      </motion.div>

      {/* Layer 3: Portrait (Height-anchored, zoom-resilient) */}
      <motion.div
        style={{ x: portraitX }}
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: cinemaTransit, delay: 0.45 }}
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center pointer-events-none h-[78vh] sm:h-[86vh] lg:h-[92vh] xl:h-[95vh]"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-full max-w-[850px] lg:max-w-[800px] xl:max-w-[950px] h-full"
        >
          <Image
            src="/Carl.png"
            alt="Mel Carl Chacon"
            fill
            priority
            unoptimized
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          />
        </motion.div>
      </motion.div>

      {/* Layer 4: Text UI & Actions Container */}
      <div className="relative z-30 w-full h-full max-w-[1700px] mx-auto px-8 sm:px-12 xl:px-16 pointer-events-none flex flex-col justify-between pt-24 pb-12 sm:pb-16">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-10 my-auto">
          
          {/* Left Block: Grand Scaled Text Hierarchy */}
          <motion.div
            style={{ x: textX }}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-lg lg:max-w-2xl flex flex-col space-y-5 sm:space-y-6 pointer-events-auto select-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          >
            {/* Handwritten Greeting */}
            <motion.span
              variants={{
                hidden: { opacity: 0, rotate: -8, scale: 0.85, y: 15 },
                visible: {
                  opacity: 1,
                  rotate: -3,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: cinemaTransit },
                },
              }}
              className="font-[family-name:var(--font-handwriting)] text-5xl sm:text-6xl lg:text-7xl text-zinc-300 origin-left inline-block"
            >
              Hi, I&apos;m
            </motion.span>

            {/* Display Name */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.96, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 1.1, ease: cinemaTransit },
                },
              }}
              className="font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-tight text-white leading-[0.84] m-0"
            >
              MEL CARL <br /> CHACON
            </motion.h1>

            {/* Role & Description Hierarchy */}
            <motion.div variants={grandItemFadeUp} className="space-y-3 pt-1">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold tracking-wider text-[#9B8AFB] uppercase font-mono">
                Founder • Developer &amp; System Builder
              </h2>
              
              <p className="text-lg sm:text-2xl font-semibold text-white tracking-tight font-[family-name:var(--font-manrope)] leading-snug">
                I see the bigger picture. Then I build it.
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl font-light font-[family-name:var(--font-inter)]">
                I work across software, game development, and systems-building—turning ideas into working experiences and bringing people together to build what comes next.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={grandItemFadeUp}
              className="flex flex-wrap items-center gap-3.5 pt-3 pointer-events-auto"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md hover:scale-[1.03] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="size-3.5 text-zinc-400" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#4A2C87] hover:bg-[#5C37A6] text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-[0_0_25px_rgba(74,44,135,0.45)] hover:shadow-[0_0_35px_rgba(155,138,251,0.5)] hover:scale-[1.03]"
              >
                <Download className="size-3.5" />
                <span>Download Résumé</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Block: Laurel Insignias */}
          <div className="flex flex-col items-center justify-center pointer-events-auto pr-2 xl:pr-6">
            <div className="hidden lg:flex flex-col items-center gap-8 xl:gap-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
              {RECOGNITIONS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 40, scale: 0.75, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.9,
                      ease: cinemaTransit,
                      delay: 1.1 + idx * 0.16,
                    }}
                    className={item.alignOffsetClass}
                  >
                    <motion.div
                      animate={{ y: [0, item.floatOffset, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: item.floatDuration,
                        ease: "easeInOut",
                        delay: idx * 0.35,
                      }}
                      className="flex flex-col items-center text-center cursor-default group transition-transform duration-500 w-[280px] xl:w-[340px]"
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Left Laurel Branch */}
                        <motion.svg
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.7, delay: 1.35 + idx * 0.16 }}
                          className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -mr-2.5 transition-transform duration-300 group-hover:-translate-x-1.5"
                          viewBox="0 0 16 36"
                          fill="currentColor"
                        >
                          <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                        </motion.svg>

                        {/* Circular Core Medallion Disc */}
                        <div className="relative size-28 xl:size-32 rounded-full flex flex-col items-center justify-center border-2 border-[#9B8AFB]/60 bg-gradient-to-b from-[#1f2035] via-[#121320] to-[#0A0B10] shadow-[0_0_45px_rgba(155,138,251,0.25)] ring-1 ring-white/15 group-hover:border-[#9B8AFB] group-hover:shadow-[0_0_60px_rgba(155,138,251,0.45)] transition-all duration-300">
                          <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 pointer-events-none" />

                          <IconComponent
                            className="size-8 xl:size-9 mb-1 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: item.accent }}
                          />

                          <span className="font-mono text-sm xl:text-base tracking-widest text-zinc-100 font-extrabold">
                            {item.year}
                          </span>
                        </div>

                        {/* Right Laurel Branch */}
                        <motion.svg
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.7, delay: 1.35 + idx * 0.16 }}
                          className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -ml-2.5 transform -scale-x-100 transition-transform duration-300 group-hover:translate-x-1.5"
                          viewBox="0 0 16 36"
                          fill="currentColor"
                        >
                          <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                        </motion.svg>
                      </div>

                      {/* Ribbon Placard */}
                      <div className="mt-3 px-3.5 py-1 rounded-sm bg-[#8B5CF6]/25 border border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.25)]">
                        <p className="text-[10px] xl:text-[11px] font-mono tracking-widest text-[#9B8AFB] uppercase font-bold">
                          {item.tag}
                        </p>
                      </div>

                      {/* Description Stack */}
                      <div className="mt-2.5 space-y-1 max-w-[280px]">
                        <h4 className="text-base xl:text-lg font-extrabold text-white uppercase tracking-tight font-[family-name:var(--font-manrope)] leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs xl:text-sm text-zinc-400 font-mono leading-snug">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/90 to-transparent z-25 pointer-events-none" />
    </section>
  );
}