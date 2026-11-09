'use client';

import React from 'react';
import styled from 'styled-components';

export interface TagChipProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

const StyledChip = styled.span<{ $variant: string }>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;

  ${({ $variant, theme }) =>
    $variant === 'dark'
      ? `
        border: 1px solid ${theme.colors.line};
        color: ${theme.colors.foreground};
        background: transparent;
      `
      : `
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #ffffff;
        background: transparent;
      `}
`;

export const TagChip: React.FC<TagChipProps> = ({
  children,
  variant = 'light',
  className,
}) => (
  <StyledChip $variant={variant} className={className}>
    {children}
  </StyledChip>
);

