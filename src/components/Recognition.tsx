"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, Award, Gamepad2, Trophy, X, ShieldCheck, ExternalLink } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

interface PodiumMilestone {
  id: string;
  year: string;
  tag: string;
  title: string;
  organization: string;
  detail: string;
  fullDescription: string;
  proofImage: string;
  proofCaption: string;
  icon: React.ElementType;
  accent: string;
  floatOffset: number;
  floatDuration: number;
}

const PODIUM_MILESTONES: PodiumMilestone[] = [
  // LEFT: WCHL 2025 Top 15 Qualifier (Matches your file: whcl.png)
  {
    id: "wchl",
    year: "2025",
    tag: "TOP 15 QUALIFIER",
    title: "WORLD HACKER LEAGUE",
    organization: "Thynkora AI · ICP Hub Philippines",
    detail: "Top 15 Finalist Across PH",
    fullDescription:
      "Selected as one of the Philippines' Top 15 WCHL 2025 Qualification Round Winners with Thynkora AI out of 11,774 global registrations and 1,152 submitted projects worldwide.",
    proofImage: "/recognition/whcl.png",
    proofCaption: "WCHL 2025 Qualification Round Official Announcement",
    icon: Trophy,
    accent: "#43C6C5",
    floatOffset: -7,
    floatDuration: 6.2,
  },
  // CENTER: PH100 Under 30 by StellarPH (Matches your file: stellarph-proof.png)
  {
    id: "stellarph",
    year: "2026",
    tag: "STELLARPH NAMED AS",
    title: "PH100 UNDER 30",
    organization: "StellarPH · Philippine Startup Ecosystem",
    detail: "100 Brightest Minds of the PH",
    fullDescription:
      "Spotlighted in the PH100 by StellarPH—an annual list celebrating the 100 brightest minds within the Filipino startup ecosystem under the age of 30, honoring remarkable contributions across engineering, community building, and technical leadership.",
    proofImage: "/recognition/stellarph-proof.png",
    proofCaption: "Official StellarPH Top 100 Under 30 National Recognition",
    icon: Award,
    accent: "#9B8AFB",
    floatOffset: -9,
    floatDuration: 5.6,
  },
  // RIGHT: Code White: The Observer — PGDX 2026 (Matches your file: pgdx-proof.jpg)
  {
    id: "pgdx",
    year: "2026",
    tag: "OFFICIAL SELECTION",
    title: "PGDX INDIE STARS",
    organization: "Code White: The Observer · PGDX 2026",
    detail: "Code White Flagship Showcase",
    fullDescription:
      "Code White: The Observer chosen as an official selection for exhibition at the Philippine GameDev Expo (PGDX) 2026. A psychological horror puzzle adventure where players navigate unsettling environments, collect clues, and solve room-scale mysteries to survive.",
    proofImage: "/recognition/pgdx-proof.jpg",
    proofCaption: "Official PGDX 2026 Indie Game Stars Exhibitor Selection",
    icon: Gamepad2,
    accent: "#43C6C5",
    floatOffset: -6,
    floatDuration: 6.8,
  },
];

interface ArchivalDistinction {
  code: string;
  title: string;
  organization: string;
  period: string;
  note: string;
}

const ARCHIVAL_MILESTONES: ArchivalDistinction[] = [
  {
    code: "04",
    title: "President's Lister Distinction",
    organization: "Polytechnic University of the Philippines",
    period: "2024 — 2026",
    note: "Sustained collegiate academic honors with a 1.13 cumulative General Weighted Average (GWA).",
  },
  {
    code: "05",
    title: "Panel Judge & Tournament Adjudicator",
    organization: "CCIS Week Game Jam ('Take One, Leave the Rest')",
    period: "2025",
    note: "Evaluated 20+ competitive builds across gameplay state logic, physics, and narrative direction.",
  },
  {
    code: "06",
    title: "National Finalist — Business Analytics",
    organization: "TPG Solar Hackathon (PantropiCode)",
    period: "2025",
    note: "Synthesized quantitative feasibility models and telemetry dashboards under a 48-hour sprint.",
  },
];

export default function Recognition() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const [selectedProof, setSelectedProof] = useState<PodiumMilestone | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProof(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="recognition"
      className="relative w-full overflow-hidden bg-transparent py-32 sm:py-40 text-white select-none"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full bg-[#8B5CF6]/5 blur-[180px] z-0" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: smoothCinemaEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#43C6C5] shadow-[0_0_8px_#43C6C5]" />
              <p className="text-xs uppercase font-medium tracking-[0.25em] text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                RECOGNITION
              </p>
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl font-light tracking-tight text-white uppercase">
              Milestones,{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                not finish lines.
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-[family-name:var(--font-inter)] text-zinc-400 max-w-lg leading-relaxed font-light">
              Selected individual distinctions, engineering qualifiers, and verified industry selections across leadership, artificial intelligence, and game development.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 tracking-wider font-[family-name:var(--font-inter)]">
            <span>SCULPTURAL DOSSIER</span>
            <span className="text-zinc-700">/</span>
            <span className="text-[#43C6C5]">3 PODIUM VECTORS</span>
          </div>
        </motion.div>

        {/* PODIUM STAGE */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-end relative min-h-[620px]">
          
          {/* LEFT: WCHL */}
          {(() => {
            const wchl = PODIUM_MILESTONES[0];
            const Icon = wchl.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, delay: 0.1, ease: smoothCinemaEase }}
                onClick={() => {
                  playSelectPing(1.15);
                  setSelectedProof(wchl);
                }}
                onMouseEnter={() => playHoverTick("mid")}
                className="md:col-span-4 order-2 md:order-1 flex flex-col items-center group cursor-pointer outline-none"
              >
                <motion.div
                  animate={{ y: [0, wchl.floatOffset, 0] }}
                  transition={{ repeat: Infinity, duration: wchl.floatDuration, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2"
                >
                  <div className="relative flex items-center justify-center">
                    <svg
                      className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -mr-2.5 transition-transform duration-300 group-hover:-translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>

                    <div className="relative size-28 xl:size-32 rounded-full flex flex-col items-center justify-center border-2 border-[#43C6C5]/50 bg-gradient-to-b from-[#181928] via-[#10111D] to-[#0A0B10] shadow-[0_0_35px_rgba(67,198,197,0.2)] group-hover:border-[#43C6C5] group-hover:shadow-[0_0_50px_rgba(67,198,197,0.4)] transition-all duration-300">
                      <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 pointer-events-none" />
                      <Icon className="size-8 xl:size-9 mb-1 text-[#43C6C5] transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-mono text-sm xl:text-base tracking-widest text-zinc-100 font-extrabold">
                        {wchl.year}
                      </span>
                    </div>

                    <svg
                      className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -ml-2.5 transform -scale-x-100 transition-transform duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>
                  </div>

                  <div className="mt-3 px-3 py-1 rounded-sm bg-[#43C6C5]/15 border border-[#43C6C5]/40 shadow-[0_0_15px_rgba(67,198,197,0.2)]">
                    <p className="text-[10px] xl:text-[11px] font-mono tracking-widest text-[#43C6C5] uppercase font-bold">
                      {wchl.tag}
                    </p>
                  </div>
                </motion.div>

                <div className="relative w-48 sm:w-56 h-[90px] flex flex-col items-center mt-3">
                  <div className="w-full h-8 rounded-[100%] border border-[#43C6C5]/40 bg-[#12131D] shadow-[0_0_20px_rgba(67,198,197,0.2)] flex items-center justify-center">
                    <span className="size-2 rounded-full bg-[#43C6C5]" />
                  </div>
                  <div className="w-36 sm:w-44 flex-1 border-x border-white/10 bg-gradient-to-b from-[#12131D]/90 via-[#0B0C12] to-transparent relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#43C6C5]/5 to-transparent" />
                    <div className="absolute top-2 inset-x-2 h-px bg-white/5" />
                  </div>
                </div>

                <div className="mt-5 text-center max-w-xs space-y-1.5 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#43C6C5] font-medium font-[family-name:var(--font-inter)]">
                    Decentralized Protocol Qualifier
                  </span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#43C6C5] transition-colors">
                    {wchl.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                    {wchl.organization}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-light leading-relaxed font-[family-name:var(--font-inter)] pt-1">
                    Top 15 Qualification Round Winners out of 11,774 registrations and 1,152 projects submitted globally.
                  </p>
                  <span className="text-[10px] font-mono text-[#43C6C5] pt-1 inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <span>Inspect verification</span>
                    <ExternalLink className="size-2.5" />
                  </span>
                </div>
              </motion.div>
            );
          })()}

          {/* CENTER: PH100 */}
          {(() => {
            const ph100 = PODIUM_MILESTONES[1];
            const Icon = ph100.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, ease: smoothCinemaEase }}
                onClick={() => {
                  playSelectPing(1.25);
                  setSelectedProof(ph100);
                }}
                onMouseEnter={() => playHoverTick("near")}
                className="md:col-span-4 order-1 md:order-2 flex flex-col items-center group cursor-pointer outline-none relative -top-4 sm:-top-8"
              >
                <div className="mb-2 px-3 py-0.5 rounded-full border border-[#9B8AFB]/40 bg-[#9B8AFB]/10 text-[10px] uppercase tracking-widest text-[#9B8AFB] font-[family-name:var(--font-inter)] flex items-center gap-1.5">
                  <Sparkles className="size-3 text-[#9B8AFB]" /> Featured Distinction · 2026
                </div>

                <motion.div
                  animate={{ y: [0, ph100.floatOffset, 0] }}
                  transition={{ repeat: Infinity, duration: ph100.floatDuration, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2"
                >
                  <div className="relative flex items-center justify-center">
                    <svg
                      className="w-11 h-24 xl:w-13 xl:h-28 text-[#8B5CF6] -mr-3 transition-transform duration-300 group-hover:-translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>

                    <div className="relative size-32 xl:size-36 rounded-full flex flex-col items-center justify-center border-2 border-[#9B8AFB] bg-gradient-to-b from-[#1f2035] via-[#121320] to-[#0A0B10] shadow-[0_0_50px_rgba(155,138,251,0.35)] ring-1 ring-white/15 group-hover:shadow-[0_0_65px_rgba(155,138,251,0.55)] transition-all duration-300">
                      <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 pointer-events-none" />
                      <Icon className="size-9 xl:size-10 mb-1 text-[#9B8AFB] transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-mono text-base xl:text-lg tracking-widest text-zinc-100 font-extrabold">
                        {ph100.year}
                      </span>
                    </div>

                    <svg
                      className="w-11 h-24 xl:w-13 xl:h-28 text-[#8B5CF6] -ml-3 transform -scale-x-100 transition-transform duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>
                  </div>

                  <div className="mt-3 px-3.5 py-1 rounded-sm bg-[#8B5CF6]/25 border border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.25)]">
                    <p className="text-[10px] xl:text-[11px] font-mono tracking-widest text-[#9B8AFB] uppercase font-bold">
                      {ph100.tag}
                    </p>
                  </div>
                </motion.div>

                <div className="relative w-56 sm:w-64 h-[140px] flex flex-col items-center mt-3">
                  <div className="w-full h-10 rounded-[100%] border border-[#9B8AFB]/50 bg-[#161726] shadow-[0_0_30px_rgba(155,138,251,0.3)] flex items-center justify-center">
                    <span className="size-2.5 rounded-full bg-[#9B8AFB] shadow-[0_0_10px_#9B8AFB]" />
                  </div>
                  <div className="w-44 sm:w-52 flex-1 border-x border-white/15 bg-gradient-to-b from-[#161726] via-[#0E0F18] to-transparent relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#9B8AFB]/10 to-transparent" />
                    <div className="absolute top-3 inset-x-2 h-px bg-white/10" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 -translate-x-1/2" />
                  </div>
                </div>

                <div className="mt-5 text-center max-w-sm space-y-2 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#9B8AFB] font-medium font-[family-name:var(--font-inter)]">
                    Filipino Startup Ecosystem
                  </span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#9B8AFB] transition-colors">
                    {ph100.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium font-[family-name:var(--font-inter)]">
                    {ph100.organization}
                  </p>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed font-[family-name:var(--font-inter)] pt-1">
                    Annual list spotlighting the 100 brightest minds under 30 across the Philippines, recognizing remarkable contributions in engineering and ecosystem leadership.
                  </p>
                  <span className="text-[10px] font-mono text-[#9B8AFB] pt-1 inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <span>Inspect verification</span>
                    <ExternalLink className="size-2.5" />
                  </span>
                </div>
              </motion.div>
            );
          })()}

          {/* RIGHT: PGDX */}
          {(() => {
            const pgdx = PODIUM_MILESTONES[2];
            const Icon = pgdx.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, delay: 0.2, ease: smoothCinemaEase }}
                onClick={() => {
                  playSelectPing(1.15);
                  setSelectedProof(pgdx);
                }}
                onMouseEnter={() => playHoverTick("mid")}
                className="md:col-span-4 order-3 flex flex-col items-center group cursor-pointer outline-none"
              >
                <motion.div
                  animate={{ y: [0, pgdx.floatOffset, 0] }}
                  transition={{ repeat: Infinity, duration: pgdx.floatDuration, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2"
                >
                  <div className="relative flex items-center justify-center">
                    <svg
                      className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -mr-2.5 transition-transform duration-300 group-hover:-translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>

                    <div className="relative size-28 xl:size-32 rounded-full flex flex-col items-center justify-center border-2 border-[#8B5CF6]/50 bg-gradient-to-b from-[#181928] via-[#10111D] to-[#0A0B10] shadow-[0_0_35px_rgba(139,92,246,0.2)] group-hover:border-[#8B5CF6] group-hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-300">
                      <div className="absolute inset-2.5 rounded-full border border-dashed border-white/20 pointer-events-none" />
                      <Icon className="size-8 xl:size-9 mb-1 text-[#43C6C5] transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-mono text-sm xl:text-base tracking-widest text-zinc-100 font-extrabold">
                        {pgdx.year}
                      </span>
                    </div>

                    <svg
                      className="w-10 h-22 xl:w-12 xl:h-26 text-[#8B5CF6]/70 -ml-2.5 transform -scale-x-100 transition-transform duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 16 36"
                      fill="currentColor"
                    >
                      <path d="M14 2C10 6 6 12 7 18C4 16 2 13 2 9C2 14 5 20 9 24C6 23 4 20 4 17C4 22 8 28 14 32C10 27 10 20 12 14C12 10 13 6 14 2Z" />
                    </svg>
                  </div>

                  <div className="mt-3 px-3 py-1 rounded-sm bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <p className="text-[10px] xl:text-[11px] font-mono tracking-widest text-[#9B8AFB] uppercase font-bold">
                      {pgdx.tag}
                    </p>
                  </div>
                </motion.div>

                <div className="relative w-48 sm:w-56 h-[65px] flex flex-col items-center mt-3">
                  <div className="w-full h-8 rounded-[100%] border border-[#9B8AFB]/40 bg-[#12131D] shadow-[0_0_20px_rgba(155,138,251,0.2)] flex items-center justify-center">
                    <span className="size-2 rounded-full bg-[#9B8AFB]" />
                  </div>
                  <div className="w-36 sm:w-44 flex-1 border-x border-white/10 bg-gradient-to-b from-[#12131D]/90 via-[#0B0C12] to-transparent relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#9B8AFB]/5 to-transparent" />
                    <div className="absolute top-2 inset-x-2 h-px bg-white/5" />
                  </div>
                </div>

                <div className="mt-5 text-center max-w-xs space-y-1.5 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#9B8AFB] font-medium font-[family-name:var(--font-inter)]">
                    Independent Game Dev Exhibition
                  </span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#9B8AFB] transition-colors">
                    {pgdx.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                    {pgdx.organization}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-light leading-relaxed font-[family-name:var(--font-inter)] pt-1">
                    Selected for public exhibition at SMX Convention Center—a psychological horror puzzle adventure exploring mystery, rooms, and hidden truths.
                  </p>
                  <span className="text-[10px] font-mono text-[#9B8AFB] pt-1 inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <span>Inspect verification</span>
                    <ExternalLink className="size-2.5" />
                  </span>
                </div>
              </motion.div>
            );
          })()}

        </div>

        {/* ARCHIVE ACCORDION */}
        <div className="mt-24 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-wider text-zinc-500 uppercase font-[family-name:var(--font-inter)]">
              Archival Honors &amp; Adjudications ({ARCHIVAL_MILESTONES.length})
            </span>

            <button
              onClick={() => {
                playSelectPing(isArchiveOpen ? 1.0 : 1.2);
                setIsArchiveOpen(!isArchiveOpen);
              }}
              onMouseEnter={() => playHoverTick("far")}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-[family-name:var(--font-inter)] text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <span>{isArchiveOpen ? "Collapse Archive" : "Expand All Honors"}</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ${
                  isArchiveOpen ? "rotate-180 text-[#43C6C5]" : ""
                }`}
              />
            </button>
          </div>

          <AnimatePresence>
            {isArchiveOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 divide-y divide-white/5 border-y border-white/5">
                  {ARCHIVAL_MILESTONES.map((item) => (
                    <div
                      key={item.code}
                      onMouseEnter={() => playHoverTick("far")}
                      className="group py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 transition-colors hover:bg-white/[0.015] px-3 rounded-lg"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs text-zinc-600 group-hover:text-[#43C6C5] transition-colors font-mono">
                          {item.code}
                        </span>
                        <div>
                          <h5 className="font-[family-name:var(--font-manrope)] text-sm sm:text-base font-bold text-zinc-200 group-hover:text-white transition-colors">
                            {item.title}
                          </h5>
                          <p className="text-xs text-zinc-500 font-[family-name:var(--font-inter)]">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 text-xs font-[family-name:var(--font-inter)] text-zinc-400">
                        <span className="text-zinc-500 font-light text-[11px] sm:text-right max-w-sm">
                          {item.note}
                        </span>
                        <span className="text-[#9B8AFB] sm:min-w-16 sm:text-right">
                          {item.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* PROOF POPUP MODAL (Clean Aspect Ratio & Non-Obtrusive Caption) */}
      <AnimatePresence>
        {selectedProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProof(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: smoothCinemaEase }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-[#0E1018] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 flex flex-col gap-5 max-h-[92vh] overflow-y-auto"
            >
              <div
                className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full blur-3xl opacity-25"
                style={{ backgroundColor: selectedProof.accent }}
              />

              {/* Modal Top Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#9B8AFB]">
                    {selectedProof.tag} &bull; {selectedProof.year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                    {selectedProof.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    {selectedProof.organization}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProof(null)}
                  className="p-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Responsive Image Stage */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/70 flex items-center justify-center p-2 min-h-[200px] max-h-[58vh]">
                <img
                  src={selectedProof.proofImage}
                  alt={selectedProof.proofCaption}
                  className="max-h-[54vh] w-auto max-w-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = "flex";
                    }
                  }}
                />

                {/* Fallback Display if file is missing */}
                <div className="hidden flex-col items-center justify-center p-8 text-center space-y-2 bg-[#141522] rounded-xl w-full">
                  <Trophy className="size-10 text-[#9B8AFB] opacity-60" />
                  <p className="text-sm font-mono text-zinc-300">
                    {selectedProof.proofCaption}
                  </p>
                  <p className="text-xs text-zinc-500 font-mono">
                    File path: {selectedProof.proofImage}
                  </p>
                </div>
              </div>

              {/* Outside Caption Strip (Zero Overlay Over Artwork) */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1 pt-1 border-t border-white/5">
                <span className="text-zinc-300">{selectedProof.proofCaption}</span>
                <span className="text-[#43C6C5] flex items-center gap-1.5 shrink-0">
                  <ShieldCheck className="size-3.5" /> Verified Credential
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2 relative z-10 pt-1">
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                  {selectedProof.fullDescription}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}