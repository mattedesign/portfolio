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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToAnalyzer}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-[#f6f8ed] text-[#1a1c1e] px-4 py-3 rounded-full shadow-lg hover:bg-white transition-colors flex items-center gap-2 font-medium text-sm"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <Zap size={16} className="rotate-90" />
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
