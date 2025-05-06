"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeInOnScroll({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
      } ${className}`}
    >
      {children}
    </div>
  );
}
