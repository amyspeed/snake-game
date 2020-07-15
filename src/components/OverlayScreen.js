import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from './../actions/auth';
import SignIn from './SignIn';
import Welcome from './Welcome';
import Gameover from './GameOver';

const OverlayScreen = (props) => {
    const [showSignIn, handleShowSignIn] = useState(false);

    const handleLogOut = (e) => {
        e.preventDefault();
        handleShowSignIn(false);
        props.dispatch(clearAuth());
    }


    console.log(showSignIn)
    return (
        <div className="overlay-container">
            { showSignIn && !props.loggedIn ? 
                <SignIn  />
                : 
                <div>
                    { props.welcome ? <Welcome startNewGame={() => props.startNewGame()} firstName={props.firstName} /> : null }
                    { props.gameOver ? <Gameover startNewGame={() => props.startNewGame()} problem={props.problem} length={props.length} exit={() => props.exit()} /> : null }
                </div>
            }
            { !props.loggedIn ?
                <p className="sign-in-link" onClick={() => handleShowSignIn(!showSignIn)}>{ showSignIn ? 'Cancel' : 'Sign In' }</p>
                : <p className="sign-in-link" onClick={(e) => handleLogOut(e)}>Log Out</p>
            }
        </div>
    )
}

export default connect()(OverlayScreen);