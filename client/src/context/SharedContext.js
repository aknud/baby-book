import React, {Component} from "react"
import axios from "axios"
const {Provider, Consumer} = React.createContext()
const authorizedAxios = axios.create()


//use axios.create() to make an interceptor function to check token??
authorizedAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default class SharedContext extends Component{
    constructor(){
        super()
        this.state = {
            milestones: [],
            notes: [],
            photos: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }

    componentDidMount() {
        this.getMilestones()
        this.getNotes()
        this.getPhotos()
    }
    
    signup = credentials => {
        return authorizedAxios.post("/auth/signup", credentials).then(res => {
            const {user, token} = res.data 
            this.setState({
                user,
                token
            })
            // forward the response just in case it's needed down the promise chain.
            return res
        })
    }

    login = credentials => {
        return authorizedAxios.post("/auth/login", credentials).then(res => {
            const {user, token} = res.data 
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({
                user,
                token
            })
            // Maybe invoke all the get functions??
            return res
        })
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            user: {},
            token: ""
        })
    }

    getMilestones = () => {
        return authorizedAxios.get("/api/milestones")
            .then(res => {
                this.setState({ milestones: res.data})
                return res;
            })
    }

    getNotes = () => {
        return authorizedAxios.get("/api/notes")
            .then(res => {
                this.setState({ notes: res.data})
                return res;
            })
    }

    getPhotos = () => {
        return authorizedAxios.get("/api/notes")
            .then(res => {
                this.setState({ photos: res.data})
                return res;
            })
    }

    render(){
        return (
            <Provider value={{
                signup: this.signup,
                login: this.login,
                logout: this.logout,
                getMilestones: this.getMilestones,
                getNotes: this.getNotes,
                getPhotos: this.getPhotos,
                ...this.state
            }}>
                {this.props.children}
            </Provider>
        )
    }
}


export const withContext = C => {
    return props => 
            <Consumer>
                {value => <C {...value} {...props} />}
            </Consumer>
}