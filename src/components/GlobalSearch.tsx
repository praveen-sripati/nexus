import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Command } from 'lucide-react';
import { useState, useEffect, type FC } from 'react';

export const GlobalSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
    // This could search across:
    // - Employees
    // - Documents
    // - Announcements
    // - Quick Links
    // - Calendar events
    // - Kudos
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
      setIsOpen(false);
      setSearchQuery('');
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
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Nexus</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees, documents, announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            
            {/* Search Results Placeholder */}
            <div className="min-h-[200px] space-y-2">
              {searchQuery ? (
                <div className="text-center text-muted-foreground py-8">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Search results for "{searchQuery}" will appear here</p>
                  <p className="text-xs mt-1">
                    This will search across employees, documents, announcements, and more
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                        <Search className="h-4 w-4" />
                        <span className="text-sm">Search employees</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                        <Search className="h-4 w-4" />
                        <span className="text-sm">Search documents</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                        <Search className="h-4 w-4" />
                        <span className="text-sm">Search announcements</span>
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
              )}
            </div>
          </form>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground border-t pt-3">
            <span>Press Enter to search</span>
            <span>Press Esc to close</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
