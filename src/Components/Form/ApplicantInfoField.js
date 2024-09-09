import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import FormCheckbox from "./FormCheckbox";
import Button from "../Button";
import { DevTool } from "@hookform/devtools";
import { useAuthContext } from "../../Contexts/AuthContext";
import FormSubmittedModal from "../Modals/FormSubmittedModal";
import Modal from "../Modals/Modal";
import { useApplicantContext } from "../../Pages/ApplicantForm";
import { useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const formSchema = z.object({
//     applicant: z.object({
//         firstname: z.string(),
//         lastname: z.string(),
//         agent: z.string(),
//         gender: z.string(),
//         phone_number: z.string(),
//     }),
//     address: z.object({
//         region: z.string(),
//         subcity_zone: z.string(),
//         woreda: z.string(),
//         house_no: z.string(),
//     }),
//     passport: z.object({
//         passport_no: z.string(),
//         place_of_birth: z.string(),
//         place_of_issue: z.string(),
//         date_of_birth: z.string(),
//         date_of_issue: z.string(),
//         date_of_expiry: z.string(),
//     }),
//     relative: z.object({
//         fullname: z.string(),
//         relative_phone: z.string(),
//         kinship: z.string(),
//     }),
//     info: z.object({
//         height: z.string(),
//         weight: z.string(),
//         martial_status: z.string(),
//         no_of_children: z.string(),
//         relegion: z.string(),
//         work_exp: z.string(),
//         english: z.string(),
//         arabic: z.string(),
//         skills: z.object({
//             ironing: z.boolean(),
//             sewing: z.boolean(),
//             baby_sitting: z.boolean(),
//             arabic_cooking: z.boolean(),
//             cleaning: z.boolean(),
//             washing: z.boolean(),
//         }),
//     }),
// });

function ApplicantInfoField() {
    const { isEditing, applicant, setApplicant } = useApplicantContext();
    const { url, authToken } = useAuthContext();
    const hookform = useForm({
        defaultValues: { applicant: null },
    });
    const { errors } = hookform.formState;
    const navigate = useNavigate();

    const onNewSubmit = async (data) => {
        const response = await fetch(`${url}/enat/v1/applicants`, {
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
                "passport.passport_no",
                {
                    type: "custom",
                    message: "Passport number already exists in the database",
                },
                { shouldFocus: true }
            );
            console.log("reached");
        }
        if (response.status === 201) {
            setApplicant({ applicantInfo: apiData });
            console.log(apiData);
            navigate(`/applicants/edit/${apiData.applicant.reference_no}`);
        }
    };
    const onEditSubmit = async (data) => {
        console.log("edititng");
    };
    return (
        <div className="">
            <FormProvider {...hookform}>
                <form
                    onSubmit={hookform.handleSubmit(
                        isEditing ? onEditSubmit : onNewSubmit
                    )}
                    noValidate
                >
                    <fieldset>
                        <div className="p-4 grid md:grid-cols-3 md:gap-4">
                            <FormInput
                                id={"applicant.firstname"}
                                placeholder={"John"}
                                label={"First Name"}
                                formErrorMessage={
                                    errors.applicant?.firstname?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "First name is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.lastname"}
                                placeholder={"Doe"}
                                label={"Last Name"}
                                formErrorMessage={
                                    errors.applicant?.lastname?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Last name is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.agent"}
                                placeholder={""}
                                label={"Agent"}
                                formErrorMessage={
                                    errors.applicant?.agent?.message
                                }
                            />
                            <FormSelect
                                id={"applicant.gender"}
                                label={"Gender"}
                                options={["M", "F"]}
                                formErrorMessage={
                                    errors.applicant?.gender?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Gender is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.phone_number"}
                                placeholder={""}
                                label={"Phone Number"}
                                formErrorMessage={
                                    errors.applicant?.phone_number?.message
                                }
                            />
                            <FormInput
                                id={"address.region"}
                                placeholder={""}
                                label={"Region"}
                                formErrorMessage={
                                    errors.address?.region?.message
                                }
                            />

                            <FormInput
                                id={"address.subcity_zone"}
                                placeholder={""}
                                label={"Subcity Zone"}
                                formErrorMessage={
                                    errors.address?.region?.message
                                }
                            />
                            <FormInput
                                id={"address.woreda"}
                                placeholder={""}
                                label={"Woreda"}
                                formErrorMessage={
                                    errors.address?.region?.message
                                }
                            />
                            <FormInput
                                id={"address.house_no"}
                                placeholder={""}
                                label={"House no"}
                                formErrorMessage={
                                    errors.address?.region?.message
                                }
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                            <legend className="text-gray-800 font-bold dark:text-gray-400">
                                Passport
                            </legend>
                        </div>
                        <div className="p-4 grid md:grid-cols-3 md:gap-4">
                            <FormInput
                                id={"passport.passport_no"}
                                placeholder={""}
                                label={"Passport Number"}
                                formErrorMessage={
                                    errors.passport?.passport_no?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Passport number is required",
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]{2}[0-9]{7}$/,
                                        message: "Passport must be valid",
                                    },
                                }}
                            />
                            <FormInput
                                id={"passport.place_of_birth"}
                                placeholder={""}
                                label={"Place of Birth"}
                                formErrorMessage={
                                    errors.passport?.place_of_birth?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Place of birth is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"passport.place_of_issue"}
                                placeholder={""}
                                label={"Place of Issue"}
                                formErrorMessage={
                                    errors.passport?.place_of_issue?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Place of issue is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"passport.date_of_expiry"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Expiry"}
                                formErrorMessage={
                                    errors.passport?.date_of_expiry?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Date of expiry is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"passport.date_of_birth"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Birth"}
                                formErrorMessage={
                                    errors.passport?.date_of_birth?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Date of birth is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"passport.date_of_issue"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Issue"}
                                formErrorMessage={
                                    errors.passport?.date_of_issue?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Date of issue is required",
                                    },
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                            <legend className="text-gray-800 font-bold dark:text-gray-400">
                                Relatve
                            </legend>
                        </div>
                        <div className="p-4 gap-4 grid md:grid-cols-3 md:gap-4">
                            <FormInput
                                id={"relative.fullname"}
                                placeholder={""}
                                label={"Full name"}
                                formErrorMessage={
                                    errors.relative?.fullname?.message
                                }
                            />
                            <FormInput
                                id={"relative.relative_phone"}
                                placeholder={""}
                                label={"Phone number"}
                                formErrorMessage={
                                    errors.relative?.relative_phone?.message
                                }
                            />
                            <FormInput
                                id={"relative.kinship"}
                                placeholder={""}
                                label={"Kinship"}
                                formErrorMessage={
                                    errors.relative?.kinship?.message
                                }
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800">
                            <legend className="text-gray-800 font-bold dark:text-gray-400">
                                Other Info
                            </legend>
                        </div>
                        <div className="p-4 gap-4 grid md:grid-cols-4 md:gap-4">
                            <FormInput
                                id={"info.height"}
                                placeholder={""}
                                label={"Height"}
                                formErrorMessage={errors.info?.height?.message}
                            />
                            <FormInput
                                id={"info.weight"}
                                placeholder={""}
                                label={"Weight"}
                                formErrorMessage={errors.info?.weight?.message}
                            />
                            <FormSelect
                                id={"info.martial_status"}
                                placeholder={""}
                                label={"Martial Status"}
                                options={[
                                    "Single",
                                    "Married",
                                    "Divorced",
                                    "Widowed",
                                ]}
                                formErrorMessage={
                                    errors.info?.martial_status?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Martial Status is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"info.no_of_children"}
                                placeholder={""}
                                label={"Number of Children"}
                                formErrorMessage={
                                    errors.info?.no_of_children?.message
                                }
                            />
                            <FormInput
                                id={"info.relegion"}
                                placeholder={""}
                                label={"Relegion"}
                                formErrorMessage={
                                    errors.info?.relegion?.message
                                }
                            />
                            <FormInput
                                id={"info.work_exp"}
                                placeholder={""}
                                label={"Work Experiance"}
                                formErrorMessage={
                                    errors.info?.work_exp?.message
                                }
                            />
                            <FormSelect
                                id={"info.english"}
                                label={"English"}
                                options={["Poor", "Fair", "Good", "Proficient"]}
                                formErrorMessage={errors.info?.english?.message}
                            />
                            <FormSelect
                                id={"info.arabic"}
                                label={"Arabic"}
                                options={["Poor", "Fair", "Good", "Proficient"]}
                                formErrorMessage={errors.info?.arabic?.message}
                            />
                            <div className="md:col-span-4 grid md:grid-cols-6">
                                <FormCheckbox
                                    id="info.skills.ironing"
                                    label="Ironing"
                                />
                                <FormCheckbox
                                    id="info.skills.sewing"
                                    label="Sewing"
                                />
                                <FormCheckbox
                                    id="info.skills.baby_sitting"
                                    label="B.Sitting"
                                />
                                <FormCheckbox
                                    id="info.skills.arabic_cooking"
                                    label="A.Cooking"
                                />
                                <FormCheckbox
                                    id="info.skills.cleaning"
                                    label="Cleaning"
                                />
                                <FormCheckbox
                                    id="info.skills.washing"
                                    label="Washing"
                                />
                            </div>
                        </div>
                    </fieldset>
                    <div className="p-4">
                        <Button
                            isDisabled={!hookform.formState.isDirty}
                            type={"submit"}
                            className={""}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default ApplicantInfoField;
