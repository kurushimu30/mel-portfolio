"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 26, stiffness: 340, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 340, mass: 0.45 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverables = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .cursor-pointer"
      );

      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    checkHoverables();
    const observer = new MutationObserver(checkHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      
      {/* 1. Precision Center Dot (Follows exact mouse coordinate) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed size-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
      />

      {/* 2. Fluid Magnetic Reticle Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 26,
          height: isHovered ? 44 : 26,
          borderColor: isHovered ? "rgba(139, 92, 246, 0.75)" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className="fixed rounded-full border backdrop-blur-[1px] flex items-center justify-center pointer-events-none"
      >
        {isHovered && (
          <>
            <span className="absolute top-0 w-1 h-0.5 bg-[#8B5CF6] -translate-y-1" />
            <span className="absolute bottom-0 w-1 h-0.5 bg-[#8B5CF6] translate-y-1" />
            <span className="absolute left-0 w-0.5 h-1 bg-[#8B5CF6] -translate-x-1" />
            <span className="absolute right-0 w-0.5 h-1 bg-[#8B5CF6] translate-x-1" />
          </>
        )}
      </motion.div>

    </div>
  );
}