interface UserActivityLog {
  id: number;
  userId: string;
  action: string;
  sectionId?: number;
  subTopicId?: number;
  duration: number;
  timestamp: Date;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  consecutiveStudyDays: number;
}

interface StudySection {
  id: number;
  name: string;
  description?: string;
  userId: string;
  discipline: string;
  totalHours: number;
  totalHoursStudied: number;
  status: "ativo" | "ausente" | "pausado" | "concluído";
  createdAt: Date;
  updatedAt: Date;
}

interface SubTopic {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  sectionId: number;
  notesId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StudyMetric {
  id: number;
  sectionId: number;
  userId: string;
  totalHoursGoal: string; // decimal é retornado como string
  totalHoursStudied: string; // decimal é retornado como string
  progressPercentage: string; // decimal é retornado como string
  averageDailyHours: string; // decimal é retornado como string
  estimatedCompletionDate: Date | null;
  reminderEnabled: boolean;
  reminderTime: Date | null;
  updatedAt: Date;
}

interface Note {
  id: number;
  userId: string;
  subTopicId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Flashcard {
  id: number;
  userId: string;
  question: string;
  answer: string;
  tags?: string[];
  difficulty?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type {
  Flashcard,
  Note,
  StudyMetric,
  StudySection,
  SubTopic,
  User,
  UserActivityLog,
};
