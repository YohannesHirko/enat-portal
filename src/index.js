import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Layouts/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    ApplicantForm,
    Applicants,
    Archives,
    Dashboard,
    Issues,
    Reports,
    Settings,
} from "./Pages";
import Auth from "./Layouts/Auth";
import {
    ApplicantInfoField,
    ApplicantStatuses,
    ApplicantTicketField,
    ApplicantVisaField,
    EmployeesSettings,
    ForgetForm,
    GeneralSettings,
    ProfileSettings,
    ResetForm,
    SigninForm,
    SignupForm,
} from "./Components";
import AuthProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppContextProvider from "./Contexts/AppContextProvider";
import SettingsProvider from "./Contexts/SettingsContext";
import Content from "./Content";
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "applicants",
                element: <Applicants />,
            },
            {
                path: "applicants/new",
                element: <ApplicantForm isEditing={false} />,
                children: [
                    {
                        path: "info",
                        element: <ApplicantInfoField />,
                    },
                ],
            },
            {
                path: "applicants/edit/:id",
                element: <ApplicantForm isEditing={true} />,
                children: [
                    {
                        path: "info",
                        element: <ApplicantInfoField />,
                    },
                    {
                        path: "visa",
                        element: <ApplicantVisaField />,
                    },
                    {
                        path: "ticket",
                        element: <ApplicantTicketField />,
                    },
                    {
                        path: "status",
                        element: <ApplicantStatuses />,
                    },
                ],
            },
            {
                path: "reports",
                element: <Reports />,
            },
            {
                path: "issues",
                element: <Issues />,
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        path: "general",
                        element: <GeneralSettings />,
                    },
                    {
                        path: "profile",
                        element: <ProfileSettings />,
                    },
                    {
                        path: "employees",
                        element: <EmployeesSettings />,
                    },
                    {
                        path: "employees/create",
                        element: <SignupForm />,
                    },
                ],
            },
            {
                path: "archives",
                element: <Archives />,
            },
        ],
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                index: true,
                element: <SigninForm />,
            },
            {
                index: true,
                path: "signin",
                element: <SigninForm />,
            },
            {
                path: "signup",
                element: <SignupForm />,
            },
            {
                path: "forget",
                element: <ForgetForm />,
            },
            {
                path: "reset/:token",
                element: <ResetForm />,
            },
        ],
    },
]);
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                    <SettingsProvider>
                        <RouterProvider router={router} />
                    </SettingsProvider>
                </AppContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
