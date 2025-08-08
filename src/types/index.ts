export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  project?: string;
  category?: string;
  subtasks?: Subtask[];
  estimatedTime?: number; // en minutes
  actualTime?: number; // en minutes
  assignee?: string;
  attachments?: Attachment[];
  notifications?: Notification[];
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  parentTaskId?: string; // pour les sous-tâches
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'link';
  size?: number;
  uploadedAt: Date;
}

export interface Notification {
  id: string;
  type: 'reminder' | 'overdue' | 'due-soon' | 'completed';
  message: string;
  taskId: string;
  createdAt: Date;
  read: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  tasks: string[]; // IDs des tâches
  createdAt: Date;
  dueDate?: Date;
  progress: number; // 0-100
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags: string[];
  project?: string;
  category?: string;
  estimatedTime?: number;
  assignee?: string;
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  subtasks?: Subtask[];
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
  totalEstimatedTime: number;
  totalActualTime: number;
  averageCompletionTime: number;
  productivityScore: number;
  weeklyProgress: WeeklyProgress[];
  categoryStats: CategoryStats[];
}

export interface WeeklyProgress {
  week: string;
  completed: number;
  created: number;
  productivity: number;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  total: number;
  completed: number;
  completionRate: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  notifications: {
    enabled: boolean;
    reminderTime: number; // minutes avant échéance
    sound: boolean;
    desktop: boolean;
  };
  display: {
    defaultView: 'kanban' | 'list' | 'calendar';
    showCompleted: boolean;
    groupBy: 'status' | 'priority' | 'category' | 'none';
    sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  };
  shortcuts: {
    [key: string]: string;
  };
}

export interface AppState {
  tasks: Task[];
  categories: Category[];
  projects: Project[];
  settings: UserSettings;
  notifications: Notification[];
  searchHistory: string[];
  recentTasks: string[];
} 