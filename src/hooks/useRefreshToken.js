import React from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import axiosInstance from "../api/axios";
import axios from "axios";

function useRefreshToken() {
    const { authToken, setAuthToken } = useAuthContext();
    const refresh = async () => {
        const response = await axios.get(
            "http://localhost:4000/enat/v1/auth/refreshtoken",
            {
                withCredentials: true,
            }
        );
        setAuthToken((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return response.data.accessToken;
        });
        return response.data.accessToken;
    };
    return refresh;
}

export default useRefreshToken;
