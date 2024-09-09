import React from "react";
import { Button } from "../Components";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
    // { id: 1, col1: "Hello", col2: "World" },
    // { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    // { id: 3, col1: "MUI", col2: "is Amazing" },
];
const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
];

function Applicants() {
    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Link to={"/applicants/new"}>
                <Button>New Applicant</Button>
            </Link>
            <div style={{ height: "100%", width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </div>
    );
}

export default Applicants;
