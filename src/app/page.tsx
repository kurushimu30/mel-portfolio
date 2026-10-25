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
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#090A0F] text-white">
      {/* 0. Ambient Scroll Atmosphere */}
      <CustomCursor />
      <GlobalBackground />

      {/* 1. Global Navigation */}
      <Navbar />

      {/* Page Content Layers */}
      <div className="relative z-10">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Narrative & Ecosystem Sections */}
        <Collaborations />
        <Manifesto />
        <About />
        <ArkSection />

        {/* 4. Experience Runway */}
        <Experience />

        {/* 5. Production & Tooling Modules */}
        <Projects />
        <TechStack />
        <Recognition />

        {/* 6. Closing Terminal Console */}
        <Contact />
      </div>
    </main>
  );
}