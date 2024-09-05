import React from 'react';
import './VideoPage.css';
import bg1 from './bg5.jpeg';

import { Link } from 'react-router-dom';

import introImg from './IntroImg.png'; 
import controlImg from './controlImg.png';
import dataImg from './DsImg.png';
import oopsImg from './OOpImg.png';

function VideoPage() {
    const pageStyle = {
       backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', 
        padding: '20px', 
    };

    return (
        <div style={pageStyle}> 
            <div className="main-container">
                <div className="video-page">
                    <h1>Video Tutorials</h1>
                    <p>Here you can watch engaging videos that break down coding concepts into easy-to-understand segments.</p>
                    
                    <div className="video-categories">
                        <div className="category">
                            <Link to="/introduction">
                                <h3>Introduction</h3>
                            </Link>
                            <div className="category-content">
                                <p>Learn the basics of programming and get started with the C language to master your foundation.</p>
                                <img src={introImg} alt="Introduction" />
                            </div>
                        </div>
                        <div className="category">
                            <Link to="/control-statements"> 
                                <h3>Control Statements/Loops</h3>
                            </Link>
                            <div className="category-content">
                                <p>Understand how to control the flow of your programs with loops and conditional statements.</p>
                                <img src={controlImg} alt="Control Statements" />
                            </div>
                        </div>
                        <div className="category">
                            <Link to="/data-structures">
                                <h3>Data Structures</h3>
                            </Link>
                            <div className="category-content">
                                <p>Explore different data structures and their implementations in C to enhance your problem solving skills.</p>
                                <img src={dataImg} alt="Data Structures" />
                            </div>
                        </div>
                        <div className="category">
                            <Link to="/oops"> 
                                <h3>OOPS</h3>
                            </Link>
                            <div className="category-content">
                                <p>Get introduced to Object-Oriented Programming concepts and how they can be applied in C.</p>
                                <img src={oopsImg} alt="OOPS" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
