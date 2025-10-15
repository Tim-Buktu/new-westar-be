export type ImageRef = {
  url: string;
  alt?: string;
};

export type Author = {
  name: string;
  role?: string;
  avatar?: string;
};

export type NewsletterResource = {
  title: string;
  description: string;
  url: string;
  type: "video" | "download";
};

export type ArticleResource = NewsletterResource & {
  type: "video" | "download" | "report" | "guide";
};

export type ImageLike = string | ImageRef;

export type Newsletter = {
  id: string | number;
  title: string;
  date: string;
  displayDate?: string;
  keyDiscussion?: string | string[];
  content?: string;
  contentHtml?: string;
  image?: ImageLike;
  tags: string[];
  newsletterUrl?: string;
  summary?: string;
  category?: string;
  views?: number;
  author?: Author;
  lastUpdated?: string;
  insights?: string[];
  resources?: NewsletterResource[];
};

export type Article = {
  id: string | number;
  title: string;
  date: string;
  displayDate?: string;
  content?: string;
  keyDiscussion?: string | string[];
  image?: ImageLike;
  tags: string[];
  summary?: string;
  category?: string;
  views?: number;
  author?: Author;
  lastUpdated?: string;
  insights?: string[];
  resources?: ArticleResource[];
  showcaseSection?: "featured" | "mosaic" | "loop";
  isVisible?: boolean;
  position?: number;
};

export type AvailableTag = {
  name: string;
  color?: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  isActive: boolean;
};

export type TrendingTopic = {
  id?: number;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  position?: number;
};
