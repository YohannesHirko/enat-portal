import React from "react";

function BarchartSkeleton() {
    return (
        <div
            role="status"
            className="h-60 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
            <div className="flex items-baseline mt-2">
                <div className="w-full bg-gray-200 rounded-t-lg h-44 dark:bg-gray-700"></div>
                <div className="w-full h-24 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6 dark:bg-gray-700"></div>
                <div className="w-full h-32 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-44 ms-6 dark:bg-gray-700"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default BarchartSkeleton;