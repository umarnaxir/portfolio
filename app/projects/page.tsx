'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TagChip } from '@/components/ui/TagChip';
import { ArrowUpRight, ArrowRight } from '@/components/ui/Icons';
import { projects } from '@/data/projects';
import { Container } from '@/styles/primitives';

const PageWrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 8rem;
  padding-bottom: 7rem;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 3.5rem;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 1.5rem;
    text-decoration: none;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateX(-3px);
    }
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-top: 1rem;

    @media (min-width: 640px) {
      font-size: ${({ theme }) => theme.fontSizes['6xl']};
    }
  }

  p {
    margin-top: 1rem;
    max-width: 44rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: rgba(17, 17, 17, 0.65);
    line-height: 1.6;
  }
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  border-radius: 8px;
  padding: 0.55rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  ${({ $active, theme }) =>
    $active
      ? `
        background: ${theme.colors.ink};
        color: #ffffff;
        border: 1px solid ${theme.colors.ink};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      `
      : `
        background: ${theme.colors.surface};
        color: rgba(17, 17, 17, 0.7);
        border: 1px solid rgba(230, 229, 226, 0.8);
        &:hover {
          background: ${theme.colors.surface2};
          color: #111111;
        }
      `}
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.a`
  position: relative;
  border-radius: 14px;
  background: #0a0a0a;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(177, 95, 44, 0.5);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
  }

  &:hover .card-preview-img {
    transform: scale(1.05);
  }

  &:hover .badge-rotate {
    transform: rotate(45deg) scale(1.1);
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: #111111;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .card-preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const CardContent = styled.div`
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;

    .category {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: ${({ theme }) => theme.colors.accentFrom};
    }

    .year {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
      font-family: monospace;
    }
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 0.6rem;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #ffffff;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1rem;
  }
`;

const CardBadge = styled.span`
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 1rem;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  flex-shrink: 0;
`;

const CATEGORIES = ['All', 'E-Commerce', 'Web Platform', 'Management', 'Healthcare', 'Corporate', 'Enterprise', 'AI/ML'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return (
      p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  });

  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <Link href="/" className="back-link">
            <span>← Back to Portfolio</span>
          </Link>
          <Eyebrow variant="dark">Project Archive</Eyebrow>
          <h1>All Engineered Works</h1>
          <p>
            An archive of 30+ digital products, web applications, cross-platform mobile apps, and technical SEO builds delivered across e-commerce, healthcare, logistics, and education.
          </p>
        </PageHeader>

        <FilterRow>
          {CATEGORIES.map((cat) => (
            <FilterBtn
              key={cat}
              type="button"
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterBtn>
          ))}
        </FilterRow>

        <ProjectsGrid>
          {filteredProjects.map((project) => (
            <Card key={project.id} href={project.link || '#'} target="_blank" rel="noopener noreferrer">
              {project.image && (
                <CardImage>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card-preview-img"
                    loading="lazy"
                  />
                </CardImage>
              )}

              <CardContent>
                <div>
                  <div className="top-meta">
                    <span className="category">{project.category}</span>
                    <span className="year">{project.year}</span>
                  </div>

                  <div className="title-row">
                    <h2>{project.title}</h2>
                    <CardBadge className="badge-rotate">
                      <ArrowUpRight size="1em" />
                    </CardBadge>
                  </div>

                  <p>{project.longDescription || project.description}</p>
                </div>

                <div className="tags-row">
                  {project.tags.map((tag, i) => (
                    <TagChip key={i} variant="light">
                      {tag}
                    </TagChip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </ProjectsGrid>
      </Container>
    </PageWrapper>
  );
}
