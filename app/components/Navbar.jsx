'use client';

import { useState, useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import { Sparkles, Rocket, Heart, Coffee, Code, Zap, Phone, Mail } from 'lucide-react';

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
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
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
    
    // Cleanup function to reset body styles when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 mt-4 rounded-3xl backdrop-blur-md py-2 ${montserrat.variable} font-sans ${
          scrolled ? "bg-white/95 shadow-lg" : "bg-black/30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo - Updated with image */}
          <div className="relative z-50">
            <img 
              src="/fevicon.png" 
              alt="Logo" 
              className="w-15 h-15 rounded-full object-cover transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
            />
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
                  ? "bg-black hover:bg-black text-white" 
                  : "bg-white hover:bg-white text-black"
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
                  ? scrolled 
                    ? 'rotate-45 translate-y-[3px] bg-black' 
                    : 'rotate-45 translate-y-[3px] bg-white'
                  : scrolled 
                    ? "translate-y-0 bg-black" 
                    : "translate-y-0 bg-white"
              }`}></span>
              <span className={`w-4 h-0.5 transition-all duration-300 ${
                isOpen 
                  ? scrolled 
                    ? 'opacity-0 bg-black' 
                    : 'opacity-0 bg-white'
                  : scrolled 
                    ? "opacity-100 bg-black" 
                    : "opacity-100 bg-white"
              }`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 transform origin-center ${
                isOpen 
                  ? scrolled 
                    ? '-rotate-45 translate-y-[-3px] bg-black' 
                    : '-rotate-45 translate-y-[-3px] bg-white'
                  : scrolled 
                    ? "translate-y-0 bg-black" 
                    : "translate-y-0 bg-white"
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-30 md:hidden flex flex-col transition-all duration-500 ease-in-out overflow-hidden"
             style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Background with overlay and image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/comming.png')`
            }}
          />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-particles">
              <Sparkles className="absolute top-20 left-10 w-4 h-4 text-white/40 animate-pulse" />
              <Zap className="absolute top-32 right-16 w-5 h-5 text-yellow-300/60 animate-bounce" />
              <Heart className="absolute top-48 left-20 w-4 h-4 text-pink-300/50 animate-pulse" />
              <Code className="absolute bottom-64 right-12 w-5 h-5 text-purple-300/60 animate-pulse" />
              <Coffee className="absolute bottom-80 left-14 w-4 h-4 text-orange-300/50 animate-bounce" />
              <Rocket className="absolute top-64 right-20 w-4 h-4 text-blue-300/60 animate-pulse" />
            </div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-4 min-h-screen">
            
            {/* Header Section */}
            <div 
              className="text-center"
              style={{
                animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              {/* <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Welcome to My World
              </h2> */}
              {/* <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div> */}
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-center"
                  style={{
                    animationDelay: `${(index + 1) * 150}ms`,
                    animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => {
                      setIsOpen(false);
                      // Reset body scroll when navigating
                      document.body.style.overflow = '';
                      document.body.style.position = '';
                      document.body.style.width = '';
                    }}
                    className="w-full text-center bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl px-4 py-3 text-white font-semibold text-sm uppercase tracking-wider transform hover:scale-110 hover:bg-white/25 hover:border-white/40 transition-all duration-400 shadow-lg hover:shadow-2xl hover:rotate-1 active:scale-95"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span>{item.label}</span>
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Action Buttons Grid */}
            <div 
              className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8"
              style={{
                animationDelay: '1000ms',
                animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              <a
                href="#contact"
                onClick={() => {
                  setIsOpen(false);
                  // Reset body scroll when navigating
                  document.body.style.overflow = '';
                  document.body.style.position = '';
                  document.body.style.width = '';
                }}
                className="text-center bg-gradient-to-r from-white to-gray-100 text-blue-700 hover:from-blue-50 hover:to-white px-4 py-4 rounded-2xl transition-all duration-400 transform hover:scale-110 hover:-rotate-1 shadow-lg hover:shadow-2xl font-bold uppercase tracking-wider text-sm active:scale-95"
              >
                <Heart className="w-5 h-5 mx-auto mb-1" />
                CONTACT ME
              </a>
              <a
                href="/cv/Umar Nazir.pdf"
                download
                onClick={() => {
                  setIsOpen(false);
                  // Reset body scroll when navigating
                  document.body.style.overflow = '';
                  document.body.style.position = '';
                  document.body.style.width = '';
                }}
                className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-600 px-4 py-4 rounded-2xl transition-all duration-400 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-2xl font-bold uppercase tracking-wider text-sm active:scale-95"
              >
                <Rocket className="w-5 h-5 mx-auto mb-1" />
                DOWNLOAD CV
              </a>
            </div>

            {/* Contact Information */}
            <div 
              className="text-center mb-8 space-y-3"
              style={{
                animationDelay: '1200ms',
                animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-20 py-4">
                <p className="text-white/90 text-sm font-medium mb-2 flex items-center justify-center">
                  <Coffee className="w-4 h-4 mr-2" />
                  Get In Touch
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:+917051732616" 
                    className=" text-white hover:text-yellow-300 transition-colors duration-300 text-sm font-mono flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +91 705-173-2616
                  </a>
                  <a 
                    href="mailto:erumarnazir@gmail.com" 
                    className=" text-white hover:text-yellow-300 transition-colors duration-300 text-sm font-mono flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    erumarnazir@gmail.com
                  </a>
                </div>
              </div>
            </div>
              
            {/* Social Media Icons */}
            <div 
              className="flex items-center gap-3 mb-8" 
              style={{
                animationDelay: '1400ms',
                animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              <a
                href="https://github.com/umarnaxir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center hover:bg-white/25 hover:border-white/40 transition-all duration-400 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/umar-nazir19/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center hover:bg-white/25 hover:border-white/40 transition-all duration-400 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2v7H10.5V8.75z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/umar_naxir/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center hover:bg-white/25 hover:border-white/40 transition-all duration-400 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/qr/JXOWE54MG6HWN1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center hover:bg-white/25 hover:border-white/40 transition-all duration-400 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48-8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34-.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13-.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05-.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22-.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01-.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.19-.52-.34z"/>
                </svg>
              </a>
            </div>

            {/* Animated Footer Note */}
            <div 
              className="text-center space-y-2"
              style={{
                animationDelay: '1600ms',
                animation: isOpen ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Fully Animated Experience</span>
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <p className="text-white/70 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Have an idea? Let's create something amazing together! 
                <span className="inline-block animate-bounce ml-1">✨</span>
              </p>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .floating-particles {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
}