import React, { useState } from 'react';
import SignIn from './SignIn';

const GameOver = (props) => {
    const [showSignIn, handleShowSignIn] = useState(false);

    return (
        <div className="overlay-container">
            { !showSignIn ?
                <div>
                    <h1>Game Over...</h1>
                    <p>Your space snake <b>{props.problem}!</b><br/>
                    <span>{props.length}</span> energy block{props.length === 1 ? '' : 's'} collected</p>
            
                    <button className="new-game-button" onClick={(e) => props.startNewGame(e)}>New Game</button>
                </div>
            :
                <SignIn />
            }
            { !props.signedIn ?
            <p className="sign-in-link" onClick={() => handleShowSignIn(!showSignIn)}>{ showSignIn ? 'cancel' : 'Sign in to save score' }</p>
            : null }
        </div>
    )
}

export default GameOver;