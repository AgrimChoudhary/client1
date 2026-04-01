import React from 'react';

interface DiyaIconProps {
  lit?: boolean;
  className?: string;
}

const DiyaIcon: React.FC<DiyaIconProps> = ({ lit = false, className = '' }) => {
  return (
    <span className={`inline-block relative ${className}`} aria-hidden="true" style={{ width: 24, height: 24 }}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diya base */}
        <ellipse cx="12" cy="18" rx="8" ry="3" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" />
        <path d="M6 16C6 14 8 12 12 12C16 12 18 14 18 16" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" />
        {/* Flame */}
        {lit && (
          <g>
            <path
              d="M12 4C12 4 9 7 9 9C9 10.5 10.5 12 12 12C13.5 12 15 10.5 15 9C15 7 12 4 12 4Z"
              fill="hsl(38 36% 60%)"
              opacity="0.9"
              style={{ animation: 'diya-flame 1.5s ease-in-out infinite', transformOrigin: '12px 12px' }}
            />
            <circle
              cx="12"
              cy="8"
              r="12"
              fill="none"
              style={{ animation: 'diya-glow 0.6s ease-out forwards' }}
            />
          </g>
        )}
        {/* Wick */}
        {!lit && (
          <line x1="12" y1="8" x2="12" y2="12" stroke="hsl(38 30% 35%)" strokeWidth="1" opacity="0.4" />
        )}
      </svg>
    </span>
  );
};

export default DiyaIcon;
