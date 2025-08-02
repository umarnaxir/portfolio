"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const roles = ["SOFTWARE DEVELOPER", "SEO EXECUTIVE", "Computer Science Engineer"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

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
    <section className="min-h-screen relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cccccc' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-16 min-h-screen flex items-center mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Headings */}
            <div className="space-y-2">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl font-bold text-black leading-tight"
                data-aos="fade-right"
              >
                Hi, I'm <span className="text-blue-500">Umar Nazir</span>
              </h1>
              <h2
                className="text-base sm:text-lg lg:text-xl text-black font-semibold uppercase tracking-wider inline-block overflow-hidden whitespace-nowrap border-r-[2px] border-black pr-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                I'm a {text}
              </h2>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay="100"
                className="w-12 h-12 bg-[#e6f0ff] rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 
      0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756
      -1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 
      1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605
      -2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22
      -.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23
      a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 
      2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176 
      .77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 
      .43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 
      0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12 
      c0-6.63-5.37-12-12-12z"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay="200"
                className="w-12 h-12 bg-[#e6f0ff] rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#0077B5]"
                >
                  <path
                    d="M4.98 3.5a2.5 2.5 0 1 0 0 5 
        2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 
        0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 
        3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45
        -.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 
        3.2v7H10.5V8.75z"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/eliteexpressdeliveryservices"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay="300"
                className="w-12 h-12 bg-[#e6f0ff] rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#E1306C]"
                >
                  <path
                    d="M7.75 2A5.75 5.75 0 0 0 2 
      7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 
      22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 
      7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 
      0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 
      3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 
      7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 
      1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 
      2 1 1 0 0 0 0-2z"
                  />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="fade-up"
                data-aos-delay="400"
                className="w-12 h-12 bg-[#e6f0ff] rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#075b26]"
                >
                  <path
                    d="M20.52 3.48A11.94 11.94 0 0 0 
      12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 
      1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 
      24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48
      -8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34
      -.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 
      1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 
      9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27
      -.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14
      -.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07
      -.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32
      -1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13
      -.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05
      -.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22
      -.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01
      -.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 
      0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 
      3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 
      1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23
      -1.15.16-1.27-.07-.12-.25-.19-.52-.34z"
                  />
                </svg>
              </a>
            </div>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-5 pt-5"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                View My Work
              </button>
              <button className="border-2 border-black text-black hover:bg-black hover:text-white px-12 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Download CV
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            <div className="relative">
              {/* Shadow & Border */}
              <div className="absolute -inset-4 bg-black/20 rounded-full blur-xl"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden border-2 border-black shadow-[0_0_60px_rgba(0,0,0,0.4)]">
                <img
                  src="/images/profile.png"
                  alt="Umar Nazir"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating blue dots */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="absolute top-1/4 -left-8 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
