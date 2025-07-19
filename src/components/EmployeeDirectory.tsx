import { Button } from '@/components/ui/button';
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      employee.department === 'Engineering' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : employee.department === 'Design'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : employee.department === 'Product'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : employee.department === 'Marketing'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {employee.department}
                    </span>
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
