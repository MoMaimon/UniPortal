import { boolean, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const gender = pgEnum("gender", ["male", "female"]);

export const teacher = pgTable("teacher", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  gender: gender("gender"),
  shouldAvoid: boolean("should_avoid").default(false),
});
