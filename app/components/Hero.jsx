"use client";
import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  GraduationCap,
  Clock,
  Building2,
  Folder,
  Laptop,
  Search,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  ArrowRight,
  Download,
} from "lucide-react";

const HeroSection = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  const roles = [
    "Software Developer",
    "Frontend Specialist",
    "Computer Science Engineer",
    "SEO Executive",
    "Tech Enthusiast",
  ];
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 2500;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      disable: false,
      startEvent: "DOMContentLoaded",
      offset: 30,
      delay: 0,
      easing: "ease-out-quart",
      mirror: false,
      anchorPlacement: "top-bottom",
      mobile: true,
    });

    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[index % roles.length];
      if (!isDeleting) {
        if (text.length < currentRole.length) {
          setText(currentRole.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  // Mouse move handler for cloud effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 transition-all duration-1500 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } h-[75vh] md:h-[100vh]`}
      style={{
        backgroundImage: "url(/images/my-profile.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "640px",
      }}
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-indigo-400/6 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20" />
      </div>

      {/* Mouse Hover Cloud Effects - Highly Visible */}
      {isHovering && (
        <>
          {/* Main Visible Cloud */}
          <div
            className="absolute pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: mousePosition.x - 120,
              top: mousePosition.y - 80,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-60 h-40">
              {/* Cloud Shape 1 */}
              <div className="absolute left-0 top-4 w-16 h-16 bg-white/25 rounded-full blur-sm animate-float-slow" />
              <div className="absolute left-8 top-0 w-20 h-20 bg-white/30 rounded-full blur-sm animate-float-medium" />
              <div className="absolute left-16 top-2 w-24 h-24 bg-white/35 rounded-full blur-sm animate-float-slow" />
              <div className="absolute left-28 top-0 w-18 h-18 bg-white/25 rounded-full blur-sm animate-float-fast" />
              <div className="absolute left-36 top-4 w-16 h-16 bg-white/20 rounded-full blur-sm animate-float-medium" />
              
              {/* Fog overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-white/15 to-cyan-200/20 rounded-full blur-md animate-pulse" 
                   style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Secondary Trailing Cloud */}
          <div
            className="absolute pointer-events-none transition-all duration-800 ease-out"
            style={{
              left: mousePosition.x - 160,
              top: mousePosition.y - 60,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-40 h-25">
              <div className="absolute left-2 top-2 w-12 h-12 bg-blue-100/20 rounded-full blur-sm animate-float-slow" />
              <div className="absolute left-8 top-0 w-14 h-14 bg-white/15 rounded-full blur-sm animate-float-medium" />
              <div className="absolute left-16 top-1 w-16 h-16 bg-cyan-100/18 rounded-full blur-sm animate-float-fast" />
              <div className="absolute left-24 top-3 w-10 h-10 bg-white/12 rounded-full blur-sm animate-float-slow" />
            </div>
          </div>

          {/* Smaller Accent Clouds */}
          <div
            className="absolute pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x + 80,
              top: mousePosition.y - 40,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-24 h-16">
              <div className="absolute left-0 top-2 w-8 h-8 bg-white/30 rounded-full blur-sm animate-float-fast" />
              <div className="absolute left-4 top-0 w-10 h-10 bg-blue-100/25 rounded-full blur-sm animate-float-medium" />
              <div className="absolute left-10 top-1 w-8 h-8 bg-white/20 rounded-full blur-sm animate-float-slow" />
            </div>
          </div>

          {/* Bottom trailing fog */}
          <div
            className="absolute pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: mousePosition.x - 80,
              top: mousePosition.y + 40,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-32 h-20">
              <div className="absolute inset-0 bg-gradient-to-t from-white/8 via-blue-50/12 to-transparent rounded-full blur-lg animate-pulse" 
                   style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Sparkle particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none w-2 h-2 bg-white/60 rounded-full animate-twinkle"
              style={{
                left: mousePosition.x + (Math.cos((i * 30) * Math.PI / 180) * (80 + Math.random() * 40)),
                top: mousePosition.y + (Math.sin((i * 30) * Math.PI / 180) * (80 + Math.random() * 40)),
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-20 w-full h-full flex flex-col justify-end pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full justify-between items-end gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <div className="mb-6">
                <div
                  className="inline-block mb-2"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <span className="text-blue-400 text-base font-medium tracking-wide">
                    Hello, I'm
                  </span>
                </div>

                <h1
                  className="text-white text-5xl font-bold tracking-tight mb-3 leading-tight"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Umar Nazir
                </h1>

                <div
                  className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  data-aos="scale-x"
                  data-aos-delay="600"
                  data-aos-duration="800"
                />
              </div>

              <div className="mb-6" data-aos="fade-up" data-aos-delay="700">
                <div className="flex items-center gap-3 text-xl font-medium mb-6">
                  <span className="text-gray-300">I'm a</span>
                  <div className="flex items-center">
                    <span className="text-white font-bold min-w-[200px] text-left">
                      {text}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    {
                      icon: <GraduationCap className="w-4 h-4" />,
                      title: "CSE GRADUATE",
                      value: "Gcet-Kashmir",
                    },
                    {
                      icon: <Clock className="w-4 h-4" />,
                      title: "EXPERIENCE",
                      value: "2+ Years",
                    },
                    {
                      icon: <Building2 className="w-4 h-4" />,
                      title: "COMPANIES",
                      value: "4+ Clients",
                    },
                    {
                      icon: <Folder className="w-4 h-4" />,
                      title: "PROJECTS",
                      value: "50+ Done",
                    },
                    {
                      icon: <Laptop className="w-4 h-4" />,
                      title: "FOCUS",
                      value: "Frontend",
                    },
                    {
                      icon: <Search className="w-4 h-4" />,
                      title: "SPECIALIZE",
                      value: "SEO",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-400/30"
                    >
                      <div className="flex items-center justify-center text-blue-400 mb-1">
                        {stat.icon}
                      </div>
                      <div className="text-center">
                        <h3 className="text-gray-400 text-[10px] font-medium mb-0.5 uppercase tracking-wider">
                          {stat.title}
                        </h3>
                        <p className="text-white text-xs font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mb-2">
                  {[
                    {
                      href: "https://github.com/umarnaxir",
                      icon: <Github className="w-4 h-4" />,
                      label: "GitHub",
                    },
                    {
                      href: "https://www.linkedin.com/in/umar-nazir19/",
                      icon: <Linkedin className="w-4 h-4" />,
                      label: "LinkedIn",
                    },
                    {
                      href: "https://www.instagram.com/umar_naxir/",
                      icon: <Instagram className="w-4 h-4" />,
                      label: "Instagram",
                    },
                    {
                      href: "https://wa.me/qr/JXOWE54MG6HWN1",
                      icon: <MessageSquare className="w-4 h-4" />,
                      label: "WhatsApp",
                    },
                  ].map(({ href, icon, label }, idx) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-blue-400/30 hover:scale-110 active:scale-95"
                      data-aos="zoom-in"
                      data-aos-delay={1100 + idx * 80}
                    >
                      {React.cloneElement(icon, {
                        className:
                          "w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors duration-300",
                      })}
                    </a>
                  ))}
                </div>

                {/* Contact Info - Desktop Only */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <a
                      href="tel:+917051732616"
                      className="hover:text-white transition-colors"
                    >
                      +91 7051732616
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <a
                      href="mailto:erumarnazir@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      erumarnazir@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Buttons */}
            <div
              className="flex flex-col gap-4"
              data-aos="fade-left"
              data-aos-delay="1200"
            >
              <a
                href="#projects"
                className="group w-48 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold text-base text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-1"
              >
                View My Work
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/cv/Umar Nazir.pdf"
                className="group w-48 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/40 text-white rounded-lg font-semibold text-base text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1"
              >
                Download CV
                <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden text-center">
            <div className="mb-4 mt-14">
              <div
                className="inline-block mb-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="text-blue-400 text-base font-medium tracking-wide">
                  Hello, I'm
                </span>
              </div>

              <h1
                className="text-white text-4xl font-bold tracking-tight mb-2 leading-tight"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Umar Nazir
              </h1>

              <div
                className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"
                data-aos="scale-x"
                data-aos-delay="600"
                data-aos-duration="800"
              />
            </div>

            <div className="mb-4" data-aos="fade-up" data-aos-delay="700">
              <div className="flex flex-col items-center gap-1 text-xl font-medium mb-18">
                <span className="text-gray-300">I'm a</span>
                <div className="flex items-center">
                  <span className="text-white font-bold min-w-[160px] text-left">
                    {text}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-10 px-4">
                {[
                  {
                    icon: <GraduationCap className="w-4 h-4" />,
                    title: "Gcet",
                    value: "Kashmir",
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    title: "EXP",
                    value: "2+ Yrs",
                  },
                  {
                    icon: <Building2 className="w-4 h-4" />,
                    title: "COMPANIES",
                    value: "4+",
                  },
                  {
                    icon: <Folder className="w-4 h-4" />,
                    title: "PROJECTS",
                    value: "50+",
                  },
                  {
                    icon: <Laptop className="w-4 h-4" />,
                    title: "FRONTEND",
                    value: "Expert",
                  },
                  {
                    icon: <Search className="w-4 h-4" />,
                    title: "SEO",
                    value: "Executive",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-1.5 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-400/30"
                  >
                    <div className="flex items-center justify-center text-blue-400 mb-0.5">
                      {stat.icon}
                    </div>
                    <div className="text-center">
                      <h3 className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                        {stat.title}
                      </h3>
                      <p className="text-white text-xs font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3"></div>
            <div className="flex justify-center gap-3 mb-2">
              {[
                {
                  href: "https://github.com/umarnaxir",
                  icon: <Github className="w-4 h-4" />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/umar-nazir19/",
                  icon: <Linkedin className="w-4 h-4" />,
                  label: "LinkedIn",
                },
                {
                  href: "https://www.instagram.com/umar_naxir/",
                  icon: <Instagram className="w-4 h-4" />,
                  label: "Instagram",
                },
                {
                  href: "https://wa.me/qr/JXOWE54MG6HWN1",
                  icon: <MessageSquare className="w-4 h-4" />,
                  label: "WhatsApp",
                },
              ].map(({ href, icon, label }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-9 h-9 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-blue-400/30 hover:scale-110 active:scale-95"
                  data-aos="zoom-in"
                  data-aos-delay={1100 + idx * 80}
                >
                  {React.cloneElement(icon, {
                    className:
                      "w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300",
                  })}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(3px); }
          50% { transform: translateY(-4px) translateX(-2px); }
          75% { transform: translateY(-12px) translateX(1px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-6px) translateX(-3px); }
          66% { transform: translateY(-10px) translateX(2px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(-5px) translateX(2px); }
          40% { transform: translateY(-8px) translateX(-1px); }
          60% { transform: translateY(-3px) translateX(3px); }
          80% { transform: translateY(-7px) translateX(-2px); }
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0.5);
          }
          50% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2.5s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default HeroSection;