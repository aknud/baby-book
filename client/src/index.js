import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import SharedContext from "./context/SharedContext"
import UserProvider from "./context/UserProvider"

ReactDOM.render(
    <UserProvider>
        <SharedContext>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SharedContext>
    </UserProvider>
, document.getElementById('root'));
