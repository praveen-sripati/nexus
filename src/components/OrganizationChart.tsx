import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employees, type Employee } from '@/data/mockData';
import { Users, Crown, Shield, User } from 'lucide-react';
import { type FC, useEffect, useRef } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

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

const getHierarchyLevel = (role: string): number => {
  const lowerRole = role.toLowerCase();
  if (lowerRole.includes('ceo') || lowerRole.includes('chief executive')) return 0;
  if (lowerRole.includes('cto') || lowerRole.includes('cfo') || lowerRole.includes('chief')) return 1;
  if (lowerRole.includes('director') || lowerRole.includes('vp') || lowerRole.includes('vice president')) return 2;
  if (lowerRole.includes('manager') || lowerRole.includes('head of') || lowerRole.includes('lead')) return 3;
  if (lowerRole.includes('senior')) return 4;
  return 5;
};

const getHierarchyIcon = (level: number) => {
  switch (level) {
    case 0: return Crown;
    case 1: 
    case 2: return Shield;
    case 3: return Users;
    default: return User;
  }
};

interface EmployeeNodeProps {
  employee: Employee;
  isRoot?: boolean;
}

const EmployeeNode: FC<EmployeeNodeProps> = ({ employee, isRoot = false }) => {
  const level = getHierarchyLevel(employee.role);
  const HierarchyIcon = getHierarchyIcon(level);
  
  return (
    <div className="flex justify-center">
      <Card className={`
        relative hover:shadow-lg transition-all duration-200 cursor-pointer
        ${isRoot ? 'border-2 border-primary shadow-lg' : ''}
        ${level <= 1 ? 'bg-gradient-to-br from-background to-muted/20' : ''}
        w-[240px] min-w-[240px] max-w-[240px] flex-shrink-0
      `}>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-16 h-16 rounded-full bg-muted border-2 border-background shadow-sm"
              />
              <div className={`
                absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs
                ${level === 0 ? 'bg-yellow-500 text-yellow-900' : 
                  level <= 2 ? 'bg-blue-500 text-blue-50' : 'bg-gray-500 text-gray-50'}
              `}>
                <HierarchyIcon className="w-3 h-3" />
              </div>
            </div>
            
            <div className="space-y-2 w-full">
              <h4 className={`font-medium ${level === 0 ? 'text-lg' : 'text-sm'} truncate`}>
                {employee.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-tight line-clamp-2">
                {employee.role}
              </p>
              <Badge 
                variant="outline"
                className={`${getDepartmentBadgeColor(employee.department)} text-xs px-2 py-1`}
              >
                {employee.department}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface OrgNode {
  employee: Employee;
  children: OrgNode[];
}

const buildHierarchy = (employees: Employee[]): OrgNode | null => {
  // Find CEO
  const ceo = employees.find(emp => getHierarchyLevel(emp.role) === 0);
  if (!ceo) return null;

  // Group employees by department (excluding CEO)
  const departmentGroups = new Map<string, Employee[]>();
  employees.forEach(emp => {
    if (emp.id === ceo.id) return;
    if (!departmentGroups.has(emp.department)) {
      departmentGroups.set(emp.department, []);
    }
    departmentGroups.get(emp.department)!.push(emp);
  });

  // Build org tree
  const buildNode = (employee: Employee): OrgNode => {
    const node: OrgNode = { employee, children: [] };
    
    if (employee.id === ceo.id) {
      // CEO's children are department heads
      departmentGroups.forEach((deptEmployees) => {
        // Find department head (lowest hierarchy level)
        const sortedByLevel = deptEmployees.sort((a, b) => 
          getHierarchyLevel(a.role) - getHierarchyLevel(b.role)
        );
        
        if (sortedByLevel.length > 0) {
          const deptHead = sortedByLevel[0];
          const deptHeadNode = buildNode(deptHead);
          
          // Add remaining department employees under department head
          const remaining = sortedByLevel.slice(1);
          remaining.forEach(emp => {
            deptHeadNode.children.push(buildNode(emp));
          });
          
          node.children.push(deptHeadNode);
        }
      });
    }
    
    return node;
  };

  return buildNode(ceo);
};

const renderOrgNode = (node: OrgNode, isRoot = false): React.ReactElement => {
  if (node.children.length === 0) {
    return (
      <TreeNode
        key={node.employee.id}
        label={<EmployeeNode employee={node.employee} isRoot={isRoot} />}
      />
    );
  }

  return (
    <TreeNode
      key={node.employee.id}
      label={<EmployeeNode employee={node.employee} isRoot={isRoot} />}
    >
      {node.children.map(child => renderOrgNode(child))}
    </TreeNode>
  );
};

export const OrganizationChart: FC = () => {
  const orgHierarchy = buildHierarchy(employees);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Center the org chart horizontally when component mounts
  useEffect(() => {
    const centerChart = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const centerPosition = (scrollWidth - clientWidth) / 2;
        
        container.scrollTo({
          left: centerPosition,
          behavior: 'smooth'
        });
      }
    };

    // Small delay to ensure the chart is fully rendered
    const timeoutId = setTimeout(centerChart, 100);
    
    return () => clearTimeout(timeoutId);
  }, [orgHierarchy]);
  
  if (!orgHierarchy) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium">No organization structure found</h3>
            <p className="text-sm text-muted-foreground">
              Unable to build organization chart from employee data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate some stats
  const totalEmployees = employees.length;
  const departmentCount = new Set(employees.map(emp => emp.department)).size;
  const levelCounts = employees.reduce((acc, emp) => {
    const level = getHierarchyLevel(emp.role);
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Organization Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalEmployees}</div>
              <div className="text-sm text-muted-foreground">Total Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{departmentCount}</div>
              <div className="text-sm text-muted-foreground">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{levelCounts[3] || 0}</div>
              <div className="text-sm text-muted-foreground">Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{(levelCounts[1] || 0) + (levelCounts[2] || 0)}</div>
              <div className="text-sm text-muted-foreground">Leadership</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Tree */}
      <Card>
        <CardContent className="p-4">
          <div className="w-full">
            <div className="overflow-x-auto" ref={scrollContainerRef}>
              <div className="org-chart-container flex justify-center" style={{ 
                minWidth: '100%',
                width: 'max-content'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px'
                }}>
                  <Tree
                    lineWidth="2px"
                    lineColor="#e2e8f0"
                    lineBorderRadius="8px"
                    nodePadding="24px"
                    label={<EmployeeNode employee={orgHierarchy.employee} isRoot={true} />}
                  >
                    {orgHierarchy.children.map(child => renderOrgNode(child))}
                  </Tree>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hierarchy Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                <Crown className="w-3 h-3 text-yellow-900" />
              </div>
              <span className="text-sm">CEO / Executive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <Shield className="w-3 h-3 text-blue-50" />
              </div>
              <span className="text-sm">Director / VP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                <Users className="w-3 h-3 text-gray-50" />
              </div>
              <span className="text-sm">Manager / Lead</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                <User className="w-3 h-3 text-gray-50" />
              </div>
              <span className="text-sm">Individual Contributor</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
