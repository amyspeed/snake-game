import React from 'react';
import { connect } from 'react-redux';
import { PutScoresByUserId } from './../actions/scores';

const GameOver = (props) => {

    console.log(props.score)

    const handleNewGameClicked = (e) => {
        e.preventDefault();
        if (props.loggedIn) {
            if (props.score < props.length) {
                const putData = {
                    score: props.length
                }
                props.dispatch(PutScoresByUserId(putData))
                .then(() => props.startNewGame(e))
            }
            else {
                props.startNewGame(e)
            }
        }
        else {
            props.startNewGame(e)
        }
    }

    return (
        <div>
            <h1>Game Over...</h1>
            <p>Your space snake <b>{props.problem}!</b><br/>
            <span>{props.length}</span> energy block{props.length === 1 ? '' : 's'} collected</p>

            { props.loggedIn ?
                props.score < props.length ? <p>This is a new high score!</p> : <p>You did not exceeded your high score of <span>{props.score}</span></p>
             : null }
            
            <button className="new-game-button" onClick={(e) => handleNewGameClicked(e)}>New Game</button>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    score: state.scores.thisUser.score,
})

export default connect(mapStateToProps)(GameOver);