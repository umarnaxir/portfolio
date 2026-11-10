'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { LiquidRevealCanvas } from './LiquidRevealCanvas';
import { HeroCardCarousel } from './HeroCardCarousel';
import { PillButton } from '../ui/PillButton';
import { GitHubIcon, LinkedInIcon, CloseIcon } from '../ui/Icons';
import { personalInfo } from '@/data/personal';
import { Container } from '@/styles/primitives';

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(46, 213, 115, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 213, 115, 0); }
`;

const HeroWrapper = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.colors.heroTo};
  min-height: 100vh;

  @media (max-width: 767px) {
    min-height: 100vh;
    min-height: 100svh;
    border-radius: 0 0 1.5rem 1.5rem;
  }
`;

const HeroOrangeSpotlight = styled.div<{ $visible: boolean; $x: number; $y: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  background: radial-gradient(
    720px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px,
    rgba(235, 115, 35, 0.42) 0%,
    rgba(215, 95, 30, 0.25) 35%,
    rgba(177, 95, 44, 0.08) 60%,
    transparent 75%
  );

  @media (max-width: 767px) {
    display: none;
  }
`;

const HeroOrangeGlow = styled.div<{ $visible: boolean; $x: number; $y: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  background: radial-gradient(
    420px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px,
    rgba(255, 140, 50, 0.45) 0%,
    rgba(215, 95, 30, 0.25) 40%,
    rgba(177, 95, 44, 0.08) 65%,
    transparent 75%
  );
  mix-blend-mode: overlay;

  @media (max-width: 767px) {
    display: none;
  }
`;

const HeroVignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 35%,
    rgba(0, 0, 0, 0.08) 100%
  );

  @media (max-width: 767px) {
    z-index: 8;
    background: linear-gradient(
      to top,
      rgba(152, 154, 156, 0.94) 0%,
      rgba(152, 154, 156, 0.8) 28%,
      rgba(152, 154, 156, 0.3) 48%,
      transparent 72%
    );
  }
`;

const Watermark = styled.div<{ $revealed: boolean }>`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  bottom: 5rem;
  z-index: 1;
  text-align: center;
  user-select: none;
  font-weight: 700;
  line-height: 1;
  font-size: clamp(15rem, 25vw, 26rem);
  color: ${({ $revealed }) => ($revealed ? 'rgba(255, 255, 255, 0.42)' : 'rgba(255, 255, 255, 0)')};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '20px')});
  transition: color 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  letter-spacing: -0.04em;

  @media (max-width: 767px) {
    bottom: 11rem;
    font-size: clamp(6rem, 30vw, 9.5rem);
    color: ${({ $revealed }) => ($revealed ? 'rgba(255, 255, 255, 0.32)' : 'rgba(255, 255, 255, 0)')};
  }
`;

const HeroShell = styled(Container)`
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding-top: 7rem;
  padding-bottom: 0;

  @media (min-width: 1024px) {
    padding-top: 8.5rem;
  }

  @media (max-width: 767px) {
    min-height: 100vh;
    min-height: 100svh;
    justify-content: flex-end;
    padding-top: 4.5rem;
    padding-bottom: 2.25rem;
  }
`;

const HeroMainGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  flex: 1;
  justify-content: center;
  padding-bottom: 3rem;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2.5rem;
    align-items: center;
    padding-bottom: 4rem;
  }

  @media (max-width: 767px) {
    flex: 0 1 auto;
    gap: 0;
    padding-bottom: 0;
    justify-content: flex-end;
  }
`;

const HeroLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-column: span 7;
  }

  @media (max-width: 767px) {
    align-items: flex-start;
    text-align: left;
    gap: 0.75rem;
  }
`;

const TopBadgesRow = styled.div<{ $revealed: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '10px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 180ms;

  @media (max-width: 767px) {
    display: none;
  }
`;

const AvailabilityChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.375rem 0.875rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(230, 229, 226, 0.9);
  color: ${({ theme }) => theme.colors.foreground};

  .pulse-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: #2ed573;
    animation: ${pulse} 2s infinite;
  }
`;

const HeroH1 = styled.h1`
  max-width: 18ch;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.02em;

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
  }

  @media (max-width: 767px) {
    max-width: 100%;
    font-size: clamp(2rem, 8.6vw, 2.55rem);
    line-height: 1.03;
    text-align: left;
  }
`;

const RevealLineWrap = styled.span<{ $indent?: boolean }>`
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  ${({ $indent }) =>
    $indent &&
    `
    padding-left: clamp(2rem, 6vw, 4.5rem);
  `}
`;

const RevealLineInner = styled.span<{ $revealed: boolean; $delay: number }>`
  display: block;
  transform: translateY(${({ $revealed }) => ($revealed ? '0%' : '100%')});
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transition: transform 900ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 900ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-delay: ${({ $delay }) => `${$delay}ms`};

  @media (max-width: 767px) {
    transition-duration: 550ms;
    transition-delay: ${({ $delay }) => `${Math.min($delay, 180)}ms`};
  }
`;

const IntroParagraph = styled.p<{ $revealed: boolean }>`
  max-width: 38ch;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: rgba(17, 17, 17, 0.75);
  line-height: 1.5;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '10px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 550ms;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    line-height: 1.48;
    color: rgba(17, 17, 17, 0.9);
    max-width: 34ch;
    margin-inline: 0;
    transition-duration: 500ms;
    transition-delay: 240ms;
  }
`;

const RatingRow = styled.div<{ $revealed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '10px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 650ms;

  .rating-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }

  .rating-text {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 500;
    color: rgba(17, 17, 17, 0.75);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const CtaAndSocialRow = styled.div<{ $revealed: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '10px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 750ms;

  @media (max-width: 767px) {
    justify-content: flex-start;
    width: 100%;
    margin-top: 0.25rem;
    transition-duration: 500ms;
    transition-delay: 320ms;
  }
`;

const CtaGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 767px) {
    justify-content: flex-start;
    gap: 0.625rem;

    .hero-outline-btn {
      background: rgba(255, 255, 255, 0.28);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-color: rgba(17, 17, 17, 0.28);
    }
  }
`;

const HeroRightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-column: span 5;
    align-items: flex-end;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const HeroSocialRow = styled.div<{ $revealed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 24rem;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '10px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: 450ms;

  @media (min-width: 1024px) {
    width: 19rem;
    justify-content: flex-start;
  }

  a {
    width: 2.75rem;
    height: 2.75rem;
    display: grid;
    place-items: center;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(230, 229, 226, 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.colors.foreground};
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);

    &:hover {
      transform: translateY(-2px) scale(1.08);
      background: #ffffff;
      border-color: ${({ theme }) => theme.colors.ink};
      color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }
`;

const StatusBar = styled.div<{ $revealed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-top: 1px solid rgba(17, 17, 17, 0.1);
  padding-block: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: rgba(17, 17, 17, 0.6);
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transition: opacity 0.8s ease;
  transition-delay: 900ms;

  .center-text {
    display: none;
    @media (min-width: 640px) {
      display: inline;
    }
  }

  .right-text {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export function HeroSection() {
  const { isReady, scrollTo, openModal } = useScroll();
  const [heroMouse, setHeroMouse] = React.useState<{
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    active: boolean;
  }>({
    x: -1000,
    y: -1000,
    clientX: -1000,
    clientY: -1000,
    active: false,
  });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      clientX: e.clientX,
      clientY: e.clientY,
      active: true,
    });
  };

  const handleHeroMouseEnter = () => {
    setHeroMouse((prev) => ({ ...prev, active: true }));
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse((prev) => ({ ...prev, active: false }));
  };

  return (
    <HeroWrapper
      id="home"
      onMouseMove={handleHeroMouseMove}
      onMouseEnter={handleHeroMouseEnter}
      onMouseLeave={handleHeroMouseLeave}
    >
      <LiquidRevealCanvas revealed={isReady} heroMouse={heroMouse} />
      <HeroOrangeSpotlight
        $visible={heroMouse.active}
        $x={heroMouse.x}
        $y={heroMouse.y}
        aria-hidden="true"
      />
      <HeroOrangeGlow
        $visible={heroMouse.active}
        $x={heroMouse.x}
        $y={heroMouse.y}
        aria-hidden="true"
      />
      <HeroVignette aria-hidden="true" />
      <Watermark $revealed={isReady} aria-hidden="true">
        UMAR
      </Watermark>

      <HeroShell>
        <HeroMainGrid>
          {/* Left Column */}
          <HeroLeftCol>
            <TopBadgesRow $revealed={isReady}>
              <AvailabilityChip>
                <span className="pulse-dot" />
                <span>Available for projects</span>
              </AvailabilityChip>
            </TopBadgesRow>

            <HeroH1>
              <RevealLineWrap>
                <RevealLineInner $revealed={isReady} $delay={250}>
                  Software Engineer
                </RevealLineInner>
              </RevealLineWrap>
              <RevealLineWrap>
                <RevealLineInner $revealed={isReady} $delay={380}>
                  &amp; SEO Executive
                </RevealLineInner>
              </RevealLineWrap>
            </HeroH1>

            <IntroParagraph $revealed={isReady}>
              Founder of <strong>NexGen Developers</strong> &amp; Lead Engineer at <strong>Vipthra Technologies</strong>. Building high-performance digital products and scalable systems.
            </IntroParagraph>

            <RatingRow $revealed={isReady}>
              <span className="rating-dot" aria-hidden="true" />
              <span className="rating-text">
                {personalInfo.projectsCount} Projects Delivered • {personalInfo.yearsExperience} Years Experience
              </span>
            </RatingRow>

            <CtaAndSocialRow $revealed={isReady}>
              <CtaGroup>
                <PillButton variant="dark" arrow="right" onClick={openModal}>
                  Let&apos;s Talk
                </PillButton>
                <PillButton
                  variant="outline"
                  arrow="none"
                  className="hero-outline-btn"
                  onClick={() => scrollTo('projects')}
                >
                  View Projects
                </PillButton>
              </CtaGroup>
            </CtaAndSocialRow>
          </HeroLeftCol>

          {/* Right Column: Floating Card + Social Icons */}
          <HeroRightCol>
            <HeroCardCarousel revealed={isReady} />

            <HeroSocialRow $revealed={isReady}>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size="1.125rem" />
              </a>
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon size="1.125rem" />
              </a>
              <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                <CloseIcon size="0.95rem" />
              </a>
            </HeroSocialRow>
          </HeroRightCol>
        </HeroMainGrid>

        {/* Bottom Status Bar */}
        <StatusBar $revealed={isReady}>
          <div>Lead Engineer @ Vipthra • Founder @ NexGen</div>
          <div className="center-text">Baramulla / Srinagar • Remote Worldwide</div>
          <div className="right-text">
            <span>Scroll to explore</span>
            <span>↓</span>
          </div>
        </StatusBar>
      </HeroShell>
    </HeroWrapper>
  );
}
