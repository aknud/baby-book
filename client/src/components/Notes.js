import React, {useEffect} from 'react';
import Note from "./Note/Note"
import Toggle from "../shared/Toggle"
import Form from "../shared/Form"


const Notes = (props) => {
    const {notes, user } = props
    useEffect(() => {
        props.getNotes()
    }, [])
    let mappedMemories = notes.map(note => <Note key={note._id + Math.random()} note={note} user={user} /> )
    return (
        <div>
            <h1>Memories</h1>
            {user.isAdmin &&
                <Toggle render={({on, toggler}) => {
                    return (
                        <div>
                            <button onClick={toggler}>{on ? "Close" : "Add new"}</button>
                            {on && <Form typeForm="Note" btnText="Add Memory" toggle={{on, toggler}}/>}
                        </div>
                    )
                }}/>
            }
            {mappedMemories}
        </div>
    );
};

export default Notes;