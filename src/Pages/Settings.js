import React, { useMemo } from "react";
import { MdOutlineWorkspaces } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { VscSettings } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import { useSettingsContext } from "../Contexts/SettingsContext";
import { useAuthContext } from "../Contexts/AuthContext";

const settingsLinks = [
    {
        name: "general",
        icon: <VscSettings />,
        roles: ["user", "admin"],
    },
    {
        name: "profile",
        icon: <RxAvatar />,
        roles: ["user", "admin"],
    },
    {
        name: "employees",
        icon: <MdOutlineWorkspaces />,
        roles: ["admin"],
    },
];
const activeLink =
    "inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600";
const normalLink =
    "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white";

function Settings() {
    const { settings, setSettings } = useSettingsContext();
    const { currentUser } = useAuthContext();
    const allowedSettingsLinks = useMemo(
        () =>
            settingsLinks.filter((link) =>
                link.roles.includes(currentUser.role)
            ),
        [currentUser]
    );
    return (
        <div className="rounded-lg mt-14">
            <div className="md:flex">
                <ul className=" min-w-40 flex-column capitalize space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {allowedSettingsLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={`${link.name}`}
                                className={({ isActive }) =>
                                    isActive ? activeLink : normalLink
                                }
                            >
                                <span className="text-xl mr-1">
                                    {link.icon}
                                </span>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className=" p-6 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Settings;
