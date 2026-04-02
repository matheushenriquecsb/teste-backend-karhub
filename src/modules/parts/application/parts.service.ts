import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Part } from '../domain/entities/part.entity';
import type { PartsRepository } from '../domain/repositories/parts.repository.interface';
import { GetAllResponse, PriorityRestockResponse, PriorityResult } from '../domain/value-objects/parts-result';
import { RestockPriorityService } from '../domain/services/restock-priority.service';
import { CreatePartDto } from '../presentation/dto/create-part.dto';
import { UpdatePartDto } from '../presentation/dto/update-part.dto';

export const PARTS_REPOSITORY = 'PARTS_REPOSITORY';

@Injectable()
export class PartsService {
    constructor(
        @Inject(PARTS_REPOSITORY)
        private readonly repository: PartsRepository,
    ) { }

    private readonly priorityService = new RestockPriorityService();

    async create(payload: CreatePartDto): Promise<Part> {
        const part = new Part(
            uuid(),
            payload.name,
            payload.category,
            payload.currentStock,
            payload.minimumStock,
            payload.averageDailySales,
            payload.leadTimeDays,
            payload.unitCost,
            payload.criticalityLevel,
        );


        return this.repository.create(part);
    }

    async getAll(
        page: number,
        limit: number,
        category?: string,
    ): Promise<GetAllResponse> {
        if (category) {
            const data = await this.repository.findByCategory(category);

            return {
                data,
                total: data.length,
                page: 1,
                limit: data.length,
                totalPages: 1,
            };
        }

        const offset = (page - 1) * limit;

        const { data, total } = await this.repository.findAll(offset, limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async update(id: string, payload: UpdatePartDto): Promise<Part> {
        const part = await this.repository.findById(id);

        if (!part) throw new NotFoundException();

        const updated = new Part(
            id,
            payload.name ?? part.name,
            payload.category ?? part.category,
            payload.currentStock ?? part.currentStock,
            payload.minimumStock ?? part.minimumStock,
            payload.averageDailySales ?? part.averageDailySales,
            payload.leadTimeDays ?? part.leadTimeDays,
            payload.unitCost ?? part.unitCost,
            payload.criticalityLevel ?? part.criticalityLevel,
        );

        return this.repository.update(updated);
    }

    async remove(id: string): Promise<void> {
        return this.repository.delete(id);
    }

    async getRestockPriorities(page: number, limit: number): Promise<PriorityRestockResponse> {
        const offset = (page - 1) * limit;
        const parts = await this.repository.findAll(offset, limit);
        const priorities = this.priorityService.calculate(parts.data);
        const total = priorities.length;

        return {
            priorities: priorities.map(p => ({
                partId: p.partId,
                name: p.name,
                currentStock: p.currentStock,
                projectedStock: p.projectedStock,
                minimumStock: p.minimumStock,
                urgencyScore: p.urgencyScore,
            })),
            total,
            page,
            limit
        };
    }

}
