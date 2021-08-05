import React from 'react';
import { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';


class PharmacistLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
          }
    }

    handleClick = (e) => {
        console.log(e.type)
        console.log(this.state.email);
        console.log(this.state.password);
        this.asios(this.state.email, this.state.password);
        
    };

    asios(userEmail, userPassword){

        //If you pass this exact url and don't add those value, it run correctly. But if the path is .../login only, it is not working
        //The query params do not get thro.
        console.log("EMAIL: :" + userEmail);
        axios.post('http://localhost:4000/login',{
            params:{
                email : userEmail,
                password: userPassword
            }
        }).then(response =>{
            console.log(response)
            }
        )
    }
    
    render() { 
        return (
            <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
                <Box className='h-1/2 w-full flex items-center justify-center flex-col'>
                    <Box className='text-3xl pb-10 font-semibold'>SIGN IN</Box>
                    <form>
                        <Box className="flex flex-col space-y-6 ">
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={this.state.email} onChange = {(event)=>{
                                this.setState({email : event.target.value});}}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={this.state.password} onChange = {(event)=>{
                                this.setState({password : event.target.value});}}/>
                            <Button variant="contained" color="primary" onClick={this.asios}>
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