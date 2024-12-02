import React from "react";
import { useNavigate } from "react-router-dom";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useAuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { genericFetcher } from "../Helpers/fetchers";
import { formatISODate } from "../Helpers/utils";
import { statusBadgeColor } from "../constants";
function Arrived() {
    const { url, authToken } = useAuthContext();

    const applicantsQuery = useQuery({
        queryKey: ["arrived"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "reports/allarrived",
                token: authToken,
            }),
    });
    if (applicantsQuery.isError) {
        toast.error(applicantsQuery.error.message);
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div className="pb-1 flex w-full justify-between">
                    <div className="flex gap-4">
                        <GridToolbarColumnsButton
                            slotProps={{
                                button: { color: "brand" },
                            }}
                        />
                        <GridToolbarFilterButton
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
                        <GridToolbarExport
                            slotProps={{
                                tooltip: { title: "Export data" },
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
    const rows = applicantsQuery.data?.allarrived || [];
    const columns = [
        {
            field: "status_date",
            headerName: "Arrival date",
            type: "date",
            width: 150,
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
        { field: "id", headerName: "Reference number", width: 150 },
        { field: "fullname", headerName: "Full name", width: 150 },
        { field: "labour_id", headerName: "Labour ID", width: 150 },
        { field: "agent", headerName: "Agent", width: 250 },
        {
            field: "status",
            headerName: "Status",
            width: 170,
            align: "center",
            renderCell: (params) => {
                return (
                    <span
                        className={`bg-${
                            statusBadgeColor[params.value]
                        }-100 text-${
                            statusBadgeColor[params.value]
                        }-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:bg-${
                            statusBadgeColor[params.value]
                        }-900 dark:text-${statusBadgeColor[params.value]}-300`}
                    >
                        {params.value}
                    </span>
                );
            },
        },
        {
            field: "created_at",
            headerName: "Registered",
            width: 150,
            type: "date",
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
    ];
    return (
        <div className="rounded-lg mt-14">
            <div className="" style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
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

export default Arrived;
