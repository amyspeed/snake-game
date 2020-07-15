import React from 'react';
import { connect } from 'react-redux';
import { PutScoresByUserId } from './../actions/scores';

const GameOver = (props) => {

    const saveScore = (e) => {
        e.preventDefault();
        if (props.score < props.length) {
            const putData = {
                score: props.length
            }
            props.dispatch(PutScoresByUserId(putData))
            .then(() => window.location.reload());  
        }
    }

    const handleNewGameClicked = (e) => {
        e.preventDefault();
        if (props.loggedIn) {;
            if (props.score < props.length) {
                const putData = {
                    score: props.length
                }
                props.dispatch(PutScoresByUserId(putData))
                .then(() => props.startNewGame())
            }
            else {
                props.startNewGame()
            }
        }
        else {
            props.startNewGame()
        }
    }


    return (
        <div>
            <h1>Game Over...</h1>
            <p>Your space snake <b>{props.problem}!</b><br/>
            <span>{props.length}</span> energy block{props.length === 1 ? '' : 's'} collected</p>

            { props.loggedIn ?
                ((props.score) <  props.length)
                    ? <p onClick={(e) => saveScore(e)} className="sign-in-link">Save this new high score and Exit!</p>
                    : <p>You did not exceed your high score of <span>{props.score}</span></p>
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