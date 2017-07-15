import React, { Component } from 'react';
import { createStore } from 'redux'

import { Provider } from 'react-redux'

import { Link, Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Users from '../../views/Users/'

import lynxApp from '../../reducers'
import { listUsers } from '../../actions'

let store = createStore(lynxApp)

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
                  <Route path="/users" name="Users" component={Users} onEnter={() => store.dispatch(listUsers())} />
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
