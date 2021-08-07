import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function mapMyOrder(order) {
    const rowItem = {
        id: order.patient[0]._id,
        lastName: order.patient[0].lastname,
        firstName: order.patient[0].firstname,
        email: order.patient[0].email,
        phoneNumber: order.patient[0].phonenumber
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
          width: 120,
          editable: false,
          sortable: true,
        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          description: 'Patients phone number',
          sortable: true,
          width: 180,
        }
      ];

    useEffect(() => {
        axios.get('http://localhost:4000/getOrders').then(response=>{
            const data = response.data;
            const mapped = data.map(mapMyOrder);
            setRow(mapped);
        })
    })


    return ( 
        <div style={{ height: 400, width: '60%' }}>
        <CircularProgress/>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            // disableSelectionOnClick
          />
        </div>
     );
}
 
export default ViewOrderPage;