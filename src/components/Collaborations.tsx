"use client";

import React from "react";

interface LogoItem {
  name: string;
  src: string;
  showText: boolean;
  /** Custom height multiplier class for icons needing extra optical boost */
  sizeClass?: string;
}

const LOGOS: LogoItem[] = [
  // --- Pure Logos (No accompanying text needed) ---
  { name: "DataCamp Donates", src: "/logos/DC_Donates_logo_inverted.png", showText: false, sizeClass: "h-9 sm:h-10" },
  { name: "PGDX", src: "/logos/pgdx.png", showText: false, sizeClass: "h-15 sm:h-19 max-w-[250px]" },
  { name: "YGG Play Summit", src: "/logos/ygg.png", showText: false, sizeClass: "h-8 sm:h-9" },
  { name: "Sage Dynamics", src: "/logos/sagedynamics.png", showText: false, sizeClass: "h-8 sm:h-9" },
  { name: "Vantis PH", src: "/logos/vantis.png", showText: false, sizeClass: "h-7 sm:h-8" },
  { name: "HackManila", src: "/logos/hackmanila.webp", showText: false, sizeClass: "h-7 sm:h-8" },

  // --- Mark + Label (Icon accompanied by crisp text) ---
  { name: "Workflow PH", src: "/logos/WORKFLOW PH - LOGO.png", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "AWS Cloud Club TUP", src: "/logos/TUP Logo.png", showText: true, sizeClass: "h-9 sm:h-10" },
  { name: "ICPEP.se PUP Manila", src: "/logos/ICPEP.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "DEVCON Manila", src: "/logos/DevCon_Manila.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "DOST-NCR", src: "/logos/dost.png", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "GDSC PUP", src: "/logos/gdgpup_logo.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "AWS Cloud Club PUP", src: "/logos/aws.png", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "Philippine Blockchain Week", src: "/logos/PBW.png", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "IoT Philippines", src: "/logos/Iot.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "Unleash PH", src: "/logos/UNLEASH.png", showText: true, sizeClass: "h-7 sm:h-8" },
  { name: "Polytechnic University of the Philippines - Manila", src: "/logos/PUPLogo.png", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "Tech Career Fest", src: "/logos/techcareerfest.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "GadgetsMagazine", src: "/logos/gadgetsmagazine.jpg", showText: true, sizeClass: "h-8 sm:h-9" },
  { name: "Arduino Day PH", src: "/logos/arduino.png", showText: true, sizeClass: "h-10 sm:h-11 max-w-[56px]" },
  { name: "The Programmer's Guild", src: "/logos/TPG.png", showText: true, sizeClass: "h-11 sm:h-13" },
];

export default function Collaborations() {
  return (
    <section className="relative w-full border-y border-white/[0.06] bg-transparent py-8 z-20 overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 sm:flex-row sm:px-12 lg:px-20">
        
        {/* Left Fixed Label */}
        <p className="shrink-0 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 sm:w-[140px] sm:text-left font-[family-name:var(--font-inter)] leading-relaxed">
          Collaborated &amp; <br className="hidden sm:block" />
          Showcased with
        </p>

        {/* Seamless Infinite Marquee */}
        <div className="group relative w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_45s_linear_infinite] items-center group-hover:[animation-play-state:paused]">
            {[0, 1].map((copyIndex) => (
              <ul
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
              >
                {LOGOS.map((logo, i) => (
                  <li
                    key={`${copyIndex}-${i}`}
                    className="group/item shrink-0 flex items-center gap-3.5 select-none cursor-pointer"
                  >
                    {/* Logo Image */}
                    <img
                      src={logo.src}
                      alt={logo.name}
                      title={logo.name}
                      className={`w-auto object-contain rounded-sm grayscale contrast-125 opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-300 ${
                        logo.sizeClass || "h-8 sm:h-9 max-w-[130px]"
                      }`}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Companion Text */}
                    {logo.showText && (
                      <span className="text-xs sm:text-sm font-medium tracking-wide text-zinc-400 group-hover/item:text-white transition-colors duration-200 whitespace-nowrap">
                        {logo.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Right Pinned Co-Branding */}
        <div className="hidden shrink-0 text-right leading-tight text-zinc-300 lg:block border-l border-white/[0.08] pl-6">
          <p className="font-semibold text-white tracking-wide text-xs">ARK Studio</p>
          <p className="text-[#8B5CF6] font-medium text-[10px] my-0.5">×</p>
          <p className="text-zinc-400 text-[11px] tracking-wider">PGDX 2026</p>
        </div>

      </div>
    </section>
  );
}