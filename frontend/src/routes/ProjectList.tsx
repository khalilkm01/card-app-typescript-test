import React, { useContext } from "react";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { GlobalContextType } from "@/@types/context";
import { Link } from "react-router-dom";

const ProjectList: React.FC = () => {
  const { projects } = useContext(GlobalAppContext) as GlobalContextType;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-transform duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            <Link to={`/project/${project.id}/edit`} className="text-blue-500 hover:underline mt-4 inline-block">
              Edit Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
