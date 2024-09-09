import React from "react";
import { NavLink } from "react-router-dom";
import { useApplicantContext } from "../../Pages/ApplicantForm";

function TabNav() {
    const { isEditing } = useApplicantContext();
    const activeLink =
        "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500";

    const normalLink =
        "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
    if (isEditing) {
        return (
            <div className=" sticky top-14 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <NavLink
                            to={"/info"}
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            Applicant Info
                        </NavLink>
                    </li>
                    <li className="me-2">
                        <NavLink
                            to={"/visa"}
                            relative="path"
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            Visa
                        </NavLink>
                    </li>
                    <li className="me-2">
                        <NavLink
                            to={"/ticket"}
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            Ticket
                        </NavLink>
                    </li>
                    <li className="me-2">
                        <NavLink
                            to={"/status"}
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            Statuses
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className=" sticky top-14 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <NavLink
                            to={"/applicants/new/info"}
                            className={({ isActive }) =>
                                `inline-block p-4 border-b-2  rounded-t-lg ${
                                    isActive ? activeLink : normalLink
                                }`
                            }
                        >
                            Applicant Info
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TabNav;
