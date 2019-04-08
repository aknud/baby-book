import React from 'react';
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import { withContext } from '../../context/SharedContext';

const Milestone = (props) => {
    const {item, user, deleteMilestone} = props

    return (
        <div key={item._id}>
                <h1>{item.title}</h1>
                <h3>{item.date}</h3>
                <p>{item.description}</p>
                {user.isAdmin && 
                    <Toggle render={({on, toggler}) => {
                        return (
                            <div>
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