import React, {useEffect} from 'react';
import { withContext } from '../../context/SharedContext';
import "../Landing/Landing.css"

const Landing = (props) => {

    useEffect(() => {
        props.getMilestones()
        props.getNotes()
        props.getPhotos()
    }, [])

    return (
        <div role="banner" className="Landing">
            <h1>Everything Siena</h1>
        </div>
    );
};

export default withContext(Landing);