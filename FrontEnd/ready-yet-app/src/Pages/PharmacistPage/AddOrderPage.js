import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

function OnClickSendNewUser() {
  return ""
}

const AddOrderPage = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [pickuptime, setPickUpDate] = useState(new Date());

  return (
    <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
    <Box className='h-1/4 flex items-center justify-center '>ADD NEW ORDER</Box>

    <Box className='h-1/2 w-full flex items-center justify-center flex-col'>
      <form>
        <Box className="flex flex-col space-y-6 ">
            <TextField id="filled-textarea" label="First Name" variant="outlined" value={firstname} onChange = {(event)=>{setFirstName(event.target.value)}}/>
            <TextField id="filled-textarea" label="Last Name" variant="outlined" value={lastname} onChange = {(event)=>{setLastName(event.target.value)}}/>
            <TextField id="filled-textarea" label="Email" variant="outlined" value={email} onChange = {(event)=>{setEmail(event.target.value)}}/>
            <TextField id="filled-textarea" label="Phone Number" variant="outlined" value={phonenumber} onChange = {(event)=>{setPhone(event.target.value)}}/>
            
            
            <TextField
              id="datetime-local"
              label="Pick Up Time"
              type="datetime-local"
              defaultValue= "2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button variant="contained" color="primary" >
                ADD
            </Button>
        </Box>
      </form>
    </Box>
    </Box>
    );
}
 
export default AddOrderPage;