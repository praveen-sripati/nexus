import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resourcesData } from '@/data/mockData';
import { FileText, Download, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const Resources: FC = () => {
  // Get recent and popular resources
  const recentResources = resourcesData
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .slice(0, 2);
    
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
          <Button variant="outline" size="sm" className="gap-2 h-8">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats - Enhanced for main layout */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">{resourcesData.length}</p>
            <p className="text-sm text-blue-800 font-medium">Total Resources</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-2xl font-bold text-green-600">{totalDownloads}</p>
            <p className="text-sm text-green-800 font-medium">Downloads</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-2xl font-bold text-yellow-600">{favoriteResources}</p>
            <p className="text-sm text-yellow-800 font-medium">Favorites</p>
          </div>
        </div>

        {/* Recent and Popular Resources - Side by side for main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Resources */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h4 className="text-base font-semibold">Recent Uploads</h4>
            </div>
            <div className="space-y-3">
              {recentResources.map((resource) => (
                <div key={resource.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-lg">{getFileIcon(resource.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{resource.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
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
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="text-base font-semibold">Popular This Week</h4>
            </div>
            <div className="space-y-3">
              {popularResources.map((resource) => (
                <div key={resource.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-lg">{getFileIcon(resource.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{resource.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloadCount} downloads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
