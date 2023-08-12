import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinkSeasons } from '@/database/schema';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('season') season: DrinkSeasons,
    @Query('alcoholic') alcoholic: boolean,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const filters = { search, season, alcoholic, limit, offset };

    return this.drinksService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.drinksService.findOne(id);
  }
}
