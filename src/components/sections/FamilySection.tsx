import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import PeacockCorner from '@/components/global/PeacockCorner';
import DiyaIcon from '@/components/global/DiyaIcon';

// Import Images
import groomFatherImg from '@/assets/family/groom_father.png';
import groomMotherImg from '@/assets/family/groom_mother.png';
import groomBrotherImg from '@/assets/family/groom_brother.png';
import groomSisterImg from '@/assets/family/groom_sister.png';
import groomGrandfatherImg from '@/assets/family/groom_grandfather.png';
import groomGrandmotherImg from '@/assets/family/groom_grandmother.png';
import groomUncleImg from '@/assets/family/groom_uncle.png';
import groomAuntImg from '@/assets/family/groom_aunt.png';
import groomMainImg from '@/assets/family/groom_family_group.png';

import brideFatherImg from '@/assets/family/bride_father.png';
import brideMotherImg from '@/assets/family/bride_mother.png';
import brideBrotherImg from '@/assets/family/bride_brother.png';
import brideSisterImg from '@/assets/family/bride_sister.png';
import brideGrandfatherImg from '@/assets/family/bride_grandfather.png';
import brideGrandmotherImg from '@/assets/family/bride_grandmother.png';
import brideUncleImg from '@/assets/family/bride_uncle.png';
import brideAuntImg from '@/assets/family/bride_aunt.png';
import brideMainImg from '@/assets/family/bride_family_group.png';

/* ═══════════════════════════════════════
   FAMILY DATA
   ═══════════════════════════════════════ */
interface FamilyMember {
  name: string;
  relation: string;
  color: string;
  image: string;
}

interface FamilySide {
  side: 'groom' | 'bride';
  title: string;
  hindiTitle: string;
  parents: string;
  color: string;
  mainImage: string;
  members: FamilyMember[];
}

const familyData: FamilySide[] = [
  {
    side: 'groom',
    title: "The Groom's Family",
    hindiTitle: 'वर पक्ष',
    parents: 'Shri Rajendra & Smt. Sunita',
    color: 'hsl(38 30% 22%)',
    mainImage: groomMainImg,
    members: [
      { name: 'Shri Rajendra Ji', relation: 'Father', color: 'hsl(38 30% 20%)', image: groomFatherImg },
      { name: 'Smt. Sunita Ji', relation: 'Mother', color: 'hsl(25 28% 22%)', image: groomMotherImg },
      { name: 'Rahul Sharma', relation: 'Brother', color: 'hsl(218 35% 18%)', image: groomBrotherImg },
      { name: 'Priya Sharma', relation: 'Sister', color: 'hsl(38 25% 19%)', image: groomSisterImg },
      { name: 'Shri Ramesh Ji', relation: 'Grandfather', color: 'hsl(218 40% 16%)', image: groomGrandfatherImg },
      { name: 'Smt. Kamla Devi', relation: 'Grandmother', color: 'hsl(25 30% 20%)', image: groomGrandmotherImg },
      { name: 'Shri Suresh Ji', relation: 'Uncle', color: 'hsl(38 28% 21%)', image: groomUncleImg },
      { name: 'Smt. Meena Ji', relation: 'Aunt', color: 'hsl(218 32% 17%)', image: groomAuntImg },
    ],
  },
  {
    side: 'bride',
    title: "The Bride's Family",
    hindiTitle: 'वधू पक्ष',
    parents: 'Shri Mahendra & Smt. Kavita',
    color: 'hsl(218 40% 18%)',
    mainImage: brideMainImg,
    members: [
      { name: 'Shri Mahendra Ji', relation: 'Father', color: 'hsl(218 38% 18%)', image: brideFatherImg },
      { name: 'Smt. Kavita Ji', relation: 'Mother', color: 'hsl(38 28% 21%)', image: brideMotherImg },
      { name: 'Ankur Verma', relation: 'Brother', color: 'hsl(25 30% 20%)', image: brideBrotherImg },
      { name: 'Neha Verma', relation: 'Sister', color: 'hsl(218 35% 16%)', image: brideSisterImg },
      { name: 'Shri Devendra Ji', relation: 'Grandfather', color: 'hsl(38 25% 19%)', image: brideGrandfatherImg },
      { name: 'Smt. Shanti Devi', relation: 'Grandmother', color: 'hsl(25 28% 22%)', image: brideGrandmotherImg },
      { name: 'Shri Narendra Ji', relation: 'Uncle', color: 'hsl(218 40% 17%)', image: brideUncleImg },
      { name: 'Smt. Asha Ji', relation: 'Aunt', color: 'hsl(38 30% 20%)', image: brideAuntImg },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   ROYAL KALASH ICON — Traditional Rajasthani Element
   ═══════════════════════════════════════════════════ */
const KalashIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 48 56" className={`w-8 h-10 md:w-10 md:h-12 ${className}`} aria-hidden="true">
    <defs>
      <linearGradient id="kalash-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFF9C4" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <filter id="kalash-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Coconut */}
    <ellipse cx="24" cy="8" rx="6" ry="5" fill="url(#kalash-gold)" filter="url(#kalash-glow)">
      <animate attributeName="ry" values="5;5.5;5" dur="2s" repeatCount="indefinite" />
    </ellipse>
    {/* Mango leaves */}
    <path d="M18,10 Q14,6 10,10 Q14,14 18,10" fill="#4CAF50" opacity="0.8" />
    <path d="M30,10 Q34,6 38,10 Q34,14 30,10" fill="#4CAF50" opacity="0.8" />
    <path d="M24,5 Q24,0 24,2" stroke="#4CAF50" strokeWidth="1.5" fill="none" />
    {/* Pot rim */}
    <ellipse cx="24" cy="16" rx="10" ry="3" fill="url(#kalash-gold)" />
    {/* Pot body */}
    <path d="M14,16 Q12,30 16,42 Q20,50 24,52 Q28,50 32,42 Q36,30 34,16" fill="url(#kalash-gold)" />
    {/* Decorative band */}
    <ellipse cx="24" cy="30" rx="9" ry="2" fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.6" />
    <ellipse cx="24" cy="38" rx="7" ry="1.5" fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

/* ═══════════════════════════════════════
   RAJASTHANI JAALI PATTERN (SVG) — Enhanced
   ═══════════════════════════════════════ */
const JaaliPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 200 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="jaali-family" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        {/* Central medallion */}
        <circle cx="25" cy="25" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" />
        <circle cx="25" cy="25" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.1" />
        {/* Arch motifs - top and bottom */}
        <path d="M25,0 Q25,12 15,17 Q5,22 0,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        <path d="M25,0 Q25,12 35,17 Q45,22 50,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        <path d="M25,50 Q25,38 15,33 Q5,28 0,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        <path d="M25,50 Q25,38 35,33 Q45,28 50,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        {/* Diamond at center */}
        <path d="M25,21 L28,25 L25,29 L22,25 Z" fill="hsl(var(--primary))" opacity="0.1" />
        {/* Corner dots */}
        <circle cx="0" cy="0" r="1.5" fill="hsl(var(--primary))" opacity="0.08" />
        <circle cx="50" cy="0" r="1.5" fill="hsl(var(--primary))" opacity="0.08" />
        <circle cx="0" cy="50" r="1.5" fill="hsl(var(--primary))" opacity="0.08" />
        <circle cx="50" cy="50" r="1.5" fill="hsl(var(--primary))" opacity="0.08" />
      </pattern>
      <linearGradient id="jaali-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="50%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.5" />
      </linearGradient>
      <mask id="jaali-mask">
        <rect width="200" height="300" fill="url(#jaali-fade)" />
      </mask>
    </defs>
    <rect width="200" height="300" fill="url(#jaali-family)" mask="url(#jaali-mask)" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   SHARED PEACOCK SVG DEFS — Same as Events Section
   ═══════════════════════════════════════════════════ */
const SharedPeacockDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="fam-pbod" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF"/>
        <stop offset="50%" stopColor="#0277BD"/>
        <stop offset="100%" stopColor="#1A237E"/>
      </linearGradient>
      <linearGradient id="fam-pwin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AEEA00"/>
        <stop offset="50%" stopColor="#00B0FF"/>
        <stop offset="100%" stopColor="#000051"/>
      </linearGradient>
      
      {/* Peacock SVG Template */}
      <g id="fam-mini-peacock">
        {/* Tail */}
        <g className="cel-peacock-tail-group">
          <path d="M-10 10 C-30 -10, -50 20, -60 40 C-30 60, 0 30, 0 10Z" fill="#004D40"/>
          <path d="M-5 15 C-20 0, -40 25, -45 40 C-20 50, 0 30, -5 15Z" fill="#00695C"/>
          {/* Eyes on tail */}
          <ellipse cx="-45" cy="30" rx="3" ry="5" fill="#D4AF37" transform="rotate(-30 -45 30)"/>
          <circle cx="-45" cy="30" r="1.5" fill="#0D47A1"/>
          <ellipse cx="-35" cy="40" rx="4" ry="6" fill="#D4AF37" transform="rotate(-50 -35 40)"/>
          <circle cx="-35" cy="40" r="2" fill="#0D47A1"/>
          <ellipse cx="-20" cy="45" rx="3" ry="5" fill="#D4AF37" transform="rotate(-70 -20 45)"/>
          <circle cx="-20" cy="45" r="1.5" fill="#0D47A1"/>
        </g>
        {/* Neck & Head */}
        <g className="cel-peacock-neck-group">
          <path d="M8 12 C10 0, 15 -10, 20 -15 C25 -10, 25 0, 15 15" fill="url(#fam-pbod)"/>
          <circle cx="21" cy="-17" r="6" fill="#0277BD"/>
          {/* Beak */}
          <polygon points="26,-18 32,-15 25,-14" fill="#FFD700"/>
          {/* Crest */}
          <path d="M20 -23 L18 -30 M22 -23 L22 -32 M24 -23 L26 -30" stroke="#00E5FF" strokeWidth="0.8"/>
          <circle cx="18" cy="-30" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          <circle cx="22" cy="-32" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          <circle cx="26" cy="-30" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          {/* Eye */}
          <circle cx="22" cy="-18" r="1" fill="#FFF"/>
        </g>
        {/* Body */}
        <ellipse cx="0" cy="15" rx="14" ry="10" fill="url(#fam-pbod)" className="cel-peacock-body" />
        {/* Wing */}
        <path d="M0 10 C-10 10, -20 20, -10 25 C0 20, 10 15, 0 10Z" fill="url(#fam-pwin)" className="cel-peacock-wing" />
      </g>
    </defs>
  </svg>
);

/* ═══════════════════════════════════════════════════
   CARD BOTTOM DECOR — Flanking Peacocks with Diya
   ═══════════════════════════════════════════════════ */
const CardBottomDecor: React.FC = () => (
  <div className="fam-card-bottom-decor">
    <svg viewBox="0 0 280 80" width="100%" height="auto" className="fam-peacock-decor">
      {/* Platform */}
      <ellipse cx="140" cy="65" rx="50" ry="10" fill="rgba(15, 23, 42, 0.8)" stroke="#D4AF37" strokeWidth="1.5"/>
      <ellipse cx="140" cy="65" rx="40" ry="7" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6"/>

      {/* Flanking Peacocks */}
      <g transform="translate(50, 45) scale(0.7)">
        <use href="#fam-mini-peacock" />
      </g>
      <g transform="translate(230, 45) scale(-0.7, 0.7)">
        <use href="#fam-mini-peacock" />
      </g>

      {/* Center Diya */}
      <g transform="translate(125, 40) scale(0.8)">
        <ellipse cx="15" cy="15" rx="12" ry="4" fill="#B8860B"/>
        <path d="M3 15 Q3 28 15 28 Q27 28 27 15Z" fill="#D4AF37"/>
        {/* Animated Flame */}
        <g className="cel-diya-flame-inner">
          <ellipse cx="15" cy="6" rx="3" ry="6" fill="#FF9800"/>
          <ellipse cx="15" cy="8" rx="1.5" ry="4" fill="#FFF59D"/>
        </g>
        {/* Flame Glow */}
        <circle cx="15" cy="8" r="10" fill="rgba(255, 152, 0, 0.3)" className="cel-diya-flame-glow" style={{ mixBlendMode: 'screen' }}/>
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════
   FLOATING SPARKLES — Luxurious Particle Effect
   ═══════════════════════════════════════════════════ */
const FloatingSparkles: React.FC<{ active: boolean }> = ({ active }) => {
  const sparkles = React.useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      size: 2 + Math.random() * 3,
    })), []
  );
  
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="fam-sparkle"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ROYAL CARD BORDER — Themed with PeacockCorner (Same as Events)
   ═══════════════════════════════════════════════════════ */
const RoyalCardBorder: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`fam-royal-border ${active ? 'fam-royal-border-active' : ''}`}>
    {/* Rotating glow border - same as Events section */}
    <div className="fam-glow-border-layer" />
    
    {/* Inner container */}
    <div className="fam-border-inner-container">
      {/* Decorative inner framing line */}
      <div className="fam-border-frame-line" />
      
      {/* Shimmer effect layer */}
      <div className="fam-frame-shimmer" />
    </div>
    
    {/* PeacockCorner ornaments - SAME as Events section for theming */}
    <div className="fam-peacock-corners">
      <PeacockCorner pos="tl" />
      <PeacockCorner pos="tr" />
      <PeacockCorner pos="bl" />
      <PeacockCorner pos="br" />
    </div>
  </div>
);

/* ═══════════════════════════════════════
   ORNATE FLORAL BORDER (Inspired by Image)
   ═══════════════════════════════════════ */
const OrnateBorder: React.FC<{ active: boolean; size?: 'large' | 'small' }> = ({ active, size = 'large' }) => {
  const isSmall = size === 'small';
  return (
    <div className={`ornate-border-container ${isSmall ? 'ornate-border-small' : ''}`}>
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Double Gold Border Lines with Glow */}
        <rect 
            x="10" y="10" width="380" height="480" 
            stroke="url(#gold-gradient)" strokeWidth="1.5" 
            className={`animate-border-glow transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}
        />
        <rect 
            x="14" y="14" width="372" height="472" 
            stroke="url(#gold-gradient)" strokeWidth="0.8" opacity="0.6"
            className={`transition-all duration-700 delay-300 ${active ? 'opacity-60' : 'opacity-0'}`}
        />

        {/* Top-Left Floral Corner */}
        <g className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path 
            d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
          />
          <path 
            d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
            style={{ animationDelay: '0.2s' }}
          />
          <path 
            d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
            style={{ animationDelay: '0.4s' }}
          />
        </g>

        {/* Top-Right Floral Corner */}
        <g transform="translate(400, 0) scale(-1, 1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Bottom-Left Floral Corner */}
        <g transform="translate(0, 500) scale(1, -1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Bottom-Right Floral Corner */}
        <g transform="translate(400, 500) scale(-1, -1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#ffcc66" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
      {/* Animated Shimmer Sweep */}
      <div className="gold-shimmer-sweep-overlay" />
    </div>
  );
};

/* ═════════════════════════════��═════════
   JHAROKHA SVG FRAME (Arch + Jali)
   ═══════════════════════════════════════ */
const JharokhaSVG: React.FC<{ active: boolean; size?: 'large' | 'small' }> = ({ active, size = 'large' }) => {
  const isSmall = size === 'small';
  return (
    <svg
      className={`absolute pointer-events-none z-30 ${active ? 'jharokha-draw' : ''} ${isSmall ? 'animate-frame-pulse' : ''}`}
      style={{
        inset: '-12px',
        width: 'calc(100% + 24px)',
        height: 'calc(100% + 24px)',
      }}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer arch */}
      <path
        d="M10,160 L10,65 Q10,10 60,10 Q110,10 110,65 L110,160"
        stroke="hsl(var(--primary))"
        strokeWidth="1.8"
        opacity="0.8"
        strokeLinecap="round"
        className="jharokha-path"
      />
      {/* Inner arch */}
      <path
        d="M18,160 L18,68 Q18,20 60,20 Q102,20 102,68 L102,160"
        stroke="hsl(var(--primary))"
        strokeWidth="1.0"
        opacity="0.4"
        className="jharokha-path"
      />
      {/* Jali cross-lattice */}
      <path d="M25,110 Q60,95 95,110" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" className="jharokha-path" />
      <path d="M25,125 Q60,112 95,125" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      <path d="M25,140 Q60,128 95,140" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" className="jharokha-path" />
      {/* Vertical lattice */}
      <path d="M40,105 L40,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" />
      <path d="M60,100 L60,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      <path d="M80,105 L80,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" />
      {/* Mini arches inside jali */}
      <path d="M40,135 Q50,125 60,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      <path d="M60,135 Q70,125 80,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      {/* Keystone ornament */}
      <g transform="translate(55, 4)">
        <path d="M5 0L7 4L11 5L7 6L5 11L3 6L-1 5L3 4Z" fill="hsl(var(--primary))" opacity="0.8" />
      </g>
      {/* Side ornaments on arch */}
      <circle cx="15" cy="90" r="2.5" fill="hsl(var(--primary))" opacity="0.5" />
      <circle cx="105" cy="90" r="2.5" fill="hsl(var(--primary))" opacity="0.5" />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   MINI DIYA — Small animated flame element
   ═══════════════════════════════════════════════════════ */
const MiniDiya: React.FC<{ position: 'top-left' | 'top-right' }> = ({ position }) => (
  <div className={`fam-mini-diya fam-mini-diya-${position}`}>
    <div className="fam-diya-base" />
    <div className="fam-diya-flame-wrap">
      <div className="fam-diya-flame" />
      <div className="fam-diya-flame-glow" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   ENHANCED JHAROKHA FRAME — Royal Palace Window Style
   ═══════════════════════════════════════════════════════ */
const EnhancedJharokhaFrame: React.FC<{ active: boolean; children: React.ReactNode }> = ({ active, children }) => (
  <div className="fam-jharokha-wrapper">
    {/* Mini Diyas at top corners — like Opening section */}
    <MiniDiya position="top-left" />
    <MiniDiya position="top-right" />
    
    {/* Outer glow effect */}
    <div className={`fam-jharokha-glow ${active ? 'fam-jharokha-glow-active' : ''}`} />
    
    {/* Main arch frame SVG */}
    <svg
      className={`fam-jharokha-svg ${active ? 'fam-jharokha-draw' : ''}`}
      viewBox="0 0 200 280"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jharokha-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFF9C4" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="jharokha-glow-filter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer arch frame */}
      <path
        d="M10,280 L10,100 Q10,10 100,10 Q190,10 190,100 L190,280"
        stroke="url(#jharokha-gold-gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter="url(#jharokha-glow-filter)"
        className="fam-jharokha-path"
      />
      
      {/* Inner arch detail */}
      <path
        d="M20,280 L20,105 Q20,25 100,25 Q180,25 180,105 L180,280"
        stroke="url(#jharokha-gold-gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        className="fam-jharokha-path"
      />
      
      {/* Keystone ornament at top */}
      <g transform="translate(85, 2)">
        <path d="M15,0 L20,8 L30,10 L20,12 L15,20 L10,12 L0,10 L10,8 Z" fill="url(#jharokha-gold-gradient)" />
        <circle cx="15" cy="10" r="3" fill="#FFF9C4" opacity="0.8" />
      </g>
      
      {/* Decorative side columns */}
      <rect x="8" y="100" width="4" height="180" fill="url(#jharokha-gold-gradient)" opacity="0.3" rx="2" />
      <rect x="188" y="100" width="4" height="180" fill="url(#jharokha-gold-gradient)" opacity="0.3" rx="2" />
      
      {/* Side ornamental dots */}
      <circle cx="10" cy="140" r="4" fill="url(#jharokha-gold-gradient)" opacity="0.6" />
      <circle cx="190" cy="140" r="4" fill="url(#jharokha-gold-gradient)" opacity="0.6" />
      <circle cx="10" cy="200" r="3" fill="url(#jharokha-gold-gradient)" opacity="0.4" />
      <circle cx="190" cy="200" r="3" fill="url(#jharokha-gold-gradient)" opacity="0.4" />
      
      {/* Decorative horizontal band */}
      <path d="M25,260 L175,260" stroke="url(#jharokha-gold-gradient)" strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
    </svg>
    
    {/* Image container with arch clip */}
    <div className="fam-jharokha-image-container">
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   MAIN FAMILY CARD — Royal Rajasthani Design
   ═══════════════════════════════════════════════════════ */
const FamilyCard: React.FC<{
  data: FamilySide;
  active: boolean;
  index: number;
  onOpenModal: () => void;
}> = ({ data, active, index, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Reveal animation on active
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setIsVisible(true), 200 + index * 150);
      return () => clearTimeout(timer);
    }
  }, [active, index]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return; // Disable tilt on mobile
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  return (
    <div
      className={`fam-card-outer ${isVisible ? 'fam-card-visible' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div
        ref={cardRef}
        className="fam-card-inner group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-8px' : '0px'}) scale(${isHovered ? 1.02 : 1})`,
        }}
      >
        {/* Royal border with corner ornaments */}
        <RoyalCardBorder active={isVisible} />
        
        {/* Floating sparkles effect */}
        <FloatingSparkles active={isVisible && isHovered} />
        
        {/* Background with Jaali pattern */}
        <div className="fam-card-bg">
          <JaaliPattern className="opacity-30" />
          <div className="fam-card-bg-gradient" />
        </div>

        {/* Enhanced Jharokha Photo Frame */}
        <EnhancedJharokhaFrame active={isVisible}>
          <img 
            src={data.mainImage} 
            alt={data.title} 
            className="fam-card-photo" 
          />
        </EnhancedJharokhaFrame>

        {/* Title Section */}
        <div className="fam-card-title-section">
          <p className="fam-card-subtitle">{data.title}</p>
          <p className="fam-card-hindi" lang="hi">{data.hindiTitle}</p>
        </div>

        {/* Parents' Names with gold shimmer */}
        <h3 className="fam-card-parents">{data.parents}</h3>

        {/* Royal Luxury Button */}
        <button onClick={onOpenModal} className="fam-royal-btn group/btn">
          <span className="fam-royal-btn-bg" />
          <span className="fam-royal-btn-border" />
          <span className="fam-royal-btn-content">
            <Eye size={14} className="fam-royal-btn-icon" />
            <span className="fam-royal-btn-text">View Family Details</span>
          </span>
          <span className="fam-royal-btn-shimmer" />
        </button>
        
        {/* Bottom Peacock Decor - themed same as Events section */}
        <CardBottomDecor />
        
        {/* Shared Peacock SVG Definitions */}
        <SharedPeacockDefs />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MEMBER CARD (for modal grid)
   ═══════════════════════════════════════ */
const MemberCard: React.FC<{
  member: FamilyMember;
  index: number;
}> = ({ member, index }) => (
  <div
    className="group relative rounded-xl overflow-hidden fam-member-card p-4 md:p-5 flex flex-col items-center text-center cursor-default h-full family-member-card"
    style={{
      animationDelay: `${index * 0.1}s`,
      background: 'hsl(var(--background) / 0.75)',
      border: '1px solid hsl(var(--primary) / 0.15)',
    }}
  >
    {/* Jaali texture */}
    <JaaliPattern className="opacity-20 rounded-xl" />

    {/* Mini Jharokha Photo */}
    <div className="relative w-32 h-44 sm:w-28 sm:h-36 md:w-32 md:h-40 mt-2 shrink-0 mb-4 z-10">
      <div
        className="w-full h-full rounded-t-full rounded-b-lg border-2 border-primary/30 overflow-hidden shadow-lg transition-all duration-700 group-hover:border-primary/60 group-hover:shadow-primary/20"
      >
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115" 
        />
      </div>
      <JharokhaSVG active={true} size="small" />
      <OrnateBorder active={true} size="small" />
    </div>

    {/* Name */}
    <p className="font-heading text-base md:text-lg text-primary mb-1.5 leading-snug line-clamp-2 transition-all z-10 font-bold"
      style={{ textShadow: '0 2px 10px hsl(var(--background) / 0.8)' }}
    >
      {member.name}
    </p>

    {/* Hover divider */}
    <div className="w-10 h-0.5 mx-auto mb-2 group-hover:w-20 transition-all duration-500 z-10"
      style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)' }}
    />

    {/* Relation */}
    <p className="text-[10px] md:text-[11px] text-foreground/70 font-display uppercase tracking-[0.2em] line-clamp-1 z-10 font-medium">
      {member.relation}
    </p>
  </div>
);

/* ═══════════════════════════════════════
   FAMILY DETAILS MODAL (Luxury)
   ═══════════════════════════════════════ */
const FamilyModal: React.FC<{
  data: FamilySide;
  onClose: () => void;
}> = ({ data, onClose }) => {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-6" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 family-modal-backdrop" style={{
        background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, hsl(var(--background) / 0.9) 70%, hsl(var(--background) / 0.98) 100%)',
        backdropFilter: 'blur(16px)',
      }} />

      {/* Modal container */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col family-modal-enter fam-modal-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal jaali overlay */}
        <JaaliPattern className="opacity-15 z-0" />

        {/* Gold border glow */}
        <div className="absolute inset-0 rounded-3xl fam-modal-border pointer-events-none z-20" />

        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-5 border-b border-primary/20 shadow-lg"
          style={{ background: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h3 className="font-heading text-xl md:text-2xl gold-shimmer-slow leading-tight font-bold tracking-wide">{data.title}</h3>
            <p className="font-hindi text-sm text-muted mt-1 opacity-80" lang="hi">{data.hindiTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/30 transition-all duration-500 hover:border-primary hover:scale-110 hover:rotate-180 hover:bg-primary/10 group"
            aria-label="Close"
          >
            <X size={18} className="text-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Members Grid */}
        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar relative z-10 scroll-smooth">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div className="h-px w-full relative z-10" style={{
          background: 'linear-gradient(90deg, transparent 10%, hsl(var(--primary) / 0.5) 50%, transparent 90%)',
        }} />

        {/* Bottom corner ornaments */}
        <div className="absolute bottom-4 left-6 w-8 h-8 pointer-events-none z-20 opacity-30" aria-hidden="true" style={{ transform: 'scaleY(-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
            <path d="M0,0 L12,0 Q6,6 0,12 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-6 w-8 h-8 pointer-events-none z-20 opacity-30" aria-hidden="true" style={{ transform: 'scale(-1,-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
            <path d="M0,0 L12,0 Q6,6 0,12 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN FAMILY SECTION
   ═══════════════════════════════════════ */
interface FamilySectionProps {
  active: boolean;
}

const FamilySection: React.FC<FamilySectionProps> = ({ active }) => {
  const [modalSide, setModalSide] = useState<'groom' | 'bride' | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const openModal = useCallback((side: 'groom' | 'bride') => setModalSide(side), []);
  const closeModal = useCallback(() => setModalSide(null), []);

  const modalData = modalSide ? familyData.find(f => f.side === modalSide) : null;

  // Animate heading on active
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setHeadingVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fam-section">
      {/* Section Heading — Royal Style with Diya (Themed) */}
      <div className={`fam-section-header ${headingVisible ? 'fam-header-visible' : ''}`}>
        {/* Main heading row */}
        <div className="fam-header-content">
          {/* Left Diya - same as other sections */}
          <div className="fam-header-diya">
            <DiyaIcon lit={active} className="fam-diya-icon" />
          </div>
          
          <div className="fam-header-text">
            <h2 className="fam-header-title">Our Families</h2>
            <p className="fam-header-hindi" lang="hi">हमारे परिवार</p>
          </div>
          
          {/* Right Diya */}
          <div className="fam-header-diya">
            <DiyaIcon lit={active} className="fam-diya-icon" />
          </div>
        </div>
        
        {/* Gold divider - same style as Events section */}
        <div className="fam-header-divider">
          <div className="fam-divider-line" />
          <span className="fam-divider-star">&#10022;</span>
          <div className="fam-divider-line" />
        </div>
      </div>

      {/* Family Cards — Side by side on desktop, stacked on mobile */}
      <div className="fam-cards-container">
        {familyData.map((family, i) => (
          <FamilyCard
            key={family.side}
            data={family}
            active={active}
            index={i}
            onOpenModal={() => openModal(family.side)}
          />
        ))}
      </div>

      {/* Bottom Decorative Element */}
      <div className="fam-section-footer" aria-hidden="true">
        <div className="fam-footer-line" />
        <div className="fam-footer-lotus">
          <svg viewBox="0 0 48 24" fill="none" className="w-12 h-6">
            {/* Lotus petals */}
            <path d="M24,20 Q20,12 16,16 Q12,20 8,14 Q4,8 0,12" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M24,20 Q28,12 32,16 Q36,20 40,14 Q44,8 48,12" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.5" />
            {/* Center */}
            <circle cx="24" cy="18" r="4" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="24" cy="18" r="2" fill="hsl(var(--primary))" opacity="0.6" />
          </svg>
        </div>
        <div className="fam-footer-line" />
      </div>

      {/* Modal */}
      {modalData && <FamilyModal data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default FamilySection;
