import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../Components";

function App() {
    return (
        <div className="h-screen ">
            <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <Navbar />
            </nav>
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <Sidebar />
            </aside>
            <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
