'use client';

import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.15rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DotsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const DotButton = styled.button<{ $active: boolean; $darkSurface?: boolean }>`
  height: 0.375rem;
  width: ${({ $active }) => ($active ? '1.35rem' : '0.45rem')};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
  background: ${({ $active, $darkSurface, theme }) =>
    $active
      ? theme.colors.accent
      : $darkSurface
      ? 'rgba(255, 255, 255, 0.24)'
      : 'rgba(17, 17, 17, 0.18)'};
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CounterText = styled.span<{ $darkSurface?: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  font-family: monospace;
  letter-spacing: 0.04em;
  margin-right: 0.25rem;
  color: ${({ $darkSurface }) => ($darkSurface ? 'rgba(255, 255, 255, 0.55)' : 'rgba(17, 17, 17, 0.5)')};
`;

const ArrowBtn = styled.button<{ $darkSurface?: boolean }>`
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ $darkSurface }) => ($darkSurface ? 'rgba(255, 255, 255, 0.16)' : 'rgba(17, 17, 17, 0.14)')};
  background: ${({ $darkSurface }) => ($darkSurface ? 'rgba(255, 255, 255, 0.06)' : '#ffffff')};
  color: ${({ $darkSurface }) => ($darkSurface ? '#ffffff' : '#111111')};
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

interface MobileCarouselControlsProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  darkSurface?: boolean;
  labelPrefix?: string;
}

export function MobileCarouselControls({
  total,
  activeIndex,
  onSelect,
  darkSurface = false,
  labelPrefix = 'Slide',
}: MobileCarouselControlsProps) {
  return (
    <ControlsWrapper>
      <DotsGroup role="tablist" aria-label={`${labelPrefix} navigation`}>
        {Array.from({ length: total }).map((_, idx) => (
          <DotButton
            key={idx}
            type="button"
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`${labelPrefix} ${idx + 1}`}
            $active={activeIndex === idx}
            $darkSurface={darkSurface}
            onClick={() => onSelect(idx)}
          />
        ))}
      </DotsGroup>

      <RightGroup>
        <CounterText $darkSurface={darkSurface}>
          0{activeIndex + 1} / 0{total}
        </CounterText>
        <ArrowBtn
          type="button"
          $darkSurface={darkSurface}
          disabled={activeIndex === 0}
          onClick={() => onSelect(activeIndex - 1)}
          aria-label={`Previous ${labelPrefix.toLowerCase()}`}
        >
          <ArrowLeft size="0.85rem" strokeWidth={2} aria-hidden="true" />
        </ArrowBtn>
        <ArrowBtn
          type="button"
          $darkSurface={darkSurface}
          disabled={activeIndex === total - 1}
          onClick={() => onSelect(activeIndex + 1)}
          aria-label={`Next ${labelPrefix.toLowerCase()}`}
        >
          <ArrowRight size="0.85rem" strokeWidth={2} aria-hidden="true" />
        </ArrowBtn>
      </RightGroup>
    </ControlsWrapper>
  );
}

