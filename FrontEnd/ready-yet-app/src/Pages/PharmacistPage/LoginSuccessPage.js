import React from 'react';
import { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';


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
            <Box className='h-1/4 flex items-center justify-center '>WELCOME</Box>
                    <Box className=' h-3/4 w-full flex items-center justify-center'>
                    <Grid container spacing={1} align='center'>
                        <Grid item xs={12} className='space-x-10 md:space-x-60'>
                            <Button variant="contained" color="primary" onClick={() => {
                                this.props.history.push('/ViewOrderPage');
                            }}>
                                View Orders
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => {
                                this.props.history.push('/AddOrderPage');
                            }}>
                                Add New Order
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
        </Box>
        );
    }
}

 
export default LoginSuccessPage;