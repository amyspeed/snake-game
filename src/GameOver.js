import React from 'react';

const GameOver = (props) => {

    return (
        <div className="overlay-container">
            <h1>Game Over...</h1>
            <p>Your space snake <b>{props.problem}!</b><br/>
            <span>{props.length}</span> energy block{props.length === 1 ? '' : 's'} collected</p>
            
            <button className="new-game-button" onClick={(e) => props.startNewGame(e)}>New Game</button>
        </div>
    )
}

export default GameOver;