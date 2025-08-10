'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Mail, 
  Code, 
  Palette, 
  Brain,
  Star,
  Trophy,
  Target,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Heart
} from 'lucide-react';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  // Initialize AOS animations
  useEffect(() => {
    // AOS alternative using Intersection Observer
    const observeElements = () => {
      const elementsToAnimate = document.querySelectorAll('[data-aos]');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.getAttribute('data-aos');
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
              element.classList.add('aos-animate');
            }, parseInt(delay));
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elementsToAnimate.forEach(element => {
        observer.observe(element);
      });

      return () => {
        elementsToAnimate.forEach(element => {
          observer.unobserve(element);
        });
      };
    };

    // Add AOS styles
    const style = document.createElement('style');
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
      }
      
      [data-aos="fade-up"] {
        transform: translateY(30px);
      }
      
      [data-aos="fade-left"] {
        transform: translateX(30px);
      }
      
      [data-aos="fade-right"] {
        transform: translateX(-30px);
      }
      
      [data-aos="zoom-in"] {
        transform: scale(0.9);
      }
      
      [data-aos="flip-left"] {
        transform: perspective(2500px) rotateY(-100deg);
      }
      
      [data-aos].aos-animate[data-aos="fade-left"] {
        transform: translateX(0);
      }
      
      [data-aos].aos-animate[data-aos="fade-right"] {
        transform: translateX(0);
      }
      
      [data-aos].aos-animate[data-aos="zoom-in"] {
        transform: scale(1);
      }
      
      [data-aos].aos-animate[data-aos="flip-left"] {
        transform: perspective(2500px) rotateY(0);
      }
    `;
    document.head.appendChild(style);

    const cleanup = observeElements();
    
    return () => {
      cleanup();
      document.head.removeChild(style);
    };
  }, []);

  // Mouse movement tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const achievements = [
    { icon: Code, text: '50+', label: 'Projects', color: 'bg-blue-500' },
    { icon: Trophy, text: '2+', label: 'Years', color: 'bg-blue-600' },
    { icon: Star, text: '4+', label: 'Companies', color: 'bg-blue-700' },
    { icon: Target, text: '100%', label: 'Success', color: 'bg-blue-800' }
  ];

  const highlights = [
    { icon: GraduationCap, title: 'Education', desc: 'CSE, Gcet Kashmir' },
    { icon: Briefcase, title: 'Role', desc: 'Frontend Engineer' },
    { icon: MapPin, title: 'Location', desc: 'Baramulla, J&K' },
    { icon: Award, title: 'Focus', desc: 'Software Development' }
  ];

  return (
    <section id="about"
      ref={sectionRef}
      className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden p-4 md:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Interactive Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
            </radialGradient>
            
            <linearGradient id="dynamicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.05)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.12)" />
            </linearGradient>

            <pattern id="blueDots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="15" cy="45" r="1" fill="rgba(147, 197, 253, 0.3)" />
              <circle cx="45" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#dynamicGrad)" />
          <rect width="100%" height="100%" fill="url(#blueDots)" />
          
          {/* Dynamic floating elements */}
          <g className={`transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
            <circle 
              cx={`${25 + mousePosition.x * 15}%`} 
              cy={`${20 + mousePosition.y * 10}%`} 
              r="80" 
              fill="url(#blueGlow)"
              className="transition-all duration-1000 ease-out"
            />
            
            <circle 
              cx={`${70 + mousePosition.x * 8}%`} 
              cy={`${60 + mousePosition.y * 12}%`} 
              r="50" 
              fill="rgba(59, 130, 246, 0.08)"
              className="transition-all duration-800 ease-out"
            />
            
            <polygon 
              points={`${30 + mousePosition.x * 10},${15 + mousePosition.y * 8} ${50 + mousePosition.x * 10},${25 + mousePosition.y * 8} ${20 + mousePosition.x * 10},${40 + mousePosition.y * 8}`}
              fill="rgba(147, 197, 253, 0.12)" 
              stroke="rgba(59, 130, 246, 0.3)" 
              strokeWidth="2"
              className="transition-all duration-600 ease-out"
            />
            
            <rect 
              x={`${60 + mousePosition.x * 12}%`} 
              y={`${70 + mousePosition.y * 8}%`} 
              width="60" 
              height="60" 
              fill="rgba(59, 130, 246, 0.06)" 
              stroke="rgba(59, 130, 246, 0.25)" 
              strokeWidth="2"
              rx="10"
              transform={`rotate(${mousePosition.x * 30} ${60 + mousePosition.x * 12}% ${70 + mousePosition.y * 8}%)`}
              className="transition-all duration-900 ease-out"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Mobile First Layout - Image and Cards First */}
        <div className="block lg:hidden">
          {/* Badge */}
          <div className="inline-block mb-6" data-aos="fade-up" data-aos-delay="100">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50 hover:bg-blue-500/20 transition-all duration-300">
              <Heart className="w-4 h-4 animate-pulse text-red-500" />
              About Me
            </span>
          </div>

          {/* Profile Image - Mobile */}
          <div className="relative group mx-auto w-fit mb-6" data-aos="zoom-in" data-aos-delay="200">
            <div className="relative w-100 h-100">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-200/30 transition-all duration-700 border-4 border-blue-100/50 group-hover:border-blue-200/70">
                <img
                  src="./images/DP.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 shadow-lg border border-blue-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 shadow-lg border border-blue-100 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">
                <Palette className="w-5 h-5 text-blue-600" />
              </div>

              {/* Top Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-blue-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <Star className="w-3 h-3 text-blue-500 animate-pulse" />
                    Top Rated
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Stats - Mobile */}
          <div className="grid grid-cols-4 gap-2 mb-6" data-aos="fade-up" data-aos-delay="300">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-xl p-3 text-center hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/40 hover:-translate-y-2 transition-all duration-400 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={400 + index * 100}
              >
                <div className={`w-6 h-6 ${achievement.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-125 transition-transform duration-400`}>
                  <achievement.icon className="w-3 h-3 text-white" />
                </div>
                <div className="text-sm font-bold text-slate-900 mb-0.5">{achievement.text}</div>
                <div className="text-xs text-slate-600 font-medium">{achievement.label}</div>
                
                <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 rounded-xl transition-colors duration-400"></div>
              </div>
            ))}
          </div>

          {/* Content Cards - Mobile */}
          <div className="space-y-4 mb-6">
            <div className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-5 hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-slate-700 leading-relaxed text-sm">
                <MapPin className="inline w-4 h-4 text-blue-500 mr-2 mb-1" />
                I am from <span className="font-semibold text-slate-900 bg-blue-50/50 px-1 rounded">Baramulla, J&K, India</span>. 
                I hold a degree in Computer Science Engineering from Government College of Engineering and Technology Kashmir.
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-5 hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="600">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-slate-700 leading-relaxed text-sm">
                <Code className="inline w-4 h-4 text-blue-500 mr-2 mb-1" />
                Currently working as a <span className="font-semibold text-slate-900 bg-blue-50/50 px-1 rounded">Frontend Engineer</span>, 
                providing freelance digital solutions including Software Development and SEO optimization.
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Brain className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Compact Highlights - Mobile */}
          <div className="grid grid-cols-2 gap-3 mb-6" data-aos="fade-up" data-aos-delay="700">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm border border-blue-100/40 rounded-xl p-3 hover:bg-white/85 hover:border-blue-200/60 hover:shadow-md hover:shadow-blue-100/30 transition-all duration-400 cursor-pointer hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay={800 + index * 100}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <highlight.icon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-blue-600 mb-0.5">{highlight.title}</div>
                    <div className="text-xs text-slate-700 font-medium truncate">{highlight.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote and CTA - Mobile */}
          <div className="space-y-4">
            <div className="relative group bg-gradient-to-r from-blue-500/90 to-blue-600/90 backdrop-blur-sm rounded-2xl p-5 text-white overflow-hidden cursor-pointer hover:from-blue-600/90 hover:to-blue-700/90 transition-all duration-500" data-aos="fade-up" data-aos-delay="900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <Sparkles className="w-5 h-5 mb-3 text-blue-200 group-hover:animate-spin" />
                <blockquote className="text-sm font-medium italic leading-relaxed">
                  "Transforming ideas into exceptional digital experiences through cutting-edge technology and creative design solutions."
                </blockquote>
              </div>
            </div>

            <div className="relative group bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white text-center shadow-xl hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 cursor-pointer overflow-hidden" data-aos="fade-up" data-aos-delay="1000">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative space-y-3">
                <Mail className="w-5 h-5 mx-auto group-hover:animate-bounce text-blue-100" />
                <div>
                  <div className="text-lg font-bold mb-1">Let's Work Together</div>
                  <div className="text-blue-100 text-sm">Available for collaborations</div>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
                  <a href='#contact'><span>Get in touch</span></a>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Content Cards */}
          <div className="space-y-6">
            
            {/* Badge */}
            <div className="inline-block" data-aos="fade-right" data-aos-delay="100">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50 hover:bg-blue-500/20 transition-all duration-300">
                <Heart className="w-4 h-4 animate-pulse text-red-500" />
                About Me
              </span>
            </div>

            {/* Paragraph Cards */}
            <div className="space-y-4">
              <div className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-6 hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-slate-700 leading-relaxed">
                  <MapPin className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
                  I am from <span className="font-semibold text-slate-900 bg-blue-50/50 px-1 rounded">Baramulla, J&K, India</span>. 
                  I hold a degree in Computer Science Engineering from Government College of Engineering and Technology Kashmir.
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>

              <div className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-6 hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-slate-700 leading-relaxed">
                  <Code className="inline w-5 h-5 text-blue-500 mr-2 mb-1" />
                  Currently working as a <span className="font-semibold text-slate-900 bg-blue-50/50 px-1 rounded">Frontend Engineer</span>, 
                  providing freelance digital solutions including Software Development and SEO optimization.
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Compact Highlights - Equal alignment for desktop */}
            <div className="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="400">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm border border-blue-100/40 rounded-xl p-4 hover:bg-white/85 hover:border-blue-200/60 hover:shadow-md hover:shadow-blue-100/30 transition-all duration-400 cursor-pointer hover:-translate-y-1"
                  data-aos="flip-left"
                  data-aos-delay={500 + index * 100}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <highlight.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-blue-600 mb-0.5">{highlight.title}</div>
                      <div className="text-sm text-slate-700 font-medium truncate">{highlight.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Inspirational Quote Card */}
            <div className="relative group bg-gradient-to-r from-blue-500/90 to-blue-600/90 backdrop-blur-sm rounded-2xl p-6 text-white overflow-hidden cursor-pointer hover:from-blue-600/90 hover:to-blue-700/90 transition-all duration-500" data-aos="fade-up" data-aos-delay="600">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <Sparkles className="w-6 h-6 mb-3 text-blue-200 group-hover:animate-spin" />
                <blockquote className="text-sm font-medium italic leading-relaxed">
                  "Transforming ideas into exceptional digital experiences through cutting-edge technology and creative design solutions."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Right Side - Profile & Stats */}
          <div className="space-y-6">
            
            {/* Profile Image */}
            <div className="relative group mx-auto w-fit" data-aos="fade-left" data-aos-delay="200">
              <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-200/30 transition-all duration-700 border-4 border-blue-100/50 group-hover:border-blue-200/70">
                  <img
                    src="./images/DP.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 shadow-lg border border-blue-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" data-aos="zoom-in" data-aos-delay="400">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 shadow-lg border border-blue-100 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500" data-aos="zoom-in" data-aos-delay="500">
                  <Palette className="w-5 h-5 text-blue-600" />
                </div>

                {/* Top Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 group-hover:-translate-y-2 transition-transform duration-500" data-aos="fade-up" data-aos-delay="300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-blue-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                      <Star className="w-3 h-3 text-blue-500 animate-pulse" />
                      Top Rated
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Stats - Smaller and aligned for desktop */}
            <div className="grid grid-cols-4 gap-3" data-aos="fade-up" data-aos-delay="600">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-xl p-3 text-center hover:bg-white/90 hover:border-blue-200/70 hover:shadow-lg hover:shadow-blue-100/40 hover:-translate-y-2 transition-all duration-400 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={700 + index * 100}
                >
                  <div className={`w-6 h-6 ${achievement.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-125 transition-transform duration-400`}>
                    <achievement.icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-0.5">{achievement.text}</div>
                  <div className="text-xs text-slate-600 font-medium">{achievement.label}</div>
                  
                  <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 rounded-xl transition-colors duration-400"></div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="relative group md:py-3 md:mb-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-xl hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 cursor-pointer overflow-hidden" data-aos="fade-left" data-aos-delay="800">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative space-y-3">
                <div>
                  <div className="text-lg font-bold mb-1">Let's Work Together</div>
                  <div className="text-blue-100 text-sm">Available for collaborations</div>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
                  <a href='#contact'> <span>Get in touch</span></a>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;