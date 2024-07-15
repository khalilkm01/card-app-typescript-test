export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Status = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export type ESGCategory = "ENVIRONMENTAL" | "SOCIAL" | "GOVERNANCE";

export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  category: ESGCategory;
  tags: Tag[];
  deadline?: Date;
  scheduledDate?: Date;
  isControversial: boolean;
  projectId: string;
  project: Project;
  parentTaskId?: string;
  parentTask?: Task;
  subTasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
}

export class TaskCreateInput {
  title!: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  category!: ESGCategory;
  projectId!: string;
  deadline?: string;
  scheduledDate?: string;
  isControversial?: boolean;
  parentTaskId?: string;
  tags?: string[];
}

export class TaskUpdateInput {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  category?: ESGCategory;
  projectId!: string;
  deadline?: string;
  scheduledDate?: string;
  isControversial?: boolean;
  parentTaskId?: string;
  tags?: string[];
}

export interface GlobalContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  createProject: (projectData: { name: string; description: string }) => Promise<Project>;
  updateProject: (id: string, projectData: { name: string; description: string }) => Promise<Project>;
  createTask: (taskData: TaskCreateInput) => Promise<Task>;
  updateTask: (id: string, taskData: TaskUpdateInput) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}
