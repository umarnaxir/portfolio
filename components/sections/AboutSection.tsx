'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../providers/SmoothScrollProvider';
import { Eyebrow } from '../ui/Eyebrow';
import { PillButton } from '../ui/PillButton';
import { GitHubIcon, LinkedInIcon, CloseIcon } from '../ui/Icons';
import { personalInfo } from '@/data/personal';
import { Container } from '@/styles/primitives';

const AboutWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const AboutShell = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-block: 3.5rem;

  @media (min-width: 1024px) {
    padding-block: 4.5rem;
  }

  @media (max-width: 767px) {
    padding-block: 2.25rem;
    gap: 1.5rem;
  }
`;

const StatementGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 420px 1fr;
    gap: 3.5rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 460px 1fr;
    gap: 4.5rem;
  }

  @media (max-width: 767px) {
    gap: 1.35rem;
  }
`;

const EngineerBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 767px) {
    gap: 0.85rem;
  }
`;

const ProfileCardWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  height: 380px;
  border-radius: 18px;
  background: #0a0a0a;
  border: 1px solid rgba(17, 17, 17, 0.1);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: box-shadow 0.4s ease, border-color 0.4s ease;

  @media (min-width: 1024px) {
    height: 420px;
  }

  @media (max-width: 767px) {
    height: clamp(245px, 66vw, 310px);
    max-width: 100%;
    border-radius: 14px;
  }

  &:hover {
    border-color: rgba(177, 95, 44, 0.5);
    box-shadow: 0 24px 50px rgba(177, 95, 44, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1);

    .engineer-img {
      transform: scale(1.05);
    }
  }

  @media (hover: none) {
    &:hover {
      border-color: rgba(17, 17, 17, 0.1);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

      .engineer-img {
        transform: none;
      }
    }
  }

  .engineer-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
    user-select: none;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .photo-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.45) 0%,
      transparent 40%
    );
  }

  .floating-badge {
    position: absolute;
    bottom: 1.25rem;
    left: 1.25rem;
    right: 1.25rem;
    background: rgba(10, 10, 10, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: ${({ theme }) => theme.fontSizes.xs};

    @media (max-width: 767px) {
      bottom: 0.85rem;
      left: 0.85rem;
      right: 0.85rem;
      padding: 0.55rem 0.75rem;
      font-size: 0.7rem;
    }

    .status-dot {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 500;

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2ed573;
        box-shadow: 0 0 8px #2ed573;
      }
    }

    .badge-role {
      color: ${({ theme }) => theme.colors.accentFrom};
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.7rem;
    }
  }
`;

const EngineerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .native-shipping {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(17, 17, 17, 0.7);
    line-height: 1.5;

    @media (max-width: 767px) {
      font-size: 0.8125rem;
    }
  }
`;

const Statement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 767px) {
    gap: 1.25rem;
  }
`;

const AboutH2 = styled.h2`
  font-size: clamp(1.65rem, 2.7vw, 2.45rem);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: #111111;

  @media (max-width: 767px) {
    font-size: clamp(1.22rem, 5.1vw, 1.48rem);
    line-height: 1.38;
  }

  .word-wrap {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    padding-bottom: 0.08em;
    margin-right: 0.28em;
  }

  .word-inner {
    display: inline-block;
    will-change: transform, opacity;
  }

  .accent-word {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 600;
  }

  .muted-word {
    color: rgba(17, 17, 17, 0.65);
  }
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  padding-top: 1.5rem;

  @media (max-width: 767px) {
    gap: 1rem;
    padding-top: 1.15rem;
  }
`;

const SocialGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .label {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(17, 17, 17, 0.45);
  }

  .chips {
    display: flex;
    gap: 0.5rem;
  }
`;

const SocialChip = styled.a<{ $accent?: boolean }>`
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.875rem;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: 1px solid rgba(17, 17, 17, 0.08);

  ${({ $accent, theme }) =>
    $accent
      ? `
        background: ${theme.colors.accent};
        color: #ffffff;
        border-color: ${theme.colors.accent};
      `
      : `
        background: ${theme.colors.surface};
        color: rgba(17, 17, 17, 0.7);
      `}

  &:hover {
    transform: translateY(-2px) scale(1.08);
    background: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.ink};
    color: #ffffff;
  }
`;

const STATEMENT_TEXT =
  'I partner with ambitious teams and founders to build scalable web platforms, enterprise systems, and technical SEO strategies that drive organic dominance.';
const STATEMENT_WORDS = STATEMENT_TEXT.split(' ');

export function AboutSection() {
  const { scrollTo } = useScroll();
  const statementRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const el = statementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wordElements = wordsRef.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(wordElements, { y: '0%', opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Elegant typography GSAP staggered reveal
      gsap.fromTo(
        wordElements,
        {
          y: '110%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          stagger: 0.028,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches)) {
      return;
    }
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;

    gsap.to(el, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.35,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  return (
    <AboutWrapper id="about">
      <AboutShell>
        <StatementGrid>
          {/* Left Column: The Engineer with umar.jpeg portrait */}
          <EngineerBlock>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Eyebrow variant="dark">The Engineer</Eyebrow>
            </div>

            <ProfileCardWrap
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <img
                src="/images/umar.jpeg"
                alt="Umar Nazir - Software Engineer & SEO Executive"
                className="engineer-img"
                loading="lazy"
              />
              <div className="photo-overlay" />
              <div className="floating-badge">
                <span className="status-dot">Available Globally</span>
                <span className="badge-role">Lead Engineer</span>
              </div>
            </ProfileCardWrap>

            <EngineerInfo>
              <div className="native-shipping">
                <strong>Baramulla &amp; Srinagar Native</strong> • Shipping high-performance software across global time zones.
              </div>
            </EngineerInfo>
          </EngineerBlock>

          {/* Right Column: Word-by-word animated statement */}
          <Statement ref={statementRef}>
            <AboutH2>
              {STATEMENT_WORDS.map((word, i) => {
                const isAccent =
                  word.toLowerCase().includes('scalable') ||
                  word.toLowerCase().includes('technical') ||
                  word.toLowerCase().includes('dominance');
                const isMuted = i > 8 && !isAccent;

                return (
                  <span key={i} className="word-wrap">
                    <span
                      ref={(span) => {
                        wordsRef.current[i] = span;
                      }}
                      className={`word-inner ${isAccent ? 'accent-word' : ''} ${isMuted ? 'muted-word' : ''}`}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </AboutH2>

            <FooterRow>
              <SocialGroup>
                <span className="label">Find me online</span>
                <div className="chips">
                  <SocialChip
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    $accent
                    aria-label="GitHub"
                  >
                    <GitHubIcon size="1rem" />
                  </SocialChip>
                  <SocialChip
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size="1rem" />
                  </SocialChip>
                  <SocialChip
                    href={personalInfo.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                  >
                    <CloseIcon size="0.875rem" />
                  </SocialChip>
                </div>
              </SocialGroup>

              <PillButton variant="outline" arrow="right" onClick={() => scrollTo('experience')}>
                Explore Experience
              </PillButton>
            </FooterRow>
          </Statement>
        </StatementGrid>
      </AboutShell>
    </AboutWrapper>
  );
}
