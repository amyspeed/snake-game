import React from 'react';

const ArrowButtons = (props) => {

    return (
        <div className="button-container">
            <div className="arrow-container">
                <button className="arrow-buttons" onClick={() => props.setDirection(37)}>&#8592;</button>
                <div className="up-down-container">
                    <button className="arrow-buttons" onClick={() => props.setDirection(38)}>&#8593;</button>
                    <button className="arrow-buttons" onClick={() => props.setDirection(40)}>&#8595;</button>
                </div>
                <button className="arrow-buttons" onClick={() => props.setDirection(39)}>&#8594;</button>
            </div>
            <div className="arrow-container">
                <button className="new-game-button" onClick={() => props.setDirection(32)}>{ props.pause ? 'Resume' : 'Pause'}</button>
            </div>
        </div>
    )

}


export default ArrowButtons;