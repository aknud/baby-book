import React from 'react';
import { withContext } from '../context/SharedContext';

const Photos = (props) => {
    console.log(props.photos)
    let mappedPhotos = props.photos.map((pic, i) => {
        console.log(pic.image)
        return (
            <div key={i + pic.image}>
                <img src={pic.image} alt=""/>
            </div>
        )
    })
    return (
        <div>
            <h1>Photos</h1> 
            {mappedPhotos}
            <img src="https://photos.app.goo.gl/5xKj54AQC3QRGb3Y9" alt=""/>
            <a href="https://photos.app.goo.gl/5xKj54AQC3QRGb3Y9" target="blank">This is a photo</a>
        </div>
    );
};

export default withContext(Photos);