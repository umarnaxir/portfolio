'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { PillButton } from '../ui/PillButton';
import { CloseIcon, LogoMark } from '../ui/Icons';
import { personalInfo } from '@/data/personal';

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  background: rgba(17, 17, 17, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ease;

  @media (min-width: 640px) {
    align-items: center;
  }
`;

const ModalPanel = styled.div<{ $open: boolean }>`
  position: relative;
  width: 100%;
  max-width: 36rem;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.radii.card};
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.colors.line};
  transform: translateY(${({ $open }) => ($open ? '0' : '28px')});
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 640px) {
    padding: 2.25rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: rgba(17, 17, 17, 0.6);
  transition: background 0.2s ease, color 0.2s ease;
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
    color: #111111;
  }
`;

const HeadingBlock = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .modal-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 500;
    color: rgba(17, 17, 17, 0.6);

    .dot {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.accent};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #111111;

    @media (min-width: 640px) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(17, 17, 17, 0.6);
  }
`;

const DirectChannels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.control};
  background: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.accentTo};
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: rgba(17, 17, 17, 0.5);
  }

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.line};
    background: rgba(241, 240, 238, 0.5);
    border-radius: ${({ theme }) => theme.radii.control};
    padding: 0.75rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    outline: none;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.foreground};
    transition: border-color 0.2s ease, background 0.2s ease;

    @media (max-width: 767px) {
      padding: 0.65rem 0.875rem;
      font-size: 16px;
    }

    &:focus {
      border-color: rgba(17, 17, 17, 0.3);
      background: #ffffff;
    }
  }

  textarea {
    resize: none;
  }
`;

const BottomRow = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .note {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: rgba(17, 17, 17, 0.45);
  }
`;

const ErrorMsg = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #d32f2f;
  margin-top: -0.5rem;
`;

const SuccessView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: 2rem;
  gap: 1rem;

  .badge {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.accentFrom};
    font-size: 1.5rem;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 600;
    color: #111111;
  }

  p {
    max-width: 36ch;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(17, 17, 17, 0.6);
    line-height: 1.5;
  }
`;

export function ContactModal() {
  const { isModalOpen, closeModal } = useScroll();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full-Stack Web Application',
    budget: '$3k - $5k',
    description: '',
  });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen, closeModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Submission failed');
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please email directly.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    closeModal();
    setTimeout(() => {
      setSuccess(false);
      setError(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Full-Stack Web Application',
        budget: '$3k - $5k',
        description: '',
      });
    }, 300);
  };

  return (
    <Backdrop $open={isModalOpen} onClick={closeModal} role="dialog" aria-modal="true" aria-label="Project Inquiry Modal">
      <ModalPanel $open={isModalOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" onClick={closeModal} aria-label="Close modal">
          <CloseIcon size="1em" />
        </CloseButton>

        {!success ? (
          <div>
            <HeadingBlock>
              <div className="modal-eyebrow">
                <span className="dot" />
                <span>Start a Project</span>
              </div>
              <h2>Let&apos;s build something exceptional.</h2>
              <p>Tell me about your project goals, technical requirements, and timeline.</p>
            </HeadingBlock>

            <DirectChannels>
              <span>Direct: </span>
              <a href={personalInfo.socials.email}>{personalInfo.email}</a>
              <span>•</span>
              <a href={personalInfo.socials.phone}>{personalInfo.phone}</a>
            </DirectChannels>

            <Form onSubmit={handleSubmit}>
              <FieldGrid>
                <Field>
                  <label htmlFor="field-name">Your Name *</label>
                  <input
                    type="text"
                    id="field-name"
                    name="name"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <label htmlFor="field-email">Email Address *</label>
                  <input
                    type="email"
                    id="field-email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Field>
              </FieldGrid>

              <FieldGrid>
                <Field>
                  <label htmlFor="field-phone">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="field-phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <label htmlFor="field-type">Project Type</label>
                  <select id="field-type" name="projectType" value={formData.projectType} onChange={handleChange}>
                    <option value="Website Development">Website Development</option>
                    <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                    <option value="Mobile App Development">Mobile App (React Native)</option>
                    <option value="E-Commerce Platform">E-Commerce Platform</option>
                    <option value="Technical SEO & Performance">Technical SEO &amp; Growth</option>
                    <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                  </select>
                </Field>
              </FieldGrid>

              <Field>
                <label htmlFor="field-budget">Estimated Budget</label>
                <select id="field-budget" name="budget" value={formData.budget} onChange={handleChange}>
                  <option value="$1k - $3k">$1,000 - $3,000</option>
                  <option value="$3k - $5k">$3,000 - $5,000</option>
                  <option value="$5k - $10k">$5,000 - $10,000</option>
                  <option value="$10k+">$10,000+</option>
                </select>
              </Field>

              <Field>
                <label htmlFor="field-desc">Project Details *</label>
                <textarea
                  id="field-desc"
                  name="description"
                  rows={4}
                  required
                  placeholder="Tell me about what you're building, key features, and target launch timeline..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </Field>

              {error && <ErrorMsg>{error}</ErrorMsg>}

              <BottomRow>
                <span className="note">I reply personally within 24 hours.</span>
                <PillButton variant="dark" arrow="up-right" type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Send Inquiry'}
                </PillButton>
              </BottomRow>
            </Form>
          </div>
        ) : (
          <SuccessView>
            <div className="badge">
              <LogoMark size="1.75rem" color="#cf8047" />
            </div>
            <h2>Inquiry Received</h2>
            <p>
              Thank you for reaching out, <strong>{formData.name}</strong>. I have received your project details and will get back to you via <strong>{formData.email}</strong> within one business day.
            </p>
            <PillButton variant="dark" onClick={handleReset}>
              Close &amp; Return
            </PillButton>
          </SuccessView>
        )}
      </ModalPanel>
    </Backdrop>
  );
}

