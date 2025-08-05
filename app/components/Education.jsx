'use client';
import { GraduationCap, Calendar, MapPin, BookOpen, Star, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";

export default function Education() {
  const [expandedCard, setExpandedCard] = useState(null);

  const educationData = [
    {
      id: 1,
      degree: "B.Tech in Computer Science",
      institution: "GCET Kashmir",
      duration: "2020 - 2024",
      location: "Srinagar, J&K",
      description: "Specialized in software development, algorithms, and system design with hands-on project experience.",
      highlights: [
        "Software Development & Engineering",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Computer Networks & Security"
      ],
      skills: ["Java", "Python", "C++", "React", "Node.js", "SQL", "Git"],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      degree: "Higher Secondary (Science)",
      institution: "GHSS Pehlipora",
      duration: "2018 - 2020",
      location: "Baramulla, J&K",
      description: "Focused on Physics, Chemistry, and Mathematics with strong analytical training.",
      highlights: [
        "Advanced Mathematics",
        "Physics & Chemistry",
        "Problem Solving Skills",
        "Competitive Exam Preparation"
      ],
      skills: ["Mathematics", "Physics", "Chemistry", "Analytical Thinking"],
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-green-500 to-blue-500"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="education" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 mb-4 shadow-sm hover:shadow-md transition-shadow"> */}
            {/* <GraduationCap className="w-4 h-4 text-indigo-600" /> */}
            {/* <span className="text-sm font-medium text-gray-700">Education</span> */}
          {/* </div> */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
            Academic Background
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            My formal education journey in computer science and foundational sciences
          </p>
        </div>

        <div className="space-y-6">
          {educationData.map((edu) => (
            <div 
              key={edu.id} 
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 ${expandedCard === edu.id ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
            >
              <button 
                onClick={() => toggleExpand(edu.id)}
                className="w-full p-6 text-left focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${edu.color}`}>
                    <div className="text-white">{edu.icon}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-400">
                    {expandedCard === edu.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {expandedCard === edu.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 animate-fadeIn">
                  <p className="text-gray-600 mb-4">{edu.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      Skills Gained
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}