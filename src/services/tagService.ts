import type {
  TagCreateInput,
  TagRepository,
  TagUpdateInput
} from "../repositories/types.js";

export class TagService {
  constructor(private readonly repository: TagRepository) {}

  list() {
    return this.repository.findAll();
  }

  get(name: string) {
    return this.repository.findByName(name);
  }

  create(payload: TagCreateInput) {
    return this.repository.create(payload);
  }

  update(name: string, payload: TagUpdateInput) {
    return this.repository.update(name, payload);
  }

  delete(name: string) {
    return this.repository.delete(name);
  }
}
