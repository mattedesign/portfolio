// Transformation item data with abstract shapes
const TRANSFORM_ITEMS = [
  {
    id: 'document',
    before: {
      shapes: [
        { type: 'rect', x: 20, y: 15, w: 60, h: 8, opacity: 0.3 },
        { type: 'rect', x: 20, y: 28, w: 45, h: 6, opacity: 0.2 },
        { type: 'rect', x: 20, y: 40, w: 55, h: 6, opacity: 0.15 },
        { type: 'circle', x: 75, y: 55, r: 12, opacity: 0.2 },
      ],
      labels: [
        { text: 'OCR?', x: 85, y: 20, size: 9 },
        { text: 'vendor?', x: 10, y: 70, size: 8 },
        { text: '$ ???', x: 50, y: 85, size: 10 },
      ]
    },
    after: {
      chars: 'invoice ACME $12,450 0.97 vendor type amount conf'.split('')
    }
  },
  {
    id: 'design',
    before: {
      shapes: [
        { type: 'rect', x: 15, y: 20, w: 70, h: 45, opacity: 0.15, rounded: true },
        { type: 'circle', x: 30, y: 35, r: 8, opacity: 0.25 },
        { type: 'rect', x: 45, y: 30, w: 30, h: 4, opacity: 0.2 },
        { type: 'rect', x: 45, y: 38, w: 20, h: 4, opacity: 0.15 },
      ],
      labels: [
        { text: 'a11y?', x: 75, y: 25, size: 8 },
        { text: 'convert?', x: 5, y: 75, size: 9 },
        { text: 'UX??', x: 60, y: 80, size: 10 },
      ]
    },
    after: {
      chars: 'WCAG AA 78 ROI +$24k pass convert audit score'.split('')
    }
  },
  {
    id: 'broker',
    before: {
      shapes: [
        { type: 'line', x1: 15, y1: 60, x2: 30, y2: 40, opacity: 0.3 },
        { type: 'line', x1: 30, y1: 40, x2: 50, y2: 50, opacity: 0.25 },
        { type: 'line', x1: 50, y1: 50, x2: 70, y2: 25, opacity: 0.3 },
        { type: 'line', x1: 70, y1: 25, x2: 85, y2: 35, opacity: 0.2 },
        { type: 'circle', x: 50, y: 50, r: 4, opacity: 0.4 },
      ],
      labels: [
        { text: 'pattern?', x: 5, y: 25, size: 8 },
        { text: 'risk??', x: 65, y: 70, size: 9 },
        { text: 'action?', x: 25, y: 85, size: 8 },
      ]
    },
    after: {
      chars: 'Chen escalate coach $8,200 pattern risk action ROI'.split('')
    }
  },
  {
    id: 'signals',
    before: {
      shapes: [
        { type: 'circle', x: 25, y: 35, r: 15, opacity: 0.15 },
        { type: 'circle', x: 55, y: 40, r: 18, opacity: 0.12 },
        { type: 'circle', x: 40, y: 55, r: 12, opacity: 0.18 },
        { type: 'rect', x: 70, y: 20, w: 20, h: 3, opacity: 0.2 },
        { type: 'rect', x: 70, y: 26, w: 15, h: 3, opacity: 0.15 },
      ],
      labels: [
        { text: 'spatial', x: 5, y: 20, size: 7 },
        { text: 'behavior', x: 55, y: 80, size: 7 },
        { text: 'compound?', x: 5, y: 85, size: 9 },
      ]
    },
    after: {
      chars: '4 sources 0.89 specialist route context explain'.split('')
    }
  },
  {
    id: 'feedback',
    before: {
      shapes: [
        { type: 'rect', x: 10, y: 25, w: 35, h: 20, opacity: 0.2, rounded: true },
        { type: 'rect', x: 55, y: 35, w: 30, h: 15, opacity: 0.15, rounded: true },
        { type: 'rect', x: 25, y: 55, w: 40, h: 18, opacity: 0.18, rounded: true },
      ],
      labels: [
        { text: 'it depends', x: 50, y: 20, size: 8 },
        { text: 'unclear', x: 5, y: 80, size: 9 },
        { text: 'mixed?', x: 65, y: 75, size: 8 },
      ]
    },
    after: {
      chars: '72% checkout fix +18% sentiment pain impact step'.split('')
    }
  }
];

// Generate character positions for chaos layer
// Characters are spread across the card and converge toward scan line as scanning progresses
function getCharacterPosition(charIndex, clipPercent, seed) {
  // Consistent random offset based on seed
  const hash = (seed * 31 + charIndex * 17) % 100;
  const hash2 = (seed * 13 + charIndex * 29) % 100;

  // Base position spread across the card (will be clipped by chaos layer)
  const baseX = 10 + (hash % 80); // 10-90% across card
  const y = 10 + (hash2 % 80);

  // As scanning progresses, characters converge toward the scan line
  // Scan line is at (100 - clipPercent)% from the left (right edge of visible chaos)
  const scanLineX = 100 - clipPercent;
  const convergeFactor = Math.min(1, clipPercent / 100);

  // Characters move toward scan line as it approaches them
  const x = baseX + (scanLineX - baseX) * convergeFactor * 0.5;

  // Characters that would be past the clip line are about to be "absorbed"
  // Make them more intense as they approach the line
  const distanceToLine = Math.abs(x - scanLineX);
  const nearLineBoost = distanceToLine < 20 ? (1 - distanceToLine / 20) * 0.3 : 0;
  const opacity = 0.6 + nearLineBoost;

  return {
    x,
    y,
    opacity,
    size: 7 + (hash % 5)
  };
}

// SVG shape renderer
function BeforeShape({ shape }) {
  const baseStyle = { fill: '#f6f8ed', opacity: shape.opacity };

  if (shape.type === 'rect') {
    return (
      <rect
        x={`${shape.x}%`}
        y={`${shape.y}%`}
        width={`${shape.w}%`}
        height={`${shape.h}%`}
        rx={shape.rounded ? 4 : 0}
        style={baseStyle}
      />
    );
  }
  if (shape.type === 'circle') {
    return (
      <circle
        cx={`${shape.x}%`}
        cy={`${shape.y}%`}
        r={`${shape.r}%`}
        style={baseStyle}
      />
    );
  }
  if (shape.type === 'line') {
    return (
      <line
        x1={`${shape.x1}%`}
        y1={`${shape.y1}%`}
        x2={`${shape.x2}%`}
        y2={`${shape.y2}%`}
        stroke="#f6f8ed"
        strokeWidth="2"
        strokeOpacity={shape.opacity}
        strokeLinecap="round"
      />
    );
  }
  return null;
}

export function TransformItem({ itemIndex, clipPercent = 0 }) {
  const item = TRANSFORM_ITEMS[itemIndex % TRANSFORM_ITEMS.length];

  return (
    <div className="relative w-[160px] h-[120px] md:w-[200px] md:h-[140px] flex-shrink-0" style={{ overflow: 'visible' }}>
      {/* BASE LAYER: Structure (shapes card) - revealed on the RIGHT as scanning progresses */}
      <div className="absolute inset-0 bg-[#2a2c2e] rounded-xl overflow-hidden">
        {/* Abstract shapes representing structured output */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {item.before.shapes.map((shape, i) => (
            <BeforeShape key={i} shape={shape} />
          ))}
        </svg>

        {/* Floating labels */}
        {item.before.labels.map((label, i) => (
          <span
            key={i}
            className="absolute font-mono text-[#f6f8ed]/30 italic"
            style={{
              left: `${label.x}%`,
              top: `${label.y}%`,
              fontSize: `${label.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {label.text}
          </span>
        ))}
      </div>

      {/* TOP LAYER: Chaos (scattered characters) - clips from RIGHT as scanning progresses */}
      {/* Visible on LEFT (unscanned portion), clipped away on RIGHT (scanned portion) */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          // Clip from the RIGHT side - hiding scanned portion, showing unscanned chaos on left
          clipPath: `inset(0 ${clipPercent}% 0 0)`
        }}
      >
        <div className="absolute inset-0 bg-[#1a1c1e]">
          {item.after.chars.map((char, i) => {
            const pos = getCharacterPosition(i, clipPercent, itemIndex);
            return (
              <span
                key={i}
                className="absolute font-mono text-[#e07b5d]"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  opacity: pos.opacity,
                  fontSize: `${pos.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { TRANSFORM_ITEMS };
export default TransformItem;
