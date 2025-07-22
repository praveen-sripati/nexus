import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { forYouFeed, type FeedItem } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';
import { FileText, Bell, CheckSquare, Info, ArrowRight } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

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

export const NotificationDropdown: FC = () => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation();
  
  // Show only first 5 items in dropdown
  const displayItems = forYouFeed.slice(0, 5);
  // For demo purposes, assume first 3 items are unread
  const unreadCount = 3;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-10 w-10">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">View notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 shadow-lg border">
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-base">Notifications</h4>
            <Link to="/for-you">
              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs hover:bg-background">
                View All
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto" ref={containerRef}>
          {displayItems.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs mt-1 opacity-75">You're all caught up!</p>
            </div>
          ) : (
            <div className="py-2">
              {displayItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={getItemClassName(`flex gap-3 p-4 hover:bg-muted/200 transition-colors cursor-pointer bg-primary/3`)}
                  style={getItemStyle(index)}
                >
                  <div className={`mt-1 flex-shrink-0 ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h5 className={`text-sm leading-5 ${index < 3 ? 'font-semibold text-foreground' : 'font-medium text-foreground/90'}`}>
                        {item.title}
                      </h5>
                      <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    {item.author && (
                      <Badge variant="secondary" className="text-xs h-6 px-2 font-normal">
                        {item.author}
                      </Badge>
                    )}
                  </div>
                  {index < 3 && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {forYouFeed.length > 5 && (
          <div className="p-3 border-t bg-muted/20">
            <Link to="/for-you" className="block">
              <Button variant="outline" size="sm" className="w-full justify-center gap-2 h-9 text-sm font-medium">
                <span>View All {forYouFeed.length} Notifications</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
