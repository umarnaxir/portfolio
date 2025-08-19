import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Umar Nazir | Software Engineer & SEO Executive",
  description:
    "Portfolio of Umar Nazir, a Software Engineer & SEO Executive specializing in React, Next.js, Tailwind CSS, digital marketing, and graphic design.",
  keywords: [
    "Umar Nazir",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "SEO Expert",
    "SEO Executive",
    "Portfolio Website",
    "Next.js",
    "Tailwind CSS",
    "Graphic Designer",
    "Web Developer from Kashmir",
    "Web Developer from Jammu and Kashmir",
    "Web Developer from Baramulla",
    "Digital Marketing Portfolio",
    "Digital Marketer",
  ],
  metadataBase: new URL("https://umarnazir.vercel.app"),
  alternates: {
    canonical: "https://umarnazir.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Umar Nazir | Software Engineer & SEO Executive",
    description:
      "Professional portfolio of Umar Nazir, a Software Engineer & SEO Executive specializing in React, Next.js, Tailwind CSS, digital marketing, and graphic design.",
    url: "https://umarnazir.vercel.app",
    siteName: "Umar Nazir Portfolio",
    images: [
      {
        url: "/images/DP.jpg",
        width: 1200,
        height: 630,
        alt: "Umar Nazir Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umar Nazir | Software Engineer & SEO Executive",
    description:
      "Professional portfolio of Umar Nazir, a Software Engineer & SEO Executive specializing in React, Next.js, Tailwind CSS, digital marketing, and graphic design.",
    images: ["/images/DP.jpg"],
  },
  authors: [{ name: "Umar Nazir" }],
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "K5WPaPu_n40Lp7BlSC2vph3oTrM3QzSlCbkCSZpA2iE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JCFC319Y7Q"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCFC319Y7Q');
          `}
        </Script>

        {/* Schema.org JSON-LD for SEO */}
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Umar Nazir",
            url: "https://umarnazir.vercel.app",
            image: "https://umarnazir.vercel.app/images/DP.jpg",
            jobTitle: "Software Engineer & SEO Executive",
            sameAs: [
              "https://www.linkedin.com/in/umar-nazir19/",
              "https://github.com/umarnazir",
              "https://wa.me/qr/JXOWE54MG6HWN1",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Harmukh Technologies Pvt Ltd",
            },
            publisher: {
              "@type": "Person",
              name: "Umar Nazir",
            },
          })}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}