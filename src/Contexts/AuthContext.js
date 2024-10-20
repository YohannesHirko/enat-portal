import axios from "axios";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const url = process.env.REACT_APP_PRODUCTION_URL || "http://localhost:4000";
    const axiosClient = useMemo(() => {
        return axios.create({
            baseURL: url,
            headers: {},
        });
    }, []);

    const [authToken, setAuthToken] = useState();
    const [currentUser, setCurrentUser] = useState(0);
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setCurrentUser(null);
        setAuthToken(null);
    };
    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setAuthToken(null);
                setCurrentUser(null);
                return;
            }
            try {
                const response = await fetch(`${url}/enat/v1/user/getuser`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.status !== 200) {
                    console.log(data);
                    localStorage.removeItem("jwtToken");
                    setAuthToken(null);
                    setCurrentUser(null);
                    return;
                }
                setAuthToken(token);
                setCurrentUser(data.user);
            } catch (error) {
                console.log(error);
                setAuthToken(null);
                setCurrentUser(null);
            }
            return;
        }
        fetchUser();
    }, [authToken]);
    return (
        <AuthContext.Provider
            value={{
                handleLogout,
                authToken,
                currentUser,
                setAuthToken,
                setCurrentUser,
                url,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext() must be used inside AuthProvider");
    }
    return context;
}
