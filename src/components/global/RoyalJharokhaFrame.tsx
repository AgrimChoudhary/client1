import React from 'react';

/**
 * RoyalJharokhaFrame — Elegant frame inspired by Rajasthani palace architecture
 * 
 * Features:
 * - Pure gold color palette (no clashing colors)
 * - Animated rotating gradient border on hover
 * - Ornate corner flourishes inspired by Jharokha windows
 * - Inner decorative border with subtle details
 * - Mobile-first responsive design
 */

interface RoyalJharokhaFrameProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean; // Enable rotating border animation
  variant?: 'standard' | 'ornate' | 'minimal'; // Frame style options
}

/* Jharokha Corner Ornament — Pure gold filigree design */
const JharokhaCorner: React.FC<{ pos: 'tl' | 'tr' | 'bl' | 'br' }> = ({ pos }) => {
  const isTop = pos.startsWith('t');
  const isLeft = pos.endsWith('l');
  
  return (
    <div
      aria-hidden="true"
      className="jharokha-corner"
      style={{
        position: 'absolute',
        top: isTop ? '-2px' : 'auto',
        bottom: !isTop ? '-2px' : 'auto',
        left: isLeft ? '-2px' : 'auto',
        right: !isLeft ? '-2px' : 'auto',
        width: '32px',
        height: '32px',
        zIndex: 15,
        pointerEvents: 'none',
        transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
      }}
    >
      <svg viewBox="0 0 48 48" width="100%" height="100%" className="jharokha-corner-svg">
        {/* Main corner arc */}
        <path 
          d="M4 4 L4 20 Q4 4 20 4" 
          fill="none" 
          stroke="url(#gold-gradient)" 
          strokeWidth="2" 
          strokeLinecap="round"
          className="jharokha-arc"
        />
        
        {/* Inner decorative curves */}
        <path 
          d="M8 8 L8 16 Q8 8 16 8" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="1" 
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Ornate flourish curls */}
        <path 
          d="M4 24 Q6 20 10 18 Q14 16 18 14" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.5"
          className="jharokha-flourish"
        />
        <path 
          d="M24 4 Q20 6 18 10 Q16 14 14 18" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.5"
          className="jharokha-flourish"
        />
        
        {/* Center diamond motif */}
        <g transform="translate(12, 12)" className="jharokha-diamond">
          <path 
            d="M0 -5 L5 0 L0 5 L-5 0 Z" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="1"
            opacity="0.7"
          />
          <circle cx="0" cy="0" r="1.5" fill="#FFD700" opacity="0.8" className="jharokha-gem" />
        </g>
        
        {/* Decorative dots along edges */}
        <circle cx="6" cy="28" r="1" fill="#D4AF37" opacity="0.5" />
        <circle cx="6" cy="36" r="0.8" fill="#D4AF37" opacity="0.4" />
        <circle cx="28" cy="6" r="1" fill="#D4AF37" opacity="0.5" />
        <circle cx="36" cy="6" r="0.8" fill="#D4AF37" opacity="0.4" />
        
        {/* Gold gradient definition */}
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const RoyalJharokhaFrame: React.FC<RoyalJharokhaFrameProps> = ({ 
  children, 
  className = '', 
  animated = true,
  variant = 'standard'
}) => {
  return (
    <div className={`royal-jharokha-frame royal-jharokha-${variant} ${animated ? 'royal-jharokha-animated' : ''} ${className}`}>
      {/* Animated rotating gradient border */}
      <div className="jharokha-border-glow" />
      
      {/* Static gold border base */}
      <div className="jharokha-border-base" />
      
      {/* Corner ornaments */}
      <div className="jharokha-corners">
        <JharokhaCorner pos="tl" />
        <JharokhaCorner pos="tr" />
        <JharokhaCorner pos="bl" />
        <JharokhaCorner pos="br" />
      </div>
      
      {/* Inner decorative border */}
      <div className="jharokha-inner-border">
        {/* Top and bottom decorative lines */}
        <div className="jharokha-inner-line jharokha-inner-top" />
        <div className="jharokha-inner-line jharokha-inner-bottom" />
      </div>
      
      {/* Content container */}
      <div className="jharokha-content">
        {children}
      </div>
      
      {/* Hover shimmer effect */}
      <div className="jharokha-shimmer" />
    </div>
  );
};

export default RoyalJharokhaFrame;
