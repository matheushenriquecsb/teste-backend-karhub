import { Part } from "../entities/part.entity";

export interface PriorityResult {
    partId: string;
    name: string;
    currentStock: number;
    projectedStock: number;
    minimumStock: number;
    urgencyScore: number;
    criticalityLevel: number;
    averageDailySales: number;
}

export interface PartsResponse {
    data: Part[];
    total: Number;
}

export interface GetAllResponse {
    data: Part[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PriorityRestockResponse {
    priorities: Partial<PriorityResult>[]
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
}