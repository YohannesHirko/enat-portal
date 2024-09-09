import React, { createContext, useContext, useEffect, useState } from "react";
import { TabNav } from "../Components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
const ApplicantContext = createContext();
function ApplicantForm({ isEditing }) {
    const { url, authToken } = useAuthContext();
    const navigate = useNavigate();
    const [applicant, setApplicant] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        async function fetchUser() {
            if (!applicant) {
                try {
                    const response = await fetch(
                        `${url}/enat/v1/applicants/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    const data = await response.json();
                    if (response.status !== 200) {
                        console.log(response);
                    }
                    console.log(data);
                    setApplicant(data);
                } catch (error) {
                    console.log(error);
                }
            }
            return;
        }
        fetchUser();
    });
    return (
        <ApplicantContext.Provider
            value={{ isEditing, applicant, setApplicant }}
        >
            <div className=" border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
                <TabNav />
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
