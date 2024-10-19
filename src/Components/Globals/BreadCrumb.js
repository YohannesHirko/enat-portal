import React from "react";
import { ImHome } from "react-icons/im";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function BreadCrumb() {
    const location = useLocation();
    const skips = ["", "edit"];
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <Link to={"/"}>
                    <ImHome className="text-sm font-bold text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white" />
                </Link>

                {location.pathname.split("/").map((pathname) => {
                    if (skips.includes(pathname)) {
                        return;
                    }
                    return (
                        <li key={pathname}>
                            <div
                                className={`flex items-center text-base font-medium text-gray-700  dark:text-gray-400  `}
                            >
                                <MdArrowForwardIos />

                                <p
                                    className={`ms-1  md:ms-2 ${
                                        pathname.includes("EN")
                                            ? "text-blue-600 dark:text-white font-bold"
                                            : ""
                                    }`}
                                >
                                    {pathname}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default BreadCrumb;
