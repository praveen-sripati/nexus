import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calendarEvents, type CalendarEvent } from '@/data/mockData';
import { formatEventDate } from '@/lib/utils';
import { Calendar, Users, Cake, Award, ExternalLink } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';

const getEventIcon = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'event':
      return <Calendar className="h-4 w-4" />;
    case 'birthday':
      return <Cake className="h-4 w-4" />;
    case 'anniversary':
      return <Award className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getEventColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'event':
      return 'text-blue-600';
    case 'birthday':
      return 'text-rose-600';
    case 'anniversary':
      return 'text-violet-600';
    default:
      return 'text-muted-foreground';
  }
};

const getEventBgColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'event':
      return 'bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10 dark:border-blue-500/30';
    case 'birthday':
      return 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/10 dark:border-rose-500/30';
    case 'anniversary':
      return 'bg-violet-500/5 dark:bg-violet-500/10 border-violet-500/10 dark:border-violet-500/30';
    default:
      return 'bg-muted/50 border-border';
  }
};

export const TeamCalendar: FC = () => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation();
  
  // Sort events by date and limit to first 3 for dashboard
  const sortedEvents = [...calendarEvents].sort((a, b) => a.date.getTime() - b.date.getTime());
  const displayEvents = sortedEvents.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Calendar
          </CardTitle>
          <CardDescription>
            Upcoming events, birthdays, and anniversaries
          </CardDescription>
        </div>
        <Link to="/calendar" className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
            View All
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent ref={containerRef}>
        <div className="space-y-3">
          {displayEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={getItemClassName(`p-3 rounded-lg border ${getEventBgColor(event.type)}`)}
              style={getItemStyle(index)}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium leading-none">{event.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatEventDate(event.date)}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        event.type === 'event' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-300 dark:bg-blue-100 dark:text-blue-800'
                          : event.type === 'birthday'
                          ? 'border-pink-600 bg-pink-50 text-pink-700 dark:border-pink-300 dark:bg-pink-100 dark:text-pink-800'
                          : 'border-purple-600 bg-purple-50 text-purple-700 dark:border-purple-300 dark:bg-purple-100 dark:text-purple-800'
                      }
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Showing {displayEvents.length} of {sortedEvents.length} upcoming events
          </p>
          
          {/* Show remaining count if there are more events */}
          {sortedEvents.length > 3 && (
            <div className="mt-2">
              <Link to="/calendar">
                <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                  <span>View {sortedEvents.length - 3} more {sortedEvents.length === 4 ? 'event' : 'events'}</span>
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
