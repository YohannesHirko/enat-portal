import React from "react";
import { useFormContext } from "react-hook-form";

function FormSelect({
    id,
    label,
    placeholder,
    options,
    errorCode,
    isDisabled,
    formOptions,
    formErrorMessage,
}) {
    const { register } = useFormContext();
    const normalState =
        "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const errorState =
        "bg-red-50 border border-red-500 text-red-900 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
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
                {...register(id, formOptions ? formOptions : {})}
                className={
                    errorCode || formErrorMessage ? errorState : normalState
                }
            >
                {options ? (
                    options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                ) : (
                    <option>None</option>
                )}
            </select>
            {formErrorMessage && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formErrorMessage}
                </p>
            )}
        </div>
    );
}

export default FormSelect;
