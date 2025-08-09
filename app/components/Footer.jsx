"use client";

import { Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-3 py-6 relative z-10">
        {/* Main Content - Centered */}
        <div className="text-center max-w-2xl mx-auto">
          
          {/* Brand Name */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-white">
                Umar Nazir
              </span>
            </h2>
            <p className="text-white text-l px-2 leading-relaxed">
              Full Stack Developer passionate about creating innovative digital experiences with modern technologies.
            </p>
          </div>
          
          {/* Contact Info - Centered */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a 
              href="tel:+917051732616" 
              className="flex items-center gap-2 group hover:scale-105 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                +91 7051 732 616
              </span>
            </a>
            
            <a
              href="mailto:erumarnazir@gmail.com"
              className="flex items-center gap-2 group hover:scale-105 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25">
                <Mail className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                erumarnazir@gmail.com
              </span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-4"></div>

          {/* Footer Bottom - Centered */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-slate-400 group text-sm">
              <span>Crafted with</span>
              <Heart 
                className="w-3 h-3 text-white animate-pulse group-hover:scale-125 transition-transform duration-300" 
                fill="currentColor" 
              />
              <span>in Kashmir</span>
            </div>
            
            <p className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} Umar Nazir. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;