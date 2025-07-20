import { Button } from '@/components/ui/button';
import { useFocusMode } from '@/contexts/FocusModeContext';
import { currentUser } from '@/data/mockData';
import { getTimeBasedGreeting } from '@/lib/utils';
import { Focus, Eye } from 'lucide-react';
import { type FC } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Profile } from './Profile';

export const Header: FC = () => {
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const greeting = getTimeBasedGreeting();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Left side - Logo and Greeting */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              N
            </div>
            <span className="font-semibold text-lg">Nexus</span>
          </div>
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-medium text-foreground">
              {greeting}, {currentUser.name}! 👋
            </h1>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant={isFocusMode ? "default" : "outline"}
            size="sm"
            onClick={toggleFocusMode}
            className="gap-2 h-10"
          >
            {isFocusMode ? <Eye className="h-4 w-4" /> : <Focus className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {isFocusMode ? 'Exit Focus' : 'Focus Mode'}
            </span>
          </Button>
          <ThemeToggle />
          <Profile />
        </div>
      </div>
      
      {/* Mobile greeting */}
      <div className="sm:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-3">
        <p className="text-sm text-muted-foreground">
          {greeting}, {currentUser.name}! 👋
        </p>
      </div>
    </header>
  );
};
