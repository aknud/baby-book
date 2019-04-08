import React, {useEffect} from 'react';
import siena from "../../assets/Siena-phone-bg.jpg"
import { withContext } from '../../context/SharedContext';

const styles = {
    backgroundImage: `url(${siena})`,
    backgroundPosition: "center 70%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh"
}

const Landing = (props) => {

    useEffect(() => {
        props.getMilestones()
        props.getNotes()
        props.getPhotos()
    }, [])

    return (
        <div style={styles}>
            <h1>Everything Siena</h1>
        </div>
    );
};

export default withContext(Landing);