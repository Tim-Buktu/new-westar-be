import type {
  Article,
  AvailableTag,
  Newsletter,
  Testimonial,
  TrendingTopic
} from "../domain/types.js";

export type Identifier = string | number;

export type NewsletterCreateInput = Omit<Newsletter, "id">;
export type NewsletterUpdateInput = {
  id: Identifier;
} & Partial<Omit<Newsletter, "id">>;

export type ArticleCreateInput = Omit<Article, "id">;
export type ArticleUpdateInput = {
  id: Identifier;
} & Partial<Omit<Article, "id">>;

export type TagCreateInput = AvailableTag;
export type TagUpdateInput = Partial<AvailableTag>;

export type TestimonialCreateInput = Omit<Testimonial, "id">;
export type TestimonialUpdateInput = {
  id: number;
} & Partial<Omit<Testimonial, "id">>;

export type TrendingTopicCreateInput = Omit<TrendingTopic, "id">;
export type TrendingTopicUpdateInput = {
  id: number;
} & Partial<Omit<TrendingTopic, "id">>;

export interface NewsletterRepository {
  findAll(): Promise<Newsletter[]>;
  findById(id: Identifier): Promise<Newsletter | null>;
  create(payload: NewsletterCreateInput): Promise<Newsletter>;
  update(payload: NewsletterUpdateInput): Promise<Newsletter>;
  delete(id: Identifier): Promise<void>;
}

export interface ArticleRepository {
  findAll(): Promise<Article[]>;
  findVisible(): Promise<Article[]>;
  findById(id: Identifier): Promise<Article | null>;
  create(payload: ArticleCreateInput): Promise<Article>;
  update(payload: ArticleUpdateInput): Promise<Article>;
  delete(id: Identifier): Promise<void>;
  reorderPositions(entries: Array<{ id: Identifier; position: number }>): Promise<void>;
}

export interface TagRepository {
  findAll(): Promise<AvailableTag[]>;
  findByName(name: string): Promise<AvailableTag | null>;
  create(payload: TagCreateInput): Promise<AvailableTag>;
  update(name: string, payload: TagUpdateInput): Promise<AvailableTag>;
  delete(name: string): Promise<void>;
}

export interface TestimonialRepository {
  findAll(): Promise<Testimonial[]>;
  findById(id: number): Promise<Testimonial | null>;
  create(payload: TestimonialCreateInput): Promise<Testimonial>;
  update(payload: TestimonialUpdateInput): Promise<Testimonial>;
  delete(id: number): Promise<void>;
  setActive(id: number, isActive: boolean): Promise<Testimonial>;
}

export interface TrendingTopicRepository {
  findAll(): Promise<TrendingTopic[]>;
  findById(id: number): Promise<TrendingTopic | null>;
  create(payload: TrendingTopicCreateInput): Promise<TrendingTopic>;
  update(payload: TrendingTopicUpdateInput): Promise<TrendingTopic>;
  delete(id: number): Promise<void>;
}
