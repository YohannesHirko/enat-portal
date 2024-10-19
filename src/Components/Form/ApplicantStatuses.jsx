import React from "react";
import { useApplicantContext } from "../../Pages/ApplicantForm";
import { formatISODate, getInitials } from "../../Helpers/utils";

function ApplicantStatuses() {
    const { applicant } = useApplicantContext();
    const getPfp = (user_name) => {
        const [firstName, lastName] = user_name.split(" ");
        return getInitials(firstName, lastName);
    };

    return (
        <div className="w-full p-4 bg-white rounded-b-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Statuses
                </h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {applicant?.Statuses?.map((status) => (
                        <li className="py-3 sm:py-4" key={status.status_id}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 hover:border-2 hover:border-blue-700 ">
                                        <span className="font-medium text-gray-600 dark:text-gray-300 hover:text-white">
                                            {getPfp(status.user_name)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {status.user_name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {formatISODate(status.status_date)}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {status.status}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ApplicantStatuses;
