'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { useLiveClock } from '@/hooks/useLiveClock';
import { LogoMark, CloseIcon } from '../ui/Icons';
import { personalInfo } from '@/data/personal';
import { Container } from '@/styles/primitives';

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 115;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const TopBar = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.25rem;

  @media (min-width: 640px) {
    padding-block: 1.5rem;
  }

  .brand {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CloseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${({ theme }) => theme.radii.control};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
  }
`;

const CenterNav = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItemBtn = styled.button<{ $open: boolean; $delay: number }>`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-block: 0.5rem;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  letter-spacing: -0.02em;
  width: 100%;
  transform: translateY(${({ $open }) => ($open ? '0' : '1rem')});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
  transition-delay: ${({ $delay }) => `${$delay}ms`};

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
  }

  .idx {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 400;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.3s ease;
  }

  .label {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
  }

  &:hover .idx {
    color: ${({ theme }) => theme.colors.accentFrom};
  }

  &:hover .label {
    color: #ffffff;
  }
`;

const BottomBar = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-block: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: rgba(255, 255, 255, 0.45);

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }

  .cta-link {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
`;

const NAV_ITEMS = [
  { idx: '01', label: 'Home', target: 'home' },
  { idx: '02', label: 'About', target: 'about' },
  { idx: '03', label: 'Projects', target: 'projects' },
  { idx: '04', label: 'Experience', target: 'experience' },
  { idx: '05', label: 'Services', target: 'services' },
  { idx: '06', label: 'Contact', target: 'contact' },
];

export function NavOverlay() {
  const { isMenuOpen, closeMenu, scrollTo, openModal } = useScroll();
  const { time } = useLiveClock();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, closeMenu]);

  const handleNavClick = (target: string) => {
    closeMenu();
    if (target === 'contact') {
      setTimeout(() => openModal(), 120);
    } else {
      setTimeout(() => scrollTo(target), 120);
    }
  };

  return (
    <Overlay $open={isMenuOpen} role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <TopBar>
        <div className="brand">
          <span style={{ color: '#cf8047', fontSize: '1.25rem', display: 'flex' }}>
            <LogoMark size="1.25rem" color="#cf8047" />
          </span>
          <span>{personalInfo.name}</span>
        </div>
        <CloseBtn type="button" onClick={closeMenu}>
          <CloseIcon size="0.875rem" />
          <span>Close</span>
        </CloseBtn>
      </TopBar>

      <CenterNav>
        <NavList>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.target}>
              <NavItemBtn
                type="button"
                $open={isMenuOpen}
                $delay={80 + i * 40}
                onClick={() => handleNavClick(item.target)}
              >
                <span className="idx">{item.idx}</span>
                <span className="label">{item.label}</span>
              </NavItemBtn>
            </li>
          ))}
        </NavList>
      </CenterNav>

      <BottomBar>
        <div>Local time: {time}</div>
        <button
          type="button"
          className="cta-link"
          onClick={() => {
            closeMenu();
            setTimeout(() => openModal(), 120);
          }}
        >
          Start a project / Enquiry →
        </button>
      </BottomBar>
    </Overlay>
  );
}

