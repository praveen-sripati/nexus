import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { OrganizationChart } from '@/components/OrganizationChart';
import { employees } from '@/data/mockData';
import { ArrowLeft, Search, Filter, Mail, Phone, MapPin, Users, Network } from 'lucide-react';
import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

const getDepartmentBadgeColor = (department: string) => {
  switch (department) {
    case 'Executive':
      return 'border-yellow-600 bg-yellow-50 text-yellow-700 dark:border-yellow-300 dark:bg-yellow-100 dark:text-yellow-800';
    case 'Engineering':
      return 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-300 dark:bg-blue-100 dark:text-blue-800';
    case 'Design':
      return 'border-purple-600 bg-purple-50 text-purple-700 dark:border-purple-300 dark:bg-purple-100 dark:text-purple-800';
    case 'Product':
      return 'border-green-600 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-100 dark:text-green-800';
    case 'Marketing':
      return 'border-orange-600 bg-orange-50 text-orange-700 dark:border-orange-300 dark:bg-orange-100 dark:text-orange-800';
    case 'Sales':
      return 'border-pink-600 bg-pink-50 text-pink-700 dark:border-pink-300 dark:bg-pink-100 dark:text-pink-800';
    case 'HR':
      return 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-300 dark:bg-indigo-100 dark:text-indigo-800';
    default:
      return 'border-muted-foreground/20 bg-muted text-muted-foreground';
  }
};

export const EmployeeDirectoryPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  // Get unique departments for filter
  const departments = Array.from(new Set(employees.map(emp => emp.department))).sort();

  // Filter employees based on search and department
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (employee.email && employee.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
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
            <h1 className="text-2xl font-bold tracking-tight">Employee Directory</h1>
            <p className="text-muted-foreground">
              Find and connect with your colleagues across the organization
            </p>
          </div>
        </div>

        {/* Tabs for Directory and Org Chart */}
        <Tabs defaultValue="directory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="directory" className="gap-2">
              <Users className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="orgchart" className="gap-2">
              <Network className="h-4 w-4" />
              Org Chart
            </TabsTrigger>
          </TabsList>

          {/* Employee Directory Tab */}
          <TabsContent value="directory" className="space-y-6">
            {/* Filters Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, role, department, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Department Filter */}
                  <div className="sm:w-48">
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger className="gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Results Count */}
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredEmployees.length} of {employees.length} employees
                </div>
              </CardContent>
            </Card>

        {/* Employee Cards */}
        <div className="space-y-4">
          {filteredEmployees.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">No employees found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full bg-muted"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium truncate">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{employee.role}</p>
                          </div>
                          
                          <div>
                            <Badge 
                              variant="outline"
                              className={getDepartmentBadgeColor(employee.department)}
                            >
                              {employee.department}
                            </Badge>
                          </div>

                          {/* Contact Information */}
                          <div className="space-y-2">
                            {employee.email && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{employee.email}</span>
                              </div>
                            )}
                            {employee.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{employee.phone}</span>
                              </div>
                            )}
                            {employee.location && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{employee.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            {employee.email && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 text-xs"
                                onClick={() => window.open(`mailto:${employee.email}`, '_blank')}
                              >
                                <Mail className="h-3 w-3" />
                                Email
                              </Button>
                            )}
                            {employee.phone && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 text-xs"
                                onClick={() => window.open(`tel:${employee.phone}`, '_blank')}
                              >
                                <Phone className="h-3 w-3" />
                                Call
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Department Statistics */}
        {filteredEmployees.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Department Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {departments.map((dept) => {
                  const count = filteredEmployees.filter(emp => emp.department === dept).length;
                  const total = employees.filter(emp => emp.department === dept).length;
                  return (
                    <div key={dept} className="text-center space-y-1">
                      <Badge 
                        variant="outline"
                        className={getDepartmentBadgeColor(dept)}
                      >
                        {dept}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {count} / {total}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredEmployees.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" disabled>
              Load More Employees
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              All employees loaded
            </p>
          </div>
        )}
        </TabsContent>

        {/* Organization Chart Tab */}
        <TabsContent value="orgchart">
          <OrganizationChart />
        </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
