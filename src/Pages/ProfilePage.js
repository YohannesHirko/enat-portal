import React from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { Button } from "../Components";

function ProfilePage() {
    const { handleLogout } = useAuthContext();
    return (
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="p-4 grid grid-cols-2 gap-4">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end px-4 pt-4">
                        <button
                            id="dropdownButton"
                            data-dropdown-toggle="dropdown"
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                            type="button"
                        >
                            <span className="sr-only">Open dropdown</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                            >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div
                            id="dropdown"
                            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                            <ul
                                className="py-2"
                                aria-labelledby="dropdownButton"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Edit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Export Data
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src="/docs/images/people/profile-picture-3.jpg"
                            alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            Bonnie Green
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Visual Designer
                        </span>
                        <div className="flex mt-4 md:mt-6">
                            <button onClick={() => handleLogout()}>
                                Logo out
                            </button>
                            <a
                                href="#"
                                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Message
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-100 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                            />
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
