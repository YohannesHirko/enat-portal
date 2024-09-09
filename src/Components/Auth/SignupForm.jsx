import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../Form/FormInput";
import { FormProvider, useForm, handleSubmit } from "react-hook-form";
import { useAuthContext } from "../../Contexts/AuthContext";
import Button from "../Button";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

const schema = z
    .object({
        email: string().email(),
        password: z
            .string()
            .min(8)
            .max(50)
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),
        confirmPassword: z.string(),
        firstName: z.string().min(3).max(15),
        lastName: z.string().min(3).max(15),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

function SignupForm() {
    const hookform = useForm({ resolver: zodResolver(schema) });
    const { url, setAuthToken } = useAuthContext();
    const [errorCode, setErrorCode] = useState(null);
    const onSubmit = async (data) => {
        setErrorCode(null);
        const response = await fetch(`${url}/enat/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const apiData = await response.json();
        console.log(apiData);
        if (response.status !== 201) {
            setErrorCode(apiData.errorCode);
            console.log(errorCode);
        }
        setAuthToken(apiData.token);
        localStorage.setItem("jwtToken", apiData.token);
    };
    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <FormProvider {...hookform}>
                <form
                    className="space-y-6"
                    onSubmit={hookform.handleSubmit(onSubmit)}
                >
                    <h5 className="mb-10 text-2xl font-extrabold text-gray-900 dark:text-white">
                        Sign up
                    </h5>

                    <FormInput
                        id={"email"}
                        placeholder={"name@company.com"}
                        label={"Email address"}
                        type={"email"}
                        isDisabled={hookform.formState.isSubmitting}
                        errorCode={
                            ["AUTH007"].includes(errorCode) ? errorCode : null
                        }
                        formErrorMessage={
                            hookform.formState.errors.email
                                ? hookform.formState.errors.email.message
                                : null
                        }
                    />
                    <FormInput
                        id={"password"}
                        placeholder={"••••••••"}
                        type={"password"}
                        isDisabled={hookform.formState.isSubmitting}
                        label={"Password"}
                        formErrorMessage={
                            hookform.formState.errors.password
                                ? hookform.formState.errors.password.message
                                : null
                        }
                    />
                    <FormInput
                        id={"confirmPassword"}
                        placeholder={"••••••••"}
                        type={"password"}
                        isDisabled={hookform.formState.isSubmitting}
                        label={"Confirm Password"}
                        formErrorMessage={
                            hookform.formState.errors.confirmPassword
                                ? hookform.formState.errors.confirmPassword
                                      .message
                                : null
                        }
                    />
                    <div className="gap-4 grid md:grid-cols-2 md:gap-4">
                        <FormInput
                            id={"firstName"}
                            placeholder={""}
                            isDisabled={hookform.formState.isSubmitting}
                            label={"First Name"}
                            formErrorMessage={
                                hookform.formState.errors.firstName
                                    ? hookform.formState.errors.firstName
                                          .message
                                    : null
                            }
                        />
                        <FormInput
                            id={"lastName"}
                            placeholder={""}
                            isDisabled={hookform.formState.isSubmitting}
                            label={"Last Name"}
                            formErrorMessage={
                                hookform.formState.errors.lastName
                                    ? hookform.formState.errors.lastName.message
                                    : null
                            }
                        />
                    </div>
                    <Button
                        type={"submit"}
                        isLoading={hookform.formState.isSubmitting}
                    >
                        Register new account
                    </Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Have an account?{" "}
                        <NavLink
                            to="/auth/signin"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Sign in
                        </NavLink>
                    </div>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default SignupForm;
