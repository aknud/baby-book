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
    
    // Milestones
    getMilestones = () => {
        return authorizedAxios.get("/api/milestones")
            .then(res => {
                this.setState({ milestones: res.data})
                return res;
            })
    }

    editMilestone = (id, updatedObj) => {
        return authorizedAxios.put(`/api/milestones/${id}`, updatedObj).then(res => {
            this.setState(prevState => ({
                milestones: prevState.milestones.map(item => item._id === id ? item = res.data : item)
            }))
        })
    }

    deleteMilestone = id => {
        return authorizedAxios.delete(`/api/milestones/${id}`).then(res => {
            console.log(res.data)
            this.setState(prevState => ({
                milestones: prevState.milestones.filter(item => item._id !== id)
            }))
        })
    }

    // Notes 
    getNotes = () => {
        return authorizedAxios.get("/api/notes")
            .then(res => {
                this.setState({ notes: res.data})
                return res;
            })
    }

    editNote = (id, updatedObj) => {
        return authorizedAxios.put(`/api/notes/${id}`, updatedObj).then(res => {
            this.setState(prevState => ({
                notes: prevState.notes.map(note => note._id === id ? note = res.data : note)
            }))
        })
    }

    deleteNote = id => {
        return authorizedAxios.delete(`/api/notes/${id}`).then(res => {
            this.setState(prevState => ({
                notes: prevState.notes.filter(note => note._id !== id)
            }))
        })
    }

    // Photos
    getPhotos = () => {
        return authorizedAxios.get("/api/photos")
            .then(res => {
                this.setState({ photos: res.data})
                return res;
            })
    }
    editPhoto = (id, updatedObj) => {
        return authorizedAxios.put(`/api/photos/${id}`, updatedObj).then(res => {
            this.setState(prevState => ({
                photos: prevState.photos.map(photo => photo._id === id ? photo = res.data : photo)
            }))
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
                editMilestone: this.editMilestone,
                deleteMilestone: this.deleteMilestone,
                getNotes: this.getNotes,
                editNote: this.editNote,
                deleteNote: this.deleteNote,
                getPhotos: this.getPhotos,
                editPhoto: this.editPhoto,
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