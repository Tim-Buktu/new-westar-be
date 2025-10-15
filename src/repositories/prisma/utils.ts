import type { Prisma, Article as ArticleModel, Newsletter as NewsletterModel, Tag as TagModel, Testimonial as TestimonialModel, TrendingTopic as TrendingTopicModel } from "@prisma/client";
import type {
  Article,
  AvailableTag,
  Newsletter,
  Testimonial,
  TrendingTopic
} from "../../domain/types.js";

type JsonRecord = Record<string, unknown>;

const toIsoString = (value: Date | null): string | undefined =>
  value ? value.toISOString() : undefined;

const coerceJson = <T>(value: unknown): T | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value as T;
};

export const mapNewsletter = (record: NewsletterModel): Newsletter => ({
  id: record.id,
  title: record.title,
  date: record.date.toISOString(),
  displayDate: record.displayDate ?? undefined,
  keyDiscussion: coerceJson<Newsletter["keyDiscussion"]>(record.keyDiscussion),
  content: record.content ?? undefined,
  contentHtml: record.contentHtml ?? undefined,
  image: coerceJson<Newsletter["image"]>(record.image),
  tags: record.tags,
  newsletterUrl: record.newsletterUrl ?? undefined,
  summary: record.summary ?? undefined,
  category: record.category ?? undefined,
  views: record.views ?? undefined,
  author: coerceJson<Newsletter["author"]>(record.author),
  lastUpdated: toIsoString(record.lastUpdated),
  insights: record.insights.length > 0 ? record.insights : undefined,
  resources: coerceJson<Newsletter["resources"]>(record.resources)
});

export const mapArticle = (record: ArticleModel): Article => ({
  id: record.id,
  title: record.title,
  date: record.date.toISOString(),
  displayDate: record.displayDate ?? undefined,
  content: record.content ?? undefined,
  keyDiscussion: coerceJson<Article["keyDiscussion"]>(record.keyDiscussion),
  image: coerceJson<Article["image"]>(record.image),
  tags: record.tags,
  summary: record.summary ?? undefined,
  category: record.category ?? undefined,
  views: record.views ?? undefined,
  author: coerceJson<Article["author"]>(record.author),
  lastUpdated: toIsoString(record.lastUpdated),
  insights: record.insights.length > 0 ? record.insights : undefined,
  resources: coerceJson<Article["resources"]>(record.resources),
  showcaseSection: record.showcaseSection ?? undefined,
  isVisible: record.isVisible,
  position: record.position ?? undefined
});

export const mapTag = (record: TagModel): AvailableTag => ({
  name: record.name,
  color: record.color ?? undefined
});

export const mapTestimonial = (record: TestimonialModel): Testimonial => ({
  id: record.id,
  quote: record.quote,
  author: record.author,
  role: record.role,
  company: record.company ?? undefined,
  avatar: record.avatar ?? undefined,
  isActive: record.isActive
});

export const mapTrendingTopic = (
  record: TrendingTopicModel
): TrendingTopic => ({
  id: record.id,
  title: record.title,
  description: record.description ?? undefined,
  imageUrl: record.imageUrl ?? undefined,
  linkUrl: record.linkUrl ?? undefined,
  position: record.position ?? undefined
});

export const normalizeTagName = (name: string): string => name.trim().toLowerCase();

const isoDate = (value: string | undefined): Date | undefined =>
  value ? new Date(value) : undefined;

const maybeJson = (
  value: unknown
): JsonRecord | string | string[] | undefined =>
  value === undefined ? undefined : (value as JsonRecord | string | string[]);

export const serializeNewsletter = (
  input: Omit<Newsletter, "id">
): Prisma.NewsletterCreateInput => ({
  title: input.title,
  date: new Date(input.date),
  displayDate: input.displayDate ?? undefined,
  keyDiscussion: (input.keyDiscussion as Prisma.InputJsonValue) ?? undefined,
  content: input.content ?? undefined,
  contentHtml: input.contentHtml ?? undefined,
  image: (input.image as Prisma.InputJsonValue) ?? undefined,
  tags: input.tags,
  newsletterUrl: input.newsletterUrl ?? undefined,
  summary: input.summary ?? undefined,
  category: input.category ?? undefined,
  views: input.views ?? undefined,
  author: (input.author as Prisma.InputJsonValue) ?? undefined,
  lastUpdated: input.lastUpdated ? new Date(input.lastUpdated) : undefined,
  insights: input.insights ?? [],
  resources: (input.resources as Prisma.InputJsonValue) ?? undefined
});

export const serializeArticle = (
  input: Omit<Article, "id">
): Prisma.ArticleCreateInput => ({
  title: input.title,
  date: new Date(input.date),
  displayDate: input.displayDate ?? undefined,
  content: input.content ?? undefined,
  keyDiscussion: (maybeJson(input.keyDiscussion) as Prisma.InputJsonValue) ?? undefined,
  image: (input.image as Prisma.InputJsonValue) ?? undefined,
  tags: input.tags,
  summary: input.summary ?? undefined,
  category: input.category ?? undefined,
  views: input.views ?? undefined,
  author: (input.author as Prisma.InputJsonValue) ?? undefined,
  lastUpdated: input.lastUpdated ? new Date(input.lastUpdated) : undefined,
  insights: input.insights ?? [],
  resources: (input.resources as Prisma.InputJsonValue) ?? undefined,
  showcaseSection: input.showcaseSection ?? undefined,
  isVisible: input.isVisible ?? true,
  position: input.position ?? undefined
});

export const buildNewsletterUpdateData = (
  input: Partial<Omit<Newsletter, "id">>
): Prisma.NewsletterUpdateInput => {
  const data: Prisma.NewsletterUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.date !== undefined) data.date = new Date(input.date);
  if (input.displayDate !== undefined) data.displayDate = input.displayDate;
  if (input.keyDiscussion !== undefined)
    data.keyDiscussion = input.keyDiscussion as Prisma.InputJsonValue;
  if (input.content !== undefined) data.content = input.content;
  if (input.contentHtml !== undefined) data.contentHtml = input.contentHtml;
  if (input.image !== undefined)
    data.image = input.image as Prisma.InputJsonValue;
  if (input.tags !== undefined) data.tags = input.tags;
  if (input.newsletterUrl !== undefined) data.newsletterUrl = input.newsletterUrl;
  if (input.summary !== undefined) data.summary = input.summary;
  if (input.category !== undefined) data.category = input.category;
  if (input.views !== undefined) data.views = input.views;
  if (input.author !== undefined) data.author = input.author as Prisma.InputJsonValue;
  if (input.lastUpdated !== undefined)
    data.lastUpdated = input.lastUpdated ? new Date(input.lastUpdated) : undefined;
  if (input.insights !== undefined) data.insights = input.insights;
  if (input.resources !== undefined)
    data.resources = input.resources as Prisma.InputJsonValue;

  return data;
};

export const buildArticleUpdateData = (
  input: Partial<Omit<Article, "id">>
): Prisma.ArticleUpdateInput => {
  const data: Prisma.ArticleUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.date !== undefined) data.date = new Date(input.date);
  if (input.displayDate !== undefined) data.displayDate = input.displayDate;
  if (input.content !== undefined) data.content = input.content;
  if (input.keyDiscussion !== undefined)
    data.keyDiscussion = input.keyDiscussion as Prisma.InputJsonValue;
  if (input.image !== undefined) data.image = input.image;
  if (input.tags !== undefined) data.tags = input.tags;
  if (input.summary !== undefined) data.summary = input.summary;
  if (input.category !== undefined) data.category = input.category;
  if (input.views !== undefined) data.views = input.views;
  if (input.author !== undefined)
    data.author = input.author as Prisma.InputJsonValue;
  if (input.lastUpdated !== undefined)
    data.lastUpdated = input.lastUpdated ? new Date(input.lastUpdated) : undefined;
  if (input.insights !== undefined) data.insights = input.insights;
  if (input.resources !== undefined)
    data.resources = input.resources as Prisma.InputJsonValue;
  if (input.showcaseSection !== undefined) data.showcaseSection = input.showcaseSection ?? null;
  if (input.isVisible !== undefined) data.isVisible = input.isVisible;
  if (input.position !== undefined) data.position = input.position;

  return data;
};
