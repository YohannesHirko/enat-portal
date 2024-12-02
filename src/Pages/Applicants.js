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
import { AiFillSafetyCertificate } from "react-icons/ai";
import { calculateAge, formatISODate } from "../Helpers/utils";
import { FaCheck, FaPlaneArrival } from "react-icons/fa";
import {
    MdAirplanemodeInactive,
    MdCancelPresentation,
    MdEdit,
    MdOutlineCancel,
} from "react-icons/md";
import { useSettingsContext } from "../Contexts/SettingsContext";
import { BsPersonLinesFill } from "react-icons/bs";
import { statusBadgeColor } from "../constants";

function Applicants() {
    const queryClient = useQueryClient();
    const { url, authToken } = useAuthContext();
    const { userSettings } = useSettingsContext();
    const navigate = useNavigate();
    const applicantsQuery = useQuery({
        queryKey: ["applicants"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "applicants",
                token: authToken,
                queryString: `includeInactive=${userSettings.applicants.showInactiveApplicants}`,
            }),
    });
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: (data) => {
            queryClient.invalidateQueries("applicants");
            toast.success(`Successfully marked as ${data?.status?.status}!`);
        },
        onError: (error) => toast.error(error?.data?.message),
    });
    const handleRowClick = (params, event, details) => {
        if (event?.target?.dataset?.field === "status") {
            navigate(`edit/${params.id}/status`);
        } else if (event?.target?.dataset?.field === "agent") {
            navigate(`edit/${params.id}/visa`);
        }
        //  else {
        //     toast.error("Can not get id from the clicked row");
        // }
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
            type: "date",
            valueFormatter: (value) => {
                return formatISODate(value);
            },
        },
        { field: "id", headerName: "Reference number", width: 150 },
        { field: "fullname", headerName: "Full name", width: 150 },
        {
            field: "date_of_birth",
            headerName: "Age",
            width: 80,
            valueFormatter: (value) => {
                return calculateAge(value);
            },
        },
        { field: "gender", headerName: "Gender", width: 80 },
        { field: "relegion", headerName: "Relegion", width: 80 },
        { field: "passport_no", headerName: "Passport no", width: 150 },
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
        { field: "agent", headerName: "Agent", width: 250 },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<MdEdit />}
                    label={"Edit"}
                    onClick={() => {
                        console.log(!params.row.active);
                        if (params.id) {
                            navigate(`/applicants/edit/${params.id}/info`);
                        } else {
                            toast.error("Can not get id from the clicked row");
                        }
                    }}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    icon={
                        params.row.insured === true ? (
                            <MdCancelPresentation />
                        ) : (
                            <FaCheck />
                        )
                    }
                    label={`Mark as ${
                        params.row.insured === true ? "uninsured" : "insured"
                    } `}
                    onClick={() =>
                        mutation.mutate({
                            baseURL: url,
                            token: authToken,
                            endpoint: `applicants/${params.id}`,
                            method: "PATCH",
                            payload: {
                                applicant: { insured: !params.row.insured },
                            },
                        })
                    }
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={
                        params.row.arrived === true ? (
                            <MdAirplanemodeInactive />
                        ) : (
                            <FaPlaneArrival />
                        )
                    }
                    label={`Mark as ${
                        params.row.arrived === true ? "not arrived" : "arrived"
                    } `}
                    onClick={() =>
                        mutation.mutate({
                            baseURL: url,
                            token: authToken,
                            endpoint: `applicants/${params.id}`,
                            method: "PATCH",
                            payload: {
                                applicant: { arrived: !params.row.arrived },
                            },
                        })
                    }
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<AiFillSafetyCertificate />}
                    label={"Mark as medical passed"}
                    onClick={() =>
                        mutation.mutate({
                            baseURL: url,
                            token: authToken,
                            endpoint: `applicants/${params.id}`,
                            method: "PATCH",
                            payload: { applicant: { medical: true } },
                        })
                    }
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={
                        params.row.active === true ? (
                            <MdOutlineCancel />
                        ) : (
                            <BsPersonLinesFill />
                        )
                    }
                    label={`Mark as ${
                        params.row.active === true ? "inactive" : "active"
                    } `}
                    onClick={() =>
                        mutation.mutate({
                            baseURL: url,
                            token: authToken,
                            endpoint: `applicants/${params.id}`,
                            method: "PATCH",
                            payload: {
                                applicant: { active: !params.row.active },
                            },
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
