import React from 'react';
import { Github, Linkedin, Instagram, MessageSquare, Mail } from 'lucide-react';

export default function SocialMediaBar() {
  const socialLinks = [
    {
      href: "https://github.com/umarnaxir",
      icon: <Github />,
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      href: "https://www.linkedin.com/in/umar-nazir19/",
      icon: <Linkedin />,
      label: "LinkedIn",
      color: "hover:text-blue-500"
    },
    {
      href: "https://www.instagram.com/umar_naxir/",
      icon: <Instagram />,
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      href: "https://wa.me/qr/JXOWE54MG6HWN1",
      icon: <MessageSquare />,
      label: "WhatsApp",
      color: "hover:text-green-500"
    },
    {
      href: "mailto:erumarnazir@gmail.com",
      icon: <Mail />,
      label: "Email",
      color: "hover:text-red-500"
    },
  ];

  return (
    <>
      {/* Desktop - Horizontal Bottom Center */}
      <div className="hidden md:block fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
        <div className="relative">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon, label, color }) => (
                <SocialIcon 
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  color={color}
                  tooltipPosition="top"
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md -z-10"></div>
        </div>
      </div>

      {/* Mobile - Vertical Right Side */}
      <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-[9999]">
        <div className="relative">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-2 py-3 shadow-lg">
            <div className="flex flex-col items-center gap-3">
              {socialLinks.map(({ href, icon, label, color }) => (
                <SocialIcon 
                  key={label}
                  href={href}
                  icon={icon}
                  label={label}
                  color={color}
                  tooltipPosition="left"
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md -z-10"></div>
        </div>
      </div>
    </>
  );
}

function SocialIcon({ href, icon, label, color, tooltipPosition = 'top' }) {
  const tooltipClasses = {
    top: '-top-9 left-1/2 -translate-x-1/2',
    left: 'left-10 top-1/2 -translate-y-1/2'
  };

  const pointerClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45',
    left: 'top-1/2 -translate-y-1/2 -left-[4px] -rotate-45'
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95`}
    >
      {React.cloneElement(icon, {
        className: `w-5 h-5 sm:w-6 sm:h-6 text-gray-300 transition-colors duration-300 ${color}`,
      })}
      
      {/* Tooltip */}
      <div className={`absolute ${tooltipClasses[tooltipPosition]} bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
        {label}
        <div className={`absolute ${pointerClasses[tooltipPosition]} w-2 h-2 bg-gray-800`}></div>
      </div>
    </a>
  );
}