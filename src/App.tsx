import { TooltipProvider } from '@/components/ui/tooltip';
import { type FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { FocusModeProvider } from './contexts/FocusModeContext';
import { Dashboard } from './pages/Dashboard';
import { ForYouPage } from './pages/ForYouPage';
import { CompanyAnnouncementsPage } from './pages/CompanyAnnouncementsPage';
import { KudosFeedPage } from './pages/KudosFeedPage';

const AppRoutes: FC = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard />
        }
      />
      <Route
        path="/for-you"
        element={
          <ForYouPage />
        }
      />
      <Route
        path="/announcements"
        element={
          <CompanyAnnouncementsPage />
        }
      />
      <Route
        path="/kudos"
        element={
          <KudosFeedPage />
        }
      />
    </Routes>
  );
};

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nexus-ui-theme">
      <FocusModeProvider>
        <TooltipProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster />
            </BrowserRouter>
        </TooltipProvider>
      </FocusModeProvider>
    </ThemeProvider>
  );
};

export default App;
