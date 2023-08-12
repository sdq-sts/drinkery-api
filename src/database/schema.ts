import { InferModel } from 'drizzle-orm';
import {
  text,
  pgTable,
  varchar,
  uuid,
  timestamp,
  json,
  boolean,
} from 'drizzle-orm/pg-core';

const recommendedSeason = [
  'spring',
  'summer',
  'fall',
  'winter',
  'any',
] as const;

const optimalTimeToEnjoy = [
  'day',
  'brunch',
  'evening',
  'night',
  'any',
] as const;

export const drinks = pgTable('drinks', {
  id: uuid('id').unique().defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description').notNull(),
  ingredients: json('ingredients').default([]),
  instructions: json('instructions').default([]),
  images: json('images').default([]).notNull(),
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

export type Drink = InferModel<typeof drinks>;
export type NewDrink = InferModel<typeof drinks, 'insert'>;
