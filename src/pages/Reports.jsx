import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Reports = () => {
    const { currentColor } = useStateContext();

  return (
    <div className="m-2 mt-24 bg-white border-2 border-gray-200 md:m-10 md:p-10 rounded-3xl dark:border-gray-700">
      <Header category="Dashboard" title="Reports" />
    
    </div>
  );
};

export default Reports;
