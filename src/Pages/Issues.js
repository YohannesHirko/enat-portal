import React, { useEffect } from "react";
import { toast } from "sonner";
import { genericFetcher } from "../Helpers/fetchers";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../Contexts/AppContextProvider";

function Issues() {
    const { url, authToken } = useAuthContext();
    const navigate = useNavigate();
    const { setIssuesCount } = useAppContext();
    const query = useQuery({
        queryKey: ["issues"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "issues/allissues",
                token: authToken,
            }),
    });
    const handleRowClick = (params, event, details) => {
        if (params.row?.issue_type === "Passport issue (6 months)") {
            navigate(`/applicants/edit/${params.row?.reference_no}/info`);
        } else if (params.row?.issue_type === "Visa issue (15 days or above)") {
            navigate(`/applicants/edit/${params.row?.reference_no}/visa`);
        }
    };
    const rows = query.data?.allIssues;
    const columns = [
        { field: "reference_no", headerName: "Reference number", width: 150 },
        { field: "fullname", headerName: "Full name", width: 150 },
        { field: "issue_type", headerName: "Issue type", width: 250 },
        { field: "description", headerName: "Description", width: 450 },
    ];
    useEffect(() => {
        if (query.isSuccess) {
            setIssuesCount(query.data.count);
        }
    }, [query.isSuccess]);
    return (
        <div className="rounded-lg mt-14">
            <div className="" style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    rowHeight={80}
                    columns={columns}
                    onRowClick={handleRowClick}
                    loading={query.isLoading}
                    initialState={{}}
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

export default Issues;
