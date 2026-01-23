import { motion } from "motion/react";
import StackedCard from "@/app/components/StackedCard";
import IntroCard from "@/app/components/IntroCard";
import AppliedIntelligenceCard from "@/app/components/AppliedIntelligenceCard";
import ExperienceCard from "@/app/components/ExperienceCard";
import SkillsCard from "@/app/components/SkillsCard";
import ProjectsCard from "@/app/components/ProjectsCard";
import ProcessCard from "@/app/components/ProcessCard";
import PhilosophyCard from "@/app/components/PhilosophyCard";
import ContactCard from "@/app/components/ContactCard";

export default function App() {
  const cards = [
    <IntroCard />,
    <AppliedIntelligenceCard />,
    <ExperienceCard />,
    <SkillsCard />,
    <ProjectsCard />,
    <ProcessCard />,
    <PhilosophyCard />,
    <ContactCard />,
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0c] relative">
      {/* Hero section - not stacked */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex items-center justify-center px-4"
      >
        <div className="text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-['Instrument_Sans',sans-serif] text-[clamp(14px,1.2vw,18px)] text-white/60 mb-4 tracking-wide uppercase"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Portfolio 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(40px,10vw,120px)] text-white leading-[1.1] tracking-[-0.04em] mb-6"
          >
            Scroll to Explore
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.5vw,24px)] text-white/80 max-w-[600px] mx-auto leading-[1.6]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Experience the story through interactive stacked cards
          </motion.p>
        </div>
      </motion.div>

      {/* Stacked cards section */}
      <div className="px-4 pb-[100vh] relative">
        <div className="max-w-[1600px] mx-auto space-y-[40px]">
          {cards.map((card, index) => (
            <StackedCard key={index} index={index} totalCards={cards.length}>
              {card}
            </StackedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
