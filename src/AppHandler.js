import React from 'react';

import {
    Route,
    Routes,
    HashRouter
} from "react-router-dom";

import Header from './templates/Header';

import Home from './modules/Home';
import Opportunities from './modules/Opportunities';
import Vendas from './modules/Vendas';
import Events from './modules/Events';

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
                    <Route path="/opportunities" element={<Opportunities auth={auth} authToken={authToken}  />} />
                    <Route path="/vendas" element={<Vendas auth={auth} authToken={authToken}  />} />
                    <Route path="/events" element={<Events auth={auth} authToken={authToken}  />} />
                </Routes>
            </div>
        </HashRouter>
    )
}