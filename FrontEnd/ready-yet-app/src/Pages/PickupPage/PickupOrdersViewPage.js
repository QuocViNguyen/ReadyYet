import * as React from 'react';
import { Box, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 170,
      editable: false,
      sortable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 170,
      editable: false,
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 330,
      editable: false,
      sortable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      description: 'Patients phone number',
      sortable: true,
      width: 207,
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'Order\'s Description',
      sortable: true,
      width: 207,
    },
    {
      field: 'pickUpTime',
      headerName: 'Pick Up Time',
      description: 'Estimate pick up time',
      type: 'string',
      sortable: true,
      width: 300,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
  ];

function isExpire(time) {
const now = new Date();
if (time < now){
    return true;
}
return false;
}

function formatDate(parseTime) {
const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
    }
}
let themonth = parseTime.toLocaleString('default', { month: 'short' });
let thedate = parseTime.getDate() + nth(parseTime.getDate());
let theyear = parseTime.getFullYear();
let thetime = `${parseTime.getHours()}:${parseTime.getMinutes()}`
let result = `${themonth} ${thedate} ${theyear} at ${thetime}`

if (isExpire(parseTime)){
    result += ' (pass due)';
}
return result;
}

function mapMyOrder(order) {
    const parseTime = new Date(order.pickuptime)
    const rowItem = {
        // id: order.patient[0]._id,
        id: order._id,
        lastName: order.patient[0].lastname,
        firstName: order.patient[0].firstname,
        email: order.patient[0].email,
        phoneNumber: order.patient[0].phonenumber,
        description: order.patient[0].description,
        pickUpTime: parseTime
    }
    return rowItem;
}

function PickupOrdersViewPage(props) {
    // console.log(props.location.state[0]);
    const [rows, setRow] = useState([]);
    const history = useHistory();
    useEffect(() => {
        setRow(props.location.state[0].map(mapMyOrder));
    }, []);

    return (
        <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
            <Box className='h-3/6 md:h-2/6 flex items-center justify-center'>
                <Box className='w-10/12'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    // checkboxSelection
                    autoHeight={true}
                    getCellClassName={(params) => {
                        if (params.field === 'pickUpTime'){
                        return isExpire(params.value) ? 'bg-red-400' : 'bg-green-300';
                        }
                    }}
                    />
                </Box>
            </Box>
            <Box className='mt-8 h-4/6 md:h-1/6 flex flex-col items-center justify-center space-y-4'>
              <Button variant="contained" color="primary" onClick={() => {history.push('/PickupEntryPage');}}>
                BACK
              </Button>
            </Box>
        </Box>
      );
}

export default PickupOrdersViewPage;