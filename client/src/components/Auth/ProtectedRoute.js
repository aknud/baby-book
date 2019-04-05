import React from "react"
import {Route, Redirect} from "react-router-dom"
import {withContext} from "./../../context/SharedContext"

function ProtectedRoute(props){
    // rest allows you to add more props later for the component to use.
    const {token, path, redirectTo, component: Component, ...rest} = props;
    return (
        token ? 
            <Route {...rest} path={path} render={renderProps => <Component {...renderProps} {...rest}/>}/> :
            <Redirect to={redirectTo} />
    )
}

export default withContext(ProtectedRoute)