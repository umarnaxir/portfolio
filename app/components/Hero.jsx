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
import MouseFollower from "./MouseHover";

const HeroSection = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  const roles = [
    "Software Developer",
    "Frontend Specialist",
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

  return (
    <section
      ref={heroRef}
      id="home"
      className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 transition-all duration-1500 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } h-[80vh] md:h-[100vh]`}
      aria-label="Hero section"
    >
      {/* Mouse Follower */}
      <MouseFollower />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/video/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/85 to-black/40" />

      {/* Background Glow */}
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

      {/* Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* ------- Desktop Layout ------- */}
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
                <div className="flex items-center gap-3 text-4xl font-bold mb-6">
                  <div className="flex items-center perspective-1000">
                    <span
                      className={`text-green-400 font-bold min-w-[350px] text-left pop-flip ${
                        index % 2 === 0 ? "flip-up" : "flip-down"
                      }`}
                      style={{
                        textShadow:
                          "0 0 10px rgba(74, 222, 128, 0.5), 0 0 20px rgba(74, 222, 128, 0.3)",
                      }}
                    >
                      {text}
                      <span className="cursor">|</span>
                    </span>
                  </div>
                </div>

                {/* Stats */}
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

                {/* Social Links */}
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
                    {
                      href: "mailto:erumarnazir@gmail.com",
                      icon: <Mail />,
                      label: "Email",
                      color: "hover:text-red-500",
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

                {/* Contact Info */}
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

            {/* Right Side Buttons */}
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
                <span className="text-blue-400 text-xl font-medium tracking-wide">
                  Hello, I'm
                </span>
              </div>

              <h1
                className="text-white text-5xl font-bold tracking-tight mb-2 leading-tight"
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
              <div className="flex flex-col items-center gap-1 text-3xl font-bold mb-18">
                <div className="flex items-center perspective-1000">
                  <span
                    className={`text-green-400 font-bold min-w-[250px] text-center pop-flip ${
                      index % 2 === 0 ? "flip-up" : "flip-down"
                    }`}
                    style={{
                      textShadow:
                        "0 0 10px rgba(74, 222, 128, 0.5), 0 0 20px rgba(74, 222, 128, 0.3)",
                    }}
                  >
                    {text}
                    <span className="cursor">|</span>
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
                {
                  href: "mailto:erumarnazir@gmail.com",
                  icon: <Mail />,
                  label: "Email",
                  color: "hover:text-red-500",
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
        /* Perspective for 3D effect */
        .perspective-1000 {
          perspective: 1000px;
        }

        /* Popping Flip Animation */
        .pop-flip {
          display: inline-block;
          animation: flipPop 0.6s ease-out forwards;
          transform-style: preserve-3d;
        }

        .flip-up {
          animation-name: flipUp;
        }

        .flip-down {
          animation-name: flipDown;
        }

        @keyframes flipUp {
          0% {
            opacity: 0;
            transform: rotateX(-90deg) scale(0.8);
            transform-origin: bottom;
          }
          60% {
            opacity: 1;
            transform: rotateX(10deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: rotateX(0) scale(1);
          }
        }

        @keyframes flipDown {
          0% {
            opacity: 0;
            transform: rotateX(90deg) scale(0.8);
            transform-origin: top;
          }
          60% {
            opacity: 1;
            transform: rotateX(-10deg) scale(1.1);
            transform-origin: top;
          }
          100% {
            opacity: 1;
            transform: rotateX(0) scale(1);
          }
        }

        /* Cursor Animation */
        .cursor {
          display: inline-block;
          animation: blink 0.7s infinite;
          margin-left: 4px;
          font-weight: normal;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        /* Simple Fog Effects */
        .fog-main {
          width: 200px;
          height: 120px;
          background: radial-gradient(
            ellipse,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(15px);
          animation: fog-drift 4s ease-in-out infinite;
        }

        .fog-secondary {
          width: 160px;
          height: 80px;
          background: radial-gradient(
            ellipse,
            rgba(173, 216, 230, 0.12) 0%,
            rgba(173, 216, 230, 0.06) 50%,
            transparent 80%
          );
          border-radius: 50%;
          filter: blur(12px);
          animation: fog-drift 5s ease-in-out infinite reverse;
        }

        .fog-trailing {
          width: 120px;
          height: 60px;
          background: radial-gradient(
            ellipse,
            rgba(240, 248, 255, 0.1) 0%,
            rgba(240, 248, 255, 0.04) 60%,
            transparent 90%
          );
          border-radius: 50%;
          filter: blur(10px);
          animation: fog-drift 3.5s ease-in-out infinite;
        }

        /* Fog Animations */
        @keyframes fog-drift {
          0%,
          100% {
            transform: translateY(0px) scaleX(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px) scaleX(1.1);
            opacity: 0.9;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes fade-in-late {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.3s forwards;
        }

        .animate-fade-in-late {
          animation: fade-in-late 1.2s ease-out 0.6s forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
