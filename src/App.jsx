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
    <div className="min-h-screen bg-[#0a0b0c] relative overflow-x-hidden">
      {/* Hero section with glowing orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex items-center justify-center px-4 relative"
      >
        {/* Animated glowing orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[clamp(12px,1.2vw,18px)] text-white/60 mb-4 tracking-wide uppercase"
          >
            Portfolio 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-extrabold text-[clamp(36px,10vw,120px)] text-white leading-[1.1] tracking-[-0.04em] mb-6"
          >
            Matt Brown
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[clamp(14px,1.5vw,24px)] text-white/70 max-w-[700px] mx-auto leading-[1.6]"
          >
            Principal Product Architect bridging boardroom strategy and engineering reality. 18+ years shipping products across AI, FinTech, and Enterprise.
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

      {/* Stacked cards section - edge to edge */}
      <div className="px-4 pb-[50vh] relative">
        <div>
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
