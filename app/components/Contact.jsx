"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  MessageCircle,
  User,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out",
      disable: "mobile",
      offset: 50,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "erumarnazir@gmail.com",
          subject: `New Contact Form Submission from ${formData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #333; text-align: center; margin-bottom: 20px;">New Contact Form Submission</h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Contact Number:</strong> ${
                  formData.contact || "Not provided"
                }</p>
              </div>
              <div style="background-color: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 6px;">
                <h3 style="color: #495057; margin-top: 0;">Message:</h3>
                <p style="line-height: 1.5; color: #6c757d;">${
                  formData.message
                }</p>
              </div>
              <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                <p style="color: #6c757d; font-size: 12px;">Sent from portfolio contact form.</p>
              </div>
            </div>
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", contact: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setError(
        "Failed to send message. Please try again or contact me directly at erumarnazir@gmail.com or call +917051732616."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7051732616",
      href: "tel:+917051732616",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      label: "Email",
      value: "erumarnazir@gmail.com",
      href: "mailto:erumarnazir@gmail.com",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kashmir, India",
      href: "#",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/umarnaxir",
      iconFill: "#333333",
      color: "hover:bg-gray-100",
      label: "GitHub",
      svgPath:
        "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.287-.01-1.045-.015-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.404c1.02.005 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.82 1.1.82 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.698.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z",
    },
    {
      href: "https://www.linkedin.com/in/umar-nazir19/",
      iconFill: "#0077B5",
      color: "hover:bg-blue-50",
      label: "LinkedIn",
      svgPath:
        "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.75h4v12.5H3V8.75zm7.5 0H15v1.71h.06c.49-.93 1.68-1.9 3.44-1.9 3.68 0 4.5 2.42 4.5 5.56v6.63h-4V14.4c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2v7H10.5V8.75z",
    },
    {
      href: "https://www.instagram.com/umar_naxir/",
      iconFill: "#E1306C",
      color: "hover:bg-pink-50",
      label: "Instagram",
      svgPath:
        "M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75a3.75 3.75 0 0 1 3.75-3.75h8.5A3.75 3.75 0 0 1 20 7.75v8.5a3.75 3.75 0 0 1-3.75 3.75h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
    },
    {
      href: "https://wa.me/qr/JXOWE54MG6HWN1",
      iconFill: "#075b26",
      color: "hover:bg-green-50",
      label: "WhatsApp",
      svgPath:
        "M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.35.01 11.98c0 2.11.56 4.17 1.63 6.01L0 24l6.19-1.63A11.96 11.96 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.21-3.48-8.52zM12 22c-1.7 0-3.37-.43-4.84-1.25l-.34-.18-3.67.97.98-3.57-.22-.36A9.94 9.94 0 0 1 2 11.98C2 6.46 6.46 2 12 2s10 4.46 10 9.98c0 5.53-4.46 10-10 10zm5.04-7.24c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.6.14-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.55.13-.13.29-.34.43-.51.15-.17.2-.29.3-.48.1-.2.05-.37-.03-.51-.08-.14-.6-1.44-.82-1.97-.22-.53-.45-.46-.6-.47-.16 0-.33-.01-.5-.01-.17 0-.45.06-.69.28-.24.21-.9.87-.9 2.12 0 1.25.92 2.45 1.05 2.62.13.17 1.8 2.74 4.37 3.84.61.26 1.09.41 1.46.52.61.19 1.17.16 1.61.1.49-.07 1.6-.65 1.82-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.19-.52-.34z",
    },
  ];

  return (
    <section
      id="contact"
      className="py-4 px-6 bg-gray-50 relative overflow-hidden sm:py-12 sm:px-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-200 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8" data-aos="fade-up">
          <div className="inline-flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full text-blue-800 text-xs font-medium border border-blue-100 mb-4">
            <Sparkles className="w-3 h-3" />
            Get In Touch
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:text-4xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed sm:text-base">
            Ready to bring your ideas to life? Let's discuss your project.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div data-aos="fade-right">
            <div className="bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-md sm:p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2 sm:text-2xl">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Send Message
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed sm:text-sm">
                  I'll respond within 24 hours.
                </p>
              </div>

              {submitted && (
                <div
                  className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg"
                  data-aos="fade-in"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Message sent!</p>
                      <p className="text-xs opacity-80">
                        Thank you for your message, I will be in touch shortly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div
                  className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg"
                  data-aos="fade-in"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Error</p>
                      <p className="text-xs opacity-80">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="contact"
                    className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm"
                  >
                    Contact
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="contact"
                      id="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                      placeholder="Your contact number"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white text-sm sm:text-base resize-none"
                      placeholder="Your project details..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="space-y-6">
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all sm:p-5"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <a href={info.href} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                          {info.label}
                        </h4>
                        <p className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors sm:text-sm">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-gray-100 shadow-md sm:p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-4 text-center sm:text-xl">
                  Follow Me
                </h4>
                <div className="flex justify-center gap-3">
                  {socialLinks.map(
                    ({ href, iconFill, color, label, svgPath }, idx) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${color} transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-gray-100`}
                        data-aos="zoom-in"
                        data-aos-delay={100 * (idx + 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={iconFill}
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d={svgPath} />
                        </svg>
                      </a>
                    )
                  )}
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-2xl text-white shadow-md"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2 sm:text-xl">
                    Ready to Start?
                  </h4>
                  <p className="text-xs opacity-90 mb-4 leading-relaxed sm:text-sm">
                    Need a website, app, or digital marketing? Let's bring your
                    vision to life!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-yellow-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Let's create something amazing!
                    </span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
