import { GlobalContextType } from "@/@types/context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { GlobalAppContext } from "../utilities/GlobalAppContext";

const ProjectList: React.FC = () => {
  const { projects } = useContext(GlobalAppContext) as GlobalContextType;

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="shadow-xl bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-primary mb-4">{project.name}</CardTitle>
              <p className="text-muted-foreground mb-6">{project.description}</p>
              <Link
                to={`/project/${project.id}/edit`}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-300"
              >
                Edit Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
