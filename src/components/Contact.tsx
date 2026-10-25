"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Copy, Check, ArrowUpRight, Send, CheckCircle2, Radio, Terminal, Sparkles } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const INQUIRY_TYPES = [
  { label: "Software Architecture", tag: "SYS_ARCH" },
  { label: "Game Systems Dev", tag: "GAME_DEV" },
  { label: "Talent Incubation", tag: "ARK_ECO" },
  { label: "General Inquiry", tag: "DIRECT" },
];

const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState(0);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const radarRotate = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const radarPitch = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const email = "melcarl.chacon@gmail.com";

  const handleCopy = () => {
    playSelectPing(1.4);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    playSelectPing(1.2);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      playSelectPing(1.6);
      setTimeout(() => {
        setIsSent(false);
        setFormState({ name: "", email: "", message: "" });
      }, 4000);
    }, 1200);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/melcarl-chacon/",
      handle: "melcarl-chacon",
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/akumahonoyami",
      handle: "akumahonoyami",
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/melchacon",
      handle: "melchacon",
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="contact"
      className="relative w-full overflow-hidden bg-transparent py-32 sm:py-40 text-white select-none"
    >
      {/* Background Reactive Radar Ring Mesh */}
      <motion.div
        style={{ rotate: radarRotate, y: radarPitch }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35"
      >
        <div className="absolute w-[800px] h-[800px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[580px] h-[580px] rounded-full border border-dashed border-[#8B5CF6]/15" />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5" />
        <div className="absolute w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-[#43C6C5]/20 to-transparent" />
        <div className="absolute h-full max-h-[800px] w-px bg-gradient-to-b from-transparent via-[#8B5CF6]/20 to-transparent" />
      </motion.div>

      {/* Ambient Luminescence */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#8B5CF6]/10 blur-[180px] z-0" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[350px] rounded-full bg-[#43C6C5]/10 blur-[160px] z-0" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Animated Subheader & Telemetry Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothCinemaEase }}
            className="flex items-center gap-2"
          >
            <span className="size-1.5 rounded-full bg-[#43C6C5] shadow-[0_0_8px_#43C6C5]" />
            <p className="text-xs uppercase font-medium tracking-[0.25em] text-[#9B8AFB] font-[family-name:var(--font-inter)]">
              Transmission Hub &bull; 06
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: smoothCinemaEase }}
            className="flex items-center gap-2 text-[11px] font-mono text-zinc-500"
          >
            <Radio className="size-3 text-[#43C6C5] animate-pulse" />
            <span className="text-zinc-400">SIGNAL_ACTIVE</span>
            <span className="text-zinc-700">/</span>
            <span>MANILA, PH</span>
          </motion.div>
        </div>

        {/* Primary Callout */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: smoothCinemaEase, delay: 0.1 }}
          className="mt-6 max-w-4xl"
        >
          <h2 className="font-[family-name:var(--font-manrope)] text-4xl sm:text-7xl font-light tracking-tight text-white uppercase leading-[1.05]">
            Let&apos;s build what <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              comes next.
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base font-[family-name:var(--font-inter)] text-zinc-400 max-w-xl font-light leading-relaxed">
            Open for technical architecture consultations, enterprise software engineering roles, independent game systems development, and strategic student ecosystem initiatives.
          </p>
        </motion.div>

        {/* Transmission Layout Grid */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Interactive Dispatch Form (Left - 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: smoothCinemaEase, delay: 0.15 }}
            className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-b from-[#141522]/85 via-[#0E1018]/90 to-[#0A0B10]/95 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Top Border Accent Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />

            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Terminal className="size-4 text-[#9B8AFB]" />
                <h3 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-manrope)] text-white uppercase tracking-tight">
                  Direct Dispatch Terminal
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#43C6C5] animate-ping" />
                <span className="text-[10px] font-mono text-[#43C6C5] uppercase">Ready</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Inquiry Type Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                    Target Pipeline Scope
                  </label>
                  <span className="text-[10px] font-mono text-[#9B8AFB]">
                    {INQUIRY_TYPES[selectedType].tag}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TYPES.map((type, idx) => {
                    const isSelected = selectedType === idx;
                    return (
                      <button
                        type="button"
                        key={type.label}
                        onClick={() => {
                          playSelectPing(1 + idx * 0.08);
                          setSelectedType(idx);
                        }}
                        onMouseEnter={() => playHoverTick("far")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-[family-name:var(--font-inter)] transition-all duration-300 cursor-pointer border flex items-center gap-1.5 ${
                          isSelected
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                            : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <span className={`size-1 rounded-full ${isSelected ? "bg-[#43C6C5]" : "bg-zinc-600"}`} />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                    Ident / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => playHoverTick("near")}
                    placeholder="Carl / Collaborator"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all font-[family-name:var(--font-inter)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                    Return Frequency / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => playHoverTick("near")}
                    placeholder="contact@studio.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all font-[family-name:var(--font-inter)]"
                  />
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium font-[family-name:var(--font-inter)]">
                  Scope &amp; Architecture Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => playHoverTick("near")}
                  placeholder="Outline the project scope, technical timeline, or collaboration proposal..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all font-[family-name:var(--font-inter)] resize-none"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting || isSent}
                onMouseEnter={() => playHoverTick("mid")}
                className={`relative w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSent
                    ? "bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.45)]"
                    : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.55)] disabled:opacity-50"
                }`}
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="size-4 text-white" />
                    <span>Transmission Acknowledged</span>
                  </>
                ) : isSubmitting ? (
                  <span className="animate-pulse flex items-center gap-2">
                    <Sparkles className="size-3.5 animate-spin" /> Transmitting Signal...
                  </span>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Transmit Dispatch</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Electronic Endpoints & Coordinates (Right - 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: smoothCinemaEase, delay: 0.25 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Mail Endpoint */}
            <div className="space-y-3 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <span className="text-[11px] uppercase tracking-widest text-[#9B8AFB] font-medium font-[family-name:var(--font-inter)]">
                Primary Direct Relay
              </span>

              <div className="flex flex-col gap-3 pt-1">
                <a
                  href={`mailto:${email}`}
                  onMouseEnter={() => playHoverTick("near")}
                  className="group flex items-center gap-2.5 font-[family-name:var(--font-manrope)] text-lg sm:text-2xl font-bold text-white hover:text-[#9B8AFB] transition-colors"
                >
                  <span className="break-all">{email}</span>
                  <ArrowUpRight className="size-4 text-[#8B5CF6] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  onMouseEnter={() => playHoverTick("far")}
                  aria-label="Copy email address"
                  className="self-start flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#8B5CF6]/40 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer font-[family-name:var(--font-inter)]"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-[#43C6C5]" />
                      <span className="text-[#43C6C5] font-medium">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 text-zinc-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-zinc-500 font-light font-[family-name:var(--font-inter)] pt-1">
                Typical response window: 24 to 48 standard business hours.
              </p>
            </div>

            {/* Social Signal Vectors */}
            <div className="space-y-3 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <span className="text-[11px] uppercase tracking-widest text-[#9B8AFB] font-medium font-[family-name:var(--font-inter)]">
                Network Coordinates
              </span>

              <div className="divide-y divide-white/5 border-y border-white/5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHoverTick("far")}
                    className="group py-3.5 flex items-center justify-between text-xs font-[family-name:var(--font-inter)] transition-colors hover:bg-white/[0.015] px-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white transition-colors">
                      <span className="text-zinc-500 group-hover:text-[#9B8AFB] transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <span>{item.handle}</span>
                      <ArrowUpRight className="size-3 text-zinc-600 group-hover:text-[#8B5CF6] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Colophon & Status Baseline */}
        <div className="mt-28 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-[family-name:var(--font-inter)] text-zinc-500 font-light">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400">All Networks Nominal &bull; Open for Strategic Deployments</span>
          </div>

          <div className="text-zinc-600 text-center sm:text-right font-mono text-[11px]">
            <span>Next.js 15 &bull; Framer Motion &bull; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </section>
  );
}