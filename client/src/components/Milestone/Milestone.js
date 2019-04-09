import React from 'react';
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import { withContext } from '../../context/SharedContext';
import "../Milestone/Milestone.css"

const Milestone = (props) => {
    const {item, user, deleteMilestone} = props

    return (
        <div className="card" key={item._id}>
                <h2 className="card-title">{item.title}</h2>
                <p>{item.date}</p>
                <p>{item.description}</p>
                {user.isAdmin && 
                    <Toggle render={({on, toggler}) => {
                        return (
                            <div className="card-action">
                                <button onClick={toggler}>{on ? "cancel" : "edit"}</button>
                                {on && <Form typeForm="milestoneEdit" data={item} btnText="Save"/>}
                            </div>
                        )
                    }}/>
                }
                {user.isAdmin && <button onClick={() => deleteMilestone(item._id)}>delete</button>}
            </div>
    );
};

export default withContext(Milestone);