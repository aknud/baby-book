import React from 'react';
import { withContext } from '../context/SharedContext';
import Toggle from "../shared/Toggle"
import ImageUploader from '../shared/ImageUploader';
import Photo from "./Photo.js/Photo"

const Photos = (props) => {
    const {user, photos} = props

    let mappedPhotos = photos.map(pic => <Photo user={user} key={pic._id} pic={pic}/>)

    return (
        <div>
            <h1>Photos</h1> 
            {user.isAdmin && <Toggle render={({on, toggler}) => {
                return (
                    <div>
                        <button onClick={toggler}>{on ? "Close" : "Add New"}</button>
                        {on && <ImageUploader getPhotos={props.getPhotos} />}
                    </div>
                )    
            }}/>}
            {mappedPhotos}
        </div>
    );
};

export default withContext(Photos);