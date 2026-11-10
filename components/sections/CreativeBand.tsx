'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from '../ui/Icons';
import { Container } from '@/styles/primitives';
import { useMobileCarousel } from '@/hooks/useMobileCarousel';
import { MobileCarouselControls } from '../ui/MobileCarouselControls';

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-block: 3.5rem;
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding-block: 4.5rem;
  }

  @media (max-width: 767px) {
    padding-block: 2.25rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 76rem;
  margin-inline: auto;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    margin-bottom: 3.5rem;
  }

  @media (max-width: 767px) {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  h2 {
    font-size: clamp(2rem, 3.8vw, 3.4rem);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.foreground};
    line-height: 1.15;
    margin-inline: auto;

    @media (min-width: 1024px) {
      white-space: nowrap;
    }

    @media (max-width: 767px) {
      font-size: clamp(1.5rem, 6.4vw, 1.85rem);
      line-height: 1.18;
      margin-inline: 0;
    }
  }

  p {
    margin-top: 0.85rem;
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: rgba(17, 17, 17, 0.65);
    line-height: 1.5;

    @media (min-width: 768px) {
      white-space: nowrap;
    }

    @media (max-width: 767px) {
      margin-top: 0.45rem;
      font-size: 0.875rem;
    }
  }
`;

const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  perspective: 1200px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    margin-inline: -1.125rem;
    padding: 0.25rem 1.125rem 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    touch-action: pan-x pan-y;
    -webkit-overflow-scrolling: touch;
    perspective: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CardWrapper = styled.div`
  transform-style: preserve-3d;
  will-change: transform, opacity;
  height: 100%;

  @media (max-width: 767px) {
    flex: 0 0 82%;
    max-width: 20rem;
    scroll-snap-align: start;
    scroll-margin-left: 1.125rem;
    height: auto;
  }
`;

const OrganicCard = styled.div<{ $radius: string; $variant: 'light' | 'accent' | 'dark' | 'surface' }>`
  position: relative;
  height: 100%;
  min-height: 22rem;
  padding: 2.25rem 1.75rem;
  border-radius: ${({ $radius }) => $radius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-style: preserve-3d;
  cursor: default;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.1);
  transition: box-shadow 0.4s ease, border-color 0.4s ease;

  @media (min-width: 1024px) {
    min-height: 24rem;
    padding: 2.25rem 1.75rem;
  }

  @media (max-width: 767px) {
    min-height: 15.5rem;
    padding: 1.35rem 1.25rem;
  }

  /* Decorative sketch-like outline */
  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: inherit;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    pointer-events: none;
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.8;
  }

  /* Background variant styling */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'light':
        return `
          background: #ffffff;
          color: ${theme.colors.ink};
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
          &::before { border-color: rgba(17, 17, 17, 0.15); }
          &:hover {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.09);
            border-color: rgba(177, 95, 44, 0.4);
          }
        `;
      case 'accent':
        return `
          background: linear-gradient(145deg, #b15f2c 0%, #873f15 100%);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 35px rgba(177, 95, 44, 0.28);
          &:hover {
            box-shadow: 0 24px 50px rgba(177, 95, 44, 0.4);
            border-color: rgba(255, 255, 255, 0.4);
          }
        `;
      case 'dark':
        return `
          background: #0a0a0a;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
          &:hover {
            box-shadow: 0 24px 55px rgba(0, 0, 0, 0.5);
            border-color: rgba(177, 95, 44, 0.5);
          }
        `;
      case 'surface':
      default:
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.foreground};
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.03);
          &::before { border-color: rgba(17, 17, 17, 0.15); }
          &:hover {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
            border-color: rgba(177, 95, 44, 0.4);
          }
        `;
    }
  }}

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateZ(20px);
  }

  .step-index {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.65;
    font-family: monospace;
  }

  .step-symbol {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-size: 0.9rem;
    border: 1px solid currentColor;
    opacity: 0.6;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &:hover .step-symbol {
    opacity: 1;
    transform: scale(1.1) rotate(6deg);
  }

  .card-body {
    transform: translateZ(35px);
    margin-block: 2rem;

    @media (max-width: 767px) {
      transform: none;
      margin-block: 1.05rem;
    }
  }

  .step-title {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 0.85rem;

    @media (min-width: 1024px) {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    @media (max-width: 767px) {
      font-size: 1.85rem;
      margin-bottom: 0.45rem;
    }
  }

  .step-subtitle {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 0.85;

    @media (max-width: 767px) {
      font-size: 0.72rem;
    }
  }

  .card-bottom {
    transform: translateZ(20px);
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.55;
    border-top: 1px solid currentColor;
    opacity: 0.8;
    padding-top: 1.25rem;

    @media (max-width: 767px) {
      transform: none;
      font-size: 0.8125rem;
      line-height: 1.48;
      padding-top: 0.85rem;
    }
  }

  .action-arrow {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: transform 0.3s ease;

    @media (max-width: 767px) {
      margin-top: 0.55rem;
      font-size: 0.6875rem;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .action-arrow {
      transform: translateX(6px);
    }
  }
`;

const STEPS = [
  {
    num: '01 / 04',
    title: 'Think',
    subtitle: 'Architecture & Strategy',
    desc: 'Uncompromising system planning, entity-relationship mapping, database architecture, and technical SEO blueprints.',
    symbol: '📐',
    variant: 'light' as const,
    radius: '28px 8px 22px 10px',
  },
  {
    num: '02 / 04',
    title: 'Design',
    subtitle: 'UI/UX & Design Systems',
    desc: 'Bespoke interfaces with rem-based adaptive grids, tactile spring motion, visual hierarchy, and sub-second perceived speed.',
    symbol: '✦',
    variant: 'accent' as const,
    radius: '10px 28px 12px 24px',
  },
  {
    num: '03 / 04',
    title: 'Build',
    subtitle: 'Full-Stack Execution',
    desc: 'Type-safe React, Next.js App Router, clean microservices, resilient APIs, and automated cloud deployments.',
    symbol: '⚡',
    variant: 'dark' as const,
    radius: '22px 12px 28px 8px',
  },
  {
    num: '04 / 04',
    title: 'Grow',
    subtitle: 'SEO & Search Dominance',
    desc: 'Structured JSON-LD schema, Core Web Vitals optimization, semantic hierarchy, and search conversion dominance.',
    symbol: '📈',
    variant: 'surface' as const,
    radius: '12px 22px 8px 30px',
  },
];

export function CreativeBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    trackRef,
    setSlideRef,
    activeIndex,
    goToSlide,
    handleScroll,
  } = useMobileCarousel(STEPS.length, {
    align: 'start',
    enableCardScale: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const cards = cardsRef.current.filter(Boolean);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          rotateY: 12,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        cards,
        { y: 24 },
        {
          y: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'y',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches)) {
      return;
    }
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -8;
    const tiltY = (x / (rect.width / 2)) * 8;

    gsap.to(el, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.35,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches)) {
      return;
    }
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  return (
    <SectionWrapper ref={containerRef}>
      <Container>
        <SectionHeader>
          <h2>From Conception to Search Dominance</h2>
          <p>Disciplined Four-Stage Engineering Methodology</p>
        </SectionHeader>

        <FlowGrid ref={trackRef} onScroll={handleScroll}>
          {STEPS.map((step, idx) => (
            <CardWrapper
              key={step.title}
              ref={(el) => {
                cardsRef.current[idx] = el;
                setSlideRef(idx)(el);
              }}
            >
              <OrganicCard
                $radius={step.radius}
                $variant={step.variant}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-top">
                  <span className="step-index">{step.num}</span>
                  <span className="step-symbol">{step.symbol}</span>
                </div>

                <div className="card-body">
                  <h3 className="step-title">{step.title}</h3>
                  <div className="step-subtitle">{step.subtitle}</div>
                </div>

                <div className="card-bottom">
                  <div>{step.desc}</div>
                  <div className="action-arrow">
                    <span>Phase Detail</span>
                    <ArrowRight size="0.875rem" />
                  </div>
                </div>
              </OrganicCard>
            </CardWrapper>
          ))}
        </FlowGrid>

        <MobileCarouselControls
          total={STEPS.length}
          activeIndex={activeIndex}
          onSelect={goToSlide}
          labelPrefix="Phase"
        />
      </Container>
    </SectionWrapper>
  );
}
