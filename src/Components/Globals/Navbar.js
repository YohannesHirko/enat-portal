import React from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { Button } from "@mui/material";
import { MdPersonAddAlt1 } from "react-icons/md";

function Navbar() {
    const location = useLocation();
    const pathesToShowButton = ["/applicants", "/", "/reports", "/issues"];
    return (
        <div className="h-full px-2 py-2 lg:px-5">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center justify-start font-semibold text-xl capitalize rtl:justify-end text-gray-900 dark:text-gray-200">
                    <BreadCrumb />
                </div>
                <div className="flex items-center gap-4">
                    {pathesToShowButton.includes(location.pathname) && (
                        <Link
                            className="flex items-center justify-center m-0"
                            to={"/applicants/new/info"}
                        >
                            <Button
                                variant="outlined"
                                color="brand"
                                startIcon={<MdPersonAddAlt1 />}
                            >
                                New Applicant
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
