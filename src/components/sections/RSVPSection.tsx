import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import PeacockCorner from '@/components/global/PeacockCorner';

interface RSVPSectionProps {
  active: boolean;
  guestName: string;
}

/* ═══ Rangoli Mandala — Animated SVG ═══ */
const RangoliMandala: React.FC<{ size?: number; className?: string }> = ({ size = 200, className = '' }) => {
  const petals = 12;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={`${className}`} aria-hidden="true">
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.1" strokeDasharray="4 6" />
      {/* Petal mandala */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (360 / petals) * i;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <ellipse cx="100" cy="55" rx="8" ry="22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.12" />
            <ellipse cx="100" cy="62" rx="4" ry="12" fill="hsl(var(--primary))" opacity="0.04" />
            <circle cx="100" cy="38" r="2" fill="hsl(var(--primary))" opacity="0.1" />
          </g>
        );
      })}
      {/* Inner circles */}
      <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.08" strokeDasharray="2 3" />
      {/* Center dot cluster */}
      <circle cx="100" cy="100" r="6" fill="hsl(var(--primary))" opacity="0.06" />
      <circle cx="100" cy="100" r="2" fill="hsl(var(--primary))" opacity="0.15" />
    </svg>
  );
};

/* ═══ Ornate Envelope Seal ═══ */
const EnvelopeSeal: React.FC<{ opening: boolean }> = ({ opening }) => (
  <div className="rsvp-envelope-container" aria-hidden="true">
    {/* Ambient glow */}
    <div className="absolute inset-0 rounded-full" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 65%)',
      transform: 'scale(2.5)',
      animation: 'rsvp-seal-breathe 3s ease-in-out infinite',
    }} />
    {/* Seal body */}
    <div className={`rsvp-envelope-seal ${opening ? 'rsvp-envelope-seal--opening' : ''}`}>
      {/* Spinning mandala ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" style={{
        animation: 'spin 50s linear infinite',
      }}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 7" />
        {/* 8 small dots around */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 8;
          return <circle key={i} cx={60 + Math.cos(a) * 42} cy={60 + Math.sin(a) * 42} r="1.5" fill="hsl(var(--primary))" opacity="0.2" />;
        })}
      </svg>
      {/* Center emoji */}
      <span className="relative z-10 text-5xl" style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--primary) / 0.3))' }}>
        💌
      </span>
    </div>
  </div>
);

/* ═══ RAJASTHANI JAALI PATTERN (SVG) ═══ */
const JaaliPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 200 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="jaali-rsvp" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        {/* Arch motif */}
        <path d="M20,0 Q20,15 10,20 Q0,25 0,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        <path d="M20,0 Q20,15 30,20 Q40,25 40,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        {/* Diamond at intersection */}
        <path d="M20,18 L22,20 L20,22 L18,20 Z" fill="hsl(var(--primary))" opacity="0.08" />
        {/* Horizontal arch */}
        <path d="M0,20 Q15,20 20,10 Q25,20 40,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.06" />
      </pattern>
    </defs>
    <rect width="200" height="300" fill="url(#jaali-rsvp)" />
  </svg>
);

/* ═══ JHAROKHA SVG FRAME (Arch + Jali) ═══ */
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
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
        className="jharokha-path"
        pathLength="1"
      />
      {/* Inner arch */}
      <path
        d="M18,160 L18,68 Q18,20 60,20 Q102,20 102,68 L102,160"
        stroke="hsl(var(--primary))"
        strokeWidth="0.8"
        opacity="0.3"
        className="jharokha-path"
        pathLength="1"
      />
      {/* Jali cross-lattice */}
      <path d="M25,110 Q60,95 95,110" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" className="jharokha-path" pathLength="1" />
      <path d="M25,125 Q60,112 95,125" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" pathLength="1" />
      <path d="M25,140 Q60,128 95,140" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" className="jharokha-path" pathLength="1" />
      {/* Vertical lattice */}
      <path d="M40,105 L40,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" pathLength="1" />
      <path d="M60,100 L60,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" pathLength="1" />
      <path d="M80,105 L80,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" pathLength="1" />
      {/* Mini arches inside jali */}
      <path d="M40,135 Q50,125 60,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" pathLength="1" />
      <path d="M60,135 Q70,125 80,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" pathLength="1" />
      {/* Keystone ornament */}
      <g transform="translate(55, 4)">
        <path d="M5 0L7 4L11 5L7 6L5 11L3 6L-1 5L3 4Z" fill="hsl(var(--primary))" opacity="0.5" />
      </g>
      {/* Side ornaments on arch */}
      <circle cx="15" cy="90" r="2" fill="hsl(var(--primary))" opacity="0.15" />
      <circle cx="105" cy="90" r="2" fill="hsl(var(--primary))" opacity="0.15" />
    </svg>
  );
};

/* ═══ Ornate Border Frame ═══ */
const OrnateFrame: React.FC = () => (
  <div className="absolute inset-3 md:inset-5 pointer-events-none z-[2]" aria-hidden="true">
    {/* Top border */}
    <div className="absolute top-0 left-8 right-8 h-px" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25) 20%, hsl(var(--primary) / 0.4) 50%, hsl(var(--primary) / 0.25) 80%, transparent)',
    }} />
    {/* Bottom border */}
    <div className="absolute bottom-0 left-8 right-8 h-px" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Left border */}
    <div className="absolute left-0 top-8 bottom-8 w-px" style={{
      background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Right border */}
    <div className="absolute right-0 top-8 bottom-8 w-px" style={{
      background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Corner flourishes */}
    {[
      { pos: 'top-0 left-0', rot: '0' },
      { pos: 'top-0 right-0', rot: '90' },
      { pos: 'bottom-0 right-0', rot: '180' },
      { pos: 'bottom-0 left-0', rot: '270' },
    ].map(({ pos, rot }) => (
      <div key={pos} className={`absolute ${pos} w-16 h-16`}>
        <svg viewBox="0 0 64 64" className="w-full h-full" style={{ transform: `rotate(${rot}deg)` }}>
          <path d="M4,4 C4,28 8,40 28,56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.25" />
          <path d="M4,4 C8,20 14,32 24,44" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15" />
          <circle cx="6" cy="6" r="3" fill="hsl(var(--primary))" opacity="0.2" />
          <circle cx="4" cy="16" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
          <circle cx="16" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
          {/* Tiny leaf */}
          <ellipse cx="20" cy="36" rx="3" ry="6" fill="hsl(var(--primary))" opacity="0.08" transform="rotate(-30 20 36)" />
        </svg>
      </div>
    ))}
  </div>
);

/* ═══ Floating Gold Dust (section-specific) ═══ */
const GoldDust: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: `${1.5 + Math.random() * 2}px`,
    delay: `${Math.random() * 6}s`,
    duration: `${3 + Math.random() * 4}s`,
    opacity: 0.1 + Math.random() * 0.15,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: 'hsl(var(--primary))',
            opacity: p.opacity,
            animation: `rsvp-dust-float ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══ Family Contact Card — Premium ═══ */
const FamilyContactCard: React.FC<{
  image: string;
  name: string;
  relation: string;
  phone: string;
  whatsapp: string;
  delay: string;
  active: boolean;
  animationType?: 'fade-up' | 'slide-right';
}> = ({ image, name, relation, phone, whatsapp, delay, active, animationType = 'fade-up' }) => (
  <div
    className="family-contact-card group"
    style={{ 
      animation: active 
        ? `${animationType === 'slide-right' ? 'contact-slide-reveal' : 'contact-card-reveal'} 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay} both` 
        : 'none' 
    }}
  >
    {/* Jaali texture background */}
    <JaaliPattern className="opacity-30 rounded-2xl transition-opacity duration-700 group-hover:opacity-50" />

    {/* Running gradient rotating border */}
    <div className="running-gradient-border" />

    {/* Animated border glow on hover */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" style={{
      background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent, hsl(var(--primary) / 0.15), transparent)',
      padding: '1px',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }} />
    
    {/* Inner hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
      background: 'radial-gradient(ellipse at 50% 20%, hsl(var(--primary) / 0.12) 0%, transparent 65%)',
    }} />
    
    {/* Infinite spotlight rotating glow */}
    <div className="absolute inset-[-50%] opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none" style={{
      background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.5) 45deg, transparent 90deg, transparent 180deg, hsl(var(--primary) / 0.5) 225deg, transparent 270deg)',
      animation: 'spin 8s linear infinite'
    }} />

    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Jharokha Photo Frame or Icon */}
      <div className="relative w-20 sm:w-24 aspect-[3/4] mb-3 mt-1 sm:mb-4 sm:mt-2 transition-transform duration-500 group-hover:scale-105">
        <div
          className="w-full h-full rounded-t-full rounded-b-md border-2 border-primary/40 overflow-hidden relative group-hover:border-primary/60 transition-colors duration-500"
          style={{ background: 'hsl(var(--card) / 0.8)' }}
        >
          <img src={image} alt={name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Subtle image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <JharokhaSVG active={active} size="small" />
      </div>

      {/* Ornamental mini divider */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6))' }} />
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className="group-hover:rotate-45 transition-transform duration-500">
          <path d="M4 0L5.5 4L4 8L2.5 4Z" fill="hsl(var(--primary))" opacity="0.6" className="group-hover:opacity-100 transition-opacity" />
        </svg>
        <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.6), transparent)' }} />
      </div>

      {/* Name & relation */}
      <p className="font-heading text-lg md:text-xl font-semibold mb-0.5 group-hover:text-primary transition-colors duration-300" style={{ color: 'hsl(var(--text-ivory))', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{name}</p>
      <p className="font-display text-[10px] md:text-xs tracking-[0.15em] uppercase mb-5" style={{ color: 'hsl(var(--primary) / 0.8)' }}>{relation}</p>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 w-full px-2">
        <a href={`tel:${phone}`} className="family-contact-btn group/call flex-1 justify-center relative overflow-hidden" aria-label={`Call ${name}`}>
          {/* Button shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover/call:animate-[button-shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/call:scale-110 transition-transform">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="font-ui text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">Call</span>
        </a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="family-contact-btn family-contact-btn--whatsapp group/wa flex-1 justify-center relative overflow-hidden" aria-label={`WhatsApp ${name}`}>
          <div className="absolute inset-0 -translate-x-full group-hover/wa:animate-[button-shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover/wa:scale-110 transition-transform">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          <span className="font-ui text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
);

/* ═══ Family Contact Section Heading ═══ */
const FamilyContactHeading: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="w-full text-center mb-8" style={{ animation: active ? 'fade-slide-up 0.6s ease-out 0.7s both' : 'none' }}>
    {/* Top ornamental line */}
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px flex-1 max-w-[60px]" style={{
        background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4))',
      }} />
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{
        animation: active ? 'contact-diamond-spin 1s ease-out 1s both' : 'none',
      }}>
        <path d="M10 1L13 10L10 19L7 10Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5" />
        <path d="M10 4L12 10L10 16L8 10Z" fill="hsl(var(--primary))" opacity="0.15" />
      </svg>
      <div className="h-px flex-1 max-w-[60px]" style={{
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)',
      }} />
    </div>

    {/* Heading with Diyas */}
    <div className="flex items-center justify-center gap-3 mb-2">
      <DiyaIcon lit={active} className="w-8 h-8 md:w-10 md:h-10 opacity-80" />
      <h3 className="font-heading text-6xl sm:text-7xl md:text-[80px] font-bold tracking-wide leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFFACD] to-[#B8860B] drop-shadow-md pb-2">
        Contacts
      </h3>
      <DiyaIcon lit={active} className="w-8 h-8 md:w-10 md:h-10 opacity-80" />
    </div>

    {/* Subtitle */}
    <p className="font-body text-xs md:text-sm mt-2" style={{ color: 'hsl(var(--text-cream) / 0.5)' }}>
      For any queries, feel free to reach out
    </p>

    {/* Gold divider */}
    <div className="mt-4">
      <GoldDivider />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   MAIN RSVP SECTION
   ═══════════════════════════════════════════════════════ */
const RSVPSection: React.FC<RSVPSectionProps> = ({ active, guestName }) => {
  const [accepted, setAccepted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPulsing, setButtonPulsing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (active) {
      const t1 = setTimeout(() => setButtonVisible(true), 800);
      const t2 = setTimeout(() => setButtonPulsing(true), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [active]);

  const handleAccept = useCallback(() => {
    if (accepted || isTransitioning) return;

    setIsTransitioning(true);

    // ═══ ROYAL CONFETTI BURST ═══
    // Optimized for realistic, grand, and smooth feel
    const colors = [
      '#D4AF37', // Gold
      '#C8A45C', // Antique Gold
      '#F5F0E8', // Ivory
      '#FFFACD', // Bright Gold
      '#8B7340', // Dark Gold
    ];

    const fire = (opts: confetti.Options) => confetti({
      ...opts,
      colors,
      particleCount: opts.particleCount ? Math.floor(opts.particleCount * 1.5) : 100, // Richer density
      spread: opts.spread ? opts.spread * 1.3 : 80,
      scalar: 1.1, // Slightly scaled down for realism
      ticks: 400,  // Longer hang time in air
      gravity: 0.6, // Slower, more graceful fall
      decay: 0.92,  // Smoother fade out
      startVelocity: 40, // Stronger initial pop
      shapes: ['circle', 'square'], // Added mixed shapes
      disableForReducedMotion: true,
      zIndex: 100,
    });

    // 1. Initial side bursts (The "Fanfare" - quick and sharp)
    fire({ origin: { x: 0.1, y: 0.7 }, angle: 60, spread: 60, particleCount: 60 });
    fire({ origin: { x: 0.9, y: 0.7 }, angle: 120, spread: 60, particleCount: 60 });

    // 2. Main center explosion (The "Grand Joy" - massive and wide)
    setTimeout(() => {
      fire({
        origin: { x: 0.5, y: 0.5 },
        particleCount: 150,
        spread: 120,
        gravity: 0.8,
        scalar: 1.2,
        startVelocity: 50,
      });
    }, 150);

    // 3. Golden Rain (The "Graceful Fall" - from top)
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 90,
        spread: 360,
        origin: { x: 0.5, y: 0.1 },
        colors: ['#D4AF37', '#F5F0E8', '#C8A45C'], // Purely gold & ivory
        gravity: 0.4, // Very slow fall
        scalar: 0.9,
        ticks: 500,
        zIndex: 100,
      });
    }, 400);

    // 4. Final lingering micro-bursts (The "Afterglow")
    setTimeout(() => {
      fire({ origin: { x: 0.3, y: 0.4 }, angle: 50, particleCount: 40, spread: 40, startVelocity: 25 });
      fire({ origin: { x: 0.7, y: 0.4 }, angle: 130, particleCount: 40, spread: 40, startVelocity: 25 });
    }, 700);

    // Make the transition smoother and slightly longer to let confetti shine
    setTimeout(() => {
      setAccepted(true);
    }, 1000);
    
    // Complete transition after content is fully swapped
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1400);
  }, [accepted, isTransitioning]);

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      {/* ══════════ LAYERED BACKGROUND (matches Opening Section) ══════════ */}
      <div className="rsvp-bg-base" aria-hidden="true" />
      <div className="rsvp-bg-gradient" aria-hidden="true" />
      <div className="rsvp-texture-grain" aria-hidden="true" />
      <div className="rsvp-vignette" aria-hidden="true" />
      <div className="rsvp-glow-top" aria-hidden="true" />
      <div className="rsvp-glow-bottom" aria-hidden="true" />

      {/* Section-specific gold dust */}
      <GoldDust />

      {/* Ornate border frame */}
      <OrnateFrame />
      <SectionBorderFrame active={active} variant="royal" />

      {/* ── MAYUR (PEACOCK) CORNERS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <PeacockCorner pos="tl" />
        <PeacockCorner pos="tr" />
        <PeacockCorner pos="bl" />
        <PeacockCorner pos="br" />
      </div>

      {/* Background rangoli — top right */}
      <div className="absolute -top-10 -right-10 opacity-[0.04] pointer-events-none" aria-hidden="true"
        style={{ animation: 'spin 120s linear infinite' }}>
        <RangoliMandala size={300} />
      </div>
      {/* Background rangoli — bottom left */}
      <div className="absolute -bottom-16 -left-16 opacity-[0.03] pointer-events-none" aria-hidden="true"
        style={{ animation: 'spin 100s linear infinite reverse' }}>
        <RangoliMandala size={350} />
      </div>

      {/* ── Main Content — scrollable, vertically centered ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center py-10 md:py-14">

        <div className="w-full text-center max-w-lg mx-auto px-5 md:px-6">
          {/* ── Header with Diyas (Fixed Visibility) ── */}
          <div style={{ 
            animation: active ? 'fade-slide-up 0.6s ease-out' : 'none',
            // Removed opacity/height toggle to keep it visible
          }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <DiyaIcon lit={active} />
              <h2 id="rsvp-heading" className="font-heading text-[30px] md:text-[46px] gold-shimmer-slow leading-none tracking-wide">
                You're Invited
              </h2>
              <DiyaIcon lit={active} />
            </div>
            <GoldDivider />
          </div>

          {/* ── Envelope Seal (Fixed Visibility) ── */}
          <div style={{ 
            animation: active ? 'scale-fade-in 0.7s ease-out 0.35s both' : 'none',
            // Removed opacity/height toggle to keep it visible
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <EnvelopeSeal opening={false} />
          </div>

          {/* ── MAIN CARD (Invitation or Thank You) ── */}
          <div className={`rsvp-letter-card mx-auto transition-all duration-1000 ease-in-out ${accepted ? 'scale-100 shadow-[0_10px_40px_rgba(212,175,55,0.15)] max-w-[320px] md:max-w-[380px]' : 'max-w-lg'}`} 
            style={{ 
              animation: active ? 'fade-slide-up 0.6s ease-out 0.5s both' : 'none',
              borderColor: accepted ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--primary) / 0.12)',
              background: accepted ? 'linear-gradient(165deg, hsl(var(--card)) 0%, hsl(218 50% 12%) 50%, hsl(var(--card)) 100%)' : undefined
            }}>
            
            {/* Top gold accent */}
            <div className="absolute top-0 left-6 right-6 h-[2px]" style={{
              background: accepted 
                ? 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.7) 30%, hsl(var(--accent)) 50%, hsl(var(--primary) / 0.7) 70%, transparent)'
                : 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 30%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 70%, transparent)',
            }} />

            <div className={`relative flex flex-col justify-center overflow-hidden transition-all duration-700 ${accepted ? 'p-5 md:p-7 min-h-[260px]' : 'p-6 md:p-10 min-h-[320px]'}`}>
              {/* Animated background elements for Thank You state */}
              {accepted && (
                <>
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <JaaliPattern />
                  </div>
                  <div className="absolute -top-12 -right-12 opacity-[0.06] pointer-events-none animate-spin-slow">
                    <RangoliMandala size={160} />
                  </div>
                  <div className="absolute -bottom-12 -left-12 opacity-[0.06] pointer-events-none animate-spin-slow-reverse">
                    <RangoliMandala size={160} />
                  </div>
                </>
              )}

              <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {!accepted ? (
                  /* ═══ Invitation Content ═══ */
                  <>
                    <p className="font-body text-base md:text-lg leading-relaxed mb-3" style={{ color: 'hsl(var(--text-cream) / 0.85)' }}>
                      Dear{' '}
                      <span className="font-heading font-semibold text-primary text-lg md:text-xl inline-block"
                        style={{ animation: active ? 'rsvp-name-glow 3s ease-in-out infinite' : 'none' }}>
                        {guestName}
                      </span>,
                    </p>

                    <div className="my-4 mx-auto w-16 h-px" style={{
                      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
                    }} />

                    <p className="font-body text-sm md:text-base leading-relaxed mb-1" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                      We would be truly honoured by your
                    </p>
                    <p className="font-body text-sm md:text-base leading-relaxed mb-5" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                      gracious presence at the wedding celebrations of
                    </p>

                    {/* Couple names */}
                    <div className="my-5">
                      <p className="font-display text-xl md:text-[28px] text-primary tracking-[0.15em] leading-tight">
                        HARSHIT
                      </p>
                      <p className="font-heading text-primary/60 text-lg my-1">&</p>
                      <p className="font-display text-xl md:text-[28px] text-primary tracking-[0.15em] leading-tight">
                        ANSHIKHA
                      </p>
                    </div>

                    {/* Date & venue */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-8 h-px" style={{ background: 'hsl(var(--primary) / 0.3)' }} />
                      <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'hsl(var(--text-cream) / 0.5)' }}>
                        Save the Date
                      </p>
                      <div className="w-8 h-px" style={{ background: 'hsl(var(--primary) / 0.3)' }} />
                    </div>
                    <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream) / 0.65)' }}>
                      9th – 11th May 2026
                    </p>
                  </>
                ) : (
                  /* ═══ Ultra-Luxurious Thank You Content ═══ */
                  <div className="py-2">
                    {/* Celebration emoji with bounce */}
                    <div className="text-4xl md:text-5xl mb-3" style={{ animation: 'rsvp-celebration-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                      ✨
                    </div>

                    <h3 className="font-heading font-semibold text-[24px] md:text-[30px] gold-shimmer-slow mb-1 leading-tight">
                      Thank You,
                    </h3>

                    <p className="font-display text-xl md:text-2xl text-primary mb-4 tracking-wide"
                      style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.2)' }}>
                      {guestName}!
                    </p>

                    {/* Royal Divider */}
                    <div className="flex items-center justify-center gap-2 my-4 opacity-50">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                      <DiyaIcon lit={true} className="scale-[0.4]" />
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
                    </div>

                    <p className="font-body text-sm md:text-base mb-6 leading-relaxed italic px-2"
                      style={{ color: 'hsl(var(--text-ivory) / 0.9)' }}>
                      "We are truly delighted to have you celebrate this auspicious occasion with us."
                    </p>

                    <div className="mt-4">
                      <div className="w-16 h-[1px] mx-auto mb-3" style={{
                        background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5), transparent)',
                      }} />
                      <p className="font-display text-sm md:text-base text-primary tracking-[0.2em] mb-1">
                        HARSHIT & ANSHIKHA
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom gold accent */}
            <div className="absolute bottom-0 left-8 right-8 h-px" style={{
              background: accepted 
                ? 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)'
                : 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)',
              height: accepted ? '2px' : '1px'
            }} />
          </div>

          {/* ── Hindi blessing / Hashtag — swaps based on accepted ── */}
          <div className="relative h-20 mt-6 mb-4 flex items-center justify-center">
            {!accepted ? (
              <p className="font-hindi text-sm text-muted animate-in fade-in slide-in-from-bottom-2 duration-700" lang="hi">
                आपकी उपस्थिति हमारा सम्मान होगा
              </p>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-1000">
                <p className="font-hashtag text-primary text-xl md:text-2xl gold-shimmer mb-1">
                  #HarAnshTera
                </p>
                <div className="h-px w-20 mx-auto bg-primary/30" />
              </div>
            )}
          </div>

          {/* ═══ THE ACCEPT BUTTON — Made even more prominent ═══ */}
          {!accepted && (
            <div className="relative mt-6 w-full max-w-[280px] sm:max-w-[320px] mx-auto" style={{
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              display: accepted ? 'none' : 'block'
            }}>
              {/* Enhanced radial glow behind button */}
              {buttonPulsing && (
                <div className="absolute -inset-6 rounded-[2rem] opacity-40 pointer-events-none" style={{
                  background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
                  animation: 'rsvp-button-heartbeat 3s ease-in-out infinite',
                }} />
              )}
              
              <button 
                onClick={handleAccept} 
                disabled={isTransitioning}
                className={`rsvp-accept-btn group/accept w-full px-6 py-4 sm:py-5 text-base sm:text-lg shadow-[0_8px_30px_rgba(200,164,92,0.3)] transition-all duration-700 ease-out 
                  ${isTransitioning 
                    ? 'opacity-80 scale-95 shadow-[0_0_20px_rgba(200,164,92,0.6)] brightness-110' 
                    : 'hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(200,164,92,0.5)] active:scale-95'
                  }`}
              >
                <span className={`relative z-10 flex items-center justify-center gap-3 transition-transform duration-500 ${isTransitioning ? 'scale-95' : ''}`}>
                  <span className="tracking-[0.1em] font-bold whitespace-nowrap">
                    {isTransitioning ? 'CONFIRMING...' : 'ACCEPT INVITATION'}
                  </span>
                  <span className={`text-xl sm:text-2xl transition-all duration-700 ${isTransitioning ? 'animate-pulse scale-110' : 'group-hover/accept:scale-125 group-hover/accept:rotate-12'}`}>
                    {isTransitioning ? '✨' : '💌'}
                  </span>
                </span>
                
                {/* Extra luxury shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover/accept:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/accept:translate-x-[200%] transition-transform duration-1000" />
                </div>
                
                {/* Continuous subtle shimmer */}
                {!isTransitioning && <div className="rsvp-accept-shimmer pointer-events-none" />}
                
                {/* Transition expanding ring */}
                {isTransitioning && (
                  <div className="absolute inset-0 rounded-xl border-2 border-white/50 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                )}
              </button>
            </div>
          )}

          {/* Hashtag (only if not accepted yet) */}
          {!accepted && (
            <p className="font-hashtag text-primary/40 text-sm mt-8 animate-in fade-in duration-1000 delay-1000">
              #HarAnshTera
            </p>
          )}
        </div>

        {/* ── Family Contact Section ── */}
        <div className="w-full mt-12 md:mt-16 max-w-6xl mx-auto">
          <FamilyContactHeading active={active} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 px-2 md:px-6 lg:px-10">
            <FamilyContactCard
              image="/images/gallery/moment-1.jpg"
              name="Rajesh Sharma"
              relation="Father of the Groom"
              phone="+919999999999"
              whatsapp="919999999999"
              delay="0.2s"
              active={active}
              animationType="slide-right"
            />
            <FamilyContactCard
              image="/images/gallery/moment-2.jpg"
              name="Suresh Agarwal"
              relation="Father of the Bride"
              phone="+919999999998"
              whatsapp="919999999998"
              delay="0.35s"
              active={active}
              animationType="slide-right"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="rsvp-footer w-full" style={{ animation: active ? 'fade-in 0.5s ease-out 1.2s both' : 'none' }}>
          {/* Ornate divider */}
          <div className="mx-auto mb-5 opacity-30">
            <svg width="120" height="12" viewBox="0 0 120 12" aria-hidden="true">
              <path d="M0,6 L50,6" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              <path d="M70,6 L120,6" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              <circle cx="60" cy="6" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <circle cx="60" cy="6" r="1.5" fill="hsl(var(--primary))" opacity="0.5" />
            </svg>
          </div>

          <p className="font-body text-xs text-muted mb-2">Made with love for</p>
          <p className="font-display text-sm text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
          <p className="font-hashtag text-primary/40 text-xs">#HarAnshTera</p>
          <p className="font-body text-[10px] text-muted mt-1">10th May 2026</p>

          {/* Bottom jaali pattern */}
          <div className="mt-6 mx-auto max-w-[240px] h-5 opacity-[0.07]" aria-hidden="true">
            <svg viewBox="0 0 240 20" className="w-full h-full" preserveAspectRatio="none">
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => (
                <React.Fragment key={x}>
                  <path d={`M${x},10 L${x + 12},0 L${x + 24},10 L${x + 12},20 Z`} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" />
                  <circle cx={x + 12} cy={10} r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" />
                </React.Fragment>
              ))}
            </svg>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default RSVPSection;
