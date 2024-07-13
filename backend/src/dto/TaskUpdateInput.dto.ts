export class TaskUpdateInput {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
  projectId!: string;
  deadline?: string;
  isControversial?: boolean;
  parentTaskId?: string;
  tags!: string[];
}
