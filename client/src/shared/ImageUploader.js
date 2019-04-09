import React, { Component } from 'react';
import {storage} from "../firebase/index"
import axios from 'axios';
const photoAxios = axios.create()

photoAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class ImageUploader extends Component {
    constructor(){
        super()
        this.state = {
            image: null,
            url: "",
            progress: 0
        }
    }

    handleChange = e => {
        if(e.target.files[0]){
            this.setState({image: e.target.files[0]})
        }
    }

    handleUpload = () => {
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on("state_changed", 
        (snapshot) => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress})
        }, (error) => {
            //handles errors
            console.log(error)
        }, () => {
            //complete function // grab image from firebase and send to mongoDB
            storage.ref("images").child(image.name).getDownloadURL().then(url => {
                this.setState({url})
                photoAxios.post("/api/photos", {image: url}).then(res => {
                    this.props.getPhotos()
                })
            })
        })
    }

    render() {
        const style={
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }
        return (
            <div>
                <progress value={this.state.progress} max="100"></progress>
                <h4>{this.state.progress === 100 ? "Upload Complete" : `Progress: ${this.state.progress}%`}</h4>
                <input type="file" name="" id="" onChange={this.handleChange}/>
                <button onClick={this.handleUpload}>Upload Image</button>
                <br/>
                <br/>
                <img src={this.state.url || "http://via.placeholder.com/300x250"} alt="" width="300" height="250"/>
            </div>
        );
    }
}

export default ImageUploader;