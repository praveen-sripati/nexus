import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { kudos as initialKudos, currentUser, type Kudo } from '@/data/mockData';
import { formatRelativeTime, generateId } from '@/lib/utils';
import { Heart, Plus } from 'lucide-react';
import { useState, type FC } from 'react';

export const KudosFeed: FC = () => {
  const [kudosList, setKudosList] = useState<Kudo[]>(initialKudos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newKudoTo, setNewKudoTo] = useState('');
  const [newKudoMessage, setNewKudoMessage] = useState('');

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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Kudos & Shout-Outs
          </CardTitle>
          <CardDescription>
            Recognize and celebrate your colleagues
          </CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
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
      </CardHeader>
      <CardContent>
        {kudosList.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No kudos yet.</p>
            <p className="text-xs mt-1">Be the first to recognize a colleague!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {kudosList.map((kudo) => (
              <div 
                key={kudo.id} 
                className="p-4 rounded-lg border bg-gradient-to-r from-rose-500/5 to-pink-500/5 border-rose-500/20"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-600 dark:text-red-400">
                    <Heart className="h-4 w-4 fill-current" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
