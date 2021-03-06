import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import * as orderUtil from '../../Utils/orderUtil';

const AddOrderPage = () => {
  let history = useHistory();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [pickuptime, setPickUpDate] = useState(new Date());
  const [isfilled, setFill] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() =>{
    CheckEmpty()
  }, [firstname, lastname, email, phonenumber, pickuptime])

  function CheckEmpty(){
    if (firstname && lastname && email && phonenumber){
      let rightnow = new Date();
      if (rightnow >= pickuptime){
        setFill(false)
      }else{
        setFill(true)
      }
    }else{
      setFill(false)
    }
  }

  function AddNewOrder(){
    axios.post('http://localhost:4000/add-order', {
      firstname,
      lastname,
      email,
      phonenumber,
      description,
      pickuptime
    }).then(response=>{
      console.log(response.data);
      if (response.data === "SUCCESS"){
        alert("New order added successfully");
        setTimeout(function (){history.push('/loginsuccess')}, 2000);
      }
    })
  }

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
            <TextField id="filled-textarea" label="Description" variant="outlined" value={description} onChange = {(event)=>{setDescription(event.target.value)}}/>
            <TextField
              id="datetime-local"
              label="Pick Up Time"
              type="datetime-local"
              defaultValue={new Date().toISOString().slice(0, 16)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {(event)=>{setPickUpDate(event.target.value)}}
              inputProps={{
                min: new Date().toISOString().slice(0, 16)
              }}
            />

            <Button variant="contained" id="addbtn" color="primary" disabled={!isfilled} onClick={AddNewOrder}>
                ADD
            </Button>

            <Button variant="contained" id="addbtn" color="primary" onClick={() => {history.push('/loginsuccess');}}>
                BACK
            </Button>
        </Box>
      </form>
    </Box>
    </Box>
    );
}
 
export default AddOrderPage;