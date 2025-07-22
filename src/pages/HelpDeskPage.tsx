import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';
import { ArrowLeft, HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const HelpDeskPage: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageWrapper className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
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
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Help Desk & Support</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Get assistance with IT issues, submit tickets, and access support resources
            </p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Help Desk System Coming Soon</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We're developing a comprehensive support system for IT requests, 
                troubleshooting guides, and team assistance.
              </p>
              
              {/* Preview Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 w-full">
                <div className="p-4 border rounded-lg">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Ticket System</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Submit and track support requests</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Live Support</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Chat with support team</p>
                </div>
                <div className="p-4 border rounded-lg sm:col-span-2 lg:col-span-1">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Knowledge Base</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Self-service help articles</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    </div>
  );
};
