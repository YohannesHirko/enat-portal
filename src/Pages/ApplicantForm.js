import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormCheckbox, FormInput, FormSelect } from "../Components";
import { DevTool } from "@hookform/devtools";

function ApplicantForm() {
    const hookForm = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className=" mt-14">
            <FormProvider {...hookForm}>
                <form onSubmit={hookForm.handleSubmit(onSubmit)}>
                    <fieldset className=" border  border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                        <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                            <legend className="text-gray-800 font-bold dark:text-gray-400">
                                Applicant
                            </legend>
                        </div>
                        <div className="p-4 grid md:grid-cols-4 md:gap-4">
                            <FormInput
                                id={"first_name"}
                                placeholder={"John"}
                                label={"First Name"}
                            />
                            <FormInput
                                id={"last_name"}
                                placeholder={"Doe"}
                                label={"Last Name"}
                            />
                            <FormInput
                                id={"gender"}
                                placeholder={""}
                                label={"Gender"}
                            />
                            <FormInput
                                id={"phone_number"}
                                placeholder={""}
                                label={"Phone Number"}
                            />
                            <FormInput
                                id={"region"}
                                placeholder={""}
                                label={"Region"}
                            />

                            <FormInput
                                id={"subcity_zone"}
                                placeholder={""}
                                label={"Subcity Zone"}
                            />
                            <FormInput
                                id={"city"}
                                placeholder={""}
                                label={"City"}
                            />
                            <FormInput
                                id={"subcity_zone"}
                                placeholder={""}
                                label={"Woreda"}
                            />
                        </div>
                    </fieldset>
                    <fieldset className=" border  border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                        <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                            <legend className="text-gray-800 font-bold dark:text-gray-400">
                                Passport
                            </legend>
                        </div>
                        <div className="p-4 grid md:grid-cols-3 md:gap-4">
                            <FormInput
                                id={"passport_no"}
                                placeholder={""}
                                label={"Passport Number"}
                            />
                            <FormInput
                                id={"place_of_birth"}
                                placeholder={""}
                                label={"Place of Birth"}
                            />
                            <FormInput
                                id={"place_of_issue"}
                                placeholder={""}
                                label={"Place of Issue"}
                            />
                            <FormInput
                                id={"date_of_birth"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Birth"}
                            />
                            <FormInput
                                id={"date_of_issue"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Issue"}
                            />
                            <FormInput
                                id={"date_of_expiry"}
                                type={"date"}
                                placeholder={""}
                                label={"Date of Expiry"}
                            />
                        </div>
                    </fieldset>
                    <div className="grid md:grid-cols-2 md:gap-2">
                        <fieldset className=" border  border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                            <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                                <legend className="text-gray-800 font-bold dark:text-gray-400">
                                    Visa
                                </legend>
                            </div>
                            <div className="p-4 gap-4 grid md:grid-cols-2 md:gap-4">
                                <div className="col-span-2">
                                    <FormInput
                                        id={"agent"}
                                        placeholder={""}
                                        label={"Agent"}
                                    />
                                </div>
                                <FormInput
                                    id={"visa_no"}
                                    placeholder={""}
                                    label={"Visa Number"}
                                />
                                <FormInput
                                    id={"visa_type"}
                                    placeholder={""}
                                    label={"Visa Type"}
                                />
                                <FormInput
                                    id={"visa_issue_date"}
                                    placeholder={""}
                                    type={"date"}
                                    label={"Visa Issue Date"}
                                />
                                <FormInput
                                    id={"country"}
                                    placeholder={""}
                                    label={"Country"}
                                />
                                <FormInput
                                    id={"sponsor_id"}
                                    placeholder={""}
                                    label={"Sponsor id"}
                                />
                                <FormInput
                                    id={"sponsor_name"}
                                    placeholder={""}
                                    label={"Sponsor Name"}
                                />
                                <FormInput
                                    id={"sponsor_phone"}
                                    placeholder={""}
                                    label={"Sponsor Phone"}
                                />
                                <FormInput
                                    id={"sponsor_address"}
                                    placeholder={""}
                                    label={"Sponsor Address"}
                                />
                            </div>
                        </fieldset>
                        <fieldset className=" border  border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                            <div className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                                <legend className="text-gray-800 font-bold dark:text-gray-400">
                                    Other Info
                                </legend>
                            </div>
                            <div className="p-4 gap-4 grid md:grid-cols-2 md:gap-4">
                                <FormInput
                                    id={"height"}
                                    placeholder={""}
                                    label={"Height"}
                                />
                                <FormInput
                                    id={"weight"}
                                    placeholder={""}
                                    label={"Weight"}
                                />
                                <FormInput
                                    id={"martial_status"}
                                    placeholder={""}
                                    label={"Martial Status"}
                                />
                                <FormInput
                                    id={"no_of_children"}
                                    placeholder={""}
                                    label={"Number of Children"}
                                />
                                <FormInput
                                    id={"qualification"}
                                    placeholder={""}
                                    label={"Qualification"}
                                />
                                <FormInput
                                    id={"ocupation"}
                                    placeholder={""}
                                    label={"Occupation"}
                                />
                                <FormInput
                                    id={"relegion"}
                                    placeholder={""}
                                    label={"Relegion"}
                                />
                                <FormInput
                                    id={"work_exp"}
                                    placeholder={""}
                                    label={"Work Experiance"}
                                />
                                <FormSelect
                                    id={"english"}
                                    label={"English"}
                                    options={[
                                        "Poor",
                                        "Fair",
                                        "Good",
                                        "Proficient",
                                    ]}
                                />
                                <FormSelect
                                    id={"arabic"}
                                    label={"Arabic"}
                                    options={[
                                        "Poor",
                                        "Fair",
                                        "Good",
                                        "Proficient",
                                    ]}
                                />
                                <div className="col-span-2">
                                    <FormCheckbox
                                        id="ironing"
                                        label="Ironing"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <Button type={"submit"} className={"ml-auto"}>
                        Submit
                    </Button>
                </form>
            </FormProvider>
            <DevTool control={hookForm.control} />
        </div>
    );
}

export default ApplicantForm;
