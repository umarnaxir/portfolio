'use client';

import React from 'react';
import styled from 'styled-components';
import { useScroll } from '../providers/SmoothScrollProvider';
import { PillButton } from '../ui/PillButton';
import {
  WhatsAppIcon,
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
  PhoneIcon,
  ArrowUpRight,
} from '../ui/Icons';
import { personalInfo } from '@/data/personal';
import { Container } from '@/styles/primitives';

const FooterWrapper = styled.footer`
  position: relative;
  overflow: hidden;
  border-radius: 2rem 2rem 0 0;
  background: ${({ theme }) => theme.colors.ink};
  color: #ffffff;
`;

const FooterShell = styled(Container)`
  position: relative;
  z-index: 10;
  padding-top: 3.5rem;
  padding-bottom: 2.5rem;

  @media (min-width: 1024px) {
    padding-top: 5rem;
    padding-bottom: 3rem;
  }
`;

/* Expansive Footer CTA */
const CtaRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 4rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 5rem;
  }
`;

const CtaTextWrap = styled.div`
  max-width: 54rem;
`;

const CtaEyebrow = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.accentFrom};
  margin-bottom: 1rem;
`;

const FooterH2 = styled.h2`
  width: 100%;
  font-size: clamp(2.25rem, 4.5vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #ffffff;
  line-height: 1.1;

  .accent-word {
    color: ${({ theme }) => theme.colors.accentFrom};
  }
`;

const CtaButtonCol = styled.div`
  flex-shrink: 0;
`;

/* 5-Channel Contact Grid */
const ContactSection = styled.div`
  padding-block: 4rem;
`;

const ContactSectionHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;

  .heading-block {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #ffffff;
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
  }
`;

const ContactCard = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.75rem 1.5rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon-box {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: grid;
      place-items: center;
      color: rgba(255, 255, 255, 0.85);
      transition: all 0.3s ease;
    }

    .arrow-indicator {
      color: rgba(255, 255, 255, 0.3);
      transition: transform 0.3s ease, color 0.3s ease;
    }
  }

  .info-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .contact-title {
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #ffffff;
    }

    .contact-value {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      color: rgba(255, 255, 255, 0.55);
      word-break: break-all;
      transition: color 0.3s ease;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(177, 95, 44, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(177, 95, 44, 0.15);

    .icon-box {
      background: ${({ theme }) => theme.colors.accent};
      color: #ffffff;
      border-color: ${({ theme }) => theme.colors.accentFrom};
    }

    .arrow-indicator {
      transform: translate(3px, -3px);
      color: ${({ theme }) => theme.colors.accentFrom};
    }

    .contact-value {
      color: rgba(255, 255, 255, 0.85);
    }
  }
`;

const LegalBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 2rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.45);

  @media (min-width: 640px) {
    flex-direction: row;
  }

  .founder-tag {
    color: ${({ theme }) => theme.colors.accentFrom};
  }
`;

const Watermark = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: -2.5rem;
  z-index: 0;
  text-align: center;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
  line-height: 1;
  font-size: clamp(15rem, 25vw, 26rem);
  color: rgba(255, 255, 255, 0.04);
  white-space: nowrap;
  letter-spacing: -0.04em;
`;

const CONTACT_CHANNELS = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    value: '+91 705-173-2616',
    link: 'https://wa.me/917051732616',
    icon: WhatsAppIcon,
    label: 'Instant Messaging',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: '/in/umarnazir',
    link: personalInfo.socials.linkedin,
    icon: LinkedInIcon,
    label: 'Professional Network',
  },
  {
    id: 'github',
    title: 'GitHub',
    value: '@umarnaxir',
    link: personalInfo.socials.github,
    icon: GitHubIcon,
    label: 'Open Source & Repos',
  },
  {
    id: 'email',
    title: 'Email',
    value: personalInfo.email,
    link: personalInfo.socials.email,
    icon: MailIcon,
    label: 'Direct Inquiry',
  },
  {
    id: 'phone',
    title: 'Phone',
    value: personalInfo.phone,
    link: personalInfo.socials.phone,
    icon: PhoneIcon,
    label: 'Voice & Consult',
  },
];

export function Footer() {
  const { openModal } = useScroll();

  return (
    <FooterWrapper id="contact">
      <FooterShell>
        {/* Widened CTA Section */}
        <CtaRow>
          <CtaTextWrap>
            <CtaEyebrow>Start A Collaboration</CtaEyebrow>
            <FooterH2>
              Have a project in mind? Let&apos;s build it <span className="accent-word">together.</span>
            </FooterH2>
          </CtaTextWrap>

          <CtaButtonCol>
            <PillButton variant="light" arrow="up-right" onClick={openModal}>
              Start a project
            </PillButton>
          </CtaButtonCol>
        </CtaRow>

        {/* Simplified 5-Channel Contact Section */}
        <ContactSection>
          <ContactSectionHeader>
            <div className="heading-block">
              <h3>Direct Channels</h3>
              <p>Reach out directly across any of these verified communication channels.</p>
            </div>
          </ContactSectionHeader>

          <ContactGrid>
            {CONTACT_CHANNELS.map((item) => {
              const IconComp = item.icon;
              return (
                <ContactCard
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.title}
                >
                  <div className="icon-row">
                    <div className="icon-box">
                      <IconComp size="1.25rem" />
                    </div>
                    <span className="arrow-indicator">
                      <ArrowUpRight size="1.1rem" />
                    </span>
                  </div>

                  <div className="info-block">
                    <span className="contact-title">{item.title}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                </ContactCard>
              );
            })}
          </ContactGrid>
        </ContactSection>

        {/* Clean Legal & Copyright */}
        <LegalBar>
          <div>
            © {new Date().getFullYear()} Umar Nazir • <span className="founder-tag">Software Engineer &amp; SEO Executive</span>
          </div>
          <div>Baramulla / Srinagar • Global Client Engagements</div>
        </LegalBar>
      </FooterShell>

      <Watermark aria-hidden="true">UMAR</Watermark>
    </FooterWrapper>
  );
}