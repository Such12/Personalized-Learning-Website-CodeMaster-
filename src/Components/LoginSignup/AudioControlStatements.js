import React, { useEffect, useRef, useState } from 'react';
import './AudioControlStatements.css';

const captionsData = [
    { start: 0, end: 10, text: " Let’s dive into the world of control statements and loops in C. These are the tools that let you control the flow of your programs, making them super powerful and flexible. Let's jump right in!" },
    { start: 10, end: 15, text: " Section 1: If-Else Statements: " },
    { start: 15, end: 32, text: " To make decisions based on conditions, you use if and else statements.Think of if as checking if something is true, like If it is raining, take an umbrella.Else specifies what to do if the condition is false, like Else, do not take an umbrella." },
    { start: 32, end: 43, text: " To declare this in C, you start with if, followed by the condition in parentheses, then the code to execute. Use else for the alternative action. " },
    { start: 43, end: 46, text: " Section 2: For Loops: " },
    { start: 46, end: 59, text: " To repeat an action a certain number of times, you use a for loop. Think of it as a to-do list where you repeat the same task for a set number of times, like: Water each of the 10 plants. " },
    { start: 59, end: 74, text: " To declare a for loop in C, you start with for, followed by three parts in parentheses: initialization (like starting from 1), condition (like up to 10), and increment (like moving to the next plant). " },
    { start: 74, end: 78, text: " Section 3: While Loops." },
    { start: 78, end: 91, text: " To repeat an action as long as a condition is true, you use a while loop. Think of it as continuing to do something until it's no longer needed, like: While the plant needs water, keep watering it." },
    { start: 91, end: 101, text: " To declare a while loop in C, you start with while, followed by the condition in parentheses, then the code to execute as long as the condition is true." },
    { start: 101, end: 105, text: " Section 4: Do-While Loops." },
    { start: 105, end: 116, text: " The do-while loop is similar to the while loop, but with one big difference: it always runs at least once, no matter what. It’s like trying a new game – you always play at least one round before deciding if you want to continue." },
    { start: 116, end: 129, text: " Start with the keyword do: This is like saying, First, do this task.Write the code you want to run inside curly braces : These curly braces group the actions together. " },
    { start: 129, end: 150, text: " After the curly braces, use the keyword while: This part checks the condition to decide if the task should be repeated.Put the condition in parentheses after while: This condition is what you are checking, like Is there mail?\nEnd with a semicolon : This signals the end of the statement. " },
    { start: 150, end: 153, text: " Section 5: Switch statements" },
    { start: 153, end: 170, text: " These are great for when you have multiple possible values for a variable and want to execute different code based on the value. Think of a vending machine. You enter a number, and based on that number, the machine gives you a specific snack." },
    { start: 170, end: 185, text: " Start with the keyword switch: This is like asking, What did the person choose? Put the variable you want to check in parentheses after switch: This variable is what you're making decisions about, like the snack choice number. " },
    { start: 185, end: 204, text: " Inside curly braces, list each case: Each case is like a different choice in the vending machine. Write the keyword case, followed by a value, and then a colon This sets up each choice. After the colon, write the actions for that choice. " }
  ];

function AudioControlStatements() {
  const audioRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const updateCaption = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const caption = captionsData.find(
          (caption) => currentTime >= caption.start && currentTime <= caption.end
        );
        setCurrentCaption(caption ? caption.text : '');
      }
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', updateCaption);

    return () => {
      audioElement.removeEventListener('timeupdate', updateCaption);
    };
  }, []);

  return (
    <div className="audio-control-statements-page">
      <h1>Control Statements Audio</h1>
      <br></br>
      <p>Understand control statements and their usage in programming.</p>
      <div className="audio-player-container">
        <audio ref={audioRef} controls>
          <source src="/Control structures.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="captions-container">
        <div className="caption-text">{currentCaption}</div>
      </div>
    </div>
  );
}

export default AudioControlStatements;
