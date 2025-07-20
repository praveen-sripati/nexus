import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { PageWrapper, PageSection } from '@/components/PageWrapper';
import { announcements, type Announcement } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { AlertCircle, Info, Megaphone, ArrowLeft, Search, Filter } from 'lucide-react';
import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

const getPriorityIcon = (priority: Announcement['priority']) => {
  switch (priority) {
    case 'high':
      return <AlertCircle className="h-4 w-4" />;
    case 'medium':
      return <Megaphone className="h-4 w-4" />;
    case 'low':
      return <Info className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: Announcement['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-destructive bg-destructive/5 dark:bg-red-500/10 border-destructive/20 dark:border-red-500/30';
    case 'medium':
      return 'text-foreground bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 dark:border-amber-500/30';
    case 'low':
      return 'text-muted-foreground bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 dark:border-emerald-500/30';
    default:
      return 'text-muted-foreground bg-muted/50 border-border';
  }
};

export const CompanyAnnouncementsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Filter announcements based on search and priority
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageWrapper className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
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
            <h1 className="text-2xl font-bold tracking-tight">Company Announcements</h1>
            <p className="text-muted-foreground">
              Official company-wide news and important updates
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mb-6 gap-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Priority Filter */}
              <div className="sm:w-48">
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">No announcements found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement, index) => (
              <PageSection key={announcement.id} index={index}>
                <div 
                  className={`p-6 rounded-lg border ${getPriorityColor(announcement.priority)}`}
                >
                  <div className="flex items-start gap-4">
                  <div className={`mt-1 ${announcement.priority === 'high' ? 'text-red-600' : announcement.priority === 'medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {getPriorityIcon(announcement.priority)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium leading-none text-foreground">{announcement.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatRelativeTime(announcement.date)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {announcement.body}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={announcement.priority === 'high' ? 'destructive' : 'outline'}
                        className={
                          announcement.priority === 'high' 
                            ? ''
                            : announcement.priority === 'medium'
                            ? 'border-yellow-600 bg-yellow-50 text-yellow-700 dark:border-yellow-300 dark:bg-yellow-100 dark:text-yellow-800'
                            : 'border-green-600 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-100 dark:text-green-800'
                        }
                      >
                        {announcement.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  </div>
                </div>
              </PageSection>
            ))
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredAnnouncements.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" disabled>
              Load More Announcements
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              All announcements loaded
            </p>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};
