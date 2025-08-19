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
    "Explore the professional portfolio of Umar Nazir – a software Engineer and SEO Executive with expertise in React, Next.js, Tailwind CSS, digital marketing, and graphic design.",
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "K5WPaPu_n40Lp7BlSC2vph3oTrM3QzSlCbkCSZpA2iE", //Search Console verification
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*Google Analytics */}
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
