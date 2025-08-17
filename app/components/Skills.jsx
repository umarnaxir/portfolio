'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Search, 
  Globe,
  Trophy
} from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { 
          name: 'HTML5', 
          svg: (
            <svg viewBox="0 0 256 361" className="w-full h-full">
              <path fill="#E34F26" d="M61.21 0h193.58L230.07 310.45L127.57 342L25.08 310.45L0 0h61.21z"/>
              <path fill="#EF652A" d="M128 337.95l83.49-23.15 19.64-220.02H128v243.17z"/>
              <path fill="#FFF" d="M82.6 131.08h45.4v-39.15H39.5l1.2 13.48 12.3 138.14H128V204.4H85.07l-2.47-73.32z"/>
              <path fill="#FFF" d="M127.89 220.573h-40.9l2.78 31.07 38.12 10.59v-39.85z"/>
              <path fill="#FFF" d="M127.9 131.08v39.15h81.07l-1.35 15.02-11.65 130.34-68.07 18.88v-39.85l38.49-10.32 2.82-31.07H127.9v-39.15h41.65l1.35-15.02H127.9z"/>
            </svg>
          )
        },
        { 
          name: 'CSS3', 
          svg: (
            <svg viewBox="0 0 256 361" className="w-full h-full">
              <path fill="#264DE4" d="M127.844 360.088L23.662 331.166L0 70.165h255.999L232.336 331.166L127.844 360.088z"/>
              <path fill="#2965F1" d="M212.416 314.547L232.336 97.165H128V346.99L212.416 314.547z"/>
              <path fill="#FFF" d="M53.669 188.636L56.482 220.465H128V188.636H53.669z"/>
              <path fill="#FFF" d="M47.917 123.995L50.73 155.824H128V123.995H47.917z"/>
              <path fill="#FFF" d="M128 271.58L127.844 271.58L92.636 262.314L90.452 237.348H58.623L62.989 287.639L127.844 305.986L128 305.986V271.58z"/>
              <path fill="#FFF" d="M202.127 188.636L204.94 123.995H128V155.824H171.376L168.563 188.636H128V220.465H164.119L160.482 262.314L128 271.58V305.986L192.854 287.639L197.22 237.348L202.127 188.636z"/>
            </svg>
          )
        },
        { 
          name: 'JavaScript', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <path fill="#F7DF1E" d="M0 0h256v256H0z"/>
              <path fill="#000" d="M67.312 213.932L80.564 203.89c3.17 5.637 6.04 10.405 12.957 10.405 6.613 0 10.808-2.58 10.808-12.652V124.67h16.697v77.012c0 20.852-12.214 30.345-30.014 30.345-16.096 0-25.4-8.333-30.203-18.365z"/>
              <path fill="#000" d="M152.381 211.354l13.252-7.68c3.486 5.69 8.020 9.855 16.096 9.855 6.765 0 11.105-3.386 11.105-8.02 0-5.573-4.441-7.544-11.943-10.783l-4.101-1.758c-11.943-5.087-19.844-11.464-19.844-24.945 0-12.406 9.447-21.852 24.181-21.852 10.505 0 18.054 3.659 23.497 13.252l-12.871 8.275c-2.835-5.087-5.898-7.085-10.626-7.085-4.83 0-7.895 3.05-7.895 7.085 0 4.981 3.05 6.979 10.09 10.065l4.1 1.758c14.07 6.034 21.971 12.157 21.971 25.94 0 14.888-11.691 23.092-27.404 23.092-15.35 0-25.288-7.315-30.117-16.934z"/>
            </svg>
          )
        },
        { 
          name: 'React', 
          svg: (
            <svg viewBox="0 0 256 228" className="w-full h-full">
              <path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488C239.749 145.347 256 129.263 256 113.668c0-15.323-16.714-29.97-45.517-39.844z"/>
              <ellipse cx="128" cy="114" rx="85" ry="37" fill="none" stroke="#FFF" strokeWidth="6"/>
              <ellipse cx="128" cy="114" rx="85" ry="37" fill="none" stroke="#FFF" strokeWidth="6" transform="rotate(60 128 114)"/>
              <ellipse cx="128" cy="114" rx="85" ry="37" fill="none" stroke="#FFF" strokeWidth="6" transform="rotate(-60 128 114)"/>
              <circle cx="128" cy="114" r="6" fill="#FFF"/>
            </svg>
          )
        },
        { 
          name: 'Next.js', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <defs>
                <linearGradient id="nextGrad" x1="55%" x2="83%" y1="56%" y2="96%">
                  <stop offset="0%" stopColor="#000"/>
                  <stop offset="100%" stopColor="#000"/>
                </linearGradient>
              </defs>
              <circle cx="128" cy="128" r="128" fill="url(#nextGrad)"/>
              <path fill="#FFF" d="M106.7 103.5h6.7l29.4 43.7 33.4-43.7H190l-42.1 54.2 45.4 60.8h-13.6l-37.9-50.7-37.9 50.7H90.3l45.4-60.8-29-54.2z"/>
            </svg>
          )
        },
        { 
          name: 'TypeScript', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#3178C6" rx="28"/>
              <path fill="#FFF" d="M56.611 128.85V111.61h70.623v17.24H139.6V217h-22.65V128.85H56.61zm109.264-10.73c6.15.2 11.85 2.05 17.1 5.55 5.25 3.5 8.7 8.35 10.35 14.55.55 2.05.8 5.25.75 9.6-.05 4.35-.05 17.5-.05 17.5H210.65s.05-12.8.05-17.15c0-2.55-.1-4.5-.3-5.85-.5-3.45-2-5.85-4.5-7.2-2.5-1.35-5.95-2.05-10.35-2.05-2.9 0-5.65.4-8.25 1.2-2.6.8-4.85 2-6.75 3.6-1.9 1.6-3.35 3.65-4.35 6.15-1 2.5-1.5 5.45-1.5 8.85v40.9h-20.9v-69.25h20.9v8.4c1.8-3 4.25-5.4 7.35-7.2 3.1-1.8 6.9-2.75 11.4-2.85z"/>
            </svg>
          )
        }
      ]
    },
    frameworks: {
      title: 'CSS Frameworks',
      icon: Palette,
      skills: [
        { 
          name: 'Tailwind CSS', 
          svg: (
            <svg viewBox="0 0 256 154" className="w-full h-full">
              <defs>
                <linearGradient id="tailwindGrad" x1="-2.778%" x2="100%" y1="32%" y2="67.556%">
                  <stop offset="0%" stopColor="#2298bd"/>
                  <stop offset="100%" stopColor="#0ed7b5"/>
                </linearGradient>
              </defs>
              <path fill="url(#tailwindGrad)" d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z"/>
            </svg>
          )
        },
        { 
          name: 'Bootstrap', 
          svg: (
            <svg viewBox="0 0 256 204" className="w-full h-full">
              <path fill="#7E13F8" d="M53.172 0C23.83 0 0 23.83 0 53.172v97.656C0 180.17 23.83 204 53.172 204h149.656c29.342 0 53.172-23.83 53.172-53.172V53.172C256 23.83 232.17 0 202.828 0H53.172z"/>
              <path fill="#FFF" d="M75 58h42.5c19.33 0 35 15.67 35 35s-15.67 35-35 35H75V58zm0 88h42.5c19.33 0 35 15.67 35 35s-15.67 35-35 35H75v-70z"/>
            </svg>
          )
        },
        { 
          name: 'Sass', 
          svg: (
            <svg viewBox="0 0 256 192" className="w-full h-full">
              <path fill="#CF649A" d="M220.281 126.146c-14.784 0-27.5 3.657-38.25 11.657-2.657-5.243-5.343-9.843-5.843-13.257-5.5-37.5-36.5-67.5-74-67.5s-67.5 30-67.5 67.5c0 33 24.843 60.343 58.343 65.843 6.343 1.043 12.843 1.5 19.5 1.5 35.157 0 63.5-17.5 63.5-52.5 0-20.5-11.343-37.5-28.5-46 3.657-6.5 8.343-12 14.343-16 10.5-7 23.343-10.5 37.5-10.5 2.843 0 5.657.157 8.407.5z"/>
              <circle cx="128" cy="96" r="32" fill="#FFF"/>
            </svg>
          )
        },
        { 
          name: 'Styled Components', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <defs>
                <linearGradient id="styledGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#db7093"/>
                  <stop offset="100%" stopColor="#d63384"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill="url(#styledGrad)" rx="28"/>
              <path fill="#FFF" d="M128 32c53.02 0 96 42.98 96 96s-42.98 96-96 96-96-42.98-96-96 42.98-96 96-96zm0 16c-44.18 0-80 35.82-80 80s35.82 80 80 80 80-35.82 80-80-35.82-80-80-80z"/>
              <path fill="#FFF" d="M96 96h64v16H96zm0 24h64v16H96zm0 24h40v16H96z"/>
              <circle cx="176" cy="80" r="8" fill="#FFF"/>
              <circle cx="200" cy="80" r="8" fill="#FFF"/>
              <circle cx="224" cy="80" r="8" fill="#FFF"/>
            </svg>
          )
        }
      ]
    },
    seo: {
      title: 'SEO & Marketing',
      icon: Search,
      skills: [
        { 
          name: 'Google Analytics', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <path fill="#F9AB00" d="M128 0L73 80h110L128 0z"/>
              <circle cx="64" cy="192" r="64" fill="#E37400"/>
              <circle cx="192" cy="160" r="64" fill="#4285F4"/>
              <path fill="#34A853" d="M128 256c35.35 0 64-28.65 64-64V80H64l64 176z"/>
            </svg>
          )
        },
        { 
          name: 'Google Search Console', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#4285F4" rx="28"/>
              <path fill="#FFF" d="M64 64h128v32H64zm0 48h96v16H64zm0 32h128v16H64zm0 32h80v16H64z"/>
              <circle cx="208" cy="208" r="24" fill="#34A853"/>
              <path fill="#FFF" d="M200 208l8-8 16 16-8 8z"/>
            </svg>
          )
        },
        { 
          name: 'SEO Tools', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#FF6B35" rx="28"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="#FFF" strokeWidth="8"/>
              <path fill="#FFF" d="M140 140l40 40-16 16-40-40z"/>
              <path fill="#FFF" d="M80 80h40v8H80zm0 16h32v8H80zm0 16h40v8H80z"/>
            </svg>
          )
        },
        { 
          name: 'Social Media Marketing', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <defs>
                <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#405DE6"/>
                  <stop offset="25%" stopColor="#5851DB"/>
                  <stop offset="50%" stopColor="#833AB4"/>
                  <stop offset="75%" stopColor="#C13584"/>
                  <stop offset="100%" stopColor="#E1306C"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill="url(#socialGrad)" rx="55"/>
              <circle cx="128" cy="128" r="52" fill="none" stroke="#FFF" strokeWidth="16"/>
              <circle cx="180" cy="76" r="16" fill="#FFF"/>
            </svg>
          )
        }
      ]
    },
    design: {
      title: 'Design & Creative',
      icon: Palette,
      skills: [
        { 
          name: 'Figma', 
          svg: (
            <svg viewBox="0 0 256 384" className="w-full h-full">
              <path fill="#0ACF83" d="M64 384c35.3 0 64-28.7 64-64v-64H64c-35.3 0-64 28.7-64 64s28.7 64 64 64z"/>
              <path fill="#A259FF" d="M0 192c0-35.3 28.7-64 64-64h64v128H64c-35.3 0-64-28.7-64-64z"/>
              <path fill="#F24E1E" d="M0 64C0 28.7 28.7 0 64 0h64v128H64C28.7 128 0 99.3 0 64z"/>
              <path fill="#FF7262" d="M128 0h64c35.3 0 64 28.7 64 64s-28.7 64-64 64h-64V0z"/>
              <path fill="#1ABCFE" d="M256 192c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64z"/>
            </svg>
          )
        },
        { 
          name: 'Canva', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <defs>
                <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C4CC"/>
                  <stop offset="100%" stopColor="#7B68EE"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill="url(#canvaGrad)" rx="28"/>
              <path fill="#FFF" d="M128 32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm48 80c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16 16 7.2 16 16zm-32 64c-17.7 0-32-14.3-32-32s14.3-32 32-32c8.8 0 16 7.2 16 16s-7.2 16-16 16c-8.8 0-16 7.2-16 16s7.2 16 16 16z"/>
            </svg>
          )
        },
        { 
          name: 'Adobe Creative Suite', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#FF0000" rx="28"/>
              <path fill="#FFF" d="M64 64h32l64 128h-32l-16-32H80l-16 32H32L64 64zm16 32l-16 32h32l-16-32z"/>
              <path fill="#FFF" d="M160 64h32c26.5 0 48 21.5 48 48s-21.5 48-48 48h-16v32h-16V64zm16 16v64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32h-16z"/>
            </svg>
          )
        },
        { 
          name: 'Brand Design', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <defs>
                <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1"/>
                  <stop offset="100%" stopColor="#8B5CF6"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill="url(#brandGrad)" rx="28"/>
              <circle cx="128" cy="80" r="24" fill="#FFF"/>
              <rect x="88" y="120" width="80" height="16" rx="8" fill="#FFF"/>
              <rect x="96" y="152" width="64" height="12" rx="6" fill="#FFF"/>
              <rect x="104" y="176" width="48" height="12" rx="6" fill="#FFF"/>
              <path fill="#FFF" d="M64 208h128v32H64z"/>
            </svg>
          )
        }
      ]
    },
    cms: {
      title: 'CMS & Platforms',
      icon: Globe,
      skills: [
        { 
          name: 'WordPress', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <circle cx="128" cy="128" r="128" fill="#21759B"/>
              <circle cx="128" cy="128" r="96" fill="none" stroke="#FFF" strokeWidth="16"/>
              <path fill="#FFF" d="M128 32c-53.02 0-96 42.98-96 96 0 42.07 27.04 77.78 64.76 90.86L58.89 130.46c-2.87-8.07-4.53-16.67-4.53-25.63 0-26.51 21.49-48 48-48 8.96 0 17.56 2.45 24.87 6.7l14.96 42.13L128 32z"/>
              <path fill="#FFF" d="M128 224c42.07 0 77.78-27.04 90.86-64.76L130.46 197.11c-8.07 2.87-16.67 4.53-25.63 4.53-26.51 0-48-21.49-48-48 0-8.96 2.45-17.56 6.7-24.87l42.13-14.96L128 224z"/>
              <circle cx="128" cy="128" r="16" fill="#FFF"/>
            </svg>
          )
        },
        { 
          name: 'Shopify', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#96BF48" rx="28"/>
              <path fill="#FFF" d="M128 32c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48s48-21.5 48-48V80c0-26.5-21.5-48-48-48zm32 48v32h-64V80c0-17.7 14.3-32 32-32s32 14.3 32 32zm-64 48h64v48c0 17.7-14.3 32-32 32s-32-14.3-32-32v-48z"/>
            </svg>
          )
        },
        { 
          name: 'Webflow', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#4353FF" rx="28"/>
              <path fill="#FFF" d="M64 80c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V80zm32 16v64h64V96h-64zm16 16h32v32h-32v-32z"/>
            </svg>
          )
        },
        { 
          name: 'Strapi', 
          svg: (
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="#4945FF" rx="28"/>
              <path fill="#FFF" d="M64 64h64v64H64V64zm0 128h64v64H64v-64zm128-128h64v64h-64V64z"/>
              <path fill="#FFF" d="M128 128h64v64h-64z" opacity="0.7"/>
            </svg>
          )
        }
      ]
    }
  };

  const SkillCard = ({ skill, index }) => (
    <div 
      className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center text-center"
      style={{
        animationDelay: `${index * 100}ms`,
        minHeight: '120px',
        animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}
    >
      <div className="w-12 h-12 mb-3 md:w-14 md:h-14">
        {skill.svg}
      </div>
      <h4 className="font-bold text-black text-sm md:text-base">
        {skill.name}
      </h4>
    </div>
  );

  const CategoryButton = ({ category, categoryData, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`rounded-xl font-semibold px-3 py-2 flex items-center gap-2 text-sm md:text-base ${
        isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
      } shadow-md`}
    >
      <categoryData.icon className="w-4 h-4 md:w-5 md:h-5" />
      <span>{categoryData.title}</span>
    </button>
  );

  const currentCategory = skillCategories[activeCategory];

  return (
    <section id="skills" className="min-h-screen py-12 px-4 bg-gradient-to-b from-blue-100 to-green-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            My Skills
          </h2>
          <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
            Explore my technical expertise through vibrant technology showcases
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(skillCategories).map(([category, categoryData]) => (
            <CategoryButton 
              key={category}
              category={category}
              categoryData={categoryData}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-xl p-4 shadow-md">
            <currentCategory.icon className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl md:text-2xl font-bold text-black">
              {currentCategory.title}
            </h3>
          </div>
        </div>

        <div 
          className={`grid gap-4 mb-12 ${
            currentCategory.skills.length === 6 ? 'grid-cols-1 mobile:grid-cols-3 md:grid-cols-3' :
            currentCategory.skills.length === 4 ? 'grid-cols-1 mobile:grid-cols-2 md:grid-cols-2' :
            'grid-cols-1 mobile:grid-cols-2 md:grid-cols-3'
          }`}
          data-skill-count={currentCategory.skills.length}
        >
          {currentCategory.skills.map((skill, index) => (
            <SkillCard 
              key={`${activeCategory}-${skill.name}`} 
              skill={skill} 
              index={index}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-green-500" />
            <h3 className="text-xl md:text-2xl font-bold text-black">
              Frontend Developer Expertise
            </h3>
            <Trophy className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-base md:text-lg text-black max-w-3xl mx-auto mb-6">
            Specialized in creating modern, responsive web applications with a focus on user experience and performance optimization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: '50+ Projects Completed' },
              { label: '2+ Years Experience' },
              { label: 'Modern Tech Stack' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-blue-100 text-black rounded-full font-semibold px-4 py-2 text-sm"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom breakpoint for mobile (320px to 767px) */
        @media screen and (min-width: 320px) and (max-width: 767px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .grid[data-skill-count="4"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          /* Adjust card content for smaller size */
          .grid > div {
            min-height: 100px !important;
            padding: 0.75rem !important;
          }
          .grid > div > div { /* SVG container */
            width: 2.5rem !important;
            height: 2.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .grid > div > h4 { /* Skill name */
            font-size: 0.875rem !important;
          }
        }

        /* Extra-small screens */
        @media screen and (max-width: 319px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Medium and larger screens */
        @media screen and (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .grid[data-skill-count="4"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        * {
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        @supports (padding: max(0px)) {
          #skills {
            padding-top: max(48px, env(safe-area-inset-top, 48px)) !important;
            padding-bottom: max(48px, env(safe-area-inset-bottom, 48px)) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;