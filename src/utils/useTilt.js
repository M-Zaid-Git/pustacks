import { useRef, useEffect } from 'react';

/**
 * useTilt
 * Adds a subtle 3D tilt and optional glare effect to any element.
 * Options: { maxTilt: number (deg), scale: number, glare: boolean }
 */
export default function useTilt({ maxTilt = 12, scale = 1.02, glare = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let bounds = el.getBoundingClientRect();
    let frame;

    const setTransform = (x, y) => {
      const px = (x - bounds.left) / bounds.width;
      const py = (y - bounds.top) / bounds.height;
      const tiltX = (py - 0.5) * 2 * maxTilt; // invert for natural tilt
      const tiltY = (0.5 - px) * 2 * maxTilt;
      el.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${scale})`;

      if (glare) {
        const glareEl = el.querySelector('[data-glare]');
        if (glareEl) {
          const angle = Math.atan2(y - (bounds.top + bounds.height / 2), x - (bounds.left + bounds.width / 2));
          const deg = (angle * 180) / Math.PI + 180;
          glareEl.style.background = `linear-gradient(${deg}deg, rgba(255,255,255,0.35), transparent 60%)`;
        }
      }
    };

    const onEnter = () => {
      bounds = el.getBoundingClientRect();
      el.style.willChange = 'transform';
    };

    const onMove = (e) => {
      if (frame) cancelAnimationFrame(frame);
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      frame = requestAnimationFrame(() => setTransform(x, y));
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      el.style.willChange = 'auto';
      if (glare) {
        const glareEl = el.querySelector('[data-glare]');
        if (glareEl) glareEl.style.background = 'transparent';
      }
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onEnter, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onEnter);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onLeave);
    };
  }, [maxTilt, scale, glare]);

  return ref;
}
