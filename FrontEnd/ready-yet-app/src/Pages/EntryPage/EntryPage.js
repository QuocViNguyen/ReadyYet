import React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import PharmacistLoginPage from '../PharmacistPage/PharmacistLoginPage';
import EntryPageContent from './EntryPageContent';

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
                    </Switch>
                </Box>
            </Router>
          );
    }
}

export default EntryPage;