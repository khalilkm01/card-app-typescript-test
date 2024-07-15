import { ESGCategory, GlobalContextType, Priority, Status, Task } from "@/@types/context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { GlobalAppContext } from "../utilities/GlobalAppContext";

export default function AllTasks() {
  const { tasks, refresh } = useContext(GlobalAppContext) as GlobalContextType;
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Task>("title");
  const [filterPriority, setFilterPriority] = useState<Priority | "ALL">("ALL");
  const [filterStatus, setFilterStatus] = useState<Status | "ALL">("ALL");
  const [filterCategory, setFilterCategory] = useState<ESGCategory | "ALL">("ALL");
  const [nextScheduledTask, setNextScheduledTask] = useState<Task | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    let result = tasks;

    // Search
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter
    if (filterPriority !== "ALL") {
      result = result.filter((task) => task.priority === filterPriority);
    }
    if (filterStatus !== "ALL") {
      result = result.filter((task) => task.status === filterStatus);
    }
    if (filterCategory !== "ALL") {
      result = result.filter((task) => task.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      // @ts-ignore
      if (a[sortBy] < b[sortBy]) return -1;
      // @ts-ignore
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    setFilteredTasks(result);

    // Find the next upcoming scheduled task
    const upcomingTask = tasks
      .filter((task) => task.scheduledDate)
      .sort((a, b) => {
        if (a.scheduledDate && b.scheduledDate) {
          return a.scheduledDate.getTime() - b.scheduledDate.getTime();
        } else {
          return 0;
        }
      })[0];

    setNextScheduledTask(upcomingTask);
  }, [tasks, searchTerm, sortBy, filterPriority, filterStatus, filterCategory]);

  if (tasks.length === 0) {
    return (
      <section className="bg-background text-foreground min-h-screen flex flex-col justify-center items-center p-8">
        <h1 className="text-center font-bold text-4xl mb-6">You don't have any Tasks</h1>
        <p className="text-center font-medium text-lg">
          <Link
            className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-300"
            to="/task/new"
          >
            Create New Task
          </Link>
        </p>
      </section>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      {nextScheduledTask ? (
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg mb-8">
          <p className="text-lg font-semibold">
            Next scheduled task:{" "}
            <Link to={`/task/${nextScheduledTask.id}`} className="underline">
              {nextScheduledTask.title}
            </Link>
          </p>
          <p>Scheduled Date: {nextScheduledTask.scheduledDate?.toLocaleDateString()}</p>
        </div>
      ) : (
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg mb-8">
          <p className="text-lg font-semibold">There are no scheduled tasks.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center mb-10">All Tasks</h1>

      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-wrap gap-4">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as keyof Task)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="priority">Sort by Priority</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
              <SelectItem value="category">Sort by Category</SelectItem>
              <SelectItem value="scheduledDate">Sort by Scheduled Date</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Priority | "ALL")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Priorities</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Status | "ALL")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as ESGCategory | "ALL")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              <SelectItem value="ENVIRONMENTAL">Environmental</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="GOVERNANCE">Governance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="shadow-xl bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-primary mb-4">
                <Link to={`/task/${task.id}`} className="hover:underline">
                  {task.title}
                </Link>
              </CardTitle>
              <p className="text-muted-foreground mb-6">{task.description}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="font-semibold bg-primary/10 text-primary px-3 py-1 rounded-2xl">
                  Priority: {task.priority}
                </span>
                <span className="font-semibold bg-accent-foreground/50 text-accent px-3 py-1 rounded-2xl">
                  Status: {task.status}
                </span>
                <span className="font-semibold bg-muted-foreground/30 text-muted px-3 py-1 rounded-2xl">
                  Category: {task.category}
                </span>
                {task.scheduledDate && (
                  <span className="font-semibold bg-primary/10 text-primary px-3 py-1 rounded-2xl">
                    Scheduled Date: {new Date(task.scheduledDate?.toString() || Date.now()).toString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
