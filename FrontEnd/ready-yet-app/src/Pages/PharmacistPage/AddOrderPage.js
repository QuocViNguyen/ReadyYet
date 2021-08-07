import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

const columns = [
    // { 
    // field: 'id',
    // headerName: 'ID',
    // width: 90
    // },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    description: 'Patients phone number',
    sortable: true,
    width: 180,
  }
];

//let rows;

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: true,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

const x = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'asda@asdaw.com', phoneNumber: '2042919411' },
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'asda@asdaw.com', phoneNumber: '2042919411' },
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'asda@asdaw.com', phoneNumber: '2042919411' },
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'asda@asdaw.com', phoneNumber: '2042919411' },
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'asda@asdaw.com', phoneNumber: '2042919411' },
];

let rows;

function mapMyOrder(order) {
    const rowItem = {
        lastName: order.patient[0].lastname,
        firstName: order.patient[0].lastname,
        email: order.patient[0].email,
        phoneNumber: order.patient[0].phonenumber
    }
    return rowItem;
}

const getOrders = async () => {
    const result = axios.get('http://localhost:4000/getOrders');
    return result;
}

const getRows = () => {
    if (rows){
        console.log("GET ROWS")
        return rows;
    }else{
        console.log("GET EMPTY LIST")
        return [];
    }
}

export default async function AddOrderPage() {
  const result = await getOrders();
  rows = result.data.map(mapMyOrder);
  console.log(typeof result)


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows()}
        columns={columns}
        pageSize={5}
        checkboxSelection
        // disableSelectionOnClick
      />
    </div>
  );
}
