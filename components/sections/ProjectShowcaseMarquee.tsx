'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const ROW_1_PROJECTS = [
  'Exceptional IAS Academy',
  'NexGen Developers',
  'Vipthra Technologies',
  'Saphiam',
  'ShoesHub',
  'Citadel Library',
  'PlaceHub',
  'Khan Security',
  'FitSpace Gym',
  'Sitesynai',
];

const ROW_2_PROJECTS = [
  'Office Management System',
  'NineMash',
  'AI-Mployed',
  'Dr. Jibran Bashir',
  'EliteExpress Courier',
  'Rush Expected Courier',
  'Kindness Towards Humanity',
  'Kashmir Tickets',
  'Digitlia',
  'Hotel Sea View',
  'Altaf Hospital',
];

const marqueeRtl = keyframes`
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const marqueeLtr = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

const MarqueeContainer = styled.div<{ $revealed: boolean }>`
  position: absolute;
  top: 4.85rem;
  inset-inline: 0;
  z-index: 4;
  pointer-events: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  overflow: hidden;
  padding-block: 0.25rem;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '-6px')});
  transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 200ms;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.9) 8%,
    rgba(0, 0, 0, 0.9) 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.9) 8%,
    rgba(0, 0, 0, 0.9) 92%,
    transparent 100%
  );

  @media (min-width: 640px) {
    top: 5.5rem;
    gap: 0.48rem;
  }

  @media (min-width: 1024px) {
    top: 5.65rem;
    gap: 0.5rem;
  }

  @media (max-width: 767px) {
    top: 3.75rem;
    gap: 0.3rem;
  }
`;

const MarqueeRowViewport = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
`;

const MarqueeTrack = styled.div<{ $direction: 'rtl' | 'ltr'; $duration: number }>`
  display: flex;
  flex-shrink: 0;
  width: max-content;
  will-change: transform;
  animation: ${({ $direction }) => ($direction === 'rtl' ? marqueeRtl : marqueeLtr)}
    ${({ $duration }) => `${$duration}s`} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MarqueeSet = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ProjectNameItem = styled.span`
  font-family: 'Syne', 'Onest', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.28);
  white-space: nowrap;
  line-height: 1.25;

  @media (max-width: 1023px) {
    font-size: 0.72rem;
    letter-spacing: 0.07em;
  }

  @media (max-width: 767px) {
    font-size: 0.64rem;
    letter-spacing: 0.06em;
    color: rgba(17, 17, 17, 0.3);
  }
`;

const SeparatorDot = styled.span`
  display: inline-block;
  margin-inline: 1.15rem;
  font-size: 0.6rem;
  color: rgba(17, 17, 17, 0.22);
  line-height: 1;

  @media (max-width: 1023px) {
    margin-inline: 0.9rem;
  }

  @media (max-width: 767px) {
    margin-inline: 0.65rem;
    font-size: 0.5rem;
  }
`;

function renderProjectSet(items: string[], keyPrefix: string) {
  return (
    <MarqueeSet>
      {items.map((name, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <ProjectNameItem>{name}</ProjectNameItem>
          <SeparatorDot aria-hidden="true">✦</SeparatorDot>
        </React.Fragment>
      ))}
    </MarqueeSet>
  );
}

export function ProjectShowcaseMarquee({ revealed }: { revealed: boolean }) {
  return (
    <MarqueeContainer $revealed={revealed} aria-label="Engineered Projects Showcase">
      {/* Row 1: 10 projects moving continuously Right to Left */}
      <MarqueeRowViewport>
        <MarqueeTrack $direction="rtl" $duration={44}>
          {renderProjectSet(ROW_1_PROJECTS, 'r1-a')}
          {renderProjectSet(ROW_1_PROJECTS, 'r1-b')}
        </MarqueeTrack>
      </MarqueeRowViewport>

      {/* Row 2: 11 projects moving continuously Left to Right */}
      <MarqueeRowViewport>
        <MarqueeTrack $direction="ltr" $duration={48}>
          {renderProjectSet(ROW_2_PROJECTS, 'r2-a')}
          {renderProjectSet(ROW_2_PROJECTS, 'r2-b')}
        </MarqueeTrack>
      </MarqueeRowViewport>
    </MarqueeContainer>
  );
}

