import React, { useEffect, useRef, useState } from 'react';
import './AudioIntroduction.css';

const captionsData = [
  { start: 0, end: 2, text: " Section 1: Introduction to programming " },
  { start: 2, end: 4, text: " Welcome to our introduction to programming!  " },
  { start: 4, end: 31, text: " Have you ever given someone a set of instructions to follow, like a recipe for baking a cake or steps to assemble a toy? Programming is a lot like that. It is about giving a computer a list of instructions to follow to accomplish a task. Think of the computer as a very smart robot that can do anything you tell it to, as long as you give it the right instructions. Just like following a recipe step-by-step to bake a delicious cake, programming involves writing a sequence of steps for the computer to follow." },
  { start: 31, end: 35, text: " Before we dive in, let's learn some basic programming terms you'll hear often " },
  { start: 35, end: 55, text: " Algorithm: Imagine you're teaching a friend to tie their shoelaces. You'd give them a step-by-step guide: 'Take one lace in each hand, cross them, loop one under the other, pull tight.' This step-by-step guide is an algorithm. In programming, an algorithm is a set of instructions to solve a problem or perform a task. " },
  { start: 55, end: 83, text: " Syntax: Think of syntax as the grammar of a programming language. Just like in English, where a sentence needs to follow grammatical rules to make sense, a program needs to follow syntax rules so the computer can understand it. For example, in English, you might say, 'The cat sits on the mat,' but if you jumble the words to Mat the on sits cat the, it doesn't make sense. The same goes for programming syntax. " },
  { start: 83, end: 100, text: " Debugging: Debugging is like proofreading a story you wrote. If there's a mistake in your story, you fix it so it makes sense. In programming, if there's a mistake in your code, you debug it to find and fix the errors. It's like finding and fixing the wrong steps in your shoelace-tying instructions. " },
  { start: 100, end: 102, text: " Section 2: Understanding basic syntax and structures." },
  { start: 102, end: 105, text: " Basic Input and Output Operations " },
  { start: 105, end: 119, text: " Output: In C, to display a message on the screen, you use a function called printf. You start by writing printf, followed by parentheses. Inside the parentheses, you include the message you want to display, enclosed in double quotes. " },
  { start: 119, end: 133, text: " Input: To get information from the user, like asking their name, you use a function called scanf. Start by writing scan f, followed by parentheses. Inside the parentheses, you specify the type of input you’re expecting. " },
  { start: 133, end: 145, text: " For an integer, you write % d, for a string, % s. After the type, add a comma and the variable where you want to store the user’s input. Prefix this variable with an ampersand." },
  { start: 145, end: 148, text: " Section 3: Variables and Data Types " },
  { start: 148, end: 160, text: "Think of variables as containers or boxes where you store information, similar to having different boxes for different items in your home. Here are a few data types: " },
  { start: 160, end: 175, text: " Integers: An integer is a whole number without a decimal point, like the number of apples in a basket. For example, to declare an integer called number with a value of 10, you say int number = 10. " },
  { start: 175, end: 188, text: " Float: A float is a number that can have a decimal point, like the weight of an apple.For example, to declare a float called weight with a value of 2.5, you say float weight = 2.5." },
  { start: 188, end: 200, text: " Character: A character is a single letter or symbol, like the letter 'A'. For example, to declare a character called initial with the value 'A', you say char initial = 'A'. " },
  { start: 200, end: 217, text: " Double: A double is like a float but can hold more precise decimal numbers, like the distance between stars. For example, to declare a double called distance with a value of 1.4, you say double distance = 1.4. " },
  { start: 217, end: 237, text: " Void: Void is used when a function does not return any value, like giving instructions without expecting a response. To declare a function that does not return any value, you start with the keyword void, followed by the function name. " }
];

function AudioIntroduction() {
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
    <div className="audio-introduction-page">
      <h1>Introduction Audio</h1>
      <br></br>
      <p>Learn the basics of programming and get started with the C language.</p>
      
        <div className="audio-player-container">
          <audio ref={audioRef} controls>
            <source src="/Introduction.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="captions-container">
          <p className="caption-text">{currentCaption}</p>
        </div>
      </div>
    
  );
}

export default AudioIntroduction;