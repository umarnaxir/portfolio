'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { LogoMark } from '../ui/Icons';
import { personalInfo } from '@/data/personal';

const LoaderOverlay = styled.div<{ $sliding: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  border-radius: 0 0 2rem 2rem;
  transform: translateY(${({ $sliding }) => ($sliding ? '-100%' : '0%')});
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
`;

const CenterContent = styled.div<{ $fading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  opacity: ${({ $fading }) => ($fading ? 0 : 1)};
  transform: translateY(${({ $fading }) => ($fading ? '-12px' : '0')});
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const BrandRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Tagline = styled.p`
  max-width: 28ch;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.4;
`;

const ProgressBox = styled.div`
  width: min(22rem, 72vw);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Track = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
`;

const Fill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.accentFrom};
  width: ${({ $progress }) => `${$progress}%`};
  transition: width 0.1s ease-out;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.45);
`;

const Count = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-variant-numeric: tabular-nums;
`;

export function IntroLoader() {
  const { setReady, startScroll } = useScroll();
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const FILL_MS = 1300;
    const startTime = performance.now();

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    let rafId: number;
    function update(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / FILL_MS);
      const curProgress = Math.round(easeInOutCubic(t) * 100);
      setProgress(curProgress);

      if (t < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        setFading(true);
        setSliding(true);

        setTimeout(() => {
          setReady(true);
          startScroll();
          setMounted(false);
        }, 750);
      }
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [setReady, startScroll]);

  if (!mounted) return null;

  return (
    <LoaderOverlay $sliding={sliding} role="dialog" aria-modal="true" aria-label={`Loading ${personalInfo.name}`}>
      <CenterContent $fading={fading}>
        <BrandRow>
          <span style={{ color: '#cf8047', fontSize: '1.875rem', display: 'flex', alignItems: 'center' }}>
            <LogoMark size="1.875rem" color="#cf8047" />
          </span>
          <span>{personalInfo.name}</span>
        </BrandRow>
        <Tagline>{personalInfo.tagline}</Tagline>
      </CenterContent>

      <ProgressBox>
        <Track>
          <Fill $progress={progress} />
        </Track>
        <InfoRow>
          <span>Loading</span>
          <Count>{String(progress).padStart(3, '0')}</Count>
        </InfoRow>
      </ProgressBox>
    </LoaderOverlay>
  );
}

