import { motion } from 'framer-motion';
import StackedCard from './components/StackedCard';
import IntroCard from './components/cards/IntroCard';
import AppliedIntelligenceCard from './components/cards/AppliedIntelligenceCard';
import ExperienceCard from './components/cards/ExperienceCard';
import ProjectsCard from './components/cards/ProjectsCard';
import AnalyzerCard from './components/cards/AnalyzerCard';
import ContactCard from './components/cards/ContactCard';

export default function App() {
  const cards = [
    <IntroCard key="intro" />,
    <AppliedIntelligenceCard key="intelligence" />,
    <ExperienceCard key="experience" />,
    <ProjectsCard key="projects" />,
    <AnalyzerCard key="analyzer" />,
    <ContactCard key="contact" />,
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0c] relative">
      {/* Hero section - scroll indicator */}
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
            className="text-[clamp(12px,1.2vw,18px)] text-white/60 mb-4 tracking-wide uppercase"
          >
            Portfolio 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-extrabold text-[clamp(36px,10vw,120px)] text-white leading-[1.1] tracking-[-0.04em] mb-6"
          >
            Scroll to Explore
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[clamp(14px,1.5vw,24px)] text-white/80 max-w-[600px] mx-auto leading-[1.6]"
          >
            Experience the story through interactive stacked cards
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1 h-2 bg-white/60 rounded-full"
              />
            </motion.div>
          </motion.div>
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
