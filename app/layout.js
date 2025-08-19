import { Geist, Geist_Mono } from "next/font/google";
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
    "Explore the professional portfolio of Umar Nazir – a software Engineer and SEO Executive with expertise in React, Next.js, Tailwind CSS, digital marketing, and graphic design. Discover projects, skills, and services tailored to modern web development and optimization.",
  keywords: [
    "Umar Nazir",
    "Frontend Developer",
    "React Developer",
    "SEO Expert",
    "Portfolio Website",
    "Next.js",
    "Tailwind CSS",
    "Graphic Designer",
    "Web Developer from Kashmir",
    "Digital Marketing Portfolio",
  ],
  metadataBase: new URL("https://umarnazir.vercel.app"),
  openGraph: {
    title: "Umar Nazir | Software Engineer & SEO Executive",
    description:
      "Professional portfolio showcasing Umar Nazir's work in web development, SEO, graphic design, and more.",
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
      "Professional portfolio showcasing Umar Nazir's work in web development, SEO, graphic design, and more.",
    images: ["/images/DP.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/favicon.png",
  },
  //Google Search Console verification
  verification: {
    google: "K5WPaPu_n40Lp7BlSC2vph3oTrM3QzSlCbkCSZpA2iE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
