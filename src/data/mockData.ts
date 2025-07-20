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

export interface QuickLink {
  id: string;
  name: string;
  url: string;
}

// Current user data
export const currentUser: User = {
  id: '1',
  name: 'Priya',
  role: 'Frontend Developer',
  department: 'Engineering',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
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
