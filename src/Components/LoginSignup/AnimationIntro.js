import React, { useState, useRef } from 'react';
import './AnimationVi.css';

function CustomAnimationPlayer({ animations, animationHeadings }) {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const animationRef = useRef(null);

  const handleAnimationEnd = () => {
    setCurrentAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  const handleNextAnimation = () => {
    setCurrentAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  const handlePreviousAnimation = () => {
    setCurrentAnimationIndex((prevIndex) =>
      prevIndex === 0 ? animations.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="animation-player-container">
      <button className="arrow-button left" onClick={handlePreviousAnimation}>
        &#9664;
      </button>
      <div className="video-container">
        <h2 className="animation-heading">
          {animationHeadings[currentAnimationIndex]}
        </h2>
        <video
          ref={animationRef}
          width="640"
          height="360"
          controls
          onEnded={handleAnimationEnd}
          src={animations[currentAnimationIndex]}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <button className="arrow-button right" onClick={handleNextAnimation}>
        &#9654;
      </button>
    </div>
  );
}

function AnimationPage() {
  const animationUrls = [
    '/Introduction1.mp4',
    '/Introduction2.mp4',
    '/Introduction3.mp4',
  ];

  const animationHeadings = [
    'Introduction',
    'Understanding Basic Syntax and Structure',
    'Variables and Data types',
  ];

  return (
    <div className="big-container">
      <CustomAnimationPlayer animations={animationUrls} animationHeadings={animationHeadings} />
    </div>
  );
}

export default AnimationPage;
