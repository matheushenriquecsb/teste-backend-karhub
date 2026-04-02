
import { Part } from '../../domain/entities/part.entity';
import { PartsRepository } from '../../domain/repositories/parts.repository.interface';

export class InMemoryPartsRepository implements PartsRepository {
  private parts: Part[] = [];

  async create(part: Part): Promise<Part> {
    this.parts.push(part);
    return part;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Part[]; total: number }> {
    const total = this.parts.length;
    const offset = (page - 1) * limit;
    const data = this.parts.slice(offset, offset + limit);

    return {
      data,
      total,
    };
  }

  async findById(id: string): Promise<Part | null> {
    return this.parts.find(p => p.id === id) || null;
  }

  async findByCategory(category: string): Promise<Part[]> {
    return this.parts.filter(p => p.category === category);
  }

  async update(part: Part): Promise<Part> {
    const index = this.parts.findIndex(p => p.id === part.id);
    this.parts[index] = part;
    return part;
  }

  async delete(id: string): Promise<void> {
    this.parts = this.parts.filter(p => p.id !== id);
  }
}