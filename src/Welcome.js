import React from 'react';

const Welcome = (props) => {

    return (
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
    )
}

export default Welcome;