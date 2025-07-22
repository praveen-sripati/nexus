import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resourcesData } from '@/data/mockData';
import { ArrowRight, FileText, Download, Star, TrendingUp } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const Resources: FC = () => {
  // Get recent and popular resources
  const recentResources = resourcesData
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, 3);
    
  const popularResources = resourcesData
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 2);

  const favoriteResources = resourcesData.filter(r => r.isFavorite).length;
  const totalDownloads = resourcesData.reduce((sum, r) => sum + r.downloadCount, 0);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'video':
        return '🎥';
      case 'xls':
        return '📊';
      case 'link':
        return '🔗';
      default:
        return '📄';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">Company Resources</CardTitle>
        <Link to="/resources">
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <p className="text-lg font-bold text-primary">{resourcesData.length}</p>
            <p className="text-xs text-muted-foreground">Resources</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-green-600">{totalDownloads}</p>
            <p className="text-xs text-muted-foreground">Downloads</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-yellow-600">{favoriteResources}</p>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </div>
        </div>

        {/* Recent Resources */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Recent Uploads</h4>
          </div>
          <div className="space-y-2">
            {recentResources.map((resource) => (
              <div key={resource.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-sm">{getFileIcon(resource.type)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{resource.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{resource.uploadedBy}</span>
                    {resource.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Popular This Week */}
        <div className="space-y-3 pt-3 border-t">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <h4 className="text-sm font-medium">Popular This Week</h4>
          </div>
          <div className="space-y-2">
            {popularResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-sm">{getFileIcon(resource.type)}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{resource.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloadCount} downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/resources?category=template" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-8">
                <FileText className="h-3 w-3" />
                <span className="text-xs">Templates</span>
              </Button>
            </Link>
            <Link to="/resources?category=policy" className="block">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-8">
                <FileText className="h-3 w-3" />
                <span className="text-xs">Policies</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
