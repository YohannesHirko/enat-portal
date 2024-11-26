import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useApplicantContext } from "../../Pages/ApplicantForm";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { genericMutation } from "../../Helpers/fetchers";
import { Button } from "@mui/material";

function ApplicantVisaField() {
    const [editingVisa, setEditingVisa] = useState(false);
    const { url, authToken } = useAuthContext();
    const { isEditing, applicant, id } = useApplicantContext();
    const hookform = useForm();
    const { errors } = hookform.formState;
    const navigate = useNavigate();
    useEffect(() => {
        if (isEditing && applicant?.Visa) {
            setEditingVisa(true);
            hookform.reset({
                ...applicant.Visa,
            });
        } else if (!applicant?.Visa) {
            setEditingVisa(false);
            hookform.reset();
        }
    }, [applicant, isEditing]);
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: (data) => {
            navigate(`/applicants`);
            toast.success(
                `Successfully ${editingVisa ? "Edited" : "Added"} visa`
            );
        },
        onError: (error) => {
            toast.error(error?.message);
        },
    });
    const onSubmit = (data) => {
        mutation.mutate({
            baseURL: url,
            token: authToken,
            endpoint: `applicants/${id}/visa`,
            method: editingVisa ? "PATCH" : "POST",
            payload: data,
        });
    };
    return (
        <div className="">
            <FormProvider {...hookform}>
                <form onSubmit={hookform.handleSubmit(onSubmit)} noValidate>
                    <fieldset>
                        <div className="p-4 gap-4 grid md:grid-cols-2 md:gap-4">
                            <FormInput
                                id={"visa_no"}
                                placeholder={""}
                                label={"Visa Number"}
                                formErrorMessage={errors.visa_no?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Visa Number is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"visa_type"}
                                placeholder={""}
                                label={"Visa Type"}
                                formErrorMessage={errors.visa_type?.message}
                            />
                            <FormInput
                                id={"visa_issue_date"}
                                placeholder={""}
                                type={"date"}
                                label={"Visa Issue Date"}
                                formErrorMessage={
                                    errors.visa_issue_date?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Visa issue date is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"sponsor_id"}
                                placeholder={""}
                                label={"Sponsor id"}
                                formErrorMessage={errors.sponsor_id?.message}
                            />
                            <FormInput
                                id={"sponsor_name"}
                                placeholder={""}
                                label={"Sponsor Name"}
                                formErrorMessage={errors.sponsor_name?.message}
                            />
                            <FormInput
                                id={"sponsor_phone"}
                                placeholder={""}
                                label={"Sponsor Phone"}
                                formErrorMessage={errors.sponsor_phone?.message}
                            />
                            <FormInput
                                id={"sponsor_address"}
                                placeholder={""}
                                label={"Sponsor Address"}
                                formErrorMessage={
                                    errors.sponsor_address?.message
                                }
                            />
                        </div>
                    </fieldset>
                    <div className="p-4 gap-4 grid md:grid-cols-2 md:gap-4">
                        <Button
                            type={"submit"}
                            variant="outlined"
                            color="brand"
                            size="large"
                            fullWidth
                            disabled={
                                !hookform.formState.isDirty ||
                                mutation.isPending
                            }
                        >
                            {editingVisa ? "Save" : "Create"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={!applicant?.Visa}
                            onClick={() =>
                                mutation.mutate({
                                    baseURL: url,
                                    token: authToken,
                                    endpoint: `applicants/${id}/visa`,
                                    method: "DELETE",
                                })
                            }
                        >
                            Mark as cancelled
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default ApplicantVisaField;
