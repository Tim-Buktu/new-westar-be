import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const httpsUrl = z
  .string()
  .url()
  .refine((url) => url.startsWith("https://"), {
    message: "URL must use https scheme"
  });

const isoDateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid ISO date string"
  });

const keyDiscussionSchema = z.union([
  z.string().min(1),
  z.array(z.string().min(1))
]);

const imageSchema = z.union([
  httpsUrl,
  z.object({
    url: httpsUrl,
    alt: z.string().min(1).optional()
  })
]);

const authorSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1).optional(),
  avatar: httpsUrl.optional()
});

const newsletterResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: httpsUrl,
  type: z.enum(["video", "download"])
});

const articleResourceSchema = newsletterResourceSchema.extend({
  type: z.enum(["video", "download", "report", "guide"])
});

const tagsSchema = z
  .array(z.string().min(1))
  .default([])
  .transform((value) => value.map((tag) => tag.trim()).filter(Boolean));

const baseContentSchema = z
  .object({
    title: z.string().min(1),
    date: isoDateString,
    displayDate: z.string().optional(),
    content: z.string().optional(),
    keyDiscussion: keyDiscussionSchema.optional(),
    image: imageSchema.optional(),
    tags: tagsSchema,
    summary: z.string().optional(),
    category: z.string().optional(),
    views: z.number().int().min(0).optional(),
    author: authorSchema.optional(),
    lastUpdated: isoDateString.optional(),
    insights: z.array(z.string().min(1)).optional(),
    resources: z.array(newsletterResourceSchema).optional()
  })
  .strict();

export const createNewsletterSchema = baseContentSchema.extend({
  newsletterUrl: httpsUrl.optional(),
  contentHtml: z.string().optional()
});

export const updateNewsletterSchema = createNewsletterSchema.partial().extend({
  id: z.union([z.string(), z.number()])
});

const baseArticleSchema = baseContentSchema
  .extend({
    resources: z.array(articleResourceSchema).optional(),
    showcaseSection: z.enum(["featured", "mosaic", "loop"]).optional(),
    isVisible: z.boolean().default(true),
    position: z.number().int().min(0).optional()
  })
  .strict();

export const createArticleSchema = baseArticleSchema;

export const updateArticleSchema = baseArticleSchema.partial().extend({
  id: z.union([z.string(), z.number()])
});

export const tagPayloadSchema = z
  .object({
    name: z.string().min(1),
    color: z
      .string()
      .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
        message: "Color must be a hex string such as #FFFFFF"
      })
      .optional()
  })
  .strict();

export const testimonialPayloadSchema = z
  .object({
    id: z.number().int().min(1).optional(),
    quote: z.string().min(1),
    author: z.string().min(1),
    role: z.string().min(1),
    company: z.string().optional(),
    avatar: httpsUrl.optional(),
    isActive: z.boolean().default(true)
  })
  .strict();

export const reorderArticlesPayloadSchema = z
  .array(
    z
      .object({
        id: z.union([z.string(), z.number()]),
        position: z.number().int().min(0)
      })
      .strict()
  )
  .min(1);

export const trendingTopicPayloadSchema = z
  .object({
    id: z.number().int().min(1).optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    imageUrl: httpsUrl.optional(),
    linkUrl: httpsUrl.optional(),
    position: z.number().int().min(0).optional()
  })
  .strict();

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.format()
      });
      return;
    }

    req.body = parseResult.data;
    next();
  };
