'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow } from '../ui/Eyebrow';
import { TagChip } from '../ui/TagChip';
import { ArrowUpRight, ArrowRight } from '../ui/Icons';
import { projects } from '@/data/projects';
import { Container } from '@/styles/primitives';

const ProjectsWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 3.5rem;
  padding-bottom: 4.5rem;
  position: relative;

  @media (min-width: 1024px) {
    padding-top: 4rem;
    padding-bottom: 5rem;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.75rem;
  text-align: center;
`;

const ProjectsH2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.foreground};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const SubtitleText = styled.p`
  margin-top: 0.75rem;
  max-width: 36rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: rgba(17, 17, 17, 0.65);
  line-height: 1.5;
`;

const DesktopScrollHint = styled.div`
  display: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 1.75rem;
  text-align: center;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
`;

/* Desktop Pinned Horizontal Track */
const DesktopTrackWrapper = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    width: 100%;
    overflow: hidden;
  }
`;

const HorizontalPinSection = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const HorizontalTrack = styled.div`
  display: flex;
  gap: 2.5rem;
  padding-left: clamp(2rem, 5vw, 6rem);
  padding-right: 20vw;
  width: max-content;
  will-change: transform;
`;

/* Mobile / Tablet Vertical List */
const MobileProjectsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

/* Immersive Project Card: 70% Image on Left, 30% Information on Right */
const ProjectCard = styled.div`
  position: relative;
  border-radius: 16px;
  background: #0a0a0a;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.32);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;

  @media (min-width: 1024px) {
    flex-direction: row;
    width: clamp(740px, 62vw, 980px);
    min-width: clamp(740px, 62vw, 980px);
    height: clamp(520px, 62vh, 620px);
  }

  @media (max-width: 1023px) {
    width: 100%;
    min-height: 30rem;
  }

  &:hover {
    border-color: rgba(177, 95, 44, 0.65);
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.48), 0 0 35px rgba(177, 95, 44, 0.2);
  }

  &:hover .preview-img {
    transform: scale(1.1) translateY(-4px);
    filter: contrast(1.05) brightness(1.03);
  }

  &:hover .hover-glow-shimmer {
    opacity: 1;
  }

  &:hover .image-reveal-tag {
    opacity: 1;
    transform: translateY(0);
    border-color: rgba(177, 95, 44, 0.5);
  }

  &:hover .badge-rotate {
    transform: rotate(45deg) scale(1.1);
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
  }

  &:hover .card-action-btn {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accentFrom};
    color: #ffffff;
    box-shadow: 0 4px 18px rgba(177, 95, 44, 0.4);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: #0c0c0c;
  overflow: hidden;

  @media (min-width: 1024px) {
    flex: 0 0 70%;
    width: 70%;
    height: 100%;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    will-change: transform;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
  }

  .hover-glow-shimmer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: radial-gradient(circle at 40% 40%, rgba(255, 140, 50, 0.22) 0%, rgba(177, 95, 44, 0.08) 50%, transparent 80%);
    mix-blend-mode: screen;
  }

  .image-reveal-tag {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    background: rgba(10, 10, 10, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    gap: 0.45rem;
    transform: translateY(-2px);
    opacity: 0.85;
    transition: all 0.3s ease;
    z-index: 2;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #cf8047;
    }
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent 70%, rgba(10, 10, 10, 0.95) 100%),
                linear-gradient(to top, rgba(10, 10, 10, 0.6) 0%, transparent 40%);
    pointer-events: none;

    @media (max-width: 1023px) {
      background: linear-gradient(to bottom, transparent 65%, rgba(10, 10, 10, 0.95));
    }
  }
`;

const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem 1.75rem;
  background: #0a0a0a;

  @media (min-width: 1024px) {
    flex: 0 0 30%;
    width: 30%;
    height: 100%;
    padding: 2.25rem 2rem;
    border-left: 1px solid rgba(255, 255, 255, 0.04);
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
  }

  .category-pill {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accentFrom};
    background: rgba(177, 95, 44, 0.15);
    border: 1px solid rgba(177, 95, 44, 0.3);
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
  }

  .year-tag {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.45);
    font-family: monospace;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: clamp(1.25rem, 1.6vw, 1.65rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.25;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.55;
  }

  .tags-and-link {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1.25rem;
  }

  .tags-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .card-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.accentFrom};
      color: #ffffff;
      box-shadow: 0 4px 18px rgba(177, 95, 44, 0.4);
    }
  }
`;

const CardBadge = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 1.1rem;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  flex-shrink: 0;
`;

const ViewMoreBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.5rem;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  border-radius: 8px;
  padding: 0.875rem 2.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Show strictly first 4 projects as requested
  const featuredProjects = projects.slice(0, 4);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const pinSection = pinSectionRef.current;
    if (!track || !pinSection) return;

    const mm = gsap.matchMedia();

    // Desktop: Pin and horizontal scroll
    mm.add('(min-width: 1024px)', () => {
      const totalWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = totalWidth - windowWidth + 140;

      if (scrollDistance > 0) {
        const tween = gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 1.1,
            start: 'top 8%',
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    });

    return () => mm.revert();
  }, [featuredProjects]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;

    gsap.to(el, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.6,
    });
  };

  return (
    <ProjectsWrapper id="projects" ref={sectionRef}>
      <Container>
        <HeaderBox>
          <ProjectsH2>Featured Projects</ProjectsH2>
          <SubtitleText>
            A curated showcase of flagship web platforms, e-commerce systems, and full-stack applications engineered for performance and conversion.
          </SubtitleText>

          <DesktopScrollHint>
            <span>← Explore Featured Works Horizontally →</span>
          </DesktopScrollHint>
        </HeaderBox>
      </Container>

      {/* Desktop Horizontal Track: 1 full card + half of the next card */}
      <DesktopTrackWrapper ref={pinSectionRef}>
        <HorizontalPinSection>
          <HorizontalTrack ref={trackRef}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <CardImageContainer>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="preview-img"
                      loading="lazy"
                    />
                  )}
                  <div className="hover-glow-shimmer" />
                  <div className="image-reveal-tag">
                    <span className="dot" />
                    <span>Featured Work</span>
                  </div>
                  <div className="image-overlay" />
                </CardImageContainer>

                <CardContent>
                  <div>
                    <div className="meta-row">
                      <span className="category-pill">{project.category}</span>
                      <span className="year-tag">{project.year}</span>
                    </div>

                    <div className="title-row">
                      <h3>{project.title}</h3>
                      <CardBadge className="badge-rotate">
                        <ArrowUpRight size="1em" />
                      </CardBadge>
                    </div>

                    <p>{project.description}</p>
                  </div>

                  <div className="tags-and-link">
                    <div className="tags-group">
                      {project.tags.slice(0, 4).map((t, ti) => (
                        <TagChip key={ti} variant="light">
                          {t}
                        </TagChip>
                      ))}
                    </div>

                    <a
                      href={project.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn"
                    >
                      <span>Live Demo</span>
                      <ArrowRight size="0.875rem" />
                    </a>
                  </div>
                </CardContent>
              </ProjectCard>
            ))}
          </HorizontalTrack>
        </HorizontalPinSection>
      </DesktopTrackWrapper>

      {/* Mobile & Tablet Responsive List */}
      <Container>
        <MobileProjectsList>
          {featuredProjects.map((project) => (
            <li key={project.id}>
              <ProjectCard>
                <CardImageContainer>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="preview-img"
                      loading="lazy"
                    />
                  )}
                  <div className="hover-glow-shimmer" />
                  <div className="image-reveal-tag">
                    <span className="dot" />
                    <span>Featured Work</span>
                  </div>
                  <div className="image-overlay" />
                </CardImageContainer>

                <CardContent>
                  <div>
                    <div className="meta-row">
                      <span className="category-pill">{project.category}</span>
                      <span className="year-tag">{project.year}</span>
                    </div>

                    <div className="title-row">
                      <h3>{project.title}</h3>
                      <CardBadge className="badge-rotate">
                        <ArrowUpRight size="1em" />
                      </CardBadge>
                    </div>

                    <p>{project.description}</p>
                  </div>

                  <div className="tags-and-link">
                    <div className="tags-group">
                      {project.tags.slice(0, 3).map((t, ti) => (
                        <TagChip key={ti} variant="light">
                          {t}
                        </TagChip>
                      ))}
                    </div>

                    <a
                      href={project.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn"
                    >
                      <span>Live Demo</span>
                      <ArrowRight size="0.875rem" />
                    </a>
                  </div>
                </CardContent>
              </ProjectCard>
            </li>
          ))}
        </MobileProjectsList>

        <ViewMoreBox>
          <ViewAllLink href="/projects">
            <span>View All {projects.length}+ Projects Archive</span>
            <ArrowRight size="1em" />
          </ViewAllLink>
        </ViewMoreBox>
      </Container>
    </ProjectsWrapper>
  );
}
