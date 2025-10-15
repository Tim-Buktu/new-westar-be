import type {
  TestimonialCreateInput,
  TestimonialRepository,
  TestimonialUpdateInput
} from "../repositories/types.js";

export class TestimonialService {
  constructor(private readonly repository: TestimonialRepository) {}

  list() {
    return this.repository.findAll();
  }

  get(id: number) {
    return this.repository.findById(id);
  }

  create(payload: TestimonialCreateInput) {
    return this.repository.create({
      ...payload,
      isActive: payload.isActive ?? true
    });
  }

  update(payload: TestimonialUpdateInput) {
    return this.repository.update(payload);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  toggleActive(id: number, isActive: boolean) {
    return this.repository.setActive(id, isActive);
  }
}
