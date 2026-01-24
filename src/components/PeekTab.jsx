import { Zap } from 'lucide-react';
import './ui/ShinyButton.css';

export default function PeekTab({ onClick, intensity = 1 }) {
  // Intensity controls how prominent the tab is (0-1)
  // Higher intensity = larger tab, more glow
  const tabHeight = 28 + (intensity * 12); // 28-40px
  const glowOpacity = 0.15 + (intensity * 0.25); // 0.15-0.4

  return (
    <button
      onClick={onClick}
      className="shiny-cta-tab group"
      style={{
        '--glow-opacity': glowOpacity,
        height: `${tabHeight}px`,
      }}
    >
      <span className="flex items-center gap-2">
        <Zap size={14} className="text-[#e07b5d]" />
        <span className="text-sm font-medium">Analyze Fit</span>
      </span>
    </button>
  );
}
