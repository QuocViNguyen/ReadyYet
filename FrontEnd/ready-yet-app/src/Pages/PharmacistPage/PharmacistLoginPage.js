import React from 'react';
import { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import LoginSuccessPage from './LoginSuccessPage';

class PharmacistLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
          }
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log("EMAIL FROM HANDLE CLICK: " + this.state.email);
        const userEmail = this.state.email;
        const userPassword = this.state.password;
        this.asios(userEmail, userPassword);
    };

    asios(userEmail, userPassword){
        axios.post('http://localhost:4000/login',{
            email : userEmail,
            password: userPassword
        }).then(response =>{
            console.log(response.data)
            this.changeRoute()
            }
        )
    }

    changeRoute= () => {
            this.props.history.push('/loginsuccess');
    }
    
    render() { 
        return (
            <Box className='h-screen w-screen bg-blue-200 overflow-x-hidden overflow-y-scroll'>
                <Box className='h-1/2 w-full flex items-center justify-center flex-col'>
                    <Box className='text-3xl pb-10 font-semibold'>SIGN IN</Box>
                    <form onSubmit={this.handleClick}>
                        <Box className="flex flex-col space-y-6 ">
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={this.state.email} onChange = {(event)=>{
                                this.setState({email : event.target.value});}}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={this.state.password} onChange = {(event)=>{
                                this.setState({password : event.target.value});}}/>
                            <Button type="submit" variant="contained" color="primary" >
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