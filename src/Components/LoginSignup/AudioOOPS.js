import React, { useEffect, useRef, useState } from 'react';
import './AudioOOPS.css';

const captionsData = [
    { start: 0, end: 3, text: "In programming, a class is like a blueprint or a template." },
    { start: 3, end: 6, text: "Imagine you have a blueprint for building a toy car." },
    { start: 6, end: 11, text: "This blueprint defines how the toy car should look and what it can do." },
    { start: 11, end: 15, text: "It specifies details like its size, color, and how the wheels move." },
    { start: 15, end: 20, text: "An object is a specific instance created from that blueprint." },
    { start: 20, end: 26, text: "So, if you follow the blueprint and actually build a toy car from it, that toy car is an object." },
    { start: 26, end: 33, text: "You can have many toy cars, each created from the same blueprint but potentially with different colors or features." },
    { start: 33, end: 39, text: "In C programming, we don't have built-in support for classes and objects like some other languages." },
    { start: 39, end: 43, text: "However, we can use structures (structs) to mimic these concepts." },
    { start: 43, end: 49, text: "A structure is like a container that can hold different types of data together under one name." },
    { start: 49, end: 52, text: "Example: Creating a 'Car' Class" },
    { start: 52, end: 57, text: "Let's say we want to create a concept of a 'Car' in C:" },
    { start: 57, end: 69, text: "Class Definition: We define a structure called Car that includes details like make (brand), model, and year." },
    { start: 69, end: 85, text: "Object Creation: We can then create multiple instances (or objects) of this Car structure. Each instance can represent a different actual car. Just like how each toy car you build from the same blueprint might have a different color or size." },
    { start: 85, end: 103, text: "Attributes and Methods: While C structures don't directly support methods like classes in other languages, we can define functions that operate on these structures to simulate behaviors or actions related to cars such as printing out car details." },
    { start: 103, end: 112, text: "Real-World Example: Creating a Person Class " },
    { start: 112, end: 118, text: "Class Definition: We define a structure called Person that includes attributes like name, age, and height. " },
    { start: 118, end: 130, text: "Object Creation: We can create different instances (or objects) of this Person structure to represent different individuals, each with their own unique name, age, and height. " },
    { start: 130, end: 148, text: "Attributes and Actions: Again, while C structures don't directly support methods, we can define functions to operate on these structures. For example, we might have a function to print out a person's details. " },
    { start: 148, end: 155, text: "In essence, classes and objects in C are simulated using structures to organize and represent data. " },
    { start: 155, end: 166, text: "Structures allow us to group related pieces of information together under one name, providing a way to model real-world entities like cars or people.  " },
    { start: 166, end: 174, text: "Even though C doesn't have all the features of object-oriented languages, understanding structures helps in organizing and manipulating data effectively." }
];

function AudioOOPS() {
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
    <div className="audio-oops-page">
      <h1>OOPS Audio</h1>
      <br></br>
      <p>Learn the principles of Object-Oriented Programming (OOP) and how to apply them in programming.</p>
      <div className="audio-player-container">
        <audio ref={audioRef} controls>
          <source src="/oops and classes.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="captions-container">
        <div className="caption-text">{currentCaption}</div>
      </div>
    </div>
  );
}

export default AudioOOPS;
