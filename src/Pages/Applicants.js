import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components";

function Applicants() {
    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Link to={"/applicants/new"}>
                <Button>New Applicant</Button>
            </Link>
        </div>
    );
}

export default Applicants;
