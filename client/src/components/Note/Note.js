import React from 'react';
import { withContext } from '../../context/SharedContext';

const Note = (props) => {
    const {user, note, editNote, deleteNote} = props
    return (
        <div key={note._id}>
            <h1>{note.title}</h1>
            <h3>{note.date}</h3>
            <p>{note.description}</p>
            {user.isAdmin && <button onClick={() => editNote(note._id)}>edit</button> }
            {user.isAdmin && <button onClick={() => deleteNote(note._id)}>delete</button>}
        </div>
    );
};

export default withContext(Note);