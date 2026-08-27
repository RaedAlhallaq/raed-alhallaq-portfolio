import React, { useEffect, useState } from 'react';

export const SpotlightCursor = ({ isDark }) => {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: isDark
          ? `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.07), transparent 80%)`
          : `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.05), transparent 80%)`
      }}
    />
  );
};
