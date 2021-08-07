import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';

function formatDate(isoTime) {
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  const parseTime = new Date(isoTime)
  let themonth = parseTime.toLocaleString('default', { month: 'short' });
  let thedate = parseTime.getDate()  + nth(parseTime.getDate());
  let theyear = parseTime.getFullYear();
  let thetime = `${parseTime.getHours()}:${parseTime.getMinutes()}`
  let result = `${themonth} ${thedate} ${theyear} at ${thetime}`
  return result;
}

function mapMyOrder(order) {
    const time = formatDate(order.pickuptime)
    
    const rowItem = {
        id: order.patient[0]._id,
        lastName: order.patient[0].lastname,
        firstName: order.patient[0].firstname,
        email: order.patient[0].email,
        phoneNumber: order.patient[0].phonenumber,
        pickUpTime: time
    }
      
    return rowItem;
}

function ViewOrderPage() {
    const [loading, setLoading] = useState(true);
    const [rows, setRow] = useState([]);
    const columns = [
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: false,
          sortable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: false,
          sortable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'string',
          width: 260,
          editable: false,
          sortable: true,
        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          description: 'Patients phone number',
          sortable: true,
          width: 180,
        },
        {
          field: 'pickUpTime',
          headerName: 'Pick Up Time',
          description: 'Estimate pick up time',
          type: 'string',
          sortable: true,
          width: 200,
        }
      ];

    useEffect(() => {
        axios.get('http://localhost:4000/getOrders').then(response=>{
            const data = response.data;
            const mapped = data.map(mapMyOrder);
            setRow(mapped);
            console.log(rows);
        })
    }, [])

    return (
    <Box className='h-screen w-screen overflow-x-hidden overflow-y-scroll'>
        <Box className='h-1/6 md:h-1/6 flex items-center justify-center'>ORDERS</Box>
        <Box className='h-3/6 md:h-2/6 flex items-center justify-center'>
        
          <Box className='w-8/12'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
                autoHeight={true}
              />
          </Box>
        </Box>
    </Box>
     );
}
 
export default ViewOrderPage;