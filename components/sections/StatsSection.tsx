'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from '@/styles/primitives';

const StatsWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 3.5rem;

  @media (min-width: 1024px) {
    padding-bottom: 4.5rem;
  }

  @media (max-width: 767px) {
    padding-bottom: 2.25rem;
  }
`;

const StatsPanel = styled.div<{ $revealed: boolean }>`
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.ink};
  padding: 3rem 1.5rem;
  color: #ffffff;
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '40px')}) scale(${({ $revealed }) => ($revealed ? 1 : 0.99)});
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;

  @media (min-width: 640px) {
    padding: 4rem 2rem;
  }

  @media (min-width: 768px) {
    padding-inline: 4rem;
  }

  @media (max-width: 767px) {
    padding: 1.75rem 1.25rem;
    border-radius: 1.35rem;
  }
`;

const StatsH2 = styled.h2<{ $revealed: boolean }>`
  margin-top: 1rem;
  max-width: 22ch;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #ffffff;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  @media (max-width: 767px) {
    margin-top: 0.65rem;
    font-size: clamp(1.4rem, 6vw, 1.75rem);
    line-height: 1.2;
  }

  .line-inner {
    display: block;
    transform: translateY(${({ $revealed }) => ($revealed ? '0%' : '100%')});
    opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
    transition: transform 900ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 900ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const StatsGrid = styled.ul`
  margin-top: 3.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  row-gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 767px) {
    margin-top: 1.65rem;
    column-gap: 1rem;
    row-gap: 1.35rem;
  }
`;

const StatItem = styled.li<{ $revealed: boolean; $delay: number }>`
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '20px')});
  transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => `${$delay}ms`};

  .number-wrap {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #ffffff;
    font-variant-numeric: tabular-nums;
    line-height: 1;

    @media (min-width: 640px) {
      font-size: ${({ theme }) => theme.fontSizes['6xl']};
    }

    @media (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSizes['7xl']};
    }

    @media (max-width: 767px) {
      font-size: clamp(2rem, 8.5vw, 2.5rem);
    }
  }

  .stat-label {
    margin-top: 0.75rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.55);

    @media (max-width: 767px) {
      margin-top: 0.35rem;
      font-size: 0.75rem;
    }
  }
`;

const STATS_DATA = [
  { target: 30, suffix: '+', label: 'Projects Delivered' },
  { target: 3, suffix: '+', label: 'Years of Craft' },
  { target: 4, suffix: '', label: 'Companies & Ventures' },
  { target: 8, suffix: '+', label: 'Industries Served' },
];

export function StatsSection() {
  const { lenis } = useScroll();
  const panelRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastTick = 0;

    function updateCounts() {
      const el = panelRef.current;
      if (!el) return;
      const now = performance.now();
      if (now - lastTick < 30) return;
      lastTick = now;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = (vh + rect.height) / 2;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / denom));

      setCounts(STATS_DATA.map((s) => Math.round(progress * s.target)));
    }

    window.addEventListener('scroll', updateCounts, { passive: true });
    if (lenis) {
      lenis.on('scroll', updateCounts);
    }
    updateCounts();

    return () => {
      window.removeEventListener('scroll', updateCounts);
    };
  }, [lenis]);

  return (
    <StatsWrapper id="stats">
      <Container>
        <StatsPanel ref={panelRef} $revealed={revealed}>
          <Eyebrow variant="light">By the numbers</Eyebrow>
          <StatsH2 $revealed={revealed}>
            <span className="line-inner">Proof in the code, not the words.</span>
          </StatsH2>

          <StatsGrid>
            {STATS_DATA.map((stat, idx) => (
              <StatItem key={idx} $revealed={revealed} $delay={idx * 90}>
                <div className="number-wrap">
                  <span>{counts[idx]}</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsPanel>
      </Container>
    </StatsWrapper>
  );
}

