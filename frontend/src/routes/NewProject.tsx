import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { GlobalContextType } from "@/@types/context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardTitle } from "../components/ui/card";

const NewProject: React.FC = () => {
  const { createProject } = useContext(GlobalAppContext) as GlobalContextType;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createProject({ name, description });
    setIsLoading(false);
    alert("Project created successfully!");
    navigate("/");
  };

  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen p-5 flex justify-center items-center">
      <Card className="shadow-lg dark:bg-gray-800 bg-gray-100 max-w-lg w-full p-6 rounded">
        <CardContent>
          <CardTitle className="text-2xl font-semibold mb-4">Create New Project</CardTitle>
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
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProject;
