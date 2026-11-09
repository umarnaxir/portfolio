'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight } from '../ui/Icons';

const HeroCardWrapper = styled.div<{ $revealed: boolean }>`
  width: 100%;
  max-width: 24rem;
  border-radius: ${({ theme }) => theme.radii.cardSm};
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(230, 229, 226, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '16px')}) scale(${({ $revealed }) => ($revealed ? 1 : 0.96)});
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 1024px) {
    width: 19rem;
  }
`;

const CardInner = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.control};
`;

const Tile = styled.div`
  aspect-ratio: 1;
  width: 6rem;
  height: 6rem;
  display: block;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.control};
  background: ${({ theme }) => theme.colors.ink};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const Panel = styled.div`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.control};
  background: rgba(241, 240, 238, 0.7);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const Slot = styled.div`
  position: relative;
  min-height: 3.25rem;
  overflow: hidden;
`;

const SlideItem = styled.div<{ $active: boolean; $dir: number }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: translateY(${({ $active, $dir }) => ($active ? '0' : `${$dir * 14}px`)});
  transition: opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

const Caption = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(17, 17, 17, 0.45);
`;

const SlideTitle = styled.h4`
  max-width: 9rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  line-height: 1.35;
  color: #111111;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Dashes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Dash = styled.span<{ $active: boolean }>`
  height: 0.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $active }) => ($active ? 'rgba(17, 17, 17, 0.7)' : 'rgba(17, 17, 17, 0.2)')};
  width: ${({ $active }) => ($active ? '1rem' : '0.375rem')};
  transition: all 0.3s ease;
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NavBtn = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: #ffffff;
  color: rgba(17, 17, 17, 0.7);
  border: 1px solid ${({ theme }) => theme.colors.line};
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #111111;
    border-color: rgba(17, 17, 17, 0.3);
  }
`;

const SLIDES = [
  { caption: 'Full-Stack Engineering', title: 'Scalable systems built to last.' },
  { caption: 'Technical SEO & Growth', title: 'Engineered to rank #1 on Google.' },
  { caption: 'Conversion Architecture', title: 'Crafted to engage and convert.' },
];

export function HeroCardCarousel({ revealed }: { revealed: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <HeroCardWrapper $revealed={revealed}>
      <CardInner onClick={() => next()}>
        <Tile>
          <img src="/images/umar.jpeg" alt="Umar Nazir" />
        </Tile>
        <Panel>
          <Slot>
            {SLIDES.map((slide, i) => (
              <SlideItem key={i} $active={i === index} $dir={direction}>
                <Caption>{slide.caption}</Caption>
                <SlideTitle>{slide.title}</SlideTitle>
              </SlideItem>
            ))}
          </Slot>
          <BottomRow>
            <Dashes>
              {SLIDES.map((_, i) => (
                <Dash key={i} $active={i === index} />
              ))}
            </Dashes>
            <NavButtons>
              <NavBtn type="button" onClick={prev} aria-label="Previous slide">
                <span style={{ transform: 'rotate(180deg)', display: 'grid', placeItems: 'center' }}>
                  <ArrowRight size="0.75rem" />
                </span>
              </NavBtn>
              <NavBtn type="button" onClick={next} aria-label="Next slide">
                <span style={{ display: 'grid', placeItems: 'center' }}>
                  <ArrowRight size="0.75rem" />
                </span>
              </NavBtn>
            </NavButtons>
          </BottomRow>
        </Panel>
      </CardInner>
    </HeroCardWrapper>
  );
}

