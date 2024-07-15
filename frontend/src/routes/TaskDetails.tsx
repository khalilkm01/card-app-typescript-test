import { GlobalContextType, Task } from "@/@types/context";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import TagManager from "../components/TagManager";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { GlobalAppContext } from "../utilities/GlobalAppContext";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, projects } = useContext(GlobalAppContext) as GlobalContextType;
  const task = tasks.find((t: Task) => t.id === id);

  if (!task)
    return (
      <div className="bg-background text-foreground min-h-screen flex justify-center items-center">Loading...</div>
    );

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <Card className="shadow-xl bg-card max-w-2xl mx-auto rounded-lg">
        <CardContent className="p-6">
          <CardTitle className="text-3xl font-bold mb-6">{task.title}</CardTitle>
          <div className="space-y-4 mb-6">
            <p>
              <strong className="text-primary">Status:</strong> {task.status}
            </p>
            <p>
              <strong className="text-primary">Priority:</strong> {task.priority}
            </p>
            <p>
              <strong className="text-primary">Category:</strong> {task.category}
            </p>
            <p>
              <strong className="text-primary">Description:</strong> {task.description}
            </p>
            <p>
              <strong className="text-primary">Project:</strong>{" "}
              {projects.find((p) => p.id === task.projectId)?.name || "Project not found"}
            </p>
            <p>
              <strong className="text-primary">Deadline:</strong>{" "}
              {task.deadline ? task.deadline.toDateString() : "No deadline"}
            </p>
            <p>
              <strong className="text-primary">Scheduled Date:</strong>{" "}
              {task.scheduledDate ? task.scheduledDate.toDateString() : "No scheduled date"}
            </p>
            <p>
              <strong className="text-primary">Is Controversial:</strong> {task.isControversial ? "Yes" : "No"}
            </p>
            <p>
              <strong className="text-primary">Parent Task:</strong>{" "}
              {task.parentTaskId
                ? tasks.find((t) => t.id === task.parentTaskId)?.title || "Parent task not found"
                : "No parent task"}
            </p>
            <p>
              <strong className="text-primary">Tags:</strong> {task.tags.length > 0 ? task.tags.join(", ") : "No tags"}
            </p>
          </div>
          <div className="mb-6">
            <Link
              to={`/task/${id}/edit`}
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-300"
            >
              Edit Task
            </Link>
          </div>
          <div className="mb-6">
            <TagManager taskId={id!} />
          </div>
          <div>
            <CommentSection taskId={id!} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
