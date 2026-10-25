"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ShootingStar {
  id: number;
  top: string;
  left: string;
}

export default function GlobalBackground() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 180,
    mass: 0.8,
  });

  const starfieldY1 = useTransform(smoothProgress, [0, 1], ["0px", "-450px"]);
  const starfieldY2 = useTransform(smoothProgress, [0, 1], ["0px", "-900px"]);

  const nebulaX = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    ["-15%", "20%", "-20%", "10%"]
  );
  const nebulaY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["-10%", "30%", "70%"]
  );
  const nebulaScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 1.25, 0.9]
  );
  const nebulaOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.7, 1],
    [0.18, 0.28, 0.22, 0.12]
  );

  const secondaryX = useTransform(smoothProgress, [0, 1], ["20%", "-15%"]);
  const secondaryY = useTransform(smoothProgress, [0, 1], ["50%", "10%"]);
  const secondaryOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.12, 0.22, 0.15]
  );

  // Sporadic natural meteor spawner
  const [shootingStar, setShootingStar] = useState<ShootingStar | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now(),
        // Starts in the upper half/third of the screen
        top: `${Math.random() * 30 + 5}%`,
        left: `${Math.random() * 50 + 5}%`,
      };

      setShootingStar(newStar);
      setTimeout(() => setShootingStar(null), 1000);

      // Random delay between 16s and 26s
      const nextDelay = Math.random() * 10000 + 16000;
      timeoutId = setTimeout(triggerShootingStar, nextDelay);
    };

    timeoutId = setTimeout(triggerShootingStar, 7000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#090A0F]">
      
      {/* 1. Deep Core Space Fog */}
      <motion.div
        style={{
          x: nebulaX,
          y: nebulaY,
          scale: nebulaScale,
          opacity: nebulaOpacity,
        }}
        className="absolute top-1/4 left-1/4 w-[900px] h-[700px] rounded-full blur-[170px] will-change-transform"
        animate={{
          background: [
            "radial-gradient(circle, rgba(67,198,197,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)",
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.15) 50%, transparent 75%)",
            "radial-gradient(circle, rgba(67,198,197,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Secondary Drift Light */}
      <motion.div
        style={{
          x: secondaryX,
          y: secondaryY,
          opacity: secondaryOpacity,
        }}
        className="absolute top-1/2 right-10 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-[#9B8AFB]/15 via-[#43C6C5]/10 to-transparent blur-[160px] will-change-transform"
      />

      {/* 3. Deep Distant Star Layer */}
      <motion.div
        style={{ y: starfieldY1 }}
        className="absolute inset-0 opacity-25"
      >
        <svg className="w-full h-[200vh]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="distant-stars"
              width="180"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="25" cy="40" r="0.75" fill="#FFFFFF" opacity="0.4" />
              <circle cx="110" cy="90" r="0.6" fill="#9B8AFB" opacity="0.6" />
              <circle cx="160" cy="140" r="0.8" fill="#FFFFFF" opacity="0.3" />
              <circle cx="70" cy="165" r="0.5" fill="#43C6C5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#distant-stars)" />
        </svg>
      </motion.div>

      {/* 4. Near Star Layer */}
      <motion.div
        style={{ y: starfieldY2 }}
        className="absolute inset-0 opacity-40"
      >
        <svg className="w-full h-[300vh]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="near-stars"
              width="280"
              height="280"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="45" cy="50" r="1.2" fill="#FFFFFF" opacity="0.7" />
              <circle cx="190" cy="110" r="1.4" fill="#9B8AFB" opacity="0.8" />
              <circle cx="240" cy="220" r="1.0" fill="#FFFFFF" opacity="0.6" />
              <circle cx="120" cy="260" r="1.3" fill="#43C6C5" opacity="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#near-stars)" />
        </svg>
      </motion.div>

      {/* 5. True-Axis Cosmic Meteor (Head leads, tail trails along exact velocity angle) */}
      {shootingStar && (
        <div
          key={shootingStar.id}
          style={{
            top: shootingStar.top,
            left: shootingStar.left,
            transform: "rotate(42deg)", // Fixed 42-degree downward orbital slant
          }}
          className="absolute origin-left pointer-events-none"
        >
          <motion.div
            initial={{
              x: -100,
              opacity: 0,
              scaleX: 0.2,
            }}
            animate={{
              x: 520, // Moves strictly forward along its rotated local axis
              opacity: [0, 1, 1, 0],
              scaleX: [0.3, 1.4, 0.4],
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1], // Cinematic swift acceleration & deceleration
            }}
            className="flex items-center"
          >
            {/* The Tail: Fades out behind the head */}
            <div className="h-[1.5px] w-48 bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-white" />
            
            {/* The Leading Head: Directly pulls the streak forward */}
            <div className="size-2 -ml-1 rounded-full bg-white shadow-[0_0_12px_#00E5FF,0_0_20px_#FFFFFF]" />
          </motion.div>
        </div>
      )}

      {/* 6. Distant Satellite Beacons */}
      <div className="absolute top-1/3 left-1/6">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-40" />
          <span className="relative inline-flex size-1.5 rounded-full bg-[#9B8AFB]/60" />
        </span>
      </div>
      <div className="absolute top-2/3 right-1/4">
        <span className="relative flex size-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-35" />
          <span className="relative inline-flex size-1 rounded-full bg-[#43C6C5]/50" />
        </span>
      </div>

      {/* 7. Fine Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] [background-size:48px_48px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        }}
      />

      {/* 8. Cinematic Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,10,15,0.85)_100%)]" />
    </div>
  );
}