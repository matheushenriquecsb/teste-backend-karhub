import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from '../../domain/entities/part.entity';
import { PartOrmEntity } from '../typeorm/part.orm-entity';
import { PartMapper } from '../mappers/part.mapper';
import { PartsRepository } from '../../domain/repositories/parts.repository.interface';

@Injectable()
export class TypeOrmPartsRepository implements PartsRepository {
    constructor(
        @InjectRepository(PartOrmEntity)
        private readonly repo: Repository<PartOrmEntity>,
    ) { }

    async create(part: Part): Promise<Part> {
        const entity = this.repo.create(PartMapper.toOrm(part));
        const saved = await this.repo.save(entity);
        return PartMapper.toDomain(saved);
    }

    async findAll(
        offset: number,
        limit: number,
    ): Promise<{ data: Part[]; total: number }> {
        const [entities, total] = await this.repo.findAndCount({
            skip: offset,
            take: limit,
        });

        return {
            data: entities.map(PartMapper.toDomain),
            total,
        };
    }

    async findById(id: string): Promise<Part | null> {
        const data = await this.repo.findOne({ where: { id } });
        return data ? PartMapper.toDomain(data) : null;
    }

    async findByCategory(category: string): Promise<Part[]> {
        const data = await this.repo.find({ where: { category } });
        return data.map(PartMapper.toDomain);
    }

    async update(part: Part): Promise<Part> {
        await this.repo.save(PartMapper.toOrm(part));
        return part;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}