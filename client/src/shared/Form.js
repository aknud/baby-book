import React, {useState} from 'react';
import {withContext} from "../context/SharedContext"
import axios from "axios"
const secureAxios = axios.create()

secureAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Form = (props) => {
    const { data } = props
    const initialInputs = {
        title: data.title || "",
        date: data.date || "",
        description: data.description ||  "",
    }
    const [inputs, setInputs] = useState(initialInputs)

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if(props.typeForm === "Note"){
            secureAxios.post("/api/notes", inputs).then(res => {
                props.getNotes()
            })
        } else if(props.typeForm === "Milestone"){
            secureAxios.post("/api/milestones", inputs).then(res => {
                props.getMilstones()
            })
        } else if(props.typeForm === "milestoneEdit"){
            secureAxios.put(`/api/milestones/${props.data._id}`, inputs).then(res => {
                props.getMilestones()
            })
        }
        setInputs(initialInputs)
    }

    const {title, date, description} = inputs
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    value={title}
                    placeholder="Title" 
                    required/>
                <input 
                    type="text" 
                    name="date" 
                    onChange={handleChange} 
                    value={date}
                    placeholder="Date" 
                    required/>
                {props.typeForm === "Note" ? 
                    <input 
                        type="text" 
                        name="description" 
                        onChange={handleChange}
                        placeholder="Description" 
                        value={description}
                        required
                    />
                    :
                    <input 
                        type="text" 
                        name="description" 
                        onChange={handleChange}
                        placeholder="Description" 
                        value={description}
                    />
                }
                <button>{props.btnText}</button>
            </form>
        </div>
    );
};

export default withContext(Form);