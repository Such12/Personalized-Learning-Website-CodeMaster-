import React, { useState } from 'react';
import './Gameexp.css';
import { Link } from 'react-router-dom';
import characterImage from './charac.png'; 

function GameOOP() {
  const dialogs = [
    "Hey there, future coders! ","Welcome to CodeMaster, where coding is fun and exciting! Let's dive into the world of Objects and Classes.",
    "Section 1: Introduction to Classes and Objects",
    "In programming, a class is like a blueprint or a template.",
    "Imagine you have a blueprint for building a toy car.",
    "This blueprint defines how the toy car should look and what it can do.",
    "It specifies details like its size, color, and how the wheels move.",
    "An object is a specific instance created from that blueprint.",
    "So, if you build a toy car from it, that toy car is an object.",
    "You can have many toy cars, each created from the same blueprint.",
    "Section 2: Classes and Objects in C Programming",
    "In C programming, we don't have built-in support for classes and objects.",
    "However, we can use structures (structs) to mimic these concepts.",
    "Section 3: Example - Creating a Car Class",
    "A structure is like a container that can hold different types of data together under one name.",
    "Let's say we want to create a concept of a 'Car' in C:",
    "We define a structure called Car that includes details like make (brand), model, and year.",
    "We can then create multiple instances (or objects) of this Car structure.",
    "Each instance can represent a different actual car, just like how each toy car might have a different color or size.",
    "While C structures don't directly support methods like classes, we can define functions that operate on these structures.",
    "For example, printing out car details.",
    "Section 4: Example - Creating a Person Class",
    "We define a structure called Person that includes attributes like name, age, and height.",
    "We can create different instances (or objects) of this Person structure to represent different individuals.",
    "Again, while C structures don't directly support methods, we can define functions to operate on these structures.",
    "For example, we might have a function to print out a person's details.",
    "Section 5: Summary",
    "In essence, classes and objects in C are simulated using structures.",
    "Structures allow us to group related pieces of information together under one name.",
    "This provides a way to model real-world entities like cars or people.",
    "Even though C doesn't have all the features of object-oriented languages, understanding structures helps in organizing and manipulating data effectively."
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
        <Link to="/playcrossword"> 
          <button id="playButton"> Play Now</button>
        </Link>
      </div>
    </div>
  );
}

export default GameOOP;