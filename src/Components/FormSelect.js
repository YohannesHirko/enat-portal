import React from "react";
import { useFormContext } from "react-hook-form";

function FormSelect({ id, label, placeholder, options }) {
    const { register } = useFormContext();
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                placeholder={placeholder}
                id={id}
                {...register(id)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {options ? (
                    options.map((option) => (
                        <option key={option}>{option}</option>
                    ))
                ) : (
                    <option>None</option>
                )}
            </select>
        </div>
    );
}

export default FormSelect;
