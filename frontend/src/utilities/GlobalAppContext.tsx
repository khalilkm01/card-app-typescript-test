import React, { createContext, ReactNode, useEffect, useState } from "react";

import { GlobalContextType, Project, Tag, Task, TaskCreateInput, TaskUpdateInput } from "@/@types/context";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const GlobalAppContext = createContext<GlobalContextType | null>(null);

export const GlobalAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const initState = async () => {
    const tasks = await fetchTasks();
    const projects = await fetchProjects();
    setTasks(tasks);
    setProjects(projects);
  };

  useEffect(() => {
    initState();
  }, []);

  const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return response.data;
  };

  const fetchProjects = async (): Promise<Project[]> => {
    const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
    return response.data;
  };

  const createTask = async (taskData: TaskCreateInput): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, taskData, {
      headers: { "Content-Type": "application/json" },
    });
    setTasks((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateTask = async (id: string, taskData: TaskUpdateInput): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, taskData, {
      headers: { "Content-Type": "application/json" },
    });
    setTasks((tasks) => {
      const taskIndex = tasks.findIndex((obj) => obj.id == id);
      tasks[taskIndex] = response.data;
      return tasks;
    });
    return response.data;
  };

  const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const createProject = async (projectData: { name: string; description: string }): Promise<Project> => {
    const response = await axios.post<Project>(`${API_BASE_URL}/projects`, projectData);
    setProjects((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateProject = async (id: string, projectData: { name: string; description: string }): Promise<Project> => {
    const response = await axios.put<Project>(`${API_BASE_URL}/projects/${id}`, projectData);
    const updatedProject = response.data;
    setProjects((prev) => {
      const projectIndex = prev.findIndex((obj) => obj.id == id);
      prev[projectIndex] = updatedProject;
      return prev;
    });
    return response.data;
  };

  const deleteProject = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/projects/${id}`);
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  // TODO: Add Comment functionality to the application
  const createComment = async (commentData: { content: string; taskId: string }): Promise<Comment> => {
    const response = await axios.post<Comment>(`${API_BASE_URL}/comments`, commentData);
    const newComment = response.data;
    setTasks((prev) => {
      const taskIndex = prev.findIndex((obj) => obj.id == commentData.taskId);
      //prev[taskIndex].comments.push(newComment);
      return prev;
    });
    return response.data;
  };

  const updateComment = async (id: string, commentData: { content: string }): Promise<Comment> => {
    const response = await axios.put<Comment>(`${API_BASE_URL}/comments/${id}`, commentData);
    return response.data;
  };

  const deleteComment = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/comments/${id}`);
  };

  // Tag endpoints
  const fetchTags = async (): Promise<Tag[]> => {
    const response = await axios.get<Tag[]>(`${API_BASE_URL}/tags`);
    return response.data;
  };

  // ESG Category endpoints
  const fetchESGCategories = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/esg-categories`);
    return response.data;
  };

  // Priority endpoints
  const fetchPriorities = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/priorities`);
    return response.data;
  };

  // Status endpoints
  const fetchStatuses = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/statuses`);
    return response.data;
  };

  // Search endpoint
  const searchTasks = async (params: {
    query: string;
    category?: string;
    priority?: string;
    status?: string;
  }): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/search`, { params });
    return response.data;
  };

  return (
    <GlobalAppContext.Provider
      value={{
        tasks,
        setTasks,
        projects,
        setProjects,
        createProject,
        updateProject,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </GlobalAppContext.Provider>
  );
};
