"use client";

import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type Category =
  | "All"
  | "Programming"
  | "Frontend & Web"
  | "Game Development"
  | "Backend & Cloud"
  | "Creative"
  | "Platforms"
  | "Collaboration"
  | "Artificial Intelligence";

interface Tool {
  id: string;
  name: string;
  svgPath: string;
  viewBox?: string;
  badgeColor: string;
  bgColor: string;
  categories: Category[];
  angle: number; // Staggered angle (0 to 360)
  track: "outer" | "mid" | "inner";
  depth: "near" | "mid" | "far";
}

const CATEGORIES: Category[] = [
  "All",
  "Programming",
  "Frontend & Web",
  "Game Development",
  "Backend & Cloud",
  "Creative",
  "Platforms",
  "Collaboration",
  "Artificial Intelligence",
];

// Complete toolchain with standalone vectors (no square framing boxes)
const ALL_TOOLS: Tool[] = [
  // --- Outer Track (Rx: 820px, Ry: 180px) ---
  {
    id: "c",
    name: "C / C++",
    badgeColor: "#659AD2",
    bgColor: "#142033",
    categories: ["Programming"],
    angle: 180,
    track: "outer",
    depth: "far",
    svgPath: "M11.9 2C6.4 2 2 6.4 2 11.9s4.4 9.9 9.9 9.9c3.8 0 7.2-2.1 8.8-5.3l-3.3-1.9c-1 2-3.1 3.4-5.5 3.4-3.4 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1c2.4 0 4.5 1.4 5.5 3.4l3.3-1.9C19.1 4.1 15.7 2 11.9 2z",
  },
  {
    id: "html",
    name: "HTML5",
    badgeColor: "#E34F26",
    bgColor: "#331610",
    categories: ["Frontend & Web"],
    angle: 202,
    track: "outer",
    depth: "mid",
    svgPath: "M1.8 0l1.8 20.2L12 23l8.4-2.8L22.2 0H1.8zm16.4 6.3h-7.8l.2 2.5h7.4l-.8 8.4-5 1.4-5-1.4-.3-3.4h2.5l.2 1.6 2.6.7 2.6-.7.3-3.1H7.8L7 4.5h11.6l-.4 1.8z",
  },
  {
    id: "css",
    name: "CSS3",
    badgeColor: "#1572B6",
    bgColor: "#0D2238",
    categories: ["Frontend & Web"],
    angle: 168,
    track: "outer",
    depth: "near",
    svgPath: "M1.8 0l1.8 20.2L12 23l8.4-2.8L22.2 0H1.8zm16.3 6.3h-7.7l.2 2.5h7.3l-.8 8.4-5.1 1.4-5-1.4-.3-3.4h2.5l.2 1.6 2.6.7 2.6-.7.3-3.1H7.8L7 4.5h11.6l-.5 1.8z",
  },
  {
    id: "notion",
    name: "Notion",
    badgeColor: "#FFFFFF",
    bgColor: "#1F2026",
    categories: ["Collaboration", "Platforms"],
    angle: 225,
    track: "outer",
    depth: "mid",
    svgPath: "M4.5 3.5v17l15-2.2v-17l-15 2.2zm11.8 11.6l-2.4-.2-3.7-5.9v5.9h-1.8v-8.8l2.4.2 3.7 5.8v-5.8h1.8v8.8z",
  },
  {
    id: "csharp",
    name: "C#",
    badgeColor: "#A855F7",
    bgColor: "#2B1647",
    categories: ["Programming", "Game Development"],
    angle: 145,
    track: "outer",
    depth: "near",
    svgPath: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5h-2v-1.8h-1.5v-2H11v-1.4H9.5v-2H11V7.5h2v1.8h1.5v2H13v1.4h1.5v2H13v1.8z",
  },
  {
    id: "typescript",
    name: "TypeScript",
    badgeColor: "#60A5FA",
    bgColor: "#142542",
    categories: ["Programming", "Frontend & Web"],
    angle: 120,
    track: "outer",
    depth: "near",
    svgPath: "M1.5 8.5h9v2.5h-3.2v9H4.7v-9H1.5V8.5zm10.7 7.7c1.3 0 2.2-.6 2.8-1.5l2.2 1.4c-1.1 1.7-2.8 2.6-5 2.6-3.8 0-6.1-2.5-6.1-6s2.4-6.1 6.2-6.1c2.3 0 4 .9 5 2.5l-2.1 1.5c-.6-1-1.6-1.6-2.9-1.6-2.2 0-3.6 1.5-3.6 3.7 0 2.3 1.4 3.5 3.5 3.5z",
  },
  {
    id: "unreal",
    name: "Unreal",
    badgeColor: "#00E5FF",
    bgColor: "#0D2838",
    categories: ["Game Development"],
    angle: 80,
    track: "outer",
    depth: "far",
    svgPath: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 14.5c-.8.8-2 1.2-3.3 1.2-2.1 0-3.7-1.1-4.4-3.1L8 16c-.6-.7-.9-1.5-.9-2.5 0-1.2.4-2.2 1.1-3 .8-.8 1.9-1.3 3.3-1.3 1.4 0 2.5.5 3.3 1.3.8.9 1.2 2 1.2 3.4 0 1.5-.4 2.6-1 3.6z",
  },
  {
    id: "github",
    name: "GitHub",
    badgeColor: "#FFFFFF",
    bgColor: "#1C1D24",
    categories: ["Platforms", "Collaboration", "Backend & Cloud"],
    angle: 45,
    track: "outer",
    depth: "near",
    svgPath: "M12 2C6.47 2 2 6.48 2 12.02c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12.02 22 6.48 17.52 2 12 2z",
  },
  {
    id: "trello",
    name: "Trello",
    badgeColor: "#60A5FA",
    bgColor: "#0E2436",
    categories: ["Collaboration"],
    angle: 15,
    track: "outer",
    depth: "far",
    svgPath: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 4v8h3V7H7zm7 0v5h3V7h-3z",
  },
  {
    id: "aftereffects",
    name: "After Effects",
    badgeColor: "#E879F9",
    bgColor: "#33163D",
    categories: ["Creative"],
    angle: 350,
    track: "outer",
    depth: "mid",
    svgPath: "M6.8 17.5l1.2-3.5h4l1.2 3.5h2.8L11.5 5h-3L4 17.5h2.8zm3.2-9.5l1.4 4.2H8.6L10 8zM15 11h4v2h-4v-2zm0 4h4v2h-4v-2z",
  },
  {
    id: "premiere",
    name: "Premiere",
    badgeColor: "#A5B4FC",
    bgColor: "#1C1C3D",
    categories: ["Creative"],
    angle: 325,
    track: "outer",
    depth: "near",
    svgPath: "M6 5v14h3v-4.5h3.5c3 0 5-1.8 5-4.7s-2-4.8-5-4.8H6zm3 3h3.2c1.2 0 2 .7 2 1.8s-.8 1.8-2 1.8H9V8z",
  },
  {
    id: "canva",
    name: "Canva",
    badgeColor: "#2DD4BF",
    bgColor: "#0B2E33",
    categories: ["Creative"],
    angle: 300,
    track: "outer",
    depth: "far",
    svgPath: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.3 12.8c-1.2 1.3-2.8 1.8-4.5 1.8-3.1 0-5.2-1.9-5.2-5.4 0-3.3 2.3-5.5 5.6-5.5 1.6 0 3.1.6 4.1 1.7l-1.5 1.4c-.7-.7-1.6-1.1-2.6-1.1-2 0-3.4 1.4-3.4 3.5 0 2.2 1.3 3.5 3.3 3.5 1 0 1.8-.3 2.5-1l1.7 1.1z",
  },
  {
    id: "javascript",
    name: "JavaScript",
    badgeColor: "#FACC15",
    bgColor: "#332B0D",
    categories: ["Programming", "Frontend & Web"],
    angle: 270,
    track: "outer",
    depth: "mid",
    svgPath: "M6 8h2.8v8.4c0 1.5-.7 2.1-2 2.1-.8 0-1.5-.2-2-.5l.4-2.1c.3.2.7.3 1.1.3.4 0 .5-.2.5-.7V8zm8.5 7.8c.8.5 1.8.8 2.8.8 1.4 0 2.2-.6 2.2-1.6 0-1-.6-1.4-2.1-2l-.7-.3c-2.1-.8-3.4-1.9-3.4-3.8 0-2.1 1.6-3.7 4.2-3.7 1.3 0 2.4.3 3.2.8l-.8 1.9c-.7-.4-1.5-.7-2.4-.7-1.2 0-1.9.6-1.9 1.4 0 .9.6 1.3 2.2 2l.7.3c2.3.9 3.5 2 3.5 4 0 2.3-1.8 3.9-4.7 3.9-1.5 0-2.8-.4-3.8-1l1-2z",
  },
  {
    id: "vercel",
    name: "Vercel",
    badgeColor: "#FFFFFF",
    bgColor: "#16171E",
    categories: ["Platforms", "Backend & Cloud"],
    angle: 248,
    track: "outer",
    depth: "far",
    svgPath: "M12 2L2 20h20L12 2z",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    badgeColor: "#38BDF8",
    bgColor: "#10273D",
    categories: ["Creative"],
    angle: 130,
    track: "outer",
    depth: "near",
    svgPath: "M5.5 5v14h3v-4.5H13c3.2 0 5.5-2 5.5-4.8s-2.3-4.7-5.5-4.7H5.5zm3 3H12c1.4 0 2.3.8 2.3 1.8s-.9 1.7-2.3 1.7H8.5V8z",
  },

  // --- Mid Track (Rx: 560px, Ry: 125px) ---
  {
    id: "react",
    name: "React",
    badgeColor: "#61DAFB",
    bgColor: "#0D2633",
    categories: ["Frontend & Web"],
    angle: 195,
    track: "mid",
    depth: "near",
    svgPath: "M12 10.1c1 0 1.9.8 1.9 1.9s-.9 1.9-1.9 1.9-1.9-.8-1.9-1.9.9-1.9 1.9-1.9zm0-8.1c4.4 0 8 1.1 9.7 2.9 1.9 2 1.5 4.7-.8 7.4-1.3 1.5-3.1 2.9-5.1 3.9 1.7 1.8 2.8 3.8 2.8 5.7 0 2.8-2.6 4.1-6.6 4.1s-6.6-1.3-6.6-4.1c0-1.9 1.1-3.9 2.8-5.7-2-1-3.8-2.4-5.1-3.9-2.3-2.7-2.7-5.4-.8-7.4C5.9 3.1 9.5 2 12 2z",
  },
  {
    id: "nextjs",
    name: "Next.js",
    badgeColor: "#FFFFFF",
    bgColor: "#14151B",
    categories: ["Frontend & Web"],
    angle: 165,
    track: "mid",
    depth: "near",
    svgPath: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.7 14.5l-5.6-7.3v7.3H8.5V7.5h1.7l5.6 7.3V7.5h1.6v9H15.7z",
  },
  {
    id: "tailwind",
    name: "Tailwind",
    badgeColor: "#38BDF8",
    bgColor: "#0E2436",
    categories: ["Frontend & Web"],
    angle: 140,
    track: "mid",
    depth: "mid",
    svgPath: "M12 6c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.2-2 3.8-1.5 1 .3 1.7 1.1 2.5 1.9 1.3 1.3 2.7 2.6 5.7 2.6 3 0 4.5-1.5 4.5-4.5-1 1.5-2.2 2-3.8 1.5-1-.3-1.7-1.1-2.5-1.9C16.4 7.3 15 6 12 6zM6.5 12c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.2-2 3.8-1.5 1 .3 1.7 1.1 2.5 1.9 1.3 1.3 2.7 2.6 5.7 2.6 3 0 4.5-1.5 4.5-4.5-1 1.5-2.2 2-3.8 1.5-1-.3-1.7-1.1-2.5-1.9C10.9 13.3 9.5 12 6.5 12z",
  },
  {
    id: "figma",
    name: "Figma",
    badgeColor: "#C084FC",
    bgColor: "#2B1647",
    categories: ["Creative"],
    angle: 115,
    track: "mid",
    depth: "near",
    svgPath: "M8.5 2h7a3.5 3.5 0 010 7h-7a3.5 3.5 0 010-7zm0 7h7a3.5 3.5 0 010 7h-7a3.5 3.5 0 010-7zm0 7h7a3.5 3.5 0 010 7 3.5 3.5 0 01-3.5-3.5V16h-3.5zm-3.5-3.5a3.5 3.5 0 013.5-3.5V16H5a3.5 3.5 0 010-7z",
  },
  {
    id: "unity",
    name: "Unity",
    badgeColor: "#FFFFFF",
    bgColor: "#1F222E",
    categories: ["Game Development"],
    angle: 90,
    track: "mid",
    depth: "near",
    svgPath: "M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 3.3L5.8 8.9v6.2L12 18.7l6.2-3.6V8.9L12 5.3zm-1.8 6.7L7.7 9.8v4.4l2.5-1.4v-.8zm3.6 0v.8l2.5 1.4V9.8l-2.5 2.2z",
  },
  {
    id: "claude",
    name: "Claude",
    badgeColor: "#F59E0B",
    bgColor: "#38220A",
    categories: ["Artificial Intelligence"],
    angle: 60,
    track: "mid",
    depth: "near",
    svgPath: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z",
  },
  {
    id: "blender",
    name: "Blender",
    badgeColor: "#FB923C",
    bgColor: "#381E10",
    categories: ["Game Development", "Creative"],
    angle: 25,
    track: "mid",
    depth: "mid",
    svgPath: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1.6 14.4c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6z",
  },
  {
    id: "gemini",
    name: "Gemini",
    badgeColor: "#818CF8",
    bgColor: "#171E42",
    categories: ["Artificial Intelligence"],
    angle: 340,
    track: "mid",
    depth: "near",
    svgPath: "M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z",
  },
  {
    id: "supabase",
    name: "Supabase",
    badgeColor: "#3ECF8E",
    bgColor: "#0E291F",
    categories: ["Backend & Cloud"],
    angle: 310,
    track: "mid",
    depth: "near",
    svgPath: "M13.2 2.2L3.9 13.5c-.3.4 0 1 .5 1h6.9l-1.5 7.3c-.2.7.7 1.1 1.2.6l9.3-11.3c.3-.4 0-1-.5-1h-6.9l1.5-7.3c.2-.7-.7-1.1-1.2-.6z",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    badgeColor: "#4169E1",
    bgColor: "#101D3D",
    categories: ["Backend & Cloud"],
    angle: 285,
    track: "mid",
    depth: "near",
    svgPath: "M12 2C7 2 3.5 5 3.5 9c0 2.5 1.5 4.5 3.5 5.5v5.5l3-2v-3.5c.7.3 1.3.5 2 .5 5 0 8.5-3 8.5-7s-3.5-6-8.5-6z",
  },
  {
    id: "mysql",
    name: "MySQL",
    badgeColor: "#38BDF8",
    bgColor: "#0D2533",
    categories: ["Programming", "Backend & Cloud"],
    angle: 250,
    track: "mid",
    depth: "mid",
    svgPath: "M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm4 11.5c-1 1-2.5 1.5-4 1.5s-3-.5-4-1.5l1.5-1.5c.7.7 1.6 1 2.5 1s1.8-.3 2.5-1l1.5 1.5z",
  },
  {
    id: "java",
    name: "Java",
    badgeColor: "#ED8B00",
    bgColor: "#38240D",
    categories: ["Programming"],
    angle: 215,
    track: "mid",
    depth: "near",
    svgPath: "M8.5 18.5c2.5.5 5.5.5 8 0-1-1.5-3-2-5.5-2s-4.5.5-2.5 2zm1-3.5c2 .5 4 .5 6 0-.5-1-2-1.5-3.5-1.5S9 14 9.5 15zm-2.5 6c4 1 9 1 13 0-1.5-2-4.5-2.5-8.5-2.5s-7 .5-4.5 2.5z",
  },
  {
    id: "aseprite",
    name: "Aseprite",
    badgeColor: "#7BC4E2",
    bgColor: "#172733",
    categories: ["Game Development", "Creative"],
    angle: 35,
    track: "mid",
    depth: "mid",
    svgPath: "M4 3h16v18H4V3zm3 4v3h3V7H7zm7 0v3h3V7h-3zm-4 6v4h4v-4h-4z",
  },

  // --- Inner Track (Rx: 320px, Ry: 75px) ---
  {
    id: "svelte",
    name: "Svelte",
    badgeColor: "#FF3E00",
    bgColor: "#381810",
    categories: ["Frontend & Web"],
    angle: 170,
    track: "inner",
    depth: "near",
    svgPath: "M18.8 6.4a5 5 0 00-6.8-1.5L7.8 7.5A5 5 0 005.6 13l1.8-1a3 3 0 011.3-3.3l4.2-2.6a3 3 0 014.1.9c.9 1.4.5 3.3-.9 4.1l-4.2 2.6a5 5 0 00-2.3 5.5 5 5 0 006.8 1.5l4.2-2.6a5 5 0 002.3-5.5l-1.8 1a3 3 0 01-1.3 3.3l-4.2 2.6a3 3 0 01-4.1-.9c-.9-1.4-.5-3.3.9-4.1l4.2-2.6a5 5 0 002.3-5.5z",
  },
  {
    id: "git",
    name: "Git",
    badgeColor: "#FB7185",
    bgColor: "#38171C",
    categories: ["Platforms", "Backend & Cloud"],
    angle: 125,
    track: "inner",
    depth: "mid",
    svgPath: "M21.7 10.7l-8.4-8.4a2 2 0 00-2.8 0L8.7 4.1l3.5 3.5a2.4 2.4 0 013 3l3.4 3.4a2.4 2.4 0 11-1.4 1.4l-3.2-3.2v4.8a2.4 2.4 0 11-2 0v-5a2.4 2.4 0 01-1.3-3.1L7.3 5.5 2.3 10.7a2 2 0 000 2.8l8.4 8.4a2 2 0 002.8 0l8.2-8.4a2 2 0 000-2.8z",
  },
  {
    id: "workspace",
    name: "Workspace",
    badgeColor: "#4285F4",
    bgColor: "#122038",
    categories: ["Collaboration", "Platforms"],
    angle: 80,
    track: "inner",
    depth: "near",
    svgPath: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",
  },
  {
    id: "python",
    name: "Python",
    badgeColor: "#38BDF8",
    bgColor: "#102538",
    categories: ["Programming"],
    angle: 10,
    track: "inner",
    depth: "near",
    svgPath: "M11.9 2c-3.4 0-5.4.3-5.4 1.8v2.3h5.5v.8H4.2C2.7 6.9 2 8.4 2 10.4c0 2 1.3 3.4 3.3 3.4h1.7v-2.3c0-1.7 1.5-3.1 3.2-3.1h5.5V6.8c0-1.5-1.5-4.8-3.8-4.8zm-1.8 1.6a.8.8 0 110 1.6.8.8 0 010-1.6zm2 18.4c3.4 0 5.4-.3 5.4-1.8v-2.3h-5.5v-.8h7.8c1.5 0 2.2-1.5 2.2-3.5 0-2-1.3-3.4-3.3-3.4h-1.7v2.3c0 1.7-1.5 3.1-3.2 3.1H8.3v1.6c0 1.5 1.5 4.8 3.8 4.8zm1.8-1.6a.8.8 0 110-1.6.8.8 0 010 1.6z",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    badgeColor: "#F97316",
    bgColor: "#361D0C",
    categories: ["Creative"],
    angle: 330,
    track: "inner",
    depth: "far",
    svgPath: "M8.5 6L4 18h2.6l1-3h4.8l1 3H16L11.5 6H8.5zm.7 2.7l1.7 5h-3.4l1.7-5zM18 10h2.5v8H18v-8zm0-3h2.5v2H18V7z",
  },
  {
    id: "vscode",
    name: "VS Code",
    badgeColor: "#38BDF8",
    bgColor: "#0F263D",
    categories: ["Platforms", "Backend & Cloud"],
    angle: 270,
    track: "inner",
    depth: "near",
    svgPath: "M17.5 2.2L12 7.3 6.5 2.7 2 6.5v11l4.5 3.8 5.5-4.6 5.5 5.1L22 19V5l-4.5-2.8zM17 15.5l-5-4.2 5-4.2v8.4z",
  },
  {
    id: "nodejs",
    name: "Node.js",
    badgeColor: "#84CC16",
    bgColor: "#1B330B",
    categories: ["Backend & Cloud", "Programming"],
    angle: 215,
    track: "inner",
    depth: "mid",
    svgPath: "M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z",
  },
  {
    id: "openai",
    name: "OpenAI",
    badgeColor: "#34D399",
    bgColor: "#0E2E21",
    categories: ["Artificial Intelligence"],
    angle: 295,
    track: "inner",
    depth: "near",
    svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V14h-2v2.93A8.001 8.001 0 014.07 13H7v-2H4.07A8.001 8.001 0 0111 4.07V7h2V4.07A8.001 8.001 0 0119.93 11H17v2h2.93A8.001 8.001 0 0113 16.93z",
  },
  {
    id: "mixamo",
    name: "Mixamo",
    badgeColor: "#00E5FF",
    bgColor: "#0A2533",
    categories: ["Game Development"],
    angle: 155,
    track: "inner",
    depth: "mid",
    svgPath: "M12 2L3 8v8l9 6 9-6V8l-9-6zm0 3.2L18 9v6l-6 4-6-4V9l6-3.8zM9 10h6v1.8H9V10zm0 3h6v1.8H9V13z",
  },
  {
    id: "audacity",
    name: "Audacity",
    badgeColor: "#F59E0B",
    bgColor: "#33220A",
    categories: ["Game Development", "Creative"],
    angle: 240,
    track: "inner",
    depth: "far",
    svgPath: "M12 3a9 9 0 00-9 9v3a3 3 0 003 3h1v-6H5v-2a7 7 0 1114 0v2h-2v6h1a3 3 0 003-3v-3a9 9 0 00-9-9zm-4 9h2v4H8v-4zm6 0h2v4h-2v-4z",
  },
];

const TRACK_RADII = {
  outer: { rx: 820, ry: 180 },
  mid: { rx: 560, ry: 125 },
  inner: { rx: 320, ry: 75 },
};

const smoothCinemaEase = [0.22, 1, 0.36, 1] as const;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [mounted, setMounted] = useState(false);
  const { playHoverTick, playSelectPing } = useSoundEffects();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="tech-stack"
      className="relative w-full overflow-hidden bg-transparent pt-32 sm:pt-40 pb-28 text-white select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 relative z-20">
        
        {/* Header Section (Initial Reaching Scroll Reveal) */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, ease: smoothCinemaEase }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
              <p className="text-xs uppercase font-medium tracking-[0.25em] text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                Technical Constellation
              </p>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl font-extrabold uppercase leading-[1.0] tracking-tight font-[family-name:var(--font-manrope)]">
              The tools I use <br />
              <span className="text-[#8B5CF6]">to build.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-[family-name:var(--font-inter)]">
              Panoramic radar mapping runtime frameworks, engine architectures, graphics tools, and cloud infrastructure.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 rounded-full bg-[#00E5FF]/70" />
              <span className="w-2.5 h-0.5 rounded-full bg-[#8B5CF6]/70" />
            </div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              {activeCategory === "All"
                ? `${ALL_TOOLS.length} TOTAL NODES`
                : `${ALL_TOOLS.filter((t) => t.categories.includes(activeCategory)).length} SECTOR NODES`}
            </p>
          </div>
        </motion.div>

      </div>

      {/* WIDESCREEN CONSTANT ORBIT CANVAS WITH FIGMA PLANETARY CHOREOGRAPHY */}
      <div className="relative mt-4 w-screen left-1/2 -translate-x-1/2 h-[560px] sm:h-[620px] lg:h-[660px] flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Soft Radial Ambient Core Radiance */}
        <div
          className="absolute w-[440px] h-[200px] rounded-full pointer-events-none opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 75%)",
          }}
        />

        {/* Central Core Pip */}
        <div className="absolute size-2 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF,0_0_25px_rgba(0,229,255,0.7)] z-10" />

        {/* Floating Seesaw Tilt (Gentle organic pitch, nodes stay upright) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.35, ease: smoothCinemaEase }}
          animate={{
            rotateZ: [-1.2, 1.2, -1.2],
            y: [-6, 6, -6],
          }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {/* Permanent Full-Width SVG Orbit Belts */}
          <svg
            className="absolute w-full h-full max-w-[1900px] max-h-[520px] pointer-events-none"
            viewBox="0 0 1900 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A2C87" stopOpacity="0.05" />
                <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4A2C87" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <g transform="translate(950, 250)">
              {/* Outer Orbit Path */}
              <motion.ellipse
                cx="0"
                cy="0"
                rx={TRACK_RADII.outer.rx}
                ry={TRACK_RADII.outer.ry}
                stroke="url(#orbitGlow)"
                strokeWidth="1.25"
                strokeDasharray="6 12"
                animate={{ strokeDashoffset: [0, -180] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="opacity-70"
              />
              {/* Mid Orbit Path */}
              <motion.ellipse
                cx="0"
                cy="0"
                rx={TRACK_RADII.mid.rx}
                ry={TRACK_RADII.mid.ry}
                stroke="#8B5CF6"
                strokeWidth="0.8"
                strokeOpacity="0.3"
                strokeDasharray="4 8"
                animate={{ strokeDashoffset: [0, 140] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner Orbit Path */}
              <motion.ellipse
                cx="0"
                cy="0"
                rx={TRACK_RADII.inner.rx}
                ry={TRACK_RADII.inner.ry}
                stroke="#00E5FF"
                strokeWidth="0.8"
                strokeOpacity="0.35"
                strokeDasharray="3 6"
                animate={{ strokeDashoffset: [0, -90] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
            </g>
          </svg>

          {/* Node Constellation: Circular Discs with Pure Vector Logos (CONVERGE → EXCHANGE → SPREAD → FLOAT) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {ALL_TOOLS.map((tool, idx) => {
              const isMatch =
                activeCategory === "All" || tool.categories.includes(activeCategory);

              const rad = (tool.angle * Math.PI) / 180;
              const { rx, ry } = TRACK_RADII[tool.track];

              // Clean rounded coordinates to prevent floating point server/client hydration diffs
              const targetX = Math.round(Math.cos(rad) * rx * 100) / 100;
              const targetY = Math.round(Math.sin(rad) * ry * 100) / 100;

              const isNear = tool.depth === "near";
              const isFar = tool.depth === "far";

              const discSize = isNear ? 56 : isFar ? 42 : 48;
              const iconSize = isNear ? 24 : isFar ? 17 : 20;
              const zIndex = isNear ? 30 : isFar ? 10 : 20;

              return (
                <motion.div
                  key={tool.id}
                  initial={false}
                  animate={
                    mounted
                      ? {
                          x: isMatch ? targetX : 0,
                          y: isMatch ? targetY : 0,
                          scale: isMatch ? 1 : 0,
                          opacity: isMatch ? 1 : 0,
                        }
                      : {
                          x: 0,
                          y: 0,
                          scale: 0,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.85,
                    ease: smoothCinemaEase,
                    delay: isMatch ? (idx % 6) * 0.03 : 0,
                  }}
                  className={`absolute flex flex-col items-center group cursor-pointer ${
                    isMatch ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{ zIndex }}
                  onMouseEnter={() => {
                    if (isMatch) playHoverTick(tool.depth);
                  }}
                >
                  {/* FLOAT Phase: Depth-dependent asynchronous micro-drift */}
                  <motion.div
                    animate={{
                      y: [0, isNear ? -6 : 4, 0],
                      x: [0, isFar ? 3 : -3, 0],
                    }}
                    transition={{
                      duration: 6.5 + (idx % 4) * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (idx % 5) * 0.3,
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Interactive Circular Node Disc */}
                    <div
                      className="relative flex items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-115"
                      style={{
                        width: `${discSize}px`,
                        height: `${discSize}px`,
                        backgroundColor: tool.bgColor,
                        borderColor: `${tool.badgeColor}40`,
                        boxShadow: `0 8px 24px -4px ${tool.bgColor}`,
                      }}
                    >
                      {/* Ambient hover glow halo */}
                      <div
                        className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: tool.badgeColor }}
                      />

                      {/* Standalone Vector Logo Icon */}
                      <svg
                        viewBox={tool.viewBox || "0 0 24 24"}
                        style={{
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                          fill: tool.badgeColor,
                        }}
                        className="relative transition-transform duration-300 group-hover:scale-110"
                      >
                        <path d={tool.svgPath} />
                      </svg>
                    </div>

                    {/* Single-Line Compact Label (Locked underneath) */}
                    <span className="mt-1 text-[10px] font-medium tracking-wide text-zinc-400 group-hover:text-white transition-colors duration-200 font-[family-name:var(--font-inter)] text-center whitespace-nowrap">
                      {tool.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.3, ease: smoothCinemaEase }}
        className="relative z-20 mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 mt-2 flex flex-wrap items-center justify-center gap-2"
      >
        {CATEGORIES.map((cat, idx) => {
          const isSelected = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => {
                if (cat === activeCategory) return;
                playSelectPing(1 + idx * 0.05);
                setActiveCategory(cat);
              }}
              onMouseEnter={() => playHoverTick("far")}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-medium font-[family-name:var(--font-inter)] transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? "border-[#8B5CF6] bg-[#1D1540] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full transition-all duration-300 ${
                    isSelected ? "bg-[#8B5CF6] scale-125" : "bg-zinc-600"
                  }`}
                />
                {cat}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Footnote */}
      <p className="relative z-20 mt-6 text-center text-[10px] font-mono text-zinc-500 tracking-wider">
        Constellation radar &bull; Select a category to isolate engineering disciplines
      </p>
    </section>
  );
}