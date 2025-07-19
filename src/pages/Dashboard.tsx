import { CompanyAnnouncements } from '@/components/CompanyAnnouncements';
import { ForYouFeed } from '@/components/ForYouFeed';
import { Header } from '@/components/Header';
import { QuickLinks } from '@/components/QuickLinks';
import { WelcomeChecklist } from '@/components/WelcomeChecklist';
import { useFocusMode } from '@/contexts/FocusModeContext';
import { storage } from '@/lib/utils';
import { useState, useEffect, type FC } from 'react';

export const Dashboard: FC = () => {
  const { isFocusMode } = useFocusMode();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user needs onboarding
    setShowWelcome(!storage.isOnboarded());
  }, []);

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid gap-4 sm:gap-6 transition-all duration-300 ${
          isFocusMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'
        }`}>
          {/* Main Content - Left Column */}
          <div className={`space-y-4 sm:space-y-6 ${
            isFocusMode ? 'col-span-1' : 'lg:col-span-3'
          }`}>
            <ForYouFeed />
            <CompanyAnnouncements />
            
            {/* These sections are hidden in focus mode */}
            {!isFocusMode && (
              <>
                {/* Additional content sections can go here */}
              </>
            )}
          </div>

          {/* Sidebar - Right Column - Hidden in focus mode */}
          {!isFocusMode && (
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Show welcome checklist for new users */}
              {showWelcome && (
                <WelcomeChecklist onDismiss={handleWelcomeDismiss} />
              )}
              
              <QuickLinks />
              
              {/* Team Calendar and Kudos will go here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
