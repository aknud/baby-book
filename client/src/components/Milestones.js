import React, {useEffect} from 'react';
import { withContext } from '../context/SharedContext'
import Toggle from "../shared/Toggle"
import Form from "../shared/Form"

const Milestones = (props) => {
    const {milestones, user} = props
    useEffect(()=> {
        props.getMilestones()
    }, [])

    let mappedMilestones = milestones.map((item) => {
        return (
            <div key={item._id}>
                <h1>{item.title}</h1>
                <h3>{item.date}</h3>
                <p>{item.description}</p>
                {user.isAdmin && <button>edit</button> }
                {user.isAdmin && <button>delete</button>}
            </div>
        )
    })
    return (
        <div>
            <h1>Milestones</h1>
            {user.isAdmin && 
                <Toggle render={({on, toggler}) => {
                    return (
                        <div>
                            <button onClick={toggler}>{on ? "Close" : "Add new"}</button>
                            {on && <Form btnText="Add Milestone"/>}
                        </div>
                    )
                }}/>
            }
            {mappedMilestones}
        </div>
    );
};

export default withContext(Milestones);