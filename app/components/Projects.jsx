'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Heart,
  Code,
  Plane,
  Truck,
  Zap,
  Globe,
  Building,
  Briefcase,
  Hotel,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Pause,
  ArrowRight,
  Eye
} from 'lucide-react';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Kindness Towards Humanity',
      description: 'A compassionate platform dedicated to humanitarian causes and social welfare initiatives.',
      url: 'https://kindnesstowardshumanity.in/',
      icon: Heart,
      category: 'Social Impact',
      image: '/images/kindness.png',
      status: 'Live'
    },
    {
      id: 2,
      title: 'Ninemash',
      description: 'Premium travel and tourism platform offering curated travel experiences.',
      url: 'https://ninemash.com/',
      icon: MapPin,
      category: 'Travel & Tourism',
      image: '/images/ninemash.png',
      status: 'Live'
    },
    {
      id: 3,
      title: 'Kashmir Tickets',
      description: 'Ultimate Kashmir tourism platform with seamless ticket reservations.',
      url: 'https://kashmirtickets.com/',
      icon: Plane,
      category: 'Travel & Tourism',
      image: '/images/kashmirtickets.png',
      status: 'Live'
    },
    {
      id: 4,
      title: 'The Hotel Sea View',
      description: 'Luxury beachfront hotel with breathtaking sea views and hospitality services.',
      url: 'https://thehotelseaview.in/',
      icon: Hotel,
      category: 'Hospitality',
      image: '/images/hotel.png',
      status: 'Live'
    },
    {
      id: 5,
      title: 'Elite Express Delivery',
      description: 'Premium courier service with lightning-fast delivery and logistics management.',
      url: 'https://eliteexpressdeliveryservices.com/',
      icon: Truck,
      category: 'Logistics',
      image: '/images/elite.png',
      status: 'Live'
    },
    {
      id: 6,
      title: 'Rush Expedited Courier',
      description: 'Lightning-fast courier services with same-day delivery and tracking systems.',
      url: 'https://re-courier.com/',
      icon: Zap,
      category: 'Logistics',
      image: '/images/recourer.png',
      status: 'Live'
    },
    {
      id: 7,
      title: 'Altaf Hospital',
      description: 'Advanced healthcare management system with digital patient records.',
      url: 'https://altafhospital.com/',
      icon: Building,
      category: 'Healthcare',
      image: '/images/altafhospital.png',
      status: 'Live'
    },
    {
      id: 8,
      title: 'Digitlia',
      description: 'Full-service digital marketing agency delivering innovative online solutions.',
      url: 'https://digitlia.com/',
      icon: Globe,
      category: 'Digital Marketing',
      image: '/images/harmukh.png',
      status: 'Live'
    },
    {
      id: 9,
      title: 'Office Management Pro',
      description: 'Next-generation office management solution with AI-powered automation.',
      url: '#',
      icon: Briefcase,
      category: 'Business Software',
      image: '/images/comming.png',
      status: 'Coming Soon'
    },
  ];

  // Mouse movement tracking for interactive effects
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

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  const scrollToProject = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 280 : 250;
      const gap = 20;
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    scrollToProject(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    scrollToProject(prevIndex);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative h-[60vh] bg-purple-100 overflow-hidden"
    >
      {/* Enhanced visible blue line graphics background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic animated lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
          
          {/* Grid pattern */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Animated diagonal lines */}
          <g className="opacity-60">
            <line 
              x1="0" y1="0" 
              x2="100%" y2="50%" 
              stroke="url(#lineGradient)" 
              strokeWidth="2"
              className="animate-pulse"
              style={{
                transform: `translateX(${mousePosition.x * 20}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            <line 
              x1="20%" y1="0" 
              x2="100%" y2="80%" 
              stroke="rgba(59, 130, 246, 0.2)" 
              strokeWidth="1"
              style={{
                transform: `translateX(${-mousePosition.x * 15}px)`,
                transition: 'transform 0.4s ease-out'
              }}
            />
            <line 
              x1="0" y1="70%" 
              x2="80%" y2="0" 
              stroke="rgba(59, 130, 246, 0.15)" 
              strokeWidth="1.5"
              style={{
                transform: `translateY(${mousePosition.y * 10}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            />
          </g>
          
          {/* Flowing curves */}
          <path 
            d={`M 0,${100 + mousePosition.y * 50} Q 300,${150 + mousePosition.x * 30} 600,${80 + mousePosition.y * 40} T 100%,${120 + mousePosition.x * 20}`}
            fill="none" 
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="2"
            className="transition-all duration-700 ease-out"
          />
          <path 
            d={`M 0,${200 + mousePosition.x * 40} Q 400,${100 + mousePosition.y * 50} 800,${180 + mousePosition.x * 30} T 100%,${140 + mousePosition.y * 25}`}
            fill="none" 
            stroke="rgba(59, 130, 246, 0.08)" 
            strokeWidth="1.5"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Floating geometric elements */}
        <div 
          className="absolute w-20 h-20 border-2 border-blue-500/20 rounded-full animate-spin"
          style={{
            top: '20%',
            right: `${20 + mousePosition.x * 10}%`,
            animationDuration: '20s',
            transform: `scale(${1 + mousePosition.y * 0.2})`
          }}
        />
        <div 
          className="absolute w-12 h-12 bg-blue-500/10 rotate-45 animate-pulse"
          style={{
            bottom: '30%',
            left: `${15 + mousePosition.x * 15}%`,
            transform: `rotate(${45 + mousePosition.x * 20}deg) scale(${1 + mousePosition.y * 0.3})`
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Compact header */}
        <div className="text-center py-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
            Explore my innovative digital solutions crafted with precision
          </p>
        </div>

        {/* Control panel */}
        <div className="flex items-center justify-between md:px-26 mb-4 px-6">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAutoPlay ? 'Pause' : 'Play'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Projects carousel - flex-1 to fill remaining space */}
        <div className="flex-1 px-6 md:px-26">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5 h-full pb-4"
            style={{ scrollBehavior: 'smooth' }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isActive = currentIndex === index;
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={project.id}
                  className={`group relative flex-shrink-0 snap-center w-64 md:w-72 cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => scrollToProject(index)}
                >
                  <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border h-full ${
                    isActive ? 'border-blue-200 shadow-blue-500/20' : 'border-slate-100'
                  }`}>
                    
                    {/* Image section */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isHovered ? 'scale-110' : ''
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          project.status === 'Live' 
                            ? 'bg-green-100/90 text-green-700' 
                            : 'bg-amber-100/90 text-amber-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'Live' ? 'bg-green-500' : 'bg-amber-500'
                          }`} />
                          {project.status}
                        </span>
                      </div>

                      {/* Icon overlay */}
                      <div className="absolute top-3 right-3">
                        <div className={`p-2 bg-white/80 backdrop-blur-sm rounded-lg transition-all duration-300 ${
                          isHovered ? 'scale-110 rotate-12' : ''
                        }`}>
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className={`absolute inset-0 bg-blue-600/80 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <Eye className="w-6 h-6 text-white animate-pulse" />
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-2 leading-tight line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Action button */}
                      {project.url !== '#' ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-all duration-300 justify-center mt-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View Project</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-500 rounded-lg text-xs font-medium justify-center cursor-not-allowed mt-auto">
                          <span>Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center py-4 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? 'w-8 h-2 bg-blue-500' 
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;
