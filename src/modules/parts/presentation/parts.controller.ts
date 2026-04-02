import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { PartsService } from '../application/parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from '../domain/entities/part.entity';
import { PartsResponse, PriorityResult } from '../domain/value-objects/parts-result';

@Controller('parts')
export class PartsController {
  constructor(private readonly service: PartsService) { }

  @Post()
  create(@Body() dto: CreatePartDto): Promise<Part> {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('category') category?: string, @Query('page') page = 1,
    @Query('limit') limit = 50): Promise<PartsResponse> {
    return this.service.getAll(page, limit, category);
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
  priorities(@Query('page') page = 1,
    @Query('limit') limit = 50): Promise<{
      priorities: Partial<PriorityResult>[];
    }> {
    return this.service.getRestockPriorities(page, limit);
  }
}