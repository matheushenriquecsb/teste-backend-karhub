import { IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdatePartDto {
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsNumber()
    @Min(0)
    currentStock: number;

    @IsNumber()
    @Min(0)
    minimumStock: number;

    @IsNumber()
    @Min(0)
    averageDailySales: number;

    @IsNumber()
    @Min(0)
    leadTimeDays: number;

    @IsNumber()
    @Min(0)
    unitCost: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    criticalityLevel: number;
}