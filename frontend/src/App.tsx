import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllTasks from "./routes/AllTasks";
import EditProject from "./routes/EditProject";
import EditTask from "./routes/EditTask";
import NewProject from "./routes/NewProject";
import NewTask from "./routes/NewTask";
import ProjectList from "./routes/ProjectList";
import TaskDetails from "./routes/TaskDetails";
import { GlobalAppProvider } from "./utilities/GlobalAppContext";

export default function App() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Router>
        <GlobalAppProvider>
          <NavBar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<AllTasks />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/project/new" element={<NewProject />} />
              <Route path="/project/:id/edit" element={<EditProject />} />
              <Route path="/task/new" element={<NewTask />} />
              <Route path="/task/:id" element={<TaskDetails />} />
              <Route path="/task/:id/edit" element={<EditTask />} />
            </Routes>
          </main>
        </GlobalAppProvider>
      </Router>
    </div>
  );
}
