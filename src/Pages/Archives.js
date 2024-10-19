import React from "react";
import { useNavigate } from "react-router-dom";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useAuthContext } from "../Contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { genericFetcher, genericMutation } from "../Helpers/fetchers";
import { calculateAge, formatISODate } from "../Helpers/utils";
function Archives() {
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
    const handleRowClick = (params, event, details) => {
        console.log(event?.target?.dataset?.field);
        if (params.id) {
            navigate(`/applicants/edit/${params.id}/info`);
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
                <div className="pb-1 flex w-full justify-between">
                    <GridToolbarColumnsButton
                        slotProps={{
                            button: { color: "brand" },
                        }}
                    />
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
        { field: "passport_no", headerName: "Passport no", width: 150 },
        { field: "agent", headerName: "Agent", width: 250 },
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

export default Archives;
