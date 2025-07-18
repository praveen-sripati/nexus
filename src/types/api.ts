// Define the shape of the data we expect to return from the parse function
export interface ParsedArticle {
  title: string;
  content: string; // The article's HTML content
  textContent: string; // The article's text content
  excerpt: string; // A short summary
  byline: string; // The author or site name
  domain: string;
}
