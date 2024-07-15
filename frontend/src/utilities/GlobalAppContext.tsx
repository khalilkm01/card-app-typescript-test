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
    try {
      const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  };

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw error;
    }
  };

  const createTask = async (taskData: TaskCreateInput): Promise<Task> => {
    try {
      const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, taskData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTask = async (id: string, taskData: TaskUpdateInput): Promise<Task> => {
    try {
      const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, taskData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to update task with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    } catch (error) {
      console.error(`Failed to delete task with ID ${id}:`, error);
      throw error;
    }
  };

  const createProject = async (projectData: { name: string; description: string }): Promise<Project> => {
    try {
      const response = await axios.post<Project>(`${API_BASE_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  };

  const updateProject = async (id: string, projectData: { name: string; description: string }): Promise<Project> => {
    try {
      const response = await axios.put<Project>(`${API_BASE_URL}/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update project with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
    } catch (error) {
      console.error(`Failed to delete project with ID ${id}:`, error);
      throw error;
    }
  };

  const createComment = async (commentData: { content: string; taskId: string }): Promise<Comment> => {
    try {
      const response = await axios.post<Comment>(`${API_BASE_URL}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error("Failed to create comment:", error);
      throw error;
    }
  };

  const updateComment = async (id: string, commentData: { content: string }): Promise<Comment> => {
    try {
      const response = await axios.put<Comment>(`${API_BASE_URL}/comments/${id}`, commentData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update comment with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteComment = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${id}`);
    } catch (error) {
      console.error(`Failed to delete comment with ID ${id}:`, error);
      throw error;
    }
  };

  const fetchTags = async (): Promise<Tag[]> => {
    try {
      const response = await axios.get<Tag[]>(`${API_BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      throw error;
    }
  };

  const fetchESGCategories = async (): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/esg-categories`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ESG categories:", error);
      throw error;
    }
  };

  const fetchPriorities = async (): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/priorities`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch priorities:", error);
      throw error;
    }
  };

  const fetchStatuses = async (): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(`${API_BASE_URL}/statuses`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
      throw error;
    }
  };

  const searchTasks = async (params: {
    query: string;
    category?: string;
    priority?: string;
    status?: string;
  }): Promise<Task[]> => {
    try {
      const response = await axios.get<Task[]>(`${API_BASE_URL}/search`, { params });
      return response.data;
    } catch (error) {
      console.error("Failed to search tasks:", error);
      throw error;
    }
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
