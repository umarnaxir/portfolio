'use client';
import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, Award, Code, Search, Palette, Users, ChevronDown, ChevronUp } from "lucide-react";

export default function Experience() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const experiences = [
    {
      id: 1,
      company: "Harmukh Technologies (OPC) Pvt Ltd",
      role: "Frontend Developer",
      type: "Full-time",
      duration: "Jul 2024 - Present",
      location: "Srinagar, J&K (On-site)",
      current: true,
      skills: ["HTML", "CSS","Tailwind", "JavaScript", "React", "Next", "TypeScript","SEO", "More.." ],
      description: "Developing responsive, user-friendly websites and implementing advanced SEO strategies to enhance online visibility.",
      icon: <Code className="w-4 h-4" />
    },
    {
      id: 2,
      company: "NexGen Developers",
      role: "Founder & CEO",
      type: "Freelance",
      duration: "Jan 2025 - Present",
      location: "Remote",
      current: true,
      skills: ["Leadership", "Business Development", "Full-Stack Development", "Client Relations"],
      description: "Leading a development agency focused on delivering innovative digital solutions to clients worldwide.",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 3,
      company: "Digitlia",
      role: "Frontend Developer",
      type: "Full-time",
      duration: "Feb 2025 - Present",
      location: "Quebec, Canada (Remote)",
      current: true,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description: "Developing modern web applications with focus on performance and user experience.",
      icon: <Code className="w-4 h-4" />
    },
    {
      id: 4,
      company: "The Digital London | AIIoTS Geek World",
      role: "ML Internship",
      type: "Trainee",
      duration: "Apr 2024 - Sep 2024",
      location: "Srinagar, J&K",
      current: false,
      skills: ["Machine Learning", "Python", "Data Analysis", "AI Development"],
      description: "Gained hands-on experience in machine learning algorithms and AI development practices. Worked on various projects including predictive modeling, natural language processing, and computer vision applications. Collaborated with a team to develop AI solutions for real-world problems.",
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 5,
      company: "AI-mployed",
      role: "SEO Executive | Graphic Designer | Social Media Manager",
      type: "Part-time",
      duration: "Oct 2023 - Sep 2024",
      location: "Michigan, United States",
      current: false,
      skills: ["SEO", "Graphic Design", "Social Media Marketing", "Content Creation"],
      description: "Managed multi-faceted digital marketing campaigns, combining technical SEO with creative design and social media strategy.",
      icon: <Palette className="w-4 h-4" />
    },
    {
      id: 6,
      company: "Harmukh Technologies (OPC) Pvt Ltd",
      role: "Web Development & SEO Internship",
      type: "Internship",
      duration: "Jan 2024 - Jun 2024",
      location: "Hybrid",
      current: false,
      skills: ["HTML", "CSS", "JavaScript", "SEO", "WordPress", "Google Analytics"],
      description: "Completed comprehensive training in web development and search engine optimization techniques.",
      icon: <Search className="w-4 h-4" />
    }
  ];

  const stats = [
    { label: "Years of Experience", value: "2+", icon: <Calendar className="w-4 h-4" /> },
    { label: "Companies Worked", value: "4+", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Projects Completed", value: "50+", icon: <Award className="w-4 h-4" /> },
    { label: "Technologies Mastered", value: "15+", icon: <Code className="w-4 h-4" /> }
  ];

  // Show only first 2 experiences initially (Digitlia and NexGen Developers)
  const visibleExperiences = showAllExperiences ? experiences : experiences.slice(0, 2);
  const hiddenExperiencesCount = experiences.length - 2;

  return (
    <section id="experience" className="py-8 px-6 bg-gray-50 relative overflow-hidden sm:py-12 sm:px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-5 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-5 w-48 h-48 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent sm:text-4xl">
            Experience & Expertise
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed sm:text-base">
            Over 2 years of experience in Front-End Development, SEO, Digital Marketing, and Graphic Design, with a strong academic foundation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2 mx-auto">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-800 mb-1 sm:text-2xl">{stat.value}</div>
                <div className="text-xs text-gray-600 sm:text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-gray-300 sm:left-8"></div>

          <div className="space-y-6">
            {visibleExperiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start gap-4 group">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-lg border-2 ${
                  exp.current 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-white shadow-md' 
                    : 'bg-white border-gray-300'
                } transition-all duration-300 group-hover:scale-105 sm:w-14 sm:h-14`}>
                  <div className={exp.current ? 'text-white' : 'text-gray-500'}>
                    {exp.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white/90 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-800 sm:text-xl">{exp.role}</h3>
                          {exp.current && (
                            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-blue-600 mb-1 sm:text-base">{exp.company}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed sm:text-sm">
                          {exp.description}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs font-medium sm:text-sm">{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{exp.location}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium w-fit">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-blue-50 text-gray-700 px-2 py-0.5 rounded-md text-xs font-medium border border-blue-100 hover:border-blue-300 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Read More/Less Button */}
          {hiddenExperiencesCount > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllExperiences(!showAllExperiences)}
                className="inline-flex items-center gap-2 bg-white/90 hover:bg-white border border-gray-200 hover:border-blue-300 px-6 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {showAllExperiences ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>View {hiddenExperiencesCount} More Experience{hiddenExperiencesCount > 1 ? 's' : ''}</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}