"use client";

import { Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black py-6 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Brand & Description */}
        <h2 className="text-2xl font-bold text-white mb-2">Umar Nazir</h2>
        <p className="text-slate-300 text-sm mb-4 max-w-lg mx-auto">
          Computer Science Engineer & Front-End Developer with 2 years of experience in web development, SEO, and graphic design.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <a
            href="tel:+917051732616"
            className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-blue-500/50">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-300 group-hover:text-white text-sm">+91 7051 732 616</span>
          </a>
          <a
            href="mailto:erumarnazir@gmail.com"
            className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-blue-500/50">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-300 group-hover:text-white text-sm">erumarnazir@gmail.com</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-4"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs group">
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
    </footer>
  );
};

export default Footer;