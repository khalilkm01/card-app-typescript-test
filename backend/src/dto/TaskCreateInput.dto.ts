export class TaskCreateInput {
  title!: string;
  description?: string;
  status?: string;
  priority?: string;
  category!: string;
  projectId!: string;
  dateScheduled?: string;
  deadline?: string;
  isControversial?: boolean;
  parentTaskId?: string;
  tags?: string[];
}
