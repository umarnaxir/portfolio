'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { blogs } from '@/data/blogs';
import { Container } from '@/styles/primitives';

const ArticleWrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-top: 8rem;
  padding-bottom: 7rem;
  min-height: 100vh;

  @media (max-width: 767px) {
    padding-top: 5.25rem;
    padding-bottom: 3rem;
  }
`;

const ArticleHeader = styled.div`
  margin-bottom: 3.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 2.5rem;

  @media (max-width: 767px) {
    margin-bottom: 1.75rem;
    padding-bottom: 1.5rem;
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

  .meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(17, 17, 17, 0.5);
    margin-top: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 767px) {
      margin-bottom: 0;
      font-size: 0.78rem;
    }
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;

    @media (min-width: 640px) {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    @media (max-width: 767px) {
      font-size: clamp(1.65rem, 6.8vw, 2.05rem);
    }
  }
`;

const ArticleBody = styled.article`
  max-width: 48rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(17, 17, 17, 0.85);
  line-height: 1.8;

  @media (max-width: 767px) {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  h2, h3 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #111111;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      list-style-type: disc;
    }
  }

  code {
    background: ${({ theme }) => theme.colors.surface};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
`;

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return notFound();
  }

  return (
    <ArticleWrapper>
      <Container>
        <ArticleHeader>
          <Link href="/blogs" className="back-link">
            <span>← Back to All Articles</span>
          </Link>
          <Eyebrow variant="dark" pill>
            {blog.category}
          </Eyebrow>
          <h1>{blog.title}</h1>
          <div className="meta">
            <span>Published on {blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </ArticleHeader>

        <ArticleBody>
          <p>{blog.excerpt}</p>
          {blog.content ? (
            <div style={{ whiteSpace: 'pre-line' }}>{blog.content}</div>
          ) : (
            <p>Full article content currently being synced from technical archive.</p>
          )}
        </ArticleBody>
      </Container>
    </ArticleWrapper>
  );
}

