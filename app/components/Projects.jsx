"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { ArrowRight, Heart, MapPin, Plane, Hotel, Truck, Zap, Building, Globe, Briefcase } from "lucide-react"
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules"

const projects = [
  {
    id: 1,
    title: "Kindness Towards Humanity",
    description: "A compassionate platform dedicated to humanitarian causes and social welfare initiatives.",
    url: "https://kindnesstowardshumanity.in/",
    icon: Heart,
    image: "/images/kindness.png",
    status: "Live"
  },
  {
    id: 2,
    title: "Ninemash",
    description: "Premium travel and tourism platform offering curated travel experiences.",
    url: "https://ninemash.com/",
    icon: MapPin,
    image: "/images/ninemash.png",
    status: "Live"
  },
  {
    id: 3,
    title: "Kashmir Tickets",
    description: "Ultimate Kashmir tourism platform with seamless ticket reservations.",
    url: "https://kashmirtickets.com/",
    icon: Plane,
    image: "/images/kashmirtickets.png",
    status: "Live"
  },
  {
    id: 4,
    title: "The Hotel Sea View",
    description: "Luxury beachfront hotel with breathtaking sea views and hospitality services.",
    url: "https://thehotelseaview.in/",
    icon: Hotel,
    image: "/images/hotel.png",
    status: "Live"
  },
  {
    id: 5,
    title: "Elite Express Delivery",
    description: "Premium courier service with lightning-fast delivery and logistics management.",
    url: "https://eliteexpressdeliveryservices.com/",
    icon: Truck,
    image: "/images/elite.png",
    status: "Live"
  },
  {
    id: 6,
    title: "Rush Expedited Courier",
    description: "Lightning-fast courier services with same-day delivery and tracking systems.",
    url: "https://re-courier.com/",
    icon: Zap,
    image: "/images/recourer.png",
    status: "Live"
  },
  {
    id: 7,
    title: "Altaf Hospital",
    description: "Advanced healthcare management system with digital patient records.",
    url: "https://altafhospital.com/",
    icon: Building,
    image: "/images/altafhospital.png",
    status: "Live"
  },
  {
    id: 8,
    title: "Digitlia",
    description: "Full-service digital marketing agency delivering innovative online solutions.",
    url: "https://digitlia.com/",
    icon: Globe,
    image: "/images/harmukh.png",
    status: "Live"
  },
  {
    id: 9,
    title: "Office Management Pro",
    description: "Next-generation office management solution with AI-powered automation.",
    url: "#",
    icon: Briefcase,
    image: "/images/comming.png",
    status: "Coming Soon"
  }
]

// Geometric Background Component
const GeometricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated squares */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 opacity-20 rounded-lg rotate-12 animate-bounce" 
           style={{animationDelay: '0s', animationDuration: '3s'}}></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 opacity-15 rounded-lg -rotate-12 animate-pulse" 
           style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-50 opacity-25 rounded-lg rotate-45 animate-bounce" 
           style={{animationDelay: '2s', animationDuration: '5s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-18 h-18 bg-blue-100 opacity-20 rounded-lg -rotate-45 animate-pulse" 
           style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      
      {/* Floating circles */}
      <div className="absolute top-1/4 right-10 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 opacity-30 rounded-full animate-bounce" 
           style={{animationDelay: '1.5s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/3 left-20 w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 opacity-25 rounded-full animate-pulse" 
           style={{animationDelay: '0.8s', animationDuration: '3.2s'}}></div>
    </div>
  )
}

export const ProjectsCarousel = () => {
  const css = `
    .swiper { width: 100%; padding-bottom: 50px; }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 280px;
      transition: transform 0.3s ease;
    }
    .swiper-slide img { display: block; width: 100%; }
    .swiper-3d .swiper-slide-shadow-left,
    .swiper-3d .swiper-slide-shadow-right { background-image: none; }

    /* Black navigation arrows */
    .swiper-button-next,
    .swiper-button-prev {
      color: #000000 !important;
    }
    .swiper-button-next:after,
    .swiper-button-prev:after {
      color: #000000 !important;
    }

    /* Black pagination dots */
    .swiper-pagination-bullet {
      background: #000000 !important;
      opacity: 0.5 !important;
    }
    .swiper-pagination-bullet-active {
      background: #000000 !important;
      opacity: 1 !important;
    }

    /* Responsive Sizing */
    @media (min-width: 640px) {
      .swiper-slide { width: 320px; }
    }
    @media (min-width: 1024px) {
      .swiper-slide { width: 360px; }
    }

    /* Animation keyframes */
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slide-up 0.8s ease-out forwards;
      animation-fill-mode: both;
    }
  `

  return (
    <section id="projects"
    className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 space-y-4 py-10 overflow-hidden">
      <style>{css}</style>
      <GeometricBackground />
      
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="relative mx-auto flex w-full flex-col">
          {/* Enhanced Heading */}
          <div className="flex flex-col justify-center pb-8 pt-14 text-center md:items-center">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent tracking-tight animate-slide-up">
              Featured Projects
            </h3>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mt-4 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              Innovative digital solutions across web development, healthcare systems, and business automation.
            </p>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-black mx-auto mt-6 rounded-full animate-slide-up" style={{animationDelay: '0.4s'}}></div>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            spaceBetween={60}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2.5
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <SwiperSlide key={index}>
                  <div className="relative rounded-3xl bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[400px] flex flex-col">
                    {/* Status Label and Icon */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === 'Live'
                          ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/25'
                          : 'bg-amber-500/90 text-white shadow-lg shadow-amber-500/25'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          project.status === 'Live' ? 'bg-white animate-pulse' : 'bg-white animate-pulse'
                        }`} />
                        {project.status}
                      </span>
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    {/* Image section - takes up top portion */}
                    <div className="relative h-[240px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    {/* Text content section - takes up bottom portion */}
                    <div className="flex-1 bg-black/90 p-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-white text-lg md:text-xl mb-2 line-clamp-2">
                            {project.title}
                          </h4>
                          <p className="text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Enhanced Button */}
                        {project.url !== "#" ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-white text-black rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group"
                          >
                            View Project
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl font-medium opacity-75 cursor-not-allowed">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ProjectsCarousel