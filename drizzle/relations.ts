import { relations } from "drizzle-orm/relations";
import { users, flashcards, studySections, subTopics, userActivityLog, studyMetrics, notes } from "./schema";

export const flashcardsRelations = relations(flashcards, ({one}) => ({
	user: one(users, {
		fields: [flashcards.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	flashcards: many(flashcards),
	userActivityLogs: many(userActivityLog),
	studySections: many(studySections),
	studyMetrics: many(studyMetrics),
	notes: many(notes),
}));

export const subTopicsRelations = relations(subTopics, ({one, many}) => ({
	studySection_sectionId: one(studySections, {
		fields: [subTopics.sectionId],
		references: [studySections.id],
		relationName: "subTopics_sectionId_studySections_id"
	}),
	studySection_notesId: one(studySections, {
		fields: [subTopics.notesId],
		references: [studySections.id],
		relationName: "subTopics_notesId_studySections_id"
	}),
	userActivityLogs: many(userActivityLog),
	notes: many(notes),
}));

export const studySectionsRelations = relations(studySections, ({one, many}) => ({
	subTopics_sectionId: many(subTopics, {
		relationName: "subTopics_sectionId_studySections_id"
	}),
	subTopics_notesId: many(subTopics, {
		relationName: "subTopics_notesId_studySections_id"
	}),
	userActivityLogs: many(userActivityLog),
	user: one(users, {
		fields: [studySections.userId],
		references: [users.id]
	}),
	studyMetrics: many(studyMetrics),
}));

export const userActivityLogRelations = relations(userActivityLog, ({one}) => ({
	studySection: one(studySections, {
		fields: [userActivityLog.sectionId],
		references: [studySections.id]
	}),
	subTopic: one(subTopics, {
		fields: [userActivityLog.subTopicId],
		references: [subTopics.id]
	}),
	user: one(users, {
		fields: [userActivityLog.userId],
		references: [users.id]
	}),
}));

export const studyMetricsRelations = relations(studyMetrics, ({one}) => ({
	studySection: one(studySections, {
		fields: [studyMetrics.sectionId],
		references: [studySections.id]
	}),
	user: one(users, {
		fields: [studyMetrics.userId],
		references: [users.id]
	}),
}));

export const notesRelations = relations(notes, ({one}) => ({
	subTopic: one(subTopics, {
		fields: [notes.subTopicId],
		references: [subTopics.id]
	}),
	user: one(users, {
		fields: [notes.userId],
		references: [users.id]
	}),
}));