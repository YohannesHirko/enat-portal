import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import FormInput from "../Form/FormInput";
import { FormProvider, useForm, handleSubmit } from "react-hook-form";
import { useAuthContext } from "../../Contexts/AuthContext";
import Button from "../Globals/Button";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "../../Helpers/errorHandler";
import { toast } from "sonner";
import { genericMutation } from "../../Helpers/fetchers";

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
    const { url, authToken } = useAuthContext();
    const mutation = useMutation({ mutationFn: genericMutation });
    const onSubmit = async (data) => {
        mutation.mutate({
            baseURL: url,
            token: authToken,
            endpoint: `user/createuser`,
            method: "POST",
            payload: data,
        });
    };
    const hookform = useForm({ resolver: zodResolver(schema) });
    if (mutation.isError) {
        toast.error(mutation.error?.message);
    }
    if (mutation.isSuccess) {
        toast.success("Successfully registered a new useer!");
        return <Navigate to="/settings/employees"></Navigate>;
    }

    return (
        <div className="bg-white rounded-lg dark:bg-gray-800 w-2/3 min-w-96">
            <FormProvider {...hookform}>
                <form
                    className="space-y-6"
                    onSubmit={hookform.handleSubmit(onSubmit)}
                >
                    <h5 className="mb-10 text-2xl font-extrabold text-gray-900 dark:text-white">
                        Register new user
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
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default SignupForm;
