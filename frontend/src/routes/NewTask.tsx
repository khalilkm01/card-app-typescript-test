import React, { useContext, useState } from "react";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { ESGCategory, GlobalContextType, Priority, Project, Status } from "@/@types/context";
import { ESG_CATEGORIES } from "../utilities/categories";
import { PRIORITIES } from "../utilities/priorities";
import { STATUSES } from "../utilities/statuses";

const NewTask: React.FC = () => {
  const { tasks, projects, setTasks, createTask } = useContext(GlobalAppContext) as GlobalContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>("TODO");
  const [priority, setPriority] = useState<Priority>("LOW");
  const [category, setCategory] = useState<ESGCategory>("ENVIRONMENTAL");
  const [projectId, setProjectId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createTask({ title, description, status, priority, category, projectId });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen p-5 flex justify-center items-center"
    >
      <div className="shadow-lg dark:bg-gray-800 bg-gray-100 max-w-lg w-full p-6 rounded">
        <h1 className="text-2xl font-semibold mb-4">Create New Task</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full p-2 border rounded dark:text-gray-400"
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
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full p-2 border rounded dark:text-gray-400"
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
            value={category}
            onChange={(e) => setCategory(e.target.value as ESGCategory)}
            className="w-full p-2 border rounded dark:text-gray-400"
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
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full p-2 border rounded dark:text-gray-400"
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
        <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default NewTask;
