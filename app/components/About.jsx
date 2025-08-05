'use client';

import { useEffect, useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Mail, 
  Code, 
  Palette, 
  Search, 
  Brain,
  Star,
  Trophy,
  Target,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);

  const skills = ['Frontend Dev', 'SEO Expert', 'Graphic Designer', 'AI Enthusiast'];
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
    setIsVisible(true);

    // Rotating skills animation
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);

    return () => clearInterval(skillInterval);
  }, []);

  const achievements = [
    { icon: Code, text: '50+ Projects', color: 'text-blue-500' },
    { icon: Trophy, text: '2+ Years Exp', color: 'text-yellow-500' },
    { icon: Star, text: '4+ Companies', color: 'text-green-500' },
    { icon: Target, text: '100% Success', color: 'text-purple-500' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', color: 'hover:text-gray-800' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Mail, href: '#', color: 'hover:text-red-500' }
  ];

  return (
    <section id="about" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[80vh] items-center">
          
          {/* Left Side - Square Image with Effects */}
          <div className="flex justify-center lg:justify-end" data-aos="fade-right" data-aos-duration="1200">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                {/* Gradient Overlay */}
                <div className="absolute z-10"></div>
                
                {/* Image */}
                <img
                  src="./images/DP.jpg"
                  alt="Profile Image"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Animated Border */}
                {/* <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude'}}></div> */}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <Code className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Palette className="w-7 h-7 text-white" />
              </div>

              {/* <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
                <Brain className="w-6 h-6 text-white" />
              </div> */}

              {/* Achievement Badges */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full px-4 py-2 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    Top Rated
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8" data-aos="fade-left" data-aos-duration="1200">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-800 px-6 py-3 rounded-full text-sm font-medium shadow-lg border border-blue-100">
              <Sparkles className="w-4 h-4 animate-spin" />
              My Background
            </div>

            {/* Main Heading with Animated Text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Hi, I'm a{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                  Creative
                </span>
              </h1>
              <div className="text-2xl md:text-3xl font-semibold text-gray-700 h-12 flex items-center">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent transition-all duration-500">
                  {skills[currentSkill]}
                </span>
                <span className="ml-2 animate-pulse">|</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="transform hover:translate-x-2 transition-transform duration-300">
                I am from <span className="font-semibold text-blue-600">Bramulla J&K, India</span>. I hold a degree in Computer Science Engineering from Government College of Engineering and Technology Kashmir.
              </p>
              <p className="transform hover:translate-x-2 transition-transform duration-300">
                Currently, I work as a <span className="font-semibold text-blue-600">Front-End Engineer</span> and provide freelance digital solutions including web development and SEO.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                  <div className="text-sm font-bold text-gray-800">{achievement.text}</div>
                </div>
              ))}
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>Kashmir, India</span>
                </div>
                <div className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-green-500" />
                  <span>Available for projects</span>
                </div>
              </div>

            </div>

            {/* Floating Quote */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-2xl shadow-lg">
              <p className="text-gray-700 italic font-medium">
                "Transforming ideas into exceptional digital experiences through cutting-edge technology and creative design solutions."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default About;