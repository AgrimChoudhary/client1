import React, { useState, useEffect, useCallback } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import RoyalJharokhaFrame from '@/components/global/RoyalJharokhaFrame';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
import PeacockCorner from '@/components/global/PeacockCorner';
import FamilySection from '@/components/sections/FamilySection';

interface GallerySectionProps {
  active: boolean;
  onNext: () => void;
}

/* Gallery images with captions for premium feel */
const galleryImages = [
  { id: 1, src: '/images/gallery/moment-1.jpg', alt: 'Marriage Ritual', caption: 'Sacred Vows', color: 'hsl(38 30% 25%)' },
  { id: 2, src: '/images/gallery/moment-2.jpg', alt: 'Couple in Traditional Attire', caption: 'Royal Elegance', color: 'hsl(218 40% 18%)' },
  { id: 3, src: '/images/gallery/moment-3.jpg', alt: 'Wedding Couple', caption: 'Together Forever', color: 'hsl(38 35% 22%)' },
  { id: 4, src: '/images/gallery/moment-4.jpg', alt: 'Royal Wedding Pose', caption: 'Timeless Love', color: 'hsl(218 35% 16%)' },
  { id: 5, src: '/images/gallery/moment-5.jpg', alt: 'Moment of Love', caption: 'Precious Moments', color: 'hsl(25 30% 20%)' },
  { id: 6, src: '/images/gallery/moment-6.jpg', alt: 'Couple Portrait', caption: 'Eternal Bond', color: 'hsl(38 28% 22%)' },
];

/* ═══════════════════════════════════════════════
   ENHANCED PHOTO FRAME — Royal Jharokha Design
   Rajasthani palace-inspired with animated gold borders
   ═══════════════════════════════════════════════ */
const EnhancedPhotoFrame: React.FC<{ 
  children: React.ReactNode; 
  active: boolean; 
  index: number;
  caption?: string;
}> = ({ children, active, index, caption }) => (
  <div 
    className={`gal-photo-frame ${active ? 'gal-frame-active' : ''}`}
    style={{ animationDelay: `${0.4 + index * 0.12}s` }}
  >
    {/* Royal Jharokha Frame with animated gold border */}
    <RoyalJharokhaFrame animated={true} variant="standard">
      {/* Image container */}
      <div className="gal-image-container">
        {children}
        
        {/* Caption overlay - reveals on hover */}
        {caption && (
          <div className="gal-caption-overlay">
            <span className="gal-caption-text">{caption}</span>
          </div>
        )}
      </div>
    </RoyalJharokhaFrame>
  </div>
);

/* ═══════════════════════════════════════════════
   PHOTO CARD — Enhanced with premium interactions
   ═══════════════════════════════════════════════ */
const PhotoCard: React.FC<{
  image: typeof galleryImages[0];
  index: number;
  active: boolean;
  onClick: () => void;
}> = ({ image, index, active, onClick }) => (
  <button
    onClick={onClick}
    className={`gal-photo-card group ${active ? 'gal-card-active' : ''}`}
    style={{ animationDelay: active ? `${0.4 + index * 0.1}s` : '0s' }}
    aria-label={`View photo: ${image.alt}`}
  >
    <EnhancedPhotoFrame active={active} index={index} caption={image.caption}>
      {/* Background placeholder */}
      <div className="absolute inset-0 gal-placeholder" style={{ background: image.color }}>
        <div className="gal-shimmer-sweep" />
      </div>

      {/* Image with smooth zoom on hover */}
      <img
        src={image.src}
        alt={image.alt}
        className="gal-photo-image"
        loading="lazy"
      />
    </EnhancedPhotoFrame>
  </button>
);

/* ═══════════════════════════════════════════════
   LIGHTBOX — Premium with smooth animations
   ═══════════════════════════════════════════════ */
const Lightbox: React.FC<{
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const image = images[currentIndex];

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onPrev();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, onClose, onPrev, onNext, images.length]);

  return (
    <div className="gal-lightbox" onClick={onClose}>
      {/* Backdrop with blur */}
      <div className="gal-lightbox-backdrop" />

      {/* Image container with Royal Jharokha frame */}
      <div className="gal-lightbox-container" onClick={(e) => e.stopPropagation()}>
        <RoyalJharokhaFrame animated={true} variant="ornate" className="gal-lightbox-jharokha">
          {/* Image wrapper */}
          <div className="gal-lightbox-image-wrap" style={{ background: image.color }}>
            {/* Shimmer placeholder */}
            <div className="gal-shimmer-sweep" />
            
            {/* High Resolution Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="gal-lightbox-image"
            />
          </div>
        </RoyalJharokhaFrame>
        
        {/* Caption */}
        <div className="gal-lightbox-caption">
          <span className="gal-lightbox-caption-text">{image.caption}</span>
          <span className="gal-lightbox-caption-count">{currentIndex + 1} / {images.length}</span>
        </div>
      </div>

      {/* Close button */}
      <button onClick={onClose} className="gal-lightbox-close" aria-label="Close lightbox">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="gal-lightbox-arrow gal-arrow-left"
          aria-label="Previous photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="gal-lightbox-arrow gal-arrow-right"
          aria-label="Next photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      <div className="gal-lightbox-dots">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`gal-dot ${i === currentIndex ? 'gal-dot-active' : ''}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN GALLERY SECTION — Premium Design
   ═══════════════════════════════════════════════ */
const GallerySection: React.FC<GallerySectionProps> = ({ active, onNext }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const headerTimer = setTimeout(() => setHeaderVisible(true), 200);
      const btnTimer = setTimeout(() => setButtonVisible(true), 800);
      return () => { clearTimeout(headerTimer); clearTimeout(btnTimer); };
    }
  }, [active]);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="gal-section" aria-labelledby="gallery-heading">
      {/* Royal Background */}
      <RoyalBackground />

      {/* Border frame */}
      <SectionBorderFrame active={active} variant="standard" />

      {/* ── MAYUR (PEACOCK) CORNERS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <PeacockCorner pos="tl" />
        <PeacockCorner pos="tr" />
        <PeacockCorner pos="bl" />
        <PeacockCorner pos="br" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-10 pb-16">

        {/* Section Heading */}
        {/* ── Family Section (shown first) ── */}
        <FamilySection active={active} />

        {/* Gallery Heading — Premium Style with Diya on both sides */}
        <div className={`gal-header ${headerVisible ? 'gal-header-visible' : ''}`}>
          <div className="gal-header-row">
            <div className="gal-header-diya">
              <DiyaIcon lit={active} />
            </div>
            
            <div className="gal-header-text">
              <h2 id="gallery-heading" className="gal-title">Our Moments</h2>
              <p className="gal-subtitle" lang="hi">हमारे पल</p>
            </div>
            
            <div className="gal-header-diya">
              <DiyaIcon lit={active} />
            </div>
          </div>
          
          {/* Elegant divider */}
          <div className="gal-divider">
            <div className="gal-divider-line" />
            <span className="gal-divider-star">&#10022;</span>
            <div className="gal-divider-line" />
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="gal-grid">
          {galleryImages.map((img, i) => (
            <PhotoCard
              key={img.id}
              image={img}
              index={i}
              active={active}
              onClick={() => openLightbox(i)}
            />
          ))}
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
            aria-label="Next Section: Countdown"
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

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightbox}
          onClose={closeLightbox}
          onPrev={() => setLightbox(Math.max(0, lightbox - 1))}
          onNext={() => setLightbox(Math.min(galleryImages.length - 1, lightbox + 1))}
        />
      )}
    </section>
  );
};

export default GallerySection;
