export interface Link {
  id: string;
  user_id: string;
  url: string;
  title: string | null;
  domain: string | null;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  // We don't need to fetch the full 'content' for the list view
  content?: string | null; 
  excerpt: string | null; // Add this line
  importance: number; // Add this line
}