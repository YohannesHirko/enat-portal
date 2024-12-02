import React from "react";
import { NavLink } from "react-router-dom";
import SidebarAvatar from "./SidebarAvatar";
import { useAppContext } from "../../Contexts/AppContextProvider";
import { sidebarLinks } from "../../constants";

function Sidebar() {
    const { issuesCount } = useAppContext();
    const activeLink =
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group bg-gray-200 dark:bg-gray-600";
    const normalLink =
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group";
    return (
        <div className="h-full px-3 py-2 overflow-y-auto">
            <SidebarAvatar />
            <div className="">
                {sidebarLinks.map((item) => (
                    <ul
                        key={item.title}
                        className={`space-y-2 font-medium border-gray-200 dark:border-gray-700 border-t pt-4 mt-8 ${
                            item.title === "utils" ? "pt-4 mt-8 border-t" : ""
                        }`}
                    >
                        {item.links.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={
                                        link.name === "dashboard"
                                            ? ""
                                            : link.name === "settings"
                                            ? `${link.name}/general`
                                            : `${link.name}`
                                    }
                                    className={({ isActive }) =>
                                        isActive ? activeLink : normalLink
                                    }
                                >
                                    <span className=" text-xl  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                        {link.icon}
                                    </span>

                                    <span className="flex-1 ms-3 whitespace-nowrap capitalize">
                                        {link.name}
                                    </span>
                                    {link.name === "issues" &&
                                        issuesCount !== 0 && (
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                                {issuesCount}
                                            </span>
                                        )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
