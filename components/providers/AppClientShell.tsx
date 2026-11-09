'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { useAdaptiveGrid } from '@/hooks/useAdaptiveGrid';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { IntroLoader } from '../sections/IntroLoader';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { NavOverlay } from '../sections/NavOverlay';
import { ContactModal } from '../sections/ContactModal';

export function AppClientShell({ children }: { children: React.ReactNode }) {
  useAdaptiveGrid();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SmoothScrollProvider>
        <IntroLoader />
        <Header />
        {children}
        <Footer />
        <NavOverlay />
        <ContactModal />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

