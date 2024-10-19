import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    useGridApiRef,
} from "@mui/x-data-grid";
import { toast } from "sonner";
import { useAuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { genericFetcher } from "../Helpers/fetchers";
import { calculateAge, formatISODate } from "../Helpers/utils";

const normalCSS =
    "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
const activeCSS =
    "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
const predefinedFilters = [
    {
        label: "Selected",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "SELECTED" }],
        },
    },
    {
        label: "Submitted",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "SUBMITTED" }],
        },
    },
    {
        label: "Approved",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "APPROVED" }],
        },
    },
    {
        label: "Ticketed",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "TICKETED" }],
        },
    },
    {
        label: "Arrived",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "ARRIVED" }],
        },
    },
];
function Reports() {
    const customIsOperator = {
        label: "is",
        value: "is",
        getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) {
                return null;
            }
            return (value) => value === filterItem.value;
        },
    };
    const apiRef = useGridApiRef();
    const { url, authToken } = useAuthContext();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [predefinedFiltersRowCount, setPredefinedFiltersRowCount] = useState(
        []
    );
    const navigate = useNavigate();
    const reportQuery = useQuery({
        queryKey: ["reports"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "reports/applicantsreport",
                token: authToken,
            }),
    });
    if (reportQuery.isError) {
        toast.error(reportQuery.error.message);
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div className="flex flex-wrap justify-between w-full ">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500  dark:text-gray-400 ">
                        {predefinedFilters.map(
                            ({ label, filterModel }, index) => {
                                const count = predefinedFiltersRowCount[index];
                                return (
                                    <li className="me-2" key={label}>
                                        <button
                                            className={
                                                selectedButtonIndex === index
                                                    ? activeCSS
                                                    : normalCSS
                                            }
                                            onClick={() => {
                                                setSelectedButtonIndex(index);
                                                apiRef.current.setFilterModel(
                                                    filterModel
                                                );
                                            }}
                                        >
                                            {label}{" "}
                                            {count !== undefined
                                                ? `(${count})`
                                                : ""}
                                        </button>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                    <div className=" hidden lg:flex justify-end">
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
                        <GridToolbarExport
                            slotProps={{
                                tooltip: { title: "Export data" },
                                button: { color: "brand" },
                            }}
                        />
                    </div>
                </div>
            </GridToolbarContainer>
        );
    }
    console.log(reportQuery.data?.applicants);
    const rows = reportQuery.data?.applicants || [];
    const columns = [
        {
            field: "created_at",
            headerName: "Registered",
            width: 150,
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
        { field: "reference_no", headerName: "Reference number", width: 150 },
        { field: "fullname", headerName: "First name", width: 150 },
        { field: "gender", headerName: "Gender", width: 80 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            align: "center",
            type: "string",
            filterOperators: [customIsOperator],
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
        {
            field: "id",
            headerName: "Status Date",
            width: 150,
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
        { field: "agent", headerName: "Agent", width: 150 },
    ];
    const handleRowClick = (params, event, details) => {
        console.log(event?.target?.dataset?.field);
        if (params.id) {
            navigate(`/applicants/edit/${params.id}/info`);
        } else {
            toast.error("Can not get id from the clicked row");
        }
    };
    const getFilteredRowsCount = React.useCallback(
        (filterModel) => {
            const { filteredRowsLookup } =
                apiRef.current.getFilterState(filterModel);
            return Object.keys(filteredRowsLookup).filter(
                (rowId) => filteredRowsLookup[rowId] === true
            ).length;
        },
        [apiRef]
    );
    useEffect(() => {
        apiRef.current.setFilterModel(predefinedFilters[0].filterModel);
        if (reportQuery.data?.applicants?.length === 0) {
            return;
        }
        setPredefinedFiltersRowCount(
            predefinedFilters.map(({ filterModel }) =>
                getFilteredRowsCount(filterModel)
            )
        );
    }, [apiRef, reportQuery.data, getFilteredRowsCount]);
    return (
        <div className="rounded-lg mt-14">
            <div className="" style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    apiRef={apiRef}
                    onRowClick={handleRowClick}
                    loading={reportQuery.isLoading}
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

export default Reports;
