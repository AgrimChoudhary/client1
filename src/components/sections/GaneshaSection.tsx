import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ganeshaImg from '@/assets/ganesha.webp';
import templeBgMobile from '@/assets/temple-bg-mobile.jpg';
import templeBgDesktop from '@/assets/temple-bg-desktop.jpg';
import PeacockCorner from '@/components/global/PeacockCorner';

interface GaneshaSectionProps {
  curtainOpen: boolean;
  onBeginClick: () => void;
  visited: boolean;
  fading?: boolean;
  guestName: string;
}

/* ═══════════════════════════════════════════════
   ANIMATED DIYA LAMP — Flickering flame with glow
   ═══════════════════════════════════════════════ */
const AnimatedDiya: React.FC<{ side: 'left' | 'right'; delay?: number }> = ({ side, delay = 0 }) => (
  <div className="relative flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
    <div
      className="absolute -top-3 w-12 h-12 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, hsl(38 80% 55% / 0.3) 0%, hsl(38 80% 55% / 0.08) 50%, transparent 70%)',
        animation: `diya-glow-pulse 2.5s ease-in-out ${delay}s infinite`,
        filter: 'blur(3px)',
      }}
    />
    <svg width="14" height="20" viewBox="0 0 18 26" className="relative z-10">
      <defs>
        <linearGradient id={`flame-${side}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="40%" stopColor="#F4C430" />
          <stop offset="80%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#FFFBE6" />
        </linearGradient>
      </defs>
      <path
        d="M9 2C9 2 4 8 4 13C4 16.5 6.2 19 9 19C11.8 19 14 16.5 14 13C14 8 9 2 9 2Z"
        fill={`url(#flame-${side})`}
        opacity="0.9"
        style={{ animation: `diya-flame 1.8s ease-in-out ${delay}s infinite`, transformOrigin: '9px 19px' }}
      />
      <ellipse cx="9" cy="14" rx="2.5" ry="4" fill="#FFFBE6" opacity="0.6"
        style={{ animation: `diya-flame 2.2s ease-in-out ${delay + 0.3}s infinite`, transformOrigin: '9px 19px' }}
      />
    </svg>
    <svg width="26" height="12" viewBox="0 0 32 16" className="relative z-10 -mt-0.5">
      <ellipse cx="16" cy="10" rx="14" ry="5" fill="none" stroke="#C8A45C" strokeWidth="1.2" opacity="0.6" />
      <path d="M4 8C4 5 8 2 16 2C24 2 28 5 28 8" fill="none" stroke="#C8A45C" strokeWidth="1" opacity="0.5" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   SACRED LIGHT RAYS — 8 golden rays radiating behind Ganesha
   ═══════════════════════════════════════════════ */
const SacredLightRays: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none gs-sacred-rays-container">
      <div className="gs-sacred-rays" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="gs-sacred-ray"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   DIVINE SPARKLE BURST — Particles burst outward when Ganesha reveals
   ═══════════════════════════════════════════════ */
const DivineSparkleBurst: React.FC<{ active: boolean }> = ({ active }) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * 360,
      distance: 60 + Math.random() * 80,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 0.4,
      duration: 0.8 + Math.random() * 0.6,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {sparkles.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * s.distance;
        const ty = Math.sin(rad) * s.distance;
        return (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              background: 'hsl(var(--gold-primary))',
              boxShadow: '0 0 6px hsl(var(--gold-primary) / 0.8)',
              ['--tx' as string]: `${tx}px`,
              ['--ty' as string]: `${ty}px`,
              animation: `gs-sparkle-burst ${s.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${s.delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   TRANSITION PARTICLE SHOWER — Golden particles during wipe
   ═══════════════════════════════════════════════ */
const TransitionParticleShower: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 0.5,
      duration: 0.6 + Math.random() * 0.8,
      opacity: 0.4 + Math.random() * 0.6,
      driftX: -30 + Math.random() * 60,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[21] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: '-5%',
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(var(--gold-secondary)) 0%, hsl(var(--gold-primary) / 0.6) 100%)`,
            boxShadow: `0 0 ${p.size * 2}px hsl(var(--gold-primary) / 0.4)`,
            opacity: p.opacity,
            animation: `gs-particle-fall ${p.duration}s ${p.delay}s cubic-bezier(0.4, 0, 0.8, 1) forwards`,
            ['--drift-x' as string]: `${p.driftX}px`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MANDALA RING — Slowly rotating behind Ganesha
   ═══════════════════════════════════════════════ */
const GaneshaMandala: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="absolute rounded-full" style={{
      width: '130%', height: '130%',
      border: '0.5px dashed hsl(var(--gold-primary) / 0.12)',
      animation: active ? 'mandala-rotate 40s linear infinite' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out',
    }} />
    <div className="absolute rounded-full" style={{
      width: '110%', height: '110%',
      border: '0.4px dotted hsl(var(--gold-primary) / 0.1)',
      animation: active ? 'mandala-rotate 55s linear infinite reverse' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out 0.3s',
    }} />
    <div className="absolute rounded-full" style={{
      width: '155%', height: '155%',
      border: '0.3px dashed hsl(var(--gold-primary) / 0.07)',
      animation: active ? 'mandala-rotate 80s linear infinite' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out 0.6s',
    }} />
  </div>
);

/* ═══════════════════════════════════════════════
   GOLD DUST PARTICLES — Floating upward
   ═══════════════════════════════════════════════ */
const GoldDustParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${8 + Math.random() * 10}s`,
      size: `${1.5 + Math.random() * 2}px`,
      opacity: 0.12 + Math.random() * 0.18,
      driftX: `${-20 + Math.random() * 40}px`,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, bottom: '-10px',
            width: p.size, height: p.size,
            background: 'hsl(var(--gold-primary))',
            opacity: p.opacity,
            willChange: 'transform, opacity',
            ['--drift-x' as string]: p.driftX,
            animation: `ganesha-dust-rise ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ORNATE DIVIDER — Compact with lotus
   ═══════════════════════════════════════════════ */
const OrnateDivider: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="flex items-center justify-center gap-2 w-full max-w-[280px] md:max-w-[360px] my-3" aria-hidden="true">
    <div className="flex items-center gap-1.5 flex-1">
      <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}} />
    </div>
    <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary flex-shrink-0" style={{
      animation: animate ? 'ganesha-lotus-bloom 1s ease-out 0.5s both' : 'none',
    }}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="12" cy="12" rx="2.5" ry="6"
          fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5"
          transform={`rotate(${angle} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
    <div className="flex items-center gap-1.5 flex-1">
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}} />
      <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   PREMIUM ROYAL BORDER FRAME
   ═══════════════════════════════════════════════ */
const RoyalCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }> = ({ position, active }) => {
  const posClass = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }[position];

  const rotateMap = { tl: 0, tr: 90, bl: 270, br: 180 };

  return (
    <div className={`absolute ${posClass} w-8 h-8 md:w-10 md:h-10`} style={{
      opacity: active ? 1 : 0,
      transition: 'opacity 0.6s ease-out',
    }}>
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rotateMap[position]}deg)` }}>
        <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" fill="hsl(var(--primary))" opacity="0.6" />
        <path d="M0 0 L10 0 L10 1 L1 1 L1 10 L0 10 Z" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="4" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>
    </div>
  );
};

const RoyalBorderFrame: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div
      className="fixed inset-3 md:inset-5 lg:inset-6 pointer-events-none z-[2]"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
    >
      <div className="absolute top-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 20%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.2s both' : 'none',
        }} />
      <div className="absolute bottom-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.3s both' : 'none',
        }} />
      <div className="absolute left-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.25s both' : 'none',
        }} />
      <div className="absolute right-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.3s both' : 'none',
        }} />
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <RoyalCorner key={pos} position={pos} active={active} />
      ))}
      <div className="absolute top-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.4" /></svg>
      </div>
      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" /></svg>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   SHLOKA WITH WORD-BY-WORD REVEAL
   (Character reveal breaks Devanagari matras/conjuncts)
   ═══════════════════════════════════════════════ */
const ShlokaWordReveal: React.FC<{ active: boolean; text: string }> = ({ active, text }) => {
  const lines = useMemo(() => text.split('\n'), [text]);
  
  if (!active) return null;

  let wordIndex = 0;

  return (
    <p className="font-sanskrit font-medium leading-relaxed shloka-glow text-center italic"
      lang="sa" id="ganesha-heading"
      style={{ fontSize: 'clamp(16px, 3.8vw, 24px)', color: 'hsl(var(--gold-primary))', letterSpacing: '0.04em', maxWidth: '450px' }}>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\s+)/).map((segment, si) => {
            if (/^\s+$/.test(segment)) return <span key={`${li}-s-${si}`}>{segment}</span>;
            const delay = 1.0 + wordIndex * 0.18;
            wordIndex++;
            return (
              <span
                key={`${li}-w-${si}`}
                className="gs-shloka-word"
                style={{ animationDelay: `${delay}s` }}
              >
                {segment}
              </span>
            );
          })}
        </React.Fragment>
      ))}
    </p>
  );
};

/* ═══════════════════════════════════════════════
   ROYAL GUEST NAME FRAME — Decorative brackets
   ═══════════════════════════════════════════════ */
const RoyalGuestFrame: React.FC<{ name: string; active: boolean }> = ({ name, active }) => (
  <div className="gs-inv-element gs-inv-guest gs-royal-guest-frame" style={{ textAlign: 'center' }}>
    {/* Top decorative bracket */}
    <div className="gs-guest-bracket gs-guest-bracket-top" aria-hidden="true">
      <svg width="120" height="16" viewBox="0 0 120 16">
        <path d="M10 15 L10 8 Q10 3 15 3 L55 3 L60 0 L65 3 L105 3 Q110 3 110 8 L110 15"
          fill="none" stroke="hsl(var(--gold-primary))" strokeWidth="0.8" opacity="0.6" />
        <circle cx="60" cy="1" r="1.5" fill="hsl(var(--gold-primary))" opacity="0.5" />
      </svg>
    </div>

    <div className="gs-guest-name-inner">
      <span className="guest-name-text font-display gs-guest-text-large">
        {name}
      </span>
      <div className="gs-guest-name-shimmer" />
    </div>

    {/* Bottom decorative bracket */}
    <div className="gs-guest-bracket gs-guest-bracket-bottom" aria-hidden="true">
      <svg width="120" height="16" viewBox="0 0 120 16">
        <path d="M10 1 L10 8 Q10 13 15 13 L55 13 L60 16 L65 13 L105 13 Q110 13 110 8 L110 1"
          fill="none" stroke="hsl(var(--gold-primary))" strokeWidth="0.8" opacity="0.6" />
        <circle cx="60" cy="15" r="1.5" fill="hsl(var(--gold-primary))" opacity="0.5" />
      </svg>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN GANESHA SECTION — Two-Phase "Sacred Scroll"
   
   PHASE 1: "Divine Blessing" — Ganesha + Shloka only
   PHASE 2: "The Invitation" — Guest name, couple, date, button
   
   Golden light wipe transitions between phases.
   ═══════════════════════════════════════════════ */
const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  const [contentReady, setContentReady] = useState(false);
  const [curtainSyncActive, setCurtainSyncActive] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [ganeshaRevealed, setGaneshaRevealed] = useState(false);
  
  // Two-phase state
  const [phase, setPhase] = useState<'blessing' | 'flash' | 'invitation'>('blessing');

  useEffect(() => {
    const mountTimer = setTimeout(() => setContentReady(true), 300);
    const syncTimer = setTimeout(() => setCurtainSyncActive(true), 900);
    // Ganesha sparkle burst after divine entrance completes (1.5s entrance + small buffer)
    const revealTimer = setTimeout(() => setGaneshaRevealed(true), 2400);
    return () => { clearTimeout(mountTimer); clearTimeout(syncTimer); clearTimeout(revealTimer); };
  }, []);

  // Phase transition: blessing → flash → invitation (auto after 4.5s from curtain sync for more breathing room)
  useEffect(() => {
    if (!curtainSyncActive) return;
    const flashTimer = setTimeout(() => setPhase('flash'), 4500);
    const invTimer = setTimeout(() => setPhase('invitation'), 5200);
    return () => { clearTimeout(flashTimer); clearTimeout(invTimer); };
  }, [curtainSyncActive]);

  // Skip to invitation on tap during blessing phase
  const handleSkipToInvitation = useCallback(() => {
    if (phase === 'blessing') {
      setPhase('flash');
      setTimeout(() => setPhase('invitation'), 600);
    }
  }, [phase]);

  // Button active — trigger when Phase 2 starts + 2.2s for all stagger animations to finish
  useEffect(() => {
    if (phase !== 'invitation') return;
    const btnTimer = setTimeout(() => setButtonActive(true), 2200);
    return () => clearTimeout(btnTimer);
  }, [phase]);

  const shlokaText = 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥';

  return (
    <section
      className="section-container overflow-hidden"
      aria-labelledby="ganesha-heading"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
      }}
    >
      {/* Layer 0: Base dark */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(218 72% 5%)' }} />

      {contentReady && (
        <>
          <RoyalBorderFrame active={curtainSyncActive} />

          {/* Temple Background */}
          <div className="absolute inset-0 pointer-events-none temple-bg-mobile" style={{
            backgroundImage: `url(${templeBgMobile})`,
            backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat',
            opacity: 0.35,
          }} />
          <div className="absolute inset-0 pointer-events-none temple-bg-desktop" style={{
            backgroundImage: `url(${templeBgDesktop})`,
            backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat',
            opacity: 0.35,
          }} />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `linear-gradient(180deg,
              hsl(218 72% 5% / 0.45) 0%,
              hsl(218 65% 7% / 0.55) 15%,
              hsl(218 58% 9% / 0.65) 35%,
              hsl(218 52% 10% / 0.55) 55%,
              hsl(218 58% 8% / 0.45) 75%,
              hsl(218 65% 5% / 0.6) 100%)`,
          }} />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, hsl(218 70% 4% / 0.55) 60%, hsl(218 75% 3% / 0.85) 100%)',
          }} />

          {/* Golden glow from temple top */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 18%, hsl(var(--gold-primary) / 0.12) 0%, transparent 60%)',
            willChange: 'opacity',
            animation: 'glow-hero-pulse 10s ease-in-out infinite',
          }} />

          <div className="jaali-overlay" />
          <GoldDustParticles active={curtainSyncActive} />

          {/* Peacock Corners */}
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
            <PeacockCorner pos="tl" />
            <PeacockCorner pos="tr" />
            <PeacockCorner pos="bl" />
            <PeacockCorner pos="br" />
          </div>
        </>
      )}

      {/* ═══ GOLDEN WIPE TRANSITION + PARTICLE SHOWER — Phase 1 → 2 ═══ */}
      <div className={`gs-golden-wipe ${phase === 'flash' ? 'gs-wipe-active' : ''}`} />
      {phase === 'flash' && <TransitionParticleShower />}

      {/* ═══ PHASE 1: DIVINE BLESSING ═══ */}
      {contentReady && (
        <div
          className={`gs-phase gs-phase-blessing ${curtainSyncActive ? 'curtain-synced-active' : ''}`}
          style={{
            opacity: phase === 'blessing' ? 1 : 0,
            transform: phase === 'blessing' ? 'scale(1) translateY(0)' : 'scale(1.05) translateY(-30px)',
            pointerEvents: phase === 'blessing' ? 'auto' : 'none',
            transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
          }}
          onClick={handleSkipToInvitation}
        >
          {/* शुभ विवाह */}
          <div className="cs-element cs-shubh flex items-center gap-3">
            <span className="text-primary/40 text-sm">✦</span>
            <p className="font-yatra text-primary/55 tracking-[0.25em]" lang="hi"
              style={{ fontSize: 'clamp(15px, 3.5vw, 22px)' }}>
              शुभ विवाह
            </p>
            <span className="text-primary/40 text-sm">✦</span>
          </div>

          {/* Ganesha with Sacred Light Rays + Mandala + Diyas — DIVINE ENTRANCE */}
          <div className="cs-element cs-ganesha relative gs-ganesha-large gs-divine-entrance-wrapper">
            {/* Sacred Light Rays — behind everything */}
            <SacredLightRays active={curtainSyncActive} />
            
            {/* Breathing golden aura */}
            <div className="gs-breathing-aura" />
            
            <GaneshaMandala active={curtainSyncActive} />
            
            <div className="absolute inset-[-30px] rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.18) 0%, hsl(var(--gold-primary) / 0.06) 45%, transparent 70%)',
              willChange: 'transform, opacity',
              animation: curtainSyncActive ? 'heartbeat-glow 4s ease-in-out infinite 2s' : 'none',
            }} />
            
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-20">
              <AnimatedDiya side="left" delay={1.2} />
            </div>
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 z-20">
              <AnimatedDiya side="right" delay={1.5} />
            </div>
            
            {/* Ganesha Image — Divine entrance animation */}
            <img src={ganeshaImg} alt="Lord Ganesha"
              className="relative z-10 w-full h-full object-contain gs-divine-entrance-img"
              style={{ 
                filter: 'drop-shadow(0 0 25px hsl(var(--gold-primary) / 0.4)) drop-shadow(0 0 50px hsl(var(--gold-primary) / 0.18))',
                animation: curtainSyncActive ? 'gs-divine-entrance 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
              }}
            />
            
            {/* Sparkle burst on reveal */}
            <DivineSparkleBurst active={ganeshaRevealed} />
          </div>

          {/* OM Symbol */}
          <p className="cs-element cs-om font-sanskrit text-primary/45" lang="sa"
            style={{ fontSize: 'clamp(20px, 4.5vw, 30px)', letterSpacing: '0.2em' }}>
            ॐ
          </p>

          {/* Shloka — Word-by-word reveal */}
          <div className="cs-element cs-shloka">
            <ShlokaWordReveal active={curtainSyncActive} text={shlokaText} />
          </div>

          {/* Divider */}
          <div className="cs-element cs-divider">
            <OrnateDivider animate={curtainSyncActive} />
          </div>

          {/* Tap to continue hint */}
          <p className="cs-element cs-tagline font-heading italic text-foreground/30 tracking-[0.3em]"
            style={{ fontSize: 'clamp(10px, 2vw, 13px)', animation: curtainSyncActive ? 'gs-hint-pulse 2s ease-in-out infinite 3s' : 'none' }}>
            tap to continue
          </p>
        </div>
      )}

      {/* ═══ PHASE 2: THE INVITATION ═══ */}
      {contentReady && (
        <div
          className={`gs-phase gs-phase-invitation ${phase === 'invitation' ? 'gs-invitation-active' : ''}`}
          style={{
            opacity: phase === 'invitation' ? 1 : 0,
            transform: phase === 'invitation' ? 'scale(1)' : 'scale(0.92)',
            pointerEvents: phase === 'invitation' ? 'auto' : 'none',
            transition: 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Lingering divine light at top */}
          <div className="gs-divine-linger" />

          {/* Dear */}
          <p className="gs-inv-element gs-inv-dear font-heading text-foreground/55 tracking-[0.35em] uppercase text-center"
            style={{ fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '0' }}>
            Dear
          </p>

          {/* Guest Name — Royal framed */}
          <RoyalGuestFrame name={guestName} active={phase === 'invitation'} />

          {/* Gold separator */}
          <div className="gs-inv-element gs-inv-cordially">
            <div className="gs-gold-separator" style={{ marginBottom: 'clamp(4px, 1vh, 10px)' }} />
          </div>

          {/* Cordially invited — CENTERED */}
          <p className="gs-inv-element gs-inv-cordially font-heading text-foreground/50 uppercase text-center"
            style={{ fontSize: 'clamp(13px, 2.8vw, 17px)', lineHeight: 1.8, letterSpacing: '0.22em', maxWidth: '340px' }}>
            You are cordially invited<br />to the wedding of
          </p>

          {/* Couple Names — 3D perspective entrance */}
          <div className="gs-couple-names-perspective" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 1vh, 10px)' }}>
            {/* HARSHIT */}
            <div className="gs-inv-element gs-inv-groom">
              <h1 className="font-display leading-none couple-name-glow gs-couple-name-huge"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
                  backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', animation: phase === 'invitation' ? 'gold-shimmer 4s linear infinite' : 'none',
                }}>
                Harshit
              </h1>
            </div>

            {/* Ampersand */}
            <div className="gs-inv-element gs-inv-amp opening-ampersand-container">
              <div className="opening-amp-line-left">
                <div className="opening-amp-diamond" />
                <div className="opening-amp-line" />
              </div>
              <span className="font-heading italic text-primary/70" style={{ fontSize: 'clamp(20px, 4.5vw, 36px)' }}>
                &amp;
              </span>
              <div className="opening-amp-line-right">
                <div className="opening-amp-line" />
                <div className="opening-amp-diamond" />
              </div>
            </div>

            {/* ANSHIKHA */}
            <div className="gs-inv-element gs-inv-bride">
              <h1 className="font-display leading-none couple-name-glow gs-couple-name-huge"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
                  backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', animation: phase === 'invitation' ? 'gold-shimmer 4s linear infinite' : 'none',
                }}>
                Anshikha
              </h1>
            </div>
          </div>

          {/* Tagline with golden line */}
          <div className="gs-inv-element gs-inv-tagline gs-tagline-decorated">
            <div className="gs-tagline-line gs-tagline-line-left" />
            <p className="font-heading italic text-foreground/40 tracking-[0.25em]"
              style={{ fontSize: 'clamp(11px, 2.5vw, 15px)' }}>
              Two Souls, One Journey
            </p>
            <div className="gs-tagline-line gs-tagline-line-right" />
          </div>

          {/* Date — PROMINENT with decorators */}
          <div className="gs-inv-element gs-inv-date gs-date-decorated">
            <div className="gs-date-diamond" />
            <p className="font-body text-primary/70 tracking-[0.15em] text-center"
              style={{ fontSize: 'clamp(16px, 3.5vw, 24px)', fontWeight: 600 }}>
              10th May 2026
            </p>
            <div className="gs-date-diamond" />
          </div>

          {/* Open Invitation Button — with CTA pulse */}
          <button
            onClick={onBeginClick}
            className={`gs-inv-element gs-inv-button opening-cta-btn-premium group ${buttonActive ? 'gs-cta-glow-active' : ''}`}
            style={{ 
              pointerEvents: buttonActive ? 'auto' : 'none',
              ...(buttonActive ? { opacity: 1 } : {}),
            }}
            aria-label="Open the wedding invitation"
          >
            <div className="opening-cta-corner opening-cta-corner-tl" />
            <div className="opening-cta-corner opening-cta-corner-tr" />
            <div className="opening-cta-corner opening-cta-corner-bl" />
            <div className="opening-cta-corner opening-cta-corner-br" />
            <div className="opening-cta-content">
              <span className="opening-cta-text">Open Invitation</span>
              <span className="opening-cta-arrow">→</span>
            </div>
          </button>
        </div>
      )}
    </section>
  );
};

export default GaneshaSection;
