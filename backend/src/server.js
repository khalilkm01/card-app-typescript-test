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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var fastify_1 = __importDefault(require("fastify"));
var cors_1 = __importDefault(require("@fastify/cors"));
var db_1 = __importDefault(require("./db"));
exports.server = (0, fastify_1.default)({ logger: true });
exports.server.register(cors_1.default, {});
// Project endpoints
exports.server.get('/projects', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.project.findMany({ include: { tasks: true } })];
            case 1:
                projects = _a.sent();
                reply.send(projects);
                return [2 /*return*/];
        }
    });
}); });
exports.server.post('/projects', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, newProject, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.project.create({ data: { name: name, description: description } })];
            case 2:
                newProject = _c.sent();
                reply.send(newProject);
                return [3 /*break*/, 4];
            case 3:
                _b = _c.sent();
                reply.status(500).send({ msg: "Error creating project" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.put('/projects/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, description, updatedProject, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.project.update({
                        where: { id: id },
                        data: { name: name, description: description }
                    })];
            case 2:
                updatedProject = _c.sent();
                reply.send(updatedProject);
                return [3 /*break*/, 4];
            case 3:
                _b = _c.sent();
                reply.status(500).send({ msg: "Error updating project with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.delete('/projects/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.project.delete({ where: { id: id } })];
            case 2:
                _b.sent();
                reply.send({ msg: 'Project deleted' });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                reply.status(500).send({ msg: "Error deleting project with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Task endpoints
exports.server.get('/tasks', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.task.findMany({
                    include: { project: true, subTasks: true, tags: true, comments: true }
                })];
            case 1:
                tasks = _a.sent();
                reply.send(tasks);
                return [2 /*return*/];
        }
    });
}); });
exports.server.post('/tasks', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, status, priority, category, projectId, deadline, isControversial, parentTaskId, tags, newTask, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, status = _a.status, priority = _a.priority, category = _a.category, projectId = _a.projectId, deadline = _a.deadline, isControversial = _a.isControversial, parentTaskId = _a.parentTaskId, tags = _a.tags;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.task.create({
                        data: {
                            title: title,
                            description: description,
                            status: status,
                            priority: priority,
                            category: category,
                            projectId: projectId,
                            deadline: deadline ? new Date(deadline) : null,
                            isControversial: isControversial,
                            parentTaskId: parentTaskId,
                            tags: {
                                connectOrCreate: tags === null || tags === void 0 ? void 0 : tags.map(function (tag) { return ({
                                    where: { name: tag },
                                    create: { name: tag }
                                }); })
                            }
                        },
                        include: { tags: true }
                    })];
            case 2:
                newTask = _c.sent();
                reply.send(newTask);
                return [3 /*break*/, 4];
            case 3:
                _b = _c.sent();
                reply.status(500).send({ msg: "Error creating task" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.put('/tasks/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, description, status, priority, category, projectId, deadline, isControversial, parentTaskId, tags, updatedTask, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, status = _a.status, priority = _a.priority, category = _a.category, projectId = _a.projectId, deadline = _a.deadline, isControversial = _a.isControversial, parentTaskId = _a.parentTaskId, tags = _a.tags;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.task.update({
                        where: { id: id },
                        data: {
                            title: title,
                            description: description,
                            status: status,
                            priority: priority,
                            category: category,
                            projectId: projectId,
                            deadline: deadline ? new Date(deadline) : null,
                            isControversial: isControversial,
                            parentTaskId: parentTaskId,
                            tags: {
                                set: [],
                                connectOrCreate: tags.map(function (tag) { return ({
                                    where: { name: tag },
                                    create: { name: tag }
                                }); })
                            }
                        },
                        include: { tags: true }
                    })];
            case 2:
                updatedTask = _b.sent();
                reply.send(updatedTask);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                reply.status(500).send({ msg: "Error updating task with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.delete('/tasks/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.task.delete({ where: { id: id } })];
            case 2:
                _b.sent();
                reply.send({ msg: 'Task deleted' });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                reply.status(500).send({ msg: "Error deleting task with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Comment endpoints
exports.server.post('/comments', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, taskId, newComment, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, content = _a.content, taskId = _a.taskId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.comment.create({ data: { content: content, taskId: taskId } })];
            case 2:
                newComment = _c.sent();
                reply.send(newComment);
                return [3 /*break*/, 4];
            case 3:
                _b = _c.sent();
                reply.status(500).send({ msg: "Error creating comment" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.put('/comments/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, content, updatedComment, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                content = req.body.content;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.comment.update({
                        where: { id: id },
                        data: { content: content }
                    })];
            case 2:
                updatedComment = _b.sent();
                reply.send(updatedComment);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                reply.status(500).send({ msg: "Error updating comment with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.server.delete('/comments/:id', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.comment.delete({ where: { id: id } })];
            case 2:
                _b.sent();
                reply.send({ msg: 'Comment deleted' });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                reply.status(500).send({ msg: "Error deleting comment with id ".concat(id) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Tag endpoints
exports.server.get('/tags', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.tag.findMany()];
            case 1:
                tags = _a.sent();
                reply.send(tags);
                return [2 /*return*/];
        }
    });
}); });
// ESG Category endpoints
exports.server.get('/esg-categories', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reply.send(['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE']);
        return [2 /*return*/];
    });
}); });
// Priority endpoints
exports.server.get('/priorities', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reply.send(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
        return [2 /*return*/];
    });
}); });
// Status endpoints
exports.server.get('/statuses', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reply.send(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']);
        return [2 /*return*/];
    });
}); });
// Search endpoint
exports.server.get('/search', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, query, category, priority, status, tasks, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, query = _a.query, category = _a.category, priority = _a.priority, status = _a.status;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.task.findMany({
                        where: {
                            OR: [
                                { title: { contains: query } },
                                { description: { contains: query } }
                            ],
                            category: category ? category : undefined,
                            priority: priority ? priority : undefined,
                            status: status ? status : undefined
                        },
                        include: { project: true, tags: true }
                    })];
            case 2:
                tasks = _c.sent();
                reply.send(tasks);
                return [3 /*break*/, 4];
            case 3:
                _b = _c.sent();
                reply.status(500).send({ msg: "Error searching tasks" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
