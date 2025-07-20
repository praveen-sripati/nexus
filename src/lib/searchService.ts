import { 
  employees, 
  announcements, 
  kudos, 
  calendarEvents, 
  forYouFeed
} from '@/data/mockData';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'employee' | 'announcement' | 'kudo' | 'event' | 'feed' | 'quick-link';
  data: unknown;
  relevance: number;
  route: string;
  searchParams?: Record<string, string>;
}

export class SearchService {
  private static normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  private static calculateRelevance(query: string, text: string): number {
    const normalizedQuery = this.normalizeText(query);
    const normalizedText = this.normalizeText(text);
    
    if (normalizedText.includes(normalizedQuery)) {
      // Exact match gets higher score
      if (normalizedText === normalizedQuery) return 100;
      // Match at beginning gets higher score
      if (normalizedText.startsWith(normalizedQuery)) return 80;
      // Partial match
      return 60;
    }
    
    // Check for partial word matches
    const queryWords = normalizedQuery.split(' ');
    const textWords = normalizedText.split(' ');
    let matchCount = 0;
    
    queryWords.forEach(queryWord => {
      textWords.forEach(textWord => {
        if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
          matchCount++;
        }
      });
    });
    
    return matchCount > 0 ? (matchCount / queryWords.length) * 40 : 0;
  }

  private static searchEmployees(query: string): SearchResult[] {
    return employees
      .map(employee => {
        const searchText = `${employee.name} ${employee.role} ${employee.department} ${employee.email || ''}`;
        const relevance = this.calculateRelevance(query, searchText);
        
        return {
          id: employee.id,
          title: employee.name,
          description: `${employee.role} • ${employee.department}`,
          type: 'employee' as const,
          data: employee,
          relevance,
          route: '/employees',
          searchParams: { highlight: employee.id }
        };
      })
      .filter(result => result.relevance > 0);
  }

  private static searchAnnouncements(query: string): SearchResult[] {
    return announcements
      .map(announcement => {
        const searchText = `${announcement.title} ${announcement.body}`;
        const relevance = this.calculateRelevance(query, searchText);
        
        return {
          id: announcement.id,
          title: announcement.title,
          description: announcement.body.length > 100 
            ? `${announcement.body.substring(0, 100)}...` 
            : announcement.body,
          type: 'announcement' as const,
          data: announcement,
          relevance,
          route: '/announcements',
          searchParams: { highlight: announcement.id }
        };
      })
      .filter(result => result.relevance > 0);
  }

  private static searchKudos(query: string): SearchResult[] {
    return kudos
      .map(kudo => {
        const searchText = `${kudo.from} ${kudo.to} ${kudo.message}`;
        const relevance = this.calculateRelevance(query, searchText);
        
        return {
          id: kudo.id,
          title: `${kudo.from} → ${kudo.to}`,
          description: kudo.message,
          type: 'kudo' as const,
          data: kudo,
          relevance,
          route: '/kudos',
          searchParams: { highlight: kudo.id }
        };
      })
      .filter(result => result.relevance > 0);
  }

  private static searchEvents(query: string): SearchResult[] {
    return calendarEvents
      .map(event => {
        const searchText = `${event.title} ${event.description || ''} ${event.type}`;
        const relevance = this.calculateRelevance(query, searchText);
        
        return {
          id: event.id,
          title: event.title,
          description: `${event.type.charAt(0).toUpperCase() + event.type.slice(1)} • ${event.date.toLocaleDateString()}`,
          type: 'event' as const,
          data: event,
          relevance,
          route: '/calendar',
          searchParams: { highlight: event.id }
        };
      })
      .filter(result => result.relevance > 0);
  }

  private static searchFeed(query: string): SearchResult[] {
    return forYouFeed
      .map(item => {
        const searchText = `${item.title} ${item.description} ${item.author || ''}`;
        const relevance = this.calculateRelevance(query, searchText);
        
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          type: 'feed' as const,
          data: item,
          relevance,
          route: '/for-you',
          searchParams: { highlight: item.id }
        };
      })
      .filter(result => result.relevance > 0);
  }

  public static search(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const allResults = [
      ...this.searchEmployees(query),
      ...this.searchAnnouncements(query),
      ...this.searchKudos(query),
      ...this.searchEvents(query),
      ...this.searchFeed(query)
    ];

    // Sort by relevance (highest first) and limit results
    return allResults
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 20); // Limit to top 20 results
  }

  public static searchByType(query: string, type: SearchResult['type']): SearchResult[] {
    const allResults = this.search(query);
    return allResults.filter(result => result.type === type);
  }

  public static getQuickActions(): Array<{
    label: string;
    action: () => void;
    icon: string;
  }> {
    return [
      {
        label: 'Search employees',
        action: () => {}, // Will be handled by parent component
        icon: 'users'
      },
      {
        label: 'Search announcements',
        action: () => {},
        icon: 'megaphone'
      },
      {
        label: 'Search calendar events',
        action: () => {},
        icon: 'calendar'
      },
      {
        label: 'Search kudos',
        action: () => {},
        icon: 'heart'
      }
    ];
  }
}
