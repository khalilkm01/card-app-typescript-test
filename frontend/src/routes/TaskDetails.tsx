import React, { useContext } from "react";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { GlobalContextType, Task } from "@/@types/context";
import { Link, useParams } from "react-router-dom";
import TagManager from "../components/TagManager";
import CommentSection from "../components/CommentSection";
import { Card, CardContent, CardTitle } from "../components/ui/card";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, projects } = useContext(GlobalAppContext) as GlobalContextType;
  const task = tasks.find((t: Task) => t.id === id);

  if (!task)
    return (
      <div className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen p-5">
      <Card className="shadow-lg dark:bg-gray-800 bg-gray-100 max-w-lg mx-auto">
        <CardContent>
          <CardTitle className="text-2xl font-semibold mb-4">{task.title}</CardTitle>
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Category:</strong> {task.category}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Project:</strong> {projects.map((p) => p.id === task.projectId && p.name)}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Deadline:</strong> {task.deadline?.toDateString() || "No deadline"}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Is Controversial:</strong> {task.isControversial ? "Yes" : "No"}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Parent Task:</strong>{" "}
              {tasks.map((t) => t.id === task.parentTaskId && t.title) || "No parent task"}
            </p>
            <p className="block text-sm font-medium mb-2">
              <strong>Tags:</strong> {task.tags.join(", ") || "No tags"}
            </p>
          </div>
          <div className="mb-4">
            <Link to={`/task/${id}/edit`} className="text-blue-500 hover:underline">
              Edit Task
            </Link>
          </div>
          <div className="mb-4">
            <TagManager taskId={id!} />
          </div>
          <div className="mb-4">
            <CommentSection taskId={id!} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
