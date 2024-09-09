import React from "react";
import NavButton from "./NavButton";
import { FiSun } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

function Navbar() {
    const { currentUser } = useAuthContext();
    function getInitials(firstName, lastName) {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    }
    return (
        <div className="px-4 py-2 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    hi
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white  focus:ring-blue-300 font-medium rounded-lg p-2 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                        <FiSun />
                        <span className="sr-only">theme</span>
                    </button>
                    <NavLink to="/profile" className="flex items-center gap-4 ">
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 hover:border-2 hover:border-blue-700 ">
                            <span className="font-medium text-gray-600 dark:text-gray-300 hover:text-white">
                                {getInitials(
                                    currentUser.firstName,
                                    currentUser.lastName
                                )}
                            </span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
