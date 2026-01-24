import { forwardRef } from 'react';
import './ShinyButton.css';

const ShinyButton = forwardRef(function ShinyButton({ children, onClick, className = '' }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`shiny-cta ${className}`}
    >
      <span>{children}</span>
    </button>
  );
});

export default ShinyButton;
