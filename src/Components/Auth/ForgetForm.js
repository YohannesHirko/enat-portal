import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../Form/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthContext } from "../../Contexts/AuthContext";
import { IoMdMailUnread } from "react-icons/io";
import Button from "../Globals/Button";

function ForgetForm() {
    const hookForm = useForm();
    const { url, setAuthToken } = useAuthContext();
    const [errorCode, setErrorCode] = useState(null);
    const [emailSent, setEmailSent] = useState(false);

    const onSubmit = async (data) => {
        try {
            setErrorCode(null);
            const response = await fetch(`${url}/enat/v1/auth/forgetpassword`, {
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
            if (response.status === 200) {
                setEmailSent(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            {emailSent ? (
                <div>
                    <IoMdMailUnread className="text-5xl text-gray-500 dark:text-gray-400 mb-3" />

                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Password reset link successfully sent!
                    </h5>

                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                        A password reset link has been sent to your email
                        address. Please check your inbox for the email and click
                        on the link to reset your password.
                    </p>
                    <Link
                        to="/auth/signin"
                        className="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        Just remembered my password
                        <svg
                            class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                            />
                        </svg>
                    </Link>
                </div>
            ) : (
                <FormProvider {...hookForm}>
                    <form
                        className="space-y-6"
                        onSubmit={hookForm.handleSubmit(onSubmit)}
                    >
                        <h5 className="mb-10 text-2xl font-extrabold text-gray-900 dark:text-white">
                            Forget Password
                        </h5>
                        <p className=" text-sm text-gray-900 dark:text-white">
                            Enter the email address associated with you account
                            and we will send you a link to reset your password.
                        </p>

                        <FormInput
                            id={"email"}
                            placeholder={"name@company.com"}
                            label={"Email address"}
                            isDisabled={hookForm.formState.isSubmitting}
                            errorCode={
                                ["AUTH001"].includes(errorCode)
                                    ? errorCode
                                    : null
                            }
                        />
                        <Button
                            type={"submit"}
                            isLoading={hookForm.formState.isSubmitting}
                        >
                            Continue
                        </Button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <Link
                                to="/auth/signup"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </FormProvider>
            )}
        </div>
    );
}

export default ForgetForm;
