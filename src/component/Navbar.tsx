import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import useThemeStore from '../../store/useThemeStore'; 

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useThemeStore() as { darkMode: boolean; toggleDarkMode: () => void };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const routes = [
    { path: "/", label: "Overview" },
    { path: "/Find-Jobs", label: "Job Search" },
    { path: "/Estimated-Salaries", label: "Estimated Salaries" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center p-4 border-b w-full shadow-sm bg-white dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">JSearch</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300">
          {routes.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 pb-1"
                    : "hover:text-teal-600 dark:hover:text-teal-400"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

      
        <div className="flex items-center gap-4">
          
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Menu Button for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </nav>

    
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">Menu</h2>
          <button onClick={closeSidebar}>
            <FaTimes size={22} />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {routes.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-600 dark:text-teal-400 font-semibold"
                    : "hover:text-teal-600 dark:hover:text-teal-400"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
