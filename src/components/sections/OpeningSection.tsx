import React, { useEffect, useState, useMemo } from 'react';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
import HangingDecors from '@/components/global/HangingDecors';
import PeacockCorner from '@/components/global/PeacockCorner';
import VarmalaAnimation from '@/components/animations/VarmalaAnimation';

/* ── ANIMATED FLANKING PEACOCKS (MAYUR) ── */
const FlankingPeacocks: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="os-peacock-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF"/>
        <stop offset="50%" stopColor="#0277BD"/>
        <stop offset="100%" stopColor="#1A237E"/>
      </linearGradient>
      <linearGradient id="os-peacock-wing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AEEA00"/>
        <stop offset="50%" stopColor="#00B0FF"/>
        <stop offset="100%" stopColor="#000051"/>
      </linearGradient>
      
      <g id="os-mini-peacock">
        {/* Tail */}
        <g className="os-peacock-tail">
          <path d="M-10 10 C-30 -10, -50 20, -60 40 C-30 60, 0 30, 0 10Z" fill="#004D40"/>
          <path d="M-5 15 C-20 0, -40 25, -45 40 C-20 50, 0 30, -5 15Z" fill="#00695C"/>
          <ellipse cx="-45" cy="30" rx="3" ry="5" fill="#D4AF37" transform="rotate(-30 -45 30)"/>
          <circle cx="-45" cy="30" r="1.5" fill="#0D47A1"/>
          <ellipse cx="-35" cy="40" rx="4" ry="6" fill="#D4AF37" transform="rotate(-50 -35 40)"/>
          <circle cx="-35" cy="40" r="2" fill="#0D47A1"/>
          <ellipse cx="-20" cy="45" rx="3" ry="5" fill="#D4AF37" transform="rotate(-70 -20 45)"/>
          <circle cx="-20" cy="45" r="1.5" fill="#0D47A1"/>
        </g>
        {/* Neck & Head */}
        <g className="os-peacock-neck">
          <path d="M8 12 C10 0, 15 -10, 20 -15 C25 -10, 25 0, 15 15" fill="url(#os-peacock-body)"/>
          <circle cx="21" cy="-17" r="6" fill="#0277BD"/>
          <polygon points="26,-18 32,-15 25,-14" fill="#FFD700"/>
          <path d="M20 -23 L18 -30 M22 -23 L22 -32 M24 -23 L26 -30" stroke="#00E5FF" strokeWidth="0.8"/>
          <circle cx="18" cy="-30" r="1" fill="#FFD700" className="os-peacock-crest-dot" />
          <circle cx="22" cy="-32" r="1" fill="#FFD700" className="os-peacock-crest-dot" />
          <circle cx="26" cy="-30" r="1" fill="#FFD700" className="os-peacock-crest-dot" />
          <circle cx="22" cy="-18" r="1" fill="#FFF"/>
        </g>
        <ellipse cx="0" cy="15" rx="14" ry="10" fill="url(#os-peacock-body)" className="os-peacock-body" />
        <path d="M0 10 C-10 10, -20 20, -10 25 C0 20, 10 15, 0 10Z" fill="url(#os-peacock-wing)" className="os-peacock-wing" />
      </g>
    </defs>
  </svg>
);

/* ── FLOATING SCROLL HINT ── */
const ScrollHint: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Check if page has content below the fold
  useEffect(() => {
    const check = () => {
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      setHasOverflow(docH > winH + 40);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(document.documentElement);
    const showTimer = setTimeout(() => setVisible(true), 1200);
    return () => { ro.disconnect(); clearTimeout(showTimer); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      if (scrollTop > 50 || scrollTop + winH >= docH - 30) {
        setHidden(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || hidden || !hasOverflow) return null;

  return (
    <div className="os-scroll-hint">
      <div className="os-scroll-hint-inner">
        <p className="os-scroll-text">Scroll to explore</p>
        <div className="os-scroll-arrow-track">
          <div className="os-scroll-arrow-anim">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="os-scroll-arrow-svg">
              <path d="M8 0 L8 20 M2 14 L8 21 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OpeningSectionProps {
  active: boolean;
  guestName: string;
  onViewCelebrations: () => void;
  visited: boolean;
}

const OpeningSection: React.FC<OpeningSectionProps> = ({ active, onViewCelebrations, visited }) => {
  const [step, setStep] = useState(2);
  const [varmalaComplete, setVarmalaComplete] = useState(false);
  

  useEffect(() => {
    if (!active) {
      setStep(2);
      setVarmalaComplete(false);
      return;
    }
    const t1 = setTimeout(() => setStep(3), 100);
    const t2 = setTimeout(() => setStep(4), 600);
    const t3 = setTimeout(() => setStep(5), 1200);
    const t4 = setTimeout(() => setStep(6), 1800);
    // Varmala complete after walk(4.5s) + meeting(2.5s) + buffer
    const t5 = setTimeout(() => setVarmalaComplete(true), 10000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [active]);

  // Gold particles
  const particles = useMemo(() =>
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 14}s`,
      size: `${1 + Math.random() * 3}px`,
      opacity: 0.15 + Math.random() * 0.4,
    })),
  []);

  // Sparkle stars
  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      size: `${1.5 + Math.random() * 2.5}px`,
    })),
  []);

  return (
    <section className="os-container" aria-labelledby="opening-heading">
      <RoyalBackground />
      <HangingDecors />

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <PeacockCorner pos="tl" />
        <PeacockCorner pos="tr" />
        <PeacockCorner pos="bl" />
        <PeacockCorner pos="br" />
      </div>

      <div className="os-bg-grain" aria-hidden="true" />

      {/* Gold floating particles */}
      <div className="os-particles-layer" aria-hidden="true">
        {particles.map(p => (
          <div key={p.id} className="os-particle" style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: p.delay, animationDuration: p.duration,
            opacity: step >= 1 ? p.opacity : 0,
            transition: 'opacity 1.5s ease-out',
          }} />
        ))}
      </div>

      {/* Sparkle stars */}
      <div className="os-particles-layer" aria-hidden="true">
        {sparkles.map(s => (
          <div key={s.id} className="os-sparkle-star" style={{
            left: s.left, top: s.top, width: s.size, height: s.size,
            animationDelay: s.delay,
            opacity: step >= 2 ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }} />
        ))}
      </div>

      <SectionBorderFrame active={active} variant="royal" />
 
      <div className="os-content">
        {/* ── 1. CIRCULAR PORTRAIT — CINEMATIC REVEAL ── */}
        <div className={`os-portrait-hero ${step >= 2 ? 'os-portrait-cinematic-active' : ''}`}>
          {/* Rotating shimmer overlay */}
          <div className="os-portrait-shimmer-ring" />
          
          {/* Outer Decoration (Lotus Petals) */}
          <div className="os-portrait-decoration">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`os-decoration-petal os-petal-${i}`} />
            ))}
            <div className="os-decoration-ring-outer" />
          </div>

          {/* Multi-layered Mandala Rings */}
          <div className="os-mandala-ring os-mandala-ring-1" />
          <div className="os-mandala-ring os-mandala-ring-2" />
          <div className="os-mandala-ring os-mandala-ring-3" />
          <div className="os-mandala-ring os-mandala-ring-4" />

          {/* Animated Diyas */}
          <div className="os-portrait-diyas">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`os-diya-wrapper os-diya-pos-${i}`}>
                 <div className="os-diya-container">
                   <div className="os-diya-base"></div>
                   <div className="os-diya-flame-container">
                      <div className="os-diya-flame"></div>
                      <div className="os-diya-flame-glow"></div>
                   </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Glowing Auras */}
          <div className="os-portrait-glow-outer" />
          <div className="os-portrait-glow-inner" />

          {/* Portrait Image Frame — double gold border */}
          <div className="os-portrait-frame">
              <img
                src="/assets/opening-portrait.png"
                alt="Harshit and Anshikha"
                className="os-portrait-img"
              />
          </div>
          
          {/* Decorative Gold Rings */}
          <div className="os-portrait-ring-outer" />
          <div className="os-portrait-ring-inner" />
          <div className="os-portrait-ring" />
        </div>

        {/* ── 2. COUPLE NAMES — DIRECTIONAL SLIDE-IN ── */}
        <div className="os-names-block" id="opening-heading">
          <h1 className={`os-name os-name-left ${step >= 3 ? 'os-name-reveal' : ''}`}>
            HARSHIT
          </h1>

          {/* 🦚 Left Peacock */}
          <div className={`os-peacock-flank os-peacock-left ${step >= 3 ? 'os-peacock-reveal' : ''}`}>
            <svg viewBox="-80 -40 120 120" width="100%" height="100%">
              <use href="#os-mini-peacock" />
            </svg>
          </div>

          {/* 🦚 Right Peacock */}
          <div className={`os-peacock-flank os-peacock-right ${step >= 3 ? 'os-peacock-reveal' : ''}`}>
            <svg viewBox="-80 -40 120 120" width="100%" height="100%" style={{ transform: 'scaleX(-1)' }}>
              <use href="#os-mini-peacock" />
            </svg>
          </div>

          <FlankingPeacocks />

          {/* Ampersand with lines */}
          <div className={`os-ampersand-row ${step >= 3 ? 'os-amp-reveal' : ''}`}>
            <div className="os-amp-line" />
            <span className="os-ampersand">&</span>
            <div className="os-amp-line" />
          </div>

          <h1 className={`os-name os-name-right ${step >= 3 ? 'os-name-reveal' : ''}`}>
            ANSHIKHA
          </h1>

          <p className={`os-married-text ${step >= 4 ? 'os-married-reveal' : ''}`}>
            are getting married
          </p>
        </div>

        {/* ── 3. ANIMATED VARMALA EXCHANGE ── */}
        <VarmalaAnimation active={step >= 4} />

      </div>

      {/* ── 4. FLOATING SCROLL HINT ── */}
      <ScrollHint />
 
      {/* ── FIXED RIGHT-SIDE NEXT BUTTON ── */}
      <div
        style={{
          position: 'fixed',
          right: 'clamp(10px, 3vw, 28px)',
          bottom: 'clamp(20px, 5vh, 48px)',
          zIndex: 60,
          opacity: step >= 6 ? 1 : 0,
          transform: step >= 6 ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s',
          pointerEvents: step >= 6 ? 'auto' : 'none',
        }}
      >
        <button onClick={onViewCelebrations} className="cel-next-btn" aria-label="Next Section">
          <div className="cel-diya-container">
            <div className="cel-diya-glow"></div>
            <div className="cel-diya-flame"></div>
            <span className="cel-diya-icon">🪔</span>
          </div>
          <span>Next</span>
          <span className="cel-btn-arrow">→</span>
          <div className="cel-diya-container" style={{ transform: 'scaleX(-1)' }}>
            <div className="cel-diya-glow"></div>
            <div className="cel-diya-flame"></div>
            <span className="cel-diya-icon">🪔</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default OpeningSection;
