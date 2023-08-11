import { InferModel } from 'drizzle-orm';
import { text, pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
export type NewUser = Omit<InferModel<typeof users, 'insert'>, 'password'>;
