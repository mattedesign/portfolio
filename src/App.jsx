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

export default function App() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cards with their peek tab variants
  // 'light' tab for dark cards, 'dark' tab for light cards
  const cards = [
    { component: <IntroCard key="intro" />, tabVariant: 'light' },           // dark card
    { component: <ProblemCard key="problem" />, tabVariant: 'dark' },        // light card
    { component: <DifferentiatorCard key="differentiator" />, tabVariant: 'light' }, // dark green card
    { component: <EvolutionCard key="evolution" />, tabVariant: 'light' },   // dark card
    { component: <SystemsCard key="systems" />, tabVariant: 'dark' },        // light card
    { component: <EnterpriseCard key="enterprise" />, tabVariant: 'light' }, // dark card
    { component: <OperatingModelCard key="operating-model" />, tabVariant: 'dark' }, // light card
    { component: <WhyCard key="why" />, tabVariant: 'light' },               // coral card (dark text area)
    { component: <AnalyzerCard key="analyzer" />, tabVariant: null },        // no tab - it's the destination
    { component: <ContactCard key="contact" />, tabVariant: null },          // no tab - last card
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0c] relative overflow-x-hidden">
      {/* Mobile CTA - fixed at bottom with coral accent */}
      <button
        onClick={scrollToAnalyzer}
        className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1e] border border-[#e07b5d]/40 text-[#f6f8ed] px-5 py-3 rounded-full shadow-xl flex items-center gap-2 font-medium text-sm"
        style={{
          boxShadow: '0 0 30px rgba(224, 123, 93, 0.2), 0 4px 15px rgba(0,0,0,0.4)'
        }}
      >
        <span className="text-[#e07b5d]">⚡</span>
        <span>Analyze Fit</span>
      </button>

      {/* Stacked cards section */}
      <div className="px-4 pt-4 pb-4 relative">
        {cards.map((card, index) => (
          <StackedCard
            key={index}
            index={index}
            totalCards={cards.length}
            showPeekTab={card.tabVariant !== null}
            peekTabVariant={card.tabVariant || 'dark'}
            onPeekTabClick={scrollToAnalyzer}
          >
            {card.component}
          </StackedCard>
        ))}
      </div>
    </div>
  );
}
