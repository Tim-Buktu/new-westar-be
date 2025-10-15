import type { Prisma, PrismaClient } from "@prisma/client";
import type {
  TrendingTopicCreateInput,
  TrendingTopicRepository,
  TrendingTopicUpdateInput
} from "../types.js";
import { mapTrendingTopic } from "./utils.js";

export class PrismaTrendingTopicRepository implements TrendingTopicRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const records = await this.prisma.trendingTopic.findMany({
      orderBy: [{ position: "asc" }, { id: "asc" }]
    });

    return records.map(mapTrendingTopic);
  }

  async findById(id: number) {
    const record = await this.prisma.trendingTopic.findUnique({
      where: { id }
    });

    return record ? mapTrendingTopic(record) : null;
  }

  async create(payload: TrendingTopicCreateInput) {
    const record = await this.prisma.trendingTopic.create({
      data: {
        title: payload.title,
        description: payload.description ?? null,
        imageUrl: payload.imageUrl ?? null,
        linkUrl: payload.linkUrl ?? null,
        position: payload.position ?? null
      }
    });

    return mapTrendingTopic(record);
  }

  async update(payload: TrendingTopicUpdateInput) {
    const { id, ...rest } = payload;
    const data: Prisma.TrendingTopicUpdateInput = {};

    if (rest.title !== undefined) data.title = rest.title;
    if (rest.description !== undefined) data.description = rest.description ?? null;
    if (rest.imageUrl !== undefined) data.imageUrl = rest.imageUrl ?? null;
    if (rest.linkUrl !== undefined) data.linkUrl = rest.linkUrl ?? null;
    if (rest.position !== undefined) data.position = rest.position ?? null;

    const record = await this.prisma.trendingTopic.update({
      where: { id },
      data
    });

    return mapTrendingTopic(record);
  }

  async delete(id: number) {
    await this.prisma.trendingTopic.delete({
      where: { id }
    });
  }
}
