import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { LuPieChart } from "react-icons/lu";
import { MdWorkspacesOutline } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { TbReport, TbSettings } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                name: "dashboard",
                icon: <LuPieChart />,
            },
            {
                name: "applicants",
                icon: <GoPeople />,
            },
            {
                name: "reports",
                icon: <TbReport />,
            },
            {
                name: "issues",
                icon: <PiWarningCircle />,
            },
        ],
    },
    {
        title: "utils",
        links: [
            {
                name: "setting",
                icon: <TbSettings />,
            },
            {
                name: "workspaces",
                icon: <MdWorkspacesOutline />,
            },
        ],
    },
];
function Sidebar() {
    const activeLink =
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-200 dark:bg-gray-600";
    const normalLink =
        "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
    return (
        <div className="h-full px-3 py-4 overflow-y-auto ">
            {sidebarLinks.map((item) => (
                <ul
                    key={item.title}
                    className={`space-y-2 font-medium border-gray-200 dark:border-gray-700 ${
                        item.title === "utils" ? "pt-4 mt-8 border-t" : ""
                    }`}
                >
                    {item.links.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={`${link.name}`}
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
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default Sidebar;
