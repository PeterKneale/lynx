import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import UsersLayout from '../../views/Users/Layout'
import rootReducer from '../../reducers'

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer);

class Full extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <div className="container-fluid">
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/users" component={UsersLayout} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </div>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default Full;
