import React from 'react';
import { withContext } from '../../context/SharedContext';

const Milestone = (props) => {
    const {item, user, editMilestone, deleteMilestone} = props
    return (
        <div key={item._id}>
                <h1>{item.title}</h1>
                <h3>{item.date}</h3>
                <p>{item.description}</p>
                {user.isAdmin && <button onClick={() => editMilestone(item._id)}>edit</button> }
                {user.isAdmin && <button onClick={() => deleteMilestone(item._id)}>delete</button>}
            </div>
    );
};

export default withContext(Milestone);