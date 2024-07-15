import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [dark, setDark] = useState(true);

  const darkModeHandler = () => {
    const newDark = !dark;
    setDark(newDark);
    document.body.classList.toggle("dark", newDark);
  };

  useEffect(() => {
    setDark(document.body.classList.contains("dark"));
  }, []);

  return (
    <nav className="w-screen bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-8">
          <Link to="/" className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300">
            All Tasks
          </Link>
          <Link
            to="/projects"
            className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/task/new"
            className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300"
          >
            New Task
          </Link>
          <Link
            to="/project/new"
            className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-300"
          >
            New Project
          </Link>
        </div>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none transition-transform duration-300 transform hover:scale-105"
          onClick={darkModeHandler}
          aria-label="Toggle Dark Mode"
        >
          {dark ? <IoSunny className="w-6 h-6" /> : <IoMoon className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
