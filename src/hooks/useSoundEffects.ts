"use client";

import { useCallback, useRef } from "react";

export function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  /**
   * Depth-Aware & Random-Jittered Hover Sound
   * @param depth - "near" | "mid" | "far" | number (frequency offset)
   */
  const playHoverTick = useCallback(
    (depth?: "near" | "mid" | "far" | number) => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Base frequency determined by spatial depth
        let baseFreq = 1200;
        if (depth === "near") baseFreq = 750;   // Deeper, heavier tone for foreground
        else if (depth === "mid") baseFreq = 1100;
        else if (depth === "far") baseFreq = 1600; // Crisp, high chime for background
        else if (typeof depth === "number") baseFreq = depth;

        // Micro-jitter (+- 40Hz) so no two consecutive hovers sound completely identical
        const jitter = (Math.random() - 0.5) * 80;
        const startFreq = Math.max(300, baseFreq + jitter);
        const endFreq = startFreq * 0.55;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.038);

        // Keep it ultra quiet and tactile (ambient UI volume)
        const volume = depth === "near" ? 0.045 : 0.03;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.038);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.038);
      } catch {
        // Safe failover if user hasn't interacted with DOM yet
      }
    },
    [getAudioContext]
  );

  /**
   * Resonant Two-Tone Chord for Filter Switches & Active Confirmations
   * Plays a quick pentatonic interval rather than a single beeper
   */
  const playSelectPing = useCallback(
    (pitchMultiplier: number = 1) => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const fundamental = 440 * pitchMultiplier; // A4 base
        const harmonic = fundamental * 1.5;        // Perfect fifth harmonic

        [fundamental, harmonic].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + 0.08);

          const vol = idx === 0 ? 0.05 : 0.025;
          gain.gain.setValueAtTime(vol, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.08);
        });
      } catch {
        // Safe failover
      }
    },
    [getAudioContext]
  );

  return { playHoverTick, playSelectPing };
}