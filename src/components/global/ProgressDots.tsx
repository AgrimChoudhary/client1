import React from 'react';
import { type SectionId } from '@/hooks/useSectionNavigation';

interface ProgressDotsProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const sectionLabels = ['Ganesha', 'Couple', 'Events', 'Gallery', 'Countdown', 'RSVP'];

const ProgressDots: React.FC<ProgressDotsProps> = ({ currentSection, onNavigate }) => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3" role="navigation" aria-label="Section progress">
      {[0, 1, 2, 3, 4, 5].map((id) => (
        <button
          key={id}
          onClick={() => onNavigate(id as SectionId)}
          className={`rounded-full transition-all duration-300 hover:scale-125 ${
            currentSection === id
              ? 'w-[10px] h-[10px] bg-primary'
              : 'w-[6px] h-[6px] bg-gold-tertiary hover:bg-primary/60'
          }`}
          style={currentSection === id ? {
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.2)',
          } : undefined}
          aria-label={`Go to ${sectionLabels[id]}`}
          aria-current={currentSection === id ? 'step' : undefined}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
