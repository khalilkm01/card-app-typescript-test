import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMoon, IoSunny } from "react-icons/io5";

const NavBar = () => {
  const [dark, setDark] = useState(() => {
    return document.body.classList.contains("dark");
  });

  const darkModeHandler = () => {
    const newDark = !dark;
    setDark(newDark);
    document.body.classList.toggle("dark", newDark);
    document.body.classList.toggle("light", !newDark);
  };

  useEffect(() => {
    document.body.classList.add(dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors duration-300">
            All Tasks
          </Link>
          <Link to="/projects" className="text-foreground hover:text-primary transition-colors duration-300">
            Projects
          </Link>
          <Link to="/task/new" className="text-foreground hover:text-primary transition-colors duration-300">
            New Task
          </Link>
          <Link to="/project/new" className="text-foreground hover:text-primary transition-colors duration-300">
            New Project
          </Link>
        </div>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground focus:outline-none transition-transform duration-300 transform hover:scale-105"
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
