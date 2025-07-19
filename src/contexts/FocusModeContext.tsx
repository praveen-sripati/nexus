import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { storage } from '@/lib/utils';

interface FocusModeContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextType | undefined>(undefined);

export const useFocusMode = () => {
  const context = useContext(FocusModeContext);
  if (context === undefined) {
    throw new Error('useFocusMode must be used within a FocusModeProvider');
  }
  return context;
};

interface FocusModeProviderProps {
  children: ReactNode;
}

export const FocusModeProvider: FC<FocusModeProviderProps> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(() => storage.getFocusMode());

  const toggleFocusMode = () => {
    const newFocusMode = !isFocusMode;
    setIsFocusMode(newFocusMode);
    storage.setFocusMode(newFocusMode);
  };

  useEffect(() => {
    // Listen for focus mode changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nexus-focus-mode') {
        setIsFocusMode(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
};
