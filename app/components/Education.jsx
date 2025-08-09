'use client';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Star, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  Award,
  Trophy
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Education() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mouse movement tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const educationData = [
    {
      id: 1,
      degree: "Computer Science Engineering",
      institution: "Government College of Engineering & Technology",
      shortName: "GCET Kashmir",
      duration: "2020 - 2024",
      location: "Srinagar, J&K",
      description: "Completed comprehensive four-year Bachelor's program covering advanced software development, data structures, algorithms, system design, AI, and emerging technologies.",
      highlights: [
        "Advanced Software Development",
        "Data Structures & Algorithms", 
        "System Design & Architecture",
        "Artificial Intelligence & ML",
        "Database Management Systems",
        "Computer Networks & Security"
      ],
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-500/10 to-purple-600/10",
      grade: "Distinction",
      website: "https://gcetkashmir.ac.in/",
      type: "Bachelor's Degree"
    },
    {
      id: 2,
      degree: "Higher Secondary Education",
      institution: "Government Higher Secondary School Pehlipora",
      shortName: "GHSS Pehlipora",
      duration: "2018 - 2020",
      location: "Baramulla, J&K",
      description: "Completed Higher Secondary in Science stream with comprehensive study of Physics, Chemistry, Mathematics, and English with excellent academic performance.",
      highlights: [
        "Physics & Advanced Mathematics",
        "Chemistry & Laboratory Work",
        "English & Communication",
        "Scientific Research Methods",
        "Competitive Exam Preparation",
        "Critical Thinking Development"
      ],
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-500/10 to-pink-600/10",
      grade: "Distinction",
      website: "#",
      type: "Secondary Education"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      id="education" 
      className="relative bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 overflow-hidden py-16 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Interactive Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="eduBlueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.12)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
            </radialGradient>
            
            <radialGradient id="eduPurpleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.10)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.02)" />
            </radialGradient>
            
            <linearGradient id="eduGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.06)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.04)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.06)" />
            </linearGradient>

            <pattern id="eduDots" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="rgba(59, 130, 246, 0.15)" />
              <circle cx="20" cy="60" r="1.5" fill="rgba(147, 51, 234, 0.12)" />
              <circle cx="60" cy="20" r="1" fill="rgba(236, 72, 153, 0.10)" />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#eduGradient)" />
          <rect width="100%" height="100%" fill="url(#eduDots)" />
          
          {/* Dynamic floating elements */}
          <g className={`transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
            <circle 
              cx={`${20 + mousePosition.x * 20}%`} 
              cy={`${15 + mousePosition.y * 15}%`} 
              r="100" 
              fill="url(#eduBlueGlow)"
              className="transition-all duration-1200 ease-out"
            />
            
            <circle 
              cx={`${75 + mousePosition.x * 10}%`} 
              cy={`${70 + mousePosition.y * 10}%`} 
              r="80" 
              fill="url(#eduPurpleGlow)"
              className="transition-all duration-1000 ease-out"
            />
            
            <polygon 
              points={`${25 + mousePosition.x * 12},${10 + mousePosition.y * 8} ${45 + mousePosition.x * 12},${20 + mousePosition.y * 8} ${15 + mousePosition.x * 12},${35 + mousePosition.y * 8}`}
              fill="rgba(59, 130, 246, 0.08)" 
              stroke="rgba(59, 130, 246, 0.20)" 
              strokeWidth="1.5"
              className="transition-all duration-800 ease-out"
            />
            
            <rect 
              x={`${60 + mousePosition.x * 15}%`} 
              y={`${80 + mousePosition.y * 10}%`} 
              width="80" 
              height="80" 
              fill="rgba(147, 51, 234, 0.06)" 
              stroke="rgba(147, 51, 234, 0.15)" 
              strokeWidth="1.5"
              rx="15"
              transform={`rotate(${mousePosition.x * 25} ${60 + mousePosition.x * 15}% ${80 + mousePosition.y * 10}%)`}
              className="transition-all duration-1100 ease-out"
            />
            
            <path 
              d={`M${10 + mousePosition.x * 8}%,${60 + mousePosition.y * 12}% Q${30 + mousePosition.x * 8}%,${40 + mousePosition.y * 12}% ${50 + mousePosition.x * 8}%,${65 + mousePosition.y * 12}%`}
              fill="none" 
              stroke="rgba(236, 72, 153, 0.15)" 
              strokeWidth="2"
              className="transition-all duration-900 ease-out"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 mb-4 relative">
            Education Background
            <div className="absolute -top-2 -right-6 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Building strong foundations through quality education and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educationData.map((edu, index) => {
            const isExpanded = expandedCard === edu.id;
            
            return (
              <div 
                key={edu.id}
                className={`transform transition-all duration-700 ${
                  isLoaded 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${300 + (index * 200)}ms` }}
              >
                <div className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg hover:shadow-xl hover:shadow-blue-100/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] ${isExpanded ? 'ring-2 ring-blue-200/50' : ''}`}>
                  
                  <button 
                    onClick={() => toggleExpand(edu.id)}
                    className="w-full p-8 text-left focus:outline-none transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      {/* Enhanced Icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${edu.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                          {edu.icon}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${edu.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${edu.color} shadow-sm`}>
                                <Trophy className="w-3 h-3" />
                                {edu.type}
                              </span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors duration-300 mb-2">
                              {edu.degree}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <p className="text-slate-600 font-semibold truncate">
                                {edu.shortName}
                              </p>
                              {edu.website !== "#" && (
                                <a 
                                  href={edu.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-700 hover:scale-110 transition-all duration-300"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                            
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                              {edu.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 text-blue-700 rounded-xl text-sm font-medium">
                              <Calendar className="w-3.5 h-3.5" />
                              {edu.duration}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50/70 text-purple-700 rounded-xl text-sm font-medium">
                              <MapPin className="w-3.5 h-3.5" />
                              {edu.location}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50/70 text-green-700 rounded-xl text-sm font-medium">
                              <Star className="w-3.5 h-3.5" />
                              {edu.grade}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                      }`}>
                        <div className="w-10 h-10 rounded-full bg-slate-100/50 group-hover:bg-blue-100/50 flex items-center justify-center transition-colors duration-300">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <div className={`transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-8 pb-8 border-t border-slate-100/50">
                      <div className="pt-6 space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            Key Highlights
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {edu.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-slate-600 bg-slate-50/80 px-3 py-2 rounded-xl">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                                <span className="text-sm font-medium">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Decorative element */}
                        <div className="flex justify-center pt-4">
                          <div className={`w-20 h-1 bg-gradient-to-r ${edu.color} rounded-full opacity-60`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`w-3 h-3 bg-gradient-to-r ${edu.color} rounded-full animate-pulse`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}