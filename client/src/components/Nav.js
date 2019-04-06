import React from 'react';
import {Link} from "react-router-dom"

const Nav = (props) => {
    return (
        <div>
            <Link to="/milestone">Milestones</Link>
            <Link to="/notes">Memories</Link>
            <Link to="/photos">Photos</Link>
            <button onClick={props.logout}>Logout</button>
        </div>
    );
};

export default Nav;