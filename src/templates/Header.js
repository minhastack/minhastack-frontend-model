import React from 'react';

export default ({
    auth,
    authToken
}) => (
    <div className="header">
        <div className="title">MinhaStack</div>
        {(auth && authToken) ? (
            <>
                <div className="perfil">
                    <div className="name">{auth.currentUser.displayName}</div>
                    <div className="button" onClick={() => auth.signOut()}>Sair</div> 
                </div>
            </>
        ) : null }
    </div>
)