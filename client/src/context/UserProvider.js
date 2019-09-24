import React, {Component} from "react"
import axios from "axios"
const {Provider, Consumer} = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            errMsg: ""
        }
    }

    signup = credentials => {
        return userAxios.post("/auth/signup", credentials).then(res => {
            const {user, token} = res.data
            this.setState({
                user,
                token,
                errMsg: ""
            })
            // forward the response just in case it's needed down the promise chain.
            return res
        }).catch(err => {
            this.handleError(err.response.data.message)
        })
    }

    login = credentials => {
        return userAxios.post("/auth/login", credentials).then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({
                user,
                token,
                errMsg: ""
            })
            // Maybe invoke all the get functions??
            return res
        }).catch(err => this.handleError(err.response.data.errMsg))
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            user: {},
            token: "",
            errMsg: ""
        })
    }

    // This is if they fail login or signup
    handleError = err => this.setState({ errMsg: err})

    render(){
        return <Provider value={{
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    handleError: this.handleError,
                    ...this.state
                }}>
                    {this.props.children}
                </Provider>

    }
}



export const withUser = C => {
    return props =>
            <Consumer>
                {value => <C {...value} {...props} />}
            </Consumer>
}