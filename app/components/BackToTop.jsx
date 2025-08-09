"use client";
import React from 'react';

const scrollToTopSlowly = () => {
  const scrollStep = 40; // Lower is slower
  const scrollAnimation = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 0) {
      window.scrollTo(0, Math.max(currentScroll - scrollStep, 0));
      requestAnimationFrame(scrollAnimation);
    }
  };
  requestAnimationFrame(scrollAnimation);
};

const BackToTop = () => {
  return (
    <button
      onClick={scrollToTopSlowly}
      className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 z-50"
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
