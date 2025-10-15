import type {
  Identifier,
  NewsletterCreateInput,
  NewsletterRepository,
  NewsletterUpdateInput
} from "../repositories/types.js";

export class NewsletterService {
  constructor(private readonly repository: NewsletterRepository) {}

  list() {
    return this.repository.findAll();
  }

  get(id: Identifier) {
    return this.repository.findById(id);
  }

  create(payload: NewsletterCreateInput) {
    // TODO: apply any cross-entity validation before persisting (Prompt 3).
    return this.repository.create(payload);
  }

  update(payload: NewsletterUpdateInput) {
    return this.repository.update(payload);
  }

  delete(id: Identifier) {
    return this.repository.delete(id);
  }
}
