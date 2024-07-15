import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalAppContext } from "../utilities/GlobalAppContext";
import { GlobalContextType } from "@/@types/context";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export default function AllTasks() {
  const { tasks } = useContext(GlobalAppContext) as GlobalContextType;
  let navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <section className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-center font-semibold text-2xl m-5">You don't have any Tasks</h1>
        <p className="text-center font-medium text-md">
          <Link className="text-blue-400 underline underline-offset-1" to="/task/new">
            Create New Task
          </Link>
        </p>
      </section>
    );
  }

  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold text-center mb-5">All Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="shadow-lg dark:bg-gray-800 bg-gray-100">
            <CardContent>
              <CardTitle className="text-xl font-semibold">
                <Link to={`/task/${task.id}`} className="hover:underline">
                  {task.title}
                </Link>
              </CardTitle>
              <p>{task.description}</p>
              <div className="flex justify-between mt-2">
                <span className="font-medium">Priority: {task.priority}</span>
                <span className="font-medium">Status: {task.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
