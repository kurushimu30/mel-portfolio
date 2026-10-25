"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Compass, Cpu, Layers, Sparkles, Award } from "lucide-react";

const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    id: "explore",
    title: "Curiosity First",
    icon: Compass,
    short: "How I learn.",
    body: "Explore unfamiliar problems through questions, experimentation, and hands-on learning.",
    accent: "#9B8AFB",
  },
  {
    id: "structure",
    title: "Systems Thinker",
    icon: Cpu,
    short: "How I approach problems.",
    body: "Understand how technology, processes, and people fit together to solve a problem.",
    accent: "#43C6C5",
  },
  {
    id: "community",
    title: "Ecosystem Builder",
    icon: Layers,
    short: "How I build with others.",
    body: "Create the conditions for people to learn, collaborate, and make things together.",
    accent: "#E2E8F0",
  },
];

interface MosaicCard {
  src: string;
  alt: string;
  cls: string;
  imgClass?: string;
}

const MOSAIC: MosaicCard[] = [
  {
    src: "/about/hackmanila.jpg",
    alt: "HackManila Builder Community",
    cls: "col-start-1 col-span-4 row-span-2",
    imgClass: "object-cover object-center",
  },
  {
    src: "/about/IoTSpeakership.jpg",
    alt: "IoT Philippines Breakout Session",
    cls: "col-start-5 col-span-2",
    imgClass: "object-cover object-center",
  },
  {
    src: "/about/pgdxbooth.jpg",
    alt: "ARK Studio PGDX Booth Showcase",
    cls: "col-start-7 col-span-4",
    imgClass: "object-cover object-[center_60%]",
  },
  {
    src: "/about/devcon.JPG",
    alt: "DEVCON Manila Keynote Session",
    cls: "col-start-11 col-span-2 row-span-2",
    imgClass: "object-cover object-[65%_30%]",
  },
  {
    src: "/about/pbwbooth.jpg",
    alt: "Philippine Blockchain Week Booth",
    cls: "col-start-5 col-span-3",
    imgClass: "object-cover object-center",
  },
  {
    src: "/about/CCISGameJam.jpg",
    alt: "CCIS Game Jam Participants",
    cls: "col-start-8 col-span-3",
    imgClass: "object-cover object-center",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const gentleItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothCinemaEase,
    },
  },
};

export default function About() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="about" className="relative w-full overflow-hidden bg-transparent text-white py-28 sm:py-36">
      {/* Ambient Luminescence: replaced 170px blur with hardware-composited blur-3xl */}
      <div className="pointer-events-none absolute top-1/4 left-10 w-[600px] h-[350px] rounded-full bg-[#8B5CF6]/5 blur-3xl transform-gpu" />
      <div className="pointer-events-none absolute bottom-1/3 right-10 w-[500px] h-[300px] rounded-full bg-[#43C6C5]/5 blur-3xl transform-gpu" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 relative z-10 space-y-28">
        
        {/* 01 — INTRODUCTION */}
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-6"
          >
            {/* Header Badge */}
            <motion.div variants={gentleItemVariants} className="flex items-center gap-2 transform-gpu">
              <span className="size-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
              <p className="text-xs uppercase font-medium tracking-[0.25em] text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                Personal Background
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={gentleItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.05] tracking-tight font-[family-name:var(--font-manrope)] transform-gpu"
            >
              I build across code, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                games, and communities.
              </span>
            </motion.h2>

            {/* Narrative Arc */}
            <motion.div variants={gentleItemVariants} className="space-y-4 text-zinc-300 font-light text-sm sm:text-base leading-relaxed font-[family-name:var(--font-inter)] max-w-2xl transform-gpu">
              <p>
                I&apos;m Mel Carl Chacon, a BSIT student at the Polytechnic University of the Philippines. Beyond the classroom, I&apos;ve worked across software and game development, led student initiatives, coordinated collaborative projects, and founded ARK to help aspiring game developers find people to build with and opportunities to put their skills into practice.
              </p>
              <p>
                My work has taken me from developing projects and organizing community activities to participating in industry showcases and competitive technology programs. Each experience has given me a different perspective on building—from solving technical problems to coordinating people and turning an idea into something others can experience.
              </p>
            </motion.div>

            {/* Compact Milestones Proof Strip */}
            <motion.div
              variants={gentleItemVariants}
              className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] max-w-2xl transform-gpu"
            >
              <Award className="size-4 text-[#9B8AFB] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                <span className="text-white font-semibold">Selected milestones:</span> PH100 / StellarPH Top 100 Under 30 · Thynkora AI, WCHL 2025 Top 15 qualification round · Code White, PGDX Indie Game Stars 2026 Official Selection.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Living Desk Viewport (Pure GPU scale/fade, static render) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: smoothCinemaEase }}
            className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden select-none pointer-events-none border border-white/10 bg-[#12131C] transform-gpu will-change-transform"
          >
            <div className="relative w-full h-full">
              <Image
                src="/about-desk.jpg"
                alt="Personal workspace and systems setup"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Reticle Corner Brackets */}
            <div className="absolute top-4 left-4 size-3 border-t border-l border-[#8B5CF6]/60" />
            <div className="absolute top-4 right-4 size-3 border-t border-r border-[#8B5CF6]/60" />
            <div className="absolute bottom-4 left-4 size-3 border-b border-l border-[#8B5CF6]/60" />
            <div className="absolute bottom-4 right-4 size-3 border-b border-r border-[#8B5CF6]/60" />

            {/* Vignettes */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#090A0F] to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090A0F] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090A0F] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#090A0F] to-transparent z-10" />
          </motion.div>
        </div>

        {/* 02 — PHILOSOPHY & ANIMATED PILLARS */}
        <div className="pt-8 border-t border-white/10 space-y-12">
          {/* Philosophy Stage Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: smoothCinemaEase }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-8 sm:p-12 lg:p-14 overflow-hidden transform-gpu"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#9B8AFB]/10 blur-3xl transform-gpu" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-xs font-mono text-[#9B8AFB]">
                <Sparkles className="size-3.5" />
                <span>Operating Philosophy</span>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: smoothCinemaEase }}
                className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-manrope)] leading-tight text-white transform-gpu"
              >
                Curiosity is where I start. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8AFB] via-zinc-200 to-[#43C6C5]">
                  Building is how I learn.
                </span>
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease: smoothCinemaEase }}
                className="space-y-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)] transform-gpu"
              >
                <p>
                  I&apos;m drawn to unfamiliar problems, ideas that can be taken further, and the challenge of figuring out how different pieces fit together. Whether I&apos;m writing code, developing a game, organizing a team, or shaping a community, I learn by exploring, experimenting, and turning what I discover into something tangible.
                </p>
                <p>
                  I don&apos;t see building as just creating a finished product. It&apos;s also about improving the process, learning from what doesn&apos;t work, and creating an environment where other people can do meaningful work too.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Pillars List */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">
                Pillars of Practice
              </span>
              <span className="text-xs font-mono text-[#9B8AFB]">
                Select a pillar to view its focus
              </span>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isActive = activePillar === idx;
                return (
                  <motion.div
                    key={pillar.id}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.97 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: smoothCinemaEase,
                        },
                      },
                    }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="h-full transform-gpu"
                  >
                    <button
                      onClick={() => {
                        playSelectPing(1 + idx * 0.1);
                        setActivePillar(idx);
                      }}
                      onMouseEnter={() => playHoverTick("far")}
                      className={`w-full h-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                        isActive
                          ? "border-[#8B5CF6] bg-white/[0.04] shadow-[0_0_24px_rgba(139,92,246,0.15)]"
                          : "border-white/10 bg-white/[0.01] hover:border-white/25 hover:bg-white/[0.02]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="pillarGlow"
                          className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-[#8B5CF6]/20 blur-xl"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center justify-between relative z-10">
                        <div
                          className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] transition-transform duration-300 group-hover:scale-105"
                          style={{ color: pillar.accent }}
                        >
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1 relative z-10">
                        <h4 className="text-lg font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                          {pillar.title}
                        </h4>
                        <p className="text-xs font-mono text-[#9B8AFB]">
                          {pillar.short}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)] pt-1 border-t border-white/10 relative z-10">
                        {pillar.body}
                      </p>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* 03 — STATEMENT & FIELD EVIDENCE */}
        <div className="pt-12 border-t border-white/10 space-y-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: smoothCinemaEase }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight font-[family-name:var(--font-manrope)] transform-gpu"
            >
              I&apos;m not just building projects.{" "}
              <span className="text-[#9B8AFB] block mt-1.5">
                I&apos;m building the builders.
              </span>
            </motion.h3>

            {/* Synchronized Unified Grid Entrance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.55,
                    ease: smoothCinemaEase,
                    // Tight micro-stagger: feels simultaneous and intentional, not staggered or pop-in
                    staggerChildren: 0.03,
                  },
                },
              }}
              style={{ contain: "paint layout" }}
              className="grid h-[240px] sm:h-[300px] grid-cols-12 grid-rows-2 gap-3 transform-gpu"
            >
              {MOSAIC.map((card, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.4, ease: smoothCinemaEase },
                    },
                  }}
                  onMouseEnter={() => playHoverTick("far")}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12131C] hover:border-[#8B5CF6]/50 transition-colors duration-200 transform-gpu ${card.cls}`}
                >
                  {/* Hardware-Composited Image */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className={`size-full opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-transform transition-opacity duration-300 ease-out transform-gpu will-change-transform ${
                      card.imgClass || "object-cover object-center"
                    }`}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  {/* Unified Vignette Layer */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0F]/80 via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}