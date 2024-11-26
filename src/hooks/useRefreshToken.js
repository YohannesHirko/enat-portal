import React from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import axiosInstance from "../api/axios";
import axios from "axios";

function useRefreshToken() {
    const { url, authToken, setAuthToken } = useAuthContext();
    const refresh = async () => {
        try {
            const response = await axios.get(
                `${url}/enat/v1/auth/refreshtoken`,
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
        } catch (error) {
            console.error(error);
        }
    };
    return refresh;
}

export default useRefreshToken;
