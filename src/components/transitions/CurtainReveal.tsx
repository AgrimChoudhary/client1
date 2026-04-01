import React, { useEffect, useState, useMemo } from 'react';

interface CurtainRevealProps {
  onComplete: () => void;
  onDone?: () => void;
}

/**
 * PREMIUM CURTAIN REVEAL — Cinematic Indian Wedding Entrance
 * 
 * KEY DESIGN: This curtain sits at z-50, physically covering the content below (z-10).
 * Content behind the curtain is fully visible (opacity:1) from the start.
 * As curtain slides open, content is physically revealed — like a real curtain.
 * 
 * Timeline:
 * 0ms:    Curtains closed, fabric shimmer active
 * 200ms:  onComplete fires → content mounts behind curtain (invisible to user)
 * 900ms:  Curtains start opening (3.5s CSS animation)
 * ~1200ms: Center gap appears, first glimpse of content behind
 * ~2500ms: Curtain ~50% open, center content clearly visible
 * ~4400ms: Curtain fully off screen
 * 7000ms:  onDone fires → parent removes CurtainReveal from DOM
 */
const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete, onDone }) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed');

  // Sparkle particles for the golden burst
  const sparkles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 20;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i + (Math.random() * 15 - 7.5),
      distance: 30 + Math.random() * 50,
      size: 2 + Math.random() * 3,
      delay: 0.2 + Math.random() * 0.6,
      duration: 1.2 + Math.random() * 0.8,
      color: ['#D4AF37', '#C8A45C', '#FFE066', '#F4C430'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  useEffect(() => {
    // Fire onComplete VERY early — content mounts behind curtain immediately
    // Content is fully visible (opacity:1) but physically hidden behind curtain (z-50)
    const t0 = setTimeout(() => onComplete(), 200);
    // Phase 1: Anticipation pause, then curtain starts opening
    const t1 = setTimeout(() => setPhase('opening'), 900);
    // Mark as done and notify parent after animation fully completes
    const t3 = setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, 7000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t3); };
  }, [onComplete, onDone]);

  if (phase === 'done') return null;

  const isOpening = phase === 'opening';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">

      {/* ── Golden light burst from center ── */}
      <div
        className={`absolute inset-0 curtain-glow-layer ${isOpening ? 'curtain-glow-expand' : ''}`}
      />

      {/* ── Center golden sparkle burst ── */}
      {isOpening && (
        <div className="absolute inset-0 z-[51] pointer-events-none">
          {sparkles.map((s) => {
            const rad = (s.angle * Math.PI) / 180;
            const vw = typeof window !== 'undefined' ? window.innerWidth : 400;
            const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
            const endX = Math.cos(rad) * s.distance * (vw / 100);
            const endY = Math.sin(rad) * s.distance * (vh / 100);
            return (
              <div
                key={s.id}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: s.size,
                  height: s.size,
                  backgroundColor: s.color,
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
                  opacity: 0,
                  transform: 'translate(-50%, -50%) translate3d(0, 0, 0)',
                  animation: `sparkle-burst ${s.duration}s cubic-bezier(0.22, 0.61, 0.36, 1) ${s.delay}s forwards`,
                  ['--sparkle-x' as string]: `${endX}px`,
                  ['--sparkle-y' as string]: `${endY}px`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ── Left curtain ── */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full curtain-panel curtain-panel-left ${isOpening ? 'curtain-animate-left' : ''}`}
      >
        {/* Fabric folds with shimmer */}
        <div className="absolute inset-0 curtain-folds-left" />
        {/* Subtle fabric shimmer before opening */}
        <div className={`absolute inset-0 curtain-fabric-shimmer ${!isOpening ? 'active' : ''}`} />
        {/* Gold embroidery border on inner edge */}
        <div className="absolute top-0 right-0 w-[3px] h-full curtain-gold-trim" />
        <div className="absolute top-0 right-[6px] w-[1px] h-full curtain-gold-trim-inner" />
        {/* Bottom drape shadow */}
        <div className="absolute bottom-0 inset-x-0 h-20 curtain-bottom-shadow" />
      </div>

      {/* ── Right curtain ── */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full curtain-panel curtain-panel-right ${isOpening ? 'curtain-animate-right' : ''}`}
      >
        <div className="absolute inset-0 curtain-folds-right" />
        <div className={`absolute inset-0 curtain-fabric-shimmer ${!isOpening ? 'active' : ''}`} />
        <div className="absolute top-0 left-0 w-[3px] h-full curtain-gold-trim" />
        <div className="absolute top-0 left-[6px] w-[1px] h-full curtain-gold-trim-inner" />
        <div className="absolute bottom-0 inset-x-0 h-20 curtain-bottom-shadow" />
      </div>

      {/* ── Center seam golden glow — fades as curtains part ── */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-full curtain-seam ${isOpening ? 'curtain-seam-fade' : ''}`}
      />

      {/* ── Top pelmet (valance) with tassels ── */}
      <div
        className={`absolute top-0 inset-x-0 h-16 md:h-20 z-[52] curtain-pelmet ${isOpening ? 'curtain-pelmet-fade' : ''}`}
      >
        {/* Gold tassel fringe */}
        <div className="absolute bottom-0 inset-x-0 h-4 curtain-tassel-fringe" />
      </div>

      {/* ── Bottom hem glow ── */}
      <div
        className={`absolute bottom-0 inset-x-0 h-8 z-[52] ${isOpening ? 'curtain-pelmet-fade' : ''}`}
        style={{
          background: 'linear-gradient(0deg, hsl(var(--curtain-dark)) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default CurtainReveal;
