import React from "react";
import { Link } from "react-router-dom";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <h1 className="text-[#FFFFFF] text-center my-4 text-3xl">WebX</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        <div className="my-10">
          <div className="flex flex-col items-center gap-4 justify-center mb-4 mx-4  text-xl">
            <Link
              to={"/home"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-whiten ease-out  hover:bg-gray-100 hover:text-black  px-3 py-1 rounded-sm transition-colors duration-200 w-full text-center"
            >
              Home
            </Link>
            <Link
              to={"/chats"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-whiten ease-out hover:bg-gray-100 hover:text-blackk  px-3 py-1 rounded-sm transition-colors duration-200 w-full text-center"
            >
              Chats
            </Link>
            <Link
              to={"/user-settings"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-whiten hover:bg-gray-100 hover:text-black  px-3 py-1 rounded-sm transition-colors duration-200 w-full text-center ease-in-out"
            >
              Profile Settigns
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
