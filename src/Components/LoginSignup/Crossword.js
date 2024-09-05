import React, { useState } from 'react';
import './Crossword.css';  // Import the CSS file

const gridSize = 13;

// Create an empty grid
const generateEmptyGrid = () => {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill('blocked'));
};

// Generate the grid with initial clues
const generateInitialGrid = (crosswordData) => {
    const initialGrid = generateEmptyGrid();

    crosswordData.forEach(({ answer, startx, starty, orientation }) => {
        let x = startx - 1;
        let y = starty - 1;

        for (let i = 0; i < answer.length; i++) {
            if (orientation === 'across') {
                if (x + i < gridSize && y < gridSize) {
                    initialGrid[y][x + i] = ''; // Initialize cells for across words
                }
            } else if (orientation === 'down') {
                if (y + i < gridSize && x < gridSize) {
                    initialGrid[y + i][x] = ''; // Initialize cells for down words
                }
            }
        }
    });

    return initialGrid;
};

// Generate the answer grid
const generateAnswerGrid = (crosswordData) => {
    const answerGrid = generateEmptyGrid();

    crosswordData.forEach(({ answer, startx, starty, orientation }) => {
        let x = startx - 1;
        let y = starty - 1;

        for (let i = 0; i < answer.length; i++) {
            if (orientation === 'across') {
                if (x + i < gridSize && y < gridSize) {
                    answerGrid[y][x + i] = answer[i]; // Place answers in the grid for across words
                }
            } else if (orientation === 'down') {
                if (y + i < gridSize && x < gridSize) {
                    answerGrid[y + i][x] = answer[i]; // Place answers in the grid for down words
                }
            }
        }
    });

    return answerGrid;
};

const CrosswordGrid = () => {
    const crosswordData = [
        {
            answer: "CLASS",
            hint: "A blueprint or template in programming (5)",
            startx: 6,
            starty: 4,
            orientation: "across",
            position: 1,
        },
        {
            answer: "STRUCTURE",
            hint: "Used in C to define a class (9)",
            startx: 2,
            starty: 12,
            orientation: "across",
            position: 2,
        },
        {
            answer: "METHOD",
            hint: "Behaviors of a class (7)",
            startx: 7,
            starty: 2,
            orientation: "across",
            position: 3,
        },
        {
            answer: "OBJECT",
            hint: "An instance of a class (6)",
            startx: 13,
            starty: 8,
            orientation: "down",
            position: 4,
        },
        {
            answer: "CAR",
            hint: "Example used to explain class in C (3)",
            startx: 1,
            starty: 3,
            orientation: "across",
            position: 5,
        },
        {
            answer: "PROPERTIES",
            hint: "Another term for attributes (10)",
            startx: 1,
            starty: 6,
            orientation: "across",
            position: 6,
        },
        {
            answer: "INSTANCE",
            hint: "Another term for an object (8)",
            startx: 6,
            starty: 11,
            orientation: "across",
            position: 7,
        },
        {
            answer: "BEHAVIOR",
            hint: "Another term for methods (9)",
            startx: 8,
            starty: 1,
            orientation: "down",
            position: 8,
        },
        {
            answer: "PRINT",
            hint: "Function used to display details (5)",
            startx: 7,
            starty: 8,
            orientation: "down",
            position: 9,
        },
        {
            answer: "PERSON",
            hint: "A more complex example of a class (6)",
            startx: 5,
            starty: 5,
            orientation: "down",
            position: 10,
        },
        {
            answer: "ATTRIBUTES",
            hint: "Properties of a class (10)",
            startx: 2,
            starty: 3,
            orientation: "down",
            position: 11,
        },
    ];

    const [grid, setGrid] = useState(() => generateInitialGrid(crosswordData));

    const handleInputChange = (row, col, text) => {
        if (text.length > 1) return; // Limit input to one character
        const newGrid = [...grid];
        newGrid[row][col] = text.toUpperCase();
        setGrid(newGrid);
    };

    const handleVerify = () => {
        const answerGrid = generateAnswerGrid(crosswordData);
        const isCorrect = JSON.stringify(grid) === JSON.stringify(answerGrid);
        alert(isCorrect ? 'Congratulations! Your crossword is correct.' : 'Incorrect. Please try again.');
    };

    const handleReset = () => {
        setGrid(generateInitialGrid(crosswordData));
    };

    const handleSolve = () => {
        const answerGrid = generateAnswerGrid(crosswordData);
        setGrid(answerGrid);
    };

    const renderGrid = () => (
        <div>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className={`cell-container ${cell === 'blocked' ? 'blocked' : ''}`}>
                            {crosswordData.map((entry) => {
                                const { startx, starty, position } = entry;
                                if (rowIndex + 1 === starty && colIndex + 1 === startx) {
                                    return (
                                        <span key={`digit-${position}`} className="small-digit">
                                            {position}
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            {cell !== 'blocked' && (
                                <input
                                    className="cell"
                                    value={cell || ''}
                                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                    maxLength={1}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    const renderQuestions = () => {
        const questions = { across: [], down: [] };

        crosswordData.forEach(({ hint, orientation, position }) => {
            const questionText = `${position}. ${hint}`;
            questions[orientation].push(
                <div key={`question-${position}`} className="question-text">
                    {questionText}
                </div>
            );
        });

        return (
            <div className="questions-container">
                <div className="heading-container">
                    <h3 className="heading-text">Across</h3>
                </div>
                {questions.across}
                <div className="heading-container">
                    <h3 className="heading-text">Down</h3>
                </div>
                {questions.down}
            </div>
        );
    };

    return (
        
        <div className="Crossword-container">
        <div className="crossword-main">
        <h1 className="main-heading">Crossword</h1>
            <div className="container">

           {/* Heading on top of the grid */}
            <div className="crossword-content">

                    {renderGrid()}
                    {renderQuestions()}
                    </div>
                   
            <div className="button-container">
                <button className="button" onClick={handleReset}>Reset</button>
                <button className="button" onClick={handleVerify}>Verify</button>
                <button className="button" onClick={handleSolve}>Solve</button>
            </div>
            </div>
        </div>
    </div>
  
        
    );
};

export default CrosswordGrid;
