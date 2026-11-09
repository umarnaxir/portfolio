'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow } from '../ui/Eyebrow';
import { experiences } from '@/data/experience';
import { Container } from '@/styles/primitives';

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(46, 213, 115, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 213, 115, 0); }
`;

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 3.5rem;
  padding-bottom: 4.5rem;
  position: relative;
  overflow: visible;

  @media (min-width: 1024px) {
    padding-top: 4rem;
    padding-bottom: 5.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.75rem;
`;

const SectionH2 = styled.h2`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.foreground};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const Subtitle = styled.p`
  margin-top: 0.75rem;
  max-width: 38rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: rgba(17, 17, 17, 0.65);
  line-height: 1.6;
`;

/* Two-column layout: 280px Sidebar + Expanded Wide Experience Cards with 2rem balanced gap */
const ExperienceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    align-items: start;
  }
`;

/* Sticky Left Navigator */
const StickySidebar = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 6.5rem;
    gap: 1.5rem;
  }
`;

const SidebarCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  padding: 1.75rem 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
`;

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
`;

const SidebarDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(17, 17, 17, 0.6);
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

/* Vertical Progress Milestones */
const MilestonesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 17px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background: rgba(17, 17, 17, 0.08);
  }
`;

const MilestoneItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0.6rem 0.65rem;
  border-radius: 10px;
  transition: all 0.25s ease;
  position: relative;
  z-index: 1;

  ${({ $active, theme }) =>
    $active
      ? `
        background: rgba(177, 95, 44, 0.09);
      `
      : `
        &:hover {
          background: rgba(0, 0, 0, 0.03);
        }
      `}

  .node-indicator {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-top: 3px;
    border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'rgba(17, 17, 17, 0.25)')};
    background: ${({ $active, theme }) => ($active ? theme.colors.accent : '#ffffff')};
    transition: all 0.3s ease;
    flex-shrink: 0;
    box-shadow: ${({ $active, theme }) =>
      $active ? `0 0 0 4px rgba(177, 95, 44, 0.2)` : 'none'};
  }

  .node-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    .company-name {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      font-weight: 700;
      color: ${({ $active, theme }) => ($active ? theme.colors.foreground : 'rgba(17, 17, 17, 0.75)')};
      letter-spacing: -0.01em;
    }

    .role-title {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      color: ${({ $active, theme }) => ($active ? theme.colors.accent : 'rgba(17, 17, 17, 0.55)')};
      font-weight: 500;
    }

    .period-text {
      font-size: 0.6875rem;
      font-family: monospace;
      color: rgba(17, 17, 17, 0.45);
    }
  }
`;

/* Vertical Cards Stacking Container */
const VerticalCardsDeck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  position: relative;
  width: 100%;

  @media (min-width: 1024px) {
    gap: 0;
  }
`;

/* Individual Experience Card with High-Contrast White Text */
const StackingCard = styled.div<{ $index: number }>`
  position: relative;
  width: 100%;
  background: #0a0a0a;
  background-image: radial-gradient(
    circle at top right,
    rgba(177, 95, 44, 0.22) 0%,
    rgba(10, 10, 10, 0.98) 60%
  );
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  padding: 2.25rem 2rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  will-change: transform, opacity;
  transform-style: preserve-3d;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(177, 95, 44, 0.55);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 28px rgba(177, 95, 44, 0.16);
  }

  @media (min-width: 1024px) {
    position: sticky;
    top: calc(7rem + ${({ $index }) => $index * 14}px);
    margin-bottom: 5rem;
    padding: 2.75rem 3rem;
    min-height: 28rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .company-role-block {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    .company-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: ${({ theme }) => theme.fontSizes.xs};
      font-weight: 700;
      color: ${({ theme }) => theme.colors.accentFrom};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    h3 {
      font-size: clamp(1.6rem, 2.4vw, 2.15rem);
      font-weight: 700;
      color: #ffffff !important;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .meta-location {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      color: rgba(255, 255, 255, 0.65);
    }
  }

  .badge-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .period-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.95rem;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 600;
    font-family: monospace;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #ffffff !important;
    letter-spacing: 0.02em;

    .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2ed573;
      animation: ${pulse} 2s infinite;
    }
  }

  .index-watermark {
    font-size: 0.75rem;
    font-family: monospace;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.1em;
  }

  .description-text {
    font-size: 1rem;
    line-height: 1.65;
    color: #ffffff !important;
    opacity: 0.95;
  }

  .highlights-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .highlight-heading {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.7);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      padding-left: 0;
      list-style: none;

      li {
        position: relative;
        padding-left: 1.5rem;
        font-size: 0.925rem;
        color: #ffffff !important;
        opacity: 0.9;
        line-height: 1.55;

        &::before {
          content: '→';
          position: absolute;
          left: 0;
          color: ${({ theme }) => theme.colors.accentFrom};
          font-weight: 700;
        }
      }
    }
  }

  .skills-row {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }
`;

/* Custom High-Contrast White Skill Badge */
const SkillBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  letter-spacing: 0.02em;
  transition: all 0.25s ease;

  &:hover {
    border-color: #cf8047;
    background: rgba(177, 95, 44, 0.2);
    color: #ffffff !important;
  }
`;

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop: Vertical GSAP Stacking & Depth Effect
    mm.add('(min-width: 1024px)', () => {
      cards.forEach((card, i) => {
        // Trigger active sidebar item on scroll
        ScrollTrigger.create({
          trigger: card,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });

        // Depth & scaling effect when cards stack
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95 - i * 0.012,
            opacity: 0.72,
            filter: 'blur(0.5px)',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 85%',
              end: 'top 25%',
              scrub: true,
            },
          });
        }
      });
    });

    // Mobile / Tablet: Active state tracking
    mm.add('(max-width: 1023px)', () => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });
      });
    });

    return () => mm.revert();
  }, []);

  const scrollToMilestone = (idx: number) => {
    const targetCard = cardsRef.current[idx];
    if (targetCard) {
      const topOffset = targetCard.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      setActiveIdx(idx);
    }
  };

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    gsap.to(el, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.35,
    });
  };

  const handleCardTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  return (
    <SectionWrapper id="experience" ref={containerRef}>
      <Container>
        <SectionHeader>
          <SectionH2>Work Experience &amp; Leadership</SectionH2>
          <Subtitle>
            A track record of engineering scalable platforms, leading technical teams, and driving measurable digital growth.
          </Subtitle>
        </SectionHeader>

        <ExperienceLayout>
          {/* Desktop Sticky Milestone Dossier */}
          <StickySidebar>
            <SidebarCard>
              <SidebarTitle>Milestones</SidebarTitle>
              <SidebarDesc>
                Click any chapter to jump directly to the role summary.
              </SidebarDesc>

              <MilestonesList>
                {experiences.map((exp, i) => (
                  <MilestoneItem
                    key={exp.id}
                    $active={activeIdx === i}
                    onClick={() => scrollToMilestone(i)}
                  >
                    <span className="node-indicator" />
                    <div className="node-meta">
                      <span className="company-name">{exp.company}</span>
                      <span className="role-title">{exp.role}</span>
                      <span className="period-text">{exp.period}</span>
                    </div>
                  </MilestoneItem>
                ))}
              </MilestonesList>
            </SidebarCard>
          </StickySidebar>

          {/* Vertical GSAP Stacking Deck with Expanded Width */}
          <VerticalCardsDeck>
            {experiences.map((exp, i) => (
              <StackingCard
                key={exp.id}
                $index={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardTiltReset}
              >
                <div className="card-header">
                  <div className="company-role-block">
                    <span className="company-tag">
                      {exp.company} • {exp.location}
                    </span>
                    <h3>{exp.role}</h3>
                  </div>

                  <div className="badge-col">
                    <div className="period-badge">
                      {exp.current && <span className="live-dot" />}
                      <span>{exp.period}</span>
                    </div>
                    <span className="index-watermark">0{i + 1} / 0{experiences.length}</span>
                  </div>
                </div>

                <p className="description-text">{exp.description}</p>

                <div className="highlights-block">
                  <span className="highlight-heading">Key Achievements &amp; Impact</span>
                  <ul>
                    {exp.highlights.map((highlight, hi) => (
                      <li key={hi}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="skills-row">
                  {exp.skills.map((skill, si) => (
                    <SkillBadge key={si}>
                      {skill}
                    </SkillBadge>
                  ))}
                </div>
              </StackingCard>
            ))}
          </VerticalCardsDeck>
        </ExperienceLayout>
      </Container>
    </SectionWrapper>
  );
}