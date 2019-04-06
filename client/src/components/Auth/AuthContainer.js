import React from 'react';
import AuthForm from './AuthForm';
import { withUser } from '../../context/UserProvider';

class AuthContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            authToggle: false
        }
    }

    authToggler = () => {
        this.setState(prevState => ({
            authToggle: !prevState.authToggle
        }))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleFormSubmit = e => {
        e.preventDefault()
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        this.state.authToggle ? this.props.signup(credentials) :
        this.props.login(credentials)
    }
    
    render(){
       return (
            <div>
                {
                    this.state.authToggle ?
                        <>
                            <h3>Sign Up</h3>
                            <AuthForm 
                                handleChange={this.handleChange}
                                handleSubmit={this.handleFormSubmit}
                                username={this.state.username}
                                password={this.state.password}
                                btnText="Sign Up"
                            />
                            <p style={{color: "firebrick"}}>{this.props.errMsg}</p>
                            <p onClick={this.authToggler}>Been here before? Click to go to login. </p>
                        </>
                    :
                        <>
                            <h3>Login</h3>
                            <AuthForm 
                                handleChange={this.handleChange}
                                handleSubmit={this.handleFormSubmit}
                                username={this.state.username}
                                password={this.state.password}
                                btnText="Login"
                            />
                            <p style={{color: "firebrick"}}>{this.props.errMsg}</p>
                            <p onClick={this.authToggler}>First time? Click to sign up!</p>
                        </>
                }
            </div>
        ); 
    }
};

export default withUser(AuthContainer);