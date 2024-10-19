import React, { useEffect } from "react";
import { toast } from "sonner";
import { genericFetcher } from "../Helpers/fetchers";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../Contexts/AppContextProvider";

const data = [
    {
        id: "hello",
        fullname: "helloo",
        issue_type: "visa",
        description: "",
    },
    {
        id: "hello",
        fullname: "helloo",
        issue_type: "visa",
        description: "",
    },
    {
        id: "EN24-10140221-10",
        fullname: "helloo",
        issue_type: "visa",
        description: "",
    },
    {
        id: "hello",
        fullname: "helloo",
        issue_type: "visa",
        description: "",
    },
    {
        id: "hello",
        fullname: "helloo",
        issue_type: "visa",
        description: "",
    },
];

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
        console.log(event?.target?.dataset?.field);
        if (params.id) {
            navigate(`/applicants/edit/${params.id}/info`);
        } else {
            toast.error("Can not get id from the clicked row");
        }
    };
    const rows = query.data?.allIssues;
    const columns = [
        { field: "id", headerName: "Reference number", width: 150 },
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
