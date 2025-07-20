import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { forYouFeed, type FeedItem } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { FileText, Bell, CheckSquare, Info, ArrowLeft, Search, Filter } from 'lucide-react';
import { useState, type FC } from 'react';
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

const getTypeBadge = (type: FeedItem['type']) => {
  switch (type) {
    case 'document':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-100 dark:text-blue-800';
    case 'news':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-100 dark:text-green-800';
    case 'task':
      return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-100 dark:text-orange-800';
    case 'update':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-100 dark:text-purple-800';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

export const ForYouPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Filter feed items based on search and type
  const filteredItems = forYouFeed.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">For You</h1>
            <p className="text-muted-foreground">
              Personalized updates and information relevant to your work
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search updates, documents, tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Type Filter */}
              <div className="sm:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="task">Tasks</SelectItem>
                    <SelectItem value="update">Updates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredItems.length} of {forYouFeed.length} items
            </div>
          </CardContent>
        </Card>

        {/* Feed Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">No items found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`mt-1 ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium leading-none">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeBadge(item.type)}`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(item.timestamp)}
                            </span>
                          </div>
                        </div>
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
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredItems.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" disabled>
              Load More Items
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              All items loaded
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
