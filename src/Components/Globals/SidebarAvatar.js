import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { getInitials } from "../../Helpers/utils";
import { Link } from "react-router-dom";

function SidebarAvatar() {
    const { currentUser } = useAuthContext();
    return (
        <Link to={"/settings/profile"}>
            <div className="flex p-2 mt-6 items-center rounded-lg gap-4 hover:bg-white hover:dark:bg-gray-900">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600  ">
                    <span className="font-medium text-gray-600 dark:text-gray-300 hover:text-white">
                        {getInitials(
                            currentUser.firstName,
                            currentUser.lastName
                        )}
                    </span>
                </div>
                <div className="font-medium text-base dark:text-white">
                    <div>
                        {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Enat Employment Agency
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SidebarAvatar;
