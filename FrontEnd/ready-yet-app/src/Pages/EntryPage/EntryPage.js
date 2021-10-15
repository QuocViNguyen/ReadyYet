import React from 'react';
import { Component } from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import PharmacistLoginPage from '../PharmacistPage/PharmacistLoginPage';
import EntryPageContent from './EntryPageContent';
import LoginSuccessPage from '../PharmacistPage/LoginSuccessPage';
import AddOrderPage from '../PharmacistPage/AddOrderPage';
import ViewOrderPage from '../PharmacistPage/ViewOrderPage';
import PickupEntryPage from '../PickupPage/PickupEntryPage';
import PickupOrdersViewPage from '../PickupPage/PickupOrdersViewPage';

class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return (
            <Router>
                <Box className='content' id='content'>
                    <Switch>
                        <Route exact path='/' component={EntryPageContent} />
                        <Route exact path='/login' component={PharmacistLoginPage} />
                        <Route exact path='/loginsuccess' component={LoginSuccessPage} props={'ALOA'} />
                        <Route exact path='/ViewOrderPage' component={ViewOrderPage} />
                        <Route exact path='/AddOrderPage' component={AddOrderPage} />
                        <Route exact path='/PickupEntryPage' component={PickupEntryPage} />
                        <Route exact path='/PickupOrdersViewPage' component={PickupOrdersViewPage} />
                    </Switch>
                </Box>
            </Router>
          );
    }
}

export default EntryPage;