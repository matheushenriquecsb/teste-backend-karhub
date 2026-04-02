export class Part {
  constructor(
    public readonly id: string,
    public name: string,
    public category: string,
    public currentStock: number,
    public minimumStock: number,
    public averageDailySales: number,
    public leadTimeDays: number,
    public unitCost: number,
    public criticalityLevel: number,
  ) {
    this.validate();
  }

  private validate() {
    if (this.minimumStock < 0) {
      throw new Error('Minimum stock cannot be negative');
    }
  }
}