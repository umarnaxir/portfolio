'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollContextType {
  lenis: Lenis | null;
  scrollTo: (id: string) => void;
  stopScroll: () => void;
  startScroll: () => void;
  isReady: boolean;
  setReady: (ready: boolean) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stopScroll: () => {},
  startScroll: () => {},
  isReady: false,
  setReady: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const instance = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      instance.destroy();
    };
  }, []);

  const stopScroll = useCallback(() => {
    if (lenisRef.current) lenisRef.current.stop();
    document.documentElement.style.position = 'relative';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
  }, []);

  const startScroll = useCallback(() => {
    if (lenisRef.current) lenisRef.current.start();
    document.documentElement.style.removeProperty('position');
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.2 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const openModal = useCallback(() => {
    setIsMenuOpen(false);
    stopScroll();
    setIsModalOpen(true);
  }, [stopScroll]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    startScroll();
  }, [startScroll]);

  const openMenu = useCallback(() => {
    stopScroll();
    setIsMenuOpen(true);
  }, [stopScroll]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    startScroll();
  }, [startScroll]);

  return (
    <ScrollContext.Provider
      value={{
        lenis,
        scrollTo,
        stopScroll,
        startScroll,
        isReady,
        setReady,
        isModalOpen,
        openModal,
        closeModal,
        isMenuOpen,
        openMenu,
        closeMenu,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

