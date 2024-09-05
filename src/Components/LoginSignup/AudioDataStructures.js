import React, { useEffect, useRef, useState } from 'react';
import './AudioDataStructures.css';

const captionsData = [
  { start: 0, end: 12, text: "Let’s dive into the fascinating world of data structures. We’ll explore arrays, stacks, queues, and dictionaries, all in the context of the C language. Ready? Let’s get started!" },
  { start: 12, end: 16, text: "Section 1: Arrays" },
  { start: 16, end: 30, text: "First up, we have arrays. Think of an array as a shelf with multiple boxes, where each box can hold a piece of data. Arrays are great when you want to store a collection of items of the same type, like numbers or characters." },
  { start: 30, end: 35, text: "An array is like a list of items, such as a shopping list." },
  { start: 35, end: 44, text: "To declare an array in C, you start with the data type (like int for numbers), followed by the array name and size in square brackets." },
  { start: 44, end: 52, text: "For example, to declare an array of 3 integers called shoppingList, you say int shoppingList[3]." },
  { start: 52, end: 72, text: "When you create a stack, you're essentially setting up a way to store items where you can only add or remove items from the top of the pile. You start with an empty stack and use operations like push to add an item on top and pop to remove the top item." },
  { start: 72, end: 81, text: "In C, when you define a stack, you're creating a way to store items where you can only interact with the top item. Imagine a stack of trays at a cafeteria." },
  { start: 81, end: 105, text: "You start with an empty stack top is equal to -1. When you want to add an item, you place it on top of the stack. This is known as push. This increases the top position. When you want to remove an item, you take the top item off the stack. This is known as pop. This decreases the top position." },
  { start: 105, end: 108, text: "Section 3: Queues" },
  { start: 108, end: 128, text: "When you declare a queue in C, you're preparing a structure where items are lined up in a specific order, like people waiting in line at a store. You begin with an empty queue and use enqueue to add someone to the end of the line and dequeue to remove the person at the front when it's their turn to be served." },
  { start: 128, end: 138, text: "Defining a queue in C means setting up a structure where items are lined up in a specific order, like people waiting in line at a store." },
  { start: 138, end: 160, text: "Here's how you set it up: You start with an empty queue (front is equal to 0, rear is equal to -1). To add an item, you place it at the end of the queue (enqueue). This increases the rear position. To remove an item, you take the item from the front of the queue (dequeue). This increases the front position." },
  { start: 160, end: 163, text: "Section 4: Dictionaries" },
  { start: 163, end: 181, text: "Lastly, let's explore dictionaries, also known as hash tables. Imagine a dictionary where you look up a word to find its definition. In programming, dictionaries store key-value pairs, making it easy to retrieve data using a unique key." },
  { start: 181, end: 192, text: "In C, dictionaries or maps can be implemented using structures. To define a structure, you use the struct keyword, followed by the structure name and its members in curly braces." }
];

function AudioDataStructures() {
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
    <div className="audio-data-structures-page">
      <h1>Data Structures Audio</h1>
      <br></br>
      <p>Learn about data structures and their importance in programming.</p>
      <div className="main-container">
        <div className="audio-container">
          <audio ref={audioRef} controls>
            <source src="/data structures.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className={`captions-container ${currentCaption ? 'visible' : ''}`}>
          <p className="caption-text">{currentCaption}</p>
        </div>
      </div>
    </div>
  );
}

export default AudioDataStructures;
