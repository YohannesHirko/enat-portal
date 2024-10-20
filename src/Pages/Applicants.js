import React from "react";
import { useNavigate } from "react-router-dom";
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useAuthContext } from "../Contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { genericFetcher, genericMutation } from "../Helpers/fetchers";

import { calculateAge, formatISODate } from "../Helpers/utils";
import { FaPlaneArrival } from "react-icons/fa";

function Applicants() {
    const queryClient = useQueryClient();
    const { url, authToken } = useAuthContext();
    const navigate = useNavigate();
    const applicantsQuery = useQuery({
        queryKey: ["applicants"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "applicants",
                token: authToken,
            }),
    });
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: () => {
            queryClient.invalidateQueries("applicants");
            toast.success("Successfully marked as arrived!");
        },
        onError: (error) => toast.error(error?.data?.message),
    });
    const handleRowClick = (params, event, details) => {
        console.log(event?.target?.dataset?.field);
        if (params.id) {
            navigate(`edit/${params.id}/info`);
        } else {
            toast.error("Can not get id from the clicked row");
        }
    };
    if (applicantsQuery.isError) {
        toast.error(applicantsQuery.error.message);
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div className=" flex w-full justify-between">
                    <div>
                        <GridToolbarColumnsButton
                            slotProps={{
                                button: { color: "brand" },
                            }}
                        />
                        <GridToolbarDensitySelector
                            slotProps={{
                                tooltip: { title: "Change density" },
                                button: { color: "brand" },
                            }}
                        />
                    </div>
                    <GridToolbarQuickFilter
                        slotProps={{
                            input: {
                                color: "brand",
                            },
                        }}
                    />
                </div>
            </GridToolbarContainer>
        );
    }
    const rows = applicantsQuery.data?.applicants || [];
    const columns = [
        {
            field: "created_at",
            headerName: "Registered",
            width: 150,
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
        { field: "id", headerName: "Reference number", width: 150 },
        { field: "fullname", headerName: "First name", width: 150 },
        {
            field: "date_of_birth",
            headerName: "Age",
            width: 80,
            valueFormatter: (value) => {
                return calculateAge(value);
            },
        },
        { field: "gender", headerName: "Gender", width: 80 },
        { field: "passport_no", headerName: "Passport no", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            align: "center",
            renderCell: (params) => {
                const color = {
                    AVAILABLE: "gray",
                    SELECTED: "green",
                    SUBMITTED: "indigo",
                    APPROVED: "purple",
                    TICKETED: "yellow",
                    ARRIVED: "blue",
                    INACTIVE: "red",
                };
                return (
                    <span
                        className={`bg-${color[params.value]}-100 text-${
                            color[params.value]
                        }-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:bg-${
                            color[params.value]
                        }-900 dark:text-${color[params.value]}-300`}
                    >
                        {params.value}
                    </span>
                );
            },
        },
        { field: "agent", headerName: "Agent", width: 250 },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<FaPlaneArrival />}
                    label={"Mark as Arrived"}
                    onClick={() =>
                        mutation.mutate({
                            baseURL: url,
                            token: authToken,
                            endpoint: `applicants/${params.id}`,
                            method: "PATCH",
                            payload: { applicant: { arrived: true } },
                        })
                    }
                    showInMenu
                />,
            ],
        },
    ];
    return (
        <div className="rounded-lg mt-14">
            <div className="" style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={handleRowClick}
                    loading={applicantsQuery.isLoading}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "created_at", sort: "desc" }],
                        },
                    }}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Applicants;
