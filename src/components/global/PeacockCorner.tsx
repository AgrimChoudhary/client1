import React from 'react';

const PeacockCorner: React.FC<{ pos: 'tl' | 'tr' | 'bl' | 'br' }> = ({ pos }) => {
  const isTop = pos.startsWith('t');
  const isLeft = pos.endsWith('l');
  
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: isTop ? '-6px' : 'auto',
        bottom: !isTop ? '-6px' : 'auto',
        left: isLeft ? '-6px' : 'auto',
        right: !isLeft ? '-6px' : 'auto',
        width: '40px',
        height: '40px',
        zIndex: 4,
        pointerEvents: 'none',
        transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
      }}
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%" filter="drop-shadow(0 0 4px rgba(255,215,0,0.4))">
        {/* Outer Filigree */}
        <path d="M2 2 C 2 30, 20 50, 48 56" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" className="cel-feather-wisp" />
        <path d="M2 2 C 20 2, 40 10, 56 30" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" className="cel-feather-wisp" />
        <path d="M6 12 C 16 16, 24 24, 32 38" fill="none" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" opacity="0.7" className="cel-feather-wisp" />
        <path d="M12 6 C 16 16, 24 24, 38 32" fill="none" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" opacity="0.7" className="cel-feather-wisp" />
        
        {/* Dots */}
        {[8, 16, 24, 34, 44].map((dist, i) => (
          <circle key={'d1'+i} cx={2} cy={dist} r="1" fill="#FFD700" opacity={1 - i*0.15}/>
        ))}
        {[8, 16, 24, 34, 44].map((dist, i) => (
          <circle key={'d2'+i} cx={dist} cy={2} r="1" fill="#FFD700" opacity={1 - i*0.15}/>
        ))}

        {/* Peacock Ocellus (Feather Eye) */}
        <g transform="translate(14, 14) rotate(-45) scale(0.9)" className="cel-peacock-ocellus">
          <path d="M0 24 C 5 24, 10 16, 10 10 C 10 4, 5 0, 0 0 C -5 0, -10 4, -10 10 C -10 16, -5 24, 0 24Z" fill="#D4AF37" opacity="0.8"/>
          <ellipse cx="0" cy="9" rx="7" ry="9" fill="#00ACC1"/>
          <ellipse cx="0" cy="10" rx="4.5" ry="6" fill="#1A237E"/>
          <ellipse cx="0" cy="10.5" rx="2.5" ry="3" fill="#006064"/>
          <circle cx="-1" cy="9" r="1" fill="#FFF" opacity="0.8"/>
          {/* Feather wisps */}
          <path d="M-8 8 Q-14 4 -16 -2 M8 8 Q14 4 16 -2 M-6 16 Q-10 18 -12 24 M6 16 Q10 18 12 24" fill="none" stroke="#00BCD4" strokeWidth="0.8" opacity="0.6"/>
        </g>
      </svg>
    </div>
  );
};

export default PeacockCorner;
