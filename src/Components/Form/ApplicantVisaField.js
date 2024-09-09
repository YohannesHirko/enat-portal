import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "../Button";

function ApplicantVisaField() {
    const hookform = useForm();
    const { errors } = hookform.formState;
    const onSubmit = (data) => {
        console.log(data);
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
                                id={"country"}
                                placeholder={""}
                                label={"Country"}
                                formErrorMessage={errors.country?.message}
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Country date is required",
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

export default ApplicantVisaField;
