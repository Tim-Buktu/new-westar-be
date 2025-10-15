import type { PrismaClient } from "@prisma/client";
import type {
  TagCreateInput,
  TagRepository,
  TagUpdateInput
} from "../types.js";
import { mapTag, normalizeTagName } from "./utils.js";

export class PrismaTagRepository implements TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const records = await this.prisma.tag.findMany({
      orderBy: { name: "asc" }
    });

    return records.map(mapTag);
  }

  async findByName(name: string) {
    const record = await this.prisma.tag.findUnique({
      where: { normalizedName: normalizeTagName(name) }
    });

    return record ? mapTag(record) : null;
  }

  async create(payload: TagCreateInput) {
    const record = await this.prisma.tag.create({
      data: {
        name: payload.name,
        normalizedName: normalizeTagName(payload.name),
        color: payload.color ?? null
      }
    });

    return mapTag(record);
  }

  async update(name: string, payload: TagUpdateInput) {
    const data: {
      name?: string;
      normalizedName?: string;
      color?: string | null;
    } = {};

    if (payload.name !== undefined) {
      data.name = payload.name;
      data.normalizedName = normalizeTagName(payload.name);
    }

    if (payload.color !== undefined) {
      data.color = payload.color ?? null;
    }

    const record = await this.prisma.tag.update({
      where: { normalizedName: normalizeTagName(name) },
      data
    });

    return mapTag(record);
  }

  async delete(name: string) {
    await this.prisma.tag.delete({
      where: { normalizedName: normalizeTagName(name) }
    });
  }
}
