import React from 'react';
import './GameIntroduction.css';
const Modal = ({ showModal, isVictory, correctWord, onPlayAgain }) => {
    const modalClass = showModal ? "game-modal show" : "game-modal";

    const closeModal = () => {
        // Logic to close modal if needed
    };

    return (
    
        <div className={modalClass}>
            <div className="content">
            <img src={`/images/${isVictory ? 'victory' : 'lost'}.gif`} alt={`${isVictory ? 'Victory' : 'Game Over'} gif`} />
                <h4>{isVictory ? 'Congratulations!' : 'Game Over!'}</h4>
                <p>{isVictory ? 'You guessed the word:' : 'The correct word was:'} <b>{correctWord}</b></p>
                <button className="play-again" onClick={onPlayAgain}>Play Again</button>
            </div>
        </div>
    
    );
}

export default Modal;
