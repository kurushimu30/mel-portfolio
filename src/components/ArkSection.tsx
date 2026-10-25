"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Gamepad2,
  Trophy,
  GitBranch,
  Network,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Boxes,
  Users2,
  Layers,
  Terminal,
  ShieldCheck,
} from "lucide-react";

const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

interface LogoItem {
  name: string;
  src: string;
  showText: boolean;
  sizeClass?: string;
}

interface LogoTier {
  categoryTitle: string;
  logos: LogoItem[];
}

const PARTNER_TIERS: LogoTier[] = [
  {
    categoryTitle: "CO-ORGANIZERS & FLAGSHIP INITIATIVES",
    logos: [
      { name: "Sage Dynamics", src: "/logos/sagedynamics.png", showText: false, sizeClass: "h-10 sm:h-12" },
      { name: "Vantis PH", src: "/logos/vantis.png", showText: false, sizeClass: "h-9 sm:h-11" },
      { name: "HackManila", src: "/logos/hackmanila.webp", showText: false, sizeClass: "h-10 sm:h-12" },
      { name: "YGG Play Summit", src: "/logos/ygg.png", showText: false, sizeClass: "h-10 sm:h-12" },
    ],
  },
  {
    categoryTitle: "SHOWCASE & PROGRAM PARTNERS",
    logos: [
      { name: "PGDX", src: "/logos/pgdx.png", showText: false, sizeClass: "h-14 sm:h-18 max-w-[260px]" },
      { name: "DataCamp Donates", src: "/logos/DC_Donates_logo_inverted.png", showText: false, sizeClass: "h-11 sm:h-14" },
      { name: "DOST-NCR", src: "/logos/dost.png", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "Philippine Blockchain Week", src: "/logos/PBW.png", showText: true, sizeClass: "h-10 sm:h-12" },
    ],
  },
{
    categoryTitle: "COLLEGIATE & BUILDER ALLIANCES",
    logos: [
      { name: "Workflow PH", src: "/logos/WORKFLOW PH - LOGO.png", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "AWS Cloud Club TUP", src: "/logos/TUP Logo.png", showText: true, sizeClass: "h-11 sm:h-13" },
      { name: "DEVCON Manila", src: "/logos/DevCon_Manila.jpg", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "GDSC PUP", src: "/logos/gdgpup_logo.jpg", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "AWS Cloud Club PUP", src: "/logos/aws.png", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "ICPEP.se PUP Manila", src: "/logos/ICPEP.jpg", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "PUP Manila", src: "/logos/PUPLogo.png", showText: true, sizeClass: "h-10 sm:h-12" },
      { name: "IoT Philippines", src: "/logos/Iot.jpg", showText: true, sizeClass: "h-9 sm:h-11" },
      { name: "GadgetsMagazine", src: "/logos/gadgetsmagazine.jpg", showText: true, sizeClass: "h-9 sm:h-11" },
      { name: "Arduino Day PH", src: "/logos/arduino.png", showText: true, sizeClass: "h-11 sm:h-13" },
      { name: "The Programmer's Guild", src: "/logos/TPG.png", showText: true, sizeClass: "h-11 sm:h-13" },
    ],
  },
];

const HORIZON_POINTS = [
  {
    title: "Stronger Chapters",
    desc: "Cultivating autonomous student leadership teams across university campuses.",
    icon: Users2,
  },
  {
    title: "Repeatable Workflows",
    desc: "Documenting open-source development SOPs that outlive any single cohort.",
    icon: Boxes,
  },
  {
    title: "More Student Projects",
    desc: "Expanding greenlight pipelines from raw prototypes to verified public builds.",
    icon: Gamepad2,
  },
  {
    title: "Cross-University Collabs",
    desc: "Building inter-collegiate game jams, co-productions, and shared showcases.",
    icon: Layers,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const gentleItemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: smoothCinemaEase,
    },
  },
};

export default function ArkSection() {
  const { playHoverTick } = useSoundEffects();

  return (
    <section
      id="ark"
      className="relative w-full overflow-hidden bg-transparent text-white py-32 sm:py-40 select-none"
    >
      {/* Ambient Luminescent Fields */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full bg-gradient-to-r from-[#9B8AFB]/10 via-[#43C6C5]/5 to-transparent blur-[180px] z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-[600px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[160px] z-0" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 relative z-10 space-y-32">
        
        {/* 01: IDENTITY & HERO GLYPH LOGO */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: smoothCinemaEase }}
            className="relative flex items-center justify-center group"
          >
            <div className="absolute inset-0 rounded-full bg-[#43C6C5]/20 blur-3xl group-hover:bg-[#9B8AFB]/30 transition-colors duration-700" />
            
            <div className="relative size-28 sm:size-32 rounded-3xl border border-[#43C6C5]/40 bg-gradient-to-b from-[#151928] via-[#0E111C] to-[#0A0B10] p-4 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(67,198,197,0.2)] group-hover:border-[#9B8AFB]/60 transition-all duration-500">
              <div className="relative size-16 sm:size-20">
                <Image
                  src="/cyan-glyph.svg"
                  alt="ARK Official Glyph"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_20px_rgba(67,198,197,0.5)]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            <motion.div
              variants={gentleItemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono tracking-widest text-[#9B8AFB] uppercase"
            >
              <Sparkles className="size-3 text-[#43C6C5]" />
              <span>Founder &bull; Community Builder</span>
            </motion.div>

            <motion.h2
              variants={gentleItemVariants}
              className="font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight"
            >
              Building the environment <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                where builders grow.
              </span>
            </motion.h2>

            <motion.p
              variants={gentleItemVariants}
              className="font-[family-name:var(--font-inter)] text-sm sm:text-base lg:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed"
            >
              A student-led game development community creating opportunities for people to learn, collaborate, and turn ideas into playable experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: smoothCinemaEase }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#ark-evidence"
              onMouseEnter={() => playHoverTick("far")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <span>Explore What We&apos;ve Built</span>
              <ArrowUpRight className="size-3.5 text-zinc-400" />
            </a>

            <a
              href="https://www.facebook.com/ark.academitech2025"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playHoverTick("far")}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#4A2C87] hover:bg-[#5C37A6] text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-[0_0_25px_rgba(74,44,135,0.45)] hover:shadow-[0_0_35px_rgba(155,138,251,0.5)] hover:scale-[1.02] cursor-pointer"
            >
              <span>Connect on Facebook</span>
              <ExternalLink className="size-3.5" />
            </a>
          </motion.div>
        </div>

        {/* 02: MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: smoothCinemaEase }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-8 sm:p-12 overflow-hidden flex flex-col justify-between"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[#9B8AFB]/10 blur-3xl" />
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-[#9B8AFB] uppercase">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                Sustain the talent.
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                Help aspiring game developers move beyond isolated tutorials by creating opportunities to learn through practice, collaborate in teams, follow development workflows, and turn their ideas into playable games.
              </p>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="size-1.5 rounded-full bg-[#9B8AFB]" />
              <span>Active operational objective across all cohorts</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, delay: 0.15, ease: smoothCinemaEase }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-8 sm:p-12 overflow-hidden flex flex-col justify-between"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[#43C6C5]/10 blur-3xl" />
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-[#43C6C5] uppercase">
                Our Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                A connected ecosystem for Philippine game dev.
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                Build toward a sustainable network of student developers across universities, where talent can be discovered, cultivated, supported, and connected to opportunities in the wider game industry.
              </p>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="size-1.5 rounded-full bg-[#43C6C5]" />
              <span>Future-facing ambition guiding our chapter growth</span>
            </div>
          </motion.div>
        </div>

        {/* 03: WHAT ARK HAS BUILT (HYBRID ZERO-CLICK ASYMMETRIC EVIDENCE GRID) */}
        <div id="ark-evidence" className="space-y-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">
                Evidence &bull; Not Just Claims
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-manrope)] mt-1">
                What ARK Has Built
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
              A comprehensive view of playable software, community game jams, engineering workflows, and industry bridges.
            </p>
          </div>

          {/* Integrated 4-Track Hybrid Grid: No Click Required */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Games & Development (Flagship 2-Column Span) */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: smoothCinemaEase }}
              className="lg:col-span-2 rounded-3xl border border-white/15 bg-gradient-to-b from-[#18192A] via-[#10111A] to-[#0A0B10] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#8B5CF6]/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-[#9B8AFB]/15 blur-3xl group-hover:bg-[#9B8AFB]/25 transition-colors" />

              <div className="space-y-5 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[#9B8AFB]">
                      <Gamepad2 className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        PROJECTS &bull; PRODUCTION
                      </span>
                      <h4 className="text-xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                        Games &amp; Development
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#9B8AFB]/40 bg-[#9B8AFB]/10 text-[#9B8AFB] font-semibold">
                    PGDX Indie Stars 2026 Selection
                  </span>
                </div>

                <div className="space-y-3">
                  <h5 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                    Code White &amp; Autonomous Prototyping
                  </h5>
                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                    Our studio teams build playable systems ranging from psychological survival horror to tactical game logic. <span className="text-white font-medium">Code White: The Observer</span> represents our flagship multi-disciplinary title exhibited to the national game dev community, accompanied by technical prototypes like <span className="text-white font-medium">Bangungot</span> and <span className="text-white font-medium">Checkmate</span>.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {["Code White: The Observer", "Bangungot", "Checkmate"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  <span>View Project Showcase</span>
                  <ArrowUpRight className="size-3.5 text-[#9B8AFB]" />
                </a>
              </div>
            </motion.div>

            {/* Card 2: Game Jams & Events */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.1, ease: smoothCinemaEase }}
              className="rounded-3xl border border-white/10 bg-[#12131D]/80 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#43C6C5]/50 transition-all duration-500"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[#43C6C5]">
                    <Trophy className="size-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    COMMUNITY ACTION
                  </span>
                </div>

                <h4 className="text-xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                  Game Jams &amp; Events
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                  Organized and co-facilitated internal jams like the CCIS Week Game Jam, while representing student teams in national hackathons and developer summits.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["CCIS Week Jam", "DEVCON Game On!", "DOST PowerUp", "PBW Booth"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs font-mono text-zinc-400 relative z-10">
                <ShieldCheck className="size-3.5 text-[#43C6C5]" />
                <span>Jurying, sprint logistics, and live exhibitions</span>
              </div>
            </motion.div>

            {/* Card 3: Development Pathways */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.2, ease: smoothCinemaEase }}
              className="rounded-3xl border border-white/10 bg-[#12131D]/80 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#C4B5FD]/50 transition-all duration-500"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[#C4B5FD]">
                    <GitBranch className="size-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    INFRASTRUCTURE
                  </span>
                </div>

                <h4 className="text-xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                  Development Pathways
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                  Created reproducible frameworks for member onboarding, branch-review protocols, task management, and multi-department production pipelines.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Onboarding SOPs", "Git Workflows", "Task Matrices", "Peer Reviews"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs font-mono text-zinc-400 relative z-10">
                <Terminal className="size-3.5 text-[#C4B5FD]" />
                <span>Repeatable builder onboarding architecture</span>
              </div>
            </motion.div>

            {/* Card 4: Ecosystem Connections (2-Column Span) */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.3, ease: smoothCinemaEase }}
              className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#12131D]/80 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#8B5CF6]/50 transition-all duration-500"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200">
                      <Network className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        ALLIANCES
                      </span>
                      <h4 className="text-xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                        Ecosystem Connections
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#9B8AFB]">
                    Active Partnerships
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                  Student developers cannot thrive in isolation. We link ARK members to real-world circuits: community hackathon series with Sage Dynamics and Vantis PH, collegiate builder alliances with AWS Cloud Club TUP, cloud training via DataCamp Donates, and game showcases with PGDX.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["HackManila Series", "AWS Builder Communities", "YGG Network", "DataCamp Scholarships", "Workflow PH Network"].map((t) => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-zinc-200 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10">
                <span>Multi-organizational collaboration network</span>
                <span className="text-[#9B8AFB]">Direct Community Pipeline</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 04: COMMUNITY REACH (ANIMATED METRICS & TIERED LOGO MATRIX) */}
        <div className="pt-8 border-t border-white/10 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: smoothCinemaEase }}
              className="space-y-4"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-[#9B8AFB]">
                Defensible Scale &bull; Verified 2026
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                Community &amp; Reach
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)] max-w-lg">
                ARK has grown organically from a local game development initiative into an active inter-collegiate student body. We prioritize genuine collaboration over inflated vanity metrics.
              </p>
            </motion.div>

            {/* Scale Counters with Floating Motion */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, ease: smoothCinemaEase }}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center space-y-2 relative overflow-hidden group hover:border-[#8B5CF6]/50 transition-colors duration-300"
              >
                <div className="absolute top-0 right-0 size-20 bg-[#9B8AFB]/10 blur-xl pointer-events-none" />
                <span className="text-4xl sm:text-5xl font-black text-[#9B8AFB] font-[family-name:var(--font-bebas)] tracking-tight">
                  150+
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Community Members
                </p>
                <p className="text-[11px] text-zinc-500 font-mono">
                  Verified student creators and active builders
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, delay: 0.15, ease: smoothCinemaEase }}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center space-y-2 relative overflow-hidden group hover:border-[#43C6C5]/50 transition-colors duration-300"
              >
                <div className="absolute top-0 right-0 size-20 bg-[#43C6C5]/10 blur-xl pointer-events-none" />
                <span className="text-4xl sm:text-5xl font-black text-[#43C6C5] font-[family-name:var(--font-bebas)] tracking-tight">
                  STUDENT-LED
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Built Through Collaboration
                </p>
                <p className="text-[11px] text-zinc-500 font-mono">
                  Autonomous student workflows and leadership
                </p>
              </motion.div>
            </div>
          </div>

          {/* Institutional Tiered Partner Logos */}
          <div className="space-y-12 pt-10 border-t border-white/10">
            {PARTNER_TIERS.map((tier) => (
              <div key={tier.categoryTitle} className="space-y-6">
                <div className="text-center">
                  <span className="text-xs font-mono tracking-[0.25em] text-[#9B8AFB] uppercase font-semibold">
                    &lt; {tier.categoryTitle} &gt;
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 px-4 py-6 rounded-3xl border border-white/5 bg-[#12131C]/40 backdrop-blur-sm">
                  {tier.logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="group/item flex items-center gap-3.5 select-none transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        title={logo.name}
                        className={`w-auto object-contain rounded-sm grayscale contrast-125 opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300 ${
                          logo.sizeClass || "h-10 sm:h-12 max-w-[170px]"
                        }`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      {logo.showText && (
                        <span className="text-xs sm:text-sm font-medium tracking-wide text-zinc-400 group-hover/item:text-white transition-colors duration-200 whitespace-nowrap">
                          {logo.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 05: THE NEXT CHAPTER (ANIMATED HORIZON POINTS) */}
        <div className="pt-8 border-t border-white/10 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#9B8AFB]">
              The Next Chapter
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
              From a Student Community to a Connected Ecosystem
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-[family-name:var(--font-inter)]">
              ARK&apos;s next challenge is to make its foundations more sustainable: develop stronger chapter leadership, establish repeatable ways of working, support more student-led projects, and create pathways for collaboration across universities.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {HORIZON_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <motion.div
                  key={pt.title}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.85, ease: smoothCinemaEase },
                    },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent space-y-3 group hover:border-[#8B5CF6]/40 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-4 text-[#9B8AFB] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-mono text-zinc-600">
                      0{i + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed font-[family-name:var(--font-inter)]">
                    {pt.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 06: CALL TO ACTION BANNER */}
        <div className="pt-8 border-t border-white/10">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#18192A] via-[#10111A] to-[#0A0B10] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                Build With ARK
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-light font-[family-name:var(--font-inter)]">
                Join our game development sprints, collaborate on active builds, or co-host an initiative.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="#projects"
                onMouseEnter={() => playHoverTick("far")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-black/50 hover:bg-white/10 text-white text-xs font-medium transition-all duration-300 cursor-pointer"
              >
                <span>View Shipped Games</span>
                <ArrowUpRight className="size-3.5 text-zinc-400" />
              </a>

              <a
                href="https://www.facebook.com/ark.academitech2025"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playHoverTick("far")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A2C87] hover:bg-[#5C37A6] text-white text-xs font-medium transition-all duration-300 shadow-[0_0_20px_rgba(74,44,135,0.45)] hover:shadow-[0_0_30px_rgba(155,138,251,0.5)] cursor-pointer"
              >
                <span>Connect on Facebook</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}