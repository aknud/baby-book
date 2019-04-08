import React from 'react';
import siena from "../../assets/Siena-phone-bg.jpg"

const styles = {
    backgroundImage: `url(${siena})`,
    backgroundPosition: "center 70%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh"
}

const Landing = () => {
    return (
        <div style={styles}>
            <h1>Everything Siena</h1>
        </div>
    );
};

export default Landing;