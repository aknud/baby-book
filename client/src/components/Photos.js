import React from 'react';
import { withContext } from '../context/SharedContext';
import PhotoUploader from '../shared/PhotoUploader';

const Photos = (props) => {
    let mappedPhotos = props.photos.map((pic, i) => {
        return (
            <div key={i + pic.image}>
                <img src={pic.image} alt=""/>
            </div>
        )
    })
    return (
        <div>
            <h1>Photos</h1> 
            {/* {mappedPhotos} */}
            <PhotoUploader />
        </div>
    );
};

export default withContext(Photos);