'use client';

import React from 'react';
import styled from 'styled-components';

export interface EyebrowProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  pill?: boolean;
  className?: string;
}

const StyledEyebrow = styled.div<{ $variant: string; $pill: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;

  ${({ $variant, theme }) =>
    $variant === 'light'
      ? `
        color: rgba(255, 255, 255, 0.7);
        .eyebrow-dot {
          background: rgba(255, 255, 255, 0.6);
        }
      `
      : `
        color: rgba(17, 17, 17, 0.7);
        .eyebrow-dot {
          background: rgba(17, 17, 17, 0.5);
        }
      `}

  ${({ $pill, theme }) =>
    $pill
      ? `
        border: 1px solid ${theme.colors.line};
        border-radius: ${theme.radii.pill};
        padding: 0.375rem 1rem;
      `
      : ''}
`;

const Dot = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  flex-shrink: 0;
`;

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  variant = 'dark',
  pill = false,
  className,
}) => (
  <StyledEyebrow $variant={variant} $pill={pill} className={className}>
    <Dot className="eyebrow-dot" />
    <span>{children}</span>
  </StyledEyebrow>
);

