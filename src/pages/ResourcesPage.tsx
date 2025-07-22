import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';
import { ArrowLeft, FileText, BookOpen, Download, Search } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const ResourcesPage: FC = () => {
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
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Company Resources & Documents</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Access company policies, documents, templates, and resources
            </p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Document Library Coming Soon</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We're building a comprehensive resource center with company documents, 
                policies, templates, and training materials.
              </p>
              
              {/* Preview Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 w-full">
                <div className="p-4 border rounded-lg">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Policy Documents</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">HR policies and procedures</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Templates</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Forms and document templates</p>
                </div>
                <div className="p-4 border rounded-lg sm:col-span-2 lg:col-span-1">
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-sm sm:text-base">Smart Search</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Find documents instantly</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    </div>
  );
};
