'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArrowUpRight } from '@/components/ui/Icons';
import { blogs } from '@/data/blogs';
import { Container } from '@/styles/primitives';

const PageWrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 8rem;
  padding-bottom: 7rem;
  min-height: 100vh;

  @media (max-width: 767px) {
    padding-top: 5.25rem;
    padding-bottom: 3rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 3.5rem;

  @media (max-width: 767px) {
    margin-bottom: 1.75rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 1.5rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 767px) {
      margin-bottom: 0.85rem;
      font-size: 0.8125rem;
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

    @media (max-width: 767px) {
      font-size: clamp(1.75rem, 7.2vw, 2.15rem);
      margin-top: 0.65rem;
    }
  }

  p {
    margin-top: 1rem;
    max-width: 40rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: rgba(17, 17, 17, 0.65);
    line-height: 1.5;

    @media (max-width: 767px) {
      margin-top: 0.6rem;
      font-size: 0.875rem;
    }
  }
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    gap: 1.15rem;
  }
`;

const BlogCard = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.cardSm};
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;

  @media (max-width: 767px) {
    padding: 1.35rem 1.25rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: #ffffff;
      border-color: rgba(17, 17, 17, 0.25);
      transform: translateY(-4px);
    }

    &:hover .badge-shift {
      transform: translate(2px, -2px);
    }
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(17, 17, 17, 0.5);
  margin-bottom: 1rem;
  font-weight: 500;

  .category-badge {
    background: ${({ theme }) => theme.colors.surface2};
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0.25rem 0.625rem;
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;

const BlogTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #111111;
  line-height: 1.35;
  margin-bottom: 0.75rem;
`;

const Excerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(17, 17, 17, 0.65);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  padding-top: 1rem;

  .read-action {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }
`;

const Badge = styled.span`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export default function BlogsPage() {
  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <Link href="/" className="back-link">
            <span>← Back to Portfolio</span>
          </Link>
          <Eyebrow variant="dark" pill>
            Technical Publications
          </Eyebrow>
          <h1>Articles &amp; Architecture Insights</h1>
          <p>
            Perspectives on software engineering, technical SEO, mobile application architecture, and high-performance web systems.
          </p>
        </PageHeader>

        <BlogsGrid>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} href={`/blogs/${blog.slug}`}>
              <div>
                <CardMeta>
                  <span className="category-badge">{blog.category}</span>
                  <span>{blog.readTime}</span>
                </CardMeta>

                <BlogTitle>{blog.title}</BlogTitle>
                <Excerpt>{blog.excerpt}</Excerpt>
              </div>

              <CardBottom>
                <span>{blog.date}</span>
                <span className="read-action">
                  <span>Read Full Article</span>
                  <Badge className="badge-shift">
                    <ArrowUpRight size="0.875rem" />
                  </Badge>
                </span>
              </CardBottom>
            </BlogCard>
          ))}
        </BlogsGrid>
      </Container>
    </PageWrapper>
  );
}

