import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { forYouFeed, type FeedItem } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { FileText, Bell, CheckSquare, Info } from 'lucide-react';
import { type FC } from 'react';

const getTypeIcon = (type: FeedItem['type']) => {
  switch (type) {
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'news':
      return <Info className="h-4 w-4" />;
    case 'task':
      return <CheckSquare className="h-4 w-4" />;
    case 'update':
      return <Bell className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getTypeColor = (type: FeedItem['type']) => {
  switch (type) {
    case 'document':
      return 'text-blue-500';
    case 'news':
      return 'text-green-500';
    case 'task':
      return 'text-orange-500';
    case 'update':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

export const ForYouFeed: FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">For You</CardTitle>
        <CardDescription>
          Personalized updates and information relevant to your work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forYouFeed.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className={`mt-1 ${getTypeColor(item.type)}`}>
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium leading-none">{item.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                {item.author && (
                  <p className="text-xs text-muted-foreground">
                    by {item.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
