import React, {useState} from 'react';
import { withContext } from '../../context/SharedContext';
import Toggle from "../../shared/Toggle"

const Photo = (props) => {
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
        <div key={pic._id}>
            {pic.caption ? <p>{pic.caption}</p> : null}
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
            <img src={pic.image} alt="" width="300" height="250"/>
            {user.isAdmin && <button onClick={() => deletePhoto(pic._id)}>Delete</button> }
        </div>
    );
};

export default withContext(Photo);