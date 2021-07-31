import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

function EntryPageContent (){
    let history = useHistory();

    const changeURL =() =>{
        history.push('/login');
    }

    return (
        <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
            <Box className='h-1/4 flex items-center justify-center'>READY YET APPLICATION ENTRY POINT</Box>
            <Box className=' h-3/4 w-full flex items-center justify-center'>
                <Grid container spacing={1} align='center'>
                    <Grid item xs={12} className='space-x-10 md:space-x-60'>
                        <Button variant="contained" color="primary" onClick={changeURL}>
                            Pharmacist
                        </Button>
                        <Button variant="contained" color="primary">
                            Pick Up
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      );
}
 
export default EntryPageContent;