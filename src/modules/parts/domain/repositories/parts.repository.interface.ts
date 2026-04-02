import { Part } from '../../domain/entities/part.entity';

export interface PartsRepository {
  create(part: Part): Promise<Part>;
  findAll(): Promise<Part[]>;
  findById(id: string): Promise<Part | null>;
  findByCategory(category: string): Promise<Part[]>;
  update(part: Part): Promise<Part>;
  delete(id: string): Promise<void>;
}