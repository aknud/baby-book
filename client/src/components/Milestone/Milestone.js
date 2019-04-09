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
                <div className="card-action">
                    {user.isAdmin && 
                        <Toggle render={({on, toggler}) => {
                            return (
                                <div>
                                    <button className="m-btn" onClick={toggler}>{on ? "cancel" : "edit"}</button>
                                    {on && <Form typeForm="milestoneEdit" data={item} btnText="Save"/>}
                                </div>
                            )
                        }}/>
                    }
                    {user.isAdmin && 
                        <button className="m-btn" onClick={() => deleteMilestone(item._id)}>delete</button>
                    }
                </div>
            </div>
    );
};

export default withContext(Milestone);