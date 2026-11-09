'use client';

import styled from 'styled-components';
import {
  space,
  color,
  layout,
  flexbox,
  typography,
  border,
  position,
  shadow,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  TypographyProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from 'styled-system';

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    BorderProps,
    ShadowProps {}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${color}
  ${layout}
  ${position}
  ${border}
  ${shadow}
`;

export interface FlexProps extends BoxProps, FlexboxProps {
  gap?: string | number;
}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
  ${({ gap }) => (gap ? `gap: ${typeof gap === 'number' ? `${gap * 0.25}rem` : gap};` : '')}
`;

export const Container = styled(Box)`
  max-width: ${({ theme }) => theme.maxContainer};
  margin-inline: auto;
  width: 100%;
  padding-inline: 1.5rem;

  @media (min-width: 640px) {
    padding-inline: 2rem;
  }

  @media (min-width: 1024px) {
    padding-inline: 2.5rem;
  }
`;

export interface TextProps extends BoxProps, TypographyProps {}

export const Text = styled.p<TextProps>`
  ${typography}
`;

export const Heading = styled.h2<TextProps>`
  ${typography}
`;

