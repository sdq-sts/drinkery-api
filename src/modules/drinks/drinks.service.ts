import { Inject, Injectable } from '@nestjs/common';
import { drinks, Drink, DrinkQueryParams } from '@/database/schema';
import * as schema from '@/database/schema';
import { PG_CONNECTION } from '@/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, ilike, or } from 'drizzle-orm';

@Injectable()
export class DrinksService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  findAll(filters: DrinkQueryParams) {
    const limit = 10;
    const offset = 0;
    const drinksFilters = and(
      filters.search &&
        or(
          ilike(drinks.name, `%${filters.search}%`),
          ilike(drinks.description, `%${filters.search}%`),
          ilike(drinks.description, `%${filters.search}%`),
        ),
      filters.season && eq(drinks.recommended_season, filters.season),
      filters.alcoholic && eq(drinks.is_alcoholic, filters.alcoholic),
    );

    return this.db
      .select()
      .from(drinks)
      .limit(filters.limit ?? limit)
      .offset(filters.offset ?? offset)
      .where(drinksFilters)
      .execute();
  }

  findOne(id: string): Promise<Drink> {
    return this.db.query.drinks.findFirst({
      where: eq(drinks.id, id),
    });
  }
}
