import React, { useEffect, useState } from "react";
import { Areachart, Barchart, Piechart } from "../Components";
import { LuArrowUp } from "react-icons/lu";
import { useSettingsContext } from "../Contexts/SettingsContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { genericFetcher } from "../Helpers/fetchers";
import { useAuthContext } from "../Contexts/AuthContext";
import { toast } from "sonner";
import { formatISODate, getInitials } from "../Helpers/utils";
import useRefreshToken from "../hooks/useRefreshToken";
import { Button } from "@mui/material";
import { BarchartSkeleton, ListSkeleton } from "../Skeletons";
import { getGridStringOperators } from "@mui/x-data-grid";
function Dashboard() {
    const getPfp = (user_name) => {
        const [firstName, lastName] = user_name.split(" ");
        return getInitials(firstName, lastName);
    };
    const [visaOnHand, setVisaOnHand] = useState([
        {
            id: "visa",
            difference: "0",
            thisWeek: 1,
            data: [
                {
                    x: "24-09-09",
                    y: 2,
                },
                {
                    x: "24-09-16",
                    y: 2,
                },
                {
                    x: "24-09-30",
                    y: 3,
                },
                {
                    x: "24-10-07",
                    y: 1,
                },
            ],
        },
    ]);
    const [totalArrival, setTotalArrival] = useState([
        {
            id: "arrivals",
            difference: "0",
            thisWeek: 1,
            data: [
                {
                    x: "24-09-09",
                    y: 2,
                },
                {
                    x: "24-09-16",
                    y: 2,
                },
                {
                    x: "24-09-30",
                    y: 3,
                },
                {
                    x: "24-10-07",
                    y: 1,
                },
            ],
        },
    ]);
    const [agentPerformance, setAgentPerformance] = useState(null);
    const [ticketExpense, setTicketExpense] = useState(null);
    const [cvByCountry, setCvByCountry] = useState(null);
    const [latestEntries, setLatestEntries] = useState(null);
    const { userSettings } = useSettingsContext();
    const { url, authToken } = useAuthContext();
    const query = useQuery({
        queryKey: ["dashboard"],
        queryFn: () =>
            genericFetcher({
                baseURL: url,
                endpoint: "reports/dashboard/data",
                token: authToken,
                queryString: `apperiod=${
                    userSettings.reports.agentPerformance
                }&apinterval=${
                    userSettings.reports.agentPerformance === "week" ? 4 : 6
                }&teperiod=${userSettings.reports.ticketExpense}&teinterval=${
                    userSettings.reports.ticketExpense === "week" ? 4 : 6
                }`,
            }),
    });
    useEffect(() => {
        if (query.isSuccess && query.data) {
            setVisaOnHand(query.data.visaOnHand);
            setTotalArrival(query.data.totalArrival);
            setAgentPerformance(query.data.agentPerformance);
            setTicketExpense(query.data.ticketExpense);
            setCvByCountry(query.data.cvByCountry);
            setLatestEntries(query.data.latestEntries);
        }
    }, [query.isSuccess, query.data]);
    if (query.isError) {
        toast.error(query.error.message);
    }

    return (
        <div className="mt-14">
            <div className=" flex flex-col lg:grid gap-4 lg:grid-cols-3 lg:grid-rows-6 rounded-lg ">
                <div className="flex h-32 lg:h-auto gap-4 lg:col-span-2">
                    <div className="flex flex-auto flex-col rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="rounded-t-lg w-full flex justify-between py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                            <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                                Total arrival
                            </h1>
                            <div
                                className={`flex items-center text-base font-semibold text-center ${
                                    totalArrival[0]?.difference < 0
                                        ? "text-red-500 dark:text-red-500"
                                        : "text-green-500 dark:text-green-500"
                                }`}
                            >
                                {`${totalArrival[0]?.difference}%` || "0%"}
                                <LuArrowUp
                                    className={
                                        totalArrival[0]?.difference < 0
                                            ? "rotate-180"
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 justify-between items-center px-4 ">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    {totalArrival[0]?.thisWeek || 0}
                                </h5>
                            </div>
                            <div>
                                {totalArrival?.data?.length > 1 ? (
                                    <Areachart data={totalArrival} />
                                ) : (
                                    <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                        Not enough data avalilable to display
                                        charts.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-auto flex-col rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="rounded-t-lg w-full flex justify-between py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                            <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                                Total visa on hand
                            </h1>
                            <div
                                className={`flex items-center text-base font-semibold text-center ${
                                    visaOnHand[0]?.difference < 0
                                        ? "text-red-500 dark:text-red-500"
                                        : "text-green-500 dark:text-green-500"
                                }`}
                            >
                                {`${visaOnHand[0]?.difference}%` || "0%"}
                                <LuArrowUp
                                    className={
                                        visaOnHand[0]?.difference < 0
                                            ? "rotate-180"
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 justify-between items-center px-4 ">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    {visaOnHand[0]?.thisWeek}
                                </h5>
                            </div>
                            <div>
                                {visaOnHand?.data?.length > 1 ? (
                                    <Areachart data={visaOnHand} />
                                ) : (
                                    <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                        Not enough data avalilable to display
                                        charts.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border lg:row-span-2 border-gray-200 dark:border-gray-700">
                    <div className="rounded-t-lg w-full flex items-center justify-between py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                        <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                            Ticket expense
                        </h1>
                        <h1 className="text-xs text-gray-800 font-light dark:text-gray-400">
                            {`This ${userSettings.reports.ticketExpense}`}
                        </h1>
                    </div>
                    <div>
                        {query.isLoading ? (
                            <BarchartSkeleton />
                        ) : ticketExpense?.length > 0 ? (
                            <Barchart
                                data={ticketExpense}
                                keys={["total_spent"]}
                                indexBy="period_start"
                                yAxis={{
                                    legend: "Total spent in Birr",
                                    tickValues: false,
                                }}
                                options={{
                                    padding: 0.55,
                                    enableGridY: false,
                                    valueFormat: " >-$,",
                                }}
                            />
                        ) : (
                            <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                Not enough data avalilable to display charts.
                            </p>
                        )}
                    </div>
                </div>
                <div className=" lg:col-span-2 lg:row-span-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="rounded-t-lg w-full flex items-center justify-between py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                        <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                            Agent performance
                        </h1>
                        <h1 className="text-xs text-gray-800 font-light dark:text-gray-400">
                            {`This ${userSettings.reports.agentPerformance}`}
                        </h1>
                    </div>
                    <div>
                        {query.isLoading ? (
                            <BarchartSkeleton />
                        ) : agentPerformance?.length > 0 ? (
                            <Barchart
                                data={agentPerformance}
                                keys={[
                                    "ANAM SHAKR RESOURCES COMPANY",
                                    "IBRAHEM ABDULLAH ALMAJED RECRUITMENT OFFICE",
                                    "RAED ALMUSHARRAF RECRUITMENT",
                                    "SMART GLOBAL DOMESTIC WORKERS SERVICE CENTER LLC",
                                    "DANA AL-TAWASH DOMESTIC WORKERS SERVICES CENTER",
                                    "ALREAYA FOR DOMESTIC WORKERS SERVICES",
                                    "ZANAH CENTER FOR MANPOWER RECRUITMENT",
                                ]}
                                indexBy="period_start"
                                options={{
                                    groupMode: "grouped",
                                }}
                                yAxis={{
                                    legend: "Visas",
                                    tickValues: false,
                                }}
                            />
                        ) : (
                            <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                Not enough data avalilable to display charts.
                            </p>
                        )}
                    </div>
                </div>
                <div className="lg:row-span-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="rounded-t-lg w-full flex items-center justify-between py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                        <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                            CV by country
                        </h1>
                        <h1 className="text-xs text-gray-800 font-light dark:text-gray-400">
                            {`This ${userSettings.reports.cvByCountry}`}
                        </h1>
                    </div>
                    <div>
                        {query.isLoading ? (
                            <div
                                role="status"
                                className="flex justify-center w-ful p-6 border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
                            >
                                <div className="w-60 h-60 rounded-full bg-gray-200  dark:bg-gray-700"></div>

                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : cvByCountry?.length > 0 ? (
                            <Piechart data={cvByCountry} />
                        ) : (
                            <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                Not enough data avalilable to display charts.
                            </p>
                        )}
                    </div>
                </div>
                <div className=" lg:col-span-2 lg:row-span-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="rounded-t-lg w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                        <h1 className="text-gray-800 font-semibold dark:text-gray-400">
                            Latest Entries
                        </h1>
                    </div>
                    <div className="p-4">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {query.isLoading ? (
                                <ListSkeleton />
                            ) : latestEntries?.length > 0 ? (
                                latestEntries.map((status) => (
                                    <li
                                        className="py-3 sm:py-4"
                                        key={status.status_id}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 hover:border-2 hover:border-blue-700 ">
                                                    <span className="font-medium text-gray-600 dark:text-gray-300 hover:text-white">
                                                        {getPfp(
                                                            status.user_name
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {status.user_name}
                                                </p>
                                                {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {formatISODate(
                                                        status.status_date
                                                    )}
                                                </p> */}
                                            </div>
                                            <div className="px-4">
                                                <p className="leading-none text-sm font-bold text-gray-900 dark:text-white">
                                                    {status.status}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 pb-1">
                                                    {
                                                        status.applicant_reference_no
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="p-4 font-normal text-sm text-gray-700 dark:text-gray-400">
                                    Not enough data avalilable to display
                                    charts.
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
