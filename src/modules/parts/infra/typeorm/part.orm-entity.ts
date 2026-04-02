import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parts')
export class PartOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    currentStock: number;

    @Column()
    minimumStock: number;

    @Column()
    averageDailySales: number;

    @Column()
    leadTimeDays: number;

    @Column('decimal')
    unitCost: number;

    @Column()
    criticalityLevel: number;
}