import { cmsRepositories } from "../repositories/index.js";
import { ArticleService } from "./articleService.js";
import { NewsletterService } from "./newsletterService.js";
import { TagService } from "./tagService.js";
import { TestimonialService } from "./testimonialService.js";
import { TrendingTopicService } from "./trendingTopicService.js";

export const cmsServices = {
  newsletters: new NewsletterService(cmsRepositories.newsletters),
  articles: new ArticleService(cmsRepositories.articles),
  tags: new TagService(cmsRepositories.tags),
  testimonials: new TestimonialService(cmsRepositories.testimonials),
  trendingTopics: new TrendingTopicService(cmsRepositories.trendingTopics)
};

export type CmsServices = typeof cmsServices;

export * from "./newsletterService.js";
export * from "./articleService.js";
export * from "./tagService.js";
export * from "./testimonialService.js";
export * from "./trendingTopicService.js";
