'use client';

import { useState, useEffect } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'EDUCATION', id: 'education' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'PROJECTS', id: 'projects' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 mt-4 rounded-3xl backdrop-blur-md py-4 ${montserrat.variable} font-sans ${
          scrolled ? "bg-white/95 shadow-lg" : "bg-black/30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold tracking-wider relative z-50">
            <span className={`space-x-5 ${scrolled ? "text-blue-700" : "text-white"}`}>UN.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative font-medium text-sm group uppercase tracking-wider ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}
                  />
                </a>
              ))}
            </div>
            
            {/* Contact Button */}
            <a
              href="#contact"
              className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-bold uppercase tracking-wider text-sm ${
                scrolled 
                  ? "bg-blue-700 hover:bg-blue-700 text-white" 
                  : "bg-white hover:bg-white text-blue-700"
              }`}
            >
              CONTACT ME
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-7 h-7 flex flex-col justify-center items-center space-y-1.5">
              <span className={`w-6 h-0.5 transition-all duration-300 transform origin-center ${
                isOpen 
                  ? 'rotate-45 translate-y-[3px] bg-blue-700' 
                  : `translate-y-0 ${scrolled ? "bg-blue-700" : "bg-white"}`
              }`}></span>
              <span className={`w-4 h-0.5 transition-all duration-300 ${
                isOpen 
                  ? 'opacity-0 bg-blue-700' 
                  : `opacity-100 ${scrolled ? "bg-blue-700" : "bg-white"}`
              }`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 transform origin-center ${
                isOpen 
                  ? '-rotate-45 translate-y-[-3px] bg-blue-700' 
                  : `translate-y-0 ${scrolled ? "bg-blue-700" : "bg-white"}`
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-full bg-blue-700 z-30 md:hidden flex flex-col transition-all duration-500 ease-in-out">
          <div className="flex flex-col items-start justify-center h-full px-6">
            <div className="flex flex-col items-start space-y-8 py-8 w-full">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-medium uppercase tracking-wider transform hover:scale-105 hover:text-blue-200 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </a>
              ))}
              {/* <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl font-medium uppercase tracking-wider transform hover:scale-105 hover:text-blue-200 transition-all duration-300"
                style={{
                  animationDelay: `${navItems.length * 100}ms`,
                  animation: isOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
                }}
              >
                CONTACT
              </a> */}
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-3 mt-6" style={{
                animationDelay: `${(navItems.length + 1) * 100}ms`,
                animation: isOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
              }}>
                {/* GitHub */}
                <a
                  href="https://github.com/umarnaxir"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-black"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 
                    0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756
                    -1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 
                    1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605
                    -2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22
                    -.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23
                    a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 
                    2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176 
                    .77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 
                    .43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 
                    0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12 
                    c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/umar-nazir19/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#0077B5]"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 
                      2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 
                      0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 
                      3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45
                      -.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 
                      3.2v7H10.5V8.75z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/umar_naxir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#E1306C]"
                  >
                    <path d="M7.75 2A5.75 5.75 0 0 0 2 
                      7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 
                      22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 
                      7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 
                      0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 
                      3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 
                      7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 
                      1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 
                      2 1 1 0 0 0 0-2z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/qr/JXOWE54MG6HWN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-[#25D366]"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0 0 
                      12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 
                      1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 
                      24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48
                      -8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34
                      -.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 
                      1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 
                      9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27
                      -.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14
                      -.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07
                      -.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32
                      -1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13
                      -.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05
                      -.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22
                      -.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01
                      -.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 
                      0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 
                      3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 
                      1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23
                      -1.15.16-1.27-.07-.12-.25-.19-.52-.34z"/>
                  </svg>
                </a>
              </div>
              
              {/* Contact Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white px-10 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-bold uppercase tracking-wider mt-6"
                style={{
                  animationDelay: '700ms',
                  animation: isOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
                }}
              >
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}