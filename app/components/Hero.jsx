"use client";
import React, { useEffect, useState } from "react";
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

  return (
    <section
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
                    {/* <span className="w-0.5 h-5 bg-blue-400 ml-1 animate-pulse" /> */}
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
                href="#contact"
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
                  {/* <span className="w-0.5 h-4 bg-blue-400 ml-1 animate-pulse" /> */}
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
    </section>
  );
};

export default HeroSection;
