'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Eyebrow } from '../ui/Eyebrow';
import { ArrowUpRight, ArrowRight } from '../ui/Icons';
import { blogs } from '@/data/blogs';
import { Container } from '@/styles/primitives';

const BlogsWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-block: 5rem;

  @media (min-width: 1024px) {
    padding-block: 7rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.5rem;
`;

const SectionH2 = styled.h2<{ $revealed: boolean }>`
  margin-top: 1.25rem;
  max-width: 18ch;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 600;
  letter-spacing: -0.02em;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  .line-inner {
    display: block;
    transform: translateY(${({ $revealed }) => ($revealed ? '0%' : '100%')});
    opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
    transition: transform 900ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 900ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BlogCard = styled(Link)<{ $revealed: boolean; $delay: number }>`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.cardSm};
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '24px')});
  transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  transition-delay: ${({ $delay }) => `${$delay}ms`};

  &:hover {
    background: #ffffff;
    border-color: rgba(17, 17, 17, 0.25);
    transform: translateY(-4px);
  }

  &:hover .badge-shift {
    transform: translate(2px, -2px);
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

const BlogTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #111111;
  line-height: 1.35;
  margin-bottom: 0.75rem;

  @media (min-width: 640px) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Excerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(17, 17, 17, 0.65);
  line-height: 1.5;
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

const ViewMoreBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.875rem 2rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: scale(1.04);
  }
`;

export function BlogsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <BlogsWrapper id="blogs" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <Eyebrow variant="dark">Technical Writing &amp; Research</Eyebrow>
          <SectionH2 $revealed={revealed}>
            <span className="line-inner">Engineering Blogs</span>
          </SectionH2>
        </SectionHeader>

        <BlogGrid>
          {blogs.map((blog, idx) => (
            <BlogCard
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              $revealed={revealed}
              $delay={idx * 80}
            >
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
                  <span>Read Article</span>
                  <Badge className="badge-shift">
                    <ArrowUpRight size="0.875rem" />
                  </Badge>
                </span>
              </CardBottom>
            </BlogCard>
          ))}
        </BlogGrid>

        <ViewMoreBox>
          <ViewAllLink href="/blogs">
            <span>Explore All Technical Publications</span>
            <ArrowRight size="1em" />
          </ViewAllLink>
        </ViewMoreBox>
      </Container>
    </BlogsWrapper>
  );
}

