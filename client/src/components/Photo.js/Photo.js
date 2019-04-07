import React from 'react';
import { withContext } from '../../context/SharedContext';

const Photo = (props) => {
    const {pic, user, deletePhoto} = props
    return (
        <div key={pic._id}>
            <img src={pic.image} alt="" width="350" height="250"/>
            {user.isAdmin && <button>Edit</button> }
            {user.isAdmin && <button onClick={() => deletePhoto(pic._id)}>Delete</button> }
        </div>
    );
};

export default withContext(Photo);