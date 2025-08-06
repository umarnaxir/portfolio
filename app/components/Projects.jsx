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
  Star
} from 'lucide-react';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Kindness Towards Humanity',
      description: 'A compassionate platform dedicated to humanitarian causes and social welfare initiatives spreading love globally.',
      url: 'https://kindnesstowardshumanity.in/',
      icon: Heart,
      color: 'from-rose-400 via-pink-500 to-red-500',
      bgColor: 'bg-rose-50',
      category: 'Social Impact',
      image: '/images/kindness.png',
    },
    {
      id: 2,
      title: 'Ninemash',
      description: 'Premium travel and tourism platform offering curated travel experiences with modern digital solutions and booking services.',
      url: 'https://ninemash.com/',
      icon: MapPin,
      color: 'from-blue-400 via-cyan-500 to-teal-500',
      bgColor: 'bg-blue-50',
      category: 'Travel & Tourism',
      image: '/images/ninemash.png',
    },
    {
      id: 3,
      title: 'Kashmir Tickets',
      description: 'Ultimate Kashmir tourism platform with seamless ticket reservations, travel packages, and authentic local experiences.',
      url: 'https://kashmirtickets.com/',
      icon: Plane,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      category: 'Travel & Tourism',
      image: '/images/kashmirtickets.png',
    },
    {
      id: 4,
      title: 'The Hotel Sea View',
      description: 'Luxury beachfront hotel with breathtaking sea views, premium accommodations, and world-class hospitality services.',
      url: 'https://thehotelseaview.in/',
      icon: Hotel,
      color: 'from-blue-400 via-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      category: 'Hospitality',
      image: '/images/hotel.png',
    },
    {
      id: 5,
      title: 'Elite Express Delivery',
      description: 'Premium courier service with lightning-fast delivery, real-time tracking, and comprehensive logistics management.',
      url: 'https://eliteexpressdeliveryservices.com/',
      icon: Truck,
      color: 'from-purple-400 via-violet-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      category: 'Logistics',
      image: '/images/elite.png',
    },
    {
      id: 6,
      title: 'Rush Expedited Courier',
      description: 'Lightning-fast courier services with same-day delivery, advanced tracking systems, and customer management solutions.',
      url: 'https://re-courier.com/',
      icon: Zap,
      color: 'from-amber-400 via-orange-500 to-red-500',
      bgColor: 'bg-amber-50',
      category: 'Logistics',
      image: '/images/recourer.png',
    },
    {
      id: 7,
      title: 'Altaf Hospital',
      description: 'Advanced healthcare management system with digital patient records, smart appointment scheduling, and telemedicine.',
      url: 'https://altafhospital.com/',
      icon: Building,
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgColor: 'bg-emerald-50',
      category: 'Healthcare',
      image: '/images/altafhospital.png',
    },
    {
      id: 8,
      title: 'Digitlia',
      description: 'Full-service digital marketing agency delivering innovative online solutions, brand growth, and comprehensive marketing strategies.',
      url: 'https://digitlia.com/',
      icon: Globe,
      color: 'from-teal-400 via-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      category: 'Digital Marketing',
      image: '/images/harmukh.png',
    },
    {
      id: 9,
      title: 'Office Management Pro',
      description: 'Next-generation office management solution with AI-powered automation, streamlined workflows, and business intelligence.',
      url: '#',
      icon: Briefcase,
      color: 'from-gray-400 via-slate-500 to-zinc-600',
      bgColor: 'bg-gray-50',
      category: 'Business Software',
      image: '/images/comming.png',
    },
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  // Scroll to specific project index
  const scrollToProject = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 416 : 352;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  // Navigation handlers
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
      id="projects" 
      className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 sm:py-20 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/10 to-indigo-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 tracking-wide uppercase">Portfolio</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div> */}
          <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-6xl lg:text-5xl mb-6">
            My{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Amazing Projects
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover my portfolio of innovative digital solutions, from compassionate platforms to cutting-edge business tools.
          </p>
        </div>

        {/* Auto-play control */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isAutoPlay ? '⏸️ Pause Auto-play' : '▶️ Start Auto-play'}
          </button>
        </div>

        {/* Carousel with arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl hover:bg-blue-50 hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 group"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl hover:bg-blue-50 hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 group"
          >
            <ChevronRight className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 scrollbar-thumb-rounded hover:scrollbar-thumb-blue-600 transition-colors pb-8"
            style={{ scrollBehavior: 'smooth' }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={project.id}
                  className={`flex-shrink-0 snap-center ${project.bgColor} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 w-[320px] sm:w-80 md:w-96 mx-4 cursor-pointer group overflow-hidden ${
                    isHovered ? 'transform scale-105 shadow-2xl' : 'hover:transform hover:scale-105'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => scrollToProject(index)}
                >
                  {/* Image with overlay */}
                  <div className="relative h-52 overflow-hidden">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isHovered ? 'scale-110' : 'group-hover:scale-110'
                          }`}
                          loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                          isHovered ? 'opacity-90' : 'opacity-60'
                        }`} />
                      </>
                    ) : (
                      <div className={`h-full bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <Icon className="w-16 h-16 text-white opacity-90 relative z-10" />
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                      <span className="text-xs font-semibold text-gray-800">{project.category}</span>
                    </div>
                    
                    {/* Icon badge */}
                    <div className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
                      isHovered ? 'bg-white/95 scale-110' : 'bg-white/80'
                    }`}>
                      <Icon className={`w-6 h-6 text-gray-800 ${isHovered ? 'animate-pulse' : ''}`} />
                    </div>

                    {/* Hover overlay content */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-center text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
                          <ExternalLink className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">Click to explore</p>
                      </div>
                    </div>
                  </div>

                  {/* Content section with enhanced styling */}
                  <div className="p-6 bg-gradient-to-b from-white to-white/95">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">{project.title}</h3>
                      <div className={`ml-3 p-2 rounded-lg bg-gradient-to-br ${project.color} shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                    
                    <div className="flex items-center justify-between">
                      {project.url !== '#' ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 group`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                          View Live
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-semibold cursor-not-allowed opacity-75">
                          <ExternalLink className="w-4 h-4" />
                          Coming Soon
                        </span>
                      )}
                      
                      {/* Interactive rating stars */}
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced dots navigation */}
        <div className="flex justify-center mt-12 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? 'w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                  : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Project counter */}
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 font-medium">
            Project <span className="text-2xl font-bold text-blue-600">{currentIndex + 1}</span> of{' '}
            <span className="text-2xl font-bold text-purple-600">{projects.length}</span>
          </p>
        </div>
      </div>

      {/* Enhanced custom styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
          border-radius: 9999px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        .scrollbar-track-gray-200::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 9999px;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
        }

        /* Smooth animations */
        .group:hover .group-hover\\:rotate-45 {
          transform: rotate(45deg);
        }
        
        /* Glassmorphism effects */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;