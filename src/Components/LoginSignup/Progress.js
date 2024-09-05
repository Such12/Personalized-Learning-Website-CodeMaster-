import React, { useState, useEffect } from 'react';
import "./Progress.css";

const topics = [
  {
    section: 'Introduction',
    topics: [
      'Introduction to Programming',
      'Understanding Syntax',
      'Basic Input and Output Operations',
      'Variables and Data Types',
    ],
  },
  {
    section: 'Control Statements',
    topics: [
      'If-Else Statements',
      'For Loops',
      'While Loops',
      'Do-While Loops',
      'Switch Statements',
    ],
  },
  {
    section: 'Data Structures',
    topics: ['Arrays', 'Stacks', 'Queues', 'Dictionaries'],
  },
  {
    section: 'OOPs',
    topics: [
      'Introduction to objects and classes',
      'Creating a Class in C using Structures',
      'Real-World Example',
    ],
  },
];

function Progress() {
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('completedTopics'));
    console.log('Loaded progress:', savedProgress); 
    if (savedProgress) {
      setCompletedTopics(savedProgress);
    }
  }, []);

  useEffect(() => {
    console.log('Saving progress:', completedTopics); 
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const handleCheck = (topic) => {
    console.log('Toggling topic:', topic); 
    if (completedTopics.includes(topic)) {
      setCompletedTopics(completedTopics.filter((t) => t !== topic));
    } else {
      setCompletedTopics([...completedTopics, topic]);
    }
  };

  const totalTopics = topics.reduce((acc, curr) => acc + curr.topics.length, 0);
  const completedCount = completedTopics.length;
  const remainingCount = totalTopics - completedCount;
  const percentageCompleted = ((completedCount / totalTopics) * 100).toFixed(2);

  return (
    <div className="Progress-main">
    <div className="main-Progress">
      <h1>Track Your Progress</h1>

      <div className="Progress-sections-container">
        
        {topics.map((section, index) => (
          <div key={index} className="Progress-sections">
            <h2>{section.section}</h2>
            {section.topics.map((topic, i) => (
              <div key={i} className="Progress-topic">
                <label>
                  <input
                    type="checkbox"
                    checked={completedTopics.includes(topic)}
                    onChange={() => handleCheck(topic)}
                  />
                  {topic}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${percentageCompleted}%` }}
        ></div>
      </div>

      

      <div className="analytics">
        <h3>Analytics</h3>
        <p>Total Topics: {totalTopics}</p>
        <p>Completed Topics: {completedCount}</p>
        <p>Topics Left: {remainingCount}</p>
        <p>Completion Percentage: {percentageCompleted}%</p>
      </div>
    </div>
    </div>
  );
}

export default Progress;
