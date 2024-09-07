import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const Dashboard = () => {
  const { currentColor } = useStateContext();

  return (
    <main className="flex-1 p-6">
      {/* Welcome and Overview Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold"><span style={{ color: currentColor}} className='font-bold'>Welcome</span> <span className='font-bold'>back,</span> Mikeale Alemu</h1>
          <p className="text-gray-500">Dashboard Overview</p>
        </div>
      </div>

      {/* Grid layout for charts, statistics, etc */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Payroll Cards */}
        <div className="col-span-1 p-6 bg-white shadow gap-5 pt-5 border-[2px] rounded-[10px] h-[124px]">
          <h2 className="text-2xl font-bold">$3,658K</h2>
          <p className="text-gray-500">High Total Payroll Expenses</p>
        </div>
        <div className="col-span-1 p-6 bg-white shadow gap-5 pt-5 border-[2px] rounded-[10px] h-[124px]">
          <h2 className="text-2xl font-bold">$1,563K</h2>
          <p className="text-gray-500">Low Total Payroll Expenses</p>
        </div>

        {/* Data Graph */}
        <div className="col-span-1 row-span-2 p-6 bg-white shadow md:col-span-2 lg:col-span-1 pt-5 border-[2px] rounded-[10px]">
          <h2 className="text-xl font-bold">Data Graph</h2>
          <div className="h-48 mt-4 bg-gray-100"></div>
        </div>

        {/* Sessions Chart */}
        <div className="col-span-1 row-span-2 p-6 bg-white shadow md:col-span-2 lg:col-span-2 pt-5 border-[2px] rounded-[10px]">
          <h2 className="text-xl font-bold">Sessions</h2>
          <div className="h-32 mt-4 bg-gray-100"></div>
        </div>

        {/* Tasks Pie Chart */}
        <div className="col-span-1 row-span-4 p-6 bg-white shadow pt-5 border-[2px] rounded-[10px]">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="h-48 mt-4 bg-gray-100"></div>
        </div>

        {/* Position List */}
        <div className="col-span-1 row-span-3 p-6 bg-white pt-5 border-[2px] rounded-[10px] shadow md:col-span-2 lg:col-span-2">
          <h2 className="text-xl font-bold">Position</h2>
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4">
            <div>
              <p className="font-bold">Marketing Comms</p>
              <p className="text-blue-500">300</p>
            </div>
            <div>
              <p className="font-bold">Leadership</p>
              <p className="text-blue-500">200</p>
            </div>
            <div>
              <p className="font-bold">Engineering</p>
              <p className="text-blue-500">50</p>
            </div>
            <div>
              <p className="font-bold">Product Management</p>
              <p className="text-blue-500">150</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard