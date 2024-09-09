import React from "react";

function NavButton({ custumFunc, description, icon }) {
    return (
        <button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white  focus:outline-none focus:ring-blue-300 font-medium rounded-lg p-2 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
            {icon}
            <span class="sr-only">{description}</span>
        </button>
    );
}

export default NavButton;
