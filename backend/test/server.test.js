"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../src/server");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient(); // This will use the test database
// Helper function to clear the database before each test
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.comment.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.tag.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.task.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.project.deleteMany()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server_1.server.ready()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, clearDatabase()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, server_1.server.close()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("ESG Task Management API", function () {
    // Test Project endpoints
    describe("Project Endpoints", function () {
        // Test creating a new project
        it("should create a new project", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server_1.server.inject({
                            method: 'POST',
                            url: '/projects',
                            payload: { name: "Test Project", description: "A test project" }
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toHaveProperty('id');
                        expect(JSON.parse(response.payload).name).toBe("Test Project");
                        return [2 /*return*/];
                }
            });
        }); });
        // Test getting all projects
        it("should get all projects", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Project 1" } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.project.create({ data: { name: "Project 2" } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'GET',
                                url: '/projects'
                            })];
                    case 3:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        // Test updating a project
        it("should update a project", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Old Name" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'PUT',
                                url: "/projects/".concat(project.id),
                                payload: { name: "New Name" }
                            })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).name).toBe("New Name");
                        return [2 /*return*/];
                }
            });
        }); });
        // Test deleting a project
        it("should delete a project", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response, checkProject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "To Delete" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'DELETE',
                                url: "/projects/".concat(project.id)
                            })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [4 /*yield*/, prisma.project.findUnique({ where: { id: project.id } })];
                    case 3:
                        checkProject = _a.sent();
                        expect(checkProject).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Task endpoints
    describe("Task Endpoints", function () {
        // Test creating a new task
        it("should create a new task", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'POST',
                                url: '/tasks',
                                payload: {
                                    title: "Test Task",
                                    description: "A test task",
                                    status: "TODO",
                                    priority: "HIGH",
                                    category: "ENVIRONMENTAL",
                                    projectId: project.id,
                                    tags: ["test", "new"]
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toHaveProperty('id');
                        expect(JSON.parse(response.payload).title).toBe("Test Task");
                        expect(JSON.parse(response.payload).tags.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        // Test getting all tasks
        it("should get all tasks", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Task 1", projectId: project.id, category: "ENVIRONMENTAL" } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Task 2", projectId: project.id, category: "SOCIAL" } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'GET',
                                url: '/tasks'
                            })];
                    case 4:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        // Test updating a task
        it("should update a task", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, task, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Old Title", projectId: project.id, category: "ENVIRONMENTAL" } })];
                    case 2:
                        task = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'PUT',
                                url: "/tasks/".concat(task.id),
                                payload: { title: "New Title", status: "IN_PROGRESS", category: "SOCIAL", tags: ["new"] }
                            })];
                    case 3:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).title).toBe("New Title");
                        expect(JSON.parse(response.payload).status).toBe("IN_PROGRESS");
                        expect(JSON.parse(response.payload).category).toBe("SOCIAL");
                        return [2 /*return*/];
                }
            });
        }); });
        // Test deleting a task
        it("should delete a task", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, task, response, checkTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "To Delete", projectId: project.id, category: "SOCIAL" } })];
                    case 2:
                        task = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'DELETE',
                                url: "/tasks/".concat(task.id)
                            })];
                    case 3:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [4 /*yield*/, prisma.task.findUnique({ where: { id: task.id } })];
                    case 4:
                        checkTask = _a.sent();
                        expect(checkTask).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Comment endpoints
    describe("Comment Endpoints", function () {
        // Test creating a new comment
        it("should create a new comment", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, task, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Test Task", projectId: project.id, category: "SOCIAL" } })];
                    case 2:
                        task = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'POST',
                                url: '/comments',
                                payload: {
                                    content: "Test Comment",
                                    taskId: task.id
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toHaveProperty('id');
                        expect(JSON.parse(response.payload).content).toBe("Test Comment");
                        return [2 /*return*/];
                }
            });
        }); });
        // Test updating a comment
        it("should update a comment", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, task, comment, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Test Task", projectId: project.id, category: "ENVIRONMENTAL" } })];
                    case 2:
                        task = _a.sent();
                        return [4 /*yield*/, prisma.comment.create({ data: { content: "Old Content", taskId: task.id } })];
                    case 3:
                        comment = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: "PUT",
                                payload: { content: "New Content" },
                                url: "/comments/".concat(comment.id),
                            })];
                    case 4:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).content).toBe("New Content");
                        return [2 /*return*/];
                }
            });
        }); });
        // Test deleting a comment
        it("should delete a comment", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, task, comment, response, checkComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({ data: { title: "Test Task", projectId: project.id, category: "SOCIAL" } })];
                    case 2:
                        task = _a.sent();
                        return [4 /*yield*/, prisma.comment.create({ data: { content: "To Delete", taskId: task.id } })];
                    case 3:
                        comment = _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'DELETE',
                                url: "/comments/".concat(comment.id)
                            })];
                    case 4:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [4 /*yield*/, prisma.comment.findUnique({ where: { id: comment.id } })];
                    case 5:
                        checkComment = _a.sent();
                        expect(checkComment).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Tag endpoints
    describe("Tag Endpoints", function () {
        // Test getting all tags
        it("should get all tags", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({
                                data: {
                                    title: "Task 1",
                                    projectId: project.id,
                                    category: "SOCIAL",
                                    tags: { create: [{ name: "tag1" }, { name: "tag2" }] }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'GET',
                                url: '/tags'
                            })];
                    case 3:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test ESG Category endpoints
    describe("ESG Category Endpoints", function () {
        // Test getting all ESG categories
        it("should get all ESG categories", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server_1.server.inject({
                            method: 'GET',
                            url: '/esg-categories'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toEqual(['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Priority endpoints
    describe("Priority Endpoints", function () {
        // Test getting all priorities
        it("should get all priorities", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server_1.server.inject({
                            method: 'GET',
                            url: '/priorities'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toEqual(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Status endpoints
    describe("Status Endpoints", function () {
        // Test getting all statuses
        it("should get all statuses", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server_1.server.inject({
                            method: 'GET',
                            url: '/statuses'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload)).toEqual(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test Search endpoint
    describe("Search Endpoint", function () {
        // Test searching tasks
        it("should search tasks", function () { return __awaiter(void 0, void 0, void 0, function () {
            var project, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.project.create({ data: { name: "Test Project" } })];
                    case 1:
                        project = _a.sent();
                        return [4 /*yield*/, prisma.task.create({
                                data: {
                                    title: "Environmental Task",
                                    description: "An important task",
                                    status: "TODO",
                                    priority: "HIGH",
                                    category: "ENVIRONMENTAL",
                                    projectId: project.id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.task.create({
                                data: {
                                    title: "Social Task",
                                    description: "Another task",
                                    status: "IN_PROGRESS",
                                    priority: "MEDIUM",
                                    category: "SOCIAL",
                                    projectId: project.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, server_1.server.inject({
                                method: 'GET',
                                url: '/search?query=important&category=ENVIRONMENTAL&priority=HIGH'
                            })];
                    case 4:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        expect(JSON.parse(response.payload).length).toBe(1);
                        expect(JSON.parse(response.payload)[0].title).toBe("Environmental Task");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
