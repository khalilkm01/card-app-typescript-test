import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { GlobalContextType, Project } from "@/@types/context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardTitle } from "../components/ui/card";

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject } = useContext(GlobalAppContext) as GlobalContextType;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentProject = projects.find((p) => p.id === id);
    if (currentProject) {
      setProject(currentProject);
      setName(currentProject.name);
      setDescription(currentProject.description || "");
    }
  }, [id, projects]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (project) {
      await updateProject(project.id, { name, description });
      setIsLoading(false);
      alert("Project updated successfully!");
      navigate("/");
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen p-5 flex justify-center items-center">
      <Card className="shadow-lg dark:bg-gray-800 bg-gray-100 max-w-lg w-full p-6 rounded">
        <CardContent>
          <CardTitle className="text-2xl font-semibold mb-4">Edit Project</CardTitle>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project description"
                className="w-full p-2 border rounded"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
              {isLoading ? "Updating..." : "Update Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;
