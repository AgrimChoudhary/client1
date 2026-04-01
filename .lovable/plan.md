# Celebrations Section — Next Level Royal Enhancement

## Overview

Enhance the card hover/border effects, improve tab design for better UX clarity, increase date/time visibility, and add subtle royal elements — all while keeping card size same or smaller and maintaining 60fps performance.

---

## 1. Card Border Glow on Hover — Animated Gold Tracing

**Current:** Static golden glow behind card via `::before` with blur. Border spotlight exists but is subtle.

**Enhancement:**

- Add a `::after` pseudo-element on `.cel-event-card` that creates an **animated golden light tracing** effect along the card border on hover
- Uses `conic-gradient` rotating around the border edge (lightweight single animation, not the heavy version removed earlier)
- On mobile: a brief golden pulse on the border on tap via `:active`
- The existing `::before` radial glow stays but gets a warmer, slightly stronger gradient with amber tones mixed in (royal warmth)

**CSS approach:**

```css
.cel-event-card::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 26px;
  background: conic-gradient(from var(--border-angle, 0deg), transparent 60%, #FFD700 80%, #FF8C00 90%, transparent 100%);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 2px;
  opacity: 0;
  transition: opacity 0.4s ease;
  --border-angle: 0deg;
}
.cel-event-card:hover::after {
  opacity: 1;
  animation: cel-border-trace 3s linear infinite;
}
@keyframes cel-border-trace {
  to { --border-angle: 360deg; }
}
```

- Uses `@property` for `--border-angle` to enable CSS animation of custom property (GPU-friendly)

## 2. Tab Design — Premium Segmented Control

**Current:** Tabs are basic boxes with golden active state and a small ◆ indicator.

**Enhancement:**

- Redesign tabs as a **premium segmented control** with a shared background container
- Active tab gets a **solid golden pill** that slides between tabs (animated `translateX` on a shared indicator element)
- Active tab text: bright white on gold background
- Inactive tabs: subtle text with a gentle hover lift
- Add a tiny golden underline pulse animation on the active tab
- Remove the ◆ indicator (replaced by the pill background itself being obvious enough)

**Implementation in JSX:**

- Add a sliding indicator `div` positioned absolutely inside `.cel-tabs-wrapper`, whose `left` and `width` update based on active tab index
- Smooth `transition: left 0.4s cubic-bezier(...)` for the slide effect

## 3. Date & Time — Bigger, Bolder

**Current:** `clamp(13px, 3vw, 15px)` — too small on mobile.

**Change:**

- Date: `clamp(14px, 3.5vw, 16px)` with `font-weight: 700`
- Time: same size increase
- Add a subtle golden underline below the date/time row
- Calendar emoji size: `18px` → keeps proportion

## 4. Card Size — Slightly Tighter

**Current:** `padding: '32px 16px 20px'` in OrnateFrame.

**Change:**

- Reduce to `padding: '28px 14px 16px'`
- Reduce `EventBottomDecor` container `minHeight: 80px` → `60px`
- Reduce card `marginTop: 28px` → `20px`
- These subtle reductions make cards more compact without losing content

## 5. Royal Rajasthani Micro-Details

- **Gold corner filigree sparkle**: Add a subtle `@keyframes cel-corner-twinkle` that makes PeacockCorner gold elements pulse softly (opacity 0.6 → 1.0, 4s cycle)
- **Dress code badge**: Add a faint shimmer sweep across the dress code pill on card hover
- **Maps button**: Add a subtle golden border glow on hover

---

## Files to Edit

1. `**src/index.css**` — Border trace animation, tab redesign, date size, card padding tweaks, micro-detail animations
2. `**src/components/sections/CelebrationsSection.tsx**` — Tab sliding indicator element, date/time font size increase, OrnateFrame padding reduction

## Performance Guarantee

- Border trace uses `@property` + `conic-gradient` (composited, no layout)
- Tab slide uses only `transform: translateX` (GPU layer)
- All new animations use `opacity` and `transform` only
- No new JS event listeners or state variables