import React, {useEffect} from 'react';
import { withContext } from '../context/SharedContext'

const Milestones = (props) => {
    useEffect(()=> {
        props.getMilestones()
    }, [])

    let mappedMilestones = props.milestones.map((item) => {
        return (
            <div key={item._id}>
                <h1>{item.title}</h1>
                <h3>{item.date}</h3>
                <p>{item.description}</p>
            </div>
        )
    })
    return (
        <div>
            <h1>Milestones</h1>
            {mappedMilestones}
        </div>
    );
};

export default withContext(Milestones);