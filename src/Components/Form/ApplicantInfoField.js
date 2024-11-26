import React, { useEffect } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import FormCheckbox from "./FormCheckbox";
import { DevTool } from "@hookform/devtools";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useApplicantContext } from "../../Pages/ApplicantForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateDOB } from "../../Helpers/utils";
import { genericMutation } from "../../Helpers/fetchers";
import { Button } from "@mui/material";
function ApplicantInfoField() {
    const { isEditing, applicant, id } = useApplicantContext();
    const { url, authToken } = useAuthContext();
    const hookform = useForm();
    const { errors } = hookform.formState;
    const navigate = useNavigate();
    useEffect(() => {
        hookform.reset();
        if (isEditing) {
            hookform.reset({
                applicant: {
                    reference_no: applicant?.reference_no,
                    application_no: applicant?.application_no,
                    fullname: applicant?.fullname,
                    gender: applicant?.gender,
                    phone_number: applicant?.phone_number,
                    agent: applicant?.agent,
                    medical_place: applicant?.medical_place,
                    labour_id: applicant?.labour_id,
                    mols: applicant?.mols,
                    address: applicant?.Address,
                    passport: applicant?.Passport,
                    relative: applicant?.Relative,
                    info: applicant?.Info,
                },
            });
        }
    }, [applicant]);
    const mutation = useMutation({
        mutationFn: genericMutation,
        onSuccess: (data) => {
            navigate(`/applicants`);
            toast.success(`Successfully ${isEditing ? "Edited" : "Added"}`);
        },
        onError: (error) => {
            if (error.statusCode === 409) {
                hookform.setError(
                    "applicant.passport.passport_no",
                    {
                        type: "custom",
                        message:
                            "Passport number already exists in the database",
                    },
                    { shouldFocus: true }
                );
            } else {
                toast.error(error?.message);
            }
        },
    });
    const onSubmit = (data) => {
        mutation.mutate({
            baseURL: url,
            token: authToken,
            endpoint: isEditing ? `applicants/${id}` : "applicants",
            method: isEditing ? "PATCH" : "POST",
            payload: data,
        });
    };
    return (
        <div className="">
            <FormProvider {...hookform}>
                <form onSubmit={hookform.handleSubmit(onSubmit)} noValidate>
                    <fieldset>
                        <div className="p-4 grid md:grid-cols-3 md:gap-4">
                            <div className="md:col-span-2">
                                <FormInput
                                    id={"applicant.fullname"}
                                    placeholder={"John"}
                                    label={"Full name"}
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
                            </div>

                            {isEditing &&
                                applicant?.Statuses.find(
                                    (status) => status.status === "SELECTED"
                                ) && (
                                    <FormSelect
                                        placeholder={"Change MoLS status"}
                                        id={"applicant.mols"}
                                        label={"MoLS"}
                                        options={["SUBMITTED", "APPROVED"]}
                                        formErrorMessage={
                                            errors.applicant?.gender?.message
                                        }
                                    />
                                )}
                            <FormSelect
                                id={"applicant.agent"}
                                placeholder={"Select an agent"}
                                label={"Agent"}
                                defaultValue={"NOT SENT"}
                                isDisabled={applicant?.Visa}
                                options={[
                                    "NOT SENT",
                                    "ANAM SHAKR RESOURCES COMPANY",
                                    "IBRAHEM ABDULLAH ALMAJED RECRUITMENT OFFICE",
                                    "RAED ALMUSHARRAF RECRUITMENT",
                                    "SMART GLOBAL DOMESTIC WORKERS SERVICE CENTER LLC",
                                    "DANA AL-TAWASH DOMESTIC WORKERS SERVICES CENTER",
                                    "ALREAYA FOR DOMESTIC WORKERS SERVICES",
                                    "ZANAH CENTER FOR MANPOWER RECRUITMENT",
                                ]}
                                formErrorMessage={
                                    errors.applicant?.agent?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Agent is required",
                                    },
                                    validate: (v) =>
                                        v === "NONE"
                                            ? "Agent is required"
                                            : true,
                                }}
                            />
                            <FormSelect
                                id={"applicant.gender"}
                                label={"Gender"}
                                options={["M", "F"]}
                                formErrorMessage={
                                    errors.applicant?.gender?.message
                                }
                                formOptions={{
                                    validate: (v) =>
                                        v === "NONE"
                                            ? "Gender is required"
                                            : true,
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
                                id={"applicant.labour_id"}
                                placeholder={""}
                                label={"Labour id"}
                                formErrorMessage={
                                    errors.applicant?.labour_id?.message
                                }
                            />

                            <FormInput
                                id={"applicant.address.region"}
                                placeholder={""}
                                label={"Region"}
                                formErrorMessage={
                                    errors.applicant?.address?.region?.message
                                }
                            />

                            <FormInput
                                id={"applicant.address.subcity_zone"}
                                placeholder={""}
                                label={"Subcity Zone"}
                                formErrorMessage={
                                    errors.applicant?.address?.region?.message
                                }
                            />
                            <FormInput
                                id={"applicant.address.woreda"}
                                placeholder={""}
                                label={"Woreda"}
                                formErrorMessage={
                                    errors.applicant?.address?.region?.message
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
                                id={"applicant.passport.passport_no"}
                                placeholder={""}
                                label={"Passport Number"}
                                formErrorMessage={
                                    errors.applicant?.passport?.passport_no
                                        ?.message
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
                                id={"applicant.passport.place_of_birth"}
                                placeholder={""}
                                label={"Place of Birth"}
                                formErrorMessage={
                                    errors.applicant?.passport?.place_of_birth
                                        ?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Place of birth is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.passport.place_of_issue"}
                                placeholder={""}
                                label={"Place of Issue"}
                                formErrorMessage={
                                    errors.applicant?.passport?.place_of_issue
                                        ?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Place of issue is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.passport.date_of_expiry"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Expiry"}
                                formErrorMessage={
                                    errors.applicant?.passport?.date_of_expiry
                                        ?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Date of expiry is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.passport.date_of_birth"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Birth"}
                                formErrorMessage={
                                    errors.applicant?.passport?.date_of_birth
                                        ?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Date of birth is required",
                                    },
                                    validate: validateDOB,
                                }}
                            />
                            <FormInput
                                id={"applicant.passport.date_of_issue"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Issue"}
                                formErrorMessage={
                                    errors.applicant?.passport?.date_of_issue
                                        ?.message
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
                                id={"applicant.relative.fullname"}
                                placeholder={""}
                                label={"Full name"}
                                formErrorMessage={
                                    errors.applicant?.relative?.fullname
                                        ?.message
                                }
                            />
                            <FormInput
                                id={"applicant.relative.relative_phone"}
                                placeholder={""}
                                label={"Phone number"}
                                formErrorMessage={
                                    errors.applicant?.relative?.relative_phone
                                        ?.message
                                }
                            />
                            <FormInput
                                id={"applicant.relative.kinship"}
                                placeholder={""}
                                label={"Kinship"}
                                formErrorMessage={
                                    errors.applicant?.relative?.kinship?.message
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
                                id={"applicant.info.height"}
                                placeholder={""}
                                label={"Height"}
                                formErrorMessage={
                                    errors.applicant?.info?.height?.message
                                }
                            />
                            <FormInput
                                id={"applicant.info.weight"}
                                placeholder={""}
                                label={"Weight"}
                                formErrorMessage={
                                    errors.applicant?.info?.weight?.message
                                }
                            />
                            <FormSelect
                                id={"applicant.info.martial_status"}
                                placeholder={""}
                                label={"Martial Status"}
                                options={[
                                    "Single",
                                    "Married",
                                    "Divorced",
                                    "Widowed",
                                ]}
                                formErrorMessage={
                                    errors.applicant?.info?.martial_status
                                        ?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Martial Status is required",
                                    },
                                }}
                            />
                            <FormInput
                                id={"applicant.info.no_of_children"}
                                placeholder={""}
                                label={"Number of Children"}
                                type={"number"}
                                formErrorMessage={
                                    errors.applicant?.info?.no_of_children
                                        ?.message
                                }
                            />
                            <FormInput
                                id={"applicant.info.worked_at"}
                                placeholder={""}
                                label={"Worked at"}
                                formErrorMessage={
                                    errors.applicant?.info?.worked_at?.message
                                }
                            />
                            <FormInput
                                id={"applicant.info.work_exp"}
                                placeholder={""}
                                type={"number"}
                                label={"Work Experiance"}
                                formErrorMessage={
                                    errors.applicant?.info?.work_exp?.message
                                }
                                formOptions={{
                                    required: {
                                        value: true,
                                        message: "Experiance is required",
                                    },
                                    min: 0,
                                    max: 40,
                                }}
                            />
                            <FormSelect
                                id={"applicant.info.relegion"}
                                label={"Relegion"}
                                options={[
                                    "Muslim",
                                    "Christian",
                                    "Orthodox",
                                    "Catholic",
                                    "Protestant",
                                    "Non-Muslim",
                                ]}
                                formErrorMessage={
                                    errors.applicant?.info?.relegion?.message
                                }
                            />
                            <FormSelect
                                id={"applicant.info.english"}
                                label={"English"}
                                options={["Poor", "Fair", "Good", "Proficient"]}
                                formErrorMessage={
                                    errors.applicant?.info?.english?.message
                                }
                            />
                            <FormSelect
                                id={"applicant.info.arabic"}
                                label={"Arabic"}
                                options={["Poor", "Fair", "Good", "Proficient"]}
                                formErrorMessage={
                                    errors.applicant?.info?.arabic?.message
                                }
                            />
                            <div className="md:col-span-4 grid md:grid-cols-6">
                                <FormCheckbox
                                    id="applicant.info.skills.ironing"
                                    label="Ironing"
                                />
                                <FormCheckbox
                                    id="applicant.info.skills.sewing"
                                    label="Sewing"
                                />
                                <FormCheckbox
                                    id="applicant.info.skills.baby_sitting"
                                    label="B.Sitting"
                                />
                                <FormCheckbox
                                    id="applicant.info.skills.arabic_cooking"
                                    label="A.Cooking"
                                />
                                <FormCheckbox
                                    id="applicant.info.skills.cleaning"
                                    label="Cleaning"
                                />
                                <FormCheckbox
                                    id="applicant.info.skills.washing"
                                    label="Washing"
                                />
                            </div>
                        </div>
                    </fieldset>
                    <div className="p-4 w-1/2 lg:w-1/3">
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
                            {isEditing ? "Save" : "Create"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DevTool control={hookform.control} />
        </div>
    );
}

export default ApplicantInfoField;
