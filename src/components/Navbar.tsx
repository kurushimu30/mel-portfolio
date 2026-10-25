"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Track active scroll loop so clicks cancel any in-flight animation immediately
let activeScrollAnimId: number | null = null;

function smoothScrollToElement(targetId: string, baseDuration: number = 750) {
  if (typeof window === "undefined") return;

  const cleanId = targetId.replace("#", "");
  const targetElement = document.getElementById(cleanId);
  if (!targetElement) return;

  if (activeScrollAnimId !== null) {
    cancelAnimationFrame(activeScrollAnimId);
    activeScrollAnimId = null;
  }

  const startY = window.scrollY;
  const rect = targetElement.getBoundingClientRect();
  const targetY = startY + rect.top;
  const diff = targetY - startY;

  if (Math.abs(diff) < 4) return;

  // Optimized clamp range (keeps animations snappy and limits GPU raster churn)
  const distance = Math.abs(diff);
  const duration = Math.min(Math.max(baseDuration, distance * 0.1), 950);

  let startTime: number | null = null;
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    // Single unified scroll mutation (prevents double layout reflows)
    window.scrollTo({ top: startY + diff * ease, behavior: "instant" });

    if (progress < 1) {
      activeScrollAnimId = requestAnimationFrame(step);
    } else {
      activeScrollAnimId = null;
    }
  }

  activeScrollAnimId = requestAnimationFrame(step);
}

function smoothScrollToTop(duration: number = 700) {
  if (typeof window === "undefined") return;

  if (activeScrollAnimId !== null) {
    cancelAnimationFrame(activeScrollAnimId);
    activeScrollAnimId = null;
  }

  const startY = window.scrollY;
  if (startY < 4) return;

  let startTime: number | null = null;
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    window.scrollTo({ top: startY * (1 - ease), behavior: "instant" });

    if (progress < 1) {
      activeScrollAnimId = requestAnimationFrame(step);
    } else {
      activeScrollAnimId = null;
    }
  }

  activeScrollAnimId = requestAnimationFrame(step);
}

export default function Navbar() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Throttled scroll state mutation using requestAnimationFrame
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const isOver = window.scrollY > 30;
          setScrolled((prev) => (prev !== isOver ? isOver : prev));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (activeScrollAnimId !== null) cancelAnimationFrame(activeScrollAnimId);
    };
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "ARK", href: "#ark" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Recognition", href: "#recognition" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    pingPitch: number = 1.1
  ) => {
    e.preventDefault();
    playSelectPing(pingPitch);

    if (href.startsWith("#")) {
      smoothScrollToElement(href);
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", href);
      }
    } else {
      smoothScrollToTop();
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out transform-gpu ${
        scrolled ? "py-3 sm:py-4" : "py-6 sm:py-8"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/", 1.2)}
          onMouseEnter={() => playHoverTick("far")}
          className="flex items-center gap-2.5 group select-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <span className="size-2 rounded-full bg-[#9B8AFB] shadow-[0_0_8px_#9B8AFB]" />
            <span className="absolute size-3.5 rounded-full border border-[#9B8AFB]/40 animate-ping" />
          </div>
          <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-white">
            MEL CARL
          </span>
        </Link>

        {/* Floating Dynamic Island Capsule (Desktop) */}
        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 transform-gpu ${
            scrolled
              ? "bg-[#0E1018]/90 border-white/15 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/[0.04] border-white/10 backdrop-blur-sm"
          }`}
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, 1.1)}
              onMouseEnter={() => {
                playHoverTick("mid");
                setHoveredIndex(idx);
              }}
              className="relative px-4 py-1.5 text-xs font-[family-name:var(--font-inter)] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 select-none cursor-pointer"
            >
              <span className="relative z-10">{link.name}</span>

              {/* Sliding Liquid Pill Accent */}
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[#9B8AFB]/20 border border-[#9B8AFB]/40 shadow-[0_0_12px_rgba(155,138,251,0.2)]"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action: Interactive Résumé Pill */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => playHoverTick("near")}
            onClick={() => playSelectPing(1.3)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#9B8AFB]/40 bg-[#9B8AFB]/10 hover:bg-[#9B8AFB]/20 text-xs font-[family-name:var(--font-inter)] font-medium text-[#C4B5FD] hover:text-white transition-all shadow-[0_0_15px_rgba(155,138,251,0.15)] hover:shadow-[0_0_20px_rgba(155,138,251,0.3)] cursor-pointer"
          >
            <Download className="size-3.5 text-[#9B8AFB]" />
            <span>Résumé</span>
          </motion.a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            playSelectPing(mobileMenuOpen ? 0.9 : 1.2);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-6 mt-3 rounded-3xl border border-white/15 bg-[#0D0E15]/95 backdrop-blur-lg p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col gap-3 font-[family-name:var(--font-inter)] transform-gpu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, 1.1)}
                className="py-2 px-3 text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#9B8AFB] hover:bg-white/[0.02] rounded-xl transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-full border border-[#9B8AFB]/40 bg-[#9B8AFB]/15 text-xs font-medium text-white shadow-[0_0_15px_rgba(155,138,251,0.2)]"
            >
              <Download className="size-3.5 text-[#9B8AFB]" />
              <span>Download Résumé</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}