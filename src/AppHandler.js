import React from 'react';

import {
    Route,
    Routes,
    HashRouter
} from "react-router-dom";

import Header from './templates/Header';

import Home from './modules/Home';

export default function AppHandler ({
    auth,
    authToken
}) {
    return (
        <HashRouter>
            <div>
                <Header auth={auth} authToken={authToken} />
                <Routes>
                    <Route path="/" element={<Home auth={auth} authToken={authToken}  />} />
                </Routes>
            </div>
        </HashRouter>
    )
}