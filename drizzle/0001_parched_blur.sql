ALTER TABLE "study_metrics" ADD COLUMN "total_hours_goal" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "study_metrics" ADD COLUMN "total_hours_studied" numeric(5, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "study_metrics" ADD COLUMN "reminder_enabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "study_metrics" ADD COLUMN "reminder_time" timestamp;