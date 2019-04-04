import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ProtectedRoute from './components/Auth/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route path="/signup" component={Signup} /> */}
          {/* <Route path="/login" component={Login} /> */}
          {/* <ProtectedRoute path="/milestone" component={Milestone} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
