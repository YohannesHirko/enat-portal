import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../Button";
import { DevTool } from "@hookform/devtools";
import { useAuthContext } from "../../Contexts/AuthContext";

function ApplicantTicketField() {
    const { url, authToken } = useAuthContext();
    const hookform = useForm();
    const { errors } = hookform.formState;

    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch(`${url}/enat/v1/visa`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const apiData = await response.json();
        if (response.status === 409) {
            hookform.setError(
                "visa_no",
                {
                    type: "custom",
                    message: "visa number already exists in the database",
                },
                { shouldFocus: true }
            );
            console.log("reached");
        }
        if (response.status !== 200) {
            const apiData = await response.json();
            console.log(apiData);
        }

        console.log(apiData);
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
                            />
                            <FormInput
                                id={"amount"}
                                placeholder={""}
                                label={"Amount"}
                                formErrorMessage={errors.amount?.message}
                            />
                            <FormInput
                                id={"depart_date"}
                                type={"date"}
                                placeholder={""}
                                label={"Depart Date"}
                                formErrorMessage={errors.depart_date?.message}
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
                            />
                            <FormInput
                                id={"arrival_city"}
                                placeholder={""}
                                label={"Arrival City"}
                                formErrorMessage={errors.arrival_city?.message}
                            />
                        </div>
                    </fieldset>
                    <div className="p-4">
                        <Button type={"submit"} className={""}>
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default ApplicantTicketField;
