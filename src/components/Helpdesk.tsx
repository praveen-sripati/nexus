import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { helpdeskTickets } from '@/data/mockData';
import { ArrowRight, Headphones, Clock, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { useWaveAnimation } from '@/hooks/useWaveAnimation';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const Helpdesk: FC = () => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation();
  
  const userTickets = helpdeskTickets.filter(ticket => ticket.submittedBy === 'Current User');
  const openTickets = userTickets.filter(ticket => ticket.status === 'open' || ticket.status === 'in-progress');
  const recentTickets = userTickets.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-3 w-3" />;
      case 'in-progress':
        return <Clock className="h-3 w-3" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">Helpdesk</CardTitle>
        <Link to="/helpdesk">
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            Support
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent ref={containerRef} className="space-y-4">
        {/* Summary Stats */}
        <div 
          className={getItemClassName("grid grid-cols-2 gap-3 text-center")}
          style={getItemStyle(0)}
        >
          <div className="space-y-1">
            <p className="text-lg font-bold text-primary">{openTickets.length}</p>
            <p className="text-xs text-muted-foreground">Open Tickets</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-green-600">{userTickets.filter(t => t.status === 'resolved').length}</p>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Recent Tickets */}
        <div 
          className={getItemClassName("space-y-3")}
          style={getItemStyle(1)}
        >
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Recent Tickets</h4>
          </div>
          
          {recentTickets.length > 0 ? (
            <div className="space-y-2">
              {recentTickets.map((ticket, index) => (
                <div 
                  key={ticket.id} 
                  className={getItemClassName("p-2 rounded-lg bg-muted/30 space-y-2")}
                  style={getItemStyle(2 + index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {ticket.id} • {formatDate(ticket.submittedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge className={`${getStatusColor(ticket.status)} border text-xs px-1.5 py-0.5`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          <span className="capitalize">{ticket.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {ticket.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className={getItemClassName("text-center py-4")}
              style={getItemStyle(2)}
            >
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No support tickets</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div 
          className={getItemClassName("pt-3 border-t")}
          style={getItemStyle(5)}
        >
          <Link to="/helpdesk" className="block">
            <Button variant="outline" size="sm" className="w-full justify-center gap-2 h-8">
              <Headphones className="h-3 w-3" />
              <span className="text-xs">Submit Ticket</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
