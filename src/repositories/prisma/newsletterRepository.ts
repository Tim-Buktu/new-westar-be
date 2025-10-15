import type { PrismaClient } from "@prisma/client";
import type {
  Identifier,
  NewsletterCreateInput,
  NewsletterRepository,
  NewsletterUpdateInput
} from "../types.js";
import {
  buildNewsletterUpdateData,
  mapNewsletter,
  serializeNewsletter
} from "./utils.js";

const normalizeId = (id: Identifier): string => String(id);

export class PrismaNewsletterRepository implements NewsletterRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const records = await this.prisma.newsletter.findMany({
      orderBy: {
        date: "desc"
      }
    });

    return records.map(mapNewsletter);
  }

  async findById(id: Identifier) {
    const record = await this.prisma.newsletter.findUnique({
      where: { id: normalizeId(id) }
    });

    return record ? mapNewsletter(record) : null;
  }

  async create(payload: NewsletterCreateInput) {
    const record = await this.prisma.newsletter.create({
      data: serializeNewsletter(payload)
    });

    return mapNewsletter(record);
  }

  async update(payload: NewsletterUpdateInput) {
    const { id, ...rest } = payload;

    const record = await this.prisma.newsletter.update({
      where: { id: normalizeId(id) },
      data: buildNewsletterUpdateData(rest)
    });

    return mapNewsletter(record);
  }

  async delete(id: Identifier) {
    await this.prisma.newsletter.delete({
      where: { id: normalizeId(id) }
    });
  }
}
