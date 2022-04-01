import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Home ({
    auth,
    authToken
}) { 
    return (
        <div>
            <div className="container dark insight-padding">
                <div className="insight">Bem vindo(a),</div>
                <div className="insight-bigger">Como vamos criar o futuro hoje?</div>
            </div>
            <div className="container dark insight-padding">
                <Link to="/opportunities" className="insight button-light">Oportunidades</Link>
                <Link to="/vendas" className="insight button-light">Vendas</Link>
                <Link to="/events" className="insight button-light">Eventos</Link>
            </div>
        </div>
    )
}