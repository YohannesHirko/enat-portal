import React, { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuthContext } from "../Contexts/AuthContext";
import { axiosPrivate } from "../api/axios";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { authToken } = useAuthContext();
    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    return;
                }
            }
        );
    }, [authToken, refresh]);
    return <div>useAxiosPrivate</div>;
}

export default useAxiosPrivate;
