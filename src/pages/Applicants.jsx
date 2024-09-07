import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from '../components';

function Applicants() {
  const { currentColor } = useStateContext();
  return (
    <div className="m-2 mt-24 bg-white border-2 border-gray-200 md:m-10 md:p-10 rounded-3xl dark:border-gray-700">
      <Header category="Page" title="Applicants" />
      <Link to={"/applicants/new"} className='flex items-end justify-end'>
        <Button color="white" bgColor={currentColor} text="New Applicant" borderRadius="10px" />
      </Link>
    </div>
  );
}

export default Applicants;
