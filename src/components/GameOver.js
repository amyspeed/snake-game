import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PutScoresByUserId } from './../actions/scores';

const GameOver = (props) => {

    const [scoresSaved, handleSave] = useState(false);
    const [prevScore, savePrevScore] = useState(0);

    const saveScore = (e) => {
        e.preventDefault();
        console.log(scoresSaved);
        if(!scoresSaved) {
            savePrevScore(props.score);
            const newScore = props.length;
            handleSave(true);

            if (prevScore < newScore) {
                const putData = {
                    score: props.length
                }
                props.dispatch(PutScoresByUserId(putData));
                
            }
        }
    }

    console.log(prevScore)


    return (
        <div>
            <h1>Game Over...</h1>
            <p>Your space snake <b>{props.problem}!</b><br/>
            <span>{props.length}</span> energy block{props.length === 1 ? '' : 's'} collected</p>

            { props.loggedIn ?
                ((prevScore ? prevScore : props.score) <  props.length) ? 
                    !scoresSaved ? 
                        <p onClick={(e) => saveScore(e)} className="sign-in-link">Save this new high score!</p>
                        : <p>New high score saved!</p>
                    : <p>You did not exceed your high score of <span>{props.score}</span></p>
             : null }
            
            <button className="new-game-button" onClick={(e) => props.startNewGame(e)}>New Game</button>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    score: state.scores.thisUser.score,
})

export default connect(mapStateToProps)(GameOver);