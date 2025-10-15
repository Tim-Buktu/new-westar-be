import { Prisma } from "@prisma/client";
import {
  buildArticleUpdateData,
  buildNewsletterUpdateData,
  normalizeTagName
} from "../../src/repositories/prisma/utils.js";

describe("repository utils", () => {
  it("normalizes tag names to trimmed lowercase", () => {
    expect(normalizeTagName(" Logistics ")).toBe("logistics");
  });

  it("converts newsletter lastUpdated to Date", () => {
    const update = buildNewsletterUpdateData({
      lastUpdated: "2024-01-15T00:00:00.000Z"
    });

    expect((update.lastUpdated as Date).toISOString()).toBe(
      "2024-01-15T00:00:00.000Z"
    );
  });

  it("includes showcase section and visibility in article updates", () => {
    const update = buildArticleUpdateData({
      showcaseSection: "mosaic",
      isVisible: false
    });

    expect(update.showcaseSection).toBe("mosaic");
    expect(update.isVisible).toBe(false);
  });
});
