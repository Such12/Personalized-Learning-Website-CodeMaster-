import React, { useState } from 'react';
import './Gameexp.css';
import { Link } from 'react-router-dom';
import characterImage from './charac.png';

function GameControl() {
  const dialogs = [
    "Hey there, future coders! ","Welcome to CodeMaster, where coding is fun and exciting! Let's dive into the Control Statements of C ",
    "Section 1: If-Else Statements",
    "Use 'if' to check a condition, and 'else' to specify what to do if the condition is false.",
    "Example: if (raining){ take an umbrella; } else { don't take an umbrella; }",
    "Section 2: For Loops",
    "A 'for' loop repeats an action a set number of times. It's like a to-do list: 'Water each of the 10 plants.'",
    "Example: for (int i = 0; i < 10; i++) { water plant; }",
    "Section 3: While Loops",
    "A 'while' loop repeats an action as long as a condition is true. Example: 'While the plant needs water, keep watering it.'",
    "Example: while (plantNeedsWater) { water plant; }",
    "Section 4: Do-While Loops",
    "A 'do-while' loop runs at least once and then continues if the condition is true.",
    "Example: do { play game; } while (want to continue);",
    "Section 5: Switch Statements",
    "A 'switch' statement executes different code based on the value of a variable.",
    "Example: switch (snackChoice) \n { case 1: get chips; break; case 2: get soda; break; default: get water; }"
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
        <Link to="/playscramble"> 
          <button id="playButton"> Play Now</button>
        </Link>
      </div>
    </div>
  );
}

export default GameControl;
