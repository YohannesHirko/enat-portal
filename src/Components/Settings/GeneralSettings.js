import React, { useState } from "react";
import { useAppContext } from "../../Contexts/AppContextProvider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSettingsContext } from "../../Contexts/SettingsContext";

function GeneralSettings() {
    const { handleThemeChange, isDarkMode } = useAppContext();
    const { userSettings, setUserSettings } = useSettingsContext();
    const [agentPerformance, setAgentPerformance] = useState(
        userSettings?.reports?.agentPerformance || "week"
    );
    const [ticketExpense, setTicketExpense] = useState(
        userSettings?.reports?.ticketExpense || "week"
    );
    const [showInactiveApplicants, setShowInactiveApplicants] = useState(
        userSettings?.applicants?.showInactiveApplicants || false
    );

    const handleReportSettings = (event, reportName) => {
        setAgentPerformance(
            reportName === "agentPerformance"
                ? event.target.value
                : agentPerformance
        );
        setTicketExpense(
            reportName === "ticketExpense" ? event.target.value : ticketExpense
        );
        setUserSettings((prevState) => ({
            ...prevState,
            reports: {
                ...prevState.reports,
                [reportName]: event.target.value,
            },
        }));
    };
    const handleApplicantSettings = (event, settingName) => {
        setShowInactiveApplicants(
            settingName === "showInactiveApplicants"
                ? event.target.value
                : showInactiveApplicants
        );
        setUserSettings((prevState) => ({
            ...prevState,
            applicants: {
                ...prevState.applicants,
                [settingName]: event.target.value,
            },
        }));
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                General Settings
            </h3>
            <section className="p-4 border-b border-gray-200 dark:border-gray-700 ">
                <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-300">
                        <p>Dark Mode</p>
                        <p className="text-xs text"></p>
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                            Dark Mode
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={isDarkMode}
                            label="Dark Mode"
                            onChange={handleThemeChange}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>
            <section className="p-4 border-b border-gray-200 dark:border-gray-700 ">
                <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-300">
                        <p>Agent performance report</p>
                        <p className="text-xs text"></p>
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                            Period
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={agentPerformance}
                            label="Period"
                            onChange={(event) =>
                                handleReportSettings(event, "agentPerformance")
                            }
                        >
                            <MenuItem value={"month"}>
                                Yearly(6 Months)
                            </MenuItem>
                            <MenuItem value={"week"}>Monthly(4 Weeks)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-300">
                        <p>Ticket expense report</p>
                        <p className="text-xs text"></p>
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                            Period
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={ticketExpense}
                            label="Period"
                            onChange={(event) =>
                                handleReportSettings(event, "ticketExpense")
                            }
                        >
                            <MenuItem value={"month"}>
                                Yearly(6 Months)
                            </MenuItem>
                            <MenuItem value={"week"}>Monthly(4 Weeks)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>
            <section className="p-4 border-b border-gray-200 dark:border-gray-700 ">
                <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-300">
                        <p>Show inactive applicants</p>
                        <p className="text-xs text"></p>
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                            Show Inactive
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={showInactiveApplicants}
                            label="Show Inactive"
                            onChange={(event) =>
                                handleApplicantSettings(
                                    event,
                                    "showInactiveApplicants"
                                )
                            }
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>
        </div>
    );
}

export default GeneralSettings;
