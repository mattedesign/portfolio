import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import StackedCard from './components/StackedCard';
import IntroCard from './components/cards/IntroCard';
import AppliedIntelligenceCard from './components/cards/AppliedIntelligenceCard';
import ExperienceCard from './components/cards/ExperienceCard';
import ProjectsCard from './components/cards/ProjectsCard';
import AnalyzerCard from './components/cards/AnalyzerCard';
import ContactCard from './components/cards/ContactCard';

export default function App() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    <IntroCard key="intro" />,
    <AppliedIntelligenceCard key="intelligence" />,
    <ExperienceCard key="experience" />,
    <ProjectsCard key="projects" />,
    <AnalyzerCard key="analyzer" />,
    <ContactCard key="contact" />,
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0c] relative overflow-x-hidden">
      {/* Floating Analyzer Button */}
      <motion.button
        initial={{ opacity: 0, x: 40 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 2,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={scrollToAnalyzer}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-[#f6f8ed] text-[#1a1c1e] px-3 py-4 rounded-full shadow-xl hover:bg-white transition-colors flex items-center gap-1.5 font-medium text-xs tracking-wide"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            delay: 3,
            duration: 0.6,
            repeat: 2,
            repeatDelay: 0.3
          }}
        >
          <Zap size={14} className="rotate-90" />
        </motion.div>
        <span>Analyze Fit</span>
      </motion.button>

      {/* Stacked cards section */}
      <div className="px-4 pt-4 relative">
        {cards.map((card, index) => (
          <StackedCard key={index} index={index} totalCards={cards.length}>
            {card}
          </StackedCard>
        ))}
      </div>
    </div>
  );
}
