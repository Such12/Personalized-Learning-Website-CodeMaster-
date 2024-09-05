import React, { useState, useEffect, useRef } from 'react';
import './GameDataStructures.css';
import Modal from './ModalSnake'; 

const hints = [
    { hint: 'LIFO structure?', correct: 'Stack', incorrect: 'Queue' },
    { hint: 'FIFO structure?', correct: 'Queue', incorrect: 'Stack' },
    { hint: 'Used for associative arrays?', correct: 'Dictionary', incorrect: 'Array' },
    { hint: 'Same type elements in memory?', correct: 'Array', incorrect: 'Dictionary' },
    { hint: 'Insert/delete at both ends?', correct: 'Deque', incorrect: 'Stack' },
    { hint: 'Optimal for LIFO operations?', correct: 'Stack', incorrect: 'Queue' },
    { hint: 'Uses hashing for retrieval?', correct: 'Hash Table', incorrect: 'Array' },
    { hint: 'Dynamically resize?', correct: 'Linked List', incorrect: 'Array' },
    { hint: 'Priority-based tasks?', correct: 'Priority Queue', incorrect: 'Stack' },
    { hint: 'Best for hierarchical data?', correct: 'Tree', incorrect: 'Array' },
    { hint: 'Maintains sorted elements?', correct: 'Binary Search Tree', incorrect: 'Stack' },
    { hint: 'Used in BFS?', correct: 'Queue', incorrect: 'Stack' },
    { hint: 'Used in DFS?', correct: 'Stack', incorrect: 'Queue' },
    { hint: 'Combines multiple sets?', correct: 'Union-Find', incorrect: 'Array' },
    { hint: 'Max element retrieval?', correct: 'Max Heap', incorrect: 'Queue' },
    { hint: 'Min element retrieval?', correct: 'Min Heap', incorrect: 'Stack' },
    { hint: 'Efficient range queries?', correct: 'Segment Tree', incorrect: 'Array' },
    { hint: 'Used in A* and Dijkstra?', correct: 'Graph', incorrect: 'Stack' },
    { hint: 'Suitable for undo?', correct: 'Stack', incorrect: 'Queue' },
    { hint: 'Allows sorted duplicates?', correct: 'Multiset', incorrect: 'Array' },
    { hint: 'Merges sorted arrays?', correct: 'Merge Sort', incorrect: 'Quick Sort' },
    { hint: 'Reduces hashing collisions?', correct: 'Chaining', incorrect: 'Array' },
    { hint: 'Unique sorted elements?', correct: 'Set', incorrect: 'Stack' },
    { hint: 'Represents math expressions?', correct: 'Expression Tree', incorrect: 'Queue' },
    { hint: 'Array with end additions?', correct: 'Deque', incorrect: 'Stack' },
    { hint: 'Optimized for cache?', correct: 'Array', incorrect: 'Linked List' },
    { hint: 'Used in backtracking?', correct: 'Stack', incorrect: 'Queue' },
    { hint: 'File directory structure?', correct: 'Tree', incorrect: 'Array' },
    { hint: 'Maintains Internet connections?', correct: 'Tree', incorrect: 'Queue' },
    { hint: 'Tree-based set implementation?', correct: 'Red-Black Tree', incorrect: 'Array' },
    { hint: 'Quick insert/delete/search?', correct: 'Hash Table', incorrect: 'Array' },
    { hint: 'Represents sparse matrices?', correct: 'Linked List', incorrect: 'Array' },
    { hint: 'Used in scheduling algorithms?', correct: 'Priority Queue', incorrect: 'Stack' },
    { hint: 'Utilized in routing?', correct: 'Graph', incorrect: 'Queue' },
    { hint: 'Memory allocation structure?', correct: 'Heap', incorrect: 'Stack' },
    { hint: 'Best time complexity overall?', correct: 'AVL Tree', incorrect: 'Array' },
];

const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Snake = () => {
    const initialSnake = [{ x: 5, y: 5 }];
    
    // Ensure the food is within bounds
    const getRandomPosition = () => ({
        x: Math.floor(Math.random() * 30) + 1,
        y: Math.floor(Math.random() * 30) + 1
    });

    const initialFoodPositions = {
        correct: getRandomPosition(),
        incorrect: getRandomPosition(),
    };
    const initialDirection = { x: 0, y: 0 };

    const [foodPositions, setFoodPositions] = useState(initialFoodPositions);
    const [snake, setSnake] = useState(initialSnake);
    const [direction, setDirection] = useState(initialDirection);
    const [hintsList, setHintsList] = useState(shuffleArray(hints));
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        localStorage.getItem('high-score') || 0
    );
    const [showModal, setShowModal] = useState(false);

    const gameOver = useRef(false);
    const intervalId = useRef();

    // Ensure food positions are within bounds
    const updateFoodPositions = () => {
        setFoodPositions({
            correct: getRandomPosition(),
            incorrect: getRandomPosition(),
        });
    };

    const resetGame = () => {
        gameOver.current = false;
        setSnake(initialSnake);
        setDirection(initialDirection);
        setScore(0);
        updateFoodPositions();
        setHintsList(shuffleArray(hints)); // Shuffle hints when the game resets
        setCurrentHintIndex(0); // Start with the first hint in the shuffled list
        setShowModal(false); 
    };

    const handleGameOver = () => {
        if (!gameOver.current) {
            gameOver.current = true;
            clearInterval(intervalId.current);
            setShowModal(true); 
        }
    };

    const changeDirection = (key) => {
        if (key === 'ArrowUp' && direction.y !== 1) {
            setDirection({ x: 0, y: -1 });
        } else if (key === 'ArrowDown' && direction.y !== -1) {
            setDirection({ x: 0, y: 1 });
        } else if (key === 'ArrowLeft' && direction.x !== 1) {
            setDirection({ x: -1, y: 0 });
        } else if (key === 'ArrowRight' && direction.x !== -1) {
            setDirection({ x: 1, y: 0 });
        }
    };

    const handleButtonClick = (e) => {
        const key = e.currentTarget.dataset.key;
        changeDirection(key);
    };

    const handleKeyDown = (e) => {
        changeDirection(e.key);
    };

    const initGame = () => {
        if (gameOver.current || (direction.x === 0 && direction.y === 0)) return;

        setSnake((prev) => {
            const newSnake = [...prev];
            const newHead = {
                x: newSnake[0].x + direction.x,
                y: newSnake[0].y + direction.y,
            };

            // Check for collision with walls or self
            if (
                newHead.x <= 0 ||
                newHead.x > 30 ||
                newHead.y <= 0 ||
                newHead.y > 30 ||
                newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                handleGameOver();
                return prev;
            }

            newSnake.unshift(newHead);

            if (newHead.x === foodPositions.correct.x && newHead.y === foodPositions.correct.y) {
                // Correct answer eaten
                handleCorrectAnswer();
                newSnake.push({
                    x: foodPositions.correct.x,
                    y: foodPositions.correct.y,
                });
                updateFoodPositions();
            } else if (newHead.x === foodPositions.incorrect.x && newHead.y === foodPositions.incorrect.y) {
                // Incorrect answer eaten
                handleGameOver();
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    };

    const handleCorrectAnswer = () => {
        setScore((prevScore) => {
            const newScore = prevScore + 1;
            if (newScore > highScore) {
                localStorage.setItem('high-score', newScore);
                setHighScore(newScore);
            }
            return newScore;
        });

        setCurrentHintIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= hintsList.length) {
                setHintsList(shuffleArray(hints));
                return 0;
            }
            return nextIndex;
        });
    };

    useEffect(() => {
        if (!gameOver.current) {
            intervalId.current = setInterval(initGame, 100);
        }
        return () => clearInterval(intervalId.current);
    }, [direction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='snake-main'>
            <div className="wrapper">
                <div className="game-details">
                    <span className="hint-snake">Hint: {hintsList[currentHintIndex].hint}</span>
                    <span className="score">Score: {score}</span>
                    <span className="high-score">High Score: {highScore}</span>
                </div>
                <div className="play-board">
                    {snake.map((segment, index) => (
                        <div
                            key={index}
                            className="head"
                            style={{
                                gridArea: `${segment.y} / ${segment.x}`,
                            }}
                        ></div>
                    ))}
                    <div
                        className="food scorrect"
                        style={{
                            gridArea: `${foodPositions.correct.y} / ${foodPositions.correct.x}`,
                        }}
                    >
                        {hintsList[currentHintIndex].correct}
                    </div>
                    <div
                        className="food sincorrect"
                        style={{
                            gridArea: `${foodPositions.incorrect.y} / ${foodPositions.incorrect.x}`,
                        }}
                    >
                        {hintsList[currentHintIndex].incorrect}
                    </div>
                </div>
                <div className="controls">
                    <i
                        data-key="ArrowLeft"
                        className="fa-solid fa-arrow-left-long"
                        onClick={handleButtonClick}
                    ></i>
                    <i
                        data-key="ArrowUp"
                        className="fa-solid fa-arrow-up-long"
                        onClick={handleButtonClick}
                    ></i>
                    <i
                        data-key="ArrowRight"
                        className="fa-solid fa-arrow-right-long"
                        onClick={handleButtonClick}
                    ></i>
                    <i
                        data-key="ArrowDown"
                        className="fa-solid fa-arrow-down-long"
                        onClick={handleButtonClick}
                    ></i>
                </div>
            </div>
            <Modal
                showModal={showModal}
                onPlayAgain={resetGame}
            />
        </div>
    );
};

export default Snake;
