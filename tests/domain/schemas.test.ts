import {
  createArticleSchema,
  createNewsletterSchema,
  reorderArticlesPayloadSchema,
  tagPayloadSchema,
  testimonialPayloadSchema,
  trendingTopicPayloadSchema,
  updateArticleSchema
} from "../../src/domain/schemas.js";

describe("domain schemas", () => {
  it("validates newsletter payload with minimal fields", () => {
    const result = createNewsletterSchema.safeParse({
      title: "Weekly",
      date: "2024-01-01T00:00:00.000Z",
      tags: [],
      image: {
        url: "https://example.com/image.jpg"
      }
    });

    expect(result.success).toBe(true);
  });

  it("rejects newsletter payload with invalid date", () => {
    const result = createNewsletterSchema.safeParse({
      title: "Weekly",
      date: "not-a-date",
      tags: []
    });

    expect(result.success).toBe(false);
  });

  it("validates article creation with default visibility", () => {
    const result = createArticleSchema.safeParse({
      title: "Article",
      date: "2024-01-01T00:00:00.000Z",
      tags: ["news"],
      resources: [
        {
          title: "Guide",
          description: "How to use",
          url: "https://example.com/resource.pdf",
          type: "guide"
        }
      ]
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isVisible).toBe(true);
    }
  });

  it("ensures reorder payload positions are integers", () => {
    const result = reorderArticlesPayloadSchema.safeParse([
      { id: "1", position: 0 },
      { id: "2", position: 2 }
    ]);

    expect(result.success).toBe(true);
  });

  it("rejects tag payload with invalid color", () => {
    const result = tagPayloadSchema.safeParse({
      name: "Logistics",
      color: "blue"
    });

    expect(result.success).toBe(false);
  });

  it("defaults testimonial isActive to true", () => {
    const result = testimonialPayloadSchema.safeParse({
      quote: "Great service",
      author: "Jane",
      role: "Manager"
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isActive).toBe(true);
    }
  });

  it("requires https urls for trending topics", () => {
    const result = trendingTopicPayloadSchema.safeParse({
      title: "Topic",
      linkUrl: "http://example.com"
    });

    expect(result.success).toBe(false);
  });

  it("allows partial updates for articles", () => {
    const result = updateArticleSchema.safeParse({
      id: "123",
      title: "Updated",
      tags: ["tag1", "tag2"],
      position: 1
    });

    expect(result.success).toBe(true);
  });
});
