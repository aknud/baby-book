import React from 'react';
import {Link} from "react-router-dom"
import {Navbar} from "react-materialize"
import "../Nav/Nav.css"

const Nav = (props) => {
    return (
        <Navbar alignLinks="right">
            <ul>
                <li className="sidenav-close"><Link to="/landing">Home</Link></li>
                <li className="sidenav-close"><Link to="/milestone">Milestones</Link></li>
                <li className="sidenav-close"><Link to="/notes">Memories</Link></li>
                <li className="sidenav-close"><Link to="/photos">Photos</Link></li>
                <li className="sidenav-close" onClick={props.logout}><a>Logout</a></li>
            </ul>
        </Navbar>
    );
};

export default Nav;