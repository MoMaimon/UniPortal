import {
  check,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  uuid,
} from "drizzle-orm/pg-core";
import { course } from "./course.js";
import { teacher } from "./teacher.js";
import { sql } from "drizzle-orm";

export const status = pgEnum("status", ["open", "closed", "canceled"]);
export const type = pgEnum("type", ["FTF", "online", "hybrid"]);

export const section = pgTable(
  "section",
  {
    number: integer("number").notNull(),
    courseCode: text("course_code")
      .notNull()
      .references(() => course.code),
    teacherId: uuid("teacher_id")
      .notNull()
      .references(() => teacher.id),
    days: integer("days").notNull(),
    startTime: time("start_time", {
      precision: 0,
      withTimezone: false,
    }).notNull(),
    endTime: time("end_time", { precision: 0, withTimezone: false }).notNull(),
    status: status("status").notNull().default("open"),
    type: type("type").notNull().default("FTF"),
    room: text("room"),
  },
  (table) => [
    primaryKey({ columns: [table.number, table.courseCode] }),
    check(
      "non_negative",
      sql`${table.days} > 0 AND ${table.days} < 128 AND ${table.number} > 0`,
    ),
  ],
);
