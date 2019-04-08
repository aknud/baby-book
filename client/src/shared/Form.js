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
        title: data ? data.title : "",
        date: data ? data.date : "",
        description: data ? data.description :  "",
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
        switch(props.typeForm){
            case "Milestone":
                secureAxios.post("/api/milestones", inputs).then(res => {
                    props.getMilestones()
                })
                break;
            case "milestoneEdit":
                props.editMilestone(props.data._id, inputs)
                props.getMilestones()
                break;
            case "Note":
                secureAxios.post("/api/notes", inputs).then(res => {
                    props.getNotes()
                })
                break;
            case "noteEdit":
                props.editNote(props.data._id, inputs)
                props.getNotes()
                break;
        }
        props.toggle.toggler()
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