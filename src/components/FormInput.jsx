import React from "react";
import { useFormContext } from "react-hook-form";

function FormInput({ id, placeholder, label, type }) {
    const { register } = useFormContext();
    return (
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                type={type ? type : "text"}
                placeholder={placeholder}
                id={id}
                {...register(id)}
                className={
                    "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
            ></input>
        </div>
    );
}

export default FormInput;
