import React from "react";
import { getInitials } from "../../Helpers/utils";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Button } from "@mui/material";

function ProfileSettings() {
    const { currentUser } = useAuthContext();
    const { handleLogout } = useAuthContext();
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Profile Tab
            </h3>
            <div>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600  ">
                            <span className="font-medium text-gray-600 dark:text-gray-300 hover:text-white">
                                {getInitials(
                                    currentUser.firstName,
                                    currentUser.lastName
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className=" font-medium text-gray-900 truncate dark:text-white">
                            {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className=" text-xs">{currentUser.role}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;
