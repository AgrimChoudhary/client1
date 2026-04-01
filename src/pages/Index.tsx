import React, { useCallback, useState } from 'react';
import { useSectionNavigation, type SectionId } from '@/hooks/useSectionNavigation';
import { useGuestName } from '@/hooks/useGuestName';

import CurtainReveal from '@/components/transitions/CurtainReveal';
import PalaceDoors from '@/components/transitions/PalaceDoors';
import FloatingPetals from '@/components/global/FloatingPetals';
// FloatingNav removed — hamburger menu disabled
import ProgressDots from '@/components/global/ProgressDots';
import MusicToggle from '@/components/global/MusicToggle';

import GaneshaSection from '@/components/sections/GaneshaSection';
import OpeningSection from '@/components/sections/OpeningSection';
import CelebrationsSection from '@/components/sections/CelebrationsSection';
import GallerySection from '@/components/sections/GallerySection';
import CountdownSection from '@/components/sections/CountdownSection';
import RSVPSection from '@/components/sections/RSVPSection';

const Index = () => {
  const nav = useSectionNavigation();
  const guestName = useGuestName();

  const [doorPhase, setDoorPhase] = useState<'none' | 'ganesha-fading' | 'doors-visible' | 'complete'>('none');
  // CurtainReveal manages its own DOM lifecycle — it removes itself when animation is done.
  // We always render it; it returns null internally when phase='done'.
  const [showCurtain, setShowCurtain] = useState(true);

  const handleCurtainComplete = useCallback(() => {
    // This fires early (200ms) — tells GaneshaSection to mount content behind curtain
    nav.setCurtainOpen(true);
  }, [nav]);

  const handleCurtainDone = useCallback(() => {
    // This fires when curtain animation is fully complete (7000ms) — remove from DOM
    setShowCurtain(false);
  }, []);

  const handleBeginClick = useCallback(() => {
    setDoorPhase('ganesha-fading');
    setTimeout(() => setDoorPhase('doors-visible'), 350);
  }, []);

  const handleDoorsComplete = useCallback(() => {
    setDoorPhase('complete');
    nav.setDoorsOpen(true);
    nav.navigateTo(1, 'idle');
  }, [nav]);

  const handleNavJump = useCallback((section: SectionId) => {
    nav.navigateTo(section, 'cross-fade');
    setTimeout(() => nav.completeTransition(), 400);
  }, [nav]);

  const handleNextSection = useCallback((to: SectionId) => {
    nav.navigateTo(to, 'fade');
    setTimeout(() => nav.completeTransition(), 600);
  }, [nav]);

  const isGaneshaPhase = nav.currentSection === 0 && doorPhase !== 'complete';
  const showSection1Behind = doorPhase === 'doors-visible' || doorPhase === 'complete';

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg font-ui text-sm">
        Skip to content
      </a>

      <FloatingPetals />

      {/* CurtainReveal: ALWAYS rendered until it removes itself.
          It sits at z-50, physically covering GaneshaSection (z-10).
          onComplete fires early (200ms) to mount content behind curtain.
          onDone fires when animation is fully complete (7000ms). */}
      {showCurtain && (
        <CurtainReveal onComplete={handleCurtainComplete} onDone={handleCurtainDone} />
      )}
      {doorPhase === 'doors-visible' && <PalaceDoors onComplete={handleDoorsComplete} />}

      {nav.curtainOpen && (
        <>
          {/* FloatingNav removed */}
          <ProgressDots currentSection={nav.currentSection} onNavigate={handleNavJump} />
          <MusicToggle />
        </>
      )}

      <div id="main-content" className="relative w-full h-full">
        {/* Section 0: Ganesha — content is always visible, physically hidden behind curtain */}
        <div
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          style={{
            zIndex: isGaneshaPhase ? 10 : 1,
            opacity: (isGaneshaPhase && doorPhase !== 'ganesha-fading' && doorPhase !== 'doors-visible') ? 1 : 0,
            pointerEvents: (nav.currentSection === 0 && doorPhase === 'none') ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-out',
            willChange: 'opacity',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <GaneshaSection
            curtainOpen={nav.curtainOpen}
            onBeginClick={handleBeginClick}
            visited={nav.visitedSections.has(0) && nav.currentSection !== 0}
            fading={doorPhase === 'ganesha-fading'}
            guestName={guestName}
          />
        </div>

        {/* Section 1: Opening */}
        <div
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          style={{
            zIndex: (showSection1Behind && doorPhase !== 'complete' && nav.currentSection === 0) ? 1 :
                   nav.currentSection === 1 ? 10 : 1,
            opacity: (showSection1Behind || nav.currentSection === 1) ? 1 : 0,
            pointerEvents: nav.currentSection === 1 ? 'auto' : 'none',
            transition: doorPhase === 'doors-visible' ? 'none' : 'opacity 0.5s ease-out',
            willChange: 'opacity',
            WebkitOverflowScrolling: 'touch',
          }}
        >
        <OpeningSection
            active={nav.currentSection === 1}
            guestName={guestName}
            onViewCelebrations={() => handleNextSection(2)}
            visited={nav.visitedSections.has(1) && nav.currentSection !== 1}
          />
        </div>

        {/* Sections 2-5 */}
        {[
          { id: 2 as SectionId, el: <CelebrationsSection active={nav.currentSection === 2} onNext={() => handleNextSection(3)} /> },
          { id: 3 as SectionId, el: <GallerySection active={nav.currentSection === 3} onNext={() => handleNextSection(4)} /> },
          { id: 4 as SectionId, el: <CountdownSection active={nav.currentSection === 4} onNext={() => handleNextSection(5)} /> },
          { id: 5 as SectionId, el: <RSVPSection active={nav.currentSection === 5} guestName={guestName} /> },
        ].map(({ id, el }) => (
          <div
            key={id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: nav.currentSection === id ? 1 : 0,
              pointerEvents: nav.currentSection === id ? 'auto' : 'none',
              zIndex: nav.currentSection === id ? 10 : 1,
              willChange: 'opacity',
            }}
          >
            {el}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Index;
