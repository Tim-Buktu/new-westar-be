import type {
  ArticleCreateInput,
  ArticleRepository,
  ArticleUpdateInput,
  Identifier
} from "../repositories/types.js";

export class ArticleService {
  constructor(private readonly repository: ArticleRepository) {}

  list() {
    return this.repository.findAll();
  }

  listVisible() {
    return this.repository.findVisible();
  }

  get(id: Identifier) {
    return this.repository.findById(id);
  }

  create(payload: ArticleCreateInput) {
    const enriched: ArticleCreateInput = {
      ...payload,
      isVisible: payload.isVisible ?? true
    };

    // TODO: enforce positioning defaults and normalization for Prompt 3.
    return this.repository.create(enriched);
  }

  update(payload: ArticleUpdateInput) {
    return this.repository.update(payload);
  }

  delete(id: Identifier) {
    return this.repository.delete(id);
  }

  reorder(entries: Array<{ id: Identifier; position: number }>) {
    return this.repository.reorderPositions(entries);
  }
}
