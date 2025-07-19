import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { defaultQuickLinks, type QuickLink } from '@/data/mockData';
import { generateId, storage } from '@/lib/utils';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect, type FC } from 'react';

export const QuickLinks: FC = () => {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = storage.getQuickLinks();
    if (savedLinks.length === 0) {
      // First time user, use default links
      setLinks(defaultQuickLinks);
      storage.setQuickLinks(defaultQuickLinks);
    } else {
      setLinks(savedLinks);
    }
  }, []);

  const addLink = () => {
    if (!newLinkName.trim() || !newLinkUrl.trim()) return;

    const newLink: QuickLink = {
      id: generateId(),
      name: newLinkName.trim(),
      url: newLinkUrl.trim()
    };

    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    storage.setQuickLinks(updatedLinks);

    // Reset form
    setNewLinkName('');
    setNewLinkUrl('');
    setIsAddDialogOpen(false);
  };

  const removeLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    storage.setQuickLinks(updatedLinks);
  };

  const handleLinkClick = (url: string) => {
    // Ensure URL has protocol
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">My Quick Links</CardTitle>
          <CardDescription>Your most-used tools and resources</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Quick Link</DialogTitle>
              <DialogDescription>
                Add a new link to your quick access list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="e.g., Company Wiki"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="e.g., wiki.company.com"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={addLink}
                disabled={!newLinkName.trim() || !newLinkUrl.trim()}
              >
                Add Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">No quick links yet.</p>
            <p className="text-xs mt-1">Add your most-used tools and resources.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <button
                  onClick={() => handleLinkClick(link.url)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{link.name}</span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLink(link.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
