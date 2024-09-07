import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockDataContacts } from '../data/dummy';
import { Header } from '../components';
import { lightBlue } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Contacts = () => {
  const { currentColor } = useStateContext();
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      flex: 1,
    },
  ];

  return (
    <div className="m-2 mt-24 bg-white border-2 border-gray-200 md:m-10 md:p-10 rounded-3xl dark:border-gray-700">
      <Header category="Page" title="Customers" />
      {/* <Link to={"/applicants/new"} className='flex items-end justify-end'> */}
      <div className='flex items-end justify-end'>
        <Button color="white" bgColor={currentColor} text="New Customers" borderRadius="10px" />
      </div>
      {/* </Link> */}
      <Box m="20px">
      {/* <Header category="Page" title="Customers" /> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: currentColor, // Use a shade for better visibility
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: currentColor, // Use a lighter shade for the header
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: lightBlue[50], // Use a very light shade for the background
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: currentColor,
          },
          '& .MuiCheckbox-root': {
            color: `${currentColor} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${currentColor} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
    </div>
  );
};

export default Contacts;
