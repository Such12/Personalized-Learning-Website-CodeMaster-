import React from 'react';
import './GameDataStructures.css';

const Modal = ({ showModal, onPlayAgain }) => {
    const modalClass = showModal ? "game-modal show" : "game-modal";

    return (
        <div className={modalClass}>
            <div className="content">
                <img src={`/images/lost.gif`} alt="Game Over gif" />
                <h4>Game Over!</h4>
                <button className="play-again" onClick={onPlayAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default Modal;
