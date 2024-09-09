import React, { useState } from "react";
import FormInput from "../Form/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";

function ResetForm() {
    const hookForm = useForm();
    const { token } = useParams();
    const { url, setAuthToken } = useAuthContext();
    const [errorCode, setErrorCode] = useState(null);

    const onSubmit = async (data) => {
        try {
            setErrorCode(null);
            const response = await fetch(`${url}/enat/v1/auth/forgetpass`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const apiData = await response.json();
            if (response.status !== 201) {
                setErrorCode(apiData.errorCode);
            }
            setAuthToken(apiData.token);
            localStorage.setItem("jwtToken", apiData.token);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <FormProvider {...hookForm}>
                <form className="space-y-6" action="#">
                    <h5 className="mb-10 text-2xl font-extrabold text-gray-900 dark:text-white">
                        Change your password
                    </h5>
                    <p className=" text-sm text-gray-900 dark:text-white">
                        Enter a new password below to change your password{" "}
                        {token}
                    </p>
                    <FormInput
                        id={"password"}
                        placeholder={"••••••••"}
                        label={"New Password"}
                        isDisabled={hookForm.formState.isSubmitting}
                    />
                    <FormInput
                        id={"password"}
                        placeholder={"••••••••"}
                        label={"Confirm new password"}
                        isDisabled={hookForm.formState.isSubmitting}
                    />

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Change password
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default ResetForm;
