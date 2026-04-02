import { RestockPriorityService } from './restock-priority.service';
import { Part } from '../entities/part.entity';
import { InMemoryPartsRepository } from '../../infra/repositories/in-memory-parts.repository';

describe('RestockPriorityService', () => {
    let service: RestockPriorityService;
    let repository: InMemoryPartsRepository;

    beforeEach(() => {
        service = new RestockPriorityService();
        repository = new InMemoryPartsRepository();
    });

    it('should calculate priority correctly', async () => {
        const part = new Part(
            '1',
            'Filtro',
            'engine',
            15,
            20,
            4,
            5,
            10,
            3
        );

        await repository.create(part);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result.length).toBe(1);
        expect(result[0].urgencyScore).toBe(75);
    });

    it('should not return parts if the stock is acceptable', async () => {
        const part = new Part(
            '1',
            'Filtro',
            'engine',
            100,
            20,
            1,
            2,
            10,
            3
        );

        await repository.create(part);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        const expectedConsumption = parts[0].averageDailySales * parts[0].leadTimeDays
        const projectedStock = parts[0].currentStock - expectedConsumption

        expect(result).toEqual([]);
        expect(projectedStock).toBeGreaterThan(expectedConsumption);
    });

    it('should must deal with zero sales', async () => {
        const part = new Part(
            '1',
            'Filtro',
            'engine',
            10,
            20,
            0,
            5,
            10,
            3
        );

        await repository.create(part);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result.length).toBe(1);
    });

    it('should be increased urgency score with high lead time', async () => {
        const part = new Part(
            '1',
            'Filtro',
            'engine',
            10,
            20,
            2,
            30,
            10,
            3
        );

        await repository.create(part);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result[0].urgencyScore).toBe(210);
    });

    it('should prioritize higher criticalityLevel in case of a tie', async () => {
        const p1 = new Part('1', 'A', 'engine', 5, 20, 5, 2, 10, 5);
        const p2 = new Part('2', 'B', 'engine', 5, 20, 5, 2, 10, 3);

        await repository.create(p1);
        await repository.create(p2);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result[0].criticalityLevel).toBeGreaterThan(
            result[1].criticalityLevel
        );
    });

    it('should sort alphabetically in case of a tie', async () => {
        const p1 = new Part('1', 'B', 'engine', 5, 20, 5, 2, 10, 3);
        const p2 = new Part('2', 'A', 'engine', 5, 20, 5, 2, 10, 3);

        await repository.create(p1);
        await repository.create(p2);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result[0].name).toBe('A');
    });

    it('should deal with negative inventory', async () => {
        const part = new Part(
            '1',
            'Filtro',
            'engine',
            0,
            20,
            5,
            5,
            10,
            3
        );

        await repository.create(part);

        const parts = await repository.findAll();
        const result = service.calculate(parts);

        expect(result[0].urgencyScore).toBeGreaterThan(50);
    });
});