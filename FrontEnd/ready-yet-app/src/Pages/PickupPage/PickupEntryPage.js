import React from 'react';
import { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';


class LoginSuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            popup: false,
            popupMessage: ''
          }
    }

    getRequestOrder = (event)=>{
        event.preventDefault();

        if(this.validateEmail(this.state.email)){
            axios.post('http://localhost:4000/getOrdersByEmail',
                {
                    email: this.state.email
                }
              ).then(response=>{
                console.log(response.data);

                // if (response.data === "SUCCESS"){
                //   popSuccessMessage();
                //   setTimeout(function (){window.location.reload()}, 2000);
                // }
              })
        }
    }

    validateEmail = (email) =>{
        var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
        if (email.length == 0){
            this.setState({popup: true, popupMessage: "Empty Email Detected!"});
            return false;
        }
        if (!regex.test(email)){
            this.setState({popup: true, popupMessage: "Invalid Email Detected!"});
            return false;
        }
        return true;
    }

    render() { 
        return (
            <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
                <Box className='h-1/6 flex items-center justify-center'>SEARCH ORDER PAGE</Box>
                        <Box className=' h-1/6 w-2/12 flex items-center justify-center mx-auto'>
                            <Grid container spacing={1} align='center'>
                                <Grid item xs={12} className='space-x-10 md:space-x-60'>
                                    <form noValidate autoComplete="off" className='flex flex-col' onSubmit={this.getRequestOrder}>
                                        <Box className="flex flex-col space-y-6 ">
                                            <TextField id="outlined-basic" label="Email" variant="outlined" onChange = {(event)=>{
                                    this.setState({email : event.target.value});}}/>
                                            <Button type='submit' variant="contained" color="primary" >
                                                Search Orders
                                            </Button>
                                        </Box>
                                    </form>

                                </Grid>
                            </Grid>
                        </Box>
                <Box className=' h-1/6 w-full flex items-center justify-center'>
                    <Button variant="contained" color="primary" onClick={() => {
                                this.props.history.push('/');
                            }}>
                                BACK
                    </Button>
                </Box>
                <Box className=' h-4/6 w-full flex items-center justify-center'>
                    <Collapse in={this.state.popup}>
                        <Alert severity="error" onClose={() => {this.setState({popup:false})}}>{this.state.popupMessage}</Alert>
                    </Collapse>
                </Box>

            </Box>
        );
    }
}

 
export default LoginSuccessPage;