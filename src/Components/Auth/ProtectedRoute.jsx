import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AppSkeleton } from "../../Skeletons";

function ProtectedRoute({ children }) {
    const { currentUser } = useAuthContext();

    if (currentUser === 0) {
        return <AppSkeleton></AppSkeleton>;
    }
    if (currentUser === null) {
        return <Navigate to="/auth"></Navigate>;
    }
    return children;
}

export default ProtectedRoute;
