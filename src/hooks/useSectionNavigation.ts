import { useState, useCallback } from 'react';

export type SectionId = 0 | 1 | 2 | 3 | 4 | 5;
export type TransitionState = 'idle' | 'curtain' | 'palace-doors' | 'fade' | 'cross-fade';

interface SectionNavigation {
  currentSection: SectionId;
  previousSection: SectionId | null;
  visitedSections: Set<SectionId>;
  transitionState: TransitionState;
  navigateTo: (section: SectionId, transition?: TransitionState) => void;
  completeTransition: () => void;
  curtainOpen: boolean;
  setCurtainOpen: (open: boolean) => void;
  doorsOpen: boolean;
  setDoorsOpen: (open: boolean) => void;
}

export function useSectionNavigation(): SectionNavigation {
  const [currentSection, setCurrentSection] = useState<SectionId>(0);
  const [previousSection, setPreviousSection] = useState<SectionId | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<SectionId>>(new Set([0]));
  const [transitionState, setTransitionState] = useState<TransitionState>('curtain');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);

  const navigateTo = useCallback((section: SectionId, transition: TransitionState = 'fade') => {
    setPreviousSection(currentSection);
    setTransitionState(transition);
    setCurrentSection(section);
    setVisitedSections(prev => new Set([...prev, section]));
  }, [currentSection]);

  const completeTransition = useCallback(() => {
    setTransitionState('idle');
  }, []);

  return {
    currentSection,
    previousSection,
    visitedSections,
    transitionState,
    navigateTo,
    completeTransition,
    curtainOpen,
    setCurtainOpen,
    doorsOpen,
    setDoorsOpen,
  };
}
