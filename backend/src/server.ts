import fastify from "fastify";
import cors from "@fastify/cors";
import Prisma from "./db";
import { Project, Tag, Task } from "@prisma/client";
import { TaskCreateInput } from "./dto/TaskCreateInput.dto";
import { TaskUpdateInput } from "./dto/TaskUpdateInput.dto";

export const server = fastify({ logger: true });

server.register(cors, {});

// Project endpoints
server.get<{ Reply: Project[] }>("/projects", async (req, reply) => {
  const projects = await Prisma.project.findMany({ include: { tasks: true } });
  reply.send(projects);
});

server.post<{ Body: { name: string; description: string } }>("/projects", async (req, reply) => {
  const { name, description } = req.body;
  try {
    const newProject = await Prisma.project.create({ data: { name, description } });
    reply.send(newProject);
  } catch {
    reply.status(500).send({ msg: "Error creating project" });
  }
});

server.put<{
  Params: { id: string };
  Body: { name: string; description: string };
}>("/projects/:id", async (req, reply) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedProject = await Prisma.project.update({
      where: { id },
      data: { name, description },
    });
    reply.send(updatedProject);
  } catch {
    reply.status(500).send({ msg: `Error updating project with id ${id}` });
  }
});

server.delete<{ Params: { id: string } }>("/projects/:id", async (req, reply) => {
  const { id } = req.params;
  try {
    await Prisma.project.delete({ where: { id } });
    reply.send({ msg: "Project deleted" });
  } catch {
    reply.status(500).send({ msg: `Error deleting project with id ${id}` });
  }
});

// Task endpoints
server.get<{ Reply: Task[] }>("/tasks", async (req, reply) => {
  const tasks = await Prisma.task.findMany({
    include: { project: true, subTasks: true, tags: true, comments: true },
  });
  reply.send(tasks);
});

server.post<{ Body: TaskCreateInput }>("/tasks", async (req, reply) => {
  const {
    title,
    description,
    status,
    priority,
    category,
    projectId,
    deadline,
    isControversial,
    parentTaskId,
    tags,
  }: TaskCreateInput = req.body;
  try {
    const newTask = await Prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        category,
        projectId,
        deadline: deadline ? new Date(deadline) : null,
        isControversial,
        parentTaskId,
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });
    reply.send(newTask);
  } catch {
    reply.status(500).send({ msg: "Error creating task" });
  }
});

server.put<{ Params: { id: string }; Body: TaskUpdateInput }>("/tasks/:id", async (req, reply) => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    priority,
    category,
    projectId,
    deadline,
    isControversial,
    parentTaskId,
    tags,
  }: TaskUpdateInput = req.body;
  try {
    const updatedTask = await Prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        category,
        projectId,
        deadline: deadline ? new Date(deadline) : null,
        isControversial,
        parentTaskId,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });
    reply.send(updatedTask);
  } catch (err) {
    console.log(err);
    reply.status(500).send({ msg: `Error updating task with id ${id}` });
  }
});

server.delete<{ Params: { id: string } }>("/tasks/:id", async (req, reply) => {
  const { id } = req.params;
  try {
    await Prisma.task.delete({ where: { id } });
    reply.send({ msg: "Task deleted" });
  } catch {
    reply.status(500).send({ msg: `Error deleting task with id ${id}` });
  }
});

// Comment endpoints
server.post<{ Body: { content: string; taskId: string } }>("/comments", async (req, reply) => {
  const { content, taskId } = req.body;
  try {
    const newComment = await Prisma.comment.create({ data: { content, taskId } });
    reply.send(newComment);
  } catch {
    reply.status(500).send({ msg: "Error creating comment" });
  }
});

server.put<{ Params: { id: string }; Body: { content: string } }>("/comments/:id", async (req, reply) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await Prisma.comment.update({
      where: { id },
      data: { content },
    });
    reply.send(updatedComment);
  } catch {
    reply.status(500).send({ msg: `Error updating comment with id ${id}` });
  }
});

server.delete<{ Params: { id: string } }>("/comments/:id", async (req, reply) => {
  const { id } = req.params;
  try {
    await Prisma.comment.delete({ where: { id } });
    reply.send({ msg: "Comment deleted" });
  } catch {
    reply.status(500).send({ msg: `Error deleting comment with id ${id}` });
  }
});

// Tag endpoints
server.get<{ Reply: Tag[] }>("/tags", async (req, reply) => {
  const tags = await Prisma.tag.findMany();
  reply.send(tags);
});

// ESG Category endpoints
server.get<{ Reply: string[] }>("/esg-categories", async (req, reply) => {
  reply.send(["ENVIRONMENTAL", "SOCIAL", "GOVERNANCE"]);
});

// Priority endpoints
server.get<{ Reply: string[] }>("/priorities", async (req, reply) => {
  reply.send(["LOW", "MEDIUM", "HIGH", "URGENT"]);
});

// Status endpoints
server.get<{ Reply: string[] }>("/statuses", async (req, reply) => {
  reply.send(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]);
});

// Search endpoint
server.get<{
  Querystring: { query: string; category?: string; priority?: string; status?: string };
}>("/search", async (req, reply) => {
  const { query, category, priority, status } = req.query;
  try {
    const tasks = await Prisma.task.findMany({
      where: {
        OR: [{ title: { contains: query } }, { description: { contains: query } }],
        category: category ? category : undefined,
        priority: priority ? priority : undefined,
        status: status ? status : undefined,
      },
      include: { project: true, tags: true },
    });
    reply.send(tasks);
  } catch {
    reply.status(500).send({ msg: "Error searching tasks" });
  }
});
