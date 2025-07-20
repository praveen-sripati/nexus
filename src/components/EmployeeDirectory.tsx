import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { employees } from '@/data/mockData';
import { Users } from 'lucide-react';
import { useState, type FC } from 'react';

const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing'];

export const EmployeeDirectory: FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees = selectedDepartment === 'All' 
    ? employees 
    : employees.filter(employee => employee.department === selectedDepartment);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Employee Directory
        </CardTitle>
        <CardDescription>
          Find and connect with your colleagues
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Department Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(dept)}
              className="text-xs"
            >
              {dept}
              {dept !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({employees.filter(emp => emp.department === dept).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredEmployees.map((employee) => (
            <div 
              key={employee.id} 
              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full bg-muted"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{employee.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{employee.role}</p>
                  <div className="mt-1">
                    <Badge 
                      variant="outline"
                      className={
                        employee.department === 'Engineering' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-300 dark:bg-blue-100 dark:text-blue-800'
                          : employee.department === 'Design'
                          ? 'border-purple-600 bg-purple-50 text-purple-700 dark:border-purple-300 dark:bg-purple-100 dark:text-purple-800'
                          : employee.department === 'Product'
                          ? 'border-green-600 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-100 dark:text-green-800'
                          : employee.department === 'Marketing'
                          ? 'border-orange-600 bg-orange-50 text-orange-700 dark:border-orange-300 dark:bg-orange-100 dark:text-orange-800'
                          : 'border-muted-foreground/20 bg-muted text-muted-foreground'
                      }
                    >
                      {employee.department}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No employees found in {selectedDepartment} department.</p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Showing {filteredEmployees.length} of {employees.length} employees
            {selectedDepartment !== 'All' && ` in ${selectedDepartment}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
