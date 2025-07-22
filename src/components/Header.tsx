import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFocusMode } from '@/contexts/FocusModeContext';
import { currentUser } from '@/data/mockData';
import { getTimeBasedGreeting } from '@/lib/utils';
import { 
  Focus, 
  Eye, 
  Home, 
  FolderOpen, 
  Users, 
  Calendar, 
  Heart, 
  Megaphone, 
  BarChart3, 
  FileText, 
  HelpCircle, 
  Clock,
  ChevronDown,
  Building2,
  Settings
} from 'lucide-react';
import { type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Profile } from './Profile';
import { GlobalSearch } from './GlobalSearch';

export const Header: FC = () => {
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const location = useLocation();
  const greeting = getTimeBasedGreeting();

  // Core navigation items (most important - always visible)
  const coreNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
  ];

  // People & Communication group
  const peopleNavItems = [
    { path: '/employees', label: 'Employees', icon: Users },
    { path: '/kudos', label: 'Kudos', icon: Heart },
    { path: '/announcements', label: 'Announcements', icon: Megaphone },
  ];

  // Workspace & Tools group
  const workspaceNavItems = [
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/resources', label: 'Resources', icon: FileText },
  ];

  // Support & Settings group  
  const supportNavItems = [
    { path: '/time-off', label: 'Time Off', icon: Clock },
    { path: '/help-desk', label: 'Help Desk', icon: HelpCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                N
              </div>
              <span className="font-semibold text-lg">Nexus</span>
            </Link>
            <div className="hidden sm:block">
              <span className="text-lg font-medium text-muted-foreground">
                {greeting}, {currentUser.name}! 👋
              </span>
            </div>
          </div>
          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <GlobalSearch />
            </div>
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
      </header>

      {/* Navigation Bar */}
      <div className="sticky top-16 z-40 w-full bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2">
            {/* Main Navigation - Cleaner with dropdowns */}
            <nav className="flex items-center gap-3">
              {/* Core Items - Always visible */}
              {coreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}

              {/* People & Communication Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      peopleNavItems.some(item => location.pathname === item.path)
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="hidden sm:inline">People</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {peopleNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 w-full"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Workspace & Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      workspaceNavItems.some(item => location.pathname === item.path)
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Tools</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {workspaceNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 w-full"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Support & Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      supportNavItems.some(item => location.pathname === item.path)
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Support</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {supportNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center gap-2 w-full"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile greeting */}
      <div className="sm:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-3 pt-3 bg-background border-b">
        <p className="text-sm text-muted-foreground">
          {greeting}, {currentUser.name}! 👋
        </p>
      </div>
    </>
  );
};
