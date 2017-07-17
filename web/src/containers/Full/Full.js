import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import UsersLayout from '../../views/Users/Layout'
import rootReducer from '../../reducers'
import {Grid, Row, Col} from 'react-bootstrap'
import { listUsers } from '../../actions'

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer);
store.dispatch(listUsers())

class Full extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Grid>
            <Breadcrumb />
            <Switch>
              <Route path="/dashboard" name="Dashboard" component={Dashboard} />
              <Route path="/users" component={UsersLayout} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Grid>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default Full;
