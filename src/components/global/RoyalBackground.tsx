import React, { useRef, useEffect } from 'react';

/* ═══════════════════════════════════════════════
   GLITTER PARTICLE SYSTEM (Extracted for global use)
   ═══════════════════════════════════════════════ */
const GlitterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);
    
    const timer = setTimeout(resize, 100);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDir: number;
      color: string;
      twinkle: number;
      twinkleSpeed: number;
      glowSize: number;
    }

    const colors = [
      '#FFD700', // Gold
      '#FFECB3', // Soft Amber
      '#FFFFFF', // White
      '#FFF9C4', // Pale Yellow
      '#FFC107', // Amber
      '#FFF59D'  // Lemon
    ];
    
    const particleCount = width < 768 ? 80 : 160;
    
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.7 + 0.3, 
      opacity: Math.random() * 0.6 + 0.2,
      opacityDir: Math.random() > 0.5 ? 0.005 : -0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      glowSize: Math.random() * 10 + 5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.twinkle += p.twinkleSpeed;
        p.x += p.speedX + Math.sin(p.twinkle * 0.5) * 0.2;
        p.y += p.speedY;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const currentOpacity = p.opacity + Math.sin(p.twinkle) * 0.2;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, currentOpacity));
        
        ctx.shadowBlur = p.glowSize;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.size > 1.8) {
          const s = p.size;
          ctx.moveTo(p.x, p.y - s * 2);
          ctx.lineTo(p.x + s * 0.6, p.y - s * 0.6);
          ctx.lineTo(p.x + s * 2, p.y);
          ctx.lineTo(p.x + s * 0.6, p.y + s * 0.6);
          ctx.lineTo(p.x, p.y + s * 2);
          ctx.lineTo(p.x - s * 0.6, p.y + s * 0.6);
          ctx.lineTo(p.x - s * 2, p.y);
          ctx.lineTo(p.x - s * 0.6, p.y - s * 0.6);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};

const RoyalBackground: React.FC = () => {
  return (
    <div aria-hidden="true" className="royal-bg-layers absolute inset-0 pointer-events-none">
      {/* Rich royal blue gradient base */}
      <div className="royal-bg-base absolute inset-0"/>
      {/* Radial light accents */}
      <div className="royal-bg-radial-top absolute inset-0"/>
      <div className="royal-bg-radial-bottom absolute inset-0"/>
      {/* Stars / dust pattern */}
      <div className="royal-bg-stars absolute inset-0"/>
      {/* Glitter canvas */}
      <GlitterCanvas />
    </div>
  );
};

export default RoyalBackground;
