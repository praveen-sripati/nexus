import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/Header';
import { PageWrapper, PageSection } from '@/components/PageWrapper';
import { kudos as initialKudos, currentUser, type Kudo } from '@/data/mockData';
import { formatRelativeTime, generateId } from '@/lib/utils';
import { Heart, Plus, ArrowLeft, Search } from 'lucide-react';
import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

export const KudosFeedPage: FC = () => {
  const [kudosList, setKudosList] = useState<Kudo[]>(initialKudos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newKudoTo, setNewKudoTo] = useState('');
  const [newKudoMessage, setNewKudoMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addKudo = () => {
    if (!newKudoTo.trim() || !newKudoMessage.trim()) return;

    const newKudo: Kudo = {
      id: generateId(),
      from: currentUser.name,
      to: newKudoTo.trim(),
      message: newKudoMessage.trim(),
      timestamp: new Date()
    };

    setKudosList(prev => [newKudo, ...prev]);

    // Reset form
    setNewKudoTo('');
    setNewKudoMessage('');
    setIsAddDialogOpen(false);
  };

  // Filter kudos based on search
  const filteredKudos = kudosList.filter((kudo) => {
    const matchesSearch = kudo.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kudo.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kudo.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageWrapper className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <PageSection index={0}>
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6" />
                <h1 className="text-2xl font-bold tracking-tight">Kudos & Shout-Outs</h1>
              </div>
              <p className="text-muted-foreground">
                Recognize and celebrate your colleagues
              </p>
            </div>
          </div>
        </PageSection>

        {/* Actions & Search Section */}
        <PageSection index={1}>
          <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Actions & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search kudos by name or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Give Kudos Button */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Give Kudos
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Give Kudos</DialogTitle>
                    <DialogDescription>
                      Recognize a colleague for their great work or help.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="to" className="text-right">
                        To
                      </Label>
                      <Input
                        id="to"
                        value={newKudoTo}
                        onChange={(e) => setNewKudoTo(e.target.value)}
                        placeholder="Colleague's name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="message" className="text-right pt-2">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={newKudoMessage}
                        onChange={(e) => setNewKudoMessage(e.target.value)}
                        placeholder="What would you like to recognize them for?"
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={addKudo}
                      disabled={!newKudoTo.trim() || !newKudoMessage.trim()}
                    >
                      Send Kudos
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredKudos.length} of {kudosList.length} kudos
            </div>
          </CardContent>
        </Card>
        </PageSection>

        {/* Kudos Feed */}
        <div className="space-y-4">
          {filteredKudos.length === 0 ? (
            <PageSection index={2}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <h3 className="font-medium">
                      {searchQuery ? 'No kudos found' : 'No kudos yet'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery 
                        ? 'Try adjusting your search criteria'
                        : 'Be the first to recognize a colleague!'
                      }
                    </p>
                    {!searchQuery && (
                      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="mt-4 gap-2">
                            <Plus className="h-4 w-4" />
                            Give First Kudos
                          </Button>
                      </DialogTrigger>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
            </PageSection>
          ) : (
            filteredKudos.map((kudo, index) => (
              <PageSection key={kudo.id} index={index + 2}>
                <div 
                  className="p-6 rounded-lg border bg-gradient-to-r from-rose-500/5 to-pink-500/5 border-rose-500/20 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                  <div className="mt-1 text-red-600 dark:text-red-400">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          <span className="text-red-600 dark:text-red-400">{kudo.from}</span>
                          {' → '}
                          <span className="text-red-600 dark:text-red-400 font-semibold">{kudo.to}</span>
                        </p>
                        <p className="text-sm leading-relaxed text-foreground">
                          {kudo.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatRelativeTime(kudo.timestamp)}
                      </span>
                    </div>
                  </div>
                  </div>
                </div>
              </PageSection>
            ))
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredKudos.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" disabled>
              Load More Kudos
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              All kudos loaded
            </p>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};
