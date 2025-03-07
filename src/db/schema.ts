import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  decimal,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";

export const statusEnum = pgEnum("status_enum", [
  "ativo",
  "ausente",
  "pausado",
  "concluído",
]);

// Tabela de Log de Atividades dos Usuários
export const userActivityLog = pgTable("user_activity_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  action: varchar("action", { length: 200 }).notNull(), // Ex.: "Estudou Matemática"
  sectionId: integer("section_id").references(() => studySections.id),
  subTopicId: integer("sub_topic_id").references(() => subTopics.id),
  duration: integer("duration").notNull(), // Duração em minutos
  timestamp: timestamp("timestamp").notNull(),
});

// Tabela de Usuários
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  consecutiveStudyDays: integer("consecutive_study_days").default(0),
});

// Tabela de Seções de Estudo
export const studySections = pgTable("study_sections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  discipline: varchar("discipline").notNull(),
  status: statusEnum("status").default("ativo").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Tabela de Subtópicos
export const subTopics = pgTable("sub_topics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  sectionId: integer("section_id")
    .references(() => studySections.id)
    .notNull(),
  notesId: integer("notes_id")
    .references(() => studySections.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const studyMetrics = pgTable("study_metrics", {
  id: serial("id").primaryKey(),
  sectionId: varchar("section_id")
    .notNull()
    .references(() => studySections.id)
    .unique(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  totalHoursGoal: decimal("total_hours_goal", {
    precision: 5,
    scale: 2,
  }).notNull(),
  totalHoursStudied: decimal("total_hours_studied", {
    precision: 5,
    scale: 2,
  })
    .default("0")
    .notNull(),
  progressPercentage: decimal("progress_percentage", {
    precision: 5,
    scale: 2,
  }).notNull(),
  averageDailyHours: decimal("average_daily_hours", {
    precision: 5,
    scale: 2,
  }).notNull(),
  estimatedCompletionDate: timestamp("estimated_completion_date"),
  reminderEnabled: boolean("reminder_enabled").default(false),
  reminderTime: timestamp("reminder_time"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  subTopicId: integer("sub_topic_id")
    .references(() => subTopics.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  sectionId: integer("section_id")
    .references(() => studySections.id, { onDelete: "cascade" })
    .notNull(),
  question: text("question").notNull(),
  aswer: text("answer").notNull(),
  tags: text("tags").array(),
  difficulty: varchar("difficulty", { length: 50 }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Relações dos Usuários
export const userRelations = relations(users, ({ many }) => ({
  sections: many(studySections), // Um usuário tem muitas seções de estudo
  activities: many(userActivityLog), // Um usuário pode ter várias atividades no log
  notes: many(notes), // Um usuário pode ter muitas notas
}));

// Relações das Seções de Estudo
export const sectionRelations = relations(studySections, ({ one, many }) => ({
  subTopics: many(subTopics), // Uma seção tem muitos subtópicos
  user: one(users, {
    fields: [studySections.userId],
    references: [users.id],
  }), // Uma seção pertence a um usuário
  metrics: one(studyMetrics),
  flashcards: many(flashcards), // Um usuário pode ter muitos flashcards
}));

export const subTopicRelations = relations(subTopics, ({ many }) => ({
  notes: many(notes),
}));

export type StudySection = InferSelectModel<typeof studySections>;
export type StudyMetrics = InferSelectModel<typeof studyMetrics>;
export type Flashcard = InferSelectModel<typeof flashcards>;
export type SubTopic = InferSelectModel<typeof subTopics>;
export type Note = InferSelectModel<typeof notes>;
export type UserActivityLog = InferSelectModel<typeof userActivityLog>;
