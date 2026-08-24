import {
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { course } from "./course.js";
import { teacher } from "./teacher.js";
import { sql } from "drizzle-orm";

export const status = pgEnum("status", ["open", "closed", "canceled"]);
export const type = pgEnum("type", ["FTF", "online", "hyprid"]);

export const section = pgTable(
  "section",
  {
    number: integer("number").notNull().unique(),
    courseCode: text("course_code")
      .notNull()
      .references(() => course.code),
    teacherId: uuid("teacher_id")
      .notNull()
      .references(() => teacher.id),
    days: integer("days").notNull(),
    startTime: integer("start_time").notNull(),
    endTime: integer("endTime").notNull(),
    status: status("status").notNull().default("open"),
    type: type("type").notNull().default("FTF"),
    room: text("room"),
  },
  (table) => [
    check(
      "non_negative",
      sql`${table.days} >= 0 AND ${table.startTime} >= 0 AND ${table.endTime} >= 0 AND ${table.number} >= 0`,
    ),
  ],
);
