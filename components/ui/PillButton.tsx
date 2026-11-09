'use client';

import React from 'react';
import styled from 'styled-components';
import { ArrowRight, ArrowUpRight } from './Icons';

export interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'outline';
  arrow?: 'right' | 'up-right' | 'none';
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  as?: any;
  href?: string;
  disabled?: boolean;
  className?: string;
}

const StyledButton = styled.button<{ $variant: string; $hasArrow: boolean }>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'dark':
        return `
          background: ${theme.colors.ink};
          color: #ffffff;
          border: 1px solid transparent;
        `;
      case 'light':
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.foreground};
          border: 1px solid transparent;
        `;
      case 'outline':
      default:
        return `
          background: transparent;
          color: ${theme.colors.foreground};
          border: 1px solid ${theme.colors.line};
        `;
    }
  }}

  ${({ $hasArrow }) =>
    $hasArrow
      ? `
        padding: 0.375rem 0.375rem 0.375rem 1.5rem;
        gap: 0.75rem;
      `
      : `
        padding: 0.875rem 1.75rem;
      `}

  &:hover {
    transform: scale(1.04);
  }

  &:hover .badge-arrow-right {
    transform: translateX(3px);
  }

  &:hover .badge-arrow-up-right {
    transform: translate(2px, -2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (hover: none) {
    &:hover {
      transform: none !important;
    }
  }
`;

const Badge = styled.span<{ $variant: string }>`
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 1rem;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  ${({ $variant, theme }) =>
    $variant === 'dark'
      ? `
        background: #ffffff;
        color: ${theme.colors.ink};
      `
      : `
        background: ${theme.colors.ink};
        color: #ffffff;
      `}
`;

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'dark',
  arrow = 'none',
  onClick,
  type = 'button',
  as,
  href,
  disabled,
  className,
}) => {
  const hasArrow = arrow !== 'none';

  return (
    <StyledButton
      as={as}
      href={href}
      type={as ? undefined : type}
      $variant={variant}
      $hasArrow={hasArrow}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <span>{children}</span>
      {hasArrow && (
        <Badge $variant={variant}>
          {arrow === 'right' ? (
            <span className="badge-arrow-right" style={{ display: 'grid', placeItems: 'center', transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              <ArrowRight size="1em" />
            </span>
          ) : (
            <span className="badge-arrow-up-right" style={{ display: 'grid', placeItems: 'center', transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              <ArrowUpRight size="1em" />
            </span>
          )}
        </Badge>
      )}
    </StyledButton>
  );
};

