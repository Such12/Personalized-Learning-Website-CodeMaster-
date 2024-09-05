import React, { useState, useEffect } from 'react';
import './GameControlStatements.css';
import words from './Words'; 
import ScrambleModal from './ScrambleModal'; // Import the ScrambleModal

const WordScramble = () => {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [isVictory, setIsVictory] = useState(false); // State to determine if user won or lost

  useEffect(() => {
    initGame();
  }, []); 

  const initGame = () => {
    let remainingWords = words.filter(w => !usedWords.includes(w.word));
    if (remainingWords.length === 0) {
      setUsedWords([]);
      remainingWords = words;
    }
    
    const randomObj = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    const shuffledWord = randomObj.scramble;
    setWord(shuffledWord);
    setHint(randomObj.hint);
    setCorrectWord(randomObj.word.toLowerCase());
    setUsedWords(prev => [...prev, randomObj.word]);
    setAttempts(0); // Reset attempts for the new word
    setUserInput('');
    setShowModal(false); // Hide modal when a new game starts
  };

  const checkWord = () => {
    const userWord = userInput.toLowerCase();
    if (!userWord) {
      alert("Please enter the word to check!"); // Handle empty input
      return;
    }

    if (userWord !== correctWord) {
      setAttempts(prev => prev + 1); 
      if (attempts < 1) {
        setIsVictory(false); // User failed but can try again
        setShowModal(true);  // Show modal
      } else {
        setIsVictory(false); // User failed completely
        setShowModal(true);  // Show modal
      }
    } else {
      setIsVictory(true); // User guessed correctly
      setShowModal(true);  // Show modal
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handlePlayAgain = () => {
    setShowModal(false);  // Hide modal first
    initGame();           // Then start a new game
  };

  return (
    <div className="smain">
      <div className="scontainer">
        <h2>Word Scramble</h2>
        <div className="scontent">
          <p className="sword">{word}</p>
          <div className="details">
            <p className="shint">Hint: <span>{hint}</span></p>
          </div>
          
          <input
            type="text"
            spellCheck="false"
            placeholder="Enter a valid word"
            value={userInput}
            onChange={handleInputChange}
          />
          
          <div className="buttons">
            <button className="refresh-word" onClick={initGame}>Refresh Word</button>
            <button className="check-word" onClick={checkWord}>Check Word</button>
          </div>
        </div>
      </div>

      {/* ScrambleModal Component */}
      <ScrambleModal 
        showModal={showModal} 
        isVictory={isVictory} 
        correctWord={correctWord} 
        onPlayAgain={handlePlayAgain} 
      />
    </div>
  );
};

export default WordScramble;
