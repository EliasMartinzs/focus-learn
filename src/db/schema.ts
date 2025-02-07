import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tabela de Log de Atividades dos Usuários
export const userActivityLog = pgTable("user_activity_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  action: varchar("action", { length: 200 }).notNull(), // Ex.: "Estudou Matemática"
  sectionId: integer("section_id").references(() => studySections.id),
  subTopicId: integer("sub_topic_id").references(() => subTopics.id),
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
    .references(() => users.id)
    .notNull(),
  discipline: varchar("discipline").notNull(),
  totalHours: integer("total_hours"),
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
  sectionId: integer("section_id")
    .notNull()
    .references(() => studySections.id),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  progressPercentage: decimal("progress_percentage", {
    precision: 5,
    scale: 2,
  }).notNull(), // Progresso percentual da seção
  averageDailyHours: decimal("average_daily_hours", {
    precision: 5,
    scale: 2,
  }).notNull(), // Horas médias de estudo por dia
  estimatedCompletionDate: timestamp("estimated_completion_date"), // Data estimada para conclusão
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
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
  userId: text("user_id")
    .references(() => users.id)
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
  flashcards: many(flashcards), // Um usuário pode ter muitos flashcards
}));

// Relações das Seções de Estudo
export const sectionRelations = relations(studySections, ({ one, many }) => ({
  subTopics: many(subTopics), // Uma seção tem muitos subtópicos
  user: one(users, {
    fields: [studySections.userId],
    references: [users.id],
  }), // Uma seção pertence a um usuário
  metrics: many(studyMetrics),
}));

export const subTopicRelations = relations(subTopics, ({ many }) => ({
  notes: many(notes),
}));
