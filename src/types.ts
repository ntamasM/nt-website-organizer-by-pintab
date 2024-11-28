export interface Website {
  id: string; // Unique identifier
  title: string;
  url: string;
}

export interface Category {
  id: string; // Unique identifier for the category
  title: string; // Human-readable title for the category
  websites: Website[];
}

export interface Categories {
  [key: string]: Category;
}
