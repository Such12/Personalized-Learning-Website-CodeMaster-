import React, { useState } from 'react';
import './Gameexp.css';
import { Link } from 'react-router-dom';
import characterImage from './charac.png';

function GameIntro() {
  const dialogs = [
    "Hey there, future coders! ","Welcome to CodeMaster, where coding is fun and exciting! Let's dive into the world of programming with the C language. ",
    "Section 1: Introduction to Programming",
    "Programming is like having a magical notebook that can do anything you write in it. Whether you want to create a game or control a robot, programming is the way to do it!",
    "We use the C language to write these instructions, teaching the computer to understand and execute them.",
    "Section 2: Understanding Syntax",
    "Syntax is like the grammar of programming. In C, every instruction ends with a semicolon (;), similar to a period in a sentence.",
    "Code is organized into functions, and the most common function is 'main()'. Here's the basic structure:",
    "Example: #include <stdio.h>\nint main() {\n  // Your code here\n  return 0;\n}",
    "Section 3: Basic Input and Output",
    "Use 'printf' to display messages on the screen and 'scanf' to receive user input.",
    "Section 4: Variables and Data Types",
    "Variables are like containers for storing different types of data, such as numbers or characters.",
    "Common data types in C include:\n- int: for whole numbers\n- float: for decimals\n- char: for characters\n- double: for large decimals\n- void: for no value",
    "Practice makes perfect, so keep experimenting with your code! Happy coding!"
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
        <Link to="/playhangman">
          <button id="playButton"> Play Now</button>
        </Link>
      </div>
    </div>
  );
}

export default GameIntro;
