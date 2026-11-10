'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface UseMobileCarouselOptions {
  align?: 'start' | 'center';
  enableImageParallax?: boolean;
  enableCardScale?: boolean;
}

export function useMobileCarousel(count: number, options: UseMobileCarouselOptions = {}) {
  const {
    align = 'start',
    enableImageParallax = false,
    enableCardScale = true,
  } = options;

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const setSlideRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      slideRefs.current[index] = el;
    },
    []
  );

  const updateTransforms = useCallback(() => {
    const track = trackRef.current;
    if (!track || typeof window === 'undefined') return;

    if (window.innerWidth >= 768) {
      slideRefs.current.forEach((slide) => {
        if (!slide) return;
        gsap.set(slide, { clearProps: 'transform,opacity' });
        const img = slide.querySelector<HTMLElement>('[data-carousel-img]');
        if (img) gsap.set(img, { clearProps: 'transform' });
        const glow = slide.querySelector<HTMLElement>('[data-carousel-glow]');
        if (glow) gsap.set(glow, { clearProps: 'opacity' });
      });
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = window.getComputedStyle(track);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const trackRect = track.getBoundingClientRect();

    let closestIdx = 0;
    let minDistance = Infinity;

    slideRefs.current.forEach((slide, idx) => {
      if (!slide) return;
      const slideRect = slide.getBoundingClientRect();

      const anchorTrack = align === 'center' ? trackRect.left + trackRect.width / 2 : trackRect.left + padLeft;
      const anchorSlide = align === 'center' ? slideRect.left + slideRect.width / 2 : slideRect.left;
      const pixelDiff = anchorSlide - anchorTrack;
      const absDiff = Math.abs(pixelDiff);

      if (absDiff < minDistance) {
        minDistance = absDiff;
        closestIdx = idx;
      }

      if (prefersReducedMotion) return;

      const stride = Math.max(slideRect.width, 1);
      const signedDelta = Math.max(-1.2, Math.min(1.2, pixelDiff / stride));
      const dist = Math.min(Math.abs(signedDelta), 1);

      if (enableCardScale) {
        gsap.set(slide, {
          scale: 1 - dist * 0.04,
          opacity: 1 - dist * 0.18,
        });
      }

      if (enableImageParallax) {
        const img = slide.querySelector<HTMLElement>('[data-carousel-img]');
        if (img) {
          gsap.set(img, {
            x: signedDelta * -14,
            scale: 1 + (1 - dist) * 0.055,
          });
        }
        const glow = slide.querySelector<HTMLElement>('[data-carousel-glow]');
        if (glow) {
          gsap.set(glow, {
            opacity: (1 - dist) * 0.55,
          });
        }
      }
    });

    setActiveIndex((prev) => (prev === closestIdx ? prev : closestIdx));
  }, [align, enableCardScale, enableImageParallax]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateTransforms();
    });
  }, [updateTransforms]);

  const goToSlide = useCallback(
    (rawIndex: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;

      const index = Math.max(0, Math.min(count - 1, rawIndex));
      const slide = slideRefs.current[index];
      if (!slide) return;

      const style = window.getComputedStyle(track);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const targetLeft =
        align === 'center'
          ? slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2
          : Math.max(0, slide.offsetLeft - padLeft);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setActiveIndex(index);

      if (prefersReducedMotion) {
        track.scrollLeft = targetLeft;
        updateTransforms();
        return;
      }

      gsap.killTweensOf(track);
      track.style.scrollSnapType = 'none';

      gsap.to(track, {
        scrollLeft: targetLeft,
        duration: 0.55,
        ease: 'power3.out',
        onUpdate: updateTransforms,
        onComplete: () => {
          track.style.scrollSnapType = '';
          updateTransforms();
        },
        onInterrupt: () => {
          track.style.scrollSnapType = '';
        },
      });
    },
    [align, count, updateTransforms]
  );

  useEffect(() => {
    const track = trackRef.current;
    const cancelOnTouch = () => {
      if (!track) return;
      gsap.killTweensOf(track);
      track.style.scrollSnapType = '';
    };

    const rafInit = requestAnimationFrame(updateTransforms);
    window.addEventListener('resize', updateTransforms);
    track?.addEventListener('touchstart', cancelOnTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafInit);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', updateTransforms);
      track?.removeEventListener('touchstart', cancelOnTouch);
      if (track) gsap.killTweensOf(track);
    };
  }, [updateTransforms]);

  return {
    trackRef,
    setSlideRef,
    activeIndex,
    goToSlide,
    handleScroll,
  };
}

