
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const greetingsTable = pgTable('greetings', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type Greeting = typeof greetingsTable.$inferSelect;
export type NewGreeting = typeof greetingsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { greetings: greetingsTable };
