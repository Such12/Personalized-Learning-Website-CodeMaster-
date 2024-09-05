import React, { useState, useEffect } from 'react';
import Modal from './modal';
import './GameIntroduction.css';
const HangmanGame = () => {
    const wordList = [
        {
            word: "programming",
            hint: "The process of writing instructions that a computer can understand and execute."
        },
        {
            word: "syntax",
            hint: "The rules for writing instructions in a programming language."
        },
        {
            word: "variable",
            hint: "A storage location for data in a program."
        },
        {
            word: "function",
            hint: "A block of code that performs a specific task."
        },
        {
            word: "input",
            hint: "Getting data from the user."
        },
        {
            word: "output",
            hint: "Displaying data to the user."
        },
        {
            word: "integer",
            hint: "A whole number data type."
        },
        {
            word: "float",
            hint: "A data type for numbers with decimals."
        },
        {
            word: "character",
            hint: "A single letter or symbol data type."
        },
        {
            word: "double",
            hint: "A data type for larger and more precise decimal numbers."
        },
        {
            word: "computer",
            hint: "The machine that executes the instructions written in a program."
        },
        {
            word: "language",
            hint: "A system of communication used by programmers to write instructions."
        },
        {
            word: "semicolon",
            hint: "The character used to end an instruction in C."
        },
        {
            word: "main",
            hint: "The primary function in a C program."
        },
        {
            word: "stdio",
            hint: "A header file for standard input and output functions in C."
        }
    ];
   
    const [currentWord, setCurrentWord] = useState('');
    const [currentHint, setCurrentHint] = useState('');
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isVictory, setIsVictory] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [clickedLetters, setClickedLetters] = useState(new Set());

    const maxGuesses = 6;

    useEffect(() => {
        initializeGame();
    }, [wordIndex]);

    const initializeGame = () => {
        const { word, hint } = wordList[wordIndex];
        setCurrentWord(word);
        setCurrentHint(hint);
        setCorrectLetters([]);
        setWrongGuessCount(0);
        setClickedLetters(new Set());
    };

    const handleLetterClick = (clickedLetter) => {
        if (clickedLetters.has(clickedLetter)) return;

        const newClickedLetters = new Set(clickedLetters).add(clickedLetter);
        setClickedLetters(newClickedLetters);

        if (currentWord.includes(clickedLetter)) {
            const newCorrectLetters = [...correctLetters, clickedLetter];
            setCorrectLetters(newCorrectLetters);

            if (currentWord.split('').every(letter => newCorrectLetters.includes(letter))) {
                setIsVictory(true);
                setShowModal(true);
            }
        } else {
            setWrongGuessCount(prevCount => prevCount + 1);

            if (wrongGuessCount + 1 === maxGuesses) {
                setIsVictory(false);
                setShowModal(true);
            }
        }
    };

    const nextWord = () => {
        setShowModal(false); 
        setTimeout(() => {
            setWordIndex((prevIndex) => (prevIndex + 1) % wordList.length);
        }, 500); 
    };

    const handlePlayAgain = () => {
        nextWord();
    };

    const renderKeyboard = () => {
        return (
            <div className="keyboard">
                {[...Array(26)].map((_, index) => {
                    const letter = String.fromCharCode(97 + index); 
                    return (
                        <button
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            disabled={clickedLetters.has(letter)}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderWordDisplay = () => {
        return (
            <ul className="word-display">
                {currentWord.split("").map((letter, index) => (
                    <li key={index} className={`letter ${correctLetters.includes(letter) ? 'guessed' : ''}`}>
                        {correctLetters.includes(letter) ? letter : ''}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="main-hangman">
        <div className="game-intro-container">
            <div className="hangman-box">
                <img src={`/images/hangman-${wrongGuessCount}.svg`} alt={`Hangman ${wrongGuessCount} image`} />
                <h1>Hangman Game</h1>
            </div>
            <div className="game-box">
                {renderWordDisplay()}
                <h4 className="hint-text">Hint: <b>{currentHint}</b></h4>
                <h4 className="guesses-text">Incorrect guesses: <b>{wrongGuessCount} / {maxGuesses}</b></h4>
                {renderKeyboard()}
            </div></div>
            <Modal showModal={showModal} isVictory={isVictory} correctWord={currentWord} onPlayAgain={handlePlayAgain} />
        </div>
    );
};

export default HangmanGame;