import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { PartsService } from '../application/parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from '../domain/entities/part.entity';
import { PriorityResult } from '../domain/value-objects/priority-result';

@Controller('parts')
export class PartsController {
  constructor(private readonly service: PartsService) { }

  @Post()
  create(@Body() dto: CreatePartDto): Promise<Part> {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('category') category?: string): Promise<Part[]> {
    return this.service.getAll(category);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartDto): Promise<Part> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }

  @Get('/restock/priorities')
  priorities(): Promise<{
    priorities: Partial<PriorityResult>[];
  }> {
    return this.service.getRestockPriorities();
  }
}