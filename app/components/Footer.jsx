"use client";

import { Mail, Phone, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' }
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Umar Nazir
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Full Stack Developer passionate about creating innovative digital experiences with modern technologies.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <a 
                    href="tel:+917051732616" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    +91 7051 732 616
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <a
                    href="mailto:erumarnazir@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    erumarnazir@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"></div>
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-gray-300 hover:text-white transition-all duration-300 relative group text-lg hover:scale-105 inline-block"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Connect With Me
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"></div>
              </h3>
              
              <div className="flex gap-4 justify-center mb-6">
                {[
                  {
                    href: "https://github.com/umarnaxir",
                    label: "GitHub",
                    gradient: "from-gray-600 to-gray-800",
                    svgPath: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z",
                  },
                  {
                    href: "https://www.linkedin.com/in/umar-nazir19/",
                    label: "LinkedIn", 
                    gradient: "from-blue-500 to-blue-700",
                    svgPath: "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2v7H10.5V8.75z",
                  },
                  {
                    href: "https://www.instagram.com/umar_naxir/",
                    label: "Instagram",
                    gradient: "from-pink-500 to-purple-600",
                    svgPath: "M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
                  },
                  {
                    href: "https://wa.me/qr/JXOWE54MG6HWN1",
                    label: "WhatsApp",
                    gradient: "from-green-500 to-green-700",
                    svgPath: "M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48-8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34-.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13-.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05-.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22-.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01-.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.19-.52-.34z",
                  },
                ].map(({ href, label, svgPath, gradient }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6 group`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    >
                      <path d={svgPath} />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                Back to Top
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

          {/* Footer Bottom */}
          <div className="text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-gray-300">
                &copy; {new Date().getFullYear()} Umar Nazir. All rights reserved.
              </span>
              
              <span className="flex items-center gap-2 text-gray-300 group">
                Crafted with
                <Heart 
                  className="w-4 h-4 white mx-1 animate-pulse group-hover:scale-125 transition-transform duration-300" 
                  fill="currentColor" 
                />
                in Kashmir by 
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                  Umar Nazir
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Floating Animation Styles */}
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;