import { type FC, type ReactNode, createContext, useContext } from 'react';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

interface AnimationContextType {
  getItemStyle: (index: number) => React.CSSProperties;
  getItemClassName: (baseClasses?: string) => string;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const PageWrapper: FC<PageWrapperProps> = ({ children, className = '' }) => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation({
    staggerDelay: 50,
    duration: 600
  });

  return (
    <AnimationContext.Provider value={{ getItemStyle, getItemClassName }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
};

interface PageSectionProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export const PageSection: FC<PageSectionProps> = ({ children, index, className = '' }) => {
  const context = useContext(AnimationContext);
  
  if (!context) {
    throw new Error('PageSection must be used within a PageWrapper');
  }
  
  const { getItemStyle, getItemClassName } = context;

  return (
    <div 
      style={getItemStyle(index)}
      className={getItemClassName(className)}
    >
      {children}
    </div>
  );
};
