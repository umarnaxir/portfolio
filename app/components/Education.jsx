'use client';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Star, 
  ChevronDown,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Education() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const educationData = [
    {
      id: 1,
      degree: "Computer Science Engineering",
      institution: "Government College of Engineering & Technology (GCET Kashmir)",
      duration: "2020 - 2024",
      location: "Srinagar, J&K",
      description: "Completed a comprehensive four-year Bachelor's program in Computer Science and Engineering from one of Kashmir's premier technical institutions. The curriculum covered advanced software development, data structures and algorithms, system design, database management, computer networks, artificial intelligence, and emerging technologies. The program emphasized both theoretical foundations and practical implementation through industry-relevant projects, internships, and hands-on laboratory work.",
      detailedInfo: "GCET Kashmir is a leading government engineering college established to provide quality technical education in the Kashmir valley. The institution is known for its experienced faculty, modern infrastructure, well-equipped laboratories, and strong industry connections. The Computer Science program maintains high academic standards with regular industry interactions, workshops, and placement opportunities with top tech companies.",
      icon: <GraduationCap className="w-7 h-7" />,
      color: "from-blue-500 to-indigo-600",
      grade: "First Class with Distinction",
      website: "https://gcetkashmir.ac.in/",
      institutionType: "Engineering College"
    },
    {
      id: 2,
      degree: "Higher Secondary Education",
      institution: "Government Higher Secondary School Pehlipora",
      duration: "2018 - 2020",
      location: "Baramulla, J&K",
      description: "Completed Higher Secondary Education in Science stream with comprehensive study of Physics, Chemistry, Mathematics, and English. The two-year program provided strong analytical and problem-solving foundations essential for engineering studies. Achieved excellent academic performance while developing critical thinking skills and scientific temperament through laboratory work, project-based learning, and competitive examinations preparation.",
      detailedInfo: "GHSS Pehlipora is a well-established government institution in Baramulla district, known for maintaining high academic standards and producing students who excel in various fields. The school provides quality education with experienced teachers, well-equipped science laboratories, and a supportive learning environment. The Science stream program is particularly recognized for preparing students for competitive entrance examinations and higher education in technical fields.",
      icon: <BookOpen className="w-7 h-7" />,
      color: "from-purple-500 to-pink-600",
      grade: "Science Stream - Distinction",
      website: "https://www.google.com/search?q=government+higher+secondary+school+pahlipora",
      institutionType: "Higher Secondary School"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header with Enhanced Animations */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-800 relative">
              Education
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </h2>
            {/* Animated underline */}
            <div className={`h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 delay-300 ${
              isLoaded ? 'w-full' : 'w-0'
            }`}></div>
          </div>
          <p className={`text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Academic foundation in computer science and engineering
            <span className="inline-block ml-2 animate-pulse">✨</span>
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
                style={{ transitionDelay: `${800 + (index * 200)}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl overflow-hidden relative group transition-all duration-500 hover:scale-[1.02]">
                  
                  <button 
                    onClick={() => toggleExpand(edu.id)}
                    className="w-full p-8 text-left focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      {/* Enhanced Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${edu.color} text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                          {edu.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-4">
                          <div className="space-y-3">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2">
                              <p className="text-base sm:text-lg font-semibold text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {edu.institution}
                              </p>
                              <a 
                                href={edu.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${edu.color} shadow-md hover:shadow-lg transition-shadow duration-300`}>
                                <Star className="w-4 h-4" />
                                {edu.grade}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100/80 px-4 py-2 rounded-xl hover:bg-gray-200/80 transition-colors duration-300">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{edu.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100/80 px-4 py-2 rounded-xl hover:bg-gray-200/80 transition-colors duration-300">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">{edu.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Arrow */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        isExpanded ? 'rotate-180 text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`}>
                        <div className="w-8 h-8 rounded-full bg-gray-100/50 flex items-center justify-center group-hover:bg-blue-100/50 transition-colors duration-300">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Enhanced Expanded Content */}
                  <div className={`transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-8 pb-8 border-t border-gray-100/50">
                      <div className="pt-6 space-y-6">
                        <div className="relative">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Course Overview</h4>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                        
                        <div className="relative">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">About {edu.institutionType}</h4>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {edu.detailedInfo}
                          </p>
                        </div>

                        {/* Enhanced decorative elements */}
                        <div className="flex justify-center pt-4">
                          <div className={`w-16 h-1 bg-gradient-to-r ${edu.color} rounded-full opacity-60`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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
      `}</style>
    </section>
  );
}