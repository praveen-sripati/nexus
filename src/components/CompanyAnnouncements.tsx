import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { announcements, type Announcement } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { AlertCircle, Info, Megaphone, ExternalLink } from 'lucide-react';
import { type FC } from 'react';
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

export const CompanyAnnouncements: FC = () => {
  // Show only first 3 announcements on dashboard
  const displayAnnouncements = announcements.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Company Announcements</CardTitle>
          <CardDescription>
            Official company-wide news and important updates
          </CardDescription>
        </div>
        <Link to="/announcements">
          <Button variant="outline" size="sm" className="gap-2">
            View All
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAnnouncements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`p-4 rounded-lg border ${getPriorityColor(announcement.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${announcement.priority === 'high' ? 'text-red-600' : announcement.priority === 'medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium leading-none text-foreground">{announcement.title}</h4>
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
          ))}
          
          {/* Show remaining count if there are more announcements */}
          {announcements.length > 3 && (
            <div className="pt-2 border-t">
              <Link to="/announcements">
                <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                  <span>View {announcements.length - 3} more announcements</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
