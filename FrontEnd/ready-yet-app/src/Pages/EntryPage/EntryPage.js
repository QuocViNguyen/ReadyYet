import React from 'react';
import { Component } from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import PharmacistLoginPage from '../PharmacistPage/PharmacistLoginPage';
import EntryPageContent from './EntryPageContent';
import LoginSuccessPage from '../PharmacistPage/LoginSuccessPage';
import AddOrderPage from '../PharmacistPage/AddOrderPage';

class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <Router>
                <Box className='content'>
                    <Switch>
                        <Route exact path='/' component={EntryPageContent} />
                        <Route exact path='/login' component={PharmacistLoginPage} />
                        <Route exact path='/loginsuccess' component={LoginSuccessPage} props={'ALOA'}/>
                        <Route exact path='/addOrderPage' component={AddOrderPage} />
                    </Switch>
                </Box>
            </Router>
          );
    }
}

export default EntryPage;