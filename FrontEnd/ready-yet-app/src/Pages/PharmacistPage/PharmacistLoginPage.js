import React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

class PharmacistLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          }
    }

    handleClick = (e) => {
        this.props.history.push("/");
    };
    
    render() { 
        return (
            <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
                <Box className='h-1/2 w-full flex items-center justify-center flex-col'>
                    <Box className='text-3xl pb-10 font-semibold'>LOG IN</Box>
                    <form>
                        <Box className="flex flex-col space-y-6 ">
                            <TextField id="outlined-basic" label="Username" variant="outlined" />
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
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

 
export default PharmacistLoginPage;