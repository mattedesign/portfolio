import StackedCard from './components/StackedCard';
import IntroCard from './components/cards/IntroCard';
import ProblemCard from './components/cards/ProblemCard';
import DifferentiatorCard from './components/cards/DifferentiatorCard';
import EvolutionCard from './components/cards/EvolutionCard';
import SystemsCard from './components/cards/SystemsCard';
import EnterpriseCard from './components/cards/EnterpriseCard';
import OperatingModelCard from './components/cards/OperatingModelCard';
import WhyCard from './components/cards/WhyCard';
import AnalyzerCard from './components/cards/AnalyzerCard';
import ContactCard from './components/cards/ContactCard';
import CTAFooter from './components/CTAFooter';

export default function App() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    <IntroCard key="intro" />,
    <ProblemCard key="problem" />,
    <DifferentiatorCard key="differentiator" />,
    <EvolutionCard key="evolution" />,
    <SystemsCard key="systems" />,
    <EnterpriseCard key="enterprise" />,
    <OperatingModelCard key="operating-model" />,
    <WhyCard key="why" />,
    <AnalyzerCard key="analyzer" />,
    <ContactCard key="contact" />,
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0c] relative overflow-x-hidden">
      {/* Mobile CTA - fixed at bottom with coral accent */}
      <button
        onClick={scrollToAnalyzer}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1e] border border-[#e07b5d]/40 text-[#f6f8ed] px-5 py-3 rounded-full shadow-xl flex items-center gap-2 font-medium text-sm"
        style={{
          boxShadow: '0 0 30px rgba(224, 123, 93, 0.2), 0 4px 15px rgba(0,0,0,0.4)'
        }}
      >
        <span className="text-[#e07b5d]">⚡</span>
        <span>Analyze Fit</span>
      </button>

      {/* Stacked cards section */}
      <div className="px-4 pt-4 relative">
        {cards.map((card, index) => (
          <StackedCard
            key={index}
            index={index}
            totalCards={cards.length}
            showPeekTab={true}
            peekTabIntensity={0.5}
            onPeekTabClick={scrollToAnalyzer}
          >
            {card}
          </StackedCard>
        ))}
      </div>

      {/* Footer CTA section - the destination */}
      <CTAFooter onAnalyzeClick={scrollToAnalyzer} />
    </div>
  );
}
