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
    const initialInputs = {
        title: "",
        date: "",
        description: "",
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
        props.formType === "Note" ? 
        secureAxios.post("/api/notes", inputs).then(res => {
            props.getNotes()
        })
        :
        secureAxios.post("/api/milestones", inputs).then(res => {
            props.getMilstones()
        })
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
                {props.formType === "Note" ? 
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