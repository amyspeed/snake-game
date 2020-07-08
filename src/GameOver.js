import React from 'react';

const GameOver = (props) => {

    return (
        <div className="game-over-container">
            <h1>Game Over...</h1>
            <p>Your space snake <b>{props.problem}</b>! Length: <b>{props.length}</b></p>
            <button onClick={(e) => props.startNewGame(e)}>New Game</button>
        </div>
    )
}

export default GameOver;