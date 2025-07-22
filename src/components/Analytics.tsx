import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analyticsMetrics, activityData } from '@/data/mockData';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export const Analytics: FC = () => {
  const chartColors = {
    primary: '#3b82f6',
    secondary: '#10b981'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Analytics Overview</CardTitle>
        <Link to="/analytics">
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {analyticsMetrics.slice(0, 4).map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground truncate">
                  {metric.name}
                </p>
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
              </div>
              <p className="text-lg font-bold">
                {metric.value}{metric.unit === '%' ? '%' : ''}
              </p>
              <p className={`text-xs ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'increase' ? '+' : '-'}{metric.change}%
              </p>
            </div>
          ))}
        </div>

        {/* Mini Activity Chart */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Activity Trends (7 days)</h4>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData.slice(-7)}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric' })}
                  tick={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="projects" 
                  stroke={chartColors.primary} 
                  strokeWidth={2} 
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="kudos" 
                  stroke={chartColors.secondary} 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors.primary }}></div>
              <span className="text-muted-foreground">Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors.secondary }}></div>
              <span className="text-muted-foreground">Kudos</span>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="border-t pt-4 space-y-2">
          <h4 className="text-sm font-medium">Quick Insights</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Project completion rate increased by 6.3% this week</p>
            <p>• Team kudos activity up 34.7% from last period</p>
            <p>• Engineering department leading in productivity</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
