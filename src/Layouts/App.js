import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../Components";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../Contexts/AuthContext";
import { useAppContext } from "../Contexts/AppContextProvider";

function App() {
    const [currentPage, setCurrentPage] = useState("Applicants");
    const { url, authToken } = useAuthContext();
    const { setIssuesCount } = useAppContext();
    useEffect(() => {
        async function fetchissues() {
            try {
                const response = await fetch(
                    `${url}/enat/v1/issues/allissues`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.json();
                if (response.status === 200) {
                    setIssuesCount(data?.count);
                }
            } catch (error) {
                console.log(error);
            }
            return;
        }
        fetchissues();
    }, []);
    return (
        <div className="h-screen ">
            <nav className="fixed top-0 h-14 sm:pl-64 z-40 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <Navbar currentPage={currentPage} />
            </nav>
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <Sidebar setCurrentPage={setCurrentPage} />
            </aside>
            <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
                <Outlet />
            </div>
            <Toaster
                richColors
                theme="system"
                closeButton={true}
                pauseWhenPageIsHidden
            />
        </div>
    );
}

export default App;
