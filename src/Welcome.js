import React, { useState } from 'react';
import SignIn from './SignIn';

const Welcome = (props) => {
    const [showSignIn, handleShowSignIn] = useState(false);


    console.log(showSignIn)
    return (
        <div className="overlay-container">
            { !showSignIn ?
                <div>
                    <h1>Welcome to Space Snake!</h1>
                    <p className="instructions">Your job is to collect as many 
                        energy blocks as you can without crashing or 
                        collapsing.
                     </p>
                    <p className="instructions">
                        Use your keyboard arrow keys or the provided buttons 
                        to affect your Space Snake's movements. Enjoy!
                    </p>
            
                    <button className="new-game-button" onClick={(e) => props.startNewGame(e)}>Start Game</button>
                </div>
            :
                <SignIn />
            }
            <p className="sign-in-link" onClick={() => handleShowSignIn(!showSignIn)}>{ showSignIn ? 'instructions' : 'Sign In' }</p>
        </div>
    )
}

export default Welcome;