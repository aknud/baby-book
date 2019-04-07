import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing/Landing";
import AuthContainer from "./components/Auth/AuthContainer";
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Milestones from "./components/Milestones"
import Notes from "./components/Notes"
import Photos from "./components/Photos"
import NotFound from "./components/NotFound"
import Nav from "./components/Nav"
import {withUser} from './context/UserProvider'

const App = (props) => {

  const { token, user, logout } = props
  return (
    <div className="App">
      {token && <Nav logout={logout}/> }
      <Switch>
        <Route exact path="/" 
        render={routerProps => token ? <Redirect to="/landing"/> : <AuthContainer {...routerProps}/>}/>
        <ProtectedRoute token={token} path="/landing" redirectTo="/" component={Landing}/>
        <ProtectedRoute token={token} path="/milestone" user={user} component={Milestones} />
        <ProtectedRoute token={token} user={user} path="/notes" component={Notes} />
        <ProtectedRoute token={token} user={user} path="/photos" component={Photos} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default withUser(App);
