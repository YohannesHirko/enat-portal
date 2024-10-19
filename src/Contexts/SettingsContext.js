import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
    const [userSettings, setUserSettings] = useState(() => {
        const savedSettings = localStorage.getItem("userSettings");
        return savedSettings
            ? JSON.parse(savedSettings)
            : {
                  reports: {
                      agentPerformance: "week",
                      ticketExpense: "week",
                      cvByCountry: "week",
                  },
              };
    });
    useEffect(() => {
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }, [userSettings]);
    return (
        <SettingsContext.Provider value={{ userSettings, setUserSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettingsContext() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error(
            "useSettingsContext() must be used inside SettingsProvider"
        );
    }
    return context;
}
