import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { ESGCategory, GlobalContextType, Priority, Project, Status, Task } from "@/@types/context";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ESG_CATEGORIES } from "../utilities/categories";
import { PRIORITIES } from "../utilities/priorities";
import { STATUSES } from "../utilities/statuses";

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, projects, updateTask } = useContext(GlobalAppContext) as GlobalContextType;
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    const currentTask = tasks.find((t) => t.id === id);
    if (currentTask) {
      setTask(currentTask);
    }
  }, [id, tasks]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      setIsLoading(true);
      await updateTask(id || "", {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        category: task.category,
        projectId: task.projectId,
        deadline: task.deadline?.toString(),
        isControversial: task.isControversial,
        parentTaskId: task.parentTaskId,
        tags: task.tags.map((tag) => tag.name), // Assuming tags is an array of objects with a name property
      });
      setIsLoading(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/");
      }, 2000);
    }
  };

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
          <CardTitle className="text-2xl font-semibold mb-4">Edit Task</CardTitle>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value as Status })}
                className="w-full p-2 border rounded"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value as Priority })}
                className="w-full p-2 border rounded"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="category">
                ESG Category
              </label>
              <select
                id="category"
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value as ESGCategory })}
                className="w-full p-2 border rounded"
              >
                {ESG_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="project">
                Project
              </label>
              <select
                id="project"
                value={task.projectId}
                onChange={(e) => setTask({ ...task, projectId: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map((project: Project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
            {showSuccessMessage && <div className="mt-4 text-center text-green-500">Task updated successfully!</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTask;
