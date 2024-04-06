import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="p-3 py-5 bg-white border-r fixed top-15 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <ul className="space-y-2">
        <li>
          <a
            href="/dashboard"
            class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3 font-roboto" sidebar-toggle-item="">
              Dashboard
            </span>
          </a>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-controls="dropdown-layouts"
            data-collapse-toggle="dropdown-layouts"
            aria-expanded="true"
          >
            <svg
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
            </svg>
            <span
              class="flex-1 font-roboto ml-3 text-left whitespace-nowrap"
              sidebar-toggle-item=""
            >
              CURD
            </span>
            <svg
              sidebar-toggle-item=""
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <ul id="dropdown-layouts" class="py-2 space-y-2">
            <li>
              <a
                href="#users"
                class="font-roboto font- flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Users
              </a>
            </li>
            {/* <li>
              <a
                href="https://flowbite-admin-dashboard.vercel.app/layouts/sidebar/"
                class="flex font-roboto items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Sidebar
              </a>
            </li> */}
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
