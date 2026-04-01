import React from 'react';

interface GoldDividerProps {
  className?: string;
  animate?: boolean;
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', animate = true }) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-[120px]"
        style={animate ? { animation: 'draw-divider 0.6s ease-out forwards' } : {}}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary opacity-60">
        <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor" />
      </svg>
      <div
        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-[120px]"
        style={animate ? { animation: 'draw-divider 0.6s ease-out forwards' } : {}}
      />
    </div>
  );
};

export default GoldDivider;
