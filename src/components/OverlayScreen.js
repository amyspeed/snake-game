import React, { useState } from 'react';
import SignIn from './SignIn';
import Welcome from './Welcome';
import Gameover from './GameOver';

const OverlayScreen = (props) => {
    const [showSignIn, handleShowSignIn] = useState(false);


    console.log(showSignIn)
    return (
        <div className="overlay-container">
            { showSignIn ? 
                <SignIn handleShowSignIn={(data)=> handleShowSignIn(data)}  />
                : 
                <div>
                    { props.welcome ? <Welcome startNewGame={(e) => props.startNewGame(e)} /> : null }
                    { props.gameOver ? <Gameover startNewGame={(e) => props.startNewGame(e)} problem={props.problem} length={props.length} /> : null }
                </div>
            }
            { !props.loggedIn ?
                <p className="sign-in-link" onClick={() => handleShowSignIn(!showSignIn)}>{ showSignIn ? 'Cancel' : 'Sign In' }</p>
                : null
            }
        </div>
    )
}

export default OverlayScreen;