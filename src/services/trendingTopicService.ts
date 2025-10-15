import type {
  TrendingTopicCreateInput,
  TrendingTopicRepository,
  TrendingTopicUpdateInput
} from "../repositories/types.js";

export class TrendingTopicService {
  constructor(private readonly repository: TrendingTopicRepository) {}

  list() {
    return this.repository.findAll();
  }

  get(id: number) {
    return this.repository.findById(id);
  }

  create(payload: TrendingTopicCreateInput) {
    return this.repository.create(payload);
  }

  update(payload: TrendingTopicUpdateInput) {
    return this.repository.update(payload);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
