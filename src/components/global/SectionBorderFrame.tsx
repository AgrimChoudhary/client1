import React from 'react';

interface SectionBorderFrameProps {
  active: boolean;
  variant?: 'standard' | 'royal';
  className?: string;
}

/* Corner Flourish SVG — ornate leaf/paisley motif */
const CornerOrnament: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; variant: 'standard' | 'royal' }> = ({ position, variant }) => {
  const rotations = { tl: '0', tr: '90', br: '180', bl: '270' };
  const positions = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  };

  return (
    <div
      className={`absolute ${positions[position]} w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 pointer-events-none section-corner`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full"
        style={{ transform: `rotate(${rotations[position]}deg)` }}
      >
        {/* Main curve */}
        <path
          d="M4,4 C4,4 4,24 12,36 C20,48 40,56 56,58"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.2"
          opacity="0.35"
          strokeLinecap="round"
        />
        {/* Inner curve */}
        <path
          d="M4,4 C6,16 12,28 22,38 C30,46 44,52 56,56"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.6"
          opacity="0.2"
          strokeLinecap="round"
        />
        {/* Leaf detail */}
        <ellipse cx="18" cy="18" rx="4" ry="8" fill="hsl(var(--primary))" opacity="0.08" transform="rotate(-45 18 18)" />
        {/* Corner dot */}
        <circle cx="6" cy="6" r="2.5" fill="hsl(var(--primary))" opacity="0.3" />
        {/* Small accent dots */}
        <circle cx="4" cy="16" r="1.2" fill="hsl(var(--primary))" opacity="0.15" />
        <circle cx="16" cy="4" r="1.2" fill="hsl(var(--primary))" opacity="0.15" />

        {variant === 'royal' && (
          <>
            {/* Extra paisley for royal */}
            <path
              d="M8,8 C10,14 14,20 20,24"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.4"
              opacity="0.15"
            />
            <ellipse cx="28" cy="28" rx="3" ry="5" fill="hsl(var(--primary))" opacity="0.06" transform="rotate(-40 28 28)" />
            {/* Tiny diamond */}
            <path d="M10,10 L12,8 L14,10 L12,12 Z" fill="hsl(var(--primary))" opacity="0.2" />
          </>
        )}
      </svg>
    </div>
  );
};

/* Corner diamond — sits at the junction of edge lines */
const CornerDiamond: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const positions = {
    tl: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    tr: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    bl: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    br: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  };

  return (
    <div className={`absolute ${positions[position]} pointer-events-none`} aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M5 0L7.5 5L5 10L2.5 5Z" fill="hsl(var(--primary))" opacity="0.3" />
      </svg>
    </div>
  );
};

const SectionBorderFrame: React.FC<SectionBorderFrameProps> = ({ active, variant = 'standard', className = '' }) => {
  return (
    <div
      className={`fixed inset-2 md:inset-4 lg:inset-6 pointer-events-none z-[2] ${className}`}
      aria-hidden="true"
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      {/* ── Edge Lines ── */}
      {/* Top */}
      <div
        className="absolute top-0 left-10 right-10 md:left-14 md:right-14 lg:left-16 lg:right-16 h-px section-edge-line"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${variant === 'royal' ? '0.35' : '0.25'}) 20%, hsl(var(--primary) / ${variant === 'royal' ? '0.5' : '0.35'}) 50%, hsl(var(--primary) / ${variant === 'royal' ? '0.35' : '0.25'}) 80%, transparent)`,
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.2s both' : 'none',
        }}
      />
      {/* Bottom */}
      <div
        className="absolute bottom-0 left-10 right-10 md:left-14 md:right-14 lg:left-16 lg:right-16 h-px section-edge-line"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 20%, hsl(var(--primary) / ${variant === 'royal' ? '0.4' : '0.3'}) 50%, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 80%, transparent)`,
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.3s both' : 'none',
        }}
      />
      {/* Left */}
      <div
        className="absolute left-0 top-10 bottom-10 md:top-14 md:bottom-14 lg:top-16 lg:bottom-16 w-px section-edge-line"
        style={{
          background: `linear-gradient(180deg, transparent, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 20%, hsl(var(--primary) / ${variant === 'royal' ? '0.4' : '0.3'}) 50%, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 80%, transparent)`,
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.25s both' : 'none',
        }}
      />
      {/* Right */}
      <div
        className="absolute right-0 top-10 bottom-10 md:top-14 md:bottom-14 lg:top-16 lg:bottom-16 w-px section-edge-line"
        style={{
          background: `linear-gradient(180deg, transparent, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 20%, hsl(var(--primary) / ${variant === 'royal' ? '0.4' : '0.3'}) 50%, hsl(var(--primary) / ${variant === 'royal' ? '0.3' : '0.2'}) 80%, transparent)`,
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.35s both' : 'none',
        }}
      />

      {/* ── Corner Ornaments ── */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <CornerOrnament key={pos} position={pos} variant={variant} />
      ))}

      {/* ── Corner Diamonds ── */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <CornerDiamond key={`d-${pos}`} position={pos} />
      ))}

      {/* Royal variant: corner glow pulse */}
      {variant === 'royal' && active && (
        <>
          {(['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'] as const).map((pos, i) => (
            <div
              key={`glow-${i}`}
              className={`absolute ${pos} w-8 h-8 md:w-12 md:h-12 rounded-full pointer-events-none`}
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
                animation: `corner-glow-pulse 3s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default SectionBorderFrame;
