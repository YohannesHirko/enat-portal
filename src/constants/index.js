export const predefinedFilters = [
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
    {
        label: "Insured",
        filterModel: {
            items: [{ field: "status", operator: "is", value: "INSURED" }],
        },
    },
    {
        label: "Medical",
        filterModel: {
            items: [
                { field: "status", operator: "is", value: "MEDICAL_PASSED" },
            ],
        },
    },
];
export const customIsOperator = {
    label: "is",
    value: "is",
    getApplyFilterFn: (filterItem) => {
        if (!filterItem.value) {
            return null;
        }
        return (value) => value === filterItem.value;
    },
};

export const statusBadgeColor = {
    AVAILABLE: "orange",
    SELECTED: "green",
    SUBMITTED: "indigo",
    APPROVED: "purple",
    TICKETED: "yellow",
    ARRIVED: "blue",
    INACTIVE: "red",
    INSURED: "blue",
    MEDICAL_PASSED: "green",
};
