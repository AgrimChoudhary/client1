import React, { useState, useEffect, useMemo } from 'react';
import './VarmalaAnimation.css';

import brideImage from '../../assets/bride-custom.webp';
import groomImage from '../../assets/groom-custom.webp';

interface VarmalaAnimationProps {
  active: boolean;
}

type AnimationPhase = 'waiting' | 'walking' | 'meeting' | 'complete';

const VarmalaAnimation: React.FC<VarmalaAnimationProps> = ({ active }) => {
  const [phase, setPhase] = useState<AnimationPhase>('waiting');

  useEffect(() => {
    let running = true;
    if (!active) {
      setPhase('waiting');
      return;
    }

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 400));
      if (!running) return;

      setPhase('walking');
      await new Promise(r => setTimeout(r, 4500));
      if (!running) return;

      setPhase('meeting');
      await new Promise(r => setTimeout(r, 2500));
      if (!running) return;

      // Hold at complete — no loop
      setPhase('complete');
    };

    sequence();

    return () => { running = false; };
  }, [active]);

  if (!active && phase === 'waiting') return null;

  return (
    <div className={`va-transparent-root phase-${phase}`}>
      
      {/* Floor glow reflection */}
      <div className="va-floor-reflection" />
      
      <div className="va-characters-container">
        
        {/* BRIDE — walks from left */}
        <div className={`va-person va-bride phase-${phase}`}>
          <img 
            src={brideImage} 
            alt="Bride" 
            className="va-person-img" 
            loading="eager"
            decoding="async"
          />
        </div>

        {/* ❤️ RED HEART — appears in center when they meet */}
        <div className={`va-heart-wrapper ${phase === 'meeting' || phase === 'complete' ? 'va-heart-visible' : ''}`}>
          <div className="va-heart-glow" />
          <div className="va-heart-glow va-heart-glow-2" />
          <svg
            className="va-heart-svg"
            viewBox="0 0 100 90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 85 C50 85 5 55 5 28 C5 13 17 2 30 2 C38 2 45 7 50 13 C55 7 62 2 70 2 C83 2 95 13 95 28 C95 55 50 85 50 85Z"
              fill="url(#heartGrad)"
              className="va-heart-path"
            />
            <ellipse cx="35" cy="22" rx="10" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-30 35 22)" />
            <defs>
              <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#e8192c" />
                <stop offset="100%" stopColor="#8b0000" />
              </radialGradient>
            </defs>
          </svg>
          {(phase === 'meeting' || phase === 'complete') && <HeartSparkles />}
        </div>

        {/* GROOM — walks from right */}
        <div className={`va-person va-groom phase-${phase}`}>
          <img 
            src={groomImage} 
            alt="Groom" 
            className="va-person-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Petals after they meet */}
      {phase === 'complete' && <MagicalPetals />}
      
      {/* Love particles burst on meeting */}
      {(phase === 'meeting' || phase === 'complete') && <LoveParticles />}
    </div>
  );
};

const HeartSparkles = () => (
  <div className="va-heart-sparkles">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="va-sparkle"
        style={{
          '--angle': `${i * 30}deg`,
          '--dist': `${35 + Math.random() * 25}px`,
          animationDelay: `${i * 0.08}s`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const LoveParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${40 + Math.random() * 20}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2.5 + Math.random() * 2}s`,
      size: `${4 + Math.random() * 6}px`,
    })),
  []);

  return (
    <div className="va-love-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="va-love-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

const MagicalPetals = () => (
  <div className="va-magic-petals">
    {Array.from({ length: 18 }).map((_, i) => (
      <div
        key={i}
        className="va-magic-petal-single"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3.5 + Math.random() * 3.5}s`,
          transform: `scale(${0.5 + Math.random() * 0.8})`,
        }}
      >
        <div className={`va-petal-shape petal-color-${i % 4}`} />
      </div>
    ))}
  </div>
);

export default VarmalaAnimation;
