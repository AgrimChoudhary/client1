import React, { useEffect, useState, useRef, useCallback } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import PeacockCorner from '@/components/global/PeacockCorner';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
import { useGuestName } from '@/hooks/useGuestName';

interface CountdownSectionProps {
  active: boolean;
  onNext: () => void;
}

const WEDDING_DATE = new Date('2026-05-10T00:00:00+05:30');

/* ═══ TIME CALCULATION ═══ */
function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'after' as const };
  const ws = new Date('2026-05-09T00:00:00+05:30');
  const we = new Date('2026-05-11T23:59:59+05:30');
  if (now >= ws && now <= we) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'during' as const };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    state: 'before' as const,
  };
}

/* ═══ SPARKLE BURST (click effect) ═══ */
interface Sparkle { id: number; x: number; y: number; }

const SparkleLayer: React.FC<{ sparkles: Sparkle[] }> = ({ sparkles }) => (
  <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
    {sparkles.map(s => (
      <div key={s.id} className="absolute" style={{ left: s.x, top: s.y }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dist = 30 + Math.random() * 40;
          return (
            <div
              key={i}
              className="cd-sparkle-particle"
              style={{
                '--sx': `${Math.cos(angle) * dist}px`,
                '--sy': `${Math.sin(angle) * dist}px`,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    ))}
  </div>
);

/* ═══ STARFIELD CANVAS ═══ */
const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Star { x: number; y: number; r: number; speed: number; phase: number; phaseSpeed: number; color: string; }
    const colors = ['#FFD700', '#FFECB3', '#FFFFFF', '#FFF8DC', '#87CEEB'];
    const count = w < 768 ? 60 : 120;
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.015 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.phase += s.phaseSpeed;
        s.y += s.speed;
        s.x += Math.sin(s.phase) * 0.15;
        if (s.y > h + 5) { s.y = -5; s.x = Math.random() * w; }
        const alpha = 0.3 + Math.sin(s.phase) * 0.3;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = s.r * 4;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }} aria-hidden="true" />;
};

/* ═══ ICON COMPONENTS ═══ */
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary/70">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const TimerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const DiamondIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
    <rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)" />
  </svg>
);
const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
    <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" />
    <path d="M18 14L19.18 17.82L23 19L19.18 20.18L18 24L16.82 20.18L13 19L16.82 17.82L18 14Z" opacity="0.6" />
  </svg>
);

/* Unit icons and gradient colors for each countdown box */
const unitConfig: Record<string, { Icon: React.FC; gradient: string; accentColor: string }> = {
  Days: { 
    Icon: CalendarIcon, 
    gradient: 'linear-gradient(145deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 90, 43, 0.08) 100%)',
    accentColor: '#D4AF37'
  },
  Hours: { 
    Icon: TimerIcon, 
    gradient: 'linear-gradient(145deg, rgba(178, 34, 34, 0.12) 0%, rgba(139, 69, 19, 0.08) 100%)',
    accentColor: '#B22222'
  },
  Min: { 
    Icon: DiamondIcon, 
    gradient: 'linear-gradient(145deg, rgba(75, 0, 130, 0.1) 0%, rgba(138, 43, 226, 0.06) 100%)',
    accentColor: '#8B008B'
  },
  Sec: { 
    Icon: SparklesIcon, 
    gradient: 'linear-gradient(145deg, rgba(0, 100, 0, 0.1) 0%, rgba(34, 139, 34, 0.06) 100%)',
    accentColor: '#228B22'
  },
};

/* ═══ LUXURIOUS COUNTDOWN BOX ═══ */
const CountdownBox: React.FC<{ value: number; label: string; idx: number; active: boolean }> = ({ value, label, idx, active }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(value); setFlip(false); }, 350);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');
  const config = unitConfig[label] || unitConfig.Days;

  return (
    <div
      className="cd-glass-card-wrap"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.12}s`,
      }}
    >
      {/* Floating icon badge with colored glow */}
      <div className="cd-card-badge" style={{ animationDelay: `${idx * 0.3}s`, boxShadow: `0 4px 12px ${config.accentColor}30` }}>
        <config.Icon />
      </div>

      {/* Corner accents */}
      <div className="cd-corner cd-corner-tl" />
      <div className="cd-corner cd-corner-tr" />
      <div className="cd-corner cd-corner-bl" />
      <div className="cd-corner cd-corner-br" />

      {/* The card with gradient overlay */}
      <div className="cd-glass-card" style={{ background: config.gradient }}>
        {/* Inner gradient shine */}
        <div className="cd-glass-shine" />
        {/* Sweep shimmer */}
        <div className="cd-glass-sweep" />
        {/* Accent border glow */}
        <div className="cd-glass-accent" style={{ boxShadow: `inset 0 0 20px ${config.accentColor}15` }} />

        <span className={`cd-glass-digit ${flip ? 'cd-digit-flip' : ''}`} style={{ color: config.accentColor }}>
          {display}
        </span>
      </div>

      {/* Label */}
      <span className="cd-glass-label">{label}</span>
    </div>
  );
};

/* ═══ BLESSINGS DATA ═══ */
interface BlessingData {
  name: string;
  message: string;
  initials: string;
  photo?: string; // Optional photo URL
}

const sampleBlessings: BlessingData[] = [
  { name: 'Rajesh Uncle', message: 'Wishing you both a lifetime of love and happiness!', initials: 'RU' },
  { name: 'Priya Aunty', message: 'May your journey together be filled with joy and laughter.', initials: 'PA' },
  { name: 'Amit & Neha', message: 'Congratulations! You make a beautiful couple.', initials: 'AN', photo: '/images/guests/amit-neha.jpg' },
  { name: 'Sharma Family', message: 'Bahut bahut badhaiyan! May God bless your union.', initials: 'SF' },
  { name: 'Kavita Didi', message: 'So happy for you both! Cannot wait to celebrate!', initials: 'KD' },
  { name: 'Ravi Bhai', message: 'May your love story inspire many more. Best wishes!', initials: 'RB' },
  { name: 'Meera Tai', message: 'Your bond is truly made in heaven. Lots of love!', initials: 'MT' },
  { name: 'Vikram Ji', message: 'Wishing you a beautiful life together. God bless!', initials: 'VJ' },
  { name: 'Anita Mausi', message: 'May your home be filled with laughter and love always.', initials: 'AM' },
  { name: 'Suresh Chacha', message: 'A perfect match! Wishing you eternal happiness.', initials: 'SC' },
];

/* ═══ PREMIUM BLESSING CARD — Luxury Design with Animated Border ═══ */
const BlessingCard: React.FC<{ b: BlessingData }> = ({ b }) => (
  <div className="wish-card">
    {/* Animated gradient border */}
    <div className="wish-card-border" />
    
    {/* Card content */}
    <div className="wish-card-inner">
      {/* Avatar section */}
      <div className="wish-avatar-section">
        {b.photo ? (
          <div className="wish-avatar-photo">
            <img src={b.photo} alt={b.name} className="wish-avatar-img" />
          </div>
        ) : (
          <div className="wish-avatar-initials">
            <span>{b.initials}</span>
          </div>
        )}
        <div className="wish-avatar-ring" />
      </div>
      
      {/* Name and message */}
      <div className="wish-content">
        <h4 className="wish-name">{b.name}</h4>
        <p className="wish-message">{b.message}</p>
      </div>
      
      {/* Decorative corner flourish */}
      <div className="wish-corner-flourish">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary/30">
          <path d="M2 12 Q12 2 22 12 Q12 22 2 12" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>
    </div>
  </div>
);

/* ═══ CONTINUOUS SMOOTH MARQUEE — Infinite Auto-Scroll ═══ */
const BlessingsMarquee: React.FC<{ active: boolean }> = ({ active }) => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  
  const totalWishes = sampleBlessings.length;
  
  // Smooth continuous scroll animation
  useEffect(() => {
    if (!active) return;
    
    const track = trackRef.current;
    if (!track) return;
    
    const cardWidth = 320; // Card width + gap
    const totalWidth = cardWidth * totalWishes;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      if (!isPaused) {
        const delta = (currentTime - lastTime) / 1000;
        scrollRef.current += delta * 40; // Speed: 40px per second
        
        // Reset when scrolled past one full set
        if (scrollRef.current >= totalWidth) {
          scrollRef.current = 0;
        }
        
        track.style.transform = `translateX(-${scrollRef.current}px)`;
      }
      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [active, isPaused, totalWishes]);
  
  // Double the cards for seamless loop
  const doubledBlessings = [...sampleBlessings, ...sampleBlessings];
  
  return (
    <div className="wish-marquee-container">
      {/* Navigation buttons — Desktop: sides, Mobile: bottom */}
      <div className="wish-nav-desktop">
        <button 
          onClick={() => { scrollRef.current = Math.max(0, scrollRef.current - 320); }}
          className="wish-nav-btn"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          onClick={() => { scrollRef.current += 320; }}
          className="wish-nav-btn"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      {/* Marquee viewport */}
      <div 
        className="wish-marquee-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* Fade edges */}
        <div className="wish-fade-left" />
        <div className="wish-fade-right" />
        
        {/* Scrolling track */}
        <div ref={trackRef} className="wish-marquee-track">
          {doubledBlessings.map((b, i) => (
            <BlessingCard key={i} b={b} />
          ))}
        </div>
      </div>
      
      {/* Wish count display instead of dots */}
      <div className="wish-count-display">
        <div className="wish-count-inner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="wish-count-text">{totalWishes} heartfelt wishes received</span>
        </div>
        
        {/* Pause indicator */}
        {isPaused && (
          <div className="wish-paused-indicator">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary/60">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <span>Paused</span>
          </div>
        )}
      </div>
      
      {/* Mobile navigation — Bottom centered */}
      <div className="wish-nav-mobile">
        <button 
          onClick={() => { scrollRef.current = Math.max(0, scrollRef.current - 320); }}
          className="wish-nav-btn-mobile"
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="wish-nav-mobile-label">Swipe or tap to browse</span>
        <button 
          onClick={() => { scrollRef.current += 320; }}
          className="wish-nav-btn-mobile"
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ═══ MAIN COUNTDOWN SECTION ═══ */
const CountdownSection: React.FC<CountdownSectionProps> = ({ active, onNext }) => {
  const guestName = useGuestName();
  const [time, setTime] = useState(getTimeLeft);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [guestPhoto, setGuestPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sparkleId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, [active]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = sparkleId.current++;
    setSparkles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 800);
  }, []);
  
  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('Photo must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setGuestPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const removePhoto = useCallback(() => {
    setGuestPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);
  
  const handleSendBlessing = useCallback(() => {
    if (!blessingMessage.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBlessingMessage('');
      setGuestPhoto(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  }, [blessingMessage]);

  return (
    <section className="cd-section" aria-labelledby="countdown-heading" onClick={handleClick}>
      {/* ── SHARED ROYAL BACKGROUND ── */}
      <RoyalBackground />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="celebrations-particles" />
      </div>

      <SectionBorderFrame active={active} variant="standard" />

      {/* ── MAYUR (PEACOCK) CORNERS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <PeacockCorner pos="tl" />
        <PeacockCorner pos="tr" />
        <PeacockCorner pos="bl" />
        <PeacockCorner pos="br" />
      </div>
      <SparkleLayer sparkles={sparkles} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-8 pt-8 pb-16">
        {/* ── Title ── */}
        <div
          className="text-center mb-10"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <p className="font-heading text-base md:text-lg italic mb-2" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
            Our wedding celebration begins in
          </p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="countdown-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              Counting the Days
            </h2>
          </div>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">शुभ दिन की प्रतीक्षा</p>
          <GoldDivider />
        </div>

        {/* ── Glassmorphism Countdown Cards ── */}
        {time.state === 'before' ? (
          <div className="cd-cards-container">
            {/* Outer gold frame */}
            <div className="cd-cards-frame">
              <div className="cd-cards-frame-inner">
                <div className="cd-cards-grid">
                  <CountdownBox value={time.days} label="Days" idx={0} active={active} />
                  <CountdownBox value={time.hours} label="Hours" idx={1} active={active} />
                  <CountdownBox value={time.minutes} label="Min" idx={2} active={active} />
                  <CountdownBox value={time.seconds} label="Sec" idx={3} active={active} />
                </div>
              </div>
            </div>

            {/* Event Card */}
            <div
              className="cd-event-card"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s',
              }}
            >
              <div className="cd-event-icon">
                <CalendarIcon />
              </div>
              <div>
                <p className="font-display text-sm md:text-base font-bold" style={{ color: 'hsl(var(--text-cream))' }}>
                  May 10, 2026
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ClockIcon />
                  <span className="font-ui text-xs" style={{ color: 'hsl(var(--text-cream) / 0.6)' }}>Shubh Muhurat</span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-sm">⭐</span>
                <SparklesIcon />
              </div>
              {/* Shine sweep */}
              <div className="cd-event-sweep" />
            </div>

            {/* Magic CTA */}
            <p
              className="text-center mt-5 font-body text-xs italic cd-magic-text"
              style={{
                color: 'hsl(var(--primary) / 0.5)',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.5s ease 1s',
              }}
            >
              ✨ Click anywhere for a magical surprise ✨
            </p>
          </div>
        ) : time.state === 'during' ? (
          <div className="text-center mb-14 py-8">
            <div className="text-5xl mb-4">🎉</div>
            <p className="font-heading text-2xl md:text-3xl text-primary">The celebrations have begun!</p>
            <p className="font-hindi text-base text-muted mt-2" lang="hi">उत्सव शुरू हो गया है!</p>
          </div>
        ) : (
          <div className="text-center mb-14 py-8">
            <div className="text-5xl mb-4">💕</div>
            <p className="font-heading text-2xl md:text-3xl text-primary">Thank you for celebrating with us!</p>
          </div>
        )}

        {/* ── Blessings & Wishes Section ── */}
        <div className="cd-blessings-section">
          {/* Section Header */}
          <div
            className="cd-blessings-header"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s ease 0.8s',
            }}
          >
            <div className="cd-blessings-title-row">
              <DiyaIcon lit={active} />
              <h3 className="cd-blessings-title">Blessings & Wishes</h3>
              <DiyaIcon lit={active} />
            </div>
            <p className="cd-blessings-subtitle">Messages from loved ones</p>
            <p className="cd-blessings-hindi" lang="hi">प्रियजनों के आशीर्वाद</p>
            
            {/* Elegant divider */}
            <div className="cd-blessings-divider">
              <div className="cd-divider-line" />
              <span className="cd-divider-star">&#10022;</span>
              <div className="cd-divider-line" />
            </div>
          </div>

          {/* Blessings Marquee — Smooth auto-scroll */}
          <div
            style={{
              opacity: active ? 1 : 0,
              transition: 'opacity 0.8s ease 1s',
            }}
          >
            <BlessingsMarquee active={active} />
          </div>

          {/* Send Blessing Form — Premium Design */}
          <div
            className="cd-send-card-premium"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 1.2s',
            }}
          >
            {/* PeacockCorner ornaments */}
            <div className="cd-send-corners">
              <PeacockCorner pos="tl" />
              <PeacockCorner pos="tr" />
              <PeacockCorner pos="bl" />
              <PeacockCorner pos="br" />
            </div>
            
            <div className="wish-form-inner">
              <h4 className="wish-form-title">Send Your Blessing</h4>
              <p className="wish-form-subtitle">Share your heartfelt wishes with the couple</p>
              
              {/* Guest identity with optional photo */}
              <div className="wish-guest-row">
                {/* Photo upload or initials avatar */}
                <div className="wish-guest-avatar-wrap">
                  {guestPhoto ? (
                    <div className="wish-guest-photo">
                      <img src={guestPhoto} alt="Your photo" className="wish-guest-photo-img" />
                      <button onClick={removePhoto} className="wish-photo-remove" aria-label="Remove photo">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="wish-guest-initials">
                      <span>{guestName.slice(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  
                  {/* Photo upload button */}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    className="sr-only"
                    id="guest-photo-upload"
                  />
                  <label htmlFor="guest-photo-upload" className="wish-photo-upload-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </label>
                </div>
                
                {/* Guest name and photo hint */}
                <div className="wish-guest-info">
                  <span className="wish-guest-name-label">Sending as <strong>{guestName}</strong></span>
                  <span className="wish-photo-hint">Add a photo (optional)</span>
                </div>
              </div>
              
              {/* Message textarea */}
              <div className="wish-textarea-wrap">
                <textarea 
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Write your heartfelt blessing for the couple..."
                  rows={4}
                  className="wish-textarea"
                  maxLength={280}
                />
                <div className="wish-textarea-footer">
                  <span className="wish-char-count">{blessingMessage.length}/280</span>
                </div>
              </div>
              
              {/* Success message */}
              {submitSuccess && (
                <div className="wish-success-msg">
                  <span className="wish-success-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </span>
                  <span>Your blessing has been sent!</span>
                </div>
              )}
              
              {/* Send button */}
              <button 
                onClick={handleSendBlessing}
                disabled={isSubmitting || !blessingMessage.trim()}
                className="wish-send-btn"
              >
                {isSubmitting ? (
                  <span className="wish-btn-loading">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span className="wish-btn-text">Send Blessing</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
                <div className="wish-btn-shine" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Fixed Floating Next Button (Premium Style) ── */}
        <div 
          className="cel-next-btn-wrap"
          style={{
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            pointerEvents: buttonVisible ? 'auto' : 'none',
          }}
        >
          <button 
            onClick={onNext} 
            className="cel-next-btn" 
            aria-label="Next Section: RSVP"
          >
            <div className="cel-diya-container">
              <div className="cel-diya-glow"></div>
              <div className="cel-diya-flame"></div>
              <span className="cel-diya-icon">🪔</span>
            </div>
            <span>Next</span>
            <span className="cel-btn-arrow">→</span>
            <div className="cel-diya-container" style={{ transform: 'scaleX(-1)' }}>
              <div className="cel-diya-glow"></div>
              <div className="cel-diya-flame"></div>
              <span className="cel-diya-icon">🪔</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
