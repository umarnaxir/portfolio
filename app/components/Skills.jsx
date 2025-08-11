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
      style={{
        minHeight: 'min(12vh, 120px)',
        maxHeight: 'max(15vh, 180px)'
      }}
    >
      <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
        <div 
          className={`bg-gradient-to-br ${categoryColor} rounded-lg md:rounded-xl flex items-center justify-center shadow group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300`}
          style={{
            width: 'min(8vw, 48px)',
            height: 'min(8vw, 48px)',
            minWidth: '32px',
            minHeight: '32px',
            maxWidth: '48px',
            maxHeight: '48px'
          }}
        >
          <skill.icon 
            className="text-white" 
            style={{
              width: 'min(4vw, 24px)',
              height: 'min(4vw, 24px)',
              minWidth: '16px',
              minHeight: '16px',
              maxWidth: '24px',
              maxHeight: '24px'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1 md:mb-2">
            <h4 className="font-medium md:font-bold text-gray-800 text-sm md:text-lg truncate">{skill.name}</h4>
            <span 
              className="font-bold text-gray-500 bg-gray-100 px-2 py-0.5 md:px-3 md:py-1 rounded-full whitespace-nowrap ml-2"
              style={{
                fontSize: 'min(3vw, 14px)',
                minFontSize: '10px',
                maxFontSize: '14px'
              }}
            >
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
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{
          height: 'min(2vh, 12px)',
          minHeight: '8px',
          maxHeight: '12px'
        }}
      >
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
      className={`group relative rounded-lg md:rounded-2xl font-medium md:font-semibold transition-all duration-300 flex items-center gap-2 md:gap-3 ${
        isActive
          ? `bg-gradient-to-r ${categoryData.color} text-white shadow md:shadow-lg scale-[1.02] md:scale-105`
          : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-sm md:hover:shadow-md'
      }`}
      style={{
        padding: 'min(2vh, 16px) min(4vw, 24px)',
        minPadding: '8px 12px',
        maxPadding: '16px 24px',
        fontSize: 'min(3vw, 14px)',
        minFontSize: '10px',
        maxFontSize: '14px'
      }}
    >
      <categoryData.icon 
        className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`}
        style={{
          width: 'min(4vw, 20px)',
          height: 'min(4vw, 20px)',
          minWidth: '16px',
          minHeight: '16px',
          maxWidth: '20px',
          maxHeight: '20px'
        }}
      />
      <span>{categoryData.title}</span>
      
      {isActive && (
        <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg md:rounded-2xl animate-pulse"></div>
      )}
    </button>
  );

  const currentCategory = skillCategories[activeCategory];

  return (
    <section 
      id="skills" 
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
      style={{
        minHeight: '100vh',
        width: '100vw',
        paddingTop: 'max(8vh, 60px)',
        paddingBottom: 'max(8vh, 60px)',
        paddingLeft: 'min(5vw, 40px)',
        paddingRight: 'min(5vw, 40px)'
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bg-blue-200/30 rounded-full blur-lg md:blur-3xl animate-pulse"
          style={{
            top: 'min(10vh, 80px)',
            right: 'min(8vw, 80px)',
            width: 'min(25vw, 256px)',
            height: 'min(25vw, 256px)',
            minWidth: '128px',
            minHeight: '128px',
            maxWidth: '256px',
            maxHeight: '256px'
          }}
        ></div>
        <div 
          className="absolute bg-purple-200/30 rounded-full blur-lg md:blur-3xl animate-pulse animation-delay-2000"
          style={{
            bottom: 'min(10vh, 80px)',
            left: 'min(8vw, 80px)',
            width: 'min(25vw, 256px)',
            height: 'min(25vw, 256px)',
            minWidth: '128px',
            minHeight: '128px',
            maxWidth: '256px',
            maxHeight: '256px'
          }}
        ></div>
        <div 
          className="absolute bg-pink-200/20 rounded-full blur-lg md:blur-3xl animate-pulse animation-delay-4000"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(35vw, 384px)',
            height: 'min(35vw, 384px)',
            minWidth: '192px',
            minHeight: '192px',
            maxWidth: '384px',
            maxHeight: '384px'
          }}
        ></div>
      </div>

      <div 
        className="container mx-auto max-w-7xl relative z-10"
        style={{
          paddingLeft: 'min(3vw, 24px)',
          paddingRight: 'min(3vw, 24px)',
          maxWidth: 'min(95vw, 1280px)',
          width: '100%'
        }}
      >
        {/* Section Header */}
        <div 
          className="text-center"
          data-aos="fade-up"
          style={{
            marginBottom: 'max(6vh, 48px)'
          }}
        >
          <h2 
            className="font-bold text-gray-900"
            style={{
              fontSize: 'min(8vw, 64px)',
              minFontSize: '24px',
              maxFontSize: '64px',
              marginBottom: 'min(3vh, 24px)',
              lineHeight: '1.2'
            }}
          >
            My <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
            style={{
              width: 'min(15vw, 96px)',
              height: 'min(1vh, 4px)',
              minWidth: '48px',
              minHeight: '2px',
              maxWidth: '96px',
              maxHeight: '4px',
              marginTop: 'min(2vh, 16px)'
            }}
          ></div>
        </div>

        {/* Category Navigation */}
        <div 
          className="flex flex-wrap justify-center"
          data-aos="fade-up" 
          data-aos-delay="200"
          style={{
            gap: 'min(2vw, 16px)',
            marginBottom: 'max(5vh, 40px)'
          }}
        >
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
        <div 
          className="text-center"
          data-aos="fade-up" 
          data-aos-delay="300"
          style={{
            marginBottom: 'max(4vh, 32px)'
          }}
        >
          <div className="inline-flex items-center gap-2 md:gap-3">
            <div 
              className={`bg-gradient-to-br ${currentCategory.color} rounded-lg md:rounded-2xl flex items-center justify-center shadow md:shadow-lg`}
              style={{
                width: 'min(10vw, 48px)',
                height: 'min(10vw, 48px)',
                minWidth: '32px',
                minHeight: '32px',
                maxWidth: '48px',
                maxHeight: '48px'
              }}
            >
              <currentCategory.icon 
                className="text-white"
                style={{
                  width: 'min(5vw, 24px)',
                  height: 'min(5vw, 24px)',
                  minWidth: '16px',
                  minHeight: '16px',
                  maxWidth: '24px',
                  maxHeight: '24px'
                }}
              />
            </div>
            <h3 
              className="font-bold text-gray-900"
              style={{
                fontSize: 'min(6vw, 48px)',
                minFontSize: '18px',
                maxFontSize: '48px',
                lineHeight: '1.2'
              }}
            >
              {currentCategory.title}
            </h3>
          </div>
        </div>

        {/* Skills Grid - Responsive grid */}
        <div 
          className="grid mb-8 md:mb-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(45vw, 300px), 1fr))',
            gap: 'min(3vw, 24px)',
            marginBottom: 'max(5vh, 40px)',
            minGridTemplateColumns: 'repeat(2, 1fr)'
          }}
        >
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
        <div 
          className="relative group bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 overflow-hidden"
          style={{
            padding: 'min(5vh, 40px) min(4vw, 32px)',
            minPadding: '24px 16px',
            maxPadding: '40px 32px'
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
          
          <div className="relative z-10 text-center">
            <div 
              className="flex items-center justify-center gap-3"
              style={{
                marginBottom: 'min(3vh, 24px)'
              }}
            >
              <Trophy 
                className="text-yellow-500"
                style={{
                  width: 'min(6vw, 32px)',
                  height: 'min(6vw, 32px)',
                  minWidth: '24px',
                  minHeight: '24px',
                  maxWidth: '32px',
                  maxHeight: '32px'
                }}
              />
              <h3 
                className="font-bold text-slate-800"
                style={{
                  fontSize: 'min(6vw, 40px)',
                  minFontSize: '20px',
                  maxFontSize: '40px',
                  lineHeight: '1.2'
                }}
              >
                Frontend Developer Expertise
              </h3>
              <Trophy 
                className="text-yellow-500"
                style={{
                  width: 'min(6vw, 32px)',
                  height: 'min(6vw, 32px)',
                  minWidth: '24px',
                  minHeight: '24px',
                  maxWidth: '32px',
                  maxHeight: '32px'
                }}
              />
            </div>
            
            <p 
              className="text-slate-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                fontSize: 'min(4vw, 20px)',
                minFontSize: '14px',
                maxFontSize: '20px',
                marginBottom: 'min(4vh, 32px)',
                lineHeight: '1.6'
              }}
            >
              Specialized in creating modern, responsive web applications with a focus on user experience, 
              performance optimization, and SEO-friendly solutions that drive business growth.
            </p>

            {/* Stats or badges */}
            <div 
              className="flex flex-wrap justify-center"
              style={{
                gap: 'min(3vw, 16px)',
                marginTop: 'min(4vh, 32px)'
              }}
            >
              <div 
                className="bg-blue-100/50 text-blue-700 rounded-full font-semibold"
                style={{
                  padding: 'min(1.5vh, 8px) min(3vw, 16px)',
                  fontSize: 'min(3vw, 14px)',
                  minFontSize: '10px',
                  maxFontSize: '14px',
                  minPadding: '6px 12px',
                  maxPadding: '8px 16px'
                }}
              >
                50+ Projects Completed
              </div>
              <div 
                className="bg-purple-100/50 text-purple-700 rounded-full font-semibold"
                style={{
                  padding: 'min(1.5vh, 8px) min(3vw, 16px)',
                  fontSize: 'min(3vw, 14px)',
                  minFontSize: '10px',
                  maxFontSize: '14px',
                  minPadding: '6px 12px',
                  maxPadding: '8px 16px'
                }}
              >
                2+ Years Experience
              </div>
              <div 
                className="bg-green-100/50 text-green-700 rounded-full font-semibold"
                style={{
                  padding: 'min(1.5vh, 8px) min(3vw, 16px)',
                  fontSize: 'min(3vw, 14px)',
                  minFontSize: '10px',
                  maxFontSize: '14px',
                  minPadding: '6px 12px',
                  maxPadding: '8px 16px'
                }}
              >
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

        /* Safe area support for iOS devices */
        @supports (padding: max(0px)) {
          #skills {
            padding-top: max(8vh, env(safe-area-inset-top, 60px)) !important;
            padding-bottom: max(8vh, env(safe-area-inset-bottom, 60px)) !important;
          }
        }

        /* Grid layout adjustments for very small screens */
        @media screen and (max-width: 375px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Prevent text scaling on mobile devices */
        * {
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
      `}</style>
    </section>
  );
};

export default Skills;