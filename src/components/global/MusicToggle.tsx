import React from 'react';

const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center text-primary transition-all duration-300 group"
      style={{
        background: playing
          ? 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(218 50% 12%) 100%)'
          : 'hsl(var(--card))',
        border: `1.5px solid hsl(var(--primary) / ${playing ? '0.5' : '0.2'})`,
        boxShadow: playing
          ? '0 0 20px hsl(var(--primary) / 0.2), 0 4px 16px hsl(var(--background) / 0.5)'
          : '0 2px 8px hsl(var(--background) / 0.5)',
        animation: playing ? 'music-pulse 2s ease-in-out infinite' : 'none',
      }}
      aria-label={playing ? 'Mute music' : 'Play music'}
      title={playing ? 'Mute music' : 'Play music'}
    >
      {/* Glow aura when playing */}
      {playing && (
        <div className="absolute -inset-2 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          animation: 'rsvp-seal-breathe 3s ease-in-out infinite',
        }} />
      )}
      <span className="relative z-10">
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default MusicToggle;
