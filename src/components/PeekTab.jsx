import { Zap } from 'lucide-react';
import './ui/ShinyButton.css';

export default function PeekTab({ onClick, variant = 'dark' }) {
  // variant: 'dark' = dark tab (for light cards), 'light' = light tab (for dark cards)
  const isDark = variant === 'dark';

  return (
    <button
      onClick={onClick}
      className={`shiny-cta-tab ${isDark ? 'shiny-cta-tab--dark' : 'shiny-cta-tab--light'}`}
    >
      <span className="flex items-center gap-2">
        <Zap size={14} />
        <span className="text-sm font-medium">Analyze Fit</span>
      </span>
    </button>
  );
}
