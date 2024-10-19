import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { genericFetcher, genericMutation } from "../../Helpers/fetchers";
import { useAuthContext } from "../../Contexts/AuthContext";
import { getInitials } from "../../Helpers/utils";
import { NavLink } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

function EmployeesSettings() {
    const { url, authToken } = useAuthContext();
    const queryClient = useQueryClient();
    const employeesQuery = useQuery({
        queryKey: ["employees"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "user/getallusers",
                token: authToken,
            }),
    });
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: () => queryClient.invalidateQueries("employees"),
    });
    const handleActivation = (id, action) => {
        mutation.mutate({
            baseURL: url,
            token: authToken,
            endpoint: `user/updateuser/${id}`,
            method: "PATCH",
            payload: { active: action === "activate" ? true : false },
        });
    };
    const employeesList = useMemo(() => {
        if (employeesQuery.data?.allUsers) {
            return employeesQuery.data.allUsers
                .filter((employee) => employee.role !== "admin")
                .map((employee) => (
                    <li key={employee.id} className="py-3 sm:py-4">
                        <div className="flex items-center">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {getInitials(
                                        employee.firstName,
                                        employee.lastName
                                    )}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {`${employee.firstName} ${employee.lastName}`}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {employee.email}
                                </p>
                            </div>
                            <div className="inline-flex items-center">
                                {employee.active ? (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            handleActivation(
                                                employee.id,
                                                "deactivate"
                                            )
                                        }
                                        disabled={mutation.isLoading}
                                    >
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() =>
                                            handleActivation(
                                                employee.id,
                                                "activate"
                                            )
                                        }
                                        disabled={mutation.isLoading}
                                    >
                                        Activate
                                    </Button>
                                )}
                            </div>
                        </div>
                    </li>
                ));
        }
        return [];
    }, [employeesQuery.data, mutation.isLoading]);
    return (
        <div className="w-full ">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Employees List
                </h5>
                <NavLink
                    to={"create"}
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Create account +
                </NavLink>
            </div>
            <div className="flow-root">
                {employeesQuery.isFetching ? (
                    <div className="flex justify-center py-10">
                        <CircularProgress color="brand" />
                    </div>
                ) : employeesQuery.isError ? (
                    <p className="text-red-500">
                        Error loading employees list.
                    </p>
                ) : employeesList.length === 0 ? (
                    <p className="text-gray-500">No employees found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {employeesList}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default EmployeesSettings;
