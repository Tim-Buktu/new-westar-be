import { prisma } from "../lib/prisma.js";
import { PrismaArticleRepository } from "./prisma/articleRepository.js";
import { PrismaNewsletterRepository } from "./prisma/newsletterRepository.js";
import { PrismaTagRepository } from "./prisma/tagRepository.js";
import { PrismaTestimonialRepository } from "./prisma/testimonialRepository.js";
import { PrismaTrendingTopicRepository } from "./prisma/trendingTopicRepository.js";

export const cmsRepositories = {
  newsletters: new PrismaNewsletterRepository(prisma),
  articles: new PrismaArticleRepository(prisma),
  tags: new PrismaTagRepository(prisma),
  testimonials: new PrismaTestimonialRepository(prisma),
  trendingTopics: new PrismaTrendingTopicRepository(prisma)
};

export type CmsRepositories = typeof cmsRepositories;

export * from "./types.js";
