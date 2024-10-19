import React, { createContext, useContext, useEffect, useState } from "react";
import { TabNav } from "../Components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { genericFetcher } from "../Helpers/fetchers";

const ApplicantContext = createContext();
const NewLinks = [
    {
        link: "info",
        name: "Applicant",
    },
];
const EditLinks = [
    {
        link: `info`,
        name: "Applicant",
    },
    {
        link: `visa`,
        name: "Visa",
    },
    {
        link: `ticket`,
        name: "Ticket",
    },
    {
        link: `status`,
        name: "Statuses",
    },
];

function ApplicantForm({ isEditing }) {
    const [applicant, setApplicant] = useState(null);
    const { url, authToken } = useAuthContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        data: applicantData,
        error,
        isError,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["applicant", id],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: `applicants/${id}`,
                token: authToken,
            }),
        enabled: isEditing,
    });
    useEffect(() => {
        if (isSuccess && !isLoading) {
            setApplicant(applicantData.applicant);
        } else if (!isLoading && isError) {
            toast.error(applicantData?.message || error.message);
            setApplicant(null);
            navigate(`/applicants`);
        }
    }, [applicantData, isError, isSuccess, isLoading]);

    return (
        <ApplicantContext.Provider value={{ isEditing, id, applicant }}>
            <div className=" border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
                <TabNav links={isEditing ? EditLinks : NewLinks} />
                <Outlet />
            </div>
        </ApplicantContext.Provider>
    );
}
export function useApplicantContext() {
    const context = useContext(ApplicantContext);
    if (context === undefined) {
        throw new Error("useApplicant() must be used inside AuthProvider");
    }
    return context;
}
export default ApplicantForm;
