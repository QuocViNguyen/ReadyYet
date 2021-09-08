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
          }
    }

    getRequestOrder = (event)=>{
        event.preventDefault();
        console.log("WEW");
    }

    render() { 
        return (
        <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
            <Box className='h-1/6 flex items-center justify-center '>WELCOME</Box>
                    <Box className=' h-1/6 w-4/12 flex items-center justify-center mx-auto'>
                        <Grid container spacing={1} align='center'>
                            <Grid item xs={12} className='space-x-10 md:space-x-60'>
                                <form noValidate autoComplete="off" className='flex flex-col' onSubmit={this.getRequestOrder}>
                                    <Box className="flex flex-col space-y-6 ">
                                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                        <Button type='submit' variant="contained" color="primary">
                                            View Orders asdas
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
        </Box>
        );
    }
}

 
export default LoginSuccessPage;