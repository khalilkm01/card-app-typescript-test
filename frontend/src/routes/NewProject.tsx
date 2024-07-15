import { GlobalContextType } from "@/@types/context";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { GlobalAppContext } from "../utilities/GlobalAppContext";

const NewProject: React.FC = () => {
  const { createProject, refresh } = useContext(GlobalAppContext) as GlobalContextType;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createProject({ name, description });
    refresh();
    setIsLoading(false);
    alert("Project created successfully!");
    navigate("/");
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-8 flex justify-center items-center">
      <Card className="shadow-xl bg-card max-w-lg w-full rounded-lg">
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold mb-6">Create New Project</CardTitle>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
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
                placeholder="Project description"
                className="w-full bg-input text-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProject;
