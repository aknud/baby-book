import React, {useState, useEffect} from 'react';
import { withContext } from '../../context/SharedContext';
import Toggle from "../../shared/Toggle"
import "../Photo/Photo.css"

const Photo = (props) => {
    useEffect(()=> {
        props.getPhotos()
    },[])
    const {pic, user, editPhoto, deletePhoto} = props
    const initialCaption = {caption: pic.caption || ""}
    const [caption, setCaption] = useState(initialCaption)

    const handleChange = e => setCaption({caption: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        editPhoto(pic._id, caption)
        setCaption(initialCaption)
    }

    return (
        <div className="card med" key={pic._id}>
            <div className="card-image">
                <img src={pic.image} alt="" width="300" height="250" borderradius="7"/>
            </div>
            {pic.caption ? <p>{pic.caption}</p> : null}
            <div className="card-action">
            {user.isAdmin && 
                <Toggle render={({on, toggler}) => {
                    return (
                        <div>
                            {on && 
                                <div>
                                    <input type="text" value={caption.caption} onChange={handleChange}/>
                                    <button onClick={handleSubmit}>Save</button>
                                </div>
                            }
                            <button onClick={toggler}>{on ? "cancel" : "edit"}</button>
                        </div>
                    )
                }}/>
            }
            {user.isAdmin && <button onClick={() => deletePhoto(pic._id)}>Delete</button> }
            </div>
        </div>
    );
};

export default withContext(Photo);