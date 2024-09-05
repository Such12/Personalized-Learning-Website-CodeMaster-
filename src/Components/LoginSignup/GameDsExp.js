import React, { useState } from 'react';
import './Gameexp.css';
import { Link } from 'react-router-dom';
import characterImage from './charac.png';

function GameDS() {
    const dialogs = [
        "Hey there, future coders! ","Welcome to CodeMaster, where coding is fun and exciting! Let's dive into data structure of C ",
        "Section 1: Arrays",
        "Arrays are like shelves with boxes, each box holds data of the same type.",
        "To declare an array in C, use the data type, array name, and size in square brackets.",
        "Example: int shoppingList[3]; This creates an array for 3 integers.",
        "Section 2: Stacks",
        "Stacks store items with access only at the top, like a stack of trays.",
        "Use 'push' to add an item to the top and 'pop' to remove the top item.",
        "In C, a stack can be implemented using an array with top starting at -1.",
        "Section 3: Queues",
        "Queues line up items in a specific order, like a line at a store.",
        "Use 'enqueue' to add an item at the end and 'dequeue' to remove the front item.",
        "In C, use an array to represent a queue with front starting at 0 and rear at -1."
      ];

  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentDialogIndex((currentDialogIndex + 1) % dialogs.length);
  };

  const isSectionHeading = dialogs[currentDialogIndex].startsWith("Section");

  return (
    <div className="main-exp-container">
      <div className="character">
        <img src={characterImage} alt="Character" id="characterImage" />
        <div 
          className="dialog" 
          id="dialogBox" 
          style={{ 
            fontWeight: isSectionHeading ? 'bold' : 'normal', 
            fontSize: isSectionHeading ? '18px' : '14px',
            color: isSectionHeading ? '#6c5ce7' : '#333'
          }}
        >
          {dialogs[currentDialogIndex]}
        </div>
      </div>
      <div className="exp-button-container"> 
        <button id="nextButton" onClick={handleNextClick}>Next</button>
        <Link to="/playsnake"> 
          <button id="playButton"> Play Now</button>
        </Link>
      </div>
    </div>
  );
}

export default GameDS;
