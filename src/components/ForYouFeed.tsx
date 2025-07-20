import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { forYouFeed, type FeedItem } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { FileText, Bell, CheckSquare, Info, ExternalLink, Sparkles } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';

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
      return 'text-primary';
    case 'news':
      return 'text-green-800 dark:text-green-300';
    case 'task':
      return 'text-orange-800 dark:text-orange-300';
    case 'update':
      return 'text-purple-800 dark:text-purple-300';
    default:
      return 'text-muted-foreground';
  }
};

export const ForYouFeed: FC = () => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation();
  
  // Show only first 3 items on dashboard
  const displayItems = forYouFeed.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            For You
          </CardTitle>
          <CardDescription>
            Personalized updates and information relevant to your work
          </CardDescription>
        </div>
        <Link to="/for-you" className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
            View All
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent ref={containerRef}>
        <div className="space-y-4">
          {displayItems.map((item, index) => (
            <div 
              key={item.id} 
              className={getItemClassName('flex gap-3 p-3 rounded-lg border hover:bg-muted/50')}
              style={getItemStyle(index)}
            >
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
          
          {/* Show remaining count if there are more items */}
          {forYouFeed.length > 3 && (
            <div 
              className={getItemClassName('pt-2 border-t')}
              style={getItemStyle(displayItems.length)}
            >
              <Link to="/for-you">
                <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                  <span>View {forYouFeed.length - 3} more items</span>
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
