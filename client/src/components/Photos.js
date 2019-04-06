import React, {useEffect} from 'react';
import { withContext } from '../context/SharedContext';
import ImageUploader from '../shared/ImageUploader';

const Photos = (props) => {
    useEffect(() => {
        props.getPhotos()
    }, [])

    let mappedPhotos = props.photos.map((pic, i) => {
        return (
            <div key={i + pic.image}>
                <img src={pic.image} alt="" height="350" width="350"/>
            </div>
        )
    })
    return (
        <div>
            <h1>Photos</h1> 
            {mappedPhotos}
            <ImageUploader />
        </div>
    );
};

export default withContext(Photos);