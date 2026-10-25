"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SubTrack {
  title: string;
  period: string;
  details: string;
}

interface Milestone {
  id: string;
  role: string;
  org: string;
  period: string;
  badge: string;
  summary: string;
  responsibilities: string[];
  contributions: string[];
  outcomes: string[];
  subTracks?: SubTrack[];
}

const MILESTONES: Milestone[] = [
  {
    id: "ark-leadership",
    role: "Founder & CEO",
    org: "ARK",
    period: "March 2025 — Present",
    badge: "Community Leadership",
    summary:
      "Directs organization-wide strategy, production workflows, and student developer initiatives; established ARK as a student-led game development community and project incubator.",
    responsibilities: [
      "Define organizational roadmap, team milestones, and cross-department collaboration SOPs.",
      "Facilitate project tracks spanning gameplay programming, 3D modeling, narrative design, and research.",
    ],
    contributions: [
      "Guided project deliverables and promotional assets for 'Code White: The Observer' leading up to its PGDX 2026 Indie Game Stars selection.",
      "Organized community onboarding sessions, internal ideathons, and cross-functional student game builds.",
    ],
    outcomes: [
      "Grew a nationwide student developer network collaborating on playable game prototypes.",
      "Established project teams actively producing indie game builds for regional exhibitions.",
    ],
  },
  {
    id: "pup-section-president",
    role: "Class Section President",
    org: "Polytechnic University of the Philippines (BSIT)",
    period: "October 2024 — Present",
    badge: "Academic Governance",
    summary:
      "Directs cohort administration, oversees class officers, and serves as direct student liaison to Department of Information Technology faculty across three consecutive terms.",
    responsibilities: [
      "Coordinate academic schedules, course requirement distributions, and departmental announcements.",
      "Represent student body concerns and administrative requirements during faculty assemblies.",
    ],
    contributions: [
      "Implemented structured class tracking systems and shared repositories for academic deliverables.",
      "Coordinated student participation and requirements gathering for departmental systems initiatives.",
    ],
    outcomes: [
      "Sustained consecutive President's Lister honors with a 1.13 cumulative General Weighted Average (GWA).",
      "Maintained consistent class coordination and liaison channels through consecutive academic terms.",
    ],
    subTracks: [
      {
        title: "BSIT 3-1N Section President",
        period: "August 2026 — Present",
        details: "Oversees section administration, departmental compliance, and student concerns for senior-level coursework.",
      },
      {
        title: "BSIT 2-1 Section President",
        period: "August 2025 — July 2026",
        details: "Managed class logistics, student-faculty communications, and cooperative academic project schedules.",
      },
      {
        title: "BSIT 1-2N Section President",
        period: "October 2024 — July 2025",
        details: "Established class operational channels and coordinated scheduling during foundational coursework.",
      },
    ],
  },
  {
    id: "accreditation-portal",
    role: "Project Manager & Backend Developer",
    org: "PUP BSIT Institutional Accreditation Portal",
    period: "April 2026 — Present",
    badge: "Web Systems",
    summary:
      "Coordinates project delivery and develops backend routes for the Department of Information Technology's web portal to organize academic compliance documentation.",
    responsibilities: [
      "Manage development task distributions, sprint milestones, and cross-functional team coordination.",
      "Implement server-side logic and validation endpoints for digital criterion submissions.",
    ],
    contributions: [
      "Programmed core backend endpoints and access control routes supporting document evaluation.",
      "Assisted in structuring file management flows to centralize departmental audit evidence.",
    ],
    outcomes: [
      "Delivered functional working modules enabling digital inspection of institutional accreditation criteria.",
      "Streamlined cross-team development progress across frontend and backend contributors.",
    ],
  },
  {
    id: "hackmanila-lead",
    role: "Lead Organizer",
    org: "HackManila 2026",
    period: "August 2026 — September 2026",
    badge: "Event Leadership",
    summary:
      "Led community outreach, partnership documentation, and program scheduling for HackManila Community Nights workshop initiatives.",
    responsibilities: [
      "Coordinate communication pipelines with venue and community partners including SageDynamics and Vantis PH.",
      "Structure event agendas, speaker time slots, and logistical requirements.",
    ],
    contributions: [
      "Authored official partnership overview decks and prepared presentation decks for opening proceedings.",
      "Structured workshop tracks highlighting modern software workflows and indie development practices.",
    ],
    outcomes: [
      "Convened student developers and engineering leads from diverse collegiate chapters for collaborative sessions.",
      "Established verified community outreach pipelines for upcoming student hackathon tracks.",
    ],
  },
  {
    id: "devcon-manila",
    role: "Executive Associate of Staff",
    org: "DEVCON Philippines / DEVCON Manila",
    period: "May 2025 — March 2026",
    badge: "Technical Operations",
    summary:
      "Supported organizational workflows, volunteer task distribution, and event administrative logistics across chapter developer gatherings.",
    responsibilities: [
      "Support on-site volunteer logistics and attendee check-ins during Metro Manila developer meetups.",
      "Maintain internal tracking documentation and assist chapter officers with executive scheduling.",
    ],
    contributions: [
      "Assisted in technical floor logistics and AV staging across regional developer conferences.",
      "Maintained internal status sheets for volunteer rosters and community outreach initiatives.",
    ],
    outcomes: [
      "Supported smooth on-site operations for flagship chapter summits across Metro Manila venues.",
      "Expanded working relationships with tech community volunteers and event partners.",
    ],
  },
  {
    id: "thea-game-dev",
    role: "Solo Game Developer & Researcher",
    org: "Thermodynamics Adventure (THEA)",
    period: "2024",
    badge: "Game Research",
    summary:
      "Independently conceptualized and developed an interactive 2D physics puzzle game designed to simulate the four laws of thermodynamics for STEM students.",
    responsibilities: [
      "Translate theoretical thermodynamic principles into interactive game mechanics and level obstacles.",
      "Handle end-to-end prototype development, physics parameters, and sprite implementations.",
    ],
    contributions: [
      "Built gameplay loops modeling heat transfer, entropy, and thermal equilibrium as environmental puzzles.",
      "Iterated visual feedback cues to help students intuitively grasp complex thermodynamic formulas.",
    ],
    outcomes: [
      "Completed prototype builds combining educational research objectives with playable mechanics.",
      "Established core technical fundamentals in gameplay loop design and physics simulations.",
    ],
  },
  {
    id: "ark-capacity-model",
    role: "Operations Research Lead",
    org: "ARK Operations Research",
    period: "2025 — 2026",
    badge: "Applied Research",
    summary:
      "Formulated a parametric resource capacity model analyzing multi-sector project lifecycles across student development ecosystems.",
    responsibilities: [
      "Model constraints including executive attention, developer bandwidth, and timeline sequencing.",
      "Analyze historical friction points in student-led organizations to mitigate founder bottlenecks.",
    ],
    contributions: [
      "Drafted analytical frameworks categorizing digital product delivery, talent pipelines, and community initiatives.",
      "Synthesized findings into an operational methodology for scaling multi-track creative technology hubs.",
    ],
    outcomes: [
      "Produced comprehensive architectural documentation utilized to structure ARK's internal teams.",
      "Provided objective resource allocation guidelines for managing concurrent indie game initiatives.",
    ],
  },
  {
    id: "gdsc-support-manager",
    role: "Programming Team Support Committee Manager",
    org: "Google Developer Student Clubs PUP",
    period: "November 2024 — November 2025",
    badge: "Technical Mentorship",
    summary:
      "Assisted programming committee initiatives, supported technical workshops, and guided junior student developers in core programming skills.",
    responsibilities: [
      "Support coding sessions, study jams, and technical project preparation for members.",
      "Assist students troubleshooting syntax, Git version control, and web fundamentals.",
    ],
    contributions: [
      "Facilitated peer-learning sessions on JavaScript, Git collaboration, and basic data structures.",
      "Coordinated with committee leads to prepare technical support materials for campus tech talks.",
    ],
    outcomes: [
      "Helped onboard student members into version-controlled team workflows.",
      "Maintained dependable technical support coverage across chapter developer activities.",
    ],
  },
  {
    id: "tpg-analytics-lead",
    role: "Business Analytics Lead",
    org: "TPG Solar Hackathon",
    period: "April 2025",
    badge: "Hackathon Qualifier",
    summary:
      "Developed business telemetry models and feasibility presentations for renewable energy software concepts during an intensive hackathon sprint.",
    responsibilities: [
      "Formulate unit feasibility estimates and market adoption parameters for clean energy proposals.",
      "Synthesize energy metrics into executive presentation slide decks for judging evaluation.",
    ],
    contributions: [
      "Constructed visual data charts and telemetry dashboards presented during final pitch sessions.",
      "Aligned technical feature scoping with commercial viability criteria under sprint constraints.",
    ],
    outcomes: [
      "Achieved National Finalist classification in the business analytics track.",
      "Successfully defended technical and business assumptions before industry adjudicators.",
    ],
  },
  {
    id: "ccis-gamejam-judge",
    role: "Panel Judge & Tournament Host",
    org: "CCIS Week 2025 Game Jam",
    period: "December 2025",
    badge: "Adjudication",
    summary:
      "Evaluated student game jam entries across design, mechanic cohesion, and technical stability while hosting live showcase segments.",
    responsibilities: [
      "Review student game builds across gameplay mechanics, controls, and narrative cohesion.",
      "Host on-stage presentations and provide constructive developer feedback to participating teams.",
    ],
    contributions: [
      "Assisted in applying standardized evaluation criteria covering stability, creativity, and polish.",
      "Conducted post-showcase feedback discussions highlighting production practices and bug triage.",
    ],
    outcomes: [
      "Concluded adjudication in consensus with department faculty and student organization leaders.",
      "Provided actionable game development feedback to student indie creators.",
    ],
  },
  {
    id: "aws-cloud-club-media",
    role: "Core Media Asset Creator & Video Editor",
    org: "AWS Cloud Club PUP",
    period: "October 2024 — October 2025",
    badge: "Creative Production",
    summary:
      "Produced, edited, and formatted promotional video assets and motion graphics to highlight chapter cloud computing events.",
    responsibilities: [
      "Edit event recaps, promotional trailers, and social video teasers using Premiere Pro and After Effects.",
      "Maintain consistent chapter visual standards and typography across published video assets.",
    ],
    contributions: [
      "Edited high-paced video recaps and motion title cards for campus cloud conferences.",
      "Prepared video formats optimized for mobile social distribution across Facebook and LinkedIn.",
    ],
    outcomes: [
      "Delivered media packages supporting university awareness for AWS Cloud Club workshops.",
      "Strengthened chapter branding with consistent audio-visual production quality.",
    ],
  },
  {
    id: "dost-powerup-exhibitor",
    role: "Regional Exhibitor",
    org: "DOST NCR PowerUp Regional Exhibition",
    period: "May 2025",
    badge: "Project Showcase",
    summary:
      "Exhibited interactive technical project builds and presented system architectures to government delegates, industry visitors, and students.",
    responsibilities: [
      "Staff exhibition booth, demonstrate live software prototypes, and answer visitor questions.",
      "Explain system structure, tech stack decisions, and target user benefits to diverse audiences.",
    ],
    contributions: [
      "Operated interactive demo stations highlighting real-time user input and visual feedback loops.",
      "Represented student engineering initiatives during regional science and technology showcase hours.",
    ],
    outcomes: [
      "Demonstrated software capabilities directly to regional technology stakeholders and academic observers.",
      "Gained valuable public exhibition and live technical demonstration experience.",
    ],
  },
  {
    id: "dost-bootcamp-delegate",
    role: "National Delegate",
    org: "DOST Game Development & Esports Bootcamp",
    period: "April 2025",
    badge: "Technical Training",
    summary:
      "Participated in national game development workshops focused on game engine architecture, production pipelines, and industry best practices.",
    responsibilities: [
      "Complete intensive technical lectures and hands-on exercises led by game industry practitioners.",
      "Engage in rapid prototyping sessions analyzing engine mechanics and optimization.",
    ],
    contributions: [
      "Explored game loop design, physics parameters, and sprite animation pipelines during practical sprints.",
      "Applied workshop optimization methodologies to personal game development projects.",
    ],
    outcomes: [
      "Completed national workshop certification in modern game engine workflows.",
      "Integrated industry pipeline insights directly into ARK's student development practices.",
    ],
  },
  {
    id: "pbw-staff",
    role: "Operations Staff",
    org: "Philippine Blockchain Week",
    period: "2025",
    badge: "Convention Operations",
    summary:
      "Assisted with floor management, attendee accreditation, and technical staging support for a major regional technology convention.",
    responsibilities: [
      "Support on-site attendee routing, badge checks, and hall entrance management.",
      "Assist speaker coordination and stage handoffs between scheduled plenary sessions.",
    ],
    contributions: [
      "Coordinated with convention stage managers to ensure speaker microphones and slides were staged on schedule.",
      "Addressed floor logistics and guest inquiries across exhibition areas.",
    ],
    outcomes: [
      "Contributed to uninterrupted stage transitions and smooth plenary session pacing.",
      "Acquired valuable hands-on experience in large-scale tech conference operations.",
    ],
  },
  {
    id: "iot-philippines",
    role: "Operations Staff",
    org: "IoT Philippines Conference",
    period: "2025",
    badge: "Floor Logistics",
    summary:
      "Supported exhibition hall setups, guest routing, and logistical coordination for IoT and cloud technology conference tracks.",
    responsibilities: [
      "Assist exhibition booth coordination and ensure orderly visitor circulation throughout demo floors.",
      "Provide general administrative and technical support to session coordinators.",
    ],
    contributions: [
      "Facilitated prompt assistance for speaker equipment transitions between conference tracks.",
      "Monitored presentation room staging and seating arrangements during high-occupancy hours.",
    ],
    outcomes: [
      "Maintained dependable operational support for multi-track technical sessions.",
      "Recognized by event team leads for proactive floor coordination.",
    ],
  },
  {
    id: "unleash-philippines",
    role: "Operations Staff",
    org: "Unleash Philippines",
    period: "2025",
    badge: "Event Logistics",
    summary:
      "Provided event floor coordination, registration management, and stage transition support during national youth leadership conventions.",
    responsibilities: [
      "Assist with attendee check-in queues, credential issuance, and orientation routing.",
      "Support stage runners with schedule tracking and session timekeeping.",
    ],
    contributions: [
      "Coordinated entry validation and crowd flow through primary convention plenary halls.",
      "Assisted production team with backstage speaker preparations and schedule rundowns.",
    ],
    outcomes: [
      "Maintained orderly registration and entry operations during peak morning arrivals.",
      "Supported timely execution of plenary and pitch showcase presentations.",
    ],
  },
  {
    id: "sintalento-tech-director",
    role: "Technical Director",
    org: "Sintalento Volunteer Network",
    period: "2025",
    badge: "Audio & AV Setup",
    summary:
      "Managed audio hardware configurations, mixer setups, and live broadcast operations for community youth engagements.",
    responsibilities: [
      "Configure and monitor live microphone levels, mixer channels, and audio cables during assemblies.",
      "Set up digital streaming feeds and coordinate technical transitions with live program hosts.",
    ],
    contributions: [
      "Calibrated dynamic microphone EQ and noise gating to minimize feedback in live acoustic venues.",
      "Standardized straightforward AV connection setups for student volunteer teams.",
    ],
    outcomes: [
      "Delivered clear, stable audio and video capture across scheduled volunteer sessions.",
      "Eliminated preventable AV interruptions through proactive pre-event sound checks.",
    ],
  },
  {
    id: "iskolaris-graphic-designer",
    role: "Graphic Designer",
    org: "Iskolaris Volunteer Network",
    period: "2025",
    badge: "Visual Identity",
    summary:
      "Designed digital campaign graphics, promotional posters, and social media announcements for community educational drives.",
    responsibilities: [
      "Create high-contrast social media posters, typography templates, and event banners.",
      "Align promotional graphic layouts with educational outreach guidelines and brand colors.",
    ],
    contributions: [
      "Produced multi-platform announcement visual kits optimized for mobile viewing on Facebook.",
      "Formatted clear program schedules and infographics for student volunteer onboarding.",
    ],
    outcomes: [
      "Delivered on-time creative collateral supporting youth volunteer recruitment campaigns.",
      "Maintained clean, recognizable visual consistency across published organization materials.",
    ],
  },
];

const N = MILESTONES.length;
const STEP_PX = 200;
const TOTAL_CONVEYOR_HEIGHT = (N - 1) * STEP_PX;

export default function Experience() {
  const { playHoverTick, playSelectPing } = useSoundEffects();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState<Milestone | null>(null);

  const [confirmSkip, setConfirmSkip] = useState(false);
  const confirmTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock background scroll when modal inspection is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveModalItem(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeModalItem]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const conveyorY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -TOTAL_CONVEYOR_HEIGHT]
  );

  const trailHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_CONVEYOR_HEIGHT]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIdx = Math.round(latest * (N - 1));
    const clamped = Math.min(Math.max(rawIdx, 0), N - 1);
    if (clamped !== activeIndex) {
      playHoverTick("mid");
      setActiveIndex(clamped);
    }
  });

  const jumpToIndex = (index: number) => {
    if (!containerRef.current) return;
    playSelectPing(1 + (index / N) * 0.4);
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;

    window.scrollTo({
      top: containerTop + (index / (N - 1)) * scrollableDistance,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        ref={containerRef}
        id="experience"
        className="relative w-full bg-transparent"
        style={{ height: `${(N + 1) * 35}vh` }}
      >
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 pt-20 pb-8 sm:px-12 lg:px-20">
          
          {/* Header */}
          <header className="relative z-30 mx-auto max-w-2xl shrink-0 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9B8AFB]">
              Timeline &amp; Roles
            </p>
            <h2 className="mt-1 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl font-[family-name:var(--font-manrope)]">
              Where I Put Ideas <br />
              <span className="text-[#9B8AFB]">Into Practice.</span>
            </h2>
            <p className="mt-2 text-xs text-zinc-400 sm:text-sm font-[family-name:var(--font-inter)]">
              Scroll to traverse the timeline. Active roles settle into the center focus line.
            </p>
          </header>

          {/* Central Viewing Chamber */}
          <div className="relative mx-auto my-auto w-full max-w-5xl h-[52vh] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
            
            {/* Traveling Track Conveyor */}
            <motion.div
              style={{
                y: conveyorY,
                top: "50%",
                height: `${TOTAL_CONVEYOR_HEIGHT}px`,
              }}
              className="absolute left-0 right-0 will-change-transform transform-gpu"
            >
              {/* Neutral Vertical Spine */}
              <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10" />

              {/* Glowing Active Trail */}
              <motion.div
                style={{ height: trailHeight }}
                className="absolute left-6 sm:left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#8B5CF6]/30 via-[#8B5CF6] to-[#9B8AFB] shadow-[0_0_12px_#8B5CF6]"
              />

              {/* All Nodes mapped */}
              {MILESTONES.map((item, i) => {
                const nodeY = i * STEP_PX;
                const isLeft = i % 2 === 0;
                const isCurrent = i === activeIndex;
                const distance = Math.abs(i - activeIndex);

                const opacity = isCurrent ? 1 : distance === 1 ? 0.35 : 0.08;
                const scale = isCurrent ? 1 : 0.94;

                return (
                  <div
                    key={item.id}
                    className="absolute inset-x-0 flex items-center justify-center transition-all duration-300"
                    style={{
                      top: `${nodeY}px`,
                      opacity,
                      transform: `translateY(-50%) scale(${scale})`,
                      pointerEvents: isCurrent ? "auto" : "none",
                    }}
                  >
                    {/* Timeline Node Stop */}
                    <div
                      onClick={() => jumpToIndex(i)}
                      onMouseEnter={() => playHoverTick("far")}
                      className="absolute left-6 sm:left-1/2 z-30 -translate-x-1/2 flex items-center justify-center cursor-pointer"
                    >
                      {isCurrent && (
                        <div className="absolute -inset-2.5 rounded-full bg-[#8B5CF6]/30 blur-sm pointer-events-none" />
                      )}
                      <span
                        className={`size-3 rounded-full border transition-all duration-300 ${
                          isCurrent
                            ? "border-white bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6] scale-125"
                            : i < activeIndex
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/70"
                            : "border-white/20 bg-[#090A0F]"
                        }`}
                      />
                    </div>

                    {/* Horizontal Connector Line */}
                      <div
                        className={`hidden sm:block absolute top-1/2 -translate-y-1/2 z-20 h-0.5 bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6] transition-all duration-300 ${
                          isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
                        } ${isCurrent ? "w-14 opacity-100" : "w-0 opacity-0"}`}
                      />

                    {/* Alternating Experience Card */}
                    <div
                      className={`w-full grid grid-cols-1 pl-14 sm:grid-cols-2 sm:pl-0 items-center ${
                        isLeft ? "sm:text-right" : "sm:text-left"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          isLeft
                            ? "sm:col-start-1 sm:justify-end sm:pr-14"
                            : "sm:col-start-2 sm:justify-start sm:pl-14"
                        }`}
                      >
                        <div
                          onClick={() => {
                            playSelectPing(1.35);
                            setActiveModalItem(item);
                          }}
                          onMouseEnter={() => {
                            if (isCurrent) playHoverTick("near");
                          }}
                          role="button"
                          tabIndex={isCurrent ? 0 : -1}
                          className={`group w-full max-w-md rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
                            isCurrent
                              ? "border-white/20 bg-[#12131C] shadow-2xl hover:border-[#8B5CF6]/60 hover:bg-[#161824]"
                              : "border-white/5 bg-white/[0.02]"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2.5 ${
                              isLeft ? "sm:justify-end" : "sm:justify-start"
                            }`}
                          >
                            <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                              {item.badge}
                            </span>
                            <span className="text-xs text-zinc-400 font-[family-name:var(--font-inter)]">
                              {item.period}
                            </span>
                          </div>

                          <h3 className="mt-2 text-xl font-bold tracking-tight text-white group-hover:text-[#9B8AFB] transition-colors sm:text-2xl font-[family-name:var(--font-manrope)]">
                            {item.role}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-zinc-300 font-[family-name:var(--font-inter)]">
                            {item.org}
                          </p>

                          <div
                            className={`mt-4 pt-3 flex items-center justify-between text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors font-[family-name:var(--font-inter)] ${
                              isLeft ? "sm:flex-row-reverse" : ""
                            }`}
                          >
                            <span>Click to inspect dossier</span>
                            <ArrowUpRight className="size-3.5 text-[#8B5CF6] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Navigation Control Pill */}
          <div className="relative z-30 flex shrink-0 items-center justify-center pb-2">
            <button
              onMouseEnter={() => playHoverTick("far")}
              onClick={() => {
                if (activeIndex >= N - 1) {
                  playSelectPing(1.4);
                  jumpToIndex(0);
                  return;
                }

                if (!confirmSkip) {
                  playHoverTick("near");
                  setConfirmSkip(true);
                  if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
                  confirmTimeoutRef.current = setTimeout(() => {
                    setConfirmSkip(false);
                  }, 3000);
                } else {
                  playSelectPing(1.2);
                  if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
                  setConfirmSkip(false);

                  const projectsEl = document.getElementById("projects");
                  if (projectsEl) {
                    projectsEl.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className={`group flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-[family-name:var(--font-inter)] transition-all duration-300 shadow-lg cursor-pointer ${
                confirmSkip
                  ? "border-[#9B8AFB] bg-[#1a172c] text-white shadow-[#9B8AFB]/20"
                  : "border-white/10 bg-[#12131C] hover:bg-[#161826] hover:border-[#8B5CF6]/40 text-zinc-300 hover:text-white"
              }`}
            >
              {activeIndex >= N - 1 ? (
                <>
                  <span>Back to Top of Timeline</span>
                  <ChevronUp className="size-3.5 text-[#9B8AFB] transition-transform duration-300 group-hover:-translate-y-0.5" />
                </>
              ) : confirmSkip ? (
                <>
                  <span className="text-[#9B8AFB] font-medium">Click again to confirm skip</span>
                  <ChevronDown className="size-3.5 text-[#9B8AFB] animate-bounce" />
                </>
              ) : (
                <>
                  <span>Skip to Projects</span>
                  <ChevronDown className="size-3.5 text-[#9B8AFB] transition-transform duration-300 group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* Slide-over Inspection Dossier Overlay: Placed outside <section> at root level */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            onClick={() => setActiveModalItem(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0E1018] p-7 sm:p-10 text-white shadow-2xl focus:outline-none"
              tabIndex={-1}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#9B8AFB] font-[family-name:var(--font-inter)]">
                    <span>{activeModalItem.badge}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{activeModalItem.period}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-[family-name:var(--font-manrope)]">
                    {activeModalItem.role}
                  </h3>
                  <p className="text-sm font-medium text-[#8B5CF6] font-[family-name:var(--font-inter)]">
                    {activeModalItem.org}
                  </p>
                </div>

                <button
                  onClick={() => {
                    playHoverTick("mid");
                    setActiveModalItem(null);
                  }}
                  aria-label="Close details"
                  className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="mt-6 space-y-6 text-sm leading-relaxed font-light text-zinc-300 font-[family-name:var(--font-inter)]">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-medium">
                    Summary
                  </p>
                  <p className="text-zinc-200 leading-relaxed">
                    {activeModalItem.summary}
                  </p>
                </div>

                {activeModalItem.subTracks && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                      Tenure Breakdown
                    </p>
                    <div className="space-y-2.5">
                      {activeModalItem.subTracks.map((sub, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white font-semibold">{sub.title}</span>
                            <span className="text-[#9B8AFB]">{sub.period}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-light">{sub.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeModalItem.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="size-1 rounded-full bg-[#8B5CF6] mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    Direct Contributions
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeModalItem.contributions.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <span className="size-1 rounded-full bg-[#9B8AFB] mt-2 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    Documented Outcomes
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeModalItem.outcomes.map((out, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="size-3.5 text-[#8B5CF6] mt-0.5 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 flex items-center justify-between text-xs text-zinc-500 font-[family-name:var(--font-inter)]">
                <span>Press Escape or click outside to dismiss</span>
                <button
                  onClick={() => {
                    playHoverTick("mid");
                    setActiveModalItem(null);
                  }}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}