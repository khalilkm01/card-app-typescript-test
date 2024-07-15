export class TaskCreateInput {
  title!: string;
  description?: string;
  status?: string;
  priority?: string;
  category!: string;
  projectId!: string;
  deadline?: string;
  scheduledDate?: string;
  isControversial?: boolean;
  parentTaskId?: string;
  tags?: string[];
}
