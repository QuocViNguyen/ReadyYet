import React from 'react';
import { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';


class LoginSuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
          }
    }

    render() { 
        return (
        <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
            <Box className='h-1/2 w-full flex items-center justify-center flex-col'>
                <Box className='text-3xl pb-10 font-semibold'>NAME</Box>
                <form>
                    <Box className="flex flex-col space-y-6 ">
                        <TextField id="outlined-basic" label="Add New Order" variant="outlined" value={this.state.email} onChange = {(event)=>{
                            this.setState({email : event.target.value});}}/>
                        <TextField id="outlined-basic" label="Order List" variant="outlined" type='password' value={this.state.password} onChange = {(event)=>{
                            this.setState({password : event.target.value});}}/>
                        <Button variant="contained" color="primary" onClick={this.handleClick}>
                            Log In
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
        );
    }
}

 
export default LoginSuccessPage;