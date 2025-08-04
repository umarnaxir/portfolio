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
  Sparkles
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
      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
      data-aos="fade-up" 
      data-aos-delay={index * 100}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${categoryColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <skill.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-800 text-lg">{skill.name}</h4>
            <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {skill.level}%
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
        </div>
      </div>
      
      {/* Skill Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 150}ms`
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Skill Level Indicator */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  );

  const CategoryButton = ({ category, categoryData, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
        isActive
          ? `bg-gradient-to-r ${categoryData.color} text-white shadow-lg scale-105`
          : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <categoryData.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`} />
      <span className="hidden sm:inline">{categoryData.title}</span>
      <span className="sm:hidden">{category.charAt(0).toUpperCase()}</span>
      
      {isActive && (
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl animate-pulse"></div>
      )}
    </button>
  );

  const currentCategory = skillCategories[activeCategory];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical skills spanning frontend, backend, AI/ML, digital marketing, and creative design
          </p> */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16" data-aos="fade-up" data-aos-delay="200">
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
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="300">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <currentCategory.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{currentCategory.title}</h3>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {currentCategory.skills.map((skill, index) => (
            <SkillBar 
              key={`${activeCategory}-${skill.name}`} 
              skill={skill} 
              index={index}
              categoryColor={currentCategory.color}
            />
          ))}
        </div>

        {/* Skills Summary */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100" data-aos="fade-up">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frontend Developer Expertise</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Specialized in creating modern, responsive web applications with a focus on user experience, 
              performance optimization, and SEO-friendly solutions. Combining technical skills with creative 
              design to deliver exceptional digital experiences.
            </p>
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