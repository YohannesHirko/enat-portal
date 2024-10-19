import React from "react";
import { NavLink } from "react-router-dom";
function TabNav({ links }) {
    const activeLink =
        "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500";
    const normalLink =
        "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
    return (
        <div className="z-40 sticky top-14 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ">
            <ul className="flex flex-wrap -mb-px">
                {links?.map((link) => (
                    <li key={link.name} className="me-2">
                        <NavLink
                            to={`${link.link}`}
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TabNav;
