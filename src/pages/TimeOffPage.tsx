import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';
import { ArrowLeft, Clock, Calendar, Plane, CheckCircle } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const TimeOffPage: FC = () => {
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
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Request Time Off</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Submit vacation requests, check your balance, and manage time off
            </p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Time Off Management Coming Soon</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We're building a streamlined system for managing vacation requests, 
                sick leave, and time off approvals.
              </p>
              
              {/* Preview Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 w-full">
                <div className="p-4 border rounded-lg">
                  <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Request Vacation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Submit time off requests easily</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Balance Tracking</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Monitor your available days</p>
                </div>
                <div className="p-4 border rounded-lg sm:col-span-2 lg:col-span-1">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Approval Workflow</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Automated approval process</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    </div>
  );
};
