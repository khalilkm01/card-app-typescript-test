import { PrismaClient } from "@prisma/client";
import { server } from "../src/server";

const prisma = new PrismaClient(); // This will use the test database

// Helper function to clear the database before each test
async function clearDatabase() {
  await prisma.comment.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
}

beforeAll(async () => {
  await server.ready();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
  await server.close();
});

describe("ESG Task Management API", () => {
  // Test Project endpoints
  describe("Project Endpoints", () => {
    // Test creating a new project
    it("should create a new project", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/projects",
        payload: { name: "Test Project", description: "A test project" },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toHaveProperty("id");
      expect(JSON.parse(response.payload).name).toBe("Test Project");
    });

    // Test getting all projects
    it("should get all projects", async () => {
      await prisma.project.create({ data: { name: "Project 1" } });
      await prisma.project.create({ data: { name: "Project 2" } });

      const response = await server.inject({
        method: "GET",
        url: "/projects",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).length).toBe(2);
    });

    // Test updating a project
    it("should update a project", async () => {
      const project = await prisma.project.create({ data: { name: "Old Name" } });

      const response = await server.inject({
        method: "PUT",
        url: `/projects/${project.id}`,
        payload: { name: "New Name" },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).name).toBe("New Name");
    });

    // Test deleting a project
    it("should delete a project", async () => {
      const project = await prisma.project.create({ data: { name: "To Delete" } });

      const response = await server.inject({
        method: "DELETE",
        url: `/projects/${project.id}`,
      });

      expect(response.statusCode).toBe(200);
      const checkProject = await prisma.project.findUnique({ where: { id: project.id } });
      expect(checkProject).toBeNull();
    });
  });

  // Test Task endpoints
  describe("Task Endpoints", () => {
    // Test creating a new task
    it("should create a new task", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const response = await server.inject({
        method: "POST",
        url: "/tasks",
        payload: {
          title: "Test Task",
          description: "A test task",
          status: "TODO",
          priority: "HIGH",
          category: "ENVIRONMENTAL",
          projectId: project.id,
          tags: ["test", "new"],
        },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toHaveProperty("id");
      expect(JSON.parse(response.payload).title).toBe("Test Task");
      expect(JSON.parse(response.payload).tags.length).toBe(2);
    });

    // Test getting all tasks
    it("should get all tasks", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      await prisma.task.create({ data: { title: "Task 1", projectId: project.id, category: "ENVIRONMENTAL" } });
      await prisma.task.create({ data: { title: "Task 2", projectId: project.id, category: "SOCIAL" } });

      const response = await server.inject({
        method: "GET",
        url: "/tasks",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).length).toBe(2);
    });

    // Test updating a task
    it("should update a task", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const task = await prisma.task.create({
        data: {
          title: "Old Title",
          projectId: project.id,
          category: "ENVIRONMENTAL",
        },
      });

      const response = await server.inject({
        method: "PUT",
        url: `/tasks/${task.id}`,
        payload: { title: "New Title", status: "IN_PROGRESS", category: "SOCIAL", tags: ["new"] },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).title).toBe("New Title");
      expect(JSON.parse(response.payload).status).toBe("IN_PROGRESS");
      expect(JSON.parse(response.payload).category).toBe("SOCIAL");
    });

    // Test deleting a task
    it("should delete a task", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const task = await prisma.task.create({
        data: { title: "To Delete", projectId: project.id, category: "SOCIAL" },
      });

      const response = await server.inject({
        method: "DELETE",
        url: `/tasks/${task.id}`,
      });

      expect(response.statusCode).toBe(200);
      const checkTask = await prisma.task.findUnique({ where: { id: task.id } });
      expect(checkTask).toBeNull();
    });
  });

  // Test Comment endpoints
  describe("Comment Endpoints", () => {
    // Test creating a new comment
    it("should create a new comment", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const task = await prisma.task.create({
        data: { title: "Test Task", projectId: project.id, category: "SOCIAL" },
      });

      const response = await server.inject({
        method: "POST",
        url: "/comments",
        payload: {
          content: "Test Comment",
          taskId: task.id,
        },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toHaveProperty("id");
      expect(JSON.parse(response.payload).content).toBe("Test Comment");
    });

    // Test updating a comment
    it("should update a comment", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const task = await prisma.task.create({
        data: {
          title: "Test Task",
          projectId: project.id,
          category: "ENVIRONMENTAL",
        },
      });

      const comment = await prisma.comment.create({ data: { content: "Old Content", taskId: task.id } });

      const response = await server.inject({
        method: "PUT",
        payload: { content: "New Content" },
        url: `/comments/${comment.id}`,
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).content).toBe("New Content");
    });

    // Test deleting a comment
    it("should delete a comment", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      const task = await prisma.task.create({
        data: { title: "Test Task", projectId: project.id, category: "SOCIAL" },
      });

      const comment = await prisma.comment.create({ data: { content: "To Delete", taskId: task.id } });

      const response = await server.inject({
        method: "DELETE",
        url: `/comments/${comment.id}`,
      });

      expect(response.statusCode).toBe(200);
      const checkComment = await prisma.comment.findUnique({ where: { id: comment.id } });
      expect(checkComment).toBeNull();
    });
  });

  // Test Tag endpoints
  describe("Tag Endpoints", () => {
    // Test getting all tags
    it("should get all tags", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });

      await prisma.task.create({
        data: {
          title: "Task 1",
          projectId: project.id,
          category: "SOCIAL",
          tags: { create: [{ name: "tag1" }, { name: "tag2" }] },
        },
      });

      const response = await server.inject({
        method: "GET",
        url: "/tags",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).length).toBe(2);
    });
  });

  // Test ESG Category endpoints
  describe("ESG Category Endpoints", () => {
    // Test getting all ESG categories
    it("should get all ESG categories", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/esg-categories",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(["ENVIRONMENTAL", "SOCIAL", "GOVERNANCE"]);
    });
  });

  // Test Priority endpoints
  describe("Priority Endpoints", () => {
    // Test getting all priorities
    it("should get all priorities", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/priorities",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(["LOW", "MEDIUM", "HIGH", "URGENT"]);
    });
  });

  // Test Status endpoints
  describe("Status Endpoints", () => {
    // Test getting all statuses
    it("should get all statuses", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/statuses",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]);
    });
  });

  // Test Search endpoint
  describe("Search Endpoint", () => {
    // Test searching tasks
    it("should search tasks", async () => {
      const project = await prisma.project.create({ data: { name: "Test Project" } });
      await prisma.task.create({
        data: {
          title: "Environmental Task",
          description: "An important task",
          status: "TODO",
          priority: "HIGH",
          category: "ENVIRONMENTAL",
          projectId: project.id,
        },
      });
      await prisma.task.create({
        data: {
          title: "Social Task",
          description: "Another task",
          status: "IN_PROGRESS",
          priority: "MEDIUM",
          category: "SOCIAL",
          projectId: project.id,
        },
      });

      const response = await server.inject({
        method: "GET",
        url: "/search?query=important&category=ENVIRONMENTAL&priority=HIGH",
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload).length).toBe(1);
      expect(JSON.parse(response.payload)[0].title).toBe("Environmental Task");
    });
  });
});
