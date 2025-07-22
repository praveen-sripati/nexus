import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Header } from '@/components/Header';
import { PageWrapper, PageSection } from '@/components/PageWrapper';
import { 
  helpdeskTickets, 
  helpdeskKnowledgeBase,
  helpdeskCategories,
  type HelpdeskTicket,
  type HelpdeskKnowledgeBase
} from '@/data/mockData';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail,
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ThumbsUp,
  Eye,
  FileText,
  Monitor,
  Wifi,
  Settings,
  Smartphone
} from 'lucide-react';
import { useState, useEffect, type FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

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
      return <AlertCircle className="h-4 w-4" />;
    case 'in-progress':
      return <Clock className="h-4 w-4" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4" />;
    case 'closed':
      return <XCircle className="h-4 w-4" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'hardware':
      return <Monitor className="h-4 w-4 text-blue-600" />;
    case 'software':
      return <Settings className="h-4 w-4 text-green-600" />;
    case 'network':
      return <Wifi className="h-4 w-4 text-purple-600" />;
    case 'mobile':
      return <Smartphone className="h-4 w-4 text-orange-600" />;
    case 'general':
      return <HelpCircle className="h-4 w-4 text-gray-600" />;
    default:
      return <HelpCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'critical':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const TicketCard: FC<{ ticket: HelpdeskTicket; index?: number }> = ({ ticket, index = 0 }) => (
  <Card 
    className="hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-300"
    style={{ animationDelay: `${(index + 1) * 100}ms` }}
  >
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {getCategoryIcon(ticket.category)}
              <h3 className="font-medium truncate">{ticket.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">#{ticket.id}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={`${getStatusColor(ticket.status)} border text-xs`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(ticket.status)}
                <span className="capitalize">{ticket.status}</span>
              </div>
            </Badge>
            <Badge className={`${getPriorityColor(ticket.priority)} text-xs`}>
              {ticket.priority.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm line-clamp-2">{ticket.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDate(ticket.submittedAt)}</span>
          {ticket.assignedTo && <span>Assigned to {ticket.assignedTo}</span>}
        </div>
      </div>
    </CardContent>
  </Card>
);

const KnowledgeBaseCard: FC<{ article: HelpdeskKnowledgeBase; index?: number }> = ({ article, index = 0 }) => (
  <Card 
    className="hover:shadow-md transition-shadow cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-300"
    style={{ animationDelay: `${(index + 1) * 100}ms` }}
  >
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium line-clamp-1">{article.title}</h3>
            </div>
            <Badge variant="outline" className="text-xs capitalize">
              {article.category}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{article.content}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {article.helpful}
            </span>
          </div>
          <span>Updated {formatDate(article.lastUpdated)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const NewTicketDialog: FC<{ autoOpen?: boolean; onOpenChange?: (open: boolean) => void }> = ({ 
  autoOpen = false, 
  onOpenChange 
}) => {
  const [open, setOpen] = useState(autoOpen);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Handle form submission
    console.log('New ticket:', formData);
    toast.success('Support ticket created successfully!');
    handleOpenChange(false);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium'
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {helpdeskCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the issue..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Ticket</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const HelpDeskPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [ticketFilter, setTicketFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tickets');
  const [autoOpenNewTicket, setAutoOpenNewTicket] = useState(false);
  
  // Handle URL parameters on component mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    const action = searchParams.get('action');
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (action === 'create') {
      setActiveTab('tickets');
      setAutoOpenNewTicket(true);
    }
  }, [searchParams]);
  
  const filteredTickets = helpdeskTickets.filter(ticket => {
    const matchesFilter = ticketFilter === 'all' || ticket.status === ticketFilter;
    const matchesSearch = searchQuery === '' || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredKnowledgeBase = helpdeskKnowledgeBase.filter(article =>
    searchQuery === '' || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openTickets = helpdeskTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = helpdeskTickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = helpdeskTickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageWrapper className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <PageSection index={0} className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Help Desk & Support</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get assistance with IT issues, submit tickets, and access support resources
              </p>
            </div>
            <NewTicketDialog 
              autoOpen={autoOpenNewTicket} 
              onOpenChange={(open) => !open && setAutoOpenNewTicket(false)}
            />
          </div>
        </PageSection>

        {/* Summary Stats */}
        <PageSection index={1} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{openTickets}</div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
            </CardContent>
          </Card>
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{inProgressTickets}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{resolvedTickets}</div>
              <p className="text-sm text-muted-foreground">Resolved Today</p>
            </CardContent>
          </Card>
        </PageSection>

        {/* Search Bar */}
        <PageSection index={2} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets and knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </PageSection>

        <PageSection index={3}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="tickets" className="gap-2">
              <MessageSquare className="h-4 w-4 hidden sm:inline" />
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="gap-2">
              <FileText className="h-4 w-4 hidden sm:inline" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="h-4 w-4 hidden sm:inline" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Support Tickets</h2>
              <Select value={ticketFilter} onValueChange={setTicketFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <PageSection index={4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTickets.map((ticket, index) => (
                  <TicketCard key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            </PageSection>
            
            {filteredTickets.length === 0 && (
              <PageSection index={7}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                    <p className="text-muted-foreground text-center">
                      {ticketFilter === 'all' 
                        ? 'You haven\'t submitted any support tickets yet.' 
                        : `No ${ticketFilter} tickets found.`}
                    </p>
                  </CardContent>
                </Card>
              </PageSection>
            )}
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Knowledge Base</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{helpdeskKnowledgeBase.length} articles</span>
              </div>
            </div>
            
            <PageSection index={5}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredKnowledgeBase.map((article, index) => (
                  <KnowledgeBaseCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </PageSection>
            
            {filteredKnowledgeBase.length === 0 && (
              <PageSection index={8}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground text-center">
                      No knowledge base articles match your search.
                    </p>
                  </CardContent>
                </Card>
              </PageSection>
            )}
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <PageSection index={9}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '100ms' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      Emergency Support
                    </CardTitle>
                  </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    For critical issues that require immediate attention
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="text-sm text-blue-600">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Available:</span>
                      <span className="text-sm">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '200ms' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      General Support
                    </CardTitle>
                  </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    For non-urgent issues and general inquiries
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm text-blue-600">support@company.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response:</span>
                      <span className="text-sm">Within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </div>
            </PageSection>

            <PageSection index={7}>
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Chat with our support team for real-time assistance
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Weekdays:</p>
                    <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium">Response Time:</p>
                    <p className="text-muted-foreground">&lt; 5 minutes</p>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
            </PageSection>
          </TabsContent>
        </Tabs>
        </PageSection>
      </PageWrapper>
    </div>
  );
};
