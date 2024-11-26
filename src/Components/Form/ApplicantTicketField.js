import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useApplicantContext } from "../../Pages/ApplicantForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { genericMutation } from "../../Helpers/fetchers";
import { Button } from "@mui/material";

function ApplicantTicketField() {
    const [editingTicket, setEditingTicket] = useState();
    const { isEditing, applicant, id } = useApplicantContext();
    const { url, authToken } = useAuthContext();
    const hookform = useForm();
    const navigate = useNavigate();
    const { errors } = hookform.formState;

    useEffect(() => {
        if (isEditing && applicant?.Ticket) {
            setEditingTicket(true);
            hookform.reset({
                ...applicant.Ticket,
            });
        } else if (!applicant?.Ticket) {
            setEditingTicket(false);
            hookform.reset();
        }
    }, [applicant, isEditing]);
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: (data) => {
            navigate(`/applicants`);
            toast.success(
                `Successfully ${editingTicket ? "Edited" : "Added"} ticket`
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
            endpoint: editingTicket
                ? `applicants/${id}/ticket/${applicant.Ticket.ticket_id}`
                : `applicants/${id}/ticket`,
            method: editingTicket ? "PATCH" : "POST",
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
                                id={"ticket_no"}
                                placeholder={""}
                                label={"Ticket Number"}
                                formErrorMessage={errors.ticket_no?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Ticket Number is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"ticket_agent"}
                                placeholder={""}
                                label={"Ticket Agent"}
                                formErrorMessage={errors.ticket_agent?.message}
                            />
                            <FormInput
                                id={"payment_date"}
                                type={"date"}
                                placeholder={""}
                                label={"Payment Date"}
                                formErrorMessage={errors.payment_day?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Payment date is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"amount"}
                                placeholder={""}
                                label={"Amount"}
                                type={"number"}
                                formErrorMessage={errors.amount?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Amount date is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"depart_date"}
                                type={"date"}
                                placeholder={""}
                                label={"Depart Date"}
                                formErrorMessage={errors.depart_date?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Depart date is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"depart_city"}
                                placeholder={""}
                                label={"Depart City"}
                                formErrorMessage={errors.depart_city?.message}
                            />
                            <FormInput
                                id={"arrival_date"}
                                type={"date"}
                                placeholder={""}
                                label={"Arrival Date"}
                                formErrorMessage={errors.arrival_date?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Arrival date is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"arrival_city"}
                                placeholder={""}
                                label={"Arrival City"}
                                formErrorMessage={errors.arrival_city?.message}
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
                            {editingTicket ? "Save" : "Create"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={!applicant?.Ticket}
                            onClick={() =>
                                mutation.mutate({
                                    baseURL: url,
                                    token: authToken,
                                    endpoint: `applicants/${id}/ticket/${applicant.Ticket.ticket_id}`,
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

export default ApplicantTicketField;
