import React, {useState} from 'react';

const Form = (props) => {
    const initialInputs = {
        title: "",
        date: "",
        image: "",
        description: ""
    }
    const [inputs, setInputs] = useState(initialInputs)

    handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        //Do the things with the data
    }

    const {title, date, image, description} = inputs
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name={title} onChange={this.handleChange} value={}/>
                <input type="text" name={date} onChange={this.handleChange} value={}/>
                <input type="text" name={image} onChange={this.handleChange} value={}/>
                <input type="text" name={description} onChange={this.handleChange} value={}/>
                <button>{props.buttonText}</button>
            </form>
        </div>
    );
};

export default Form;