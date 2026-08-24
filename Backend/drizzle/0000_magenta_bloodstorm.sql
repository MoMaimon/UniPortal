CREATE TYPE "public"."status" AS ENUM('open', 'closed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('FTF', 'online', 'hyprid');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "course" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"credit_hours" integer NOT NULL,
	CONSTRAINT "credit_hour_check" CHECK ("course"."credit_hours" >= 0)
);
--> statement-breakpoint
CREATE TABLE "section" (
	"number" integer NOT NULL,
	"course_code" text NOT NULL,
	"teacher_id" uuid NOT NULL,
	"days" integer NOT NULL,
	"start_time" integer NOT NULL,
	"endTime" integer NOT NULL,
	"status" "status" DEFAULT 'open' NOT NULL,
	"type" "type" DEFAULT 'FTF' NOT NULL,
	"room" text,
	CONSTRAINT "section_number_unique" UNIQUE("number"),
	CONSTRAINT "non_negative" CHECK ("section"."days" >= 0 AND "section"."start_time" >= 0 AND "section"."endTime" >= 0 AND "section"."number" >= 0)
);
--> statement-breakpoint
CREATE TABLE "teacher" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"gender" "gender",
	"should_avoid" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_course_code_course_code_fk" FOREIGN KEY ("course_code") REFERENCES "public"."course"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_teacher_id_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;