import { useState, useEffect, useRef, useCallback } from 'react';

const WORDS = ['systems', 'products', 'decisions', 'revenue', 'intelligence'];

const TIMING = {
  typeSpeed: 50,        // ms per character (40-65 range)
  deleteSpeed: 25,      // ms per character (faster than typing)
  wordPause: 1000,      // pause after word complete
  transitionPause: 350, // pause between words
};

export default function TypewriterWord() {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | paused | deleting | transition
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef(null);

  const currentWord = WORDS[wordIndex];

  // Cursor breathing animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 400); // Half of 800ms for full cycle

    return () => clearInterval(blinkInterval);
  }, []);

  // Typing state machine
  const tick = useCallback(() => {
    if (phase === 'typing') {
      if (displayText.length < currentWord.length) {
        // Type next character
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        timeoutRef.current = setTimeout(tick, TIMING.typeSpeed);
      } else {
        // Word complete, pause
        setPhase('paused');
        timeoutRef.current = setTimeout(tick, TIMING.wordPause);
      }
    } else if (phase === 'paused') {
      // Start deleting
      setPhase('deleting');
      timeoutRef.current = setTimeout(tick, TIMING.deleteSpeed);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        // Delete character
        setDisplayText(displayText.slice(0, -1));
        timeoutRef.current = setTimeout(tick, TIMING.deleteSpeed);
      } else {
        // Deletion complete, transition
        setPhase('transition');
        timeoutRef.current = setTimeout(tick, TIMING.transitionPause);
      }
    } else if (phase === 'transition') {
      // Move to next word
      setWordIndex((wordIndex + 1) % WORDS.length);
      setPhase('typing');
      timeoutRef.current = setTimeout(tick, TIMING.typeSpeed);
    }
  }, [phase, displayText, currentWord, wordIndex]);

  // Start the animation loop
  useEffect(() => {
    timeoutRef.current = setTimeout(tick, TIMING.typeSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  // Calculate if we're at the start of a new word (for animation)
  const isNewWord = phase === 'typing' && displayText.length <= 1;

  return (
    <span className="relative inline-flex items-baseline">
      <span
        className="text-[#e07b5d]"
        style={{
          opacity: phase === 'deleting' ? 0.85 : 1,
          transform: isNewWord ? 'translateY(2px)' : 'translateY(0)',
          transition: 'opacity 120ms linear, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {displayText}
      </span>
      <span
        className="text-[#e07b5d] ml-[2px] font-light"
        style={{
          opacity: cursorVisible ? 0.8 : 0,
          transition: 'opacity 400ms ease-in-out',
        }}
      >
        |
      </span>
    </span>
  );
}
