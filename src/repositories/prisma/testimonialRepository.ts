import type { Prisma, PrismaClient } from "@prisma/client";
import type {
  TestimonialCreateInput,
  TestimonialRepository,
  TestimonialUpdateInput
} from "../types.js";
import { mapTestimonial } from "./utils.js";

export class PrismaTestimonialRepository implements TestimonialRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const records = await this.prisma.testimonial.findMany({
      orderBy: { id: "asc" }
    });

    return records.map(mapTestimonial);
  }

  async findById(id: number) {
    const record = await this.prisma.testimonial.findUnique({
      where: { id }
    });

    return record ? mapTestimonial(record) : null;
  }

  async create(payload: TestimonialCreateInput) {
    const record = await this.prisma.testimonial.create({
      data: {
        quote: payload.quote,
        author: payload.author,
        role: payload.role,
        company: payload.company ?? null,
        avatar: payload.avatar ?? null,
        isActive: payload.isActive ?? true
      }
    });

    return mapTestimonial(record);
  }

  async update(payload: TestimonialUpdateInput) {
    const { id, ...rest } = payload;

    const data: Prisma.TestimonialUpdateInput = {};

    if (rest.quote !== undefined) data.quote = rest.quote;
    if (rest.author !== undefined) data.author = rest.author;
    if (rest.role !== undefined) data.role = rest.role;
    if (rest.company !== undefined) data.company = rest.company ?? null;
    if (rest.avatar !== undefined) data.avatar = rest.avatar ?? null;
    if (rest.isActive !== undefined) data.isActive = rest.isActive;

    const record = await this.prisma.testimonial.update({
      where: { id },
      data
    });

    return mapTestimonial(record);
  }

  async delete(id: number) {
    await this.prisma.testimonial.delete({
      where: { id }
    });
  }

  async setActive(id: number, isActive: boolean) {
    const record = await this.prisma.testimonial.update({
      where: { id },
      data: { isActive }
    });

    return mapTestimonial(record);
  }
}
