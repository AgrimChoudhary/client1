import React, { useEffect, useRef } from 'react';
import { type SectionId } from '@/hooks/useSectionNavigation';

interface FloatingNavProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const sections = [
  { id: 0 as SectionId, label: 'Ganesha', icon: '🙏' },
  { id: 1 as SectionId, label: 'Couple', icon: '💑' },
  { id: 2 as SectionId, label: 'Events', icon: '📜' },
  { id: 3 as SectionId, label: 'Gallery', icon: '📸' },
  { id: 4 as SectionId, label: 'Countdown', icon: '⏳' },
  { id: 5 as SectionId, label: 'RSVP', icon: '💌' },
];

const FloatingNav: React.FC<FloatingNavProps> = ({ currentSection, onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-close after 5s
  useEffect(() => {
    if (open) {
      timeoutRef.current = setTimeout(() => setOpen(false), 5000);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [open]);

  const handleNav = (id: SectionId) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto md:right-4 z-[100]">
      {/* Toggle button — 48px touch target */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center font-ui text-lg transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
          color: 'hsl(var(--primary-foreground))',
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)',
          border: '1px solid hsl(var(--gold-secondary) / 0.4)',
        }}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Menu Panel */}
      {open && (
        <nav
          className="absolute right-0 rounded-xl p-3 min-w-[180px]"
          style={{
            bottom: '100%',
            marginBottom: '8px',
            background: 'hsl(218 52% 14% / 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid hsl(var(--primary) / 0.2)',
            boxShadow: '0 8px 40px hsl(var(--background) / 0.8)',
            animation: 'scale-fade-in 0.2s ease-out',
          }}
          role="navigation"
          aria-label="Section navigation"
        >
          {/* On desktop, open upward from top-right → reposition */}
          <style>{`
            @media (min-width: 768px) {
              nav[aria-label="Section navigation"] {
                bottom: auto !important;
                top: 100% !important;
                margin-bottom: 0 !important;
                margin-top: 8px !important;
              }
            }
          `}</style>
          <ul className="space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleNav(s.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-ui text-sm flex items-center gap-3 transition-all duration-200 min-h-[44px] ${
                    currentSection === s.id
                      ? 'text-primary bg-secondary'
                      : 'text-foreground/70 hover:bg-secondary/50 hover:text-foreground'
                  }`}
                >
                  <span className="text-base">{s.icon}</span>
                  <span>{s.label}</span>
                  {currentSection === s.id && (
                    <span className="w-2 h-2 rounded-full bg-primary ml-auto" style={{
                      boxShadow: '0 0 6px hsl(var(--primary) / 0.5)',
                    }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default FloatingNav;
