import React from 'react';


const AuthForm = props => {
    const {handleSubmit, handleChange, username, password, btnText} = props
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
                required
                />
            <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
                required
                />
                <button>{btnText}</button>
        </form>
    );
};

export default AuthForm;