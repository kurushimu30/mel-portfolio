"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  previewUrl: string;
  liveUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "code-white",
    title: "Code White: The Observer",
    subtitle: "Production Management & Exhibition Pipeline",
    period: "2025 — Present",
    description:
      "Led end-to-end production coordination, exhibition logistics, and trailer creation for ARK's horror puzzle title. Managed game build deliverables and promotional media for its official selection at PGDX 2026 Indie Game Stars.",
    previewUrl: "/projects/Code_White_Poster.jpg",
    liveUrl: "https://arkorg.itch.io/code-white",
  },
  {
    id: "3d-combat-system",
    title: "3D Combat System",
    subtitle: "Gameplay Programming & Combo Mechanics",
    period: "2025 — Present",
    description:
      "Engineered character animation blending trees, hit-box collision registration, responsive combo strings, and kinetic poise states for third-person action encounters in Unity.",
    previewUrl: "/projects/3DCombatSystem.jpg",
  },
  {
    id: "thynkora-ai",
    title: "Thynkora AI",
    subtitle: "Autonomous On-Chain Intelligence Architecture",
    period: "2025",
    description:
      "Designed decentralized intelligence routines and low-latency validation matrices across distributed canister nodes. Achieved Top 15 national finalist placement in the ICP World Computer Hacker League.",
    previewUrl: "/projects/thynkora.jpg",
    liveUrl: "https://thynkora.ai",
  },
  {
    id: "accreditation-portal",
    title: "PUP Institutional Accreditation Portal",
    subtitle: "Project Management & Backend Development",
    period: "2026 — Present",
    description:
      "Coordinated cross-functional engineering workflows and programmed core backend endpoints for the Department of Information Technology's institutional compliance audit platform.",
    previewUrl: "/projects/PUPportal.jpg",
    liveUrl: "https://dit-accred.vercel.app/",
  },
  {
    id: "ark-optimization-model",
    title: "Parametric Resource Capacity Optimization Model",
    subtitle: "Operational Research & Ecosystem Infrastructure",
    period: "2025 — 2026",
    description:
      "Formulated mathematical resource optimization models for ARK Philippines, preventing founder resource starvation and timeline slippages across concurrent multi-sector game pipelines and community onboarding tracks.",
    previewUrl: "/projects/QMMS.jpg",
  },
  {
    id: "thea",
    title: "Thermodynamics Adventure (THEA)",
    subtitle: "Interactive Physics Simulation Game",
    period: "2024",
    description:
      "Developed an exploratory game centered on simulating physics principles and the laws of thermodynamics, translating thermodynamic equations into playable environmental puzzles and visual feedback loops.",
    previewUrl: "/projects/THEA.jpg",
    liveUrl: "https://ark.dev",
  },
  {
    id: "interactive-portfolio",
    title: "Interactive Personal Portfolio Dossier",
    subtitle: "High-Performance Crimson Web Dossier",
    period: "2026",
    description:
      "Built a high-contrast crimson digital dossier with custom timeline navigation and interactive components, serving as the official verification platform submitted for the StellarPH Top 100 Under 30 national cohort.",
    previewUrl: "/projects/Eportfolio.jpg",
    liveUrl: "https://melcarl-chacon.vercel.app/",
  },
];

const cinemaTransit = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasDealt, setHasDealt] = useState(false);
  const total = PROJECTS.length;

  const paginate = useCallback(
    (newDirection: number) => {
      const nextIndex = (activeIndex + newDirection + total) % total;
      playSelectPing(1 + (nextIndex / total) * 0.4);
      setActiveIndex(nextIndex);
    },
    [activeIndex, total, playSelectPing]
  );

  const selectDirect = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex) return;
      playSelectPing(1 + (targetIndex / total) * 0.4);
      setActiveIndex(targetIndex);
    },
    [activeIndex, total, playSelectPing]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-transparent py-28 sm:py-36 text-white"
    >
      {/* Background Volumetric Radiance */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] rounded-full bg-[#8B5CF6]/10 blur-[180px]" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
              <p className="text-xs uppercase font-medium tracking-[0.25em] text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                Selected Works
              </p>
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-4xl sm:text-6xl font-light tracking-tight text-white uppercase">
              Engineered <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Deployments.
              </span>
            </h2>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-wider text-zinc-500 font-[family-name:var(--font-inter)]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(-1)}
                onMouseEnter={() => playHoverTick("far")}
                aria-label="Previous project"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#8B5CF6]/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                onMouseEnter={() => playHoverTick("far")}
                aria-label="Next project"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#8B5CF6]/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tarot Deck Deal & Spread Horizontal Carousel */}
        <motion.div
          onViewportEnter={() => {
            const timer = setTimeout(() => setHasDealt(true), 750);
            return () => clearTimeout(timer);
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-16 sm:mt-24 h-[440px] sm:h-[500px] flex items-center justify-center overflow-visible select-none"
        >
          {PROJECTS.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isImmediateSibling = Math.abs(offset) === 1;
            const xOffset = offset * 420;

            const stackedX = (index - Math.floor(total / 2)) * 6;
            const stackedY = (index - Math.floor(total / 2)) * 3;
            const stackedRotate = (index - Math.floor(total / 2)) * 4.5;

            return (
              <motion.div
                key={item.id}
                onClick={() => hasDealt && selectDirect(index)}
                onMouseEnter={() => {
                  if (hasDealt && !isCenter) playHoverTick("mid");
                }}
                initial={{
                  x: stackedX,
                  y: stackedY,
                  rotate: stackedRotate,
                  scale: 0.85,
                  opacity: 0,
                }}
                animate={
                  hasDealt
                    ? {
                        x: xOffset,
                        y: 0,
                        rotate: 0,
                        scale: isCenter ? 1 : 0.78,
                        opacity: isCenter ? 1 : isImmediateSibling ? 0.35 : 0.08,
                        zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                      }
                    : {
                        x: stackedX,
                        y: stackedY,
                        rotate: stackedRotate,
                        scale: 0.88,
                        opacity: 0.95,
                        zIndex: 10 + index,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: hasDealt ? 0 : index * 0.06,
                }}
                className={`absolute transform-gpu will-change-transform ${
                  hasDealt
                    ? isCenter
                      ? "pointer-events-auto cursor-pointer"
                      : "pointer-events-auto cursor-pointer hover:opacity-60"
                    : "pointer-events-none cursor-default"
                }`}
              >
                <motion.div
                  animate={
                    hasDealt && isCenter
                      ? { y: [0, -8, 0] }
                      : { y: 0 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className={`relative overflow-hidden rounded-3xl border transition-colors duration-500 bg-[#12131C] ${
                    hasDealt && isCenter
                      ? "border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(155,138,251,0.18)] w-[280px] sm:w-[380px] h-[360px] sm:h-[460px]"
                      : "border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-[260px] sm:w-[340px] h-[340px] sm:h-[420px]"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#181926] via-[#10111A] to-[#0A0B10]" />
                  <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                  {item.previewUrl && (
                    <img
                      src={item.previewUrl}
                      alt={item.title}
                      decoding="async"
                      className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  )}

                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
                    <span className="text-[11px] font-mono tracking-widest text-[#9B8AFB] bg-[#090A0F]/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 bg-[#090A0F]/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase">
                      ARK / PROJ
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9 pointer-events-none z-10">
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">
                      {item.period}
                    </p>
                    <h4 className="mt-1 font-[family-name:var(--font-manrope)] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0F]/90 via-[#090A0F]/30 to-white/[0.04]" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Active Project Information Dossier */}
        <div className="mt-14 max-w-2xl mx-auto text-center flex flex-col items-center min-h-[140px]">
          <AnimatePresence mode="wait">
            {hasDealt && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: cinemaTransit }}
                className="space-y-3"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs text-[#9B8AFB] font-medium font-[family-name:var(--font-inter)]">
                    {activeProject.period}
                  </span>
                  <span className="size-1 rounded-full bg-white/20" />
                  <span className="text-xs text-zinc-400 font-[family-name:var(--font-inter)]">
                    {activeProject.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-manrope)]">
                  {activeProject.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-light font-[family-name:var(--font-inter)] max-w-xl mx-auto">
                  {activeProject.description}
                </p>

                {activeProject.liveUrl && (
                  <div className="pt-2">
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playHoverTick("near")}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#9B8AFB] transition-colors font-[family-name:var(--font-inter)] group"
                    >
                      <span>Explore Production Build</span>
                      <ArrowUpRight className="size-3.5 text-[#8B5CF6] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}