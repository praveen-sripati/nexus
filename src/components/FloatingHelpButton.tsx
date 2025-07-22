import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { helpdeskTickets } from '@/data/mockData';
import { 
  MessageSquare, 
  Phone, 
  FileText, 
  Plus,
  AlertCircle,
  X,
  Headphones
} from 'lucide-react';
import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

export const FloatingHelpButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const openTickets = helpdeskTickets.filter(t => t.status === 'open' || t.status === 'in-progress').length;
  const hasOpenTickets = openTickets > 0;

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTooltipOpen(false); // Hide tooltip when dialog opens
    }
  };

  const handleButtonClick = () => {
    setTooltipOpen(false); // Immediately hide tooltip on click
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-14 w-14 rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-gray-600 hover:text-gray-700 hover:-translate-y-1 hover:scale-105"
                onClick={handleButtonClick}
              >
                <Headphones size={24} style={{ width: '24px', height: '24px' }} className="text-gray-600" />
                {/* Notification Badge */}
                {hasOpenTickets && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{openTickets}</span>
                  </div>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Help & Support</p>
            </TooltipContent>
          </Tooltip>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Help & Support
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Quick Stats */}
              {hasOpenTickets && (
                <Card className="bg-blue-50 border-blue-200 p-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          You have {openTickets} active ticket{openTickets !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-blue-700">
                          Click "My Tickets" to view details
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <div className="grid gap-3">
                <Link to="/help-desk?action=create" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Plus className="h-4 w-4 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">Create New Ticket</p>
                      <p className="text-xs text-muted-foreground">Report an issue or request help</p>
                    </div>
                  </Button>
                </Link>

                <Link to="/help-desk?tab=tickets" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">My Tickets</p>
                      <p className="text-xs text-muted-foreground">View and track your support requests</p>
                    </div>
                  </Button>
                </Link>

                <Link to="/help-desk?tab=knowledge" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium">Knowledge Base</p>
                      <p className="text-xs text-muted-foreground">Browse help articles and guides</p>
                    </div>
                  </Button>
                </Link>
              </div>

              {/* Emergency Contact */}
              <Card className="bg-red-50 border-red-200 p-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-900">
                        Emergency Support
                      </p>
                      <p className="text-xs text-red-700">
                        Critical issues: +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Close Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
