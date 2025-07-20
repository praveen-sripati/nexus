import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calendarEvents, type CalendarEvent } from '@/data/mockData';
import { formatEventDate } from '@/lib/utils';
import { Calendar, Users, Cake, Award } from 'lucide-react';
import { type FC } from 'react';

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
  // Sort events by date
  const sortedEvents = [...calendarEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Calendar
        </CardTitle>
        <CardDescription>
          Upcoming events, birthdays, and anniversaries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <div 
              key={event.id} 
              className={`p-3 rounded-lg border ${getEventBgColor(event.type)}`}
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
      </CardContent>
    </Card>
  );
};
