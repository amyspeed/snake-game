import React from 'react';
import { connect } from 'react-redux';

const Scores = (props) => {

    console.log(props.scores)

    const sortScores = () => {
        if (props.scores.allUsers.length > 0) {
            const userObj = props.scores.allUsers;
            console.log(typeof userObj );
            const sorted = [].slice.call(userObj).sort((a, b) => ( b.score > a.score) ? 1 : -1)
            console.log(sorted);

            let scoreList = []
            for (let i=0; i < sorted.length && i < 3; i++) {
                scoreList.push(<span index={i} style={{ color: 'white', fontWeight: 'normal'}}>{sorted[i].score} {sorted[i].username}<br/></span>)
            }

            return scoreList;

            // return (
            //     <p>{sorted[0].score} {sorted[0].username}<br/>
            //         {sorted[1].score} {sorted[1].username}<br/>
            //         {sorted[2].score} {sorted[2].username}</p>)
        }
    }

    return (
        <div className="row score-row">
            { props.loggedIn ? <div>
                <div className="col-6-b">
                    <p><span>Top Scores:</span></p>
                </div>
                <div className="col-6-b">
                    <p>{sortScores()}</p>
                </div>
                <div className="col-6-b">
                    <p><span>Your Top Score</span><br/>
                    {props.scores.thisUser.score} {props.currentUser.username}</p>
                </div>
            </div>
            : null }
            <div className="col-6-b">
                <p><span>Current Score</span><br/>{props.length} Energy Blocks</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    scores: state.scores ? state.scores : false
})

export default connect(mapStateToProps)(Scores);