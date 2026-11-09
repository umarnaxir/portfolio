'use client';

import React from 'react';
import styled from 'styled-components';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CreativeBand } from '@/components/sections/CreativeBand';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';

const Main = styled.main`
  position: relative;
`;

export default function HomePage() {
  return (
    <Main id="main">
      <HeroSection />
      <AboutSection />
      <CreativeBand />
      <ProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <StatsSection />
    </Main>
  );
}
