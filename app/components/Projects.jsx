'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Heart, Code, Plane, Truck, Zap, Globe, Building, Briefcase, Hotel, ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const projects = [
    {
      id: 1,
      title: 'Kindness Towards Humanity',
      description: 'A compassionate platform dedicated to humanitarian causes and social welfare initiatives.',
      url: 'https://kindnesstowardshumanity.in/',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 2,
      title: 'Ninemash',
      description: 'Modern digital solutions platform offering comprehensive web development and design services.',
      url: 'https://ninemash.com/',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'Kashmir Tickets',
      description: 'Travel booking platform for Kashmir tourism with seamless ticket reservation system.',
      url: 'https://kashmirtickets.com/',
      icon: Plane,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 4,
      title: 'Elite Express Delivery',
      description: 'Premium delivery service platform with real-time tracking and logistics management.',
      url: 'https://eliteexpressdeliveryservices.com/',
      icon: Truck,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 5,
      title: 'Rush Expedited Courier',
      description: 'Fast courier service with expedited delivery solutions and customer management system.',
      url: 'https://re-courier.com/',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 6,
      title: 'Digitlia',
      description: 'Digital marketing agency platform showcasing comprehensive online marketing solutions.',
      url: 'https://digitlia.com/',
      icon: Globe,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 7,
      title: 'Altaf Hospital',
      description: 'Healthcare management system with patient records and appointment scheduling.',
      url: 'https://altafhospital.com/',
      icon: Building,
      color: 'from-emerald-500 to-green-500',
    },
    {
      id: 8,
      title: 'Office Management',
      description: 'Comprehensive office management solution for streamlined business operations.',
      url: '#',
      icon: Briefcase,
      color: 'from-gray-500 to-slate-500',
    },
    {
      id: 9,
      title: 'The Hotel Sea View',
      description: 'Luxury hotel booking platform with stunning sea view accommodations and reservations.',
      url: 'https://thehotelseaview.in/',
      icon: Hotel,
      color: 'from-blue-500 to-indigo-500',
    }
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out',
      disable: 'mobile', // Disable animations on mobile
      offset: 50,
    });
  }, []);

  // Auto-scroll effect (optional, can be toggled off)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Scroll to specific project
  const scrollToProject = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = 272; // w-64 (256px) + gap-4 (16px)
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  // Handle next/previous navigation
  const handleNext = () => {
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    scrollToProject(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    scrollToProject(prevIndex);
  };

  return (
    <section id="projects" className="py-8 px-2 bg-gray-50 sm:py-12 sm:px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:text-4xl">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
        </div>

        {/* Carousel Container with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-blue-100 transition-colors z-10 sm:p-3"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-blue-100 transition-colors z-10 sm:p-3"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4 w-max">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-64 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex-shrink-0 snap-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  {/* Project Image/Icon */}
                  <div
                    className={`h-32 bg-gradient-to-br ${project.color} rounded-t-lg flex items-center justify-center relative overflow-hidden group`}
                  >
                    <project.icon className="w-10 h-10 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 sm:text-sm">
                      {project.description}
                    </p>
                    {project.url !== '#' ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-gray-400 text-white px-3 py-1.5 rounded-md font-medium cursor-not-allowed text-sm sm:text-base">
                        <ExternalLink className="w-4 h-4" />
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;