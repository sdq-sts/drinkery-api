import { InferModel } from 'drizzle-orm';
import {
  text,
  pgTable,
  varchar,
  uuid,
  timestamp,
  json,
  boolean,
  numeric,
} from 'drizzle-orm/pg-core';

const recommendedSeason = ['spring', 'summer', 'fall', 'winter'] as const;

const optimalTimeToEnjoy = ['day', 'brunch', 'evening', 'night'] as const;

export const drinks = pgTable('drinks', {
  id: uuid('id').unique().defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description').notNull(),
  ingredients: json('ingredients').$type<string[]>().default([]),
  instructions: json('instructions').$type<string[]>().default([]),
  images: json('images').$type<string[]>().default([]).notNull(),
  price: numeric('price', { scale: 2 }).notNull(),
  recommended_season: text('recommended_season', {
    enum: recommendedSeason,
  }).notNull(),
  optimal_time_to_enjoy: text('optimal_time_to_enjoy', {
    enum: optimalTimeToEnjoy,
  }).notNull(),
  is_alcoholic: boolean('is_alcoholic').notNull(),
  prompt: text('prompt'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});

export type DrinkSeasons = (typeof recommendedSeason)[number];
export type Drink = InferModel<typeof drinks>;
export type DrinkNew = InferModel<typeof drinks, 'insert'>;
export type DrinkQueryParams = {
  search?: string;
  season?: DrinkSeasons;
  alcoholic?: boolean;
  limit?: number;
  offset?: number;
};
