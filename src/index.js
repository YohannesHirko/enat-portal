import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Layouts/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApplicantForm, Applicants } from "./Pages";
import Content from "./Content";
import Auth from "./Layouts/Auth";
import {
    ApplicantInfoField,
    ApplicantStatuses,
    ApplicantTicketField,
    ApplicantVisaField,
    ForgetForm,
    ResetForm,
    SigninForm,
    SignupForm,
} from "./Components";
import AuthProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProfilePage from "./Pages/ProfilePage";

const queryClient = new QueryClient();
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
                path: "dashboard",
                element: <Content />,
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
                        index: true,
                        element: <ApplicantInfoField />,
                    },
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
                        index: true,
                        element: <ApplicantInfoField />,
                    },
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
                path: "profile",
                element: <ProfilePage />,
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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
