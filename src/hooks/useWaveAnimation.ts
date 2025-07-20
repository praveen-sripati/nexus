import { useEffect, useRef, useState } from 'react';

interface UseWaveAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  duration?: number;
}

export const useWaveAnimation = (options: UseWaveAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    staggerDelay = 50,
    duration = 500
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once animation is triggered
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getItemStyle = (index: number) => ({
    transitionDelay: `${index * staggerDelay}ms`,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  });

  const getItemClassName = (baseClasses: string = '') => 
    `${baseClasses} transition-all transform ${
      isVisible 
        ? 'translate-y-0 opacity-100 scale-100' 
        : 'translate-y-8 opacity-0 scale-95'
    }`;

  return {
    isVisible,
    containerRef,
    getItemStyle,
    getItemClassName
  };
};
