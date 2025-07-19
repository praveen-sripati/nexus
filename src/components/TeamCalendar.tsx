import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      return 'text-blue-500';
    case 'birthday':
      return 'text-pink-500';
    case 'anniversary':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

const getEventBgColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'event':
      return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
    case 'birthday':
      return 'bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800';
    case 'anniversary':
      return 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800';
    default:
      return 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800';
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
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      event.type === 'event' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : event.type === 'birthday'
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
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
