import type { PrismaClient } from "@prisma/client";
import type {
  ArticleCreateInput,
  ArticleRepository,
  ArticleUpdateInput,
  Identifier
} from "../types.js";
import {
  buildArticleUpdateData,
  mapArticle,
  serializeArticle
} from "./utils.js";

const normalizeId = (id: Identifier): string => String(id);

export class PrismaArticleRepository implements ArticleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const records = await this.prisma.article.findMany({
      orderBy: [{ position: "asc" }, { date: "desc" }]
    });

    return records.map(mapArticle);
  }

  async findVisible() {
    const records = await this.prisma.article.findMany({
      where: { isVisible: true },
      orderBy: [{ position: "asc" }, { date: "desc" }]
    });

    return records.map(mapArticle);
  }

  async findById(id: Identifier) {
    const record = await this.prisma.article.findUnique({
      where: { id: normalizeId(id) }
    });

    return record ? mapArticle(record) : null;
  }

  async create(payload: ArticleCreateInput) {
    const record = await this.prisma.article.create({
      data: serializeArticle(payload)
    });

    return mapArticle(record);
  }

  async update(payload: ArticleUpdateInput) {
    const { id, ...rest } = payload;

    const record = await this.prisma.article.update({
      where: { id: normalizeId(id) },
      data: buildArticleUpdateData(rest)
    });

    return mapArticle(record);
  }

  async delete(id: Identifier) {
    await this.prisma.article.delete({
      where: { id: normalizeId(id) }
    });
  }

  async reorderPositions(entries: Array<{ id: Identifier; position: number }>) {
    if (entries.length === 0) {
      return;
    }

    await this.prisma.$transaction(
      entries.map(({ id, position }) =>
        this.prisma.article.update({
          where: { id: normalizeId(id) },
          data: { position }
        })
      )
    );
  }
}
