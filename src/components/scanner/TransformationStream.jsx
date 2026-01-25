import { useRef, useEffect, useState, useCallback } from 'react';
import { TransformItem, TRANSFORM_ITEMS } from './TransformItem';

export default function TransformationStream({ onScanningChange, height = 140 }) {
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [itemClips, setItemClips] = useState({});

  const speed = 60; // pixels per second
  const itemWidth = 220; // width + gap

  const updateClipPercents = useCallback(() => {
    const container = containerRef.current;
    const stream = streamRef.current;
    if (!container || !stream) return;

    const containerRect = container.getBoundingClientRect();
    const scannerCenter = containerRect.left + containerRect.width / 2;

    let anyScanningActive = false;
    const newClips = {};

    // Get all item wrappers
    const items = stream.querySelectorAll('[data-item-index]');
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemLeft = rect.left;
      const itemRight = rect.right;
      const itemWidthPx = rect.width;
      const index = item.getAttribute('data-item-index');

      // Items move RIGHT → LEFT
      // clipPercent = how much has passed through scanner (0-100)
      // scannedAmount = portion to the LEFT of scanner center
      if (itemLeft >= scannerCenter) {
        // Card is fully to the RIGHT of scanner - not yet scanned
        newClips[index] = 0;
      } else if (itemRight <= scannerCenter) {
        // Card is fully to the LEFT of scanner - fully scanned
        newClips[index] = 100;
      } else {
        // Card is crossing the scanner - calculate progressive clip
        anyScanningActive = true;
        const scannedAmount = scannerCenter - itemLeft;
        const clipPercent = Math.max(0, Math.min(100, (scannedAmount / itemWidthPx) * 100));
        newClips[index] = clipPercent;
      }
    });

    setItemClips(newClips);

    if (onScanningChange) {
      onScanningChange(anyScanningActive);
    }
  }, [onScanningChange]);

  const animate = useCallback((timestamp) => {
    const container = containerRef.current;
    const stream = streamRef.current;
    if (!container || !stream) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Delta time for smooth animation regardless of frame rate
    const deltaTime = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = timestamp;

    // Move position - items scroll RIGHT to LEFT (enter from right, exit left)
    positionRef.current += speed * deltaTime;

    // Seamless loop
    const oneSetWidth = TRANSFORM_ITEMS.length * itemWidth;
    if (positionRef.current >= oneSetWidth) {
      positionRef.current = positionRef.current % oneSetWidth;
    }

    // Items move left - use negative translateX so items enter from right side
    stream.style.transform = `translateX(${-positionRef.current}px)`;

    // Update clip percentages
    updateClipPercents();

    animationRef.current = requestAnimationFrame(animate);
  }, [updateClipPercents]);

  useEffect(() => {
    // Start position
    positionRef.current = 0;
    lastTimeRef.current = 0;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Generate items (3 sets for seamless loop)
  const items = [];
  for (let set = 0; set < 3; set++) {
    for (let i = 0; i < TRANSFORM_ITEMS.length; i++) {
      const globalIndex = `${set}-${i}`;
      items.push(
        <div
          key={globalIndex}
          data-item-index={globalIndex}
          className="flex-shrink-0"
          style={{ width: itemWidth - 20, marginRight: 20 }}
        >
          <TransformItem
            itemIndex={i}
            clipPercent={itemClips[globalIndex] ?? 0}
          />
        </div>
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div
        ref={streamRef}
        className="flex items-center absolute left-0 top-0 h-full"
        style={{ willChange: 'transform' }}
      >
        {items}
      </div>
    </div>
  );
}
