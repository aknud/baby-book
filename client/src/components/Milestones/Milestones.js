import React, {useEffect} from 'react';
import { withContext } from '../../context/SharedContext'
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import Milestone from "./../Milestone/Milestone"
import "../Milestones/Milestones.css"

const Milestones = (props) => {
    const {milestones, user} = props
    useEffect(()=> {
        props.getMilestones()
    }, [])

    let mappedMilestones = milestones.map((item) => <Milestone role="listitem" key={item._id + Math.random()} user={user} item={item}/>)
    return (
        <div role="list" className="Milestones">
            <h1>Milestones</h1>
            {user.isAdmin &&
                <Toggle render={({on, toggler}) => {
                    return (
                        <div>
                            <button onClick={toggler}>{on ? "Close" : "Add new"}</button>
                            {on && <Form typeForm="Milestone" btnText="Add Milestone" toggle={{on, toggler}}/>}
                        </div>
                    )
                }}/>
            }
            {mappedMilestones}
        </div>
    );
};

export default withContext(Milestones);