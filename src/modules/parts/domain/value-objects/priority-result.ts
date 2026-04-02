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