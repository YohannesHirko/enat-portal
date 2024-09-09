import React from "react";

function AppSkeleton() {
    return (
        <div className="h-screen ">
            <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-14 flex justify-between items-center px-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 w-48 animate-pulse"></div>
                <div>
                    <div className="flex items-center gap-4 animate-pulse">
                        <div className="flex flex-col">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 w-32 mb-2 ml-auto"></div>
                            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-600"></div>
                        </div>
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </div>
                </div>
            </nav>
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="flex flex-col items-center animate-pulse gap-6 py-6">
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
                </div>
            </aside>
            <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen"></div>
        </div>
    );
}

export default AppSkeleton;
