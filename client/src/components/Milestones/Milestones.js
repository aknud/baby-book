import React, {useEffect} from 'react';
import { withContext } from '../../context/SharedContext'
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import Milestone from "./../Milstone/Milestone"

const Milestones = (props) => {
    const {milestones, user} = props
    useEffect(()=> {
        props.getMilestones()
    }, [])

    let mappedMilestones = milestones.map((item) => <Milestone key={item._id} user={user} item={item}/>)
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