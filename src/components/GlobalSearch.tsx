import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Command } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, type FC } from 'react';
import { SearchService, type SearchResult } from '@/lib/searchService';
import { useNavigate } from 'react-router-dom';

const typeLabels = {
  employee: 'Employee',
  announcement: 'Announcement',
  kudo: 'Kudo',
  event: 'Event',
  feed: 'Feed Item',
  'quick-link': 'Quick Link'
};

const typeIcons = {
  employee: '👤',
  announcement: '📢',
  kudo: '❤️',
  event: '📅',
  feed: '📰',
  'quick-link': '🔗'
};

export const GlobalSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    return SearchService.search(searchQuery);
  }, [searchQuery]);

  const handleResultClick = useCallback((result: SearchResult) => {
    // Navigate to the specific route with search parameters for highlighting
    const searchParams = new URLSearchParams();
    if (result.searchParams) {
      Object.entries(result.searchParams).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
    }
    
    const routeWithParams = result.searchParams 
      ? `${result.route}?${searchParams.toString()}`
      : result.route;
    
    navigate(routeWithParams);
    setIsOpen(false);
    setSearchQuery('');
  }, [navigate]);

  const handleQuickAction = useCallback((type: string) => {
    switch (type) {
      case 'employees':
        navigate('/employees');
        break;
      case 'announcements':
        navigate('/announcements');
        break;
      case 'events':
        navigate('/calendar');
        break;
      case 'kudos':
        navigate('/kudos');
        break;
    }
    setIsOpen(false);
  }, [navigate]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle keyboard navigation within dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex] && searchQuery.trim()) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, handleResultClick, searchQuery]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="h-10 w-48 justify-between text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
        </div>
        <div className="flex items-center gap-1 text-xs bg-muted px-1.5 py-0.5 rounded">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </Button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle>Search Nexus</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col">
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="px-6 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees, announcements, events, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </form>
            
            {/* Results */}
            <div className="max-h-96 overflow-y-auto border-t">
              {searchQuery.trim() === '' ? (
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-1">
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => handleQuickAction('employees')}
                      >
                        <span className="text-lg">👤</span>
                        <span className="text-sm">Search employees</span>
                      </div>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => handleQuickAction('announcements')}
                      >
                        <span className="text-lg">📢</span>
                        <span className="text-sm">Search announcements</span>
                      </div>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => handleQuickAction('events')}
                      >
                        <span className="text-lg">📅</span>
                        <span className="text-sm">Search calendar events</span>
                      </div>
                      <div 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => handleQuickAction('kudos')}
                      >
                        <span className="text-lg">❤️</span>
                        <span className="text-sm">Search kudos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recent Searches</h4>
                    <div className="text-sm text-muted-foreground">
                      No recent searches
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">
                    Try searching for employees, announcements, events, or kudos
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <div
                      key={`${result.type}-${result.id}`}
                      className={`flex items-start px-6 py-3 cursor-pointer hover:bg-accent ${
                        index === selectedIndex ? 'bg-accent' : ''
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="mr-3 mt-0.5 text-lg">
                        {typeIcons[result.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">{result.title}</span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground flex-shrink-0">
                            {typeLabels[result.type]}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {(searchQuery.trim() || results.length > 0) && (
              <div className="border-t px-6 py-3 text-xs text-muted-foreground bg-muted/30 flex justify-between">
                <span>
                  {results.length > 0 ? 'Use ↑↓ to navigate • Enter to select' : 'Type to search'}
                </span>
                <span>Esc to close</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
