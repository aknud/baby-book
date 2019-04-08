import React from 'react';
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import { withContext } from '../../context/SharedContext';

const Note = (props) => {
    const {user, note, deleteNote} = props
    return (
        <div key={note._id}>
            <h1>{note.title}</h1>
            <h3>{note.date}</h3>
            <p>{note.description}</p>
            {user.isAdmin && 
                <Toggle render={({on, toggler}) => {
                    return (
                        <div>
                            <button onClick={toggler}>{on ? "cancel" : "edit"}</button>
                            {on && <Form toggle={{on, toggler}} typeForm="noteEdit" data={note} btnText="Save"/>}
                        </div>
                    )
                }}/>
            }
            {user.isAdmin && <button onClick={() => deleteNote(note._id)}>delete</button>}
        </div>
    );
};

export default withContext(Note);