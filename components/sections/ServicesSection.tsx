'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { Eyebrow } from '../ui/Eyebrow';
import { ArrowUpRight } from '../ui/Icons';
import { services } from '@/data/services';
import { Container } from '@/styles/primitives';

const ServicesWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-block: 3.5rem;

  @media (min-width: 1024px) {
    padding-block: 4.5rem;
  }

  @media (max-width: 767px) {
    padding-block: 2.25rem;
  }
`;

const ServicesH2 = styled.h2<{ $revealed: boolean }>`
  margin-top: 1.25rem;
  margin-bottom: 3rem;
  max-width: 16ch;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  letter-spacing: -0.02em;
  overflow: hidden;

  @media (min-width: 640px) {
    margin-bottom: 3.5rem;
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media (max-width: 767px) {
    margin-top: 0.65rem;
    margin-bottom: 1.35rem;
    font-size: clamp(1.55rem, 6.5vw, 1.95rem);
  }

  .line-inner {
    display: block;
    transform: translateY(${({ $revealed }) => ($revealed ? '0%' : '100%')});
    opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
    transition: transform 900ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 900ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const ServicesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ServiceItem = styled.li<{ $revealed: boolean; $delay: number }>`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '24px')});
  transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => `${$delay}ms`};

  &:first-child {
    border-top: none;
  }
`;

const ServiceRow = styled.button`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: ${({ theme }) => theme.radii.cardSm};
  padding-block: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background: rgba(241, 240, 238, 0);
  transition: background 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              padding-left 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              padding-right 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (min-width: 640px) {
    gap: 1.5rem;
    padding-block: 2rem;
  }

  &:hover {
    background: rgba(241, 240, 238, 1);
    padding-left: 2rem;
    padding-right: 1.25rem;
  }

  &:hover .badge-shift {
    transform: translateX(5px);
  }

  @media (hover: none) {
    &:hover {
      background: transparent !important;
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
    }

    &:hover .badge-shift {
      transform: none;
    }
  }

  @media (max-width: 767px) {
    gap: 0.75rem;
    padding-block: 1rem;
    padding-inline: 0.5rem;

    @media (hover: none) {
      &:hover {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
      }
    }

    &:active {
      background: rgba(241, 240, 238, 1);
    }
  }
`;

const ServiceIndex = styled.span`
  width: 1.75rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: rgba(17, 17, 17, 0.4);
  flex-shrink: 0;

  @media (min-width: 640px) {
    width: 2.5rem;
  }

  @media (max-width: 767px) {
    width: 1.35rem;
    font-size: 0.75rem;
  }
`;

const ServiceTitle = styled.h3`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.foreground};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  @media (max-width: 767px) {
    font-size: 1.125rem;
    line-height: 1.25;
  }
`;

const ServiceDesc = styled.p`
  display: none;
  max-width: 22rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(17, 17, 17, 0.55);
  line-height: 1.4;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const ServiceBadge = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  flex-shrink: 0;
  font-size: 1.125rem;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 767px) {
    width: 2.15rem;
    height: 2.15rem;
    font-size: 0.95rem;
  }
`;

export function ServicesSection() {
  const { openModal } = useScroll();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ServicesWrapper id="services" ref={sectionRef}>
      <Container>
        <Eyebrow variant="dark">Services &amp; Capabilities</Eyebrow>
        <ServicesH2 $revealed={revealed}>
          <span className="line-inner">What I do best</span>
        </ServicesH2>

        <ServicesList>
          {services.map((service, idx) => (
            <ServiceItem key={service.index} $revealed={revealed} $delay={idx * 60}>
              <ServiceRow type="button" onClick={openModal}>
                <ServiceIndex>{service.index}</ServiceIndex>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDesc>{service.shortDesc}</ServiceDesc>
                <ServiceBadge className="badge-shift">
                  <ArrowUpRight size="1em" />
                </ServiceBadge>
              </ServiceRow>
            </ServiceItem>
          ))}
        </ServicesList>
      </Container>
    </ServicesWrapper>
  );
}

