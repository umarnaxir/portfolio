'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const StyledWrapper = styled.span<{ $subtle: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: inherit;

  .animated-inner {
    display: inline-block;
    transform: translateX(0);
    opacity: ${({ $subtle }) => ($subtle ? '0.7' : '0.65')};
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
  }

  &:hover .animated-inner {
    transform: translateX(${({ $subtle }) => ($subtle ? '3px' : '4px')});
    opacity: 1;
  }

  @media (hover: none) {
    &:hover .animated-inner {
      transform: none !important;
    }
  }
`;

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  subtle = false,
  external = false,
  className,
  onClick,
}) => {
  const content = (
    <StyledWrapper $subtle={subtle} className={className} onClick={onClick}>
      <span className="animated-inner">{children}</span>
    </StyledWrapper>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
};

