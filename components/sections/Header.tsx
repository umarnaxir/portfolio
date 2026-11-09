'use client';

import React from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { useLiveClock } from '@/hooks/useLiveClock';
import { MenuIcon } from '../ui/Icons';
import { personalInfo } from '@/data/personal';
import { Container } from '@/styles/primitives';

const HeaderWrapper = styled.header<{ $revealed: boolean }>`
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '-14px')});
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.5rem;

  @media (min-width: 640px) {
    padding-block: 2rem;
  }
`;

const BrandButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: scale(1.02);
    opacity: 0.8;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ClockChip = styled.div`
  display: none;
  align-items: center;
  gap: 0.625rem;
  border: 1px solid rgba(230, 229, 226, 0.9);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.55rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(17, 17, 17, 0.75);

  @media (min-width: 640px) {
    display: inline-flex;
  }

  .clock-label {
    color: rgba(17, 17, 17, 0.45);
  }

  .clock-time {
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    color: #111111;
  }

  .clock-sep {
    color: rgba(17, 17, 17, 0.3);
  }

  .clock-date {
    font-weight: 500;
  }
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(230, 229, 226, 0.9);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.55rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.ink};
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export function Header() {
  const { isReady, scrollTo, openMenu } = useScroll();
  const { time, date } = useLiveClock();

  return (
    <HeaderWrapper $revealed={isReady}>
      <Container>
        <HeaderInner>
          {/* Brand without orange dot */}
          <BrandButton type="button" onClick={() => scrollTo('home')} aria-label={`${personalInfo.name} Home`}>
            <span>{personalInfo.name}</span>
          </BrandButton>

          {/* Right Actions: Local Time & Date + Menu Button */}
          <HeaderActions>
            <ClockChip aria-label="Local studio time">
              <span className="clock-label">Local time</span>
              <span className="clock-time">{time}</span>
              <span className="clock-sep">•</span>
              <span className="clock-date">{date}</span>
            </ClockChip>

            <MenuButton type="button" onClick={openMenu} aria-label="Open Navigation Menu">
              <MenuIcon size="0.875rem" />
              <span>Menu</span>
            </MenuButton>
          </HeaderActions>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
}
