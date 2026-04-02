
import { Part } from '../../domain/entities/part.entity';
import { PartOrmEntity } from '../typeorm/part.orm-entity';

export class PartMapper {
    static toDomain(entity: PartOrmEntity): Part {
        return new Part(
            entity.id,
            entity.name,
            entity.category,
            entity.currentStock,
            entity.minimumStock,
            entity.averageDailySales,
            entity.leadTimeDays,
            Number(entity.unitCost),
            entity.criticalityLevel,
        );
    }

    static toOrm(part: Part): PartOrmEntity {
        const entity = new PartOrmEntity();

        entity.id = part.id;
        entity.name = part.name;
        entity.category = part.category;
        entity.currentStock = part.currentStock;
        entity.minimumStock = part.minimumStock;
        entity.averageDailySales = part.averageDailySales;
        entity.leadTimeDays = part.leadTimeDays;
        entity.unitCost = part.unitCost;
        entity.criticalityLevel = part.criticalityLevel;

        return entity;
    }
}