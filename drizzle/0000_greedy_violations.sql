CREATE TABLE "study_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"progress_percentage" numeric(5, 2) NOT NULL,
	"average_daily_hours" numeric(5, 2) NOT NULL,
	"estimated_completion_date" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"user_id" integer NOT NULL,
	"discipline" varchar NOT NULL,
	"total_hours" numeric,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"category" varchar(50) NOT NULL,
	"difficulty" varchar(50) NOT NULL,
	"section_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"action" varchar(200) NOT NULL,
	"section_id" integer,
	"sub_topic_id" integer,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"consecutive_study_days" integer DEFAULT 0,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "study_metrics" ADD CONSTRAINT "study_metrics_section_id_study_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."study_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_metrics" ADD CONSTRAINT "study_metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_sections" ADD CONSTRAINT "study_sections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_topics" ADD CONSTRAINT "sub_topics_section_id_study_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."study_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity_log" ADD CONSTRAINT "user_activity_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity_log" ADD CONSTRAINT "user_activity_log_section_id_study_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."study_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity_log" ADD CONSTRAINT "user_activity_log_sub_topic_id_sub_topics_id_fk" FOREIGN KEY ("sub_topic_id") REFERENCES "public"."sub_topics"("id") ON DELETE no action ON UPDATE no action;