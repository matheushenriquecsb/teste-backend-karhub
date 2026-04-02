import { Part } from '../entities/part.entity';
import { PriorityResult } from '../value-objects/parts-result';

export class RestockPriorityService {
    calculate(parts: Part[]): PriorityResult[] {
        const priorities: PriorityResult[] = [];

        for (const part of parts) {
            const expectedConsumption =
                part.averageDailySales * part.leadTimeDays;

            const projectedStock =
                part.currentStock - expectedConsumption;

            if (projectedStock < part.minimumStock) {
                const urgencyScore =
                    (part.minimumStock - projectedStock) *
                    part.criticalityLevel;

                priorities.push({
                    partId: part.id,
                    name: part.name,
                    currentStock: part.currentStock,
                    projectedStock,
                    minimumStock: part.minimumStock,
                    urgencyScore,
                    criticalityLevel: part.criticalityLevel,
                    averageDailySales: part.averageDailySales,
                });
            }
        }


        return priorities.sort((a, b) => {
            if (b.urgencyScore !== a.urgencyScore) {
                return b.urgencyScore - a.urgencyScore;
            }

            if (b.criticalityLevel !== a.criticalityLevel) {
                return b.criticalityLevel - a.criticalityLevel;
            }

            if (b.averageDailySales !== a.averageDailySales) {
                return b.averageDailySales - a.averageDailySales;
            }

            return a.name.localeCompare(b.name);
        });
    }
}