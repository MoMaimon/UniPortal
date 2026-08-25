import { sql } from "drizzle-orm";
import { check, integer, pgTable, text } from "drizzle-orm/pg-core";

export const course = pgTable(
  "course",
  {
    code: text("code").primaryKey(),
    name: text("name").notNull(),
    creditHours: integer("credit_hours").notNull(),
  },
  (table) => [check("credit_hour_check", sql`${table.creditHours} >= 0`)],
);
