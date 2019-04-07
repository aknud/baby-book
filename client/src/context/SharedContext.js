import React, {Component} from "react"
import axios from "axios"
const {Provider, Consumer} = React.createContext()
const authorizedAxios = axios.create()



//use axios.create() to make an interceptor function to check token and ads it to the headers?
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
            photos: []
        }
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

    createNote = newNote => {
        return authorizedAxios.post("/api/notes", newNote).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    getPhotos = () => {
        return authorizedAxios.get("/api/photos")
            .then(res => {
                this.setState({ photos: res.data})
                return res;
            })
    }
    deletePhoto = id => {
        return authorizedAxios.delete(`/api/photos/${id}`).then(res => {
            console.log(res.data)
            this.setState(prevState => ({
                photos: prevState.photos.filter(photo => photo._id !== id)
            }))
        })

    }

    render(){
        return (
            <Provider value={{
                getMilestones: this.getMilestones,
                getNotes: this.getNotes,
                createNote: this.createNote,
                getPhotos: this.getPhotos,
                deletePhoto: this.deletePhoto,

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