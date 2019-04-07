import React from 'react';
import {Link} from "react-router-dom"
import Toggle from "../shared/Toggle"

const Nav = (props) => {
    return (
        <div>
            <Toggle render={({on, toggler}) => {
                return (
                    <div>
                        <button onClick={toggler}>Menu</button>
                        {on && 
                        <div>
                            <Link to="/landing">Home</Link>
                            <Link to="/milestone">Milestones</Link>
                            <Link to="/notes">Memories</Link>
                            <Link to="/photos">Photos</Link>
                            <button onClick={props.logout}>Logout</button>
                        </div>
                        }
                    </div>
                )
            }} />
        </div>
    );
};

export default Nav;