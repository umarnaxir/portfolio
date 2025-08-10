"use client";
import React, { useEffect, useState } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none transition-all duration-200 ease-out hidden md:block ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: 25,
        height: 25,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
};

export default MouseFollower;
