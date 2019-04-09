import React from 'react';
import Toggle from "../../shared/Toggle"
import Form from "../../shared/Form"
import { withContext } from '../../context/SharedContext';
import "../Note/Note.css"

const Note = (props) => {
    const {user, note, deleteNote} = props
    return (
        <div className="card" key={note._id}>
            <h2 className="card-title">{note.title}</h2>
            <p>{note.date}</p>
            <p>{note.description}</p>
            <div className="card-action">
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
        </div>
    );
};

export default withContext(Note);