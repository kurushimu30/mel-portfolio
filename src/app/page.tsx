import Navbar from "@/components/Navbar";
import GlobalBackground from "@/components/GlobalBackground";
import Hero from "@/components/Hero";
import Collaborations from "@/components/Collaborations";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import ArkSection from "@/components/ArkSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Recognition from "@/components/Recognition";
import Contact from "@/components/Contact";
import SectionReveal from "@/components/SectionReveal";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#090A0F] text-white">
      {/* 0. Ambient Scroll Atmosphere (Fixed, parallax starfield & kinetic nebula) */}

      <CustomCursor />
      <GlobalBackground />

      {/* 1. Global Navigation (Fixed/Sticky - never wrap in transform) */}
      <Navbar />

      {/* Page Content Layers */}
      <div className="relative z-10">
        {/* 2. Above-the-fold Hero (Immediate paint, no scroll trigger lag) */}
        <Hero />

        {/* 3. Narrative & Ecosystem Sections */}
        <SectionReveal>
          <Collaborations />
        </SectionReveal>

        <Manifesto />

        <SectionReveal>
          <About />
        </SectionReveal>

        {<SectionReveal>
          <ArkSection />
        </SectionReveal>}

        {/* 4. Experience Runway (Unwrapped to preserve position: sticky scrubbing) */}
        <Experience />

        {/* 5. Production & Tooling Modules */}
        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionReveal>
          <TechStack />
        </SectionReveal>

        <SectionReveal>
          <Recognition />
        </SectionReveal>

        {/* 6. Closing Terminal Console */}
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </div>
    </main>
  );

  
}