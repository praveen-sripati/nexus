import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get time-based greeting
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
};

// Format date for calendar events
export const formatEventDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  const diffInDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays < 7) return `In ${diffInDays} days`;
  
  return date.toLocaleDateString();
};

// LocalStorage utilities
export const storage = {
  // Check if user has been onboarded
  isOnboarded: (): boolean => {
    return localStorage.getItem('nexus-onboarded') === 'true';
  },
  
  // Mark user as onboarded
  setOnboarded: (): void => {
    localStorage.setItem('nexus-onboarded', 'true');
  },
  
  // Get user's quick links
  getQuickLinks: () => {
    const links = localStorage.getItem('nexus-quick-links');
    return links ? JSON.parse(links) : [];
  },
  
  // Save user's quick links
  setQuickLinks: (links: any[]) => {
    localStorage.setItem('nexus-quick-links', JSON.stringify(links));
  },
  
  // Get focus mode state
  getFocusMode: (): boolean => {
    return localStorage.getItem('nexus-focus-mode') === 'true';
  },
  
  // Set focus mode state
  setFocusMode: (enabled: boolean): void => {
    localStorage.setItem('nexus-focus-mode', enabled.toString());
  }
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
