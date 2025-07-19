import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { announcements, type Announcement } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { AlertCircle, Info, Megaphone } from 'lucide-react';
import { type FC } from 'react';

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
      return 'text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800';
    case 'medium':
      return 'text-orange-500 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800';
    case 'low':
      return 'text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800';
    default:
      return 'text-gray-500 border-gray-200 bg-gray-50 dark:bg-gray-950 dark:border-gray-800';
  }
};

export const CompanyAnnouncements: FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Company Announcements</CardTitle>
        <CardDescription>
          Official company-wide news and important updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`p-4 rounded-lg border ${getPriorityColor(announcement.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${announcement.priority === 'high' ? 'text-red-600' : announcement.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'}`}>
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium leading-none">{announcement.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatRelativeTime(announcement.date)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {announcement.body}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      announcement.priority === 'high' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : announcement.priority === 'medium'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
