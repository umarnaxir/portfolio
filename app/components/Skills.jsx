'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Search, 
  Smartphone, 
  Globe,
  PenTool,
  BarChart3,
  Zap,
  Layers,
  Camera,
  Target,
  Settings,
  Sparkles,
  Trophy
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    setIsVisible(true);
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML/CSS', level: 95, icon: Code, description: 'Semantic markup & modern styling' },
        { name: 'JavaScript', level: 90, icon: Code, description: 'ES6+, DOM manipulation, async programming' },
        { name: 'React.js', level: 88, icon: Code, description: 'Hooks, Context API, component architecture' },
        { name: 'Next.js', level: 85, icon: Code, description: 'SSR, routing, API routes' },
        { name: 'TypeScript', level: 80, icon: Code, description: 'Type-safe JavaScript development' },
        { name: 'API Integration', level: 85, icon: Globe, description: 'RESTful APIs & data fetching' }
      ]
    },
    frameworks: {
      title: 'CSS Frameworks',
      icon: Palette,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Tailwind CSS', level: 92, icon: Palette, description: 'Utility-first CSS framework' },
        { name: 'Bootstrap', level: 88, icon: Layers, description: 'Responsive component framework' },
        { name: 'CSS Grid & Flexbox', level: 90, icon: Layers, description: 'Modern layout techniques' },
        { name: 'Responsive Design', level: 93, icon: Smartphone, description: 'Mobile-first design approach' }
      ]
    },
    seo: {
      title: 'SEO & Marketing',
      icon: Search,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'SEO Optimization', level: 90, icon: Search, description: 'On-page & off-page SEO strategies' },
        { name: 'Digital Marketing', level: 85, icon: Target, description: 'Online marketing campaigns' },
        { name: 'Content Strategy', level: 82, icon: PenTool, description: 'Content planning & optimization' },
        { name: 'Google Analytics', level: 80, icon: BarChart3, description: 'Traffic analysis & reporting' }
      ]
    },
    design: {
      title: 'Design & Creative',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Graphic Design', level: 85, icon: Palette, description: 'Visual identity & branding' },
        { name: 'Canva', level: 88, icon: Camera, description: 'Quick design & social media graphics' },
        { name: 'UI/UX Design', level: 80, icon: PenTool, description: 'User-centered design principles' },
        { name: 'Brand Strategy', level: 75, icon: Sparkles, description: 'Brand identity development' }
      ]
    },
    cms: {
      title: 'CMS & Platforms',
      icon: Globe,
      color: 'from-purple-500 to-indigo-500',
      skills: [
        { name: 'WordPress', level: 85, icon: Globe, description: 'Custom themes & plugin development' },
        { name: 'Content Management', level: 88, icon: PenTool, description: 'CMS setup & optimization' },
        { name: 'Website Deployment', level: 82, icon: Zap, description: 'Hosting & domain setup' },
        { name: 'Performance Optimization', level: 80, icon: Settings, description: 'Speed & SEO improvements' }
      ]
    }
  };

  const SkillBar = ({ skill, index, categoryColor }) => (
    <div 
      className="group bg-white rounded-lg md:rounded-2xl p-3 md:p-6 shadow-sm md:shadow-lg hover:shadow-md md:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-100"
      data-aos="fade-up" 
      data-aos-delay={index * 100}
    >
      <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
        <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${categoryColor} rounded-lg md:rounded-xl flex items-center justify-center shadow group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300`}>
          <skill.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1 md:mb-2">
            <h4 className="font-medium md:font-bold text-gray-800 text-sm md:text-lg truncate">{skill.name}</h4>
            <span className="text-xs md:text-sm font-bold text-gray-500 bg-gray-100 px-2 py-0.5 md:px-3 md:py-1 rounded-full whitespace-nowrap ml-2">
              {skill.level}%
            </span>
          </div>
          {/* Description - hidden on mobile */}
          <p className="text-gray-600 text-xs md:text-sm leading-tight md:leading-relaxed hidden md:block">
            {skill.description}
          </p>
        </div>
      </div>
      
      {/* Skill Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 150}ms`
          }}
        >
          {/* Shimmer effect - desktop only */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer hidden md:block"></div>
        </div>
      </div>

      {/* Skill Level Indicator - desktop only */}
      <div className="hidden md:flex justify-between text-xs text-gray-500 mt-1 md:mt-2">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  );

  const CategoryButton = ({ category, categoryData, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`group relative px-6 py-1.5 md:px-6 md:py-4 rounded-lg md:rounded-2xl font-medium md:font-semibold transition-all duration-300 flex items-center gap-2 md:gap-3 ${
        isActive
          ? `bg-gradient-to-r ${categoryData.color} text-white shadow md:shadow-lg scale-[1.02] md:scale-105`
          : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-sm md:hover:shadow-md'
      }`}
    >
      <categoryData.icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`} />
      <span className="text-xs md:text-sm">{categoryData.title}</span>
      
      {isActive && (
        <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg md:rounded-2xl animate-pulse"></div>
      )}
    </button>
  );

  const currentCategory = skillCategories[activeCategory];

  return (
    <section id="skills"  className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 md:py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 md:right-20 w-32 md:w-64 h-32 md:h-64 bg-blue-200/30 rounded-full blur-lg md:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-32 md:w-64 h-32 md:h-64 bg-purple-200/30 rounded-full blur-lg md:blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-pink-200/20 rounded-full blur-lg md:blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-3 md:px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 md:mb-6">
            My <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-12 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-2 md:mt-6"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16" data-aos="fade-up" data-aos-delay="200">
          {Object.entries(skillCategories).map(([category, categoryData]) => (
            <CategoryButton 
              key={category}
              category={category}
              categoryData={categoryData}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        {/* Active Category Display */}
        <div className="text-center mb-6 md:mb-12" data-aos="fade-up" data-aos-delay="300">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${currentCategory.color} rounded-lg md:rounded-2xl flex items-center justify-center shadow md:shadow-lg`}>
              <currentCategory.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-lg md:text-3xl font-bold text-gray-900">{currentCategory.title}</h3>
          </div>
        </div>

        {/* Skills Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
          {currentCategory.skills.map((skill, index) => (
            <SkillBar 
              key={`${activeCategory}-${skill.name}`} 
              skill={skill} 
              index={index}
              categoryColor={currentCategory.color}
            />
          ))}
        </div>

        {/* Enhanced Skills Summary */}
        <div className="relative group bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl md:text-4xl font-bold text-slate-800">Frontend Developer Expertise</h3>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Specialized in creating modern, responsive web applications with a focus on user experience, 
              performance optimization, and SEO-friendly solutions that drive business growth.
            </p>

            {/* Stats or badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="px-4 py-2 bg-blue-100/50 text-blue-700 rounded-full text-sm font-semibold">
                50+ Projects Completed
              </div>
              <div className="px-4 py-2 bg-purple-100/50 text-purple-700 rounded-full text-sm font-semibold">
                2+ Years Experience
              </div>
              <div className="px-4 py-2 bg-green-100/50 text-green-700 rounded-full text-sm font-semibold">
                Modern Tech Stack
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Skills;