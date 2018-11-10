import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Payment from './components/Dashboard/Payment';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route path = '/signin' component = {Signin} />
        <Route path = '/signup' component = {Signup} />
        <Route path = '/dashboard' component = {Dashboard} />
        <Route path = '/payment' component = {Payment} />
      </Switch>
    );
  }
}

export default App;
