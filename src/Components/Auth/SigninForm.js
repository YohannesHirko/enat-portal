import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "../Form/FormInput";
import { useAuthContext } from "../../Contexts/AuthContext";
import Button from "../Globals/Button";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { genericMutation } from "../../Helpers/fetchers";
import { toast } from "sonner";
import axiosInstance from "../../api/axios";

const schema = z.object({
    email: string().email(),
    password: z.string(),
});

function SigninForm() {
    const hookform = useForm({ resolver: zodResolver(schema) });
    const { url, setAuthToken, authToken } = useAuthContext();
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: (data) => {
            setAuthToken(data.accessToken);
            localStorage.setItem("jwtToken", data.accessToken);
            toast.success("Successfully logged in!");
        },
        onError: (error) => {
            toast.error(
                error?.data?.message || "Login failed. Please try again."
            );
        },
    });
    const handleSubmit = async (data) => {
        try {
            const response = axiosInstance.post(
                "/auth/login",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
        } catch (error) {
            console.error(error);
        }
    };
    const onSubmit = async (data) => {
        mutation.mutate({
            baseURL: url,
            token: authToken,
            endpoint: `auth/login`,
            method: "POST",
            payload: data,
        });
    };
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <FormProvider {...hookform}>
                <form
                    className="space-y-6"
                    onSubmit={hookform.handleSubmit(onSubmit)}
                >
                    <h5 className="mb-10 text-2xl font-extrabold text-gray-900 dark:text-white">
                        Sign in
                    </h5>
                    <FormInput
                        id={"email"}
                        placeholder={"name@company.com"}
                        label={"Email address"}
                        type={"email"}
                        isDisabled={hookform.formState.isSubmitting}
                        formErrorMessage={
                            hookform.formState.errors.email
                                ? hookform.formState.errors.email.message
                                : null
                        }
                    />
                    <FormInput
                        id={"password"}
                        placeholder={"••••••••"}
                        label={"Password"}
                        type={"password"}
                        isDisabled={hookform.formState.isSubmitting}
                        formErrorMessage={
                            hookform.formState.errors.password
                                ? hookform.formState.errors.password.message
                                : null
                        }
                    />
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/auth/forget"
                            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </Link>
                    </div>

                    <Button
                        type={"submit"}
                        isLoading={hookform.formState.isSubmitting}
                    >
                        Log in
                    </Button>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default SigninForm;
