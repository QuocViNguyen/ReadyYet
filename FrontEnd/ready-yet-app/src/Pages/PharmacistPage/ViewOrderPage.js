import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import LoginSuccessPage from './LoginSuccessPage';
import { useHistory } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
        pickUpTime: parseTime
    }
    return rowItem;
}

function isExpire(time) {
  const now = new Date();
  if (time < now){
    return true;
  }
  return false;
}



function ViewOrderPage() {
    let history = useHistory();

    const [open, setOpen] = useState(false);
    const [selectOrders, setSelectOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rows, setRow] = useState([]);
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
          field: 'pickUpTime',
          headerName: 'Pick Up Time',
          description: 'Estimate pick up time',
          type: 'string',
          sortable: true,
          width: 340,
          valueFormatter: (params) => {
            return formatDate(params.value);
          },
        },
      ];

    useEffect(() => {
        axios.get('http://localhost:4000/getOrders').then(response=>{
            const data = response.data;
            const mapped = data.map(mapMyOrder);
            setRow(mapped);
        })
    }, []);

    const popSuccessMessage = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      // if (reason === 'clickaway') {
      //   return;
      // }
      setOpen(false);
    };


    const deletedSelectedOrders = (selectedOrders) =>{
      // const bodyFormData = new FormData();
      // console.log(JSON.stringify(selectedOrders));
      // bodyFormData.append('selectedOrders', JSON.stringify(selectedOrders));
      axios.post('http://localhost:4000/deleteSelectedOrders', {
        selectedOrders: JSON.stringify(selectedOrders)
      }).then(response=>{
        console.log(response.data);
        if (response.data === "SUCCESS"){
          popSuccessMessage();
          setTimeout(function (){window.location.reload()}, 2000);
        }
      })
    };

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
              getCellClassName={(params) => {
                if (params.field === 'pickUpTime'){
                  return isExpire(params.value) ? 'bg-red-400' : 'bg-green-300';
                }
              }}
              onCellClick={(params) =>{
                // console.log( params)
              }}
              onSelectionModelChange={(e) => {
                setSelectOrders(e);
              }}
            />
        </Box>
      </Box>
      <Box className='mt-8 h-4/6 md:h-1/6 flex flex-col items-center justify-center space-y-4'>
        <Button variant="contained" color="secondary" onClick={() => {deletedSelectedOrders(selectOrders);}}>
          DELETE SELECTED ORDERS
        </Button>
        <Button variant="contained" color="primary" onClick={() => {history.push('/loginsuccess');}}>
          BACK
        </Button>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Delete order successful!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
    );
}

// function deletedSelectedOrders(selectedOrders){
//   const bodyFormData = new FormData();

//   bodyFormData.append('selectedOrders', JSON.stringify(selectedOrders));

//   axios.post('http://localhost:4000/deleteSelectedOrders', bodyFormData).then(response=>{
//     console.log(response.data);
//     if (response.data == "SUCCESS"){
//       popSuccessMessage();
//     }
//   })
// }
 
export default ViewOrderPage;