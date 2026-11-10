import type { Metadata, Viewport } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { AppClientShell } from '@/components/providers/AppClientShell';

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Umar Nazir | Software Engineer & SEO Executive',
  description:
    'Personal portfolio of Umar Nazir, Lead Engineer at Vipthra Technologies and Founder & CEO of NexGen Developers. 3+ years experience engineering scalable web applications, cross-platform mobile apps, and technical SEO architectures.',
  keywords: [
    'Umar Nazir',
    'Software Engineer',
    'Full-Stack Developer',
    'SEO Executive',
    'NexGen Developers',
    'Vipthra Technologies',
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Kashmir Developer',
  ],
  authors: [{ name: 'Umar Nazir', url: 'https://umarnazir.vercel.app' }],
  creator: 'Umar Nazir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umarnazir.vercel.app',
    title: 'Umar Nazir | Software Engineer & SEO Executive',
    description:
      'Explore projects, engineering experience, and technical capabilities of Umar Nazir.',
    siteName: 'Umar Nazir Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umar Nazir | Software Engineer & SEO Executive',
    description:
      'Lead Engineer at Vipthra Technologies & Founder/CEO at NexGen Developers.',
    creator: '@umr_nazir',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Syne:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='%23b15f2c'%3E%3Cpath d='M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z'/%3E%3C/svg%3E"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppClientShell>{children}</AppClientShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
