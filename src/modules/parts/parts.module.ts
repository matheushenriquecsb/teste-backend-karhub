import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PARTS_REPOSITORY, PartsService } from './application/parts.service';
import { PartsController } from './presentation/parts.controller';
import { PartOrmEntity } from './infra/typeorm/part.orm-entity';
import { TypeOrmPartsRepository } from './infra/repositories/typeorm-parts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PartOrmEntity])],
  providers: [PartsService, {
    provide: PARTS_REPOSITORY,
    useClass: TypeOrmPartsRepository,
  },],
  controllers: [PartsController]
})
export class PartsModule { }
