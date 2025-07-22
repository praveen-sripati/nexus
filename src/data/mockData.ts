// Mock data for Nexus intranet dashboard
// Simulates API responses as specified in PRD

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

export interface Employee extends User {
  email?: string;
  phone?: string;
  location?: string;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'news' | 'task' | 'update';
  timestamp: Date;
  author?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'event' | 'birthday' | 'anniversary';
  description?: string;
}

export interface Kudo {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
}

// Analytics interfaces
export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit: string;
  icon: string;
}

export interface ActivityData {
  date: string;
  projects: number;
  kudos: number;
  announcements: number;
  employees: number;
}

export interface DepartmentData {
  department: string;
  employees: number;
  projects: number;
  satisfaction: number;
}

export interface ProjectStatusData {
  status: string;
  count: number;
  percentage: number;
}

export interface EngagementData {
  month: string;
  kudosGiven: number;
  kudosReceived: number;
  announcements: number;
}

export interface ProductivityData {
  week: string;
  tasksCompleted: number;
  projectsDelivered: number;
  teamEfficiency: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
  createdDate: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  progress: number; // 0-100
  startDate: Date;
  endDate: Date;
  teamMembers: string[];
  tasks: Task[];
}

export interface QuickLink {
  id: string;
  name: string;
  url: string;
}

// Current user data
export const currentUser: User = {
  id: '1',
  name: 'Praveen',
  role: 'Frontend Developer',
  department: 'Engineering',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
};

// Mock employees
export const employees: Employee[] = [
  {
    id: 'ceo-1',
    name: 'Alexandra Mitchell',
    role: 'Chief Executive Officer',
    department: 'Executive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
    email: 'alexandra.mitchell@company.com',
    phone: '+1 (555) 000-0001',
    location: 'San Francisco, CA'
  },
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Frontend Developer',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    email: 'priya.sharma@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    email: 'david.chen@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY'
  },
  {
    id: 'eng-dir-1',
    name: 'Michael Rodriguez',
    role: 'Director of Engineering',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    email: 'michael.rodriguez@company.com',
    phone: '+1 (555) 200-0001',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    department: 'Design',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA'
  },
  {
    id: 'design-head-1',
    name: 'Jessica Park',
    role: 'Head of Design',
    department: 'Design',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    email: 'jessica.park@company.com',
    phone: '+1 (555) 300-0001',
    location: 'New York, NY'
  },
  {
    id: '4',
    name: 'Marcus Williams',
    role: 'Product Manager',
    department: 'Product',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    email: 'marcus.williams@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX'
  },
  {
    id: 'product-vp-1',
    name: 'Amanda Foster',
    role: 'VP of Product',
    department: 'Product',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
    email: 'amanda.foster@company.com',
    phone: '+1 (555) 400-0001',
    location: 'Seattle, WA'
  },
  {
    id: '5',
    name: 'Emma Rodriguez',
    role: 'Marketing Specialist',
    department: 'Marketing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    email: 'emma.rodriguez@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Miami, FL'
  },
  {
    id: 'marketing-dir-1',
    name: 'Carlos Santiago',
    role: 'Director of Marketing',
    department: 'Marketing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    email: 'carlos.santiago@company.com',
    phone: '+1 (555) 500-0001',
    location: 'Los Angeles, CA'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    role: 'DevOps Engineer',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    email: 'alex.thompson@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA'
  },
  {
    id: '7',
    name: 'Jessica Lee',
    role: 'Senior Designer',
    department: 'Design',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    email: 'jessica.lee@company.com',
    phone: '+1 (555) 789-0123',
    location: 'Portland, OR'
  },
  {
    id: '8',
    name: 'Ryan Kumar',
    role: 'Sales Manager',
    department: 'Sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    email: 'ryan.kumar@company.com',
    phone: '+1 (555) 890-1234',
    location: 'Chicago, IL'
  },
  {
    id: 'sales-vp-1',
    name: 'Robert Chen',
    role: 'VP of Sales',
    department: 'Sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    email: 'robert.chen@company.com',
    phone: '+1 (555) 600-0001',
    location: 'New York, NY'
  },
  {
    id: '9',
    name: 'Lisa Zhang',
    role: 'HR Business Partner',
    department: 'HR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    email: 'lisa.zhang@company.com',
    phone: '+1 (555) 901-2345',
    location: 'Boston, MA'
  },
  {
    id: 'hr-dir-1',
    name: 'Michelle Davis',
    role: 'Director of HR',
    department: 'HR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michelle',
    email: 'michelle.davis@company.com',
    phone: '+1 (555) 700-0001',
    location: 'Austin, TX'
  },
  {
    id: '10',
    name: 'James Wilson',
    role: 'Data Analyst',
    department: 'Product',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 012-3456',
    location: 'Denver, CO'
  }
];

// Mock "For You" feed
export const forYouFeed: FeedItem[] = [
  {
    id: '1',
    title: 'New React Guidelines Updated',
    description: 'Frontend team has updated the React coding standards. Please review the new patterns for hooks and state management.',
    type: 'document',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    author: 'David Chen'
  },
  {
    id: '2',
    title: 'Sprint Planning Meeting',
    description: 'Don\'t forget about tomorrow\'s sprint planning session at 10 AM.',
    type: 'task',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    author: 'Marcus Williams'
  },
  {
    id: '3',
    title: 'Design System v2.0 Released',
    description: 'The new design system includes updated components and improved accessibility features.',
    type: 'update',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    author: 'Sarah Johnson'
  }
];

// Mock announcements
export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Company All-Hands Meeting',
    body: 'Join us this Friday at 3 PM for our quarterly all-hands meeting. We\'ll be discussing our progress and future roadmap.',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Office Hours',
    body: 'Starting next week, our office hours will be 9 AM to 6 PM. Remote work flexibility remains unchanged.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Holiday Party Planning',
    body: 'We\'re planning our annual holiday party! Please submit your dietary restrictions and song requests.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    priority: 'low'
  }
];

// Mock calendar events
export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    type: 'event',
    description: 'Daily standup meeting'
  },
  {
    id: '2',
    title: 'Sarah\'s Birthday',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    type: 'birthday'
  },
  {
    id: '3',
    title: 'Company Anniversary',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    type: 'anniversary',
    description: '5 years of innovation!'
  },
  {
    id: '4',
    title: 'Product Demo',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    type: 'event',
    description: 'Quarterly product demonstration'
  }
];

// Mock kudos
export const kudos: Kudo[] = [
  {
    id: '1',
    from: 'David Chen',
    to: 'Priya Sharma',
    message: 'Amazing work on the new dashboard components! The attention to detail is fantastic.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: '2',
    from: 'Marcus Williams',
    to: 'Alex Thompson',
    message: 'Thanks for staying late to fix the deployment issues. You saved the day!',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    id: '3',
    from: 'Sarah Johnson',
    to: 'Emma Rodriguez',
    message: 'Your marketing campaign ideas for the new feature are brilliant!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  }
];

// Default quick links
export const defaultQuickLinks: QuickLink[] = [
  {
    id: '1',
    name: 'Company Wiki',
    url: 'https://wiki.company.com'
  },
  {
    id: '2',
    name: 'HR Portal',
    url: 'https://hr.company.com'
  },
  {
    id: '3',
    name: 'Time Tracking',
    url: 'https://time.company.com'
  }
];

// Mock projects data
export const projects: Project[] = [
  {
    id: '1',
    name: 'New Employee Onboarding System',
    description: 'Redesign the employee onboarding process with digital workflows and automated paperwork to improve the new hire experience.',
    status: 'active',
    priority: 'high',
    progress: 65,
    startDate: new Date(2025, 6, 1), // July 1, 2025
    endDate: new Date(2025, 8, 15), // September 15, 2025
    teamMembers: ['Alex Thompson', 'Sarah Johnson', 'Marcus Williams', 'Priya Sharma'],
    tasks: [
      {
        id: 'task-1',
        title: 'Create onboarding workflow diagram',
        description: 'Map out the complete onboarding process from offer acceptance to first day',
        status: 'completed',
        priority: 'high',
        assignee: 'Alex Thompson',
        dueDate: new Date(2025, 6, 10),
        createdDate: new Date(2025, 6, 1)
      },
      {
        id: 'task-2',
        title: 'Design digital forms interface',
        description: 'Create user-friendly digital forms to replace paper documentation',
        status: 'in-progress',
        priority: 'medium',
        assignee: 'Sarah Johnson',
        dueDate: new Date(2025, 7, 5),
        createdDate: new Date(2025, 6, 5)
      }
    ]
  },
  {
    id: '2',
    name: 'Quarterly Performance Reviews',
    description: 'Implement a comprehensive performance review system with 360-degree feedback, goal tracking, and development planning.',
    status: 'active',
    priority: 'medium',
    progress: 30,
    startDate: new Date(2025, 5, 15), // June 15, 2025
    endDate: new Date(2025, 9, 30), // October 30, 2025
    teamMembers: ['Emma Rodriguez', 'David Chen', 'Lisa Park'],
    tasks: []
  },
  {
    id: '3',
    name: 'Office Space Optimization',
    description: 'Analyze and optimize office layout for better collaboration, productivity, and employee satisfaction.',
    status: 'completed',
    priority: 'low',
    progress: 100,
    startDate: new Date(2025, 3, 1), // April 1, 2025
    endDate: new Date(2025, 5, 30), // June 30, 2025
    teamMembers: ['James Wilson', 'Maria Garcia'],
    tasks: []
  },
  {
    id: '4',
    name: 'Remote Work Policy Update',
    description: 'Update company remote work policies to reflect post-pandemic work arrangements and hybrid schedules.',
    status: 'on-hold',
    priority: 'medium',
    progress: 45,
    startDate: new Date(2025, 4, 1), // May 1, 2025
    endDate: new Date(2025, 7, 31), // August 31, 2025
    teamMembers: ['Carlos Mendoza', 'Jennifer Foster'],
    tasks: []
  },
  {
    id: '5',
    name: 'Security Infrastructure Upgrade',
    description: 'Upgrade company-wide security infrastructure including multi-factor authentication and endpoint protection.',
    status: 'active',
    priority: 'high',
    progress: 80,
    startDate: new Date(2025, 6, 1), // July 1, 2025
    endDate: new Date(2025, 7, 15), // August 15, 2025
    teamMembers: ['Alex Thompson', 'Kevin Chang', 'Rachel Kumar'],
    tasks: []
  }
];

// Analytics Data
export const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: '1',
    name: 'Active Projects',
    value: 12,
    previousValue: 10,
    change: 20,
    changeType: 'increase',
    unit: 'projects',
    icon: 'FolderOpen'
  },
  {
    id: '2',
    name: 'Team Members',
    value: 45,
    previousValue: 42,
    change: 7.1,
    changeType: 'increase',
    unit: 'members',
    icon: 'Users'
  },
  {
    id: '3',
    name: 'Kudos Given',
    value: 128,
    previousValue: 95,
    change: 34.7,
    changeType: 'increase',
    unit: 'kudos',
    icon: 'Heart'
  },
  {
    id: '4',
    name: 'Project Completion Rate',
    value: 87.5,
    previousValue: 82.3,
    change: 6.3,
    changeType: 'increase',
    unit: '%',
    icon: 'TrendingUp'
  }
];

export const activityData: ActivityData[] = [
  { date: '2025-07-15', projects: 8, kudos: 12, announcements: 3, employees: 42 },
  { date: '2025-07-16', projects: 10, kudos: 15, announcements: 2, employees: 43 },
  { date: '2025-07-17', projects: 9, kudos: 18, announcements: 4, employees: 43 },
  { date: '2025-07-18', projects: 12, kudos: 22, announcements: 1, employees: 44 },
  { date: '2025-07-19', projects: 11, kudos: 16, announcements: 3, employees: 45 },
  { date: '2025-07-20', projects: 13, kudos: 25, announcements: 2, employees: 45 },
  { date: '2025-07-21', projects: 12, kudos: 20, announcements: 5, employees: 45 },
  { date: '2025-07-22', projects: 14, kudos: 28, announcements: 3, employees: 45 }
];

export const departmentData: DepartmentData[] = [
  { department: 'Engineering', employees: 18, projects: 8, satisfaction: 4.2 },
  { department: 'Design', employees: 6, projects: 4, satisfaction: 4.5 },
  { department: 'Product', employees: 8, projects: 6, satisfaction: 4.1 },
  { department: 'Marketing', employees: 5, projects: 3, satisfaction: 4.3 },
  { department: 'Sales', employees: 4, projects: 2, satisfaction: 4.0 },
  { department: 'HR', employees: 3, projects: 1, satisfaction: 4.4 },
  { department: 'Executive', employees: 1, projects: 1, satisfaction: 4.8 }
];

export const projectStatusData: ProjectStatusData[] = [
  { status: 'Active', count: 8, percentage: 66.7 },
  { status: 'Completed', count: 3, percentage: 25.0 },
  { status: 'On Hold', count: 1, percentage: 8.3 }
];

export const engagementData: EngagementData[] = [
  { month: 'Jan', kudosGiven: 85, kudosReceived: 82, announcements: 12 },
  { month: 'Feb', kudosGiven: 92, kudosReceived: 89, announcements: 15 },
  { month: 'Mar', kudosGiven: 78, kudosReceived: 81, announcements: 18 },
  { month: 'Apr', kudosGiven: 105, kudosReceived: 98, announcements: 14 },
  { month: 'May', kudosGiven: 118, kudosReceived: 115, announcements: 16 },
  { month: 'Jun', kudosGiven: 134, kudosReceived: 128, announcements: 20 },
  { month: 'Jul', kudosGiven: 128, kudosReceived: 132, announcements: 22 }
];

export const productivityData: ProductivityData[] = [
  { week: 'Week 1', tasksCompleted: 45, projectsDelivered: 2, teamEfficiency: 85 },
  { week: 'Week 2', tasksCompleted: 52, projectsDelivered: 1, teamEfficiency: 88 },
  { week: 'Week 3', tasksCompleted: 48, projectsDelivered: 3, teamEfficiency: 92 },
  { week: 'Week 4', tasksCompleted: 58, projectsDelivered: 2, teamEfficiency: 87 },
  { week: 'Week 5', tasksCompleted: 61, projectsDelivered: 4, teamEfficiency: 95 },
  { week: 'Week 6', tasksCompleted: 55, projectsDelivered: 2, teamEfficiency: 89 },
  { week: 'Week 7', tasksCompleted: 63, projectsDelivered: 3, teamEfficiency: 93 }
];
