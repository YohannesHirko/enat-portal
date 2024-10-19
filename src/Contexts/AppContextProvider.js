import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuthContext } from "./AuthContext";

const AppContext = createContext();
export default function AppContextProvider({ children }) {
    const getInitialMode = () => {
        const savedMode = localStorage.getItem("theme");
        if (savedMode) {
            return savedMode === "dark" ? true : false;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    const [issuesCount, setIssuesCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode);
    const getColors = (mode) => ({
        ...(isDarkMode
            ? {
                  foreground: "#1f2937",
                  background: "#111827",
                  border: "#374151",
                  textMain: "#111827",
                  textSecondary: "#9ca3af",
              }
            : {
                  foreground: "#f3f4f6",
                  background: "#ffffff",
                  border: "#e5e7eb",
                  textMain: "#ffffff",
                  textSecondary: "#6b7280",
              }),
    });
    const colors = useMemo(
        () => getColors(isDarkMode ? true : false),
        [isDarkMode]
    );
    const lightTheme = {
        palette: {
            mode: "light",
            brand: {
                main: "#1d4ed8",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        "&.MuiDataGrid-menuList": {
                            backgroundColor: colors.background,
                            border: "2px solid",
                            borderColor: colors.border,
                            padding: "10px",
                            borderRadius: "10px",
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        "&.MuiMenuItem-root": {
                            "&:hover": {
                                backgroundColor: colors.foreground,
                            },
                            fontSize: "14px",
                            borderRadius: "5px",
                        },
                    },
                },
            },
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        borderColor: colors.border,
                    },
                    cell: {
                        borderColor: colors.border,
                    },
                    columnHeaders: {
                        borderColor: colors.border,
                    },
                    columnSeparator: {
                        color: colors.border,
                    },
                },
            },
        },
        mixins: {
            MuiDataGrid: {
                containerBackground: "#F3F4F6",
            },
        },
    };
    const darkTheme = {
        palette: {
            mode: "dark",
            brand: {
                main: "#2563eb",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        "&.MuiDataGrid-menuList": {
                            backgroundColor: colors.background,
                            border: "2px solid",
                            borderColor: colors.border,
                            padding: "10px",
                            borderRadius: "10px",
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        "&.MuiMenuItem-root": {
                            "&:hover": {
                                backgroundColor: colors.foreground,
                            },
                            fontSize: "14px",
                            borderRadius: "5px",
                        },
                    },
                },
            },
            MuiDataGrid: {
                styleOverrides: {
                    toolbarContainer: {},
                    root: {
                        borderColor: "#374151",
                    },
                    cell: {
                        borderColor: "#374151",
                    },
                    columnHeaders: {
                        borderColor: "#374151",
                    },
                    columnSeparator: {
                        color: "#374151",
                    },
                    filterForm: {
                        backgroundColor: colors.background,
                        border: "2px solid",
                        borderColor: colors.border,
                        borderRadius: "10px",
                    },
                },
            },
        },
        mixins: {
            MuiDataGrid: {
                containerBackground: "#1F2937",
            },
        },
    };
    const theme = useMemo(
        () => createTheme(isDarkMode ? darkTheme : lightTheme),
        [isDarkMode]
    );
    const nivoTheme = {
        background: "transparent",
        labels: {
            text: {
                fill: "#f4f444",
            },
        },
        text: {
            fontSize: 1,
            fill: colors.textMain,
            outlineWidth: 0,
            outlineColor: "transparent",
        },
        axis: {
            domain: {
                line: {
                    stroke: "#fffff",
                    strokeWidth: 1,
                },
            },
            legend: {
                text: {
                    fontSize: 12,
                    fill: colors.textSecondary,
                    outlineWidth: 0,
                    outlineColor: "transparent",
                },
            },
            ticks: {
                line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                },
                text: {
                    fontSize: 11,
                    fill: colors.textSecondary,
                    outlineWidth: 0,
                    outlineColor: "transparent",
                },
            },
        },
        grid: {
            line: {
                stroke: colors.foreground,
                strokeWidth: 1,
            },
        },
        legends: {
            title: {
                text: {
                    fontSize: 11,
                    fill: "#333333",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                },
            },
            text: {
                fontSize: 11,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
            },
            ticks: {
                line: {},
                text: {
                    fontSize: 10,
                    fill: "#333333",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                },
            },
        },
        annotations: {
            text: {
                fontSize: 13,
                fill: colors.textMain,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
            },
            link: {
                stroke: "#000000",
                strokeWidth: 1,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
            },
            outline: {
                stroke: "#000000",
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
            },
            symbol: {
                fill: colors.textMain,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
            },
        },
        tooltip: {
            wrapper: {},
            container: {
                background: colors.foreground,
                color: colors.textSecondary,
                fontSize: 11,
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
        },
    };
    useEffect(() => {
        // if (
        //     localStorage.theme === "dark" ||
        //     (!("theme" in localStorage) &&
        //         window.matchMedia("(prefers-color-scheme: dark)").matches)
        // ) {
        //     document.documentElement.classList.add("dark");
        // } else {
        //     document.documentElement.classList.remove("dark");
        // }
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const handleThemeChange = (event) => {
        setIsDarkMode(event.target.value);
    };
    return (
        <AppContext.Provider
            value={{
                issuesCount,
                setIssuesCount,
                handleThemeChange,
                isDarkMode,
                colors,
                nivoTheme,
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext() must be used inside AuthProvider");
    }
    return context;
}
