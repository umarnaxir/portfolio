'use client';

import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Send, MessageCircle, User, Sparkles } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7051732616',
      href: 'tel:+917051732616',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'erumarnazir@gmail.com',
      href: 'mailto:erumarnazir@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kashmir, India',
      href: '#',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const socialLinks = [
    { 
      href: "https://github.com/umarnaxir", 
      iconFill: "#333333", 
      color: "hover:bg-gray-100", 
      label: "GitHub", 
      svgPath: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" 
    },
    { 
      href: "https://www.linkedin.com/in/umar-nazir19/", 
      iconFill: "#0077B5", 
      color: "hover:bg-blue-50", 
      label: "LinkedIn", 
      svgPath: "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2v7H10.5V8.75z" 
    },
    { 
      href: "https://www.instagram.com/umar_naxir/", 
      iconFill: "#E1306C", 
      color: "hover:bg-pink-50", 
      label: "Instagram", 
      svgPath: "M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" 
    },
    { 
      href: "https://wa.me/qr/JXOWE54MG6HWN1", 
      iconFill: "#075b26", 
      color: "hover:bg-green-50", 
      label: "WhatsApp", 
      svgPath: "M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48-8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34-.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13-.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05-.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22-.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01-.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.19-.52-.34z" 
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-800 px-6 py-3 rounded-full text-sm font-medium shadow-lg border border-blue-100 mb-6">
            <Sparkles className="w-4 h-4 animate-spin" />
            Get In Touch
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Let's <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can work together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Form */}
          <div data-aos="fade-right">
            <div className="bg-white/80 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                  Send Message
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl animate-pulse" data-aos="fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm opacity-80">I'll get back to you shortly.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-6 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      id="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Contact Details */}
          <div data-aos="fade-left">
            <div className="space-y-8">
              {/* Contact Information Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <a href={info.href} className="flex items-center gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{info.label}</h4>
                        <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Social Media Section */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Follow Me On
                </h4>
                <div className="flex justify-center gap-4">
                  {socialLinks.map(({ href, iconFill, color, label, svgPath }, idx) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${color} transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 border border-gray-100`}
                      data-aos="zoom-in"
                      data-aos-delay={100 * (idx + 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={iconFill}
                        viewBox="0 0 24 24"
                        className="w-7 h-7"
                      >
                        <path d={svgPath} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote/CTA Card */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-white shadow-2xl" data-aos="fade-up" data-aos-delay="600">
                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-4">Ready to Start?</h4>
                  <p className="text-lg opacity-90 mb-6 leading-relaxed">
                    Whether you need a website, mobile app, or digital marketing solution, 
                    I'm here to help bring your vision to life!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-yellow-300">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-semibold">Let's create something amazing together!</span>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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

export default ContactMe;