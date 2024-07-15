import { ESGCategory, GlobalContextType, Priority, Project, Status } from "@/@types/context";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { ESG_CATEGORIES } from "../utilities/categories";
import { PRIORITIES } from "../utilities/priorities";
import { STATUSES } from "../utilities/statuses";

const NewTask: React.FC = () => {
  const { projects, createTask, refresh } = useContext(GlobalAppContext) as GlobalContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>("TODO");
  const [priority, setPriority] = useState<Priority>("LOW");
  const [category, setCategory] = useState<ESGCategory>("ENVIRONMENTAL");
  const [dateScheduled, setdateScheduled] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateScheduled || !deadline) {
      alert("Please provide both a scheduled date and a deadline.");
      return;
    }

    setIsLoading(true);
    try {
      await createTask({
        title,
        description,
        status,
        priority,
        category,
        dateScheduled: new Date(dateScheduled).toString(),
        deadline: new Date(deadline).toString(),
        projectId,
      });
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/"); // Redirect to the home page or task list
      }, 2000);
    } catch (error) {
      alert("Failed to create task. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-8 flex justify-center items-center">
      <Card className="shadow-xl bg-card max-w-lg w-full rounded-lg">
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold mb-6">Create New Task</CardTitle>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full bg-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="w-full bg-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full p-2 bg-input text-foreground border-border rounded"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full p-2 bg-input text-foreground border-border rounded"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="category">
                ESG Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ESGCategory)}
                className="w-full p-2 bg-input text-foreground border-border rounded"
              >
                {ESG_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="dateScheduled">
                Scheduled Date
              </label>
              <Input
                id="dateScheduled"
                type="date"
                value={dateScheduled}
                onChange={(e) => setdateScheduled(e.target.value)}
                className="w-full bg-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="deadline">
                Deadline
              </label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="project">
                Project
              </label>
              <select
                id="project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full p-2 bg-input text-foreground border-border rounded"
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </form>
          {showSuccess && (
            <div className="mt-4 p-2 bg-primary/10 text-primary rounded text-center">
              Task created successfully! Redirecting...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTask;
