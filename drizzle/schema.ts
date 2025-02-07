import { pgTable, foreignKey, serial, text, varchar, timestamp, integer, numeric, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const flashcards = pgTable("flashcards", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	question: text().notNull(),
	answer: text().notNull(),
	tags: text().array(),
	difficulty: varchar({ length: 50 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "flashcards_user_id_users_id_fk"
		}),
]);

export const subTopics = pgTable("sub_topics", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	category: varchar({ length: 50 }).notNull(),
	difficulty: varchar({ length: 50 }).notNull(),
	sectionId: integer("section_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	notesId: integer("notes_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [studySections.id],
			name: "sub_topics_section_id_study_sections_id_fk"
		}),
	foreignKey({
			columns: [table.notesId],
			foreignColumns: [studySections.id],
			name: "sub_topics_notes_id_study_sections_id_fk"
		}),
]);

export const userActivityLog = pgTable("user_activity_log", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	action: varchar({ length: 200 }).notNull(),
	sectionId: integer("section_id"),
	subTopicId: integer("sub_topic_id"),
	timestamp: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [studySections.id],
			name: "user_activity_log_section_id_study_sections_id_fk"
		}),
	foreignKey({
			columns: [table.subTopicId],
			foreignColumns: [subTopics.id],
			name: "user_activity_log_sub_topic_id_sub_topics_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_activity_log_user_id_users_id_fk"
		}),
]);

export const studySections = pgTable("study_sections", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: text(),
	userId: text("user_id").notNull(),
	discipline: varchar().notNull(),
	totalHours: numeric("total_hours"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "study_sections_user_id_users_id_fk"
		}),
]);

export const studyMetrics = pgTable("study_metrics", {
	id: serial().primaryKey().notNull(),
	sectionId: integer("section_id").notNull(),
	userId: text("user_id").notNull(),
	progressPercentage: numeric("progress_percentage", { precision: 5, scale:  2 }).notNull(),
	averageDailyHours: numeric("average_daily_hours", { precision: 5, scale:  2 }).notNull(),
	estimatedCompletionDate: timestamp("estimated_completion_date", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [studySections.id],
			name: "study_metrics_section_id_study_sections_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "study_metrics_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	email: varchar({ length: 100 }).notNull(),
	imageUrl: text("image_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	consecutiveStudyDays: integer("consecutive_study_days").default(0),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const notes = pgTable("notes", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	subTopicId: integer("sub_topic_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.subTopicId],
			foreignColumns: [subTopics.id],
			name: "notes_sub_topic_id_sub_topics_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "notes_user_id_users_id_fk"
		}),
]);
