import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

function Auth() {
    const { currentUser } = useAuthContext();
    if (currentUser) {
        return <Navigate to="/"></Navigate>;
    }
    return (
        <div className="bg-gray-200 dark:bg-gray-900 w-auto h-auto min-h-screen p-4 flex justify-center items-center">
            <div className=" md:w-1/2 xl:w-2/5 w-4/5 rounded-lg">
                <Outlet />
            </div>
        </div>
    );
}

export default Auth;
